import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import ErrorBoundary from "@/components/ErrorBoundary";
import { generateSoftwareApplicationSchema } from "@/lib/seo";
import AdProvider from "@/components/ads/AdProvider";
import Script from "next/script";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    preload: true,
});

export const viewport: Viewport = {
    width: "device-width",
    initialScale: 1,
    themeColor: "#4f46e5",
};

export const metadata: Metadata = {
    title: "Invoices at Best — Professional Invoice Generator",
    description:
        "Generate professional invoices, receipts, quotations, and proforma invoices instantly. Free PDF downloads with premium watermark-free options.",
    keywords: "invoice, generator, pdf, business, billing, receipt, quotation, proforma",
    manifest: "/manifest.json",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const adsenseClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

    return (
        <html lang="en">
            <body className={`${inter.className} flex flex-col min-h-screen`}>
                {adsenseClientId && (
                    <Script
                        async
                        src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseClientId}`}
                        crossOrigin="anonymous"
                        strategy="afterInteractive"
                    />
                )}
                <StructuredData data={generateSoftwareApplicationSchema()} />
                <AdProvider>
                    <ErrorBoundary>
                        <Header />
                        <main className="flex-1">
                            {children}
                        </main>
                        <Footer />
                    </ErrorBoundary>
                </AdProvider>
            </body>
        </html>
    );
}
