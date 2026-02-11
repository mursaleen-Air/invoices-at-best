export type SubscriptionTier = "free" | "premium";
export type SubscriptionStatus = "active" | "canceled" | "expired" | "trialing";

export interface UserSubscription {
    id?: string;
    userId: string;
    tier: SubscriptionTier;
    status: SubscriptionStatus;
    currentPeriodStart?: string;
    currentPeriodEnd?: string;
    createdAt?: string;
    updatedAt?: string;
}
