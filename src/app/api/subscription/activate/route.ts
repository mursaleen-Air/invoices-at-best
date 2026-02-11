import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { activateSubscription } from "@/lib/subscription";
import { checkRateLimit, rateLimitResponse, getClientIp } from "@/lib/rate-limit";
import { logger } from "@/lib/logger";

export async function POST(request: NextRequest) {
    try {
        const clientIp = getClientIp(request);
        const rl = checkRateLimit(`sub-activate:${clientIp}`, { maxRequests: 10, windowMs: 60_000 });
        if (!rl.allowed) {
            return rateLimitResponse(rl);
        }

        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { success: false, error: "Unauthorized. Please sign in first." },
                { status: 401 }
            );
        }

        const result = await activateSubscription(user.id);

        if (!result.success) {
            return NextResponse.json(
                { success: false, error: result.error },
                { status: 500 }
            );
        }

        logger.info("Premium activated via API", { userId: user.id });

        return NextResponse.json({
            success: true,
            message: "Premium subscription activated successfully!",
        });
    } catch (error) {
        logger.error("Activate subscription API failed", error instanceof Error ? error : new Error(String(error)));
        return NextResponse.json(
            { success: false, error: "Failed to activate subscription" },
            { status: 500 }
        );
    }
}
