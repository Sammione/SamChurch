"use client";

import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface Archive {
    id: string;
    title: string;
    description: string | null;
    type: string;
    fileUrl: string;
    coverUrl: string | null;
    year: string;
    createdAt: string;
}

export default function ArchivePage() {
    const [archives, setArchives] = useState<Archive[]>([]);
    const [filterType, setFilterType] = useState("ALL");
    const [filterYear, setFilterYear] = useState("ALL");
    const [years, setYears] = useState<string[]>([]);

    useEffect(() => {
        fetch("/api/archives")
            .then((res) => res.json())
            .then((data) => {
                setArchives(data);
                const uniqueYears = Array.from(new Set(data.map((item: Archive) => item.year))).sort().reverse();
                setYears(uniqueYears as string[]);
            });
    }, []);

    const filteredArchives = archives.filter((item) => {
        const typeMatch = filterType === "ALL" || item.type === filterType;
        const yearMatch = filterYear === "ALL" || item.year === filterYear;
        return typeMatch && yearMatch;
    });

    return (
        <main className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-primary py-20 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">
                        Ministry <span className="text-secondary">Archives</span>
                    </h1>
                    <p className="text-xl text-gray-300 max-w-2xl mx-auto font-light">
                        Explore our collection of historical documents, past magazines, and timeless audio teachings.
                    </p>
                </div>
            </section>

            {/* Filter Bar */}
            <div className="sticky top-20 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                        {["ALL", "PDF", "AUDIO", "DOCUMENT"].map((type) => (
                            <button
                                key={type}
                                onClick={() => setFilterType(type)}
                                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${filterType === type
                                        ? "bg-primary text-white shadow-md"
                                        : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                    }`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>

                    <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Filter by Year:</span>
                        <select
                            value={filterYear}
                            onChange={(e) => setFilterYear(e.target.value)}
                            className="bg-gray-100 border border-transparent rounded-lg px-3 py-2 text-sm focus:border-secondary focus:ring-0 outline-none"
                        >
                            <option value="ALL">All Years</option>
                            {years.map(year => (
                                <option key={year} value={year}>{year}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Content Grid */}
            <section className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    {filteredArchives.length === 0 ? (
                        <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
                            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300">
                                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">No Archives Found</h3>
                            <p className="text-gray-500 text-sm">Try adjusting your filters or check back later.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredArchives.map((item) => (
                                <div key={item.id} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                                    <div className="aspect-video bg-gray-100 relative overflow-hidden">
                                        {item.coverUrl ? (
                                            <img src={item.coverUrl} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-primary/5 text-primary/20">
                                                {item.type === "AUDIO" ? (
                                                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                                                ) : (
                                                    <svg className="w-16 h-16" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                                )}
                                            </div>
                                        )}
                                        <span className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest text-primary shadow-sm border border-gray-100">
                                            {item.type}
                                        </span>
                                        {item.year && (
                                            <span className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-white border border-white/20">
                                                {item.year}
                                            </span>
                                        )}
                                    </div>

                                    <div className="p-6 flex flex-col flex-grow">
                                        <h3 className="text-xl font-serif font-bold text-primary mb-2 line-clamp-2 group-hover:text-secondary transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-500 text-sm mb-6 line-clamp-3 font-light leading-relaxed flex-grow">
                                            {item.description || "No description available."}
                                        </p>

                                        <a
                                            href={item.fileUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-full btn-outline py-3 text-xs flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
                                        >
                                            {item.type === "AUDIO" ? "Listen Now" : "Download File"}
                                            <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    );
}
