import { Metadata } from "next";
import Link from "next/link";
import DocumentForm from "@/components/DocumentForm";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import StructuredData from "@/components/StructuredData";
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Proforma Invoice Generator — Customs & International Trade",
    description:
        "Create professional proforma invoices for customs and international trade. Include shipping costs, expected shipment date, and detailed terms of sale (CIF, FOB).",
    path: "/proforma",
    keywords: [
        "proforma invoice generator",
        "customs invoice",
        "international trade invoice",
        "create proforma online",
        "commercial invoice template",
        "shipping invoice",
        "export billing",
        "preliminary invoice",
    ],
});

const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Proforma Invoice Generator", url: "/proforma" },
];

const faqs = [
    {
        question: "What is a proforma invoice?",
        answer: "A proforma invoice is a preliminary bill of sale sent to buyers before goods are shipped. It declares the seller’s commitment to deliver goods at a specified price, quantity, and delivery terms. It is not a demand for payment.",
    },
    {
        question: "Is this proforma invoice generator free?",
        answer: "Yes, 100% free! Create unlimited proforma invoices with all features including shipping costs, tax IDs, bespoke terms of sale, and country of origin fields — no watermarks, no trial, no payment required.",
    },
    {
        question: "Is it suitable for customs clearance?",
        answer: "Yes. Our proforma template includes all fields required by customs authorities worldwide — seller and buyer addresses, HS codes, country of origin, tax/VAT IDs, weight, and Incoterms (CIF, FOB, etc.).",
    },
    {
        question: "Can I add shipping costs?",
        answer: "Absolutely. You can include estimated shipping costs, expected shipment dates, package dimensions, total weight, and terms of sale (CIF, FOB, EXW) directly on the proforma invoice.",
    },
    {
        question: "What's the difference between proforma and commercial invoice?",
        answer: "A proforma invoice is a preliminary estimate issued BEFORE shipment. A commercial invoice is the final, binding document issued AFTER goods are shipped, used for customs duty calculation and payment collection.",
    },
    {
        question: "Can I add my company logo?",
        answer: "Yes! Upload your company logo in the form and it appears on your proforma PDF. We support PNG, JPG, and SVG for professional, branded international trade documents.",
    },
    {
        question: "Does it support multiple currencies?",
        answer: "Yes. Choose from USD, EUR, GBP, CAD, AUD, INR, PKR, CNY, JPY, and many more. The selected currency symbol appears on all amounts automatically.",
    },
    {
        question: "Can I include Incoterms on the proforma?",
        answer: "Yes. Use the terms of sale or notes field to specify Incoterms (FOB, CIF, EXW, DDP, etc.) which define the responsibilities of buyer and seller in international shipping.",
    },
    {
        question: "Do banks accept this proforma for Letters of Credit?",
        answer: "Our proforma invoices include all standard fields that banks typically require for Letters of Credit processing. However, always verify specific requirements with your bank beforehand.",
    },
    {
        question: "Can I use it for advance payment requests?",
        answer: "Yes. Proforma invoices are commonly used to request advance or partial payment before production or shipment. Include your bank details in the notes field for wire transfer instructions.",
    },
];

export default function ProformaPage() {
    return (
        <AdWrappedLayout>
            <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />
            <StructuredData data={generateFAQSchema(faqs)} />

            <div className="min-h-[calc(100vh-140px)] relative overflow-hidden">
                {/* Background */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-fuchsia-50/60 via-purple-50/40 to-transparent -z-10 pointer-events-none" />
                <div className="absolute top-32 right-0 w-[400px] h-[400px] bg-fuchsia-100/25 rounded-full blur-3xl -z-10 animate-float" />
                <div className="absolute top-60 left-10 w-[260px] h-[260px] bg-purple-100/20 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: "3s" }} />

                {/* Hero */}
                <section className="py-16 md:py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-fuchsia-600 rounded-full text-sm font-semibold mb-6 border border-fuchsia-100 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            International Trade & Customs
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
                            Create <span className="bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-purple-600 relative inline-block">Proforma Invoices</span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 text-balance leading-relaxed">
                            Generate preliminary invoices for international trade. Include shipping details, customs information, and detailed terms of sale.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap justify-center gap-3 mb-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
                            {["Customs Ready", "Shipping Costs", "Trade Terms (CIF/FOB)", "Free"].map((f) => (
                                <span key={f} className="badge bg-fuchsia-50 text-fuchsia-700 border border-fuchsia-100">
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
                        <DocumentForm documentType="proforma" />
                    </div>
                </section>

                {/* SEO Content Section */}
                <section className="px-4 pb-16">
                    <div className="max-w-4xl mx-auto">

                        {/* How to Create a Proforma Invoice */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">How to Create a Proforma Invoice Online in 3 Steps</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                A <strong>proforma invoice</strong> is an essential document in international trade. It provides your buyer with a detailed preview of the transaction before goods are shipped. Our <strong>free proforma invoice generator</strong> simplifies this process:
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 my-8">
                                <div className="glass-card text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">1</div>
                                    <h3 className="font-bold text-slate-900 mb-2">Enter Seller &amp; Buyer Details</h3>
                                    <p className="text-sm text-slate-600">Add your company name, address, phone, tax ID, and logo. Then enter the buyer&apos;s full name, address, and email. Include country of origin for customs processing.</p>
                                </div>
                                <div className="glass-card text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">2</div>
                                    <h3 className="font-bold text-slate-900 mb-2">Add Items &amp; Shipping</h3>
                                    <p className="text-sm text-slate-600">List each product with descriptions, HS codes, quantities, and unit prices. Add estimated shipping costs, delivery terms (FOB, CIF), expected shipment date, and package details.</p>
                                </div>
                                <div className="glass-card text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">3</div>
                                    <h3 className="font-bold text-slate-900 mb-2">Preview &amp; Download</h3>
                                    <p className="text-sm text-slate-600">See a live preview of your proforma invoice, rearrange sections, edit text inline, then download as a professional PDF ready for your buyer and customs authorities.</p>
                                </div>
                            </div>
                        </div>

                        {/* Why Use Our Proforma Generator */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Use Our Free Proforma Invoice Generator?</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                International trade documents need to be accurate, professional, and compliant with customs regulations. Our <strong>online proforma invoice maker</strong> is built specifically for exporters, importers, and international sellers:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 my-6">
                                {[
                                    { title: "Customs-Ready Format", desc: "Every proforma includes fields for HS codes, country of origin, shipping terms (Incoterms), tax IDs, and package dimensions — all the information customs authorities need." },
                                    { title: "Shipping Cost Integration", desc: "Add estimated freight charges, insurance costs, and handling fees as separate line items. Essential for CIF and DDP transactions where shipping is part of the quoted price." },
                                    { title: "International Currency Support", desc: "Choose from 20+ currencies including USD, EUR, GBP, CNY, JPY, INR, and more. The selected currency is displayed on all amounts for clarity in cross-border transactions." },
                                    { title: "Professional PDF Output", desc: "Generate crisp, high-resolution PDF documents that look professional when submitted to banks for Letters of Credit or to customs brokers for import clearance." },
                                    { title: "Multiple Templates", desc: "Choose from professionally designed templates optimized for international trade documents. Clean layouts ensure all critical information is easy to find and verify." },
                                    { title: "100% Free, No Limits", desc: "Create unlimited proforma invoices without any cost, watermarks, or feature restrictions. Perfect for exporters who issue dozens of proformas every month." },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
                                        <svg className="w-6 h-6 text-fuchsia-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                                            <p className="text-sm text-slate-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Who Needs Proforma Invoices */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Who Needs a Proforma Invoice?</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Proforma invoices play a critical role in international trade and various pre-sale scenarios. Here&apos;s who benefits most from using them:
                            </p>
                            <ul className="space-y-3 text-slate-600 mb-4">
                                <li className="flex gap-2"><span className="font-bold text-fuchsia-600">•</span> <strong>Exporters &amp; Manufacturers</strong> — businesses shipping goods internationally who need to provide buyers with advance pricing, shipping estimates, and customs-required documentation before shipment.</li>
                                <li className="flex gap-2"><span className="font-bold text-fuchsia-600">•</span> <strong>Import/Export Brokers</strong> — trade intermediaries who need professional proforma documents for customs declarations, duty calculations, and import license applications.</li>
                                <li className="flex gap-2"><span className="font-bold text-fuchsia-600">•</span> <strong>B2B Sellers</strong> — wholesalers and distributors who send preliminary invoices to business buyers for budget approval or purchase order processing before committing to supply.</li>
                                <li className="flex gap-2"><span className="font-bold text-fuchsia-600">•</span> <strong>Letter of Credit Applicants</strong> — sellers who need to provide their buyer’s bank with a proforma invoice to open an LC, the most common payment method in international trade.</li>
                                <li className="flex gap-2"><span className="font-bold text-fuchsia-600">•</span> <strong>E-commerce Sellers with Global Shipping</strong> — online sellers on Amazon, Alibaba, or independent stores who ship internationally and need proforma invoices for customs in the destination country.</li>
                            </ul>
                        </div>

                        {/* What Should a Proforma Include */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Essential Elements of a Proforma Invoice</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                A complete <strong>proforma invoice for customs</strong> and international trade should include all of the following elements to be accepted by customs authorities and banks:
                            </p>
                            <div className="bg-gradient-to-br from-fuchsia-50 to-purple-50 rounded-2xl p-6 md:p-8 border border-fuchsia-100 mb-6">
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                                    <div className="flex gap-2"><span className="text-fuchsia-500 font-bold">✓</span> Seller&apos;s full name, address, and tax/VAT ID</div>
                                    <div className="flex gap-2"><span className="text-fuchsia-500 font-bold">✓</span> Buyer&apos;s full name, address, and contact info</div>
                                    <div className="flex gap-2"><span className="text-fuchsia-500 font-bold">✓</span> Unique proforma invoice number and date</div>
                                    <div className="flex gap-2"><span className="text-fuchsia-500 font-bold">✓</span> Detailed item descriptions with HS codes</div>
                                    <div className="flex gap-2"><span className="text-fuchsia-500 font-bold">✓</span> Quantities, unit prices, and total value</div>
                                    <div className="flex gap-2"><span className="text-fuchsia-500 font-bold">✓</span> Country of origin of the goods</div>
                                    <div className="flex gap-2"><span className="text-fuchsia-500 font-bold">✓</span> Shipping terms (Incoterms: FOB, CIF, EXW, DDP)</div>
                                    <div className="flex gap-2"><span className="text-fuchsia-500 font-bold">✓</span> Estimated shipping cost, weight, and dimensions</div>
                                    <div className="flex gap-2"><span className="text-fuchsia-500 font-bold">✓</span> Expected shipment and delivery dates</div>
                                    <div className="flex gap-2"><span className="text-fuchsia-500 font-bold">✓</span> Payment terms and bank details for wire transfer</div>
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Our proforma invoice generator includes all of these fields, ensuring your documents are accepted by customs authorities, freight forwarders, and banks worldwide.
                            </p>
                        </div>

                        {/* Proforma vs Commercial Invoice */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Proforma Invoice vs. Commercial Invoice — Key Differences</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                These two documents look similar but serve different purposes in international trade. Understanding the distinction is critical for proper customs compliance:
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 my-6">
                                <div className="p-5 rounded-xl border border-fuchsia-100 bg-fuchsia-50/40">
                                    <h3 className="font-bold text-fuchsia-700 mb-2">Proforma Invoice</h3>
                                    <ul className="text-sm text-slate-600 space-y-1">
                                        <li>• Issued <em>before</em> shipment</li>
                                        <li>• Provides an <em>estimate</em> of costs</li>
                                        <li>• Not a demand for payment</li>
                                        <li>• Used for customs pre-clearance &amp; LCs</li>
                                        <li>• Prices may change in final invoice</li>
                                    </ul>
                                </div>
                                <div className="p-5 rounded-xl border border-indigo-100 bg-indigo-50/40">
                                    <h3 className="font-bold text-indigo-700 mb-2">Commercial Invoice</h3>
                                    <ul className="text-sm text-slate-600 space-y-1">
                                        <li>• Issued <em>after</em> shipment</li>
                                        <li>• States the <em>final</em> transaction value</li>
                                        <li>• Is a legal demand for payment</li>
                                        <li>• Used for customs duty calculation</li>
                                        <li>• Prices are binding and final</li>
                                    </ul>
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                In most international transactions, you first send a <strong>proforma invoice</strong> to confirm the deal terms, then issue a <Link href="/invoice" className="text-fuchsia-600 hover:underline font-medium">commercial invoice</Link> once goods are shipped. After payment, issue a <Link href="/receipt" className="text-fuchsia-600 hover:underline font-medium">receipt</Link> to confirm the transaction is complete.
                            </p>
                        </div>

                        {/* International Trade Tips */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Proforma Invoice Tips for International Trade</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Issuing a proforma invoice correctly can prevent customs delays, payment disputes, and compliance issues. Follow these tips used by experienced exporters:
                            </p>
                            <ol className="space-y-4 text-slate-600 list-decimal list-inside mb-4">
                                <li><strong>Use accurate HS codes.</strong> Harmonized System codes determine the customs duty rate. Incorrect HS codes can lead to overpayment, underpayment, seizure of goods, or delays. When in doubt, consult your customs broker.</li>
                                <li><strong>Specify Incoterms clearly.</strong> Incoterms (FOB, CIF, EXW, DDP) define who pays for shipping, insurance, and duties. Mismatched expectations are the #1 cause of international trade disputes.</li>
                                <li><strong>Include all costs.</strong> List the product value, shipping charges, insurance, handling fees, and any other costs separately. Customs authorities need to see the complete landed cost for duty calculation.</li>
                                <li><strong>State the currency explicitly.</strong> International transactions involve multiple currencies. Always state the currency code (USD, EUR, GBP) clearly on every amount to avoid confusion.</li>
                                <li><strong>Mark it clearly as &quot;PROFORMA.&quot;</strong> This prevents customs from treating it as a commercial invoice, which could trigger premature duty assessment. Our generator labels it automatically.</li>
                                <li><strong>Keep it consistent.</strong> The final commercial invoice should closely match the proforma. Significant discrepancies between the two documents can cause customs to flag the shipment for inspection.</li>
                            </ol>
                        </div>

                        {/* FAQ Section */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions About Proforma Invoices</h2>
                            <div className="space-y-6">
                                {faqs.map((faq, i) => (
                                    <div key={i} className="bg-white border border-slate-200 rounded-xl p-5">
                                        <h3 className="font-semibold text-slate-900 mb-2">{faq.question}</h3>
                                        <p className="text-slate-600 text-sm leading-relaxed">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cross-links to other document types */}
                <section className="px-4 pb-20">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">Need a Different Document?</h2>
                        <p className="text-slate-500 text-sm text-center mb-8">Also create invoices, receipts, and quotations — all completely free.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link href="/invoice" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors mb-1">Invoice Generator</h3>
                                <p className="text-xs text-slate-500">Professional invoices with auto tax calculation</p>
                            </Link>
                            <Link href="/receipt" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors mb-1">Receipt Generator</h3>
                                <p className="text-xs text-slate-500">Create payment receipts with automatic PAID stamp</p>
                            </Link>
                            <Link href="/quotation" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-purple-600 transition-colors mb-1">Quotation Generator</h3>
                                <p className="text-xs text-slate-500">Send professional price estimates with validity terms</p>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </AdWrappedLayout>
    );
}
