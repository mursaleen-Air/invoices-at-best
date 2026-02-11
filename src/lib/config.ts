const config = {
    site: {
        url: process.env.NEXT_PUBLIC_SITE_URL || "https://invoicesatbest.com",
        name: "Invoices at Best",
    },
    supabase: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL || "",
        anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "",
    },
    ads: {
        clientId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || "",
        slotId: process.env.NEXT_PUBLIC_ADSENSE_SLOT_ID || "",
    },
    rateLimit: {
        maxRequests: parseInt(process.env.RATE_LIMIT_MAX || "60", 10),
        windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || "60000", 10),
    },
    isProduction: process.env.NODE_ENV === "production",
    isDevelopment: process.env.NODE_ENV === "development",
} as const;

export default config;
