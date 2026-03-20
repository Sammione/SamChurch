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

                setContent(combined.slice(0, 6)); // Show latest 6 items
            } catch (error) {
                console.error('Failed to fetch content:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchLatestContent();
    }, []);

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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {content.map((item) => (
                <div key={item.id} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col">
                    <div className="relative h-32 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100">
                        {item.coverUrl ? (
                            <img
                                src={item.coverUrl}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                        )}
                        <div className={`absolute top-2 left-2 px-2 py-0.5 ${getTypeColor(item.type)} text-white text-[8px] font-bold uppercase tracking-widest rounded-full`}>
                            {item.type}
                        </div>
                        {item.duration && (
                            <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/60 backdrop-blur-sm text-white text-[8px] rounded-full">
                                {item.duration}
                            </div>
                        )}
                    </div>
                    <div className="p-3 space-y-1.5 flex-grow flex flex-col">
                        <div className="flex items-center gap-1.5 text-[9px] text-text-light/70 uppercase tracking-tighter">
                            <span className="font-bold text-secondary">{item.category}</span>
                            <span>•</span>
                            <span>{new Date(item.createdAt).getFullYear()}</span>
                        </div>
                        <h3 className="text-xs font-serif font-bold group-hover:text-secondary transition-colors line-clamp-2 leading-tight">
                            {item.title}
                        </h3>
                        
                        <div className="mt-auto pt-2">
                             <Link
                                href={getContentLink(item)}
                                className="text-secondary font-bold text-[9px] uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all"
                            >
                                View {item.type}
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
