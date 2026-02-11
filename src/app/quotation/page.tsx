import { Metadata } from "next";
import DocumentForm from "@/components/DocumentForm";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import StructuredData from "@/components/StructuredData";
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Quotation Generator — Create Professional Price Quotes Free",
    description:
        "Create winning price quotations and estimates in seconds. Add validity period, scope limitations, and client acceptance section. Professional PDF quote generator.",
    path: "/quotation",
    keywords: [
        "quotation generator",
        "create quote online",
        "price estimate maker",
        "free quotation template",
        "business proposal",
        "service quote",
        "estimate generator",
        "pdf quote",
    ],
});

const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Quotation Generator", url: "/quotation" },
];

const faqs = [
    {
        question: "What is a quotation?",
        answer: "A quotation is a formal offer to sell goods or services at a specific price. It usually includes a validity period and terms of service.",
    },
    {
        question: "Can I set an expiry date?",
        answer: "Yes, our quotation generator allows you to set an Expiry Date and Validity Period (e.g., 'Valid for 30 days') to protect your pricing.",
    },
    {
        question: "Does it include a signature section?",
        answer: "Yes, the quotation includes a dedicated Client Acceptance section where your client can sign and date to accept the offer.",
    },
];

export default function QuotationPage() {
    return (
        <AdWrappedLayout>
            <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />
            <StructuredData data={generateFAQSchema(faqs)} />

            <div className="min-h-[calc(100vh-140px)] relative overflow-hidden">
                {/* Background */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-transparent -z-10 pointer-events-none" />
                <div className="absolute top-32 right-0 w-[400px] h-[400px] bg-amber-100/25 rounded-full blur-3xl -z-10 animate-float" />
                <div className="absolute top-60 left-10 w-[260px] h-[260px] bg-orange-100/20 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: "3s" }} />

                {/* Hero */}
                <section className="py-16 md:py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-amber-600 rounded-full text-sm font-semibold mb-6 border border-amber-100 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Price Estimates & Proposals
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
                            Create Winning{" "}
                            <span className="text-gradient-warm relative inline-block">
                                Quotations
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 text-balance leading-relaxed">
                            Send professional price estimates with clear validity periods and scope limitations. help your clients say "Yes" faster.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap justify-center gap-3 mb-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
                            {["Validity Terms", "Client Acceptance", "Instant PDF", "Free"].map((f) => (
                                <span key={f} className="badge-amber">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                                    </svg>
                                    {f}
                                </span>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Form */}
                <section className="px-4 relative z-10 pb-20">
                    <div className="max-w-4xl mx-auto">
                        <DocumentForm documentType="quotation" />
                    </div>
                </section>
            </div>
        </AdWrappedLayout>
    );
}
