import { createClient } from "@/lib/supabase/server";
import { UserSubscription, SubscriptionTier } from "@/types/subscription";
import { logger } from "@/lib/logger";

export async function getUserSubscription(userId: string): Promise<UserSubscription> {
    try {
        const supabase = await createClient();

        const { data, error } = await supabase
            .from("subscriptions")
            .select("*")
            .eq("user_id", userId)
            .eq("status", "active")
            .single();

        if (error || !data) {
            return {
                userId,
                tier: "free",
                status: "active",
            };
        }

        const now = new Date();
        const periodEnd = data.current_period_end ? new Date(data.current_period_end) : null;

        if (periodEnd && periodEnd < now) {
            logger.info("Subscription expired", { userId, periodEnd: data.current_period_end });
            return {
                id: data.id,
                userId,
                tier: "free",
                status: "expired",
                currentPeriodStart: data.current_period_start,
                currentPeriodEnd: data.current_period_end,
                createdAt: data.created_at,
                updatedAt: data.updated_at,
            };
        }

        return {
            id: data.id,
            userId,
            tier: data.tier as SubscriptionTier,
            status: data.status,
            currentPeriodStart: data.current_period_start,
            currentPeriodEnd: data.current_period_end,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
        };
    } catch (error) {
        logger.error("Failed to fetch subscription", error instanceof Error ? error : new Error(String(error)));
        return {
            userId,
            tier: "free",
            status: "active",
        };
    }
}

export async function isPremiumUser(userId: string): Promise<boolean> {
    const subscription = await getUserSubscription(userId);
    return subscription.tier === "premium" && subscription.status === "active";
}

export async function activateSubscription(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
        const supabase = await createClient();

        const now = new Date();
        const periodEnd = new Date(now);
        periodEnd.setMonth(periodEnd.getMonth() + 1);

        const { data: existing } = await supabase
            .from("subscriptions")
            .select("id")
            .eq("user_id", userId)
            .single();

        if (existing) {
            const { error } = await supabase
                .from("subscriptions")
                .update({
                    tier: "premium",
                    status: "active",
                    current_period_start: now.toISOString(),
                    current_period_end: periodEnd.toISOString(),
                    updated_at: now.toISOString(),
                })
                .eq("user_id", userId);

            if (error) {
                logger.error("Failed to update subscription", new Error(error.message));
                return { success: false, error: error.message };
            }
        } else {
            const { error } = await supabase.from("subscriptions").insert({
                user_id: userId,
                tier: "premium",
                status: "active",
                current_period_start: now.toISOString(),
                current_period_end: periodEnd.toISOString(),
                created_at: now.toISOString(),
                updated_at: now.toISOString(),
            });

            if (error) {
                logger.error("Failed to create subscription", new Error(error.message));
                return { success: false, error: error.message };
            }
        }

        logger.info("Subscription activated", { userId, periodEnd: periodEnd.toISOString() });
        return { success: true };
    } catch (error) {
        logger.error("Subscription activation failed", error instanceof Error ? error : new Error(String(error)));
        return { success: false, error: "An unexpected error occurred" };
    }
}

export async function cancelSubscription(userId: string): Promise<{ success: boolean; error?: string }> {
    try {
        const supabase = await createClient();

        const { error } = await supabase
            .from("subscriptions")
            .update({
                status: "canceled",
                updated_at: new Date().toISOString(),
            })
            .eq("user_id", userId);

        if (error) {
            logger.error("Failed to cancel subscription", new Error(error.message));
            return { success: false, error: error.message };
        }

        logger.info("Subscription canceled", { userId });
        return { success: true };
    } catch (error) {
        logger.error("Subscription cancellation failed", error instanceof Error ? error : new Error(String(error)));
        return { success: false, error: "An unexpected error occurred" };
    }
}
