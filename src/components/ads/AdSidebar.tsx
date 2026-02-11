"use client";

import AdBanner from "./AdBanner";
import { useAdContext } from "./AdProvider";

interface AdSidebarProps {
    className?: string;
}

export default function AdSidebar({ className = "" }: AdSidebarProps) {
    const { isPremium } = useAdContext();

    if (isPremium) return null;

    return (
        <aside className={`hidden lg:flex flex-col gap-6 items-center ${className}`}>
            <AdBanner size="rectangle" slot="sidebar-top" />
            <AdBanner size="skyscraper" slot="sidebar-bottom" />
        </aside>
    );
}
