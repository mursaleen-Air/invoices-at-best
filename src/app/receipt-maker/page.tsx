import { Metadata } from "next";
import DocumentForm from "@/components/DocumentForm";
import StructuredData from "@/components/StructuredData";
import { generatePageMetadata, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Free Receipt Maker — Generate Payment Receipts Online",
    description:
        "Create professional payment receipts instantly. Free online receipt generator with PDF download. Perfect for businesses, freelancers, and contractors.",
    path: "/receipt-maker",
    keywords: ["receipt maker", "receipt generator", "payment receipt", "free receipt template"],
});

const faqs = [
    { question: "What is a receipt?", answer: "A receipt is a document confirming that payment has been received for goods or services. It serves as proof of purchase." },
    { question: "When should I issue a receipt?", answer: "Issue a receipt immediately after receiving payment. This protects both you and your customer." },
    { question: "What details should a receipt include?", answer: "A receipt should include the date, amount paid, payment method, description of goods/services, and both parties' details." },
];

export default function ReceiptMakerPage() {
    return (
        <div className="min-h-[calc(100vh-140px)]">
            <StructuredData data={generateFAQSchema(faqs)} />

            <section className="py-20 px-4 bg-gradient-to-br from-green-50 via-white to-emerald-50">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 bg-green-100 text-green-700 rounded-full text-sm font-medium mb-6">
                        Free Receipt Generator
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Professional{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                            Receipt Maker
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        Generate professional payment receipts in seconds. Confirm transactions with polished PDF receipts your customers will appreciate.
                    </p>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <DocumentForm documentType="receipt" />
                </div>
            </section>

            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why You Need Professional Receipts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Proof of Payment", desc: "Protect yourself and your customers with clear documentation of every transaction." },
                            { title: "Tax Compliance", desc: "Properly documented receipts simplify tax preparation and ensure compliance with regulations." },
                            { title: "Customer Trust", desc: "Professional receipts build confidence and encourage repeat business from satisfied customers." },
                        ].map((item, idx) => (
                            <div key={idx} className="glass-card text-center">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">FAQ</h2>
                    <div className="space-y-4">
                        {faqs.map((faq, idx) => (
                            <details key={idx} className="glass-card group">
                                <summary className="cursor-pointer font-semibold text-gray-900 flex items-center justify-between">
                                    {faq.question}
                                    <svg className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </summary>
                                <p className="mt-4 text-gray-600">{faq.answer}</p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
