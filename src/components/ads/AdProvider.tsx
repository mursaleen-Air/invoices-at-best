"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";

interface AdContextType {
    isPremium: boolean;
    isLoading: boolean;
}

const AdContext = createContext<AdContextType>({ isPremium: false, isLoading: true });

export function useAdContext() {
    return useContext(AdContext);
}

export default function AdProvider({ children }: { children: ReactNode }) {
    const [isPremium, setIsPremium] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function checkSubscription() {
            try {
                const supabase = createClient();
                const {
                    data: { user },
                } = await supabase.auth.getUser();

                if (user) {
                    const res = await fetch("/api/subscription/status");
                    if (res.ok) {
                        const data = await res.json();
                        setIsPremium(data.isPremium);
                    }
                }
            } catch {
                // Default to free tier on error
            } finally {
                setIsLoading(false);
            }
        }

        checkSubscription();
    }, []);

    return (
        <AdContext.Provider value={{ isPremium, isLoading }}>
            {children}
        </AdContext.Provider>
    );
}
