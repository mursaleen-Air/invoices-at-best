import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isPremiumUser } from "@/lib/subscription";
import { documentPayloadSchema, formatZodErrors } from "@/lib/validation-schemas";
import { checkRateLimit, rateLimitResponse, addRateLimitHeaders, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
    try {
        const clientIp = getClientIp(request);
        const rl = checkRateLimit(`create:${clientIp}`, { maxRequests: 30, windowMs: 60_000 });
        if (!rl.allowed) {
            return rateLimitResponse(rl);
        }

        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Unauthorized" },
                { status: 401 }
            );
        }

        const isPremium = await isPremiumUser(user.id);

        if (!isPremium) {
            return NextResponse.json(
                { success: false, error: "Premium subscription required" },
                { status: 403 }
            );
        }

        let body: unknown;
        try {
            body = await request.json();
        } catch {
            return NextResponse.json(
                { success: false, error: "Invalid JSON body" },
                { status: 400 }
            );
        }

        const result = documentPayloadSchema.safeParse(body);

        if (!result.success) {
            return NextResponse.json(
                { success: false, errors: formatZodErrors(result.error) },
                { status: 400 }
            );
        }

        logger.info("Invoice created", {
            userId: user.id,
            type: result.data.documentType,
            number: result.data.documentNumber,
        });

        const response = NextResponse.json({
            success: true,
            message: "Invoice created successfully",
        });
        return addRateLimitHeaders(response, rl);
    } catch (error) {
        logger.error("Invoice creation failed", error instanceof Error ? error : new Error(String(error)));
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
