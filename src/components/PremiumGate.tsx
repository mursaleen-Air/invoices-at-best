import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { isPremiumUser } from "@/lib/subscription";

interface PremiumGateProps {
    children: React.ReactNode;
    fallback?: React.ReactNode;
}

export default async function PremiumGate({ children, fallback }: PremiumGateProps) {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        // If not logged in, show default fallback or nothing
        return <>{fallback}</>;
    }

    const isPremium = await isPremiumUser(user.id);

    if (isPremium) {
        return <>{children}</>;
    }

    return (
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-lg mb-6">
                <svg
                    className="w-8 h-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                    />
                </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Premium Feature</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
                Upgrade to Premium to remove watermarks, save unlimited invoices, and access advanced features.
            </p>
            <button className="btn-primary inline-flex items-center gap-2">
                Upgrade Now
            </button>
            {fallback && <div className="mt-8 opacity-50 pointer-events-none filter blur-sm select-none">{fallback}</div>}
        </div>
    );
}
