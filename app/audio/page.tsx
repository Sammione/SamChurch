"use client";

import { useState, useEffect } from "react";

export default function AudioPage() {
    const [sermons, setSermons] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        async function fetchSermons() {
            try {
                const res = await fetch('/api/audio');

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    setSermons(data);
                } else {
                    console.error("API returned invalid data format", data);
                    setSermons([]);
                }
            } catch (error) {
                console.error("Failed to fetch sermons:", error);
                setSermons([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchSermons();
    }, []);

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Header */}
            <div className="bg-primary pt-32 pb-20 px-4 text-center">
                <div className="max-w-4xl mx-auto space-y-4">
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white">Audio Library</h1>
                    <p className="text-gray-400 text-lg">Listen and download sound teachings for your spiritual growth.</p>

                    <div className="max-w-xl mx-auto mt-10 relative">
                        <input
                            type="text"
                            placeholder="Search for sermons, speakers, or series..."
                            className="w-full px-6 py-4 bg-white/10 border border-white/20 rounded-2xl text-white placeholder:text-gray-500 focus:outline-none focus:border-secondary transition-colors"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {sermons.map((sermon) => (
                        <div key={sermon.id} className="group p-6 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition-all flex gap-6 items-center">
                            <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-xl flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-primary transition-colors cursor-pointer">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            </div>

                            <div className="flex-grow">
                                <div className="flex justify-between items-start mb-1">
                                    <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">{sermon.series}</span>
                                    <span className="text-xs text-gray-400">{sermon.date}</span>
                                </div>
                                <h3 className="text-xl font-serif font-bold text-primary group-hover:text-secondary transition-colors cursor-pointer">{sermon.title}</h3>
                                <p className="text-sm text-text-light font-medium">{sermon.speaker}</p>
                                <div className="flex items-center gap-4 mt-3 text-xs text-gray-400">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        {sermon.duration}
                                    </span>
                                    <button
                                        onClick={() => {
                                            if (sermon.audioUrl) {
                                                const downloadUrl = `/api/download?url=${encodeURIComponent(sermon.audioUrl)}&download=true`;

                                                const link = document.createElement('a');
                                                link.href = downloadUrl;
                                                link.download = `${sermon.title}.mp3`;
                                                link.target = "_blank";
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }
                                        }}
                                        disabled={!sermon.audioUrl}
                                        className="flex items-center gap-1 hover:text-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                        Download
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>


            {/* Sticky Player Placeholder */}
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-2xl-up z-50">
                <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center text-secondary">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                            </svg>
                        </div>
                        <div className="hidden sm:block">
                            <h4 className="text-sm font-bold text-primary">The Authority of Scripture</h4>
                            <p className="text-xs text-text-light">Select a sermon to play</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="text-gray-400 hover:text-primary transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                        </button>
                        <button className="w-10 h-10 bg-secondary text-primary rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
                        </button>
                        <button className="text-gray-400 hover:text-primary transition-colors">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </button>
                    </div>

                    <div className="hidden md:flex items-center gap-4 w-48">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                        <div className="flex-grow h-1.5 bg-gray-100 rounded-full">
                            <div className="w-2/3 h-full bg-secondary rounded-full"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
