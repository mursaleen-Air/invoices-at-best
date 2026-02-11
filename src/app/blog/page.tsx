import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Blog — Invoicing Tips & Business Guides",
    description:
        "Expert articles on invoicing, billing, and business finance. Learn best practices for creating professional invoices, managing cash flow, and growing your business.",
    path: "/blog",
    keywords: ["invoicing blog", "business tips", "billing guide", "finance articles"],
});

export default function BlogPage() {
    return (
        <div className="min-h-[calc(100vh-140px)] py-16 px-4">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <span className="text-sm font-semibold text-primary-600 uppercase tracking-wider">
                        Blog
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-4">
                        Invoicing Tips &{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                            Business Guides
                        </span>
                    </h1>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        Expert articles to help you invoice better, get paid faster, and grow your business.
                    </p>
                </div>

                <div className="space-y-8">
                    {blogPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blog/${post.slug}`}
                            className="block glass-card hover:-translate-y-1 transition-all duration-300 group"
                        >
                            <div className="flex flex-wrap gap-2 mb-3">
                                {post.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                                {post.title}
                            </h2>
                            <p className="text-gray-600 mb-4">{post.description}</p>
                            <div className="flex items-center gap-4 text-sm text-gray-500">
                                <span>{post.author}</span>
                                <span>•</span>
                                <span>{post.datePublished}</span>
                                <span>•</span>
                                <span>{post.readingTime}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
