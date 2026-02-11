import { Metadata } from "next";
import DocumentForm from "@/components/DocumentForm";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import StructuredData from "@/components/StructuredData";
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Receipt Generator — Create Professional Payment Receipts Free",
    description:
        "Generate and download custom payment receipts instantly. Add your logo, business details, and payment method. perfect for freelancers and small businesses.",
    path: "/receipt",
    keywords: [
        "receipt generator",
        "create receipt online",
        "payment receipt maker",
        "free receipt template",
        "business receipt",
        "cash receipt generator",
        "sales receipt",
        "pdf receipt",
    ],
});

const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Receipt Generator", url: "/receipt" },
];

const faqs = [
    {
        question: "How do I create a receipt?",
        answer: "Enter the business and customer details, list the items or services sold, specify the payment method (Cash, Card, Transfer), and click Generate PDF.",
    },
    {
        question: "Can I show the payment method?",
        answer: "Yes, our receipt template includes a dedicated field for Payment Method so you can specify how the payment was received.",
    },
    {
        question: "Is there a 'PAID' stamp on the receipt?",
        answer: "Yes, all receipts generated with our tool automatically include a professional 'PAID' stamp to clearly indicate the payment status.",
    },
];

export default function ReceiptPage() {
    return (
        <AdWrappedLayout>
            <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />
            <StructuredData data={generateFAQSchema(faqs)} />

            <div className="min-h-[calc(100vh-140px)] relative overflow-hidden">
                {/* Background */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-transparent -z-10 pointer-events-none" />
                <div className="absolute top-32 right-0 w-[400px] h-[400px] bg-emerald-100/25 rounded-full blur-3xl -z-10 animate-float" />
                <div className="absolute top-60 left-10 w-[260px] h-[260px] bg-teal-100/20 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: "3s" }} />

                {/* Hero */}
                <section className="py-16 md:py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-emerald-600 rounded-full text-sm font-semibold mb-6 border border-emerald-100 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Proof of Payment
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
                            Create{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 relative inline-block">
                                Receipts
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                                </svg>
                            </span>{" "}
                            Instantly
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 text-balance leading-relaxed">
                            Generate professional payment receipts with automatic "PAID" stamping. Ensure your customers have clear proof of purchase record.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap justify-center gap-3 mb-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
                            {["Auto 'PAID' Stamp", "Payment Method", "Instant PDF", "Free"].map((f) => (
                                <span key={f} className="badge-green">
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
                        <DocumentForm documentType="receipt" />
                    </div>
                </section>
            </div>
        </AdWrappedLayout>
    );
}
