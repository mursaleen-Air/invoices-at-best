import { Metadata } from "next";
import DocumentForm from "@/components/DocumentForm";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Free Proforma Invoice Maker — Generate Proforma Invoices",
    description:
        "Create professional proforma invoices for international trade and business estimates. Free online proforma invoice generator with PDF download.",
    path: "/proforma-invoice-maker",
    keywords: ["proforma invoice maker", "proforma generator", "preliminary invoice", "international trade invoice"],
});

export default function ProformaInvoiceMakerPage() {
    return (
        <div className="min-h-[calc(100vh-140px)]">
            <section className="py-20 px-4 bg-gradient-to-br from-purple-50 via-white to-violet-50">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                        Free Proforma Invoice Generator
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Proforma{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-violet-600">
                            Invoice Maker
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        Generate professional proforma invoices for international trade, large projects, and preliminary billing. Download as PDF instantly.
                    </p>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <DocumentForm documentType="proforma" />
                </div>
            </section>

            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">When to Use a Proforma Invoice</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            { title: "International Trade", desc: "Proforma invoices are essential for customs declarations, import licenses, and letters of credit in cross-border transactions." },
                            { title: "Large Project Estimates", desc: "Provide detailed cost breakdowns before work begins. Protect both parties with clear pricing commitments." },
                            { title: "Pre-Payment Requests", desc: "When deposits or advance payments are required, proforma invoices clearly document what the payment covers." },
                            { title: "New Client Onboarding", desc: "Set clear expectations with new clients by providing a detailed proforma before the formal engagement begins." },
                        ].map((item, idx) => (
                            <div key={idx} className="glass-card">
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
