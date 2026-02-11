import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[calc(100vh-140px)] flex items-center justify-center px-4 py-12">
            <div className="text-center max-w-lg">
                <div className="text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-blue-600 mb-6">
                    404
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    Page Not Found
                </h1>
                <p className="text-gray-600 mb-8">
                    The page you are looking for does not exist or has been moved.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/" className="btn-primary inline-flex items-center justify-center">
                        Go Home
                    </Link>
                    <Link
                        href="/invoice"
                        className="btn-secondary inline-flex items-center justify-center"
                    >
                        Create Invoice
                    </Link>
                </div>
            </div>
        </div>
    );
}
