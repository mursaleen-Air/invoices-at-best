"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface SubscriptionData {
    isPremium: boolean;
    tier: string;
    status: string;
    currentPeriodEnd: string | null;
}

export default function SubscriptionCard() {
    const [sub, setSub] = useState<SubscriptionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetchSubscription();
    }, []);

    async function fetchSubscription() {
        try {
            const res = await fetch("/api/subscription/status");
            if (res.ok) {
                const data = await res.json();
                setSub(data);
            }
        } catch {
            // Silently fail
        } finally {
            setLoading(false);
        }
    }

    async function handleActivate() {
        setActionLoading(true);
        setMessage("");
        try {
            const res = await fetch("/api/subscription/activate", { method: "POST" });
            const data = await res.json();
            if (data.success) {
                setMessage("Premium activated! Refreshing...");
                await fetchSubscription();
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage(data.error || "Failed to activate");
            }
        } catch {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setActionLoading(false);
        }
    }

    async function handleCancel() {
        if (!confirm("Are you sure you want to cancel your premium subscription?")) return;
        setActionLoading(true);
        setMessage("");
        try {
            const res = await fetch("/api/subscription/cancel", { method: "POST" });
            const data = await res.json();
            if (data.success) {
                setMessage("Subscription canceled.");
                await fetchSubscription();
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage(data.error || "Failed to cancel");
            }
        } catch {
            setMessage("Something went wrong. Please try again.");
        } finally {
            setActionLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="glass-card animate-pulse">
                <div className="h-6 bg-slate-200 rounded w-1/3 mb-4" />
                <div className="h-4 bg-slate-200 rounded w-2/3 mb-2" />
                <div className="h-10 bg-slate-200 rounded w-1/3 mt-4" />
            </div>
        );
    }

    const isPremium = sub?.isPremium;

    return (
        <div className={`glass-card relative overflow-hidden transition-all duration-500 ${isPremium ? "ring-2 ring-amber-400 shadow-[0_0_40px_-10px_#fbbf244d]" : ""}`}>
            {isPremium && (
                <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none">
                    <div className="absolute top-3 right-[-28px] w-[120px] bg-gradient-to-r from-amber-400 to-yellow-500 text-center text-xs font-bold text-white py-1 rotate-45 shadow-sm">
                        PRO
                    </div>
                </div>
            )}

            <div className="flex items-start gap-5">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${isPremium
                    ? "bg-gradient-to-br from-amber-400 to-orange-500 text-white"
                    : "bg-slate-100 text-slate-400"
                    }`}>
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {isPremium ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        )}
                    </svg>
                </div>

                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-slate-900">
                        {isPremium ? "Premium Plan" : "Free Plan"}
                    </h3>
                    <p className="text-slate-600 mt-2 leading-relaxed">
                        {isPremium
                            ? "You have full access to all premium features. Enjoy watermark-free documents and priority support."
                            : "You are currently on the free plan. Documents include a watermark. Upgrade to remove it."
                        }
                    </p>

                    {isPremium && sub?.currentPeriodEnd && (
                        <div className="inline-flex items-center gap-2 mt-3 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-medium">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            Renews: {new Date(sub.currentPeriodEnd).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            })}
                        </div>
                    )}

                    {message && (
                        <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${message.includes("activated") || message.includes("canceled")
                            ? "bg-green-50 text-green-700 border border-green-100"
                            : "bg-red-50 text-red-700 border border-red-100"
                            }`}>
                            {message}
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-4 mt-6">
                        {isPremium ? (
                            <button
                                onClick={handleCancel}
                                disabled={actionLoading}
                                className="text-sm text-slate-500 hover:text-red-600 font-medium transition-colors disabled:opacity-50"
                            >
                                {actionLoading ? "Processing..." : "Cancel Subscription"}
                            </button>
                        ) : (
                            <>
                                <button
                                    onClick={handleActivate}
                                    disabled={actionLoading}
                                    className="relative overflow-hidden bg-gradient-to-r from-amber-500 to-orange-600 text-white font-semibold py-2.5 px-6 rounded-xl shadow-[0_4px_14px_0_#f59e0b63] hover:shadow-[0_6px_20px_#f59e0b3b] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-50 disabled:hover:translate-y-0"
                                >
                                    {actionLoading ? "Processing..." : "Upgrade to Premium — $9/mo"}
                                </button>
                                <Link
                                    href="/pricing"
                                    className="text-sm text-slate-600 hover:text-indigo-600 font-medium transition-colors"
                                >
                                    View Plans
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
