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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {content.map((item) => (
                <div key={item.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                    <div className="relative h-40 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                        {item.coverUrl ? (
                            <img
                                src={item.coverUrl}
                                alt={item.title}
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-400">
                                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                        )}
                        <div className={`absolute top-4 left-4 px-3 py-1 ${getTypeColor(item.type)} text-white text-xs font-semibold rounded-full`}>
                            {item.type}
                        </div>
                        {item.duration && (
                            <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                                {item.duration}
                            </div>
                        )}
                    </div>
                    <div className="p-6 space-y-3">
                        <div className="flex items-center gap-2 text-xs text-text-light">
                            <span className="px-2 py-1 bg-gray-100 rounded">{item.category}</span>
                            <span>•</span>
                            <span>{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                        <h3 className="text-lg font-serif font-bold group-hover:text-secondary transition-colors line-clamp-2">
                            {item.title}
                        </h3>
                        {item.speaker && (
                            <p className="text-sm text-text-light">Speaker: {item.speaker}</p>
                        )}
                        {item.author && (
                            <p className="text-sm text-text-light">Author: {item.author}</p>
                        )}
                        {item.issue && (
                            <p className="text-sm text-text-light">Issue: {item.issue}</p>
                        )}
                        <Link
                            href={getContentLink(item)}
                            className="text-secondary font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all"
                        >
                            View {item.type}
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
