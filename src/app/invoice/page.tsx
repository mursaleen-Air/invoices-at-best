import { Metadata } from "next";
import DocumentForm from "@/components/DocumentForm";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import StructuredData from "@/components/StructuredData";
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Invoice Generator — Create Professional PDF Invoices Free",
    description:
        "Create and download professional invoices as PDF in seconds. No signup required. Auto-calculated totals, tax, discounts. Perfect for freelancers and small businesses.",
    path: "/invoice",
    keywords: [
        "invoice generator",
        "create invoice online",
        "pdf invoice",
        "free invoice maker",
        "business invoice",
        "tax invoice generator",
        "invoice template",
        "professional invoice",
    ],
});

const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Invoice Generator", url: "/invoice" },
];

const faqs = [
    {
        question: "How do I create an invoice?",
        answer: "Fill in your business and customer details, add line items with descriptions, quantities and prices, set the tax rate and click Generate. Your professional PDF invoice will be ready for download instantly.",
    },
    {
        question: "Is this invoice generator free?",
        answer: "Yes! You can create unlimited invoices for free. Free invoices include a small watermark. Upgrade to Premium to remove it and unlock advanced features.",
    },
    {
        question: "What fields are required on an invoice?",
        answer: "Required fields include business name, address, phone, customer name, email, document number, due date, and at least one line item with a description.",
    },
];

export default function InvoicePage() {
    return (
        <AdWrappedLayout>
            <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />
            <StructuredData data={generateFAQSchema(faqs)} />

            <div className="min-h-[calc(100vh-140px)] relative overflow-hidden">
                {/* Background */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-transparent -z-10 pointer-events-none" />
                <div className="absolute top-32 right-0 w-[400px] h-[400px] bg-indigo-100/25 rounded-full blur-3xl -z-10 animate-float" />
                <div className="absolute top-60 left-10 w-[260px] h-[260px] bg-violet-100/20 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: "3s" }} />

                {/* Hero */}
                <section className="py-16 md:py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-indigo-600 rounded-full text-sm font-semibold mb-6 border border-indigo-100 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Professional Invoicing
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
                            Create{" "}
                            <span className="text-gradient relative inline-block">
                                Invoices
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                                </svg>
                            </span>{" "}
                            in Seconds
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 text-balance leading-relaxed">
                            Fill in the details below to generate a professional PDF invoice with
                            automatic tax calculation, discounts, and instant download.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap justify-center gap-3 mb-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
                            {["Auto Tax Calculation", "Instant PDF", "No Signup", "Free"].map((f) => (
                                <span key={f} className="badge-indigo">
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
                        <DocumentForm documentType="invoice" />
                    </div>
                </section>
            </div>
        </AdWrappedLayout>
    );
}
