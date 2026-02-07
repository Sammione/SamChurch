"use client";

import Link from "next/link";
import { useState } from "react";

export default function AdminLoginPage() {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Get form data
        const form = e.target as HTMLFormElement;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const password = (form.elements.namedItem('password') as HTMLInputElement).value;

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (res.ok) {
                window.location.href = "/admin/dashboard";
            } else {
                setError(data.error || "Login failed");
                setIsLoading(false);
            }
        } catch (err) {
            setError("Something went wrong. Please try again.");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
            {/* Abstract Background Design */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-primary overflow-hidden hidden lg:block">
                <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center grayscale"></div>
                <div className="absolute inset-0 bg-gradient-to-l from-primary/50 to-primary"></div>
                <div className="h-full flex flex-col items-center justify-center text-center p-20 space-y-8 relative z-10">
                    <div className="space-y-2">
                        <h2 className="text-5xl font-serif font-bold text-white leading-tight">Defender of Truth <span className="text-secondary italic">Admin</span></h2>
                        <p className="text-xl text-gray-400 font-light">Set for the Defense of the Gospel.</p>
                    </div>
                    <div className="w-24 h-px bg-secondary/30"></div>
                    <p className="max-w-md text-gray-500 leading-relaxed italic font-light">
                        "For we can do nothing against the truth, but for the truth." — 2 Cor 13:8
                    </p>
                </div>
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 relative z-10">
                <div className="max-w-md w-full space-y-12">
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-12 h-12 bg-primary rounded-xl p-1.5 border border-secondary/20 group-hover:scale-110 transition-transform duration-300">
                                <img src="/defender-logo.png" alt="Logo" className="w-full h-full object-contain" />
                            </div>
                            <span className="text-2xl font-serif font-bold text-primary tracking-tighter">
                                Defender <span className="text-secondary">of Truth</span>
                            </span>
                        </Link>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-serif font-bold text-primary">Portal Access</h1>
                            <p className="text-text-light">Sign in to manage ministry resources.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-primary ml-1">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    placeholder="admin@truthdefender.org"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm"
                                />
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between px-1">
                                    <label className="text-xs font-bold uppercase tracking-widest text-primary">Password</label>
                                    <a href="#" className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:underline">Forgot?</a>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    placeholder="••••••••"
                                    className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:border-secondary focus:bg-white transition-all text-sm"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full btn-primary py-4 rounded-2xl flex items-center justify-center gap-3 group disabled:opacity-70"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                            ) : (
                                <>
                                    Enter Dashboard
                                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                </>
                            )}
                        </button>
                        {error && (
                            <div className="text-red-500 text-sm text-center font-bold animate-pulse">
                                {error}
                            </div>
                        )}
                    </form>

                    <div className="pt-12 text-center">
                        <p className="text-xs text-gray-400 italic">Protected strictly for authorized ministry personnel only.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
