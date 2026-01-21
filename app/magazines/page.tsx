"use client";

import { useState, useEffect } from "react";

export default function MagazinesPage() {
    const [magazines, setMagazines] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        async function fetchMagazines() {
            try {
                const res = await fetch('/api/magazines');

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    setMagazines(data);
                } else {
                    console.error("API returned invalid data format", data);
                    setMagazines([]);
                }
            } catch (error) {
                console.error("Failed to fetch magazines:", error);
                setMagazines([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchMagazines();
    }, []);

    const filteredMagazines = activeCategory === "All"
        ? magazines
        : magazines.filter(mag => mag.category === activeCategory);

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header Section */}
            <div className="bg-primary pt-32 pb-20 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-2xl -ml-32 -mb-32"></div>

                <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                    <span className="inline-block px-4 py-1.5 mb-2 text-xs font-semibold tracking-widest text-secondary uppercase border border-secondary/30 rounded-full bg-secondary/10">
                        Inspired Publications
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">Magazines Library</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Deep dive into our regular publications filled with sound doctrine and inspired messages for the builder of faith.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20">
                {/* Category Filters */}
                <div className="bg-white p-4 rounded-2xl shadow-xl flex flex-wrap gap-3 items-center justify-center border border-gray-100 mb-12">
                    {["All", "Theology", "Apologetics", "Devotional", "Teaching", "Life"].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveCategory(tag)}
                            className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${activeCategory === tag ? 'bg-secondary text-primary shadow-lg shadow-secondary/20' : 'bg-transparent text-text-light hover:bg-gray-50'}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Magazines Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredMagazines.map((mag) => (
                        <div key={mag.id} className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col">
                            {/* Cover Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                                <img
                                    src={mag.coverUrl}
                                    alt={mag.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                                    <button className="w-full btn-primary py-4 text-sm font-bold uppercase tracking-widest">
                                        Quick Preview
                                    </button>
                                </div>
                                <div className="absolute top-4 left-4">
                                    <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                                        {mag.category}
                                    </span>
                                </div>
                            </div>

                            {/* Information Section */}
                            <div className="p-8 space-y-4 flex-grow flex flex-col">
                                <div>
                                    <p className="text-secondary font-bold text-xs uppercase tracking-tighter mb-1">{mag.issue}</p>
                                    <h3 className="text-2xl font-serif font-bold text-primary leading-snug group-hover:text-secondary transition-colors line-clamp-2">
                                        {mag.title}
                                    </h3>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
                                    {mag.description}
                                </p>

                                <div className="pt-6 mt-auto border-t border-gray-50 flex items-center justify-between">
                                    <button
                                        onClick={() => {
                                            if (mag.pdfUrl) {
                                                window.open(`/api/download?url=${encodeURIComponent(mag.pdfUrl)}`, '_blank');
                                            }
                                        }}
                                        disabled={!mag.pdfUrl}
                                        className="text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group/btn hover:text-secondary transition-colors underline-offset-4 hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Read Online
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => {
                                            if (mag.pdfUrl) {
                                                const downloadUrl = `/api/download?url=${encodeURIComponent(mag.pdfUrl)}`;

                                                const link = document.createElement('a');
                                                link.href = downloadUrl;
                                                link.download = `${mag.title}.pdf`;
                                                link.target = "_blank";
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }
                                        }}
                                        disabled={!mag.pdfUrl}
                                        className="p-2 text-gray-400 hover:text-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        title="Download PDF"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="max-w-5xl mx-auto px-4 mt-32 text-center">
                <div className="bg-primary rounded-[40px] py-16 px-8 relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="relative z-10 space-y-6">
                        <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Never miss an issue</h2>
                        <p className="text-gray-400 text-lg max-w-xl mx-auto italic">
                            "Thy word is a lamp unto my feet, and a light unto my path."
                        </p>
                        <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full sm:w-80 px-6 py-4 bg-white/5 border border-white/20 rounded-2xl text-white outline-none focus:border-secondary transition-colors"
                            />
                            <button className="btn-primary py-4 px-10 w-full sm:w-auto">Get Early Access</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
