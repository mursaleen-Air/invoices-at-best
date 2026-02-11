import { NextRequest, NextResponse } from "next/server";
import { generateDocumentPDF } from "@/lib/pdf-generator";
import { createClient } from "@/lib/supabase/server";
import { isPremiumUser } from "@/lib/subscription";
import { documentPayloadSchema, formatZodErrors } from "@/lib/validation-schemas";
import { checkRateLimit, rateLimitResponse, addRateLimitHeaders, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
    try {
        console.log("API: Receipt request received");

        // Rate limiting
        const clientIp = getClientIp(request);
        const rl = checkRateLimit(`pdf:${clientIp}`, { maxRequests: 20, windowMs: 60_000 });

        if (!rl.allowed) {
            console.log("API: Rate limit exceeded for", clientIp);
            return rateLimitResponse(rl);
        }

        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        const isPremium = user ? await isPremiumUser(user.id) : false;

        // Parse and validate body with Zod
        let body: unknown;
        try {
            body = await request.json();
        } catch (e) {
            console.error("API: JSON parse failed", e);
            return NextResponse.json(
                { success: false, errors: [{ field: "general", message: "Invalid JSON body" }] },
                { status: 400 }
            );
        }

        console.log("API: Parsing body with schema...");
        const result = documentPayloadSchema.safeParse(body);

        if (!result.success) {
            console.log("API: Validation failed", JSON.stringify(result.error.issues, null, 2));
            const formattedErrors = formatZodErrors(result.error);
            return NextResponse.json(
                { success: false, errors: formattedErrors },
                { status: 400 }
            );
        }

        const validatedData = result.data;
        console.log("API: Validation successful", validatedData.documentType);

        logger.info("Generating PDF", {
            type: validatedData.documentType,
            number: validatedData.documentNumber,
            isPremium,
            ip: clientIp,
        });

        try {
            const pdfBytes = await generateDocumentPDF(validatedData, isPremium);
            console.log("API: PDF generated successfully, bytes:", pdfBytes.length);

            const response = new NextResponse(Buffer.from(pdfBytes), {
                status: 200,
                headers: {
                    "Content-Type": "application/pdf",
                    "Content-Disposition": `attachment; filename="${validatedData.documentType}-${validatedData.documentNumber}.pdf"`,
                    "Content-Length": pdfBytes.length.toString(),
                    "Cache-Control": "no-store",
                },
            });

            return addRateLimitHeaders(response, rl);
        } catch (genError) {
            console.error("API: PDF Generation failed internally", genError);
            throw genError;
        }

    } catch (error) {
        console.error("API: Unhandled error in generate-pdf route", error);
        logger.error("PDF generation failed", error instanceof Error ? error : new Error(String(error)));
        return NextResponse.json(
            {
                success: false,
                errors: [{ field: "general", message: "Failed to generate PDF. Server validation error." }],
            },
            { status: 500 }
        );
    }
}
