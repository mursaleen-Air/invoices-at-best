"use client";

import { AdSidebar, AdBottom, AdLeaderboard } from "@/components/ads";

interface AdWrappedLayoutProps {
    children: React.ReactNode;
}

export default function AdWrappedLayout({ children }: AdWrappedLayoutProps) {
    return (
        <>
            <AdLeaderboard className="mt-4 mb-0" />
            <div className="flex gap-8 max-w-[1400px] mx-auto w-full">
                <div className="flex-1 min-w-0">{children}</div>
                <AdSidebar className="w-[180px] flex-shrink-0 sticky top-24 self-start pt-12" />
            </div>
            <AdBottom className="border-t border-gray-100" />
        </>
    );
}
