"use client";

import Link from "next/link";
import { INVOICE_TEMPLATES } from "@/lib/templates";

export default function TemplateCarousel() {
    // Double the templates for seamless infinite scroll
    const items = [...INVOICE_TEMPLATES, ...INVOICE_TEMPLATES];

    return (
        <section className="py-20 overflow-hidden">
            <div className="text-center mb-12 px-4">
                <span className="text-sm font-semibold text-indigo-600 uppercase tracking-wider">
                    Choose Your Style
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">
                    Professional Templates for{" "}
                    <span className="text-gradient">Every Business</span>
                </h2>
                <p className="text-slate-600 max-w-xl mx-auto">
                    From simple and clean to executive and creative — find the perfect look for your invoices.
                </p>
            </div>

            {/* Infinite scroll track */}
            <div className="relative">
                {/* Fade edges */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <div className="flex gap-6 animate-marquee hover:[animation-play-state:paused]">
                    {items.map((tpl, idx) => (
                        <Link
                            key={`${tpl.id}-${idx}`}
                            href={`/invoice?template=${tpl.id}`}
                            className="flex-shrink-0 w-72 group"
                        >
                            <div className="glass-card-elevated hover:-translate-y-2 transition-all duration-300 h-full">
                                {/* Badge */}
                                <div className="flex justify-between items-center mb-3">
                                    <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full uppercase ${tpl.isPremium
                                            ? "bg-amber-100 text-amber-700"
                                            : "bg-emerald-100 text-emerald-700"
                                        }`}>
                                        {tpl.isPremium ? "PRO" : "FREE"}
                                    </span>
                                </div>

                                {/* Mini preview */}
                                <div className={`w-full h-40 bg-gradient-to-br ${tpl.previewGradient} rounded-xl mb-4 flex items-center justify-center relative overflow-hidden`}>
                                    <div className="w-24 h-32 bg-white/90 rounded-md shadow-xl p-2 transform group-hover:scale-110 transition-transform duration-500">
                                        <div className="w-full h-1.5 rounded-full mb-1.5" style={{ backgroundColor: tpl.previewAccent }} />
                                        <div className="w-2/3 h-0.5 bg-gray-200 rounded-full mb-0.5" />
                                        <div className="w-1/2 h-0.5 bg-gray-200 rounded-full mb-2" />
                                        <div className="space-y-0.5 mb-2">
                                            <div className="w-full h-0.5 bg-gray-100 rounded-full" />
                                            <div className="w-full h-0.5 bg-gray-100 rounded-full" />
                                            <div className="w-full h-0.5 bg-gray-100 rounded-full" />
                                        </div>
                                        <div className="border-t border-gray-100 pt-1">
                                            <div className="w-1/2 h-1 rounded-full ml-auto" style={{ backgroundColor: tpl.previewAccent, opacity: 0.6 }} />
                                        </div>
                                    </div>
                                </div>

                                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{tpl.name}</h3>
                                <p className="text-slate-500 text-xs mt-1 line-clamp-2">{tpl.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            <div className="text-center mt-10">
                <Link href="/invoice-templates" className="text-indigo-600 font-semibold hover:underline decoration-2 underline-offset-4">
                    View All Templates →
                </Link>
            </div>
        </section>
    );
}
