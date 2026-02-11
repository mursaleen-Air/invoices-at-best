import { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo";
import PricingFeatures from "@/components/PricingFeatures";

export const metadata: Metadata = generatePageMetadata({
    title: "Pricing — Free & Premium Plans",
    description:
        "Choose the right Invoices at Best plan for your needs. Free plan with unlimited document generation, or Premium for watermark-free documents and advanced features.",
    path: "/pricing",
    keywords: ["invoices at best pricing", "invoice generator plans", "premium invoicing", "billing software pricing"],
});

export default function PricingPage() {
    return (
        <div className="min-h-[calc(100vh-140px)]">
            <section className="py-20 px-4">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6">
                        Simple Pricing
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Choose Your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600">
                            Plan
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Start free and upgrade when you need premium features. No hidden fees, no surprises.
                    </p>
                </div>
            </section>

            <section className="pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <PricingFeatures />
                </div>
            </section>

            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">All Plans Include</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
                        {["Invoices", "Receipts", "Quotations", "Proforma Invoices", "PDF Download", "Auto Calculations", "Tax Support", "Mobile Friendly"].map((feature) => (
                            <div key={feature} className="flex items-center gap-2 text-sm text-gray-700 justify-center">
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
