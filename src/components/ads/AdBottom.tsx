"use client";

import AdBanner from "./AdBanner";
import { useAdContext } from "./AdProvider";

interface AdBottomProps {
    className?: string;
}

export default function AdBottom({ className = "" }: AdBottomProps) {
    const { isPremium } = useAdContext();

    if (isPremium) return null;

    return (
        <div className={`lg:hidden flex justify-center py-4 ${className}`}>
            <AdBanner size="mobile-banner" slot="mobile-bottom" />
        </div>
    );
}
