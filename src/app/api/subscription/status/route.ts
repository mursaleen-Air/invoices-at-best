import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getUserSubscription } from "@/lib/subscription";
import { checkRateLimit, rateLimitResponse, addRateLimitHeaders, getClientIp } from "@/lib/rate-limit";

export async function GET(request: NextRequest) {
    try {
        const clientIp = getClientIp(request);
        const rl = checkRateLimit(`sub:${clientIp}`, { maxRequests: 120, windowMs: 60_000 });
        if (!rl.allowed) {
            return rateLimitResponse(rl);
        }

        const supabase = await createClient();
        const {
            data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
            const response = NextResponse.json({
                isPremium: false,
                tier: "free",
                status: "active",
            });
            return addRateLimitHeaders(response, rl);
        }

        const subscription = await getUserSubscription(user.id);

        const response = NextResponse.json({
            isPremium: subscription.tier === "premium" && subscription.status === "active",
            tier: subscription.tier,
            status: subscription.status,
            currentPeriodEnd: subscription.currentPeriodEnd || null,
        });
        return addRateLimitHeaders(response, rl);
    } catch {
        return NextResponse.json({
            isPremium: false,
            tier: "free",
            status: "active",
        });
    }
}
