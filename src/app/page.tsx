import Link from "next/link";
import { Metadata } from "next";
import StructuredData from "@/components/StructuredData";
import { generateSoftwareApplicationSchema } from "@/lib/seo";
import TemplateCarousel from "@/components/TemplateCarousel";

export const metadata: Metadata = {
    title: "Invoices at Best — The Ultimate Free Invoice Generator",
    description: "Create professional invoices, receipts, and quotations in seconds. 100% free PDF downloads. No credit card required. Trusted by freelancers worldwide.",
    keywords: ["invoice generator", "receipt maker", "quotation generator", "proforma invoice", "free invoice"],
    alternates: {
        canonical: "https://invoicesatbest.com",
    },
};

export default function Home() {
    const documentTypes = [
        {
            title: "Invoice",
            description: "Generate professional billing documents for your clients.",
            href: "/invoice",
            gradient: "from-indigo-500 to-violet-600",
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
        },
        {
            title: "Receipt",
            description: "Provide instant proof of payment to your customers.",
            href: "/receipt",
            gradient: "from-emerald-500 to-teal-600",
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
            ),
        },
        {
            title: "Quotation",
            description: "Send price estimates and proposals to win more deals.",
            href: "/quotation",
            gradient: "from-amber-500 to-orange-600",
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
        },
        {
            title: "Proforma",
            description: "Preliminary invoices for customs and international trade.",
            href: "/proforma",
            gradient: "from-fuchsia-500 to-pink-600",
            icon: (
                <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
            ),
        },
    ];

    return (
        <div className="min-h-[calc(100vh-140px)] relative overflow-hidden">
            <StructuredData data={generateSoftwareApplicationSchema()} />

            {/* Background Decorations */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-gradient-to-b from-indigo-50/70 via-white to-transparent -z-10 pointer-events-none" />
            <div className="absolute top-20 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl -z-10 animate-float" />
            <div className="absolute top-40 left-0 w-72 h-72 bg-blue-100/40 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: "2s" }} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 pb-32">

                {/* Hero Section */}
                <div className="text-center max-w-4xl mx-auto mb-24 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-semibold mb-8 border border-indigo-100 shadow-sm animate-bounce-subtle">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        Trusted by 10,000+ Freelancers & Small Businesses
                    </div>

                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 tracking-tight leading-tight">
                        Professional Documents,{" "}
                        <span className="text-gradient relative inline-block">
                            Simplified.
                            <svg className="absolute w-full h-4 -bottom-1 left-0 text-indigo-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed text-balance">
                        Create stunning invoices, receipts, and quotations in seconds. Download professional PDFs instantly. No account required.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Link href="/invoice" className="btn-primary text-lg px-10 py-4 shadow-xl shadow-indigo-500/30">
                            Create First Invoice
                        </Link>
                        <Link href="/invoice-templates" className="text-slate-600 font-semibold hover:text-indigo-600 transition-colors px-6 py-3">
                            View Templates →
                        </Link>
                    </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 mb-24 animate-fade-in delay-300">
                    {/* Placeholder logos for trust */}
                    {["Stripe", "PayPal", "Wise", "Revolut", "Square"].map((brand) => (
                        <span key={brand} className="text-xl font-bold text-slate-400 select-none">{brand}</span>
                    ))}
                </div>

                {/* Document Types Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-32 max-w-7xl mx-auto">
                    {documentTypes.map((doc, idx) => (
                        <Link
                            key={doc.href}
                            href={doc.href}
                            className="glass-card-elevated group hover:-translate-y-2 relative overflow-hidden flex flex-col items-center text-center h-full"
                            style={{ animationDelay: `${idx * 100}ms` }}
                        >
                            <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${doc.gradient}`} />
                            <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${doc.gradient} opacity-5 rounded-full group-hover:scale-150 transition-transform duration-700`} />

                            <div className={`w-16 h-16 bg-gradient-to-br ${doc.gradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                {doc.icon}
                            </div>

                            <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-indigo-600 transition-colors">
                                {doc.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">{doc.description}</p>

                            <div className="mt-auto w-full pt-4 border-t border-slate-100/50">
                                <span className="text-indigo-600 font-semibold text-sm group-hover:underline decoration-2 underline-offset-4">Get Started →</span>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Template Carousel */}
                <TemplateCarousel />

                {/* Value Props */}
                <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-white relative overflow-hidden mb-24 shadow-2xl">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                        <div className="animate-fade-in delay-100">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                <svg className="w-6 h-6 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Lightning Fast</h3>
                            <p className="text-slate-300 leading-relaxed">Generate document PDFs in under 10 seconds. No loading screens, no complex forms.</p>
                        </div>
                        <div className="animate-fade-in delay-200">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                <svg className="w-6 h-6 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Secure & Private</h3>
                            <p className="text-slate-300 leading-relaxed">Your data never leaves your browser. All PDF generation happens locally on your device.</p>
                        </div>
                        <div className="animate-fade-in delay-300">
                            <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                <svg className="w-6 h-6 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3">Professional Quality</h3>
                            <p className="text-slate-300 leading-relaxed">Watermarked PDFs that look clean, modern, and professional. Impress your clients.</p>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center max-w-2xl mx-auto">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to get started?</h2>
                    <p className="text-slate-600 mb-8">Join thousands of businesses who trust Invoices at Best for their daily billing needs.</p>
                    <Link href="/invoice" className="btn-primary px-8 py-3 shadow-lg shadow-indigo-500/20">
                        Generate Invoice Now
                    </Link>
                </div>
            </div>
        </div>
    );
}
