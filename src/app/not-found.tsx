import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "Page Not Found — Invoices at Best",
    description: "The page you are looking for does not exist. Go back to creating free invoices, receipts, quotations, and proforma documents.",
    path: "/404",
});

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-center">

            {/* Animated background blobs */}
            <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-purple-200 rounded-full blur-3xl opacity-40 animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-indigo-200 rounded-full blur-3xl opacity-40 animate-float" style={{ animationDelay: "2s" }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse-glow" />

            <div className="relative z-10 max-w-2xl mx-auto">
                {/* Big 404 */}
                <div className="text-[10rem] md:text-[12rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 leading-none mb-2 animate-pulse-glow select-none">
                    404
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                    Page Not Found
                </h1>

                <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-md mx-auto">
                    Oops! This page doesn&apos;t exist. Don&apos;t worry — you can still create professional documents for free.
                </p>

                {/* Primary CTA */}
                <Link
                    href="/invoice"
                    className="inline-flex items-center gap-3 px-8 py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-bold text-lg shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 hover:scale-[1.02] transition-all duration-300"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Go to Invoice Generator
                </Link>

                {/* Secondary links */}
                <div className="mt-12 pt-8 border-t border-indigo-100/60">
                    <p className="text-sm text-slate-500 mb-6">Or try one of our other free tools:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <Link href="/invoice" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center py-4 px-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white mx-auto mb-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-indigo-600 transition-colors">Invoice</span>
                        </Link>
                        <Link href="/receipt" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center py-4 px-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white mx-auto mb-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-emerald-600 transition-colors">Receipt</span>
                        </Link>
                        <Link href="/quotation" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center py-4 px-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white mx-auto mb-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-amber-600 transition-colors">Quotation</span>
                        </Link>
                        <Link href="/proforma" className="glass-card group hover:-translate-y-1 transition-all duration-300 text-center py-4 px-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center text-white mx-auto mb-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <span className="text-sm font-semibold text-slate-700 group-hover:text-purple-600 transition-colors">Proforma</span>
                        </Link>
                    </div>
                </div>

                {/* Home link */}
                <div className="mt-8">
                    <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
