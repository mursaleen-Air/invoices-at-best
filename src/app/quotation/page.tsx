import { Metadata } from "next";
import Link from "next/link";
import DocumentForm from "@/components/DocumentForm";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import StructuredData from "@/components/StructuredData";
import { generatePageMetadata, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Quotation Generator — Create Professional Price Quotes Free",
    description:
        "Create winning price quotations and estimates in seconds. Add validity period, scope limitations, and client acceptance section. Professional PDF quote generator.",
    path: "/quotation",
    keywords: [
        "quotation generator",
        "create quote online",
        "price estimate maker",
        "free quotation template",
        "business proposal",
        "service quote",
        "estimate generator",
        "pdf quote",
    ],
});

const breadcrumbs = [
    { name: "Home", url: "/" },
    { name: "Quotation Generator", url: "/quotation" },
];

const faqs = [
    {
        question: "What is a quotation?",
        answer: "A quotation (also called a quote or estimate) is a formal document that specifies the price of goods or services offered to a potential customer. It includes itemized pricing, validity period, and terms of acceptance.",
    },
    {
        question: "Is this quotation generator free?",
        answer: "Yes, completely free! Create unlimited quotations with no watermarks, no feature restrictions, and no sign-up required to start. All templates and export options are included at zero cost.",
    },
    {
        question: "Can I set an expiry date on the quotation?",
        answer: "Yes! Our quotation generator lets you set an Expiry Date and Validity Period (e.g., 'Valid for 30 days') so your customers know how long the pricing is guaranteed.",
    },
    {
        question: "Does it include a client acceptance section?",
        answer: "Yes. Every quotation includes a dedicated Client Acceptance section with signature lines and date fields where your client can formally accept the quote.",
    },
    {
        question: "What's the difference between a quotation and an invoice?",
        answer: "A quotation is a price estimate sent BEFORE work begins. An invoice is a payment request sent AFTER goods or services have been delivered. The quotation proposes pricing; the invoice demands payment.",
    },
    {
        question: "Can I add my company logo?",
        answer: "Absolutely! Upload your logo and it will appear on the quotation PDF. Supports PNG, JPG, and SVG formats for professional, branded documents.",
    },
    {
        question: "Does it support multiple currencies?",
        answer: "Yes! Choose from USD, EUR, GBP, CAD, AUD, INR, PKR, and many more. The selected currency symbol appears automatically on all line items and totals.",
    },
    {
        question: "Can I convert a quotation to an invoice?",
        answer: "While there isn't an automatic conversion feature, you can easily copy the same details from your quotation into our invoice generator to create a matching invoice once the quote is accepted.",
    },
    {
        question: "How do I make my quotation stand out?",
        answer: "Choose a professional template, add your company logo, include clear terms of service, and set a reasonable validity period. A polished quotation shows professionalism and increases close rates.",
    },
    {
        question: "Can I include notes or terms of service?",
        answer: "Yes. There's a dedicated notes field at the bottom of the quotation where you can add payment terms, warranty information, delivery timelines, or any other custom conditions.",
    },
];

export default function QuotationPage() {
    return (
        <AdWrappedLayout>
            <StructuredData data={generateBreadcrumbSchema(breadcrumbs)} />
            <StructuredData data={generateFAQSchema(faqs)} />

            <div className="min-h-[calc(100vh-140px)] relative overflow-hidden">
                {/* Background */}
                <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-br from-amber-50/60 via-orange-50/40 to-transparent -z-10 pointer-events-none" />
                <div className="absolute top-32 right-0 w-[400px] h-[400px] bg-amber-100/25 rounded-full blur-3xl -z-10 animate-float" />
                <div className="absolute top-60 left-10 w-[260px] h-[260px] bg-orange-100/20 rounded-full blur-3xl -z-10 animate-float" style={{ animationDelay: "3s" }} />

                {/* Hero */}
                <section className="py-16 md:py-20 px-4">
                    <div className="max-w-4xl mx-auto text-center animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-amber-600 rounded-full text-sm font-semibold mb-6 border border-amber-100 shadow-sm">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Price Estimates & Proposals
                        </div>

                        <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-5 tracking-tight leading-tight">
                            Create Winning{" "}
                            <span className="text-gradient-warm relative inline-block">
                                Quotations
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-amber-200/50 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z" fill="currentColor" />
                                </svg>
                            </span>
                        </h1>

                        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-8 text-balance leading-relaxed">
                            Send professional price estimates with clear validity periods and scope limitations. help your clients say "Yes" faster.
                        </p>

                        {/* Feature pills */}
                        <div className="flex flex-wrap justify-center gap-3 mb-4 animate-fade-in" style={{ animationDelay: "300ms" }}>
                            {["Validity Terms", "Client Acceptance", "Instant PDF", "Free"].map((f) => (
                                <span key={f} className="badge-amber">
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
                        <DocumentForm documentType="quotation" />
                    </div>
                </section>

                {/* SEO Content Section */}
                <section className="px-4 pb-16">
                    <div className="max-w-4xl mx-auto">

                        {/* How to Create a Quotation */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">How to Create a Quotation Online in 3 Easy Steps</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                A clear, professional quotation can be the difference between winning and losing a deal. Our <strong>free quotation generator</strong> helps you create polished, branded price quotes that impress prospective clients and close deals faster:
                            </p>
                            <div className="grid md:grid-cols-3 gap-6 my-8">
                                <div className="glass-card text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">1</div>
                                    <h3 className="font-bold text-slate-900 mb-2">Enter Your Details</h3>
                                    <p className="text-sm text-slate-600">Add your company name, address, phone, and logo. Then fill in your prospective client&apos;s name and email. A unique quotation number is generated automatically.</p>
                                </div>
                                <div className="glass-card text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">2</div>
                                    <h3 className="font-bold text-slate-900 mb-2">Add Line Items &amp; Terms</h3>
                                    <p className="text-sm text-slate-600">List each product or service with a description, quantity, and unit price. Set the tax rate, validity period, expiry date, and any special terms or conditions.</p>
                                </div>
                                <div className="glass-card text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">3</div>
                                    <h3 className="font-bold text-slate-900 mb-2">Preview &amp; Send</h3>
                                    <p className="text-sm text-slate-600">Preview the quotation in real time, rearrange sections, edit text inline, then download as a professional PDF to email or print for your client.</p>
                                </div>
                            </div>
                        </div>

                        {/* Why Use Our Quotation Generator */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Why Use Our Free Quotation Generator?</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                First impressions matter, especially in sales. A well-designed quotation communicates professionalism and builds trust before the deal is even done. Here&apos;s what makes our <strong>online quotation maker</strong> the best choice:
                            </p>
                            <div className="grid md:grid-cols-2 gap-4 my-6">
                                {[
                                    { title: "Validity Period &amp; Expiry Date", desc: "Protect your pricing by setting clear expiry dates. Clients know exactly how long they have to accept the offer, preventing stale quotes from being accepted months later." },
                                    { title: "Client Acceptance Section", desc: "Each quotation includes a formal acceptance area with signature and date lines. When the client signs, you have a binding document — no separate contract needed for simple deals." },
                                    { title: "Automatic Calculations", desc: "Enter quantities and unit prices, and the generator handles subtotals, tax, discounts, and grand totals. No manual math errors, no spreadsheet formulas to maintain." },
                                    { title: "Professional PDF Output", desc: "Download a crisp, high-resolution PDF quotation that looks great whether viewed on screen, printed, or attached to an email. Clients will see you as a serious, established business." },
                                    { title: "Multiple Templates", desc: "Pick from several professionally designed templates. Whether your brand is bold and colorful or clean and minimalist, there's a layout that fits your style." },
                                    { title: "100% Free, Unlimited Use", desc: "Create as many quotations as you need without paying a cent. No watermarks, no trial periods, no feature gates. Every template and feature is free forever." },
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-3 p-4 rounded-xl bg-slate-50/80 border border-slate-100">
                                        <svg className="w-6 h-6 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        <div>
                                            <h3 className="font-semibold text-slate-900 mb-1">{item.title}</h3>
                                            <p className="text-sm text-slate-600">{item.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Who Needs Quotations */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Who Needs a Quotation Generator?</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                Any business or professional that provides pricing to clients before starting work should use a formal quotation. It sets expectations, prevents scope creep, and protects both parties:
                            </p>
                            <ul className="space-y-3 text-slate-600 mb-4">
                                <li className="flex gap-2"><span className="font-bold text-amber-600">•</span> <strong>Service Providers</strong> — web designers, plumbers, electricians, landscapers, and contractors who need to provide cost estimates before starting work.</li>
                                <li className="flex gap-2"><span className="font-bold text-amber-600">•</span> <strong>Agencies &amp; Consultants</strong> — marketing agencies, IT consultants, and strategy firms that pitch project proposals with detailed price breakdowns.</li>
                                <li className="flex gap-2"><span className="font-bold text-amber-600">•</span> <strong>Wholesalers &amp; Distributors</strong> — B2B sellers providing bulk pricing quotes to retailers, with volume discounts and scheduled delivery terms.</li>
                                <li className="flex gap-2"><span className="font-bold text-amber-600">•</span> <strong>Freelancers</strong> — writers, designers, developers, and photographers who quote project-based pricing with milestones and revision terms.</li>
                                <li className="flex gap-2"><span className="font-bold text-amber-600">•</span> <strong>Event Planners &amp; Caterers</strong> — professionals quoting packages for weddings, corporate events, birthday parties, and conferences.</li>
                            </ul>
                        </div>

                        {/* What Makes a Good Quotation */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">What Makes a Winning Quotation?</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                A quotation that converts prospects into paying clients goes beyond just listing prices. Here are the key elements of a <strong>persuasive business quotation</strong>:
                            </p>
                            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 md:p-8 border border-amber-100 mb-6">
                                <div className="grid md:grid-cols-2 gap-4 text-sm text-slate-700">
                                    <div className="flex gap-2"><span className="text-amber-500 font-bold">✓</span> Professional branding (logo, colors, company details)</div>
                                    <div className="flex gap-2"><span className="text-amber-500 font-bold">✓</span> Clear, itemized breakdown of products/services</div>
                                    <div className="flex gap-2"><span className="text-amber-500 font-bold">✓</span> Transparent pricing with subtotals and taxes</div>
                                    <div className="flex gap-2"><span className="text-amber-500 font-bold">✓</span> Defined validity period (e.g., "Valid for 30 days")</div>
                                    <div className="flex gap-2"><span className="text-amber-500 font-bold">✓</span> Terms and conditions for scope and delivery</div>
                                    <div className="flex gap-2"><span className="text-amber-500 font-bold">✓</span> Client acceptance section with signature lines</div>
                                    <div className="flex gap-2"><span className="text-amber-500 font-bold">✓</span> Payment terms and accepted methods</div>
                                    <div className="flex gap-2"><span className="text-amber-500 font-bold">✓</span> Unique quotation number for tracking</div>
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                Our quotation generator includes all of these elements by default, enabling you to produce winning proposals that build trust and close deals faster.
                            </p>
                        </div>

                        {/* Quotation vs Estimate vs Invoice */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Quotation vs. Estimate vs. Invoice — When to Use Each</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                These three documents are often confused, but each plays a specific role in the sales and billing process:
                            </p>
                            <div className="grid md:grid-cols-3 gap-4 my-6">
                                <div className="p-5 rounded-xl border border-amber-100 bg-amber-50/40">
                                    <h3 className="font-bold text-amber-700 mb-2">Quotation</h3>
                                    <p className="text-sm text-slate-600">A <em>fixed-price offer</em> with a validity period. Once accepted, the price is binding. Best for defined scopes of work where the cost is predictable.</p>
                                </div>
                                <div className="p-5 rounded-xl border border-blue-100 bg-blue-50/40">
                                    <h3 className="font-bold text-blue-700 mb-2">Estimate</h3>
                                    <p className="text-sm text-slate-600">An <em>approximate cost prediction</em>. Estimates are non-binding and can change as the project evolves. Best for complex projects where scope may shift.</p>
                                </div>
                                <div className="p-5 rounded-xl border border-indigo-100 bg-indigo-50/40">
                                    <h3 className="font-bold text-indigo-700 mb-2">Invoice</h3>
                                    <p className="text-sm text-slate-600">A <em>payment request</em> issued after work is done. Unlike a quotation, it demands payment for services already rendered. Create one with our <Link href="/invoice" className="text-indigo-600 hover:underline font-medium">invoice generator</Link>.</p>
                                </div>
                            </div>
                            <p className="text-slate-600 leading-relaxed">
                                The typical workflow is: send a <strong>quotation</strong> to propose pricing → do the work → send an <Link href="/invoice" className="text-amber-600 hover:underline font-medium">invoice</Link> to request payment → issue a <Link href="/receipt" className="text-amber-600 hover:underline font-medium">receipt</Link> when paid.
                            </p>
                        </div>

                        {/* Best Practices */}
                        <div className="mb-16">
                            <h2 className="text-3xl font-bold text-slate-900 mb-6">Quotation Best Practices to Win More Deals</h2>
                            <p className="text-slate-600 leading-relaxed mb-4">
                                A well-crafted quotation does more than state a price — it sells your professionalism and builds confidence. Follow these proven best practices:
                            </p>
                            <ol className="space-y-4 text-slate-600 list-decimal list-inside mb-4">
                                <li><strong>Respond quickly.</strong> Speed wins deals. Send your quotation within 24 hours of the inquiry. Prospects who wait too long often go to competitors.</li>
                                <li><strong>Be specific, not vague.</strong> Break down every service into clear line items. &quot;Website Development&quot; is vague; &quot;5-page WordPress site with responsive design, SEO, and 2 rounds of revisions&quot; is clear and trustworthy.</li>
                                <li><strong>Set a validity period.</strong> Always include an expiry date (e.g., &quot;Valid for 30 days&quot;). This creates urgency and prevents clients from accepting outdated pricing when your costs have changed.</li>
                                <li><strong>Include terms and conditions.</strong> Define payment schedule, revision limits, cancellation policy, and delivery timeline. This prevents scope creep and sets clear expectations before work begins.</li>
                                <li><strong>Follow up.</strong> If you haven&apos;t heard back within 3–5 days, send a polite follow-up. Many deals are saved by a simple &quot;Just checking if you had any questions about the quote&quot; email.</li>
                                <li><strong>Present it professionally.</strong> A polished PDF with your logo, clean layout, and no typos shows you&apos;re a serious business. Our templates are designed exactly for this.</li>
                            </ol>
                        </div>

                        {/* FAQ Section */}
                        <div className="mb-8">
                            <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions About Quotations</h2>
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
                        <p className="text-slate-500 text-sm text-center mb-8">Also create invoices, receipts, and proforma invoices — all completely free.</p>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <Link href="/invoice" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors mb-1">Invoice Generator</h3>
                                <p className="text-xs text-slate-500">Professional invoices with auto tax calculation</p>
                            </Link>
                            <Link href="/receipt" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors mb-1">Receipt Generator</h3>
                                <p className="text-xs text-slate-500">Create payment receipts with automatic PAID stamp</p>
                            </Link>
                            <Link href="/proforma" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-3">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                                <h3 className="font-semibold text-slate-900 group-hover:text-amber-600 transition-colors mb-1">Proforma Invoice</h3>
                                <p className="text-xs text-slate-500">Preliminary invoices for international trade &amp; customs</p>
                            </Link>
                        </div>
                    </div>
                </section>
            </div>
        </AdWrappedLayout>
    );
}
