import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        // If user is not logged in, silently succeed (don't block PDF generation)
        if (!user) {
            return NextResponse.json({ success: true, tracked: false });
        }

        const body = await request.json();
        const { documentType, documentNumber, customerName, customerEmail, totalAmount, currency } = body;

        const { error } = await supabase.from("documents").insert({
            user_id: user.id,
            document_type: documentType,
            document_number: documentNumber,
            customer_name: customerName,
            customer_email: customerEmail || null,
            total_amount: totalAmount || 0,
            currency: currency || "USD",
        });

        if (error) {
            console.error("Failed to track document:", error);
            // Don't fail the request — tracking is best-effort
            return NextResponse.json({ success: true, tracked: false, error: error.message });
        }

        return NextResponse.json({ success: true, tracked: true });
    } catch (error) {
        console.error("Document tracking error:", error);
        return NextResponse.json({ success: true, tracked: false });
    }
}
