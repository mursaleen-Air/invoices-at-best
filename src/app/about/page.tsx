import { Metadata } from "next";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "About Us — Invoices at Best",
    description: "Learn about Invoices at Best, our mission to simplify billing for freelancers and small businesses worldwide.",
    path: "/about",
});

export default function AboutPage() {
    return (
        <AdWrappedLayout>
            <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">About Invoices at Best</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        We're on a mission to simplify financial documents for everyone.
                    </p>
                </div>

                <div className="prose prose-lg prose-indigo mx-auto text-slate-600">
                    <p>
                        Started in 2024, <strong>Invoices at Best</strong> was built with a simple goal: to replace complex, expensive accounting software with a fast, free, and beautiful tool that anyone can use.
                    </p>
                    <p>
                        We noticed that freelancers and small business owners were wasting hours every month struggling with spreadsheets or clunky invoice generators. We knew there had to be a better way.
                    </p>

                    <h2 className="text-slate-900 mt-12 mb-6">Our Philosophy</h2>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 not-prose mb-12">
                        <li className="glass-card p-6">
                            <h3 className="font-bold text-indigo-600 mb-2">Simplicity First</h3>
                            <p className="text-sm">No accounts required. No complex setups. Just open the page and start typing.</p>
                        </li>
                        <li className="glass-card p-6">
                            <h3 className="font-bold text-emerald-600 mb-2">Privacy Focused</h3>
                            <p className="text-sm">We don't store your invoice data. Everything is generated client-side in your browser.</p>
                        </li>
                        <li className="glass-card p-6">
                            <h3 className="font-bold text-amber-600 mb-2">Professional Design</h3>
                            <p className="text-sm">Documents that look good help you get paid faster. We prioritize clean, modern aesthetics.</p>
                        </li>
                        <li className="glass-card p-6">
                            <h3 className="font-bold text-fuchsia-600 mb-2">Always Accessible</h3>
                            <p className="text-sm">Our core tools will always be free to use, ensuring accessible billing for everyone.</p>
                        </li>
                    </ul>

                    <h2 className="text-slate-900 mb-6">The Team</h2>
                    <p>
                        We are a small, dedicated team of developers and designers passionate about building great software. access tools like Invoices at Best lets us empower millions of entrepreneurs to focus on what they do best — growing their business.
                    </p>
                </div>
            </div>
        </AdWrappedLayout>
    );
}
