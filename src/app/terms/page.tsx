import { Metadata } from "next";
import AdWrappedLayout from "@/components/ads/AdWrappedLayout";
import { generatePageMetadata } from "@/lib/seo";

export const metadata: Metadata = generatePageMetadata({
    title: "Terms of Service — Invoices at Best",
    description: "Rules and guidelines for using the Invoices at Best application. Please read these terms carefully before using our software.",
    path: "/terms",
});

export default function TermsPage() {
    return (
        <AdWrappedLayout>
            <div className="max-w-4xl mx-auto py-16 px-4 prose prose-indigo prose-lg">
                <h1 className="text-4xl font-bold text-slate-900 mb-8 border-b border-indigo-100 pb-4">Terms of Service</h1>
                <p className="lead text-xl text-slate-600 mb-8">
                    Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                </p>

                <h3>1. Introduction</h3>
                <p>
                    By accessing or using the Invoices at Best website and services ("Service"), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not use our Service.
                </p>

                <h3>2. Access and Use</h3>
                <p>
                    You may use Invoices at Best for lawful purposes only. You must not:
                </p>
                <ul>
                    <li>Use the service for illegal or fraudulent activities.</li>
                    <li>Attempt to gain unauthorized access to our systems.</li>
                    <li>Reverse engineer or decompile any part of the Service.</li>
                </ul>

                <h3>3. Intellectual Property</h3>
                <p>
                    The Service and its original content, features, and functionality are and will remain the exclusive property of Invoices at Best and its licensors.
                </p>

                <h3>4. User Generated Content</h3>
                <p>
                    You retain ownership of any data or content (e.g., invoice details, logos) you input into the Service. Invoices at Best does not claim ownership over your data and uses it solely for the purpose of generating your requested documents.
                </p>

                <h3>5. Disclaimer of Warranties</h3>
                <p>
                    The Service is provided on an "AS IS" and "AS AVAILABLE" basis. Invoices at Best makes no warranties, expressed or implied, regarding the reliability, accuracy, or availability of the Service.
                </p>

                <h3>6. Limitation of Liability</h3>
                <p>
                    In no event shall Invoices at Best be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                </p>

                <h3>7. Changes to Terms</h3>
                <p>
                    We reserve the right to modify or replace these Terms at any time. We will provide notice of any significant changes. Continued use of the Service after any changes constitutes acceptance of the new Terms.
                </p>

                <h3>8. Governing Law</h3>
                <p>
                    These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions.
                </p>

                <h3>9. Contact Us</h3>
                <p>
                    If you have any questions about these Terms, please contact us at <a href="mailto:mursaleen231213@gmail.com">mursaleen231213@gmail.com</a>.
                </p>
            </div>
        </AdWrappedLayout>
    );
}
