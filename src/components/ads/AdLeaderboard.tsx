"use client";

import AdBanner from "./AdBanner";
import { useAdContext } from "./AdProvider";

interface AdLeaderboardProps {
    className?: string;
}

export default function AdLeaderboard({ className = "" }: AdLeaderboardProps) {
    const { isPremium } = useAdContext();

    if (isPremium) return null;

    return (
        <div className={`hidden md:flex justify-center py-4 ${className}`}>
            <AdBanner size="leaderboard" slot="content-top" />
        </div>
    );
}
