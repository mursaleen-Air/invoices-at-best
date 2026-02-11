import { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";
import { INVOICE_TEMPLATES } from "@/lib/templates";

export const metadata: Metadata = generatePageMetadata({
    title: "Invoice Templates — Free & Premium Professional Designs",
    description:
        "Browse 6 professionally designed invoice templates. Choose from modern, executive, creative, and minimal styles. 2 free templates for everyone, premium designs for subscribers.",
    path: "/invoice-templates",
    keywords: ["invoice templates", "free invoice template", "professional invoice design", "invoice format", "premium invoice template"],
});

export default function InvoiceTemplatesPage() {
    return (
        <div className="min-h-[calc(100vh-140px)]">
            {/* Hero */}
            <section className="py-20 px-4 bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
                <div className="absolute top-10 right-10 w-72 h-72 bg-purple-100 rounded-full blur-3xl opacity-40" />
                <div className="absolute bottom-10 left-10 w-60 h-60 bg-indigo-100 rounded-full blur-3xl opacity-40" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <span className="inline-block px-4 py-1.5 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6 border border-indigo-200">
                        6 Professional Designs
                    </span>
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                        Invoice{" "}
                        <span className="text-gradient">
                            Templates
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Choose the perfect template for your brand. Every template supports company logo upload, auto-calculations, and instant PDF download.
                    </p>
                </div>
            </section>

            {/* Free Templates */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Free Templates</h2>
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full uppercase">Free Forever</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {INVOICE_TEMPLATES.filter((t) => !t.isPremium).map((tpl) => (
                            <TemplateCard key={tpl.id} template={tpl} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Premium Templates */}
            <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-6xl mx-auto">
                    <div className="flex items-center gap-3 mb-8">
                        <h2 className="text-2xl font-bold text-gray-900">Premium Templates</h2>
                        <span className="px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded-full uppercase flex items-center gap-1">
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                            PRO
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {INVOICE_TEMPLATES.filter((t) => t.isPremium).map((tpl) => (
                            <TemplateCard key={tpl.id} template={tpl} />
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-4 bg-slate-900 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">Every Template Includes</h2>
                    <p className="text-slate-400 mb-12">All the features you need for professional invoicing</p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[
                            { label: "Company Logo", icon: "🏢" },
                            { label: "Auto Calculations", icon: "🧮" },
                            { label: "Tax Support", icon: "📊" },
                            { label: "PDF Download", icon: "📄" },
                            { label: "Custom Colors", icon: "🎨" },
                            { label: "Unique Numbers", icon: "#️⃣" },
                            { label: "Mobile Friendly", icon: "📱" },
                            { label: "Multi-Currency", icon: "💱" },
                        ].map((f) => (
                            <div key={f.label} className="text-center">
                                <div className="text-3xl mb-3">{f.icon}</div>
                                <p className="text-sm font-medium text-slate-300">{f.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}

function TemplateCard({ template }: { template: typeof INVOICE_TEMPLATES[0] }) {
    return (
        <div className="glass-card-elevated group hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
            {/* Premium badge */}
            {template.isPremium && (
                <div className="absolute top-4 right-4 z-10 px-2 py-1 bg-amber-400 text-amber-900 text-[10px] font-bold rounded-full uppercase shadow-sm">
                    PRO
                </div>
            )}
            {!template.isPremium && (
                <div className="absolute top-4 right-4 z-10 px-2 py-1 bg-emerald-400 text-emerald-900 text-[10px] font-bold rounded-full uppercase shadow-sm">
                    FREE
                </div>
            )}

            {/* Preview */}
            <div className={`w-full h-56 bg-gradient-to-br ${template.previewGradient} rounded-xl mb-6 relative overflow-hidden flex items-center justify-center`}>
                {/* Mini invoice preview illustration */}
                <div className="w-32 h-44 bg-white/95 rounded-lg shadow-2xl p-3 transform group-hover:scale-105 transition-transform duration-300">
                    <div className="w-full h-2 rounded-full mb-2" style={{ backgroundColor: template.previewAccent }} />
                    <div className="w-3/4 h-1 bg-gray-200 rounded-full mb-1" />
                    <div className="w-1/2 h-1 bg-gray-200 rounded-full mb-3" />
                    <div className="space-y-1 mb-3">
                        <div className="w-full h-1 bg-gray-100 rounded-full" />
                        <div className="w-full h-1 bg-gray-100 rounded-full" />
                        <div className="w-full h-1 bg-gray-100 rounded-full" />
                    </div>
                    <div className="border-t border-gray-100 pt-2">
                        <div className="w-1/2 h-1 bg-gray-200 rounded-full ml-auto mb-1" />
                        <div className="w-2/3 h-2 rounded-full ml-auto" style={{ backgroundColor: template.previewAccent, opacity: 0.7 }} />
                    </div>
                </div>
            </div>

            {/* Info */}
            <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-indigo-600 transition-colors">{template.name}</h3>
            <p className="text-gray-600 text-sm mb-5">{template.description}</p>
            <Link
                href={`/invoice?template=${template.id}`}
                className="btn-primary inline-flex items-center gap-2 text-sm w-full justify-center"
            >
                {template.isPremium ? "Use Template (PRO)" : "Use This Template"}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
            </Link>
        </div>
    );
}
