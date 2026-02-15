import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import ErrorBoundary from "@/components/ErrorBoundary";
import { generateSoftwareApplicationSchema } from "@/lib/seo";
import AdProvider from "@/components/ads/AdProvider";


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
    return (
        <html lang="en">
            <head>
                {/* Google Tag Manager */}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KK2PH9GK');`,
                    }}
                />
                {/* End Google Tag Manager */}
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1985129550910366"
                    crossOrigin="anonymous"
                ></script>
            </head>
            <body className={`${inter.className} flex flex-col min-h-screen`}>
                {/* Google Tag Manager (noscript) */}
                <noscript>
                    <iframe
                        src="https://www.googletagmanager.com/ns.html?id=GTM-KK2PH9GK"
                        height="0"
                        width="0"
                        style={{ display: 'none', visibility: 'hidden' }}
                    />
                </noscript>
                {/* End Google Tag Manager (noscript) */}
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
