import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import DocumentForm from "@/components/DocumentForm";
import StructuredData from "@/components/StructuredData";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import {
    generatePageMetadata,
    generateFAQSchema,
    generateBreadcrumbSchema,
} from "@/lib/seo";
import {
    TEMPLATE_PAGES,
    getAllTemplatePageSlugs,
    getTemplatePageBySlug,
} from "@/lib/template-pages-data";

// ── Static Generation ─────────────────────────────────────────
export function generateStaticParams() {
    return getAllTemplatePageSlugs().map((slug) => ({ slug }));
}

// ── SEO Metadata ──────────────────────────────────────────────
export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const { slug } = await params;
    const page = getTemplatePageBySlug(slug);
    if (!page) return {};

    return generatePageMetadata({
        title: page.title,
        description: page.description,
        path: `/invoice-templates/${page.slug}`,
        keywords: page.keywords,
    });
}

// ── Page Component ────────────────────────────────────────────
export default async function TemplateSlugPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const page = getTemplatePageBySlug(slug);
    if (!page) notFound();

    const breadcrumbs = [
        { name: "Home", url: "/" },
        { name: "Invoice Templates", url: "/invoice-templates" },
        { name: page.h1, url: `/invoice-templates/${page.slug}` },
    ];

    return (
        <AdWrappedLayout>
            <div className="min-h-[calc(100vh-140px)] relative overflow-hidden">
                {/* Schema Markup */}
                <StructuredData data={generateFAQSchema(page.faqs)} />
                <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />

                {/* Background */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-transparent -z-10 pointer-events-none" />
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-3xl -z-10 animate-float" />

                {/* Breadcrumb */}
                <nav className="max-w-5xl mx-auto px-4 pt-6">
                    <ol className="flex items-center gap-2 text-sm text-slate-500">
                        <li>
                            <Link href="/" className="hover:text-indigo-600 transition-colors">
                                Home
                            </Link>
                        </li>
                        <li>/</li>
                        <li>
                            <Link href="/invoice-templates" className="hover:text-indigo-600 transition-colors">
                                Invoice Templates
                            </Link>
                        </li>
                        <li>/</li>
                        <li className="text-slate-900 font-medium truncate">{page.h1}</li>
                    </ol>
                </nav>

                {/* Hero */}
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-indigo-600 rounded-full text-sm font-semibold mb-8 border border-indigo-100 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                            100% Free · No Signup Required
                        </span>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                            {page.h1.split(" ").slice(0, -1).join(" ")}{" "}
                            <span className="text-gradient">
                                {page.h1.split(" ").slice(-1)}
                            </span>
                        </h1>

                        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8 leading-relaxed">
                            {page.heroText}
                        </p>

                        <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Instant PDF
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {page.currency} Currency
                            </span>
                            <span className="flex items-center gap-1.5">
                                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Auto {page.taxLabel}
                            </span>
                        </div>
                    </div>
                </section>

                {/* Invoice Form */}
                <section className="px-4 -mt-4 relative z-10 mb-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-2 md:p-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                            <DocumentForm documentType="invoice" />
                        </div>
                    </div>
                </section>

                {/* What To Include */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 mb-4 text-center">
                            What Should a {page.h1.replace(" Template", "")} Include?
                        </h2>
                        <p className="text-slate-600 text-center mb-12 max-w-2xl mx-auto">
                            Make sure every invoice you send is complete, professional, and compliant.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {page.whatToInclude.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors"
                                >
                                    <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs font-bold">
                                        {i + 1}
                                    </div>
                                    <span className="text-slate-700 leading-relaxed">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-20 px-4 bg-slate-50">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl font-bold text-slate-900 text-center mb-12">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {page.faqs.map((faq, idx) => (
                                <details
                                    key={idx}
                                    className="glass-card group open:bg-white transition-colors duration-300"
                                    open={idx === 0}
                                >
                                    <summary className="cursor-pointer font-bold text-slate-900 text-lg flex items-center justify-between list-none select-none">
                                        {faq.question}
                                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 group-open:bg-indigo-600 group-open:text-white transition-colors">
                                            <svg className="w-5 h-5 group-open:rotate-180 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </summary>
                                    <div className="mt-4 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                        {faq.answer}
                                    </div>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Related Templates */}
                <section className="py-20 px-4 bg-white">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-2xl font-bold text-slate-900 mb-8">
                            Explore More Templates
                        </h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {TEMPLATE_PAGES.filter((t) => t.slug !== page.slug)
                                .slice(0, 6)
                                .map((t) => (
                                    <Link
                                        key={t.slug}
                                        href={`/invoice-templates/${t.slug}`}
                                        className="px-4 py-2 bg-slate-100 hover:bg-indigo-100 hover:text-indigo-700 text-slate-700 rounded-full text-sm font-medium transition-colors"
                                    >
                                        {t.h1.replace(" Template", "")}
                                    </Link>
                                ))}
                            <Link
                                href="/invoice-templates"
                                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full text-sm font-medium transition-colors"
                            >
                                View All Templates →
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Bottom CTA */}
                <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
                    <div className="max-w-3xl mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-4">
                            Ready to Create Your Invoice?
                        </h2>
                        <p className="text-indigo-100 mb-8 text-lg">
                            Fill in the form above and download your professional PDF — completely free, no signup required.
                        </p>
                        <a
                            href="#top"
                            className="inline-flex items-center gap-2 px-8 py-3 bg-white text-indigo-600 rounded-full font-semibold hover:bg-indigo-50 transition-colors shadow-lg"
                        >
                            Create Your {page.h1.replace(" Template", "")}
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        </a>
                    </div>
                </section>
            </div>
        </AdWrappedLayout>
    );
}
