import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import SignOutButton from "@/components/SignOutButton";
import SubscriptionCard from "@/components/SubscriptionCard";

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

                {/* Stats */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        <div className="glass-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Documents</p>
                                    <p className="text-3xl font-bold text-gray-900">0</p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">This Month</p>
                                    <p className="text-3xl font-bold text-gray-900">0</p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Total Revenue</p>
                                    <p className="text-3xl font-bold text-gray-900">$0</p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        <div className="glass-card">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm text-gray-500">Clients</p>
                                    <p className="text-3xl font-bold text-gray-900">0</p>
                                </div>
                                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Activity */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="glass-card">
                        <div className="text-center py-12">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <p className="text-gray-500">
                                No documents yet. Create your first invoice to get started.
                            </p>
                            <Link
                                href="/invoice"
                                className="btn-primary inline-flex items-center gap-2 mt-4"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                                Create Invoice
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
