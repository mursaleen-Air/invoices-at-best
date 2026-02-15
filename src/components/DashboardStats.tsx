"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface RecentDocument {
    id: string;
    documentType: string;
    documentNumber: string;
    customerName: string;
    totalAmount: number;
    currency: string;
    createdAt: string;
}

interface DashboardData {
    totalDocuments: number;
    thisMonth: number;
    totalRevenue: number;
    uniqueClients: number;
    recentDocuments: RecentDocument[];
}

const typeColors: Record<string, string> = {
    invoice: "from-blue-400 to-blue-600",
    receipt: "from-green-400 to-green-600",
    quotation: "from-orange-400 to-orange-600",
    proforma: "from-purple-400 to-purple-600",
};

const typeBadgeColors: Record<string, string> = {
    invoice: "bg-blue-50 text-blue-700 border-blue-100",
    receipt: "bg-green-50 text-green-700 border-green-100",
    quotation: "bg-orange-50 text-orange-700 border-orange-100",
    proforma: "bg-purple-50 text-purple-700 border-purple-100",
};

function formatCurrency(amount: number, currency: string = "USD"): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
    }).format(amount);
}

function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatRelativeTime(dateStr: string): string {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(dateStr);
}

// Action menu for each document row
function DocumentActions({
    doc,
    onDelete,
}: {
    doc: RecentDocument;
    onDelete: (id: string) => void;
}) {
    const [open, setOpen] = useState(false);
    const [confirming, setConfirming] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
                setOpen(false);
                setConfirming(false);
            }
        };
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);

    const docUrl = `/${doc.documentType}`;

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={() => { setOpen(!open); setConfirming(false); }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                title="Actions"
            >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                </svg>
            </button>

            {open && (
                <div className="absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 z-50 animate-fade-in">
                    {!confirming ? (
                        <>
                            {/* Edit */}
                            <button
                                onClick={() => { router.push(docUrl); setOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                </svg>
                                Create New {doc.documentType.charAt(0).toUpperCase() + doc.documentType.slice(1)}
                            </button>

                            {/* Preview */}
                            <button
                                onClick={() => { router.push(docUrl); setOpen(false); }}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                Preview & Download
                            </button>

                            {/* Divider */}
                            <div className="my-1.5 border-t border-gray-100" />

                            {/* Delete */}
                            <button
                                onClick={() => setConfirming(true)}
                                className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Delete
                            </button>
                        </>
                    ) : (
                        <div className="px-4 py-3">
                            <p className="text-sm font-medium text-gray-900 mb-1">Delete this document?</p>
                            <p className="text-xs text-gray-500 mb-3">This action cannot be undone.</p>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => { onDelete(doc.id); setOpen(false); setConfirming(false); }}
                                    className="flex-1 px-3 py-1.5 text-xs font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => setConfirming(false)}
                                    className="flex-1 px-3 py-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function DashboardStats() {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch("/api/documents/stats");
                if (response.ok) {
                    const stats = await response.json();
                    setData(stats);
                }
            } catch (error) {
                console.error("Failed to fetch dashboard stats:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchStats();
    }, []);

    const handleDelete = async (id: string) => {
        setDeletingId(id);
        try {
            const response = await fetch("/api/documents/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (response.ok) {
                // Remove from local state immediately
                setData((prev) => {
                    if (!prev) return prev;
                    const remaining = prev.recentDocuments.filter((d) => d.id !== id);
                    const deleted = prev.recentDocuments.find((d) => d.id === id);
                    return {
                        ...prev,
                        totalDocuments: prev.totalDocuments - 1,
                        totalRevenue: prev.totalRevenue - (deleted?.totalAmount || 0),
                        recentDocuments: remaining,
                    };
                });
            } else {
                alert("Failed to delete document. Please try again.");
            }
        } catch (error) {
            console.error("Failed to delete:", error);
            alert("Failed to delete document. Please try again.");
        } finally {
            setDeletingId(null);
        }
    };

    if (isLoading) {
        return (
            <>
                {/* Stats Skeleton */}
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="glass-card animate-pulse">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                                        <div className="h-8 bg-gray-200 rounded w-16" />
                                    </div>
                                    <div className="w-12 h-12 bg-gray-200 rounded-xl" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Activity Skeleton */}
                <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
                    <div className="glass-card animate-pulse">
                        <div className="space-y-4">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-gray-200 rounded-xl" />
                                    <div className="flex-1">
                                        <div className="h-4 bg-gray-200 rounded w-48 mb-1" />
                                        <div className="h-3 bg-gray-200 rounded w-32" />
                                    </div>
                                    <div className="h-4 bg-gray-200 rounded w-20" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </>
        );
    }

    const stats = data || {
        totalDocuments: 0,
        thisMonth: 0,
        totalRevenue: 0,
        uniqueClients: 0,
        recentDocuments: [],
    };

    return (
        <>
            {/* Stats */}
            <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="glass-card">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-500">Total Documents</p>
                                <p className="text-3xl font-bold text-gray-900">{stats.totalDocuments}</p>
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
                                <p className="text-3xl font-bold text-gray-900">{stats.thisMonth}</p>
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
                                <p className="text-3xl font-bold text-gray-900">
                                    {formatCurrency(stats.totalRevenue)}
                                </p>
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
                                <p className="text-3xl font-bold text-gray-900">{stats.uniqueClients}</p>
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
                    {stats.recentDocuments.length > 0 ? (
                        <div className="divide-y divide-gray-100">
                            {stats.recentDocuments.map((doc) => (
                                <div
                                    key={doc.id}
                                    className={`flex items-center gap-4 py-4 first:pt-0 last:pb-0 transition-opacity ${deletingId === doc.id ? "opacity-40 pointer-events-none" : ""}`}
                                >
                                    <div className={`w-10 h-10 bg-gradient-to-br ${typeColors[doc.documentType] || "from-gray-400 to-gray-600"} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2">
                                            <p className="text-sm font-semibold text-gray-900 truncate">
                                                {doc.documentNumber}
                                            </p>
                                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold border ${typeBadgeColors[doc.documentType] || "bg-gray-50 text-gray-700 border-gray-100"}`}>
                                                {doc.documentType.charAt(0).toUpperCase() + doc.documentType.slice(1)}
                                            </span>
                                        </div>
                                        <p className="text-xs text-gray-500 truncate">
                                            {doc.customerName} • {formatRelativeTime(doc.createdAt)}
                                        </p>
                                    </div>
                                    <p className="text-sm font-semibold text-gray-900 whitespace-nowrap">
                                        {formatCurrency(doc.totalAmount, doc.currency)}
                                    </p>
                                    <DocumentActions doc={doc} onDelete={handleDelete} />
                                </div>
                            ))}
                        </div>
                    ) : (
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
                    )}
                </div>
            </div>
        </>
    );
}
