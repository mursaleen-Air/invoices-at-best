export interface InvoiceTemplate {
    id: string;
    name: string;
    description: string;
    isPremium: boolean;
    previewGradient: string;
    previewAccent: string;
    // PDF styling config
    style: {
        headerColor: { r: number; g: number; b: number };
        accentColor: { r: number; g: number; b: number };
        fontStyle: "clean" | "bold" | "elegant";
        layout: "classic" | "modern" | "compact" | "executive" | "creative" | "minimal";
        showBorder: boolean;
        showAccentLine: boolean;
        headerBgFill: boolean;
    };
}

export const INVOICE_TEMPLATES: InvoiceTemplate[] = [
    {
        id: "simple",
        name: "Simple Clean",
        description: "A clean, minimal layout with clear lines. Perfect for everyday invoicing.",
        isPremium: false,
        previewGradient: "from-slate-500 to-slate-700",
        previewAccent: "#64748b",
        style: {
            headerColor: { r: 0.11, g: 0.11, b: 0.11 },
            accentColor: { r: 0.4, g: 0.4, b: 0.4 },
            fontStyle: "clean",
            layout: "classic",
            showBorder: false,
            showAccentLine: false,
            headerBgFill: false,
        },
    },
    {
        id: "modern-blue",
        name: "Modern Blue",
        description: "A contemporary blue-themed design with bold accents. Great for tech and startups.",
        isPremium: false,
        previewGradient: "from-blue-500 to-indigo-700",
        previewAccent: "#4f46e5",
        style: {
            headerColor: { r: 0.145, g: 0.388, b: 0.922 },
            accentColor: { r: 0.31, g: 0.275, b: 0.898 },
            fontStyle: "bold",
            layout: "modern",
            showBorder: false,
            showAccentLine: true,
            headerBgFill: false,
        },
    },
    {
        id: "executive-dark",
        name: "Executive Dark",
        description: "A premium dark header with gold accents. Ideal for consulting and agencies.",
        isPremium: true,
        previewGradient: "from-gray-800 to-gray-950",
        previewAccent: "#d4af37",
        style: {
            headerColor: { r: 0.12, g: 0.12, b: 0.14 },
            accentColor: { r: 0.831, g: 0.686, b: 0.216 },
            fontStyle: "elegant",
            layout: "executive",
            showBorder: true,
            showAccentLine: true,
            headerBgFill: true,
        },
    },
    {
        id: "fresh-green",
        name: "Fresh Green",
        description: "Earthy green tones for eco-conscious and health-focused businesses.",
        isPremium: true,
        previewGradient: "from-emerald-500 to-teal-700",
        previewAccent: "#059669",
        style: {
            headerColor: { r: 0.02, g: 0.588, b: 0.412 },
            accentColor: { r: 0.051, g: 0.431, b: 0.353 },
            fontStyle: "clean",
            layout: "compact",
            showBorder: false,
            showAccentLine: true,
            headerBgFill: false,
        },
    },
    {
        id: "creative-coral",
        name: "Creative Coral",
        description: "Vibrant warm tones with a creative layout. Perfect for designers and creatives.",
        isPremium: true,
        previewGradient: "from-rose-500 to-orange-600",
        previewAccent: "#e11d48",
        style: {
            headerColor: { r: 0.882, g: 0.114, b: 0.282 },
            accentColor: { r: 0.918, g: 0.341, b: 0.173 },
            fontStyle: "bold",
            layout: "creative",
            showBorder: false,
            showAccentLine: true,
            headerBgFill: true,
        },
    },
    {
        id: "minimal-mono",
        name: "Minimal Mono",
        description: "Ultra-minimal black and white design. Timeless and distraction-free.",
        isPremium: true,
        previewGradient: "from-neutral-400 to-neutral-600",
        previewAccent: "#171717",
        style: {
            headerColor: { r: 0.09, g: 0.09, b: 0.09 },
            accentColor: { r: 0.6, g: 0.6, b: 0.6 },
            fontStyle: "elegant",
            layout: "minimal",
            showBorder: true,
            showAccentLine: false,
            headerBgFill: false,
        },
    },
];

export function getTemplate(id: string): InvoiceTemplate {
    return INVOICE_TEMPLATES.find((t) => t.id === id) || INVOICE_TEMPLATES[0];
}

export function getFreeTemplates(): InvoiceTemplate[] {
    return INVOICE_TEMPLATES.filter((t) => !t.isPremium);
}

export function getPremiumTemplates(): InvoiceTemplate[] {
    return INVOICE_TEMPLATES.filter((t) => t.isPremium);
}
