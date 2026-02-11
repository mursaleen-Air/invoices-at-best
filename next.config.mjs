/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,

    // Compression
    compress: true,

    // Image optimization
    images: {
        formats: ["image/avif", "image/webp"],
        minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    },

    // Security headers via next.config
    headers: async () => [
        {
            source: "/(.*)",
            headers: [
                {
                    key: "X-DNS-Prefetch-Control",
                    value: "on",
                },
                {
                    key: "Strict-Transport-Security",
                    value: "max-age=63072000; includeSubDomains; preload",
                },
                {
                    key: "X-Content-Type-Options",
                    value: "nosniff",
                },
                {
                    key: "X-Frame-Options",
                    value: "DENY",
                },
                {
                    key: "X-XSS-Protection",
                    value: "1; mode=block",
                },
                {
                    key: "Referrer-Policy",
                    value: "strict-origin-when-cross-origin",
                },
                {
                    key: "Permissions-Policy",
                    value: "camera=(), microphone=(), geolocation=()",
                },
            ],
        },
        {
            source: "/sitemap.xml",
            headers: [
                {
                    key: "Cache-Control",
                    value: "public, max-age=3600, stale-while-revalidate=86400",
                },
            ],
        },
        {
            source: "/robots.txt",
            headers: [
                {
                    key: "Cache-Control",
                    value: "public, max-age=86400",
                },
            ],
        },
    ],

    // Powered by header removal
    poweredByHeader: false,

    // Experimental optimizations
    experimental: {
        optimizeCss: false,
    },
};

export default nextConfig;
