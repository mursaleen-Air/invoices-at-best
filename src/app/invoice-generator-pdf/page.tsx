import { Metadata } from "next";
import DocumentForm from "@/components/DocumentForm";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Invoice Generator PDF — Download Professional PDF Invoices",
    description:
        "Generate professional PDF invoices instantly. Our invoice generator creates polished, print-ready PDF documents with automatic calculations and tax support.",
    path: "/invoice-generator-pdf",
    keywords: ["invoice generator pdf", "pdf invoice maker", "download invoice pdf", "invoice to pdf"],
});

export default function InvoiceGeneratorPDFPage() {
    return (
        <div className="min-h-[calc(100vh-140px)]">
            <section className="py-20 px-4 bg-gradient-to-br from-red-50 via-white to-rose-50">
                <div className="max-w-4xl mx-auto text-center">
                    <span className="inline-block px-4 py-1.5 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-6">
                        Instant PDF Download
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Invoice Generator{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-600">
                            PDF
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
                        Create professional, print-ready PDF invoices in seconds. Fill in the form below, click generate, and download your polished invoice instantly.
                    </p>
                </div>
            </section>

            <section className="py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <DocumentForm documentType="invoice" />
                </div>
            </section>

            <section className="py-20 px-4 bg-gray-50">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Why PDF Invoices?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { title: "Universal Format", desc: "PDF files open on any device, operating system, or browser. Your clients will always be able to view your invoices." },
                            { title: "Print-Ready", desc: "Our PDFs are formatted for standard paper sizes with proper margins, ensuring perfect prints every time." },
                            { title: "Tamper-Proof", desc: "PDF invoices cannot be accidentally edited by recipients, maintaining the integrity of your billing documents." },
                            { title: "Professional Appearance", desc: "PDF preserves your invoice layout exactly as designed, ensuring a consistent, professional look." },
                            { title: "Easy to Share", desc: "Attach to emails, upload to client portals, or share via any messaging platform. PDFs work everywhere." },
                            { title: "Archival Quality", desc: "PDF documents maintain their formatting indefinitely, making them perfect for long-term record keeping." },
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
