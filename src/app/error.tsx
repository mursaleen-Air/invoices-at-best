"use client";

import { useEffect } from "react";

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error("[GlobalError]", error);
    }, [error]);

    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
            <div className="glass-card text-center max-w-lg">
                <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg
                        className="w-10 h-10 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                        />
                    </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                    Something went wrong
                </h2>
                <p className="text-gray-600 mb-2">
                    An unexpected error occurred while loading this page.
                </p>
                {error.digest && (
                    <p className="text-xs text-gray-400 mb-6 font-mono">
                        Error ID: {error.digest}
                    </p>
                )}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button onClick={reset} className="btn-primary">
                        Try Again
                    </button>
                    <a href="/" className="btn-secondary inline-flex items-center justify-center">
                        Go Home
                    </a>
                </div>
            </div>
        </div>
    );
}
