import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import SubscriptionCard from "@/components/SubscriptionCard";
import DashboardStats from "@/components/DashboardStats";

export default async function DashboardPage() {
    const supabase = await createClient();
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const documentTypes = [
        {
            title: "Invoice",
            description: "Generate professional invoices for billing clients.",
            href: "/invoice",
            gradient: "from-blue-500 to-blue-700",
        },
        {
            title: "Receipt",
            description: "Create payment receipts for completed transactions.",
            href: "/receipt",
            gradient: "from-green-500 to-green-700",
        },
        {
            title: "Quotation",
            description: "Send price quotes to potential customers.",
            href: "/quotation",
            gradient: "from-orange-500 to-orange-700",
        },
        {
            title: "Proforma",
            description: "Issue preliminary invoices before final billing.",
            href: "/proforma",
            gradient: "from-purple-500 to-purple-700",
        },
    ];

    return (
        <div className="min-h-[calc(100vh-140px)] py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <div className="glass-card mb-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                            <p className="text-gray-600 mt-1">
                                Welcome back, {user.email}
                            </p>
                        </div>
                        <SignOutButton />
                    </div>
                </div>

                {/* Subscription */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Subscription</h2>
                    <SubscriptionCard />
                </div>

                {/* Quick Actions */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {documentTypes.map((doc) => (
                            <Link
                                key={doc.href}
                                href={doc.href}
                                className="glass-card text-left transform hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div
                                    className={`w-12 h-12 bg-gradient-to-br ${doc.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                >
                                    <svg
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 4v16m8-8H4"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors">
                                    New {doc.title}
                                </h3>
                                <p className="text-gray-600 text-sm">{doc.description}</p>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* Stats & Recent Activity - Client Component */}
                <DashboardStats />
            </div>
        </div>
    );
}
