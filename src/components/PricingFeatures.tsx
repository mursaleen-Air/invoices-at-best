"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface PricingPlanProps {
    isPremium: boolean;
    user: User | null;
}

export default function PricingFeatures() {
    const [user, setUser] = useState<User | null>(null);
    const [isPremium, setIsPremium] = useState(false);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [message, setMessage] = useState("");
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            setUser(user);

            if (user) {
                try {
                    const res = await fetch("/api/subscription/status");
                    if (res.ok) {
                        const data = await res.json();
                        setIsPremium(data.isPremium);
                    }
                } catch {
                    // Silently fail
                }
            }
            setLoading(false);
        };
        checkUser();
    }, []);

    async function handleUpgrade() {
        if (!user) {
            router.push("/login?redirect=/pricing");
            return;
        }

        setActionLoading(true);
        setMessage("");

        try {
            const res = await fetch("/api/subscription/activate", { method: "POST" });
            const data = await res.json();

            if (data.success) {
                setMessage("Successfully upgraded to Premium!");
                setIsPremium(true);
                router.refresh();
                setTimeout(() => router.push("/dashboard"), 1500);
            } else {
                setMessage(data.error || "Upgrade failed");
            }
        } catch {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setActionLoading(false);
        }
    }

    const plans = [
        {
            name: "Free",
            price: "$0",
            period: "forever",
            description: "Perfect for getting started",
            gradient: "from-gray-500 to-gray-700",
            features: [
                "Unlimited document generation",
                "All document types (Invoice, Receipt, Quotation, Proforma)",
                "PDF download",
                "Automatic calculations",
                "Tax support",
                "Watermark on documents",
            ],
            cta: isPremium ? "Current Plan (Downgrade via Cancel)" : "Current Plan",
            ctaAction: null,
            disabled: true,
            highlighted: false,
        },
        {
            name: "Premium",
            price: "$9",
            period: "/month",
            description: "For professionals who want more",
            gradient: "from-primary-500 to-primary-700",
            features: [
                "Everything in Free",
                "No watermark on documents",
                "Save & manage invoices",
                "Invoice history",
                "Priority support",
                "Custom branding (coming soon)",
            ],
            cta: isPremium ? "Active Plan" : (user ? "Upgrade to Premium" : "Sign in to Upgrade"),
            ctaAction: isPremium ? null : handleUpgrade,
            disabled: isPremium,
            highlighted: true,
        },
    ];

    if (loading) {
        return <div className="py-20 text-center text-gray-500">Loading pricing options...</div>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {plans.map((plan) => (
                <div
                    key={plan.name}
                    className={`glass-card relative flex flex-col ${plan.highlighted ? "ring-2 ring-primary-500 shadow-xl" : ""}`}
                >
                    {plan.highlighted && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary-600 text-white text-sm font-medium rounded-full">
                            Most Popular
                        </div>
                    )}
                    <div className={`w-12 h-12 bg-gradient-to-br ${plan.gradient} rounded-xl flex items-center justify-center mb-4`}>
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                    <p className="text-gray-600 mb-4">{plan.description}</p>
                    <div className="flex items-baseline gap-1 mb-6">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-500">{plan.period}</span>
                    </div>
                    <ul className="space-y-3 mb-8 flex-1">
                        {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-3 text-sm text-gray-600">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                            </li>
                        ))}
                    </ul>

                    {plan.name === "Premium" && message && (
                        <div className={`mb-4 text-center text-sm font-medium ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                            {message}
                        </div>
                    )}

                    <button
                        onClick={plan.ctaAction || undefined}
                        disabled={plan.disabled || actionLoading}
                        className={`w-full text-center block py-3 rounded-xl font-medium transition-all duration-200 ${plan.highlighted
                                ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg disabled:bg-primary-300 disabled:cursor-not-allowed"
                                : "bg-gray-100 text-gray-900 hover:bg-gray-200 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed"
                            }`}
                    >
                        {actionLoading && plan.name === "Premium" ? "Processing..." : plan.cta}
                    </button>
                </div>
            ))}
        </div>
    );
}
