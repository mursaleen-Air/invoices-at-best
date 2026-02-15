"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";

export default function Header() {
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showMobileMenu, setShowMobileMenu] = useState(false);
    const userMenuRef = useRef<HTMLDivElement>(null);

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

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setShowUserMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setShowMobileMenu(false);
        setShowUserMenu(false);
    }, [pathname]);

    const handleSignOut = async () => {
        const supabase = createClient();

        try {
            await fetch("/api/auth/signout", { method: "POST" });
        } catch {
            // Continue with client-side cleanup
        }

        await supabase.auth.signOut({ scope: "local" });

        // Clear cookies
        document.cookie.split(";").forEach((c) => {
            const name = c.trim().split("=")[0];
            if (name.startsWith("sb-") || name.includes("supabase")) {
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;`;
                document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; domain=${window.location.hostname};`;
            }
        });

        // Clear storage
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith("sb-") || key.includes("supabase")) {
                localStorage.removeItem(key);
            }
        });
        Object.keys(sessionStorage).forEach((key) => {
            if (key.startsWith("sb-") || key.includes("supabase")) {
                sessionStorage.removeItem(key);
            }
        });

        window.location.href = "/";
    };

    const getUserInitials = (email: string) => {
        return email.charAt(0).toUpperCase();
    };

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

                    {/* Desktop Nav */}
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
                                    <div className="relative" ref={userMenuRef}>
                                        <button
                                            onClick={() => setShowUserMenu(!showUserMenu)}
                                            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50/50 transition-all duration-200"
                                        >
                                            <div className="w-7 h-7 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                                {getUserInitials(user.email || "U")}
                                            </div>
                                            <span className="text-sm font-medium text-gray-700 max-w-[140px] truncate hidden lg:block">
                                                {user.email}
                                            </span>
                                            <svg
                                                className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${showUserMenu ? "rotate-180" : ""}`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </button>

                                        {/* Dropdown */}
                                        {showUserMenu && (
                                            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 z-50 animate-fade-in-down">
                                                {/* User info */}
                                                <div className="px-4 py-3 border-b border-gray-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center text-white font-bold">
                                                            {getUserInitials(user.email || "U")}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-semibold text-gray-900 truncate">
                                                                {user.email}
                                                            </p>
                                                            <p className="text-xs text-gray-500">
                                                                {user.email_confirmed_at ? "Verified account" : "Unverified"}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                <Link
                                                    href="/dashboard"
                                                    onClick={() => setShowUserMenu(false)}
                                                    className="flex items-center gap-3 px-4 py-2.5 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors"
                                                >
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                                    </svg>
                                                    Dashboard
                                                </Link>

                                                <div className="border-t border-gray-100 mt-1 pt-1">
                                                    <button
                                                        onClick={handleSignOut}
                                                        className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                                                    >
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                                        </svg>
                                                        Sign out
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 px-5 py-2 rounded-xl hover:scale-[1.02] transform transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-indigo-500/25"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Sign In
                                    </Link>
                                )}
                            </>
                        )}
                    </nav>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setShowMobileMenu(!showMobileMenu)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                            <svg
                                className="w-6 h-6 text-gray-600"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                {showMobileMenu ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {showMobileMenu && (
                    <div className="md:hidden border-t border-gray-100 py-3 animate-fade-in-down">
                        <div className="space-y-1">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`block px-4 py-2.5 text-sm font-medium rounded-lg transition-colors ${pathname === link.href
                                        ? "text-primary-600 bg-primary-50"
                                        : "text-gray-600 hover:bg-gray-50"
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {!isLoading && (
                            <div className="border-t border-gray-100 mt-3 pt-3">
                                {user ? (
                                    <>
                                        {/* User info on mobile */}
                                        <div className="flex items-center gap-3 px-4 py-2.5 mb-2">
                                            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                                                {getUserInitials(user.email || "U")}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900 truncate">
                                                    {user.email}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    {user.email_confirmed_at ? "Verified" : "Unverified"}
                                                </p>
                                            </div>
                                        </div>
                                        <Link
                                            href="/dashboard"
                                            className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleSignOut}
                                            className="flex items-center gap-3 w-full px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                            </svg>
                                            Sign out
                                        </button>
                                    </>
                                ) : (
                                    <Link
                                        href="/login"
                                        className="flex items-center justify-center gap-2 mx-4 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl shadow-md transition-all"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                        </svg>
                                        Sign In
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </header>
    );
}
