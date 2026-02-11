import { MetadataRoute } from "next";
import { getAllBlogSlugs } from "@/lib/blog-data";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://invoicesatbest.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const staticPages = [
        { path: "", priority: 1.0, changeFrequency: "daily" as const },
        { path: "/invoice", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/receipt", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/quotation", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/proforma", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/login", priority: 0.5, changeFrequency: "monthly" as const },
        { path: "/signup", priority: 0.5, changeFrequency: "monthly" as const },
        { path: "/pricing", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/free-invoice-generator", priority: 0.9, changeFrequency: "weekly" as const },
        { path: "/receipt-maker", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/quotation-generator", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/proforma-invoice-maker", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/invoice-templates", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/small-business-invoicing", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/freelance-invoice-generator", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/online-billing-software", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/invoice-generator-pdf", priority: 0.8, changeFrequency: "weekly" as const },
        { path: "/blog", priority: 0.7, changeFrequency: "daily" as const },
        { path: "/about", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/contact", priority: 0.7, changeFrequency: "monthly" as const },
        { path: "/privacy", priority: 0.5, changeFrequency: "yearly" as const },
        { path: "/terms", priority: 0.5, changeFrequency: "yearly" as const },
    ];

    const blogSlugs = getAllBlogSlugs();

    const blogPages = blogSlugs.map((slug) => ({
        path: `/blog/${slug}`,
        priority: 0.6 as const,
        changeFrequency: "monthly" as const,
    }));

    const allPages = [...staticPages, ...blogPages];

    return allPages.map((page) => ({
        url: `${SITE_URL}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
    }));
}
