import { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata, generateFAQSchema } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = generatePageMetadata({
    title: "Small Business Invoicing — Simple Billing for Small Teams",
    description:
        "Streamline your small business invoicing with Invoices at Best. Create professional invoices, receipts, and quotations without complex software or expensive subscriptions.",
    path: "/small-business-invoicing",
    keywords: ["small business invoicing", "small business billing", "simple invoicing", "business invoicing software"],
});

const faqs = [
    { question: "Is Invoices at Best suitable for small businesses?", answer: "Absolutely. Invoices at Best is designed with small businesses in mind. No complex setup, no learning curve — just fill in the details and generate professional documents." },
    { question: "Can I use it for multiple clients?", answer: "Yes. Generate unlimited invoices for as many clients as you need. Each document gets a unique number for easy tracking." },
    { question: "Do I need accounting software?", answer: "Invoices at Best complements your existing workflow. While it generates documents, we recommend dedicated accounting software for bookkeeping." },
];

export default function SmallBusinessInvoicingPage() {
    return (
        <div className="min-h-[calc(100vh-140px)]">
            <StructuredData data={generateFAQSchema(faqs)} />

            <section className="py-20 px-4 bg-gradient-to-br from-teal-50 via-white to-cyan-50">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 bg-teal-100 text-teal-700 rounded-full text-sm font-medium mb-6">
                        Built for Small Business
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Simple Invoicing for{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-cyan-600">
                            Small Business
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        Stop wrestling with complex software. Create professional invoices, receipts, and quotations in seconds — not hours.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/invoice" className="btn-primary text-lg px-8 py-3">
                            Create Invoice
                        </Link>
                        <Link href="/receipt" className="btn-secondary text-lg px-8 py-3">
                            Create Receipt
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why Small Businesses Choose Invoices at Best</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "No Learning Curve", desc: "Start generating invoices in under 30 seconds. No tutorials, no onboarding — just intuitive simplicity." },
                            { title: "Look Professional", desc: "Clean, modern templates that make even the smallest business look established and trustworthy." },
                            { title: "Save Time", desc: "Automatic calculations, instant PDF generation, and reusable templates save hours every month." },
                            { title: "All Document Types", desc: "Invoices, receipts, quotations, and proforma invoices — everything you need in one place." },
                            { title: "Free to Start", desc: "Generate unlimited documents for free. Upgrade only when you need premium features." },
                            { title: "No Software to Install", desc: "Works entirely in your browser. No downloads, no updates, no IT requirements." },
                        ].map((item, idx) => (
                            <div key={idx} className="glass-card">
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-gray-50">
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
