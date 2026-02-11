"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignOutButton() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleSignOut = async () => {
        setIsLoading(true);

        const supabase = createClient();

        // Call server-side signout to clear httpOnly cookies
        try {
            await fetch("/api/auth/signout", { method: "POST" });
        } catch {
            // Continue with client-side cleanup even if server call fails
        }

        // Sign out from Supabase client-side
        await supabase.auth.signOut({ scope: "local" });

        // Manually clear all Supabase-related cookies from the browser
        document.cookie.split(";").forEach((c) => {
            const name = c.trim().split("=")[0];
            if (name.startsWith("sb-") || name.includes("supabase")) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname};`;
            }
        });

        // Clear any localStorage Supabase state
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("sb-") || key.includes("supabase")) {
                localStorage.removeItem(key);
            }
        });

        // Clear sessionStorage too
        Object.keys(sessionStorage).forEach((key) => {
            if (key.startsWith("sb-") || key.includes("supabase")) {
                sessionStorage.removeItem(key);
            }
        });

        // Hard navigation — forces a full server round-trip
        window.location.href = "/";
    };

    return (
        <button
            onClick={handleSignOut}
            disabled={isLoading}
            className="btn-secondary inline-flex items-center gap-2"
        >
            {isLoading ? (
                <>
                    <svg
                        className="animate-spin w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    Signing out...
                </>
            ) : (
                <>
                    <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                        />
                    </svg>
                    Sign out
                </>
            )}
        </button>
    );
}
