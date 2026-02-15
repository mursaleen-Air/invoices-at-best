"use client";

import { useState, FormEvent, Suspense, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") || "/dashboard";

    const handleLogin = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        const supabase = createClient();

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setIsLoading(false);
            return;
        }

        router.push(redirect);
        router.refresh();
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex">
            {/* Left Panel - Branding / Visual */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700">
                {/* Animated background elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-300/10 rounded-full blur-3xl animate-pulse-glow" />
                </div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "60px 60px"
                }} />

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-12 xl:px-16">
                    <div className="animate-fade-in-up">
                        {/* Logo */}
                        <div className="flex items-center gap-3 mb-12">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center border border-white/20">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">
                                Invoices <span className="text-white/80">at Best</span>
                            </span>
                        </div>

                        <h2 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
                            Create professional
                            <br />
                            invoices in
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-pink-300">
                                seconds.
                            </span>
                        </h2>

                        <p className="text-white/70 text-lg max-w-md mb-10 leading-relaxed">
                            Generate beautiful invoices, receipts, quotations and proforma documents — all completely free.
                        </p>

                        {/* Feature list */}
                        <div className="space-y-4">
                            {[
                                "Unlimited free document generation",
                                "Professional PDF export",
                                "Multiple templates available",
                                "No hidden fees or watermarks",
                            ].map((feature, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-3 text-white/80 animate-fade-in-up"
                                    style={{ animationDelay: `${(i + 1) * 150}ms` }}
                                >
                                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-12 bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="w-full max-w-md animate-fade-in-up">
                    {/* Mobile logo */}
                    <div className="lg:hidden flex items-center gap-3 mb-10 justify-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <span className="text-xl font-bold text-gray-900 tracking-tight">
                            Invoices<span className="text-indigo-600"> at Best</span>
                        </span>
                    </div>

                    {/* Welcome text */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
                        <p className="text-gray-500">Sign in to your account to continue</p>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="mb-6 flex items-center gap-3 bg-red-50 border border-red-200 text-red-700 px-4 py-3.5 rounded-xl text-sm animate-fade-in-down">
                            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {error}
                        </div>
                    )}

                    {/* Form */}
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                Email address
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:border-slate-300"
                                    placeholder="you@example.com"
                                    required
                                    autoComplete="email"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3.5 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 shadow-sm hover:border-slate-300"
                                    placeholder="••••••••"
                                    required
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={termsAccepted}
                                    onChange={(e) => setTermsAccepted(e.target.checked)}
                                    className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition-colors cursor-pointer"
                                />
                            </div>
                            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
                                I agree to the <Link href="/terms" target="_blank" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">Terms of Service</Link> and <Link href="/privacy" target="_blank" className="text-indigo-600 hover:text-indigo-700 font-semibold hover:underline">Privacy Policy</Link>
                            </label>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !termsAccepted}
                            className="w-full relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-semibold py-3.5 px-8 rounded-xl hover:scale-[1.01] transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 flex items-center justify-center gap-2"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="mt-8 mb-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                        <span className="text-xs text-slate-400 font-medium uppercase tracking-wider">New here?</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-300 to-transparent" />
                    </div>

                    {/* Sign up link */}
                    <Link
                        href="/signup"
                        className="w-full flex items-center justify-center gap-2 bg-white text-slate-700 font-semibold py-3.5 px-8 rounded-xl border border-slate-200 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-300 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 shadow-sm hover:shadow-md"
                    >
                        Create a free account
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}

function LoginFormSkeleton() {
    return (
        <div className="min-h-[calc(100vh-64px)] flex">
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700" />
            <div className="w-full lg:w-1/2 flex items-center justify-center px-6 sm:px-12 py-12 bg-gradient-to-br from-slate-50 to-slate-100">
                <div className="w-full max-w-md animate-pulse">
                    <div className="mb-8">
                        <div className="h-9 bg-gray-200 rounded-lg w-56 mb-3" />
                        <div className="h-5 bg-gray-200 rounded-lg w-72" />
                    </div>
                    <div className="space-y-5">
                        <div>
                            <div className="h-4 bg-gray-200 rounded w-28 mb-2" />
                            <div className="h-14 bg-gray-200 rounded-xl" />
                        </div>
                        <div>
                            <div className="h-4 bg-gray-200 rounded w-20 mb-2" />
                            <div className="h-14 bg-gray-200 rounded-xl" />
                        </div>
                        <div className="h-14 bg-gray-200 rounded-xl" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={<LoginFormSkeleton />}>
            <LoginForm />
        </Suspense>
    );
}
