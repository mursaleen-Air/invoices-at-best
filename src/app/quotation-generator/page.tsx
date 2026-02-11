import { Metadata } from "next";
import DocumentForm from "@/components/DocumentForm";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Free Quotation Generator — Create Price Quotes Online",
    description:
        "Generate professional quotations instantly. Create detailed price quotes for your clients with automatic calculations and PDF download.",
    path: "/quotation-generator",
    keywords: ["quotation generator", "price quote maker", "free quotation template", "business quote"],
});

export default function QuotationGeneratorPage() {
    return (
        <div className="min-h-[calc(100vh-140px)]">
            <section className="py-20 px-4 bg-gradient-to-br from-orange-50 via-white to-amber-50">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
                        Free Quotation Generator
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Professional{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-amber-600">
                            Quotation Generator
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        Win more clients with professional price quotes. Create detailed quotations with itemized pricing, tax calculations, and instant PDF download.
                    </p>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <DocumentForm documentType="quotation" />
                </div>
            </section>

            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Close More Deals with Professional Quotes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Win More Business", desc: "Professional quotations demonstrate competence and increase your conversion rate with potential clients." },
                            { title: "Itemized Pricing", desc: "Break down costs clearly so clients understand exactly what they are paying for. Transparency builds trust." },
                            { title: "Quick Turnaround", desc: "Generate quotes in seconds, not hours. Respond to client requests faster than your competition." },
                        ].map((item, idx) => (
                            <div key={idx} className="glass-card text-center">
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
