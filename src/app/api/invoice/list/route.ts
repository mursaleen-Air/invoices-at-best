import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isPremiumUser } from "@/lib/subscription";
import { checkRateLimit, rateLimitResponse, addRateLimitHeaders, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function GET(request: NextRequest) {
    try {
        const clientIp = getClientIp(request);
        const rl = checkRateLimit(`list:${clientIp}`, { maxRequests: 60, windowMs: 60_000 });
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

        logger.info("Invoice list requested", { userId: user.id });

        const response = NextResponse.json({
            success: true,
            invoices: [],
        });
        return addRateLimitHeaders(response, rl);
    } catch (error) {
        logger.error("Invoice list failed", error instanceof Error ? error : new Error(String(error)));
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
