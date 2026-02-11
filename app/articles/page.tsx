"use client";

import { useState } from "react";
import Link from "next/link";

export default function ArticlesPage() {
    // Mock data for now
    const [articles] = useState([
        {
            id: "1",
            title: "The Foundation of Faith",
            excerpt: "Faith is not just a belief; it is the substance of things hoped for, the evidence of things not seen. Explore the biblical definition of faith.",
            author: "Pastor Sam",
            date: "October 12, 2025",
            category: "Doctrine",
            coverUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            readTime: "5 min read"
        },
        {
            id: "2",
            title: "Walking in the Spirit",
            excerpt: "Discover what it means to walk in the Spirit and how it transforms your daily life and decision making.",
            author: "Pastor Sam",
            date: "October 15, 2025",
            category: "Christian Living",
            coverUrl: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
            readTime: "7 min read"
        },
        {
            id: "3",
            title: "Understanding Grace",
            excerpt: "Grace is often misunderstood. It is receiving what we do not deserve. Let's dive deep into the concept of grace in the New Testament.",
            author: "Pastor Sam",
            date: "October 20, 2025",
            category: "Theology",
            coverUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80",
            readTime: "6 min read"
        }
    ]);

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header Section */}
            <div className="bg-primary pt-32 pb-20 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-2xl -ml-32 -mb-32"></div>

                <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">Articles</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        In-depth articles, theological insights, and practical teachings to strengthen your walk with God.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {articles.map((article) => (
                        <div key={article.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col h-full">
                            {/* Image */}
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={article.coverUrl}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 flex flex-col flex-grow relative">
                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                                    <span className="font-medium text-secondary">{article.author}</span>
                                    <span>•</span>
                                    <span>{article.date}</span>
                                    <span>•</span>
                                    <span>{article.readTime}</span>
                                </div>

                                <h3 className="text-xl font-serif font-bold text-primary mb-3 group-hover:text-secondary transition-colors leading-tight">
                                    {article.title}
                                </h3>

                                <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                                    {article.excerpt}
                                </p>

                                <div className="pt-4 border-t border-gray-50">
                                    <Link href={`/articles/${article.id}`} className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group/btn hover:text-secondary transition-colors underline-offset-4 hover:underline">
                                        Read Full Article
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Newsletter/CTA Section */}
            <div className="max-w-5xl mx-auto px-4 mt-32 text-center">
                <div className="bg-primary rounded-[40px] py-16 px-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Stay Inspired</h2>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto italic">
                            "Thy word is a lamp unto my feet, and a light unto my path."
                        </p>
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full sm:w-80 px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white outline-none focus:border-secondary transition-colors"
                            />
                            <button className="btn-primary py-4 px-10 w-full sm:w-auto">Subscribe Now</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
