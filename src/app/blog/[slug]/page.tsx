import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getBlogPost, getAllBlogSlugs } from "@/lib/blog-data";
import { generatePageMetadata, generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";

interface BlogPostPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = getBlogPost(slug);
    if (!post) return {};

    return generatePageMetadata({
        title: post.title,
        description: post.description,
        path: `/blog/${post.slug}`,
        keywords: post.tags,
    });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const post = getBlogPost(slug);

    if (!post) {
        notFound();
    }

    const articleSchema = generateArticleSchema({
        title: post.title,
        description: post.description,
        path: `/blog/${post.slug}`,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        authorName: post.author,
    });

    const breadcrumbSchema = generateBreadcrumbSchema([
        { name: "Home", url: "/" },
        { name: "Blog", url: "/blog" },
        { name: post.title, url: `/blog/${post.slug}` },
    ]);

    // Convert markdown-like content to HTML paragraphs
    const contentSections = post.content.split("\n\n").map((block, idx) => {
        if (block.startsWith("## ")) {
            return (
                <h2 key={idx} className="text-2xl font-bold text-gray-900 mt-10 mb-4">
                    {block.replace("## ", "")}
                </h2>
            );
        }
        if (block.startsWith("### ")) {
            return (
                <h3 key={idx} className="text-xl font-bold text-gray-900 mt-8 mb-3">
                    {block.replace("### ", "")}
                </h3>
            );
        }
        if (block.startsWith("| ")) {
            const rows = block.split("\n").filter((r) => !r.startsWith("|--"));
            const headerRow = rows[0];
            const dataRows = rows.slice(1);
            const headers = headerRow
                .split("|")
                .filter((c) => c.trim())
                .map((c) => c.trim());
            return (
                <div key={idx} className="overflow-x-auto my-6">
                    <table className="w-full border-collapse border border-gray-200 rounded-lg">
                        <thead>
                            <tr className="bg-gray-50">
                                {headers.map((h, i) => (
                                    <th
                                        key={i}
                                        className="border border-gray-200 px-4 py-3 text-left text-sm font-semibold text-gray-900"
                                    >
                                        {h}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {dataRows.map((row, ri) => {
                                const cells = row
                                    .split("|")
                                    .filter((c) => c.trim())
                                    .map((c) => c.trim());
                                return (
                                    <tr key={ri} className="hover:bg-gray-50">
                                        {cells.map((cell, ci) => (
                                            <td
                                                key={ci}
                                                className="border border-gray-200 px-4 py-3 text-sm text-gray-600"
                                            >
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            );
        }
        if (block.startsWith("- **")) {
            const items = block.split("\n").map((item) => item.replace(/^- /, ""));
            return (
                <ul key={idx} className="list-disc list-inside space-y-2 my-4 text-gray-600">
                    {items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                </ul>
            );
        }
        if (block.match(/^\d+\. /)) {
            const items = block.split("\n");
            return (
                <ol key={idx} className="list-decimal list-inside space-y-2 my-4 text-gray-600">
                    {items.map((item, i) => (
                        <li key={i} dangerouslySetInnerHTML={{ __html: item.replace(/^\d+\. /, "").replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") }} />
                    ))}
                </ol>
            );
        }
        return (
            <p
                key={idx}
                className="text-gray-600 leading-relaxed my-4"
                dangerouslySetInnerHTML={{
                    __html: block
                        .replace(/\*\*(.*?)\*\*/g, "<strong class='text-gray-900'>$1</strong>")
                        .replace(/\*(.*?)\*/g, "<em>$1</em>"),
                }}
            />
        );
    });

    return (
        <div className="min-h-[calc(100vh-140px)] py-16 px-4">
            <StructuredData data={articleSchema} />
            <StructuredData data={breadcrumbSchema} />

            <article className="max-w-3xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-gray-500 mb-8">
                    <Link href="/" className="hover:text-primary-600 transition-colors">
                        Home
                    </Link>
                    <span>/</span>
                    <Link href="/blog" className="hover:text-primary-600 transition-colors">
                        Blog
                    </Link>
                    <span>/</span>
                    <span className="text-gray-900">{post.title}</span>
                </nav>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-medium"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                    {post.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-8 pb-8 border-b border-gray-200">
                    <span>{post.author}</span>
                    <span>•</span>
                    <span>{post.datePublished}</span>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                </div>

                {/* Content */}
                <div className="prose-custom">{contentSections}</div>

                {/* CTA */}
                <div className="mt-12 glass-card bg-gradient-to-r from-primary-50 to-blue-50 text-center">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Ready to create your first invoice?
                    </h3>
                    <p className="text-gray-600 mb-6">
                        Generate professional invoices, receipts, and quotations in seconds.
                    </p>
                    <Link href="/invoice" className="btn-primary inline-flex items-center gap-2">
                        Create Free Invoice
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>

                {/* Back */}
                <div className="mt-8 text-center">
                    <Link
                        href="/blog"
                        className="text-primary-600 hover:text-primary-700 font-medium inline-flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
                        </svg>
                        Back to all articles
                    </Link>
                </div>
            </article>
        </div>
    );
}
