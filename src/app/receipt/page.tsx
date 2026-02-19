import { Metadata } from "next";
import Link from "next/link";
import DocumentForm from "@/components/DocumentForm";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import StructuredData from "@/components/StructuredData";
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Receipt Generator — Create Professional Payment Receipts Free",
    description:
        "Generate and download custom payment receipts instantly. Add your logo, business details, and payment method. perfect for freelancers and small businesses.",
    path: "/receipt",
    keywords: [
        "receipt generator",
        "create receipt online",
        "payment receipt maker",
        "free receipt template",
        "business receipt",
        "cash receipt generator",
        "sales receipt",
        "pdf receipt",
    ],
});

const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Receipt Generator", url: "/receipt" },
];

const faqs = [
    {
        question: "How do I create a receipt?",
        answer: "Enter the business and customer details, list the items or services sold, specify the payment method (Cash, Card, Transfer), and click Generate PDF. Your receipt will include an automatic PAID stamp.",
    },
    {
        question: "Is this receipt generator free?",
        answer: "Yes, completely free! Generate unlimited receipts with no watermarks, no trial limits, and no credit card required. All templates and features are included at zero cost.",
    },
    {
        question: "Can I show the payment method on the receipt?",
        answer: "Yes, our receipt template includes a dedicated field for Payment Method so you can specify how the payment was received — Cash, Credit Card, Bank Transfer, PayPal, or custom.",
    },
    {
        question: "Is there a PAID stamp on the receipt?",
        answer: "Yes, all receipts generated with our tool automatically include a professional green PAID stamp to clearly indicate the payment status. This cannot be removed.",
    },
    {
        question: "Can I add my company logo to the receipt?",
        answer: "Absolutely! Upload your logo in the form and it will appear on your receipt PDF. We support PNG, JPG, and SVG formats for professional branding.",
    },
    {
        question: "What's the difference between a receipt and an invoice?",
        answer: "An invoice is a payment request sent BEFORE payment. A receipt is proof of payment issued AFTER the customer has paid. Receipts confirm the transaction is complete.",
    },
    {
        question: "Does it support multiple currencies?",
        answer: "Yes! Choose from USD, EUR, GBP, CAD, AUD, INR, PKR, and many other currencies. The selected currency symbol appears automatically on all receipt amounts.",
    },
    {
        question: "Can I use these receipts for tax purposes?",
        answer: "Yes. Our receipts include all legally required information: business details, customer info, itemized transactions, tax amounts, dates, and unique receipt numbers suitable for tax records.",
    },
    {
        question: "Do I need to create an account?",
        answer: "You can start creating receipts immediately without any account. Sign in is only required when you download the PDF — it’s free and takes just seconds.",
    },
    {
        question: "Can I email the receipt directly to my customer?",
        answer: "Currently, the tool generates a PDF download. You can then attach this PDF to any email client, messaging app, or accounting platform to send it to your customer.",
    },
];

export default function ReceiptPage() {
    return (
        <AdWrappedLayout>
            <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />
            <StructuredData data={generateFAQSchema(faqs)} />

            <div className="min-h-[calc(100vh-140px)] relative overflow-hidden">
                {/* Background */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-emerald-50/60 via-teal-50/40 to-transparent -z-10 pointer-events-none" />
                <div className="absolute top-32 right-0 w-[400px] h-[400px] bg-emerald-100/25 rounded-full blur-3xl -z-10 animate-float" />
                <div className="absolute top-60 left-10 w-[260px] h-[260px] bg-teal-100/20 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: "3s" }} />

                {/* Hero */}
                <section className="py-16 md:py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-emerald-600 rounded-full text-sm font-semibold mb-6 border border-emerald-100 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Proof of Payment
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
                            Create{" "}
                            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 relative inline-block">
                                Receipts
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-emerald-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                                </svg>
                            </span>{" "}
                            Instantly
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 text-balance leading-relaxed">
                            Generate professional payment receipts with automatic "PAID" stamping. Ensure your customers have clear proof of purchase record.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap justify-center gap-3 mb-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
                            {["Auto 'PAID' Stamp", "Payment Method", "Instant PDF", "Free"].map((f) => (
                                <span key={f} className="badge-green">
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
                        <DocumentForm documentType="receipt" />
                    </div>
                </section>

                {/* SEO Content Section */}
                <section className="px-4 pb-16">
                    <div className="max-w-4xl mx-auto">

                        {/* How to Create a Receipt */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">How to Create a Payment Receipt Online in 3 Steps</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Our <strong>free receipt generator</strong> makes it quick and easy to produce professional payment receipts. Whether you run a retail store, provide freelance services, or operate any cash-handling business, here&apos;s how to create a receipt in under a minute:
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 my-8">
                                <div className="glass-card text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">1</div>
                                    <h3 className="font-bold text-slate-900 mb-2">Enter Business &amp; Customer Info</h3>
                                    <p className="text-sm text-slate-600">Add your business name, address, and phone number. Then enter your customer&apos;s name and email. A unique receipt number is generated automatically.</p>
                                </div>
                                <div className="glass-card text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">2</div>
                                    <h3 className="font-bold text-slate-900 mb-2">Add Items &amp; Payment Method</h3>
                                    <p className="text-sm text-slate-600">List each item sold with description, quantity, and price. Select the payment method — Cash, Credit Card, Bank Transfer, or custom. Tax and totals are calculated automatically.</p>
                                </div>
                                <div className="glass-card text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">3</div>
                                    <h3 className="font-bold text-slate-900 mb-2">Download with PAID Stamp</h3>
                                    <p className="text-sm text-slate-600">Preview your receipt, then download as a professional PDF with an automatic green PAID stamp. Hand it to your customer as proof of payment.</p>
                                </div>
                            </div>
                        </div>

                        {/* Why Use Our Receipt Generator */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Use Our Free Receipt Generator?</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                A printed or PDF receipt is more than a courtesy — in many jurisdictions, providing a receipt is a <strong>legal requirement</strong>. Our <strong>online receipt maker</strong> helps you stay compliant and professional:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 my-6">
                                {[
                                    { title: "Automatic PAID Stamp", desc: "Every receipt gets a bold, professional PAID stamp — no manual stamping needed. This clearly confirms the payment status for your customer's records." },
                                    { title: "Payment Method Tracking", desc: "Record exactly how the customer paid: Cash, Visa, Mastercard, Bank Transfer, PayPal, or any custom method. Essential for bookkeeping and reconciliation." },
                                    { title: "Instant PDF Download", desc: "Generate a high-resolution PDF receipt in seconds. Print it, email it, or save it to your cloud storage. Perfect for both in-person and online transactions." },
                                    { title: "Tax-Compliant Format", desc: "Receipts include all legally required elements: business details, itemized list, tax breakdown, payment date, and unique receipt number for audit trails." },
                                    { title: "Multiple Templates", desc: "Choose from professional receipt templates with different color schemes and layouts. Each template is designed for clarity and easy scanning." },
                                    { title: "100% Free, No Limits", desc: "Generate as many receipts as you need without paying anything. No watermarks, no trial periods, no feature restrictions. Free means free." },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
                                        <svg className="w-6 h-6 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                                            <p className="text-sm text-slate-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Who Needs Receipts */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Who Needs a Receipt Generator?</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Payment receipts are essential for any business that accepts money from customers. Whether you operate online or in-person, receipts protect both parties in a transaction:
                            </p>
                            <ul className="space-y-3 text-slate-600 mb-4">
                                <li className="flex gap-2"><span className="font-bold text-emerald-600">•</span> <strong>Retail &amp; POS Businesses</strong> — shops, restaurants, salons, and service counters that need to issue receipts for every cash, card, or mobile payment transaction.</li>
                                <li className="flex gap-2"><span className="font-bold text-emerald-600">•</span> <strong>Freelancers &amp; Service Providers</strong> — consultants, tutors, cleaners, and handymen who receive payment and need to confirm it in writing for their clients.</li>
                                <li className="flex gap-2"><span className="font-bold text-emerald-600">•</span> <strong>Landlords &amp; Property Managers</strong> — anyone collecting rent payments who needs dated proof of payment for their tenants and their own records.</li>
                                <li className="flex gap-2"><span className="font-bold text-emerald-600">•</span> <strong>E-commerce Sellers</strong> — online sellers on Etsy, eBay, Shopify, or direct sales who want to send professional payment confirmations alongside shipping notifications.</li>
                                <li className="flex gap-2"><span className="font-bold text-emerald-600">•</span> <strong>Non-Profits &amp; Donations</strong> — charities and organizations that need to issue donation receipts with proper documentation for tax-deductible contributions.</li>
                            </ul>
                        </div>

                        {/* What Goes on a Receipt */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">What Should a Professional Receipt Include?</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                A proper <strong>payment receipt</strong> serves as legally recognized proof of a completed transaction. To be valid, it should include these essential elements:
                            </p>
                            <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 md:p-8 border border-emerald-100 mb-6">
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                                    <div className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Seller/business name, address, and contact details</div>
                                    <div className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Buyer/customer name and email</div>
                                    <div className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Unique receipt number for record-keeping</div>
                                    <div className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Date of payment (not date of invoice)</div>
                                    <div className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Itemized list of goods/services with prices</div>
                                    <div className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Tax amount and total paid</div>
                                    <div className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> Payment method (Cash, Card, Transfer)</div>
                                    <div className="flex gap-2"><span className="text-emerald-500 font-bold">✓</span> PAID status indicator or stamp</div>
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Our receipt generator fills all of these in automatically. Just enter the details and download a complete, professional receipt PDF ready to hand to your customer or file for tax purposes.
                            </p>
                        </div>

                        {/* Receipt vs Invoice */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Receipt vs. Invoice — When to Use Each</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                One of the most common questions in small business accounting is whether to send an invoice or a receipt. The answer depends on the <em>timing</em> of the payment:
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 my-6">
                                <div className="p-5 rounded-xl border border-indigo-100 bg-indigo-50/40">
                                    <h3 className="font-bold text-indigo-700 mb-2">Invoice (Before Payment)</h3>
                                    <p className="text-sm text-slate-600">An invoice is a <em>request for payment</em>. You send it after delivering goods or services, specifying what&apos;s owed and when payment is due. It says: &quot;Please pay this amount.&quot;</p>
                                </div>
                                <div className="p-5 rounded-xl border border-emerald-100 bg-emerald-50/40">
                                    <h3 className="font-bold text-emerald-700 mb-2">Receipt (After Payment)</h3>
                                    <p className="text-sm text-slate-600">A receipt is <em>proof of payment</em>. You issue it after the customer has paid, confirming the transaction is complete. It says: &quot;Payment received, thank you.&quot;</p>
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                In many cases, you&apos;ll need both: send an <Link href="/invoice" className="text-emerald-600 hover:underline font-medium">invoice</Link> first to request payment, then issue a receipt once the payment clears. For price negotiations, use a <Link href="/quotation" className="text-emerald-600 hover:underline font-medium">quotation</Link> before either.
                            </p>
                        </div>

                        {/* Best Practices */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Receipt Best Practices for Small Businesses</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Issuing receipts properly is a cornerstone of good business practice. Follow these guidelines to maintain professional standards and protect yourself legally:
                            </p>
                            <ol className="space-y-4 text-slate-600 list-decimal list-inside mb-4">
                                <li><strong>Issue a receipt for every transaction.</strong> Even if the customer doesn&apos;t ask for one, create a receipt for your own records. Many tax jurisdictions require businesses to issue receipts for all transactions above a certain threshold.</li>
                                <li><strong>Include the payment method.</strong> Recording whether payment was made by cash, card, or transfer helps with daily reconciliation and prevents disputes about whether payment was actually received.</li>
                                <li><strong>Use sequential numbering.</strong> Number your receipts consecutively (RCT-001, RCT-002, etc.) to create a clear audit trail. Gaps in receipt numbers can raise red flags during tax audits.</li>
                                <li><strong>Store copies for 3–7 years.</strong> Tax authorities in most countries require you to keep copies of all receipts (issued and received) for multiple years. PDF receipts are easier to store than paper ones.</li>
                                <li><strong>Match receipts to bank statements.</strong> Regularly verify that your issued receipts match your bank deposits. This simple practice catches errors and prevents discrepancies in your books.</li>
                                <li><strong>Add relevant notes.</strong> If the receipt covers a warranty, return policy, or specific service terms, include a brief note at the bottom. This prevents misunderstandings later.</li>
                            </ol>
                        </div>

                        {/* FAQ Section */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions About Receipts</h2>
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
                        <p className="text-slate-500 text-sm text-center mb-8">Also create invoices, quotations, and proforma invoices — all completely free.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link href="/invoice" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">Invoice Generator</h3>
                                <p className="text-xs text-slate-500">Professional invoices with auto tax calculation</p>
                            </Link>
                            <Link href="/quotation" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">Quotation Generator</h3>
                                <p className="text-xs text-slate-500">Send professional price estimates with validity terms</p>
                            </Link>
                            <Link href="/proforma" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">Proforma Invoice</h3>
                                <p className="text-xs text-slate-500">Preliminary invoices for international trade &amp; customs</p>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </AdWrappedLayout>
    );
}
