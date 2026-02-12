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
        fontFamily: "sans" | "serif" | "mono";
        layout: "classic" | "modern" | "compact" | "executive" | "minimal";
        showBorder: boolean;
        showAccentLine: boolean;
        headerBgFill: boolean;
        tableStyle: "clean" | "filled" | "minimal" | "bold";
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
            headerColor: { r: 0.15, g: 0.15, b: 0.15 },
            accentColor: { r: 0.4, g: 0.4, b: 0.4 },
            fontFamily: "sans",
            layout: "classic",
            showBorder: false,
            showAccentLine: false,
            headerBgFill: false,
            tableStyle: "clean",
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
            headerColor: { r: 0.1, g: 0.3, b: 0.9 },
            accentColor: { r: 0.2, g: 0.2, b: 0.8 },
            fontFamily: "sans",
            layout: "modern",
            showBorder: false,
            showAccentLine: true,
            headerBgFill: false,
            tableStyle: "filled",
        },
    },
    {
        id: "executive-dark",
        name: "Executive Dark",
        description: "A premium dark header with gold accents. Ideal for consulting and agencies.",
        isPremium: false,
        previewGradient: "from-gray-800 to-gray-950",
        previewAccent: "#d4af37",
        style: {
            headerColor: { r: 0.1, g: 0.1, b: 0.12 },
            accentColor: { r: 0.8, g: 0.6, b: 0.2 },
            fontFamily: "sans",
            layout: "executive",
            showBorder: true,
            showAccentLine: true,
            headerBgFill: true,
            tableStyle: "filled",
        },
    },
    {
        id: "fresh-green",
        name: "Fresh Green",
        description: "Earthy green tones for eco-conscious and health-focused businesses.",
        isPremium: false,
        previewGradient: "from-emerald-500 to-teal-700",
        previewAccent: "#059669",
        style: {
            headerColor: { r: 0.05, g: 0.6, b: 0.4 },
            accentColor: { r: 0.05, g: 0.5, b: 0.3 },
            fontFamily: "sans",
            layout: "compact",
            showBorder: false,
            showAccentLine: true,
            headerBgFill: false,
            tableStyle: "bold",
        },
    },
    {
        id: "creative-coral",
        name: "Creative Coral",
        description: "Vibrant warm tones with a creative layout. Perfect for designers and creatives.",
        isPremium: false,
        previewGradient: "from-rose-500 to-orange-600",
        previewAccent: "#e11d48",
        style: {
            headerColor: { r: 0.9, g: 0.1, b: 0.3 },
            accentColor: { r: 0.95, g: 0.3, b: 0.2 },
            fontFamily: "sans",
            layout: "modern", // Changed from 'creative' to 'modern' to simplify layout refactor
            showBorder: false,
            showAccentLine: true,
            headerBgFill: true,
            tableStyle: "bold",
        },
    },
    {
        id: "minimal-mono",
        name: "Minimal Mono",
        description: "Ultra-minimal black and white design. Timeless and distraction-free.",
        isPremium: false,
        previewGradient: "from-neutral-400 to-neutral-600",
        previewAccent: "#171717",
        style: {
            headerColor: { r: 0.1, g: 0.1, b: 0.1 },
            accentColor: { r: 0.5, g: 0.5, b: 0.5 },
            fontFamily: "mono",
            layout: "minimal",
            showBorder: true,
            showAccentLine: false,
            headerBgFill: false,
            tableStyle: "minimal",
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
