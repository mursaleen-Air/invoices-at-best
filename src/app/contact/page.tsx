import { Metadata } from "next";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Contact Us — Invoices at Best",
    description: "Get in touch with the Invoices at Best team. Need help with a document or have feedback? Reach out to us.",
    path: "/contact",
});

export default function ContactPage() {
    return (
        <AdWrappedLayout>
            <div className="max-w-4xl mx-auto py-16 px-4">
                <div className="text-center mb-16 animate-fade-in-up">
                    <h1 className="text-4xl font-bold text-slate-900 mb-6">Contact Us</h1>
                    <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                        Have a question, suggestion, or just want to say hello?
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl -z-10 animate-pulse-glow" />

                    <div className="space-y-8">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-900 mb-4">Get in Touch</h2>
                            <p className="text-slate-600 text-lg">
                                We'd love to hear from you. Fill out the form or send us an email directly.
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Email</h3>
                                <a href="mailto:mursaleen231213@gmail.com" className="text-indigo-600 hover:text-indigo-800 transition-colors">mursaleen231213@gmail.com</a>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">Support Hours</h3>
                                <p className="text-slate-600">Mon-Fri: 9am - 5pm EST</p>
                            </div>
                        </div>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                            <input type="text" id="name" className="input-field w-full" placeholder="John Doe" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                            <input type="email" id="email" className="input-field w-full" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                            <textarea id="message" rows={4} className="input-field w-full resize-none" placeholder="Tell us how we can help..."></textarea>
                        </div>
                        <button type="submit" className="btn-primary w-full">Send Message</button>
                    </form>
                </div>
            </div>
        </AdWrappedLayout>
    );
}
