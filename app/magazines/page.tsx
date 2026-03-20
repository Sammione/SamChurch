"use client";

import { useState, useEffect } from "react";

export default function MagazinesPage() {
    const [magazines, setMagazines] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);


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
                        Dive deep into our regular publications filled with sound doctrine and inspired messages for building faith.
                    </p>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">


                {/* Magazines Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
                    {magazines.map((mag) => (
                        <div key={mag.id} className="group bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col">
                            {/* Cover Image Container */}
                            <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                                <img
                                    src={mag.coverUrl}
                                    alt={mag.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
                                    <button 
                                        onClick={() => mag.pdfUrl && window.open(mag.pdfUrl, '_blank')}
                                        className="w-full btn-primary py-1 text-[7px] font-bold uppercase tracking-widest rounded-md"
                                    >
                                        Read
                                    </button>
                                </div>
                                <div className="absolute top-1.5 left-1.5">
                                    <span className="bg-primary/80 backdrop-blur-md text-white text-[6px] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-widest">
                                        {mag.category}
                                    </span>
                                </div>
                            </div>

                            {/* Information Section */}
                            <div className="p-2 space-y-1 flex-grow flex flex-col">
                                <div>
                                    <p className="text-secondary font-bold text-[7px] uppercase tracking-tighter mb-0">{mag.issue}</p>
                                    <h3 className="text-[10px] font-serif font-bold text-primary leading-tight group-hover:text-secondary transition-colors line-clamp-2">
                                        {mag.title}
                                    </h3>
                                </div>
                                <p className="text-gray-400 text-[8px] leading-tight line-clamp-1">
                                    {mag.description}
                                </p>

                                <div className="pt-1.5 mt-auto border-t border-gray-50 flex items-center justify-between">
                                    <button
                                        onClick={() => {
                                            if (mag.pdfUrl) {
                                                window.open(mag.pdfUrl, '_blank');
                                            }
                                        }}
                                        disabled={!mag.pdfUrl}
                                        className="text-primary font-bold text-[7px] uppercase tracking-widest flex items-center gap-1 group/btn hover:text-secondary transition-colors disabled:opacity-50"
                                    >
                                        Online
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-2 w-2 group-hover/btn:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button>

                                    <button
                                        onClick={() => {
                                            if (mag.pdfUrl) {
                                                const downloadUrl = `/api/download?url=${encodeURIComponent(mag.pdfUrl)}&download=true`;

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
                                        className="p-0.5 text-gray-300 hover:text-secondary transition-colors disabled:opacity-50"
                                        title="Download"
                                    >
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
