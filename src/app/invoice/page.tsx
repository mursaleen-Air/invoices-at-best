import { Metadata } from "next";
import Link from "next/link";
import DocumentForm from "@/components/DocumentForm";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import StructuredData from "@/components/StructuredData";
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Invoice Generator — Create Professional PDF Invoices Free",
    description:
        "Create and download professional invoices as PDF in seconds. No signup required. Auto-calculated totals, tax, discounts. Perfect for freelancers and small businesses.",
    path: "/invoice",
    keywords: [
        "invoice generator",
        "create invoice online",
        "pdf invoice",
        "free invoice maker",
        "business invoice",
        "tax invoice generator",
        "invoice template",
        "professional invoice",
    ],
});

const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Invoice Generator", url: "/invoice" },
];

const faqs = [
    {
        question: "How do I create an invoice?",
        answer: "Fill in your business and customer details, add line items with descriptions, quantities and prices, set the tax rate and click Generate. Your professional PDF invoice will be ready for download instantly.",
    },
    {
        question: "Is this invoice generator really free?",
        answer: "Yes, 100% free! You can create unlimited invoices with all features — no watermarks, no trial period, no credit card required. Every template, currency, and export option is included at no cost.",
    },
    {
        question: "What fields are required on an invoice?",
        answer: "Required fields include business name, address, phone, customer name, email, document number, due date, and at least one line item with a description, quantity, and unit price.",
    },
    {
        question: "Can I add my company logo to the invoice?",
        answer: "Yes! Upload your company logo in the form and it will appear on the top of your invoice PDF. We support PNG, JPG, and SVG formats for crisp, professional branding.",
    },
    {
        question: "Does it support multiple currencies?",
        answer: "Absolutely. Choose from USD, EUR, GBP, CAD, AUD, INR, PKR, and many more currencies. The selected currency symbol appears automatically on all amounts.",
    },
    {
        question: "Can I customize the invoice template?",
        answer: "Yes, we offer multiple professionally designed templates. Choose your preferred layout, colors, and font style. You can also drag and rearrange invoice sections in the live preview.",
    },
    {
        question: "How does the tax calculation work?",
        answer: "Enter your tax percentage (e.g., 10 for 10% GST or VAT), and the generator automatically calculates the tax amount for your subtotal. The tax, subtotal, discounts, and total are all computed in real time.",
    },
    {
        question: "What if my client doesn't pay on time?",
        answer: "Set clear payment terms (Net 15, Net 30) on your invoice and include late payment notes. Having a dated, numbered invoice serves as a legal record if you need to follow up or escalate.",
    },
    {
        question: "Can I use this for 1099 contractor invoicing?",
        answer: "Yes. Independent contractors in the US can use our generator to create properly numbered and dated invoices suitable for IRS record-keeping and tax filing purposes.",
    },
    {
        question: "Is the generated PDF suitable for accounting software?",
        answer: "Yes. The PDF invoices generated are standard A4 format documents that can be uploaded to QuickBooks, Xero, FreshBooks, Wave, or any other accounting platform that accepts PDF invoices.",
    },
];

export default function InvoicePage() {
    return (
        <AdWrappedLayout>
            <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />
            <StructuredData data={generateFAQSchema(faqs)} />

            <div className="min-h-[calc(100vh-140px)] relative overflow-hidden">
                {/* Background */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-blue-50/60 via-indigo-50/40 to-transparent -z-10 pointer-events-none" />
                <div className="absolute top-32 right-0 w-[400px] h-[400px] bg-indigo-100/25 rounded-full blur-3xl -z-10 animate-float" />
                <div className="absolute top-60 left-10 w-[260px] h-[260px] bg-violet-100/20 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: "3s" }} />

                {/* Hero */}
                <section className="py-16 md:py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-indigo-600 rounded-full text-sm font-semibold mb-6 border border-indigo-100 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Professional Invoicing
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
                            Create{" "}
                            <span className="text-gradient relative inline-block">
                                Invoices
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-indigo-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                                </svg>
                            </span>{" "}
                            in Seconds
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 text-balance leading-relaxed">
                            Fill in the details below to generate a professional PDF invoice with
                            automatic tax calculation, discounts, and instant download.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap justify-center gap-3 mb-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
                            {["Auto Tax Calculation", "Instant PDF", "No Signup", "Free"].map((f) => (
                                <span key={f} className="badge-indigo">
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
                        <DocumentForm documentType="invoice" />
                    </div>
                </section>

                {/* SEO Content Section */}
                <section className="px-4 pb-16">
                    <div className="max-w-4xl mx-auto">

                        {/* How to Create an Invoice */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">How to Create an Invoice Online in 3 Simple Steps</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Creating a professional invoice has never been easier. Our <strong>free invoice generator</strong> lets you produce polished, ready-to-send PDF invoices in under two minutes — no accounting software required. Whether you&apos;re a freelancer billing a client for the first time or a seasoned small-business owner who processes dozens of invoices a month, the workflow is the same:
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 my-8">
                                <div className="glass-card text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">1</div>
                                    <h3 className="font-bold text-slate-900 mb-2">Enter Your Details</h3>
                                    <p className="text-sm text-slate-600">Add your business name, address, phone number, and logo. Then fill in your customer&apos;s name, email, and billing address. Our form auto-generates a unique invoice number for you.</p>
                                </div>
                                <div className="glass-card text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">2</div>
                                    <h3 className="font-bold text-slate-900 mb-2">Add Line Items</h3>
                                    <p className="text-sm text-slate-600">List each product or service with a description, quantity, and unit price. The invoice generator automatically calculates subtotals, applies your tax percentage, and factors in any discounts.</p>
                                </div>
                                <div className="glass-card text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">3</div>
                                    <h3 className="font-bold text-slate-900 mb-2">Preview &amp; Download</h3>
                                    <p className="text-sm text-slate-600">Click &quot;Preview &amp; Download&quot; to see a pixel-perfect live preview. Drag sections to rearrange, click text to edit inline, then hit Download PDF to save your professional invoice instantly.</p>
                                </div>
                            </div>
                        </div>

                        {/* Why Use Our Invoice Generator */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Use Our Free Invoice Generator?</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                There are hundreds of invoice tools online, but most lock essential features behind a paywall. Our <strong>online invoice maker</strong> is different — every feature is completely free, with no hidden costs, no trial periods, and no watermarks on your PDFs. Here&apos;s why thousands of freelancers, contractors, and small businesses choose Invoices at Best:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 my-6">
                                {[
                                    { title: "100% Free — No Strings Attached", desc: "Generate unlimited invoices without paying a cent. We don't add watermarks, limit downloads, or gate features behind a paywall. Every template, every feature — free forever." },
                                    { title: "Automatic Tax Calculation", desc: "Enter your tax rate once, and every line item total is calculated automatically. Support for GST, VAT, sales tax, and custom tax percentages ensures accuracy across jurisdictions." },
                                    { title: "Professional PDF Output", desc: "Every invoice you create is rendered as a crisp, high-resolution PDF document that looks great whether printed, emailed, or uploaded to an accounting platform." },
                                    { title: "Multiple Templates", desc: "Choose from a curated library of invoice templates — from clean minimalist layouts to bold, colorful designs. Each template is optimized for readability and professional appearance." },
                                    { title: "Drag-and-Drop Live Preview", desc: "See your invoice exactly as it will appear in the final PDF before downloading. Rearrange sections, edit text inline, and customize the layout to match your brand." },
                                    { title: "No Signup Required to Start", desc: "Start creating your invoice immediately — no registration, no email verification, no credit card. Just fill in the form and download. Sign in only when you want to save your work." },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
                                        <svg className="w-6 h-6 text-indigo-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                                            <p className="text-sm text-slate-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Who Is It For */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Who Is This Invoice Generator For?</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Our free invoice generator is designed for anyone who needs to bill clients quickly and professionally. Whether you operate as a sole proprietor, a registered LLC, or an international contractor, this tool adapts to your needs:
                            </p>
                            <ul className="space-y-3 text-slate-600 mb-4">
                                <li className="flex gap-2"><span className="font-bold text-indigo-600">•</span> <strong>Freelancers &amp; Independent Contractors</strong> — web developers, graphic designers, writers, consultants, and virtual assistants who need to invoice clients regularly without expensive accounting software.</li>
                                <li className="flex gap-2"><span className="font-bold text-indigo-600">•</span> <strong>Small Business Owners</strong> — retail shops, service providers, agencies, and startups that want clean, branded invoices without the overhead of a full ERP system.</li>
                                <li className="flex gap-2"><span className="font-bold text-indigo-600">•</span> <strong>1099 Contractors</strong> — independent workers in the United States who need dated, numbered invoices for tax reporting and IRS compliance.</li>
                                <li className="flex gap-2"><span className="font-bold text-indigo-600">•</span> <strong>International Sellers</strong> — exporters and e-commerce sellers who need invoices with proper tax ID fields, currency support, and clear payment terms for cross-border trade.</li>
                                <li className="flex gap-2"><span className="font-bold text-indigo-600">•</span> <strong>Students &amp; Side-Hustlers</strong> — tutors, photographers, event planners, and gig workers who invoice occasionally and don&apos;t want to pay for software they barely use.</li>
                            </ul>
                        </div>

                        {/* What Makes a Good Invoice */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">What Should a Professional Invoice Include?</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                A well-crafted invoice is more than just a payment request — it&apos;s a legal document that protects both you and your client. Here are the essential elements every <strong>professional invoice</strong> should contain:
                            </p>
                            <div className="bg-gradient-to-br from-indigo-50 to-violet-50 rounded-2xl p-6 md:p-8 border border-indigo-100 mb-6">
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                                    <div className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span> Your business name, address, and contact information</div>
                                    <div className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span> Client&apos;s name, email, and billing address</div>
                                    <div className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span> A unique invoice number for record-keeping</div>
                                    <div className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span> Invoice date and payment due date</div>
                                    <div className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span> Itemized list of products or services with quantities and unit prices</div>
                                    <div className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span> Subtotal, tax amount, discounts, and total due</div>
                                    <div className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span> Payment terms (Net 15, Net 30, Due on Receipt)</div>
                                    <div className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span> Payment methods accepted (bank transfer, PayPal, etc.)</div>
                                    <div className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span> Your tax ID or VAT registration number (if applicable)</div>
                                    <div className="flex gap-2"><span className="text-indigo-500 font-bold">✓</span> Additional notes or terms of service</div>
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Our invoice generator includes all of these fields by default, ensuring your invoices meet professional standards and comply with common tax regulations across the US, UK, EU, Canada, Australia, and other markets.
                            </p>
                        </div>

                        {/* Invoice vs Other Documents */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Invoice vs. Receipt vs. Quotation — What&apos;s the Difference?</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Many people confuse invoices with receipts and quotations, but each serves a distinct purpose in the business transaction lifecycle:
                            </p>
                            <div className="overflow-x-auto rounded-xl border border-slate-200 mb-6">
                                <table className="w-full text-sm">
                                    <thead className="bg-slate-50">
                                        <tr>
                                            <th className="text-left px-4 py-3 font-semibold text-slate-900 border-b">Document</th>
                                            <th className="text-left px-4 py-3 font-semibold text-slate-900 border-b">Purpose</th>
                                            <th className="text-left px-4 py-3 font-semibold text-slate-900 border-b">When Sent</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-slate-600">
                                        <tr className="border-b">
                                            <td className="px-4 py-3 font-medium text-indigo-600">Invoice</td>
                                            <td className="px-4 py-3">A payment request for goods or services delivered</td>
                                            <td className="px-4 py-3">After delivery, before payment</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="px-4 py-3 font-medium text-emerald-600">Receipt</td>
                                            <td className="px-4 py-3">Proof that payment has been received</td>
                                            <td className="px-4 py-3">After payment is completed</td>
                                        </tr>
                                        <tr className="border-b">
                                            <td className="px-4 py-3 font-medium text-amber-600">Quotation</td>
                                            <td className="px-4 py-3">A price estimate before work begins</td>
                                            <td className="px-4 py-3">Before agreement, during negotiation</td>
                                        </tr>
                                        <tr>
                                            <td className="px-4 py-3 font-medium text-fuchsia-600">Proforma</td>
                                            <td className="px-4 py-3">A preliminary invoice for customs or advance billing</td>
                                            <td className="px-4 py-3">Before shipment or service delivery</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Understanding these distinctions helps you send the right document at the right stage. Use our <Link href="/receipt" className="text-indigo-600 hover:underline font-medium">receipt generator</Link> for payment confirmations, our <Link href="/quotation" className="text-indigo-600 hover:underline font-medium">quotation generator</Link> for price estimates, and our <Link href="/proforma" className="text-indigo-600 hover:underline font-medium">proforma invoice maker</Link> for customs and pre-delivery billing.
                            </p>
                        </div>

                        {/* Best Practices */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Invoice Best Practices to Get Paid Faster</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Creating the invoice is just the first step. To maximize your chances of getting paid on time, follow these proven invoicing best practices used by successful freelancers and businesses worldwide:
                            </p>
                            <ol className="space-y-4 text-slate-600 list-decimal list-inside mb-4">
                                <li><strong>Invoice promptly.</strong> Send your invoice as soon as the work is completed or the product is delivered. The faster you invoice, the faster you get paid. Delays in invoicing signal that payment isn&apos;t urgent.</li>
                                <li><strong>Use clear payment terms.</strong> Specify exactly when payment is due (Net 15, Net 30, or Due on Receipt) and what happens if payment is late. Clear terms set expectations and reduce disputes.</li>
                                <li><strong>Include multiple payment options.</strong> Make it easy for clients to pay by offering bank transfer, PayPal, Stripe, or credit card options. The fewer friction points, the faster the payment.</li>
                                <li><strong>Number your invoices sequentially.</strong> A consistent numbering system (e.g., INV-202601-0001) helps with bookkeeping, tax filing, and auditing. Our generator does this automatically.</li>
                                <li><strong>Follow up politely.</strong> If payment is overdue, send a friendly reminder at Day 7, a firmer one at Day 14, and a final notice at Day 30. Document every communication.</li>
                                <li><strong>Keep copies of everything.</strong> Store PDF copies of all invoices for your records. Most tax jurisdictions require you to retain invoices for 3-7 years for audit purposes.</li>
                            </ol>
                        </div>

                        {/* FAQ Section */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions About Invoicing</h2>
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
                        <p className="text-slate-500 text-sm text-center mb-8">We also generate receipts, quotations, and proforma invoices — all free.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link href="/receipt" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">Receipt Generator</h3>
                                <p className="text-xs text-slate-500">Create payment receipts with automatic PAID stamp</p>
                            </Link>
                            <Link href="/quotation" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">Quotation Generator</h3>
                                <p className="text-xs text-slate-500">Send professional price estimates with validity terms</p>
                            </Link>
                            <Link href="/proforma" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1">Proforma Invoice</h3>
                                <p className="text-xs text-slate-500">Preliminary invoices for international trade &amp; customs</p>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </AdWrappedLayout>
    );
}
