import { Metadata } from "next";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Privacy Policy — Invoices at Best",
    description: "Our commitment to your privacy. Learn how Invoices at Best collects, uses, and protects your information.",
    path: "/privacy",
});

export default function PrivacyPage() {
    return (
        <AdWrappedLayout>
            <div className="max-w-4xl mx-auto py-16 px-4 prose prose-indigo prose-lg">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b border-indigo-100 pb-4">Privacy Policy</h1>
                <p className="lead text-xl text-slate-600 mb-8">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>

                <p>
                    Your privacy is important to us. It is Invoices at Best's policy to respect your privacy regarding any information we may collect from you across our website, <a href="https://invoicesatbest.com">https://invoicesatbest.com</a>.
                </p>

                <h3>1. Information We Collect</h3>
                <p>
                    We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
                </p>

                <h3>2. How We Use Information</h3>
                <p>
                    We may use the information we collect to:
                </p>
                <ul>
                    <li>Provide, operate, and maintain our website</li>
                    <li>Improve, personalize, and expand our website</li>
                    <li>Understand and analyze how you use our website</li>
                    <li>Develop new products, services, features, and functionality</li>
                </ul>

                <h3>3. Log Files</h3>
                <p>
                    Invoices at Best follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics.
                </p>

                <h3>4. Cookies and Web Beacons</h3>
                <p>
                    Like any other website, Invoices at Best uses 'cookies'. These cookies are used to store information including visitors' preferences, and the pages on the website that the visitor accessed or visited.
                </p>

                <h3>5. Advertising Partners Privacy Policies</h3>
                <p>
                    You may consult this list to find the Privacy Policy for each of the advertising partners of Invoices at Best.
                </p>
                <p>
                    Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used on their respective advertisements and links that appear on Invoices at Best.
                </p>

                <h3>6. CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>
                <p>
                    Under the CCPA, among other rights, California consumers have the right to request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.
                </p>

                <h3>7. GDPR Data Protection Rights</h3>
                <p>
                    We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following: access, rectification, erasure, restrict processing, object to processing, and data portability.
                </p>

                <h3>8. Contact Us</h3>
                <p>
                    If you have any questions about our Privacy Policy, please contact us at <a href="mailto:mursaleen231213@gmail.com">mursaleen231213@gmail.com</a>.
                </p>
            </div>
        </AdWrappedLayout>
    );
}
