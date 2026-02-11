import { Metadata } from "next";
import Link from "next/link";
import { blogPosts } from "@/lib/blog-data";
import { generatePageMetadata } from "@/lib/seo";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";

export const metadata: Metadata = generatePageMetadata({
    title: "Blog — Invoicing Tips & Business Guides",
    description:
        "Expert articles on invoicing, billing, and business finance. Learn best practices for creating professional invoices, managing cash flow, and growing your business.",
    path: "/blog",
    keywords: ["invoicing blog", "business tips", "billing guide", "finance articles"],
});

export default function BlogPage() {
    const featuredPost = blogPosts[0];
    const otherPosts = blogPosts.slice(1);

    return (
        <AdWrappedLayout>
            <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in-up">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-700 font-medium text-sm mb-6 border border-indigo-100">
                        Business & Finance
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 tracking-tight">
                        Insights for{" "}
                        <span className="text-gradient">
                            Growth
                        </span>
                    </h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
                        Expert advice to help you manage finances, get paid faster, and scale your freelance business.
                    </p>
                </div>

                {/* Featured Post */}
                <div className="mb-20 animate-fade-in delay-100">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-2">
                        <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        Featured Article
                    </h2>
                    <Link
                        href={`/blog/${featuredPost.slug}`}
                        className="group relative block overflow-hidden rounded-3xl bg-slate-900 shadow-2xl hover:shadow-indigo-500/20 transition-all duration-300 transform hover:-translate-y-1"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 mix-blend-overlay z-10" />
                        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl group-hover:bg-indigo-500/40 transition-colors duration-500" />
                        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl group-hover:bg-purple-500/40 transition-colors duration-500" />

                        <div className="relative z-20 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row gap-8 items-start md:items-center">
                            <div className="flex-1 space-y-6">
                                <div className="flex gap-2">
                                    {featuredPost.tags.map(tag => (
                                        <span key={tag} className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold backdrop-blur-md uppercase tracking-wide">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <h3 className="text-3xl md:text-5xl font-bold text-white leading-tight group-hover:text-indigo-200 transition-colors">
                                    {featuredPost.title}
                                </h3>
                                <p className="text-slate-300 text-lg md:text-xl max-w-2xl line-clamp-3">
                                    {featuredPost.description}
                                </p>
                                <div className="flex items-center gap-4 text-sm text-slate-400">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-400 to-purple-400" />
                                        <span>{featuredPost.author}</span>
                                    </div>
                                    <span>•</span>
                                    <span>{featuredPost.readingTime}</span>
                                    <span>•</span>
                                    <span>{featuredPost.datePublished}</span>
                                </div>
                            </div>
                            <div className="md:w-1/3 flex justify-center md:justify-end">
                                <span className="inline-flex items-center gap-2 text-white font-semibold border-b-2 border-transparent group-hover:border-indigo-400 pb-1 transition-all">
                                    Read Article
                                    <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </span>
                            </div>
                        </div>
                    </Link>
                </div>

                {/* Grid */}
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-8">Latest Articles</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherPosts.map((post, idx) => (
                            <Link
                                key={post.slug}
                                href={`/blog/${post.slug}`}
                                className="glass-card-elevated group flex flex-col h-full animate-fade-in-up"
                                style={{ animationDelay: `${idx * 100}ms` }}
                            >
                                <div className="h-48 bg-gray-100 rounded-xl mb-6 relative overflow-hidden">
                                    {/* Generative abstract gradient based on slug hash or index */}
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-br ${idx % 3 === 0 ? "from-emerald-400 to-teal-600" :
                                            idx % 3 === 1 ? "from-amber-400 to-orange-600" :
                                                "from-fuchsia-400 to-pink-600"
                                            } opacity-80 group-hover:scale-110 transition-transform duration-700`}
                                    />
                                    <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-300" />
                                    <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                                        {post.tags.slice(0, 2).map(tag => (
                                            <span key={tag} className="px-2 py-1 bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold uppercase rounded shadow-sm">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex-1 flex flex-col">
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm mb-6 line-clamp-3">
                                        {post.description}
                                    </p>

                                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                                        <span>{post.datePublished}</span>
                                        <span>{post.readingTime}</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Newsletter (Mock) */}
                <div className="mt-24 rounded-3xl bg-indigo-900 relative overflow-hidden p-8 md:p-16 text-center">
                    <div className="relative z-10 max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl font-bold text-white">Join our newsletter</h2>
                        <p className="text-indigo-200">Get the latest invoicing tips and business growth guides delivered to your inbox.</p>
                        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto" action="#">
                            <input type="email" placeholder="Enter your email" className="px-6 py-3 rounded-xl flex-1 bg-white/10 border border-white/20 text-white placeholder-indigo-300 focus:outline-none focus:ring-2 focus:ring-white/50" />
                            <button className="px-8 py-3 bg-white text-indigo-900 font-bold rounded-xl hover:bg-indigo-50 transition-colors">Subscribe</button>
                        </form>
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[100px]" />
                    </div>
                </div>
            </div>
        </AdWrappedLayout>
    );
}
