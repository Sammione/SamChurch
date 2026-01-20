"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const [currentMsgIndex, setCurrentMsgIndex] = useState(0);
    const messages = [
        { title: "A Commitment to the Word", detail: "Dedicated to teaching Scripture with clarity and reverence" },
        { title: "Scriptural Foundation", detail: "Our teachings are grounded in Scripture, without personal opinions or modern distortions." },
        { title: "Clarity & Comprehension", detail: "Helping believers understand what the Bible says and how it applies." },
        { title: "Doctrinal Consistency", detail: "Ensuring alignment with biblical principles and faithful interpretation of Scripture." }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentMsgIndex((prev) => (prev + 1) % messages.length);
        }, 6000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full">
            {/* Top Branding Bar */}
            <div className="w-full bg-primary py-2 px-4 border-b border-secondary/20 relative overflow-hidden group min-h-[44px] flex items-center">
                {/* Subtle shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-in-out"></div>

                <div className="max-w-7xl mx-auto w-full relative z-10 flex justify-center items-center h-full overflow-hidden">
                    {messages.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-6 text-center absolute left-0 right-0 transition-all duration-1000 ease-in-out ${index === currentMsgIndex
                                    ? "opacity-100 translate-y-0 scale-100"
                                    : "opacity-0 translate-y-4 scale-95 pointer-events-none"
                                }`}
                        >
                            <span className="text-secondary text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] font-serif whitespace-nowrap">
                                {msg.title}
                            </span>
                            <div className="hidden sm:block w-px h-3 bg-secondary/30"></div>
                            <span className="text-white/80 text-[10px] md:text-xs font-light italic tracking-wider px-4 sm:px-0">
                                {msg.detail}
                            </span>
                        </div>
                    ))}
                    {/* Invisible spacer to maintain height based on the longest likely text */}
                    <div className="opacity-0 flex flex-col sm:flex-row gap-2 sm:gap-6 py-1 w-full pointer-events-none">
                        <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] font-serif">Spacer</span>
                        <div className="hidden sm:block w-px h-3"></div>
                        <span className="text-[10px] md:text-xs font-light tracking-wider">Dedicated to teaching Scripture with clarity and reverence and more text to maintain height</span>
                    </div>
                </div>
            </div>

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
        </div>
    );
}
