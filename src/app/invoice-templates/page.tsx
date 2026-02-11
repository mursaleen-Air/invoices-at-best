import { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Invoice Templates — Free Professional Templates",
    description:
        "Browse our collection of free professional invoice templates. Clean designs for freelancers, small businesses, and enterprises. Download as PDF instantly.",
    path: "/invoice-templates",
    keywords: ["invoice templates", "free invoice template", "professional invoice design", "invoice format"],
});

const templates = [
    { name: "Classic Invoice", desc: "Clean, traditional invoice layout perfect for any business.", type: "invoice" as const, gradient: "from-blue-500 to-blue-700" },
    { name: "Modern Receipt", desc: "Contemporary receipt design with clear payment confirmation.", type: "receipt" as const, gradient: "from-green-500 to-green-700" },
    { name: "Professional Quotation", desc: "Detailed quotation template designed to win more business.", type: "quotation" as const, gradient: "from-orange-500 to-orange-700" },
    { name: "Proforma Invoice", desc: "Standard proforma template for international trade.", type: "proforma" as const, gradient: "from-purple-500 to-purple-700" },
];

export default function InvoiceTemplatesPage() {
    return (
        <div className="min-h-[calc(100vh-140px)]">
            <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
                        Free Templates
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Professional{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                            Invoice Templates
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Choose from our collection of professionally designed templates. Every template automatically calculates totals, applies taxes, and generates polished PDF documents.
                    </p>
                </div>
            </section>

            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {templates.map((tpl) => (
                            <div key={tpl.type} className="glass-card group hover:-translate-y-1 transition-all duration-300">
                                <div className={`w-full h-48 bg-gradient-to-br ${tpl.gradient} rounded-xl mb-6 flex items-center justify-center`}>
                                    <svg className="w-20 h-20 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">{tpl.name}</h3>
                                <p className="text-gray-600 mb-4">{tpl.desc}</p>
                                <Link href={`/${tpl.type}`} className="btn-primary inline-flex items-center gap-2 text-sm">
                                    Use This Template
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">All Templates Include</h2>
                    <p className="text-gray-600 mb-12">Every template comes with these built-in features</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {["Auto Calculations", "PDF Download", "Tax Support", "Professional Layout", "Custom Line Items", "Unique Document Numbers", "Date Formatting", "Mobile Friendly"].map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                                <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                {feature}
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
