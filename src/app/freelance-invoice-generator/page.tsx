import { Metadata } from "next";
import Link from "next/link";
import DocumentForm from "@/components/DocumentForm";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Freelance Invoice Generator — Professional Invoicing for Freelancers",
    description:
        "Create professional freelance invoices in seconds. Designed specifically for freelancers, contractors, and independent professionals. Free PDF download.",
    path: "/freelance-invoice-generator",
    keywords: ["freelance invoice", "freelancer invoicing", "contractor invoice", "independent professional billing"],
});

export default function FreelanceInvoiceGeneratorPage() {
    return (
        <div className="min-h-[calc(100vh-140px)] bg-slate-50/50">
            {/* Hero Section */}
            <section className="relative py-24 px-4 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 opacity-70"></div>
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-blue-100/50 to-transparent blur-3xl transform translate-x-1/3 -translate-y-1/4"></div>

                <div className="max-w-5xl mx-auto text-center relative z-10 animate-fade-in-up">
                    <span className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100/80 backdrop-blur-sm text-indigo-700 rounded-full text-sm font-semibold mb-8 border border-indigo-200 shadow-sm animate-float">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                        Built for Freelancers
                    </span>

                    <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-8 leading-tight tracking-tight">
                        Freelance{" "}
                        <span className="text-gradient relative inline-block">
                            Invoice Generator
                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                            </svg>
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed text-balance">
                        Stop spending time on invoicing and start spending it on your craft. Create polished, <span className="font-semibold text-slate-800">tax-ready invoices</span> in seconds.
                    </p>
                </div>
            </section>

            {/* Generator Section */}
            <section className="px-4 -mt-10 relative z-20 mb-20">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_#0000000a] border border-white/60 p-2 md:p-8">
                        <DocumentForm documentType="invoice" />
                    </div>
                </div>
            </section>

            {/* Features Grid */}
            <section className="py-24 px-4 bg-white relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>

                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Built for How Freelancers Work</h2>
                        <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                            We understand the unique challenges freelancers face. Our tool is designed to simplify your billing workflow.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                title: "Hourly & Project Billing",
                                desc: "Whether you bill by the hour or per project, our flexible line items handle both seamlessly.",
                                icon: (
                                    <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Multiple Client Support",
                                desc: "Generate unique invoices for different clients with consistent, professional formatting.",
                                icon: (
                                    <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Tax-Ready",
                                desc: "Include tax calculations automatically. Keep your invoices compliant and ready for tax season.",
                                icon: (
                                    <svg className="w-6 h-6 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                )
                            },
                            {
                                title: "Instant Delivery",
                                desc: "Download your invoice as a PDF and send it to clients immediately via email.",
                                icon: (
                                    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                    </svg>
                                )
                            },
                        ].map((item, idx) => (
                            <div key={idx} className="glass-card group hover:-translate-y-1 transition-transform duration-300">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-100">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="py-24 px-4 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-purple-900/50 opacity-50"></div>
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl"></div>

                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Get Paid Faster?</h2>
                    <p className="text-indigo-100 text-xl mb-10 max-w-2xl mx-auto">Create your first professional invoice right now — it takes less than 60 seconds.</p>
                    <Link href="/free-invoice-generator" className="btn-primary text-lg px-10 py-4 inline-flex items-center gap-3 shadow-indigo-500/20">
                        Start Invoicing Free
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>
                </div>
            </section>
        </div>
    );
}
