"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Header() {
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const supabase = createClient();

        const getUser = async () => {
            try {
                const {
                    data: { user },
                } = await supabase.auth.getUser();
                setUser(user);
            } catch {
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        getUser();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, [pathname]);

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/invoice", label: "Invoice" },
        { href: "/receipt", label: "Receipt" },
        { href: "/quotation", label: "Quotation" },
        { href: "/proforma", label: "Proforma" },
    ];

    return (
        <header className="bg-white/70 backdrop-blur-md border-b border-indigo-100/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-indigo-500/30 transition-shadow duration-300">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">
                            Invoices<span className="text-primary-600"> at Best</span>
                        </span>
                    </Link>

                    <nav className="hidden md:flex items-center gap-6">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`text-sm font-medium transition-colors duration-200 ${pathname === link.href
                                    ? "text-primary-600"
                                    : "text-gray-600 hover:text-gray-900"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        {!isLoading && (
                            <>
                                {user ? (
                                    <div className="flex items-center gap-3">
                                        <Link
                                            href="/dashboard"
                                            className={`text-sm font-medium transition-colors duration-200 ${pathname === "/dashboard"
                                                ? "text-primary-600"
                                                : "text-gray-600 hover:text-gray-900"
                                                }`}
                                        >
                                            Dashboard
                                        </Link>
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="btn-primary text-sm py-2 px-4"
                                    >
                                        Sign in
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <details className="relative">
                            <summary className="list-none cursor-pointer p-2">
                                <svg
                                    className="w-6 h-6 text-gray-600"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </summary>
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        className={`block px-4 py-2 text-sm font-medium transition-colors ${pathname === link.href
                                            ? "text-primary-600 bg-primary-50"
                                            : "text-gray-600 hover:bg-gray-50"
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                                <hr className="my-2 border-gray-200" />
                                {!isLoading && (
                                    <>
                                        {user ? (
                                            <Link
                                                href="/dashboard"
                                                className={`block px-4 py-2 text-sm font-medium transition-colors ${pathname === "/dashboard"
                                                    ? "text-primary-600 bg-primary-50"
                                                    : "text-gray-600 hover:bg-gray-50"
                                                    }`}
                                            >
                                                Dashboard
                                            </Link>
                                        ) : (
                                            <>
                                                <Link
                                                    href="/login"
                                                    className="block px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50"
                                                >
                                                    Sign in
                                                </Link>
                                                <Link
                                                    href="/signup"
                                                    className="block px-4 py-2 text-sm font-medium text-primary-600 hover:bg-primary-50"
                                                >
                                                    Sign up
                                                </Link>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </details>
                    </div>
                </div>
            </div>
        </header>
    );
}
