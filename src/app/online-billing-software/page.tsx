import { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata, generateSoftwareApplicationSchema } from "@/lib/seo";
import StructuredData from "@/components/StructuredData";

export const metadata: Metadata = generatePageMetadata({
    title: "Online Billing Software — Free Cloud-Based Invoicing",
    description:
        "Free online billing software for businesses of all sizes. Generate invoices, receipts, and quotations from any device. No installation required.",
    path: "/online-billing-software",
    keywords: ["online billing software", "cloud invoicing", "web billing", "online invoicing software"],
});

export default function OnlineBillingSoftwarePage() {
    return (
        <div className="min-h-[calc(100vh-140px)]">
            <StructuredData data={generateSoftwareApplicationSchema()} />

            <section className="py-20 px-4 bg-gradient-to-br from-sky-50 via-white to-blue-50">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 bg-sky-100 text-sky-700 rounded-full text-sm font-medium mb-6">
                        Cloud-Based Solution
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Online{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-blue-600">
                            Billing Software
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        Professional billing from any device, anywhere. No downloads, no installations — just open your browser and start creating documents.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/invoice" className="btn-primary text-lg px-8 py-3">
                            Get Started Free
                        </Link>
                        <Link href="/invoice-templates" className="btn-secondary text-lg px-8 py-3">
                            View Templates
                        </Link>
                    </div>
                </div>
            </section>

            <section className="py-20 px-4">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Everything You Need for Online Billing</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Works Everywhere", desc: "Access from any device — desktop, tablet, or mobile. Your billing tools go wherever you go.", icon: "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" },
                            { title: "Instant Generation", desc: "Create professional PDF documents in seconds. No waiting for renders or queues.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                            { title: "Multiple Document Types", desc: "Invoices, receipts, quotations, and proforma invoices — all from a single platform.", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
                            { title: "No Installation", desc: "Runs entirely in your browser. Zero setup, zero maintenance, zero IT headaches.", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
                            { title: "Secure & Private", desc: "Your data stays in your browser. We generate PDFs without storing your sensitive information.", icon: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" },
                            { title: "Always Up to Date", desc: "Cloud-based means you always have the latest features and improvements, automatically.", icon: "M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" },
                        ].map((item, idx) => (
                            <div key={idx} className="glass-card">
                                <div className="w-12 h-12 bg-gradient-to-br from-sky-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
