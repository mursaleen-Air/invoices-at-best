import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-white border-t border-slate-100 pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Column */}
                    <div>
                        <Link href="/" className="inline-flex items-center gap-2 mb-6 group">
                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-slate-900 tracking-tight">
                                Invoices<span className="text-indigo-600"> at Best</span>
                            </span>
                        </Link>
                        <p className="text-slate-500 text-sm leading-relaxed mb-6">
                            Professional document generation for freelancers and small businesses. Create invoices, receipts, and quotes in seconds.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer flex items-center justify-center text-slate-400 hover:text-slate-600">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Products */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-6">Products</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/invoice" className="text-slate-600 hover:text-indigo-600 transition-colors">Invoice Generator</Link></li>
                            <li><Link href="/receipt" className="text-slate-600 hover:text-indigo-600 transition-colors">Receipt Maker</Link></li>
                            <li><Link href="/quotation" className="text-slate-600 hover:text-indigo-600 transition-colors">Quotation Tool</Link></li>
                            <li><Link href="/proforma" className="text-slate-600 hover:text-indigo-600 transition-colors">Proforma Invoice</Link></li>
                        </ul>
                    </div>

                    {/* Resources */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-6">Resources</h3>
                        <ul className="space-y-4 text-sm">
                            <li><Link href="/blog" className="text-slate-600 hover:text-indigo-600 transition-colors">Business Blog</Link></li>
                            <li><Link href="/invoice-templates" className="text-slate-600 hover:text-indigo-600 transition-colors">Invoice Templates</Link></li>

                            <li><Link href="/free-invoice-generator" className="text-slate-600 hover:text-indigo-600 transition-colors">Free Tools</Link></li>
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="font-semibold text-slate-900 mb-6">Get in Touch</h3>
                        <ul className="space-y-4 text-sm">
                            <li>
                                <a href="mailto:mursaleen231213@gmail.com" className="text-slate-600 hover:text-indigo-600 transition-colors flex items-center gap-2">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                    mursaleen231213@gmail.com
                                </a>
                            </li>
                            <li><Link href="/about" className="text-slate-600 hover:text-indigo-600 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="text-slate-600 hover:text-indigo-600 transition-colors">Contact Support</Link></li>
                            <li><Link href="/privacy" className="text-slate-600 hover:text-indigo-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-slate-600 hover:text-indigo-600 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-slate-500">
                        © {currentYear} Invoices at Best. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6 text-sm text-slate-500">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                            System Operational
                        </span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
