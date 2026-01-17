import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-serif font-bold text-primary tracking-tighter">
                            DEFENDER<span className="text-secondary"> OF TRUTH </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        <Link href="/" className="text-sm font-medium text-text hover:text-secondary transition-colors">Home</Link>
                        <Link href="/magazines" className="text-sm font-medium text-text hover:text-secondary transition-colors">Magazines</Link>
                        <Link href="/audio" className="text-sm font-medium text-text hover:text-secondary transition-colors">Audio</Link>
                        <Link href="/books" className="text-sm font-medium text-text hover:text-secondary transition-colors">Books</Link>
                        <Link href="/admin/login" className="btn-primary py-2 px-4 text-xs uppercase tracking-widest">
                            Admin Portal
                        </Link>
                    </div>

                    <div className="md:hidden">
                        {/* Mobile menu button could go here */}
                        <button className="text-primary p-2">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
}
