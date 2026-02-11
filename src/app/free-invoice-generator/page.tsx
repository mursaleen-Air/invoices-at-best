import { Metadata } from "next";
import Link from "next/link";
import DocumentForm from "@/components/DocumentForm";
import StructuredData from "@/components/StructuredData";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import { generatePageMetadata, generateSoftwareApplicationSchema, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Free Invoice Generator — Create Professional Invoices Online",
    description:
        "Create professional invoices for free in seconds. No signup required. Download as PDF instantly with our easy-to-use online invoice generator.",
    path: "/free-invoice-generator",
    keywords: ["free invoice generator", "create invoice online", "invoice maker free", "pdf invoice generator"],
});

const faqs = [
    { question: "Is Invoices at Best really free?", answer: "Yes! You can generate unlimited invoices for free. Free invoices include a subtle watermark. Upgrade to Premium to remove watermarks and access advanced features.", isOpen: true },
    { question: "Do I need to create an account?", answer: "No account is required to generate invoices. Simply fill in the details and download your PDF instantly. Create an account to save and manage your invoices." },
    { question: "Can I customize my invoices?", answer: "Yes, you can add your business details, customize line items, set tax rates, and more. Premium users get additional customization options." },
    { question: "What format are the invoices?", answer: "All invoices are generated as professional PDF documents that can be printed, emailed, or shared digitally." },
    { question: "Is my data secure?", answer: "Absolutely. We do not store your invoice data on our servers. PDFs are generated in real-time and delivered directly to your browser." },
];

export default function FreeInvoiceGeneratorPage() {
    return (
        <AdWrappedLayout>
            <div className="min-h-[calc(100vh-140px)] relative overflow-hidden">
                <StructuredData data={generateSoftwareApplicationSchema()} />
                <StructuredData data={generateFAQSchema(faqs)} />

                {/* Background Decorations */}
                <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-br from-indigo-50/50 via-purple-50/30 to-transparent -z-10 pointer-events-none" />
                <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-100/20 rounded-full blur-3xl -z-10 animate-float" />

                {/* Hero */}
                <section className="py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-indigo-600 rounded-full text-sm font-semibold mb-8 border border-indigo-100 shadow-sm">
                            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                            100% Free · No Signup Required
                        </span>

                        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                            Free Invoice{" "}
                            <span className="text-gradient relative inline-block">
                                Generator
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-12 text-balance leading-relaxed">
                            Create professional invoices in seconds. Fill in the details below and download your invoice as a polished PDF — <span className="font-semibold text-slate-800">completely free</span>.
                        </p>
                    </div>
                </section>

                {/* Form */}
                <section className="px-4 -mt-8 relative z-10 mb-20">
                    <div className="max-w-5xl mx-auto">
                        <div className="bg-white/40 backdrop-blur-xl rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 p-2 md:p-8 animate-fade-in-up" style={{ animationDelay: "200ms" }}>
                            <DocumentForm documentType="invoice" />
                        </div>
                    </div>
                </section>

                {/* Features */}
                <section className="py-24 px-4 bg-white relative">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                                Why Use Our Free Tool?
                            </h2>
                            <p className="text-slate-600 max-w-2xl mx-auto">
                                Everything you need to bill clients professionally, without the simplified complexity.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Instant PDF Download",
                                    desc: "Generate and download your invoice as a professional PDF in seconds. No waiting, no email required.",
                                    icon: (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    ),
                                    gradient: "from-blue-500 to-indigo-600"
                                },
                                {
                                    title: "Professional Design",
                                    desc: "Clean, modern invoice templates that make your business look polished and trustworthy.",
                                    icon: (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                                    ),
                                    gradient: "from-purple-500 to-fuchsia-600"
                                },
                                {
                                    title: "Auto Calculations",
                                    desc: "Automatic subtotal, tax, and total calculations. No manual math — just enter your line items.",
                                    icon: (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    ),
                                    gradient: "from-emerald-500 to-teal-600"
                                },
                            ].map((feature, idx) => (
                                <div key={idx} className="glass-card text-center group hover:-translate-y-2 transition-transform duration-300">
                                    <div className={`w-14 h-14 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            {feature.icon}
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                                    <p className="text-slate-600 leading-relaxed">{feature.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <section className="py-24 px-4 bg-slate-50">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 text-center mb-12">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-4">
                            {faqs.map((faq, idx) => (
                                <details key={idx} className="glass-card group open:bg-white transition-colors duration-300" open={idx === 0}>
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
            </div>
        </AdWrappedLayout>
    );
}
