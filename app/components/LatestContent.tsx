"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface ContentItem {
    id: string;
    title: string;
    category: string;
    coverUrl?: string;
    createdAt: string;
    type: "Magazine" | "Audio" | "Book";
    // Type-specific fields
    issue?: string;
    speaker?: string;
    duration?: string;
    author?: string;
}

export default function LatestContent() {
    const [content, setContent] = useState<ContentItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchLatestContent() {
            try {
                const [magRes, audioRes, bookRes] = await Promise.all([
                    fetch('/api/magazines'),
                    fetch('/api/audio'),
                    fetch('/api/books')
                ]);

                const [magazines, audio, books] = await Promise.all([
                    magRes.json(),
                    audioRes.json(),
                    bookRes.json()
                ]);

                // Combine and sort by date
                const combined: ContentItem[] = [
                    ...(Array.isArray(magazines) ? magazines.map((m: any) => ({ ...m, type: 'Magazine' as const })) : []),
                    ...(Array.isArray(audio) ? audio.map((a: any) => ({ ...a, type: 'Audio' as const })) : []),
                    ...(Array.isArray(books) ? books.map((b: any) => ({ ...b, type: 'Book' as const })) : [])
                ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

                setContent(combined.slice(0, 12)); // Show latest 12 items for the carousel
            } catch (error) {
                console.error('Failed to fetch content:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchLatestContent();
    }, []);

    const scrollLeft = () => {
        const el = document.getElementById('content-slider');
        if (el) el.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const scrollRight = () => {
        const el = document.getElementById('content-slider');
        if (el) el.scrollBy({ left: 300, behavior: 'smooth' });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    if (content.length === 0) {
        return (
            <div className="text-center py-20">
                <p className="text-text-light text-lg">No content available yet. Check back soon!</p>
            </div>
        );
    }

    const getContentLink = (item: ContentItem) => {
        if (item.type === 'Magazine') return '/magazines';
        if (item.type === 'Audio') return '/audio';
        return '/books';
    };

    const getTypeColor = (type: string) => {
        if (type === 'Magazine') return 'bg-blue-500';
        if (type === 'Audio') return 'bg-purple-500';
        return 'bg-amber-500';
    };

    return (
        <div className="relative group/slider">
            {/* Scroll Buttons */}
            <button 
                onClick={scrollLeft}
                className="absolute -left-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg border border-gray-100 p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-gray-50 text-primary"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button 
                onClick={scrollRight}
                className="absolute -right-4 top-1/2 -translate-y-1/2 z-20 bg-white shadow-lg border border-gray-100 p-2 rounded-full opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-gray-50 text-primary"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>

            <div 
                id="content-slider"
                className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory scroll-smooth pb-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {content.map((item) => (
                    <Link 
                        key={item.id} 
                        href={getContentLink(item)}
                        className="flex-shrink-0 w-32 md:w-40 snap-start group bg-white rounded-lg overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-300"
                    >
                        <div className="relative h-16 md:h-20 overflow-hidden bg-gray-50">
                            {item.coverUrl ? (
                                <img
                                    src={item.coverUrl}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-200">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                            )}
                            <div className={`absolute top-1 left-1 px-1.5 py-0.5 ${getTypeColor(item.type)} text-white text-[6px] font-bold uppercase tracking-widest rounded`}>
                                {item.type}
                            </div>
                        </div>
                        <div className="p-2 space-y-0.5">
                            <div className="flex items-center gap-1 text-[7px] text-text-light/50 font-bold uppercase tracking-tighter">
                                <span className="text-secondary">{item.category}</span>
                            </div>
                            <h3 className="text-[9px] font-bold text-primary group-hover:text-secondary transition-colors line-clamp-1 leading-none">
                                {item.title}
                            </h3>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
