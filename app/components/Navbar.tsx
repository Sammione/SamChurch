"use client";

import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

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
                        <button 
                            className="text-primary p-2"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-lg animate-in slide-in-from-top-2">
                    <div className="flex flex-col space-y-4 px-4 py-6">
                        <Link 
                            href="/" 
                            className="text-lg font-medium text-text hover:text-secondary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Home
                        </Link>
                        <Link 
                            href="/magazines" 
                            className="text-lg font-medium text-text hover:text-secondary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Magazines
                        </Link>
                        <Link 
                            href="/audio" 
                            className="text-lg font-medium text-text hover:text-secondary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Audio
                        </Link>
                        <Link 
                            href="/books" 
                            className="text-lg font-medium text-text hover:text-secondary transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Books
                        </Link>
                        <div className="pt-4 border-t border-gray-100">
                             <Link 
                                href="/admin/login" 
                                className="btn-primary w-full text-center block py-3 text-sm font-semibold"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Admin Portal
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </nav>
    );
}
