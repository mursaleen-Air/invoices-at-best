import { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://www.invoicesatbest.online";
const SITE_NAME = "Invoices at Best";
const DEFAULT_DESCRIPTION =
    "Create professional invoices, receipts, quotations & proforma invoices with live preview, drag-and-drop editing, and instant WYSIWYG PDF downloads. 100% free, 6 premium templates, no account required.";

interface GenerateMetadataOptions {
    title: string;
    description?: string;
    path?: string;
    keywords?: string[];
    noIndex?: boolean;
    ogImage?: string;
}

export function generatePageMetadata({
    title,
    description = DEFAULT_DESCRIPTION,
    path = "",
    keywords = [],
    noIndex = false,
    ogImage,
}: GenerateMetadataOptions): Metadata {
    const url = `${SITE_URL}${path}`;
    const fullTitle = path === "" ? `${SITE_NAME} — ${title}` : `${title} | ${SITE_NAME}`;

    const defaultKeywords = [
        "invoice generator",
        "free invoice",
        "pdf invoice",
        "receipt maker",
        "quotation generator",
        "proforma invoice",
        "billing software",
        "online invoicing",
        "live preview invoice",
        "drag and drop invoice editor",
        "wysiwyg pdf generator",
        "free invoice templates",
        "invoice pdf download",
        "professional receipt generator",
        "business document creator",
    ];

    return {
        title: fullTitle,
        description,
        keywords: [...defaultKeywords, ...keywords],
        metadataBase: new URL(SITE_URL),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: SITE_NAME,
            locale: "en_US",
            type: "website",
            images: ogImage
                ? [{ url: ogImage, width: 1200, height: 630, alt: title }]
                : undefined,
        },
        twitter: {
            card: "summary_large_image",
            title: fullTitle,
            description,
        },
        robots: noIndex
            ? { index: false, follow: false }
            : { index: true, follow: true },
    };
}

export function generateSoftwareApplicationSchema() {
    return {
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        name: SITE_NAME,
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "USD",
        },
        description: DEFAULT_DESCRIPTION,
        url: SITE_URL,
        featureList: [
            "Live Preview with Drag-and-Drop Editing",
            "WYSIWYG PDF Generation",
            "6 Professional Templates",
            "Invoice, Receipt, Quotation & Proforma Support",
            "Instant PDF Download",
            "Dashboard with Document History",
            "Custom Logo Upload",
            "Multi-Currency Support",
        ],
        aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            ratingCount: "2680",
            bestRating: "5",
        },
    };
}

export function generateFAQSchema(
    faqs: { question: string; answer: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.answer,
            },
        })),
    };
}

export function generateBreadcrumbSchema(
    items: { name: string; url: string }[]
) {
    return {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.url}`,
        })),
    };
}

export function generateArticleSchema(options: {
    title: string;
    description: string;
    path: string;
    datePublished: string;
    dateModified: string;
    authorName?: string;
}) {
    return {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: options.title,
        description: options.description,
        url: `${SITE_URL}${options.path}`,
        datePublished: options.datePublished,
        dateModified: options.dateModified,
        author: {
            "@type": "Person",
            name: options.authorName || "Invoices at Best Team",
        },
        publisher: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
        },
    };
}

export { SITE_URL, SITE_NAME, DEFAULT_DESCRIPTION };
