/**
 * Programmatic SEO template data
 * Each entry generates a unique /invoice-templates/[slug] page
 */

export interface TemplatePageData {
    slug: string;
    title: string;
    h1: string;
    description: string;
    heroText: string;
    currency: string;
    taxLabel: string;
    sampleItems: { description: string; quantity: number; unitPrice: number }[];
    whatToInclude: string[];
    faqs: { question: string; answer: string }[];
    keywords: string[];
    category: "tax" | "industry" | "country" | "currency";
}

export const TEMPLATE_PAGES: TemplatePageData[] = [
    // ── TAX-SPECIFIC ──────────────────────────────────────────────
    {
        slug: "1099-contractor",
        title: "Free 1099 Contractor Invoice Template",
        h1: "1099 Contractor Invoice Template",
        description: "Create professional 1099 contractor invoices for free. Includes tax ID fields, payment terms, and instant PDF download. Perfect for independent contractors in the US.",
        heroText: "As a 1099 independent contractor, you need invoices that clearly document your services, payment terms, and tax information. Our free template handles everything — just fill in your details and download a professional PDF instantly.",
        currency: "USD",
        taxLabel: "Tax",
        sampleItems: [
            { description: "Professional Services — Consulting (Hourly)", quantity: 40, unitPrice: 75 },
            { description: "Project Deliverables — Final Report", quantity: 1, unitPrice: 500 },
        ],
        whatToInclude: [
            "Your full legal name or business name",
            "Your Tax Identification Number (TIN) or EIN",
            "Client's name and address",
            "Detailed description of services rendered",
            "Hourly rate or project-based pricing",
            "Payment terms (Net 30 is standard)",
            "Invoice number for your records",
            "Date of service and payment due date",
        ],
        faqs: [
            { question: "Do 1099 contractors need to send invoices?", answer: "Yes. While not legally required, invoices create a paper trail for tax purposes. They document income, help track payments, and provide proof of self-employment status for IRS reporting." },
            { question: "What's the difference between a W-2 and 1099 invoice?", answer: "W-2 employees receive paystubs from their employer. 1099 contractors create their own invoices to bill clients directly. As a contractor, you're responsible for tracking income and paying self-employment tax." },
            { question: "Should I include my SSN on a 1099 invoice?", answer: "No. Never put your SSN on an invoice. Use your EIN (Employer Identification Number) instead. If you don't have an EIN, apply for one through the IRS — it's free and instant online." },
            { question: "What payment terms should 1099 contractors use?", answer: "Net 30 is the most common, meaning payment is due within 30 days. For new clients, consider Net 15 or even payment upon receipt to improve cash flow." },
        ],
        keywords: ["1099 contractor invoice", "independent contractor invoice template", "1099 invoice template free", "contractor billing template", "self-employed invoice"],
        category: "tax",
    },
    {
        slug: "vat-invoice-uk",
        title: "Free UK VAT Invoice Template",
        h1: "UK VAT Invoice Template",
        description: "Generate HMRC-compliant VAT invoices for free. Includes VAT number, rate breakdown, and all required fields. Download as PDF instantly for your UK business.",
        heroText: "UK businesses registered for VAT must issue compliant invoices that meet HMRC requirements. Our free template includes all mandatory fields — your VAT number, VAT rate breakdown, and proper formatting — so you stay compliant without expensive software.",
        currency: "GBP",
        taxLabel: "VAT",
        sampleItems: [
            { description: "Web Development Services", quantity: 1, unitPrice: 2500 },
            { description: "Monthly Hosting & Maintenance", quantity: 3, unitPrice: 150 },
        ],
        whatToInclude: [
            "Your business name and address",
            "Your VAT registration number",
            "Customer's name and address",
            "Unique sequential invoice number",
            "Invoice date and tax point date",
            "Description of goods or services",
            "Net amount, VAT rate (20%), and VAT amount",
            "Total amount including VAT",
        ],
        faqs: [
            { question: "What must a UK VAT invoice include?", answer: "HMRC requires: your business name, address, and VAT number; the customer's name and address; a unique invoice number; the invoice date; a description of goods/services; the net amount; VAT rate and amount; and the gross total." },
            { question: "What is the current UK VAT rate?", answer: "The standard VAT rate is 20%. A reduced rate of 5% applies to some goods (e.g., children's car seats, energy). Zero-rated items (0%) include most food and children's clothing." },
            { question: "Do I need to charge VAT if I'm below the threshold?", answer: "No. You only need to register for VAT once your taxable turnover exceeds £90,000 in a 12-month period. Below this, VAT registration is voluntary." },
            { question: "What's the difference between a VAT invoice and a simplified invoice?", answer: "A simplified VAT invoice can be used for supplies under £250. It requires fewer details — just your name, VAT number, date, description of goods/services, and the VAT-inclusive total." },
        ],
        keywords: ["vat invoice template uk", "hmrc compliant invoice", "uk vat invoice generator", "vat invoice template free", "uk business invoice"],
        category: "tax",
    },
    {
        slug: "gst-invoice-canada",
        title: "Free Canadian GST Invoice Template",
        h1: "Canadian GST Invoice Template",
        description: "Create CRA-compliant GST invoices for Canadian businesses. Includes GST/HST number field, tax calculations, and instant PDF download. 100% free.",
        heroText: "Canadian businesses charging GST or HST need invoices that meet CRA requirements. Our free template automatically calculates tax amounts and includes all mandatory fields — your GST/HST registration number, tax breakdown, and business information.",
        currency: "CAD",
        taxLabel: "GST",
        sampleItems: [
            { description: "Marketing Strategy Consultation", quantity: 20, unitPrice: 120 },
            { description: "Brand Identity Design Package", quantity: 1, unitPrice: 3500 },
        ],
        whatToInclude: [
            "Your business name and address",
            "Your GST/HST registration number",
            "Customer's name and address",
            "Invoice date and payment terms",
            "Description of goods or services supplied",
            "Amount charged for each item",
            "GST/HST rate and amount (5% GST, or combined HST by province)",
            "Total amount payable",
        ],
        faqs: [
            { question: "When do I need to register for GST in Canada?", answer: "You must register once your worldwide revenue exceeds $30,000 over four consecutive calendar quarters. Below this, registration is voluntary but can be beneficial for claiming input tax credits." },
            { question: "What's the difference between GST and HST?", answer: "GST (5%) is charged in Alberta, BC, Manitoba, Saskatchewan, and the territories. HST combines GST with provincial sales tax — 13% in Ontario, 15% in Atlantic provinces." },
            { question: "Do I need to show GST separately on my invoice?", answer: "Yes. CRA requires you to show the GST/HST amount separately from the price of goods/services. Your invoice must also include your GST/HST registration number." },
            { question: "Can I claim GST on my business expenses?", answer: "Yes. If you're registered for GST/HST, you can claim Input Tax Credits (ITCs) for GST/HST paid on business purchases. Keep all invoices as supporting documentation." },
        ],
        keywords: ["gst invoice template canada", "canadian invoice template", "hst invoice generator", "cra compliant invoice", "gst invoice generator free"],
        category: "tax",
    },
    {
        slug: "abn-invoice-australia",
        title: "Free Australian ABN Tax Invoice Template",
        h1: "Australian ABN Tax Invoice Template",
        description: "Generate ATO-compliant tax invoices with ABN for Australian businesses. Includes GST calculation, ABN field, and instant PDF download. Completely free.",
        heroText: "Australian businesses need tax invoices that comply with ATO requirements. Our free template includes your ABN, automatic GST calculations (10%), and all mandatory fields — helping you stay compliant and look professional.",
        currency: "AUD",
        taxLabel: "GST",
        sampleItems: [
            { description: "IT Support & Network Maintenance (Monthly)", quantity: 1, unitPrice: 2200 },
            { description: "Software License Setup", quantity: 5, unitPrice: 180 },
        ],
        whatToInclude: [
            "Your business name and ABN (Australian Business Number)",
            "The words 'Tax Invoice' clearly stated",
            "Invoice date and unique invoice number",
            "Customer's name and ABN (for invoices over $1,000)",
            "Description of goods or services",
            "GST amount (10%) shown separately",
            "Total price including GST",
            "Payment terms and preferred payment method",
        ],
        faqs: [
            { question: "Do I need an ABN to issue invoices in Australia?", answer: "You should have an ABN. Without one, businesses paying you must withhold 47% of the payment for tax purposes (known as 'no ABN withholding'). Applying for an ABN is free through the ABR." },
            { question: "What's the difference between a tax invoice and a regular invoice?", answer: "A tax invoice includes GST and your ABN. It's required for sales of $82.50 or more (GST inclusive). For sales under $82.50, you can issue a regular invoice but it's good practice to always use tax invoices." },
            { question: "When do I need to register for GST in Australia?", answer: "Registration is required when your annual turnover reaches $75,000 ($150,000 for non-profit). Below this threshold, GST registration is voluntary." },
            { question: "What is the current GST rate in Australia?", answer: "The GST rate in Australia is a flat 10% on most goods and services. Some items are GST-free, including basic food, medical services, and educational courses." },
        ],
        keywords: ["abn invoice template", "tax invoice template australia", "australian invoice generator", "ato compliant invoice", "gst invoice australia free"],
        category: "tax",
    },
    {
        slug: "llc-invoice",
        title: "Free LLC Invoice Template",
        h1: "LLC Invoice Template",
        description: "Create professional invoices for your LLC. Includes EIN field, business entity details, and payment terms. Download PDF instantly — no signup needed.",
        heroText: "As an LLC owner, your invoices need to reflect your business entity correctly. Our free template is designed for LLCs — with proper business name formatting, EIN field, and professional styling that builds client confidence.",
        currency: "USD",
        taxLabel: "Sales Tax",
        sampleItems: [
            { description: "Business Consulting Services", quantity: 1, unitPrice: 5000 },
            { description: "Market Research Report", quantity: 1, unitPrice: 2500 },
        ],
        whatToInclude: [
            "Your full LLC name (e.g., 'Smith Consulting LLC')",
            "Your EIN (Employer Identification Number)",
            "Registered business address",
            "Client's business name and address",
            "Detailed scope of work or services",
            "Payment terms and accepted methods",
            "Late payment fee policy (if applicable)",
            "Invoice number and date",
        ],
        faqs: [
            { question: "Should I invoice under my name or my LLC name?", answer: "Always invoice under your LLC name. This maintains the legal separation between you and your business entity, which protects your personal assets (the main benefit of an LLC)." },
            { question: "Do I need an EIN for my LLC?", answer: "If your LLC has employees or is taxed as a corporation, yes. Single-member LLCs without employees can use their SSN, but getting an EIN is recommended — it's free from the IRS and protects your SSN." },
            { question: "What payment terms should an LLC use?", answer: "Net 30 is standard for established clients. For new clients or large projects, consider 50% upfront with the balance due on completion. Always specify late payment fees (1-2% per month is typical)." },
            { question: "Can an LLC accept personal checks?", answer: "An LLC should have a separate business bank account. Accept payments to your LLC bank account only — this maintains the legal separation between personal and business finances." },
        ],
        keywords: ["llc invoice template", "llc billing template", "invoice template for llc", "small business llc invoice", "llc invoice generator free"],
        category: "tax",
    },

    // ── INDUSTRY-SPECIFIC ─────────────────────────────────────────
    {
        slug: "consulting",
        title: "Free Consulting Invoice Template",
        h1: "Consulting Invoice Template",
        description: "Professional consulting invoice template with hourly rate and project-based billing. Track hours, add expenses, and download PDF invoices for free.",
        heroText: "Consultants need invoices that clearly communicate value. Whether you bill hourly or per project, our free template lets you itemize services, track hours, and present a polished invoice that clients take seriously.",
        currency: "USD",
        taxLabel: "Tax",
        sampleItems: [
            { description: "Strategy Consultation (Hourly Rate)", quantity: 15, unitPrice: 200 },
            { description: "Market Analysis Report", quantity: 1, unitPrice: 3000 },
            { description: "Follow-up Advisory Session", quantity: 2, unitPrice: 200 },
        ],
        whatToInclude: [
            "Your consulting firm name or personal brand",
            "Project name or engagement reference",
            "Detailed breakdown of hours worked",
            "Hourly rate or project fee",
            "Expense reimbursements (if applicable)",
            "Payment terms (Net 15 or Net 30)",
            "Retainer credit applied (if applicable)",
            "Total amount due",
        ],
        faqs: [
            { question: "Should consultants charge hourly or per project?", answer: "It depends on the engagement. Hourly works best for ongoing advisory work with variable scope. Project-based is better for defined deliverables. Many consultants use a hybrid — a project fee with hourly overages." },
            { question: "How do I handle consulting expenses on invoices?", answer: "List expenses as separate line items below your service fees. Include receipts or references. Common reimbursable expenses include travel, software licenses, and research materials." },
            { question: "What's the standard consulting payment term?", answer: "Net 30 is most common, but many independent consultants use Net 15 for faster cash flow. For new clients, consider requiring a 50% deposit before starting work." },
            { question: "Should I include my consulting contract number on invoices?", answer: "Yes. Reference your statement of work (SOW) or contract number on every invoice. This speeds up approval in clients with procurement departments." },
        ],
        keywords: ["consulting invoice template", "consultant billing template", "consulting invoice example", "management consulting invoice", "consulting fee invoice"],
        category: "industry",
    },
    {
        slug: "photography",
        title: "Free Photography Invoice Template",
        h1: "Photography Invoice Template",
        description: "Create photography invoices with session fees, prints, and usage rights. Perfect for wedding, portrait, and commercial photographers. Free PDF download.",
        heroText: "Photographers need invoices that cover session fees, editing time, print orders, and usage licenses. Our free template is built specifically for photography businesses — professional, clear, and ready to send in seconds.",
        currency: "USD",
        taxLabel: "Tax",
        sampleItems: [
            { description: "Wedding Photography — Full Day Coverage (8 hours)", quantity: 1, unitPrice: 3500 },
            { description: "Photo Editing & Retouching (per image)", quantity: 50, unitPrice: 15 },
            { description: "Digital Gallery — Online Delivery", quantity: 1, unitPrice: 200 },
        ],
        whatToInclude: [
            "Photography business name and logo",
            "Event/session date and location",
            "Type of session (wedding, portrait, commercial)",
            "Number of hours booked",
            "Editing and retouching fees",
            "Print or album costs",
            "Usage rights or licensing terms",
            "Deposit paid and remaining balance",
        ],
        faqs: [
            { question: "Should photographers charge a deposit?", answer: "Yes. A 25-50% non-refundable retainer is standard practice. It secures the booking date and covers your opportunity cost if the client cancels." },
            { question: "How do I invoice for usage rights?", answer: "List usage rights as a separate line item. Specify the scope: personal use, commercial use, social media only, etc. Extended or commercial licenses command premium pricing." },
            { question: "What should a wedding photography invoice include?", answer: "Coverage hours, second shooter fees, engagement session, editing/retouching, gallery delivery, print credits, album design, and travel fees. Break everything out clearly." },
            { question: "When should photographers send their invoice?", answer: "Send the retainer invoice upon booking. The final balance should be invoiced 2-4 weeks before the event or immediately after delivery for portrait sessions." },
        ],
        keywords: ["photography invoice template", "photographer billing", "wedding photography invoice", "photo session invoice", "photography invoice example"],
        category: "industry",
    },
    {
        slug: "web-design",
        title: "Free Web Design Invoice Template",
        h1: "Web Design Invoice Template",
        description: "Invoice template for web designers and developers. Bill for design, development, hosting, and maintenance. Generate professional PDFs instantly for free.",
        heroText: "Web designers and developers need invoices that break down complex projects clearly — from wireframes to launch. Our free template handles milestone billing, hosting fees, and maintenance retainers in a clean, professional format.",
        currency: "USD",
        taxLabel: "Tax",
        sampleItems: [
            { description: "Website Design — Homepage + 5 Inner Pages", quantity: 1, unitPrice: 4500 },
            { description: "Responsive Development & Testing", quantity: 1, unitPrice: 3000 },
            { description: "CMS Setup & Content Migration", quantity: 1, unitPrice: 800 },
        ],
        whatToInclude: [
            "Your design studio or freelancer name",
            "Project name and scope reference",
            "Design phase deliverables (mockups, wireframes)",
            "Development milestones and associated costs",
            "Hosting and domain fees (if applicable)",
            "CMS setup and training hours",
            "Post-launch maintenance or support hours",
            "Payment milestone schedule",
        ],
        faqs: [
            { question: "How should web designers structure their invoicing?", answer: "Use milestone billing: 30% upfront, 30% at design approval, 30% at development completion, and 10% at launch. This protects both parties and keeps cash flow steady." },
            { question: "Should I bill hosting separately from design?", answer: "Yes. Hosting is a recurring cost and should be billed separately — either monthly or annually. This makes it clear to clients what they're paying for ongoing services vs. one-time project work." },
            { question: "What about revision rounds — how do I charge?", answer: "Include 2-3 rounds of revisions in your project fee. Beyond that, bill hourly for additional changes. State this clearly in your contract and reference it on the invoice." },
            { question: "How do I invoice for website maintenance?", answer: "Set up a monthly retainer invoice (e.g., $200-500/month) covering updates, backups, security patches, and minor content changes. Specify what's included and hourly rates for overages." },
        ],
        keywords: ["web design invoice template", "web developer invoice", "website design billing", "freelance developer invoice", "web design invoice example"],
        category: "industry",
    },
    {
        slug: "construction",
        title: "Free Construction Invoice Template",
        h1: "Construction Invoice Template",
        description: "Professional construction invoice template with progress billing, materials, and labor breakdown. Perfect for contractors, builders, and tradespeople. Free PDF.",
        heroText: "Construction invoicing requires detailed breakdowns of materials, labor, and progress milestones. Our free template handles it all — from initial estimates to progress billing — helping contractors get paid faster and maintain clear records.",
        currency: "USD",
        taxLabel: "Tax",
        sampleItems: [
            { description: "Foundation Work — Labor (crew of 4, 5 days)", quantity: 20, unitPrice: 65 },
            { description: "Concrete & Rebar Materials", quantity: 1, unitPrice: 4200 },
            { description: "Equipment Rental — Excavator (daily)", quantity: 3, unitPrice: 450 },
        ],
        whatToInclude: [
            "Contractor business name and license number",
            "Project address and description",
            "Itemized labor costs (hours × rate)",
            "Materials with quantities and unit prices",
            "Equipment rental charges",
            "Progress billing percentage (e.g., 30% complete)",
            "Change order references",
            "Lien waiver terms",
        ],
        faqs: [
            { question: "What is progress billing in construction?", answer: "Progress billing means invoicing based on project completion percentage. For example, you might invoice 25% of the total contract price when the foundation is complete, 50% at framing, etc." },
            { question: "Should I separate materials and labor on invoices?", answer: "Yes. Separate breakdowns build client trust, comply with many state requirements, and help with job costing. Show labor hours, hourly rates, and material quantities with unit prices." },
            { question: "How do I handle change orders on invoices?", answer: "Reference the signed change order number and date on your invoice. List change order items separately from the original scope, with their approved amounts." },
            { question: "What's a lien waiver and should I include it?", answer: "A lien waiver releases your right to file a mechanic's lien once payment is received. Many clients require conditional lien waivers with each progress payment. Reference the waiver on your invoice." },
        ],
        keywords: ["construction invoice template", "contractor invoice template", "builder invoice", "construction billing template", "contractor billing free"],
        category: "industry",
    },
    {
        slug: "cleaning-service",
        title: "Free Cleaning Service Invoice Template",
        h1: "Cleaning Service Invoice Template",
        description: "Create professional cleaning service invoices with itemized services, hourly or flat rates, and supply costs. Perfect for residential and commercial cleaners. Free PDF.",
        heroText: "Whether you run a residential cleaning crew or a commercial janitorial service, professional invoices help you get paid on time and build trust. Our free template is designed for cleaning businesses — list your services, add supply costs, and download a polished PDF.",
        currency: "USD",
        taxLabel: "Tax",
        sampleItems: [
            { description: "Deep Clean — 3 Bedroom House", quantity: 1, unitPrice: 250 },
            { description: "Window Cleaning — Interior & Exterior", quantity: 12, unitPrice: 15 },
            { description: "Cleaning Supplies & Materials", quantity: 1, unitPrice: 35 },
        ],
        whatToInclude: [
            "Cleaning business name and contact info",
            "Property address cleaned",
            "Date and time of service",
            "Type of cleaning (standard, deep, move-out)",
            "Itemized services with pricing",
            "Additional charges (supplies, special requests)",
            "Recurring schedule (if applicable)",
            "Payment method and due date",
        ],
        faqs: [
            { question: "Should cleaning services charge hourly or flat rate?", answer: "Flat rates are preferred by clients because they know the cost upfront. However, charge hourly for irregular jobs or initial deep cleans. Most residential cleaners charge $100-250 per session." },
            { question: "How do I invoice for recurring cleaning?", answer: "Set up monthly invoices covering all visits. List each visit date and service type. Offer a small discount (5-10%) for clients on recurring schedules to encourage retention." },
            { question: "Should I charge separately for cleaning supplies?", answer: "Most professional cleaners include basic supplies in their rate. For specialty items (heavy-duty degreasers, special fabric cleaners), add them as a separate line item." },
            { question: "When should I send my cleaning invoice?", answer: "For one-time jobs, invoice immediately after completion. For recurring clients, invoice at the beginning of each month for the upcoming schedule, or at the end of the month for completed work." },
        ],
        keywords: ["cleaning service invoice", "cleaning business invoice template", "house cleaning receipt", "janitorial invoice template", "cleaning invoice free"],
        category: "industry",
    },
];

/**
 * Get all template page slugs (for sitemap generation and static params)
 */
export function getAllTemplatePageSlugs(): string[] {
    return TEMPLATE_PAGES.map((t) => t.slug);
}

/**
 * Get a single template page by slug
 */
export function getTemplatePageBySlug(slug: string): TemplatePageData | undefined {
    return TEMPLATE_PAGES.find((t) => t.slug === slug);
}
