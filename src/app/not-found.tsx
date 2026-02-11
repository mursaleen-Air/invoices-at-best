import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo";

export const metadata = generatePageMetadata({
    title: "Page Not Found — Invoices at Best",
    description: "The page you are looking for does not exist.",
    path: "/404",
});

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-140px)] flex flex-col items-center justify-center px-4 py-12 relative overflow-hidden bg-gradient-to-br from-indigo-50 to-white text-center">

            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-purple-200 rounded-full blur-3xl opacity-50 animate-float" />
            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-50 animate-float" style={{ animationDelay: "2s" }} />

            <div className="relative z-10 max-w-lg mx-auto">
                <div className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 mb-2 animate-pulse-glow">
                    404
                </div>

                <h1 className="text-3xl font-bold text-slate-900 mb-6">
                    Page Not Found
                </h1>

                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                    Oops! It seems this page has gone missing. Maybe it was an invoice that got paid?
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center w-full">
                    <Link
                        href="/"
                        className="px-8 py-3 rounded-xl bg-white text-indigo-600 font-semibold border border-indigo-100 shadow-lg hover:shadow-indigo-200 hover:-translate-y-1 transition-all duration-300"
                    >
                        Go Home
                    </Link>
                    <Link
                        href="/invoice"
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-1 transition-all duration-300"
                    >
                        Create Invoice
                    </Link>
                </div>

                <div className="mt-12 pt-8 border-t border-indigo-100">
                    <p className="text-sm text-slate-500 mb-4">Or check out our latest guides:</p>
                    <Link href="/blog" className="text-indigo-600 font-medium hover:underline decoration-2 underline-offset-4">
                        Visit the Blog →
                    </Link>
                </div>
            </div>
        </div>
    );
}
