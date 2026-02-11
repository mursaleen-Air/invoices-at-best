import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { cancelSubscription } from "@/lib/subscription";
import { checkRateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
    try {
        const clientIp = getClientIp(request);
        const rl = checkRateLimit(`sub-cancel:${clientIp}`, { maxRequests: 10, windowMs: 60_000 });
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

        const result = await cancelSubscription(user.id);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        logger.info("Subscription canceled via API", { userId: user.id });

        return NextResponse.json({
            success: true,
            message: "Subscription canceled successfully.",
        });
    } catch (error) {
        logger.error("Cancel subscription API failed", error instanceof Error ? error : new Error(String(error)));
        return NextResponse.json(
            { success: false, error: "Failed to cancel subscription" },
            { status: 500 }
        );
    }
}
