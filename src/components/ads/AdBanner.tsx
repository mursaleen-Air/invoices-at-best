"use client";

import { useAdContext } from "./AdProvider";

type AdSize = "banner" | "leaderboard" | "rectangle" | "skyscraper" | "mobile-banner";

interface AdBannerProps {
    size: AdSize;
    slot?: string;
    className?: string;
}

const AD_DIMENSIONS: Record<AdSize, { width: number; height: number; label: string }> = {
    banner: { width: 468, height: 60, label: "468×60" },
    leaderboard: { width: 728, height: 90, label: "728×90" },
    rectangle: { width: 300, height: 250, label: "300×250" },
    skyscraper: { width: 160, height: 600, label: "160×600" },
    "mobile-banner": { width: 320, height: 100, label: "320×100" },
};

export default function AdBanner({ size, slot, className = "" }: AdBannerProps) {
    const { isPremium, isLoading } = useAdContext();

    // Don't render ads for premium users
    if (isPremium) return null;

    // Don't render while loading to avoid layout shift
    if (isLoading) return null;

    const dimensions = AD_DIMENSIONS[size];
    const adSlot = slot || process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "";
    const adClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "";

    // If AdSense is configured, render real ad units
    if (adClient && adSlot) {
        return (
            <div className={`ad-container flex items-center justify-center ${className}`}>
                <ins
                    className="adsbygoogle"
                    style={{
                        display: "inline-block",
                        width: dimensions.width,
                        height: dimensions.height,
                    }}
                    data-ad-client={adClient}
                    data-ad-slot={adSlot}
                    data-ad-format="auto"
                    data-full-width-responsive="true"
                />
            </div>
        );
    }

    // Placeholder ad for development
    return (
        <div className={`ad-container flex items-center justify-center ${className}`}>
            <div
                className="ad-placeholder relative overflow-hidden rounded-lg border border-dashed border-gray-300 bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center text-center"
                style={{
                    width: "100%",
                    maxWidth: dimensions.width,
                    height: dimensions.height,
                }}
            >
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 10px, #000 10px, #000 11px)`,
                }} />
                <svg className="w-6 h-6 text-gray-300 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                    Advertisement
                </span>
                <span className="text-[9px] text-gray-300 mt-0.5">{dimensions.label}</span>
            </div>
        </div>
    );
}
