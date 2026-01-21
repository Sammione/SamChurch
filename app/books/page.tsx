"use client";

import { useState, useEffect } from "react";

export default function BooksPage() {
    const [books, setBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("All");

    useEffect(() => {
        async function fetchBooks() {
            try {
                const res = await fetch('/api/books');

                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }

                const data = await res.json();

                if (Array.isArray(data)) {
                    setBooks(data);
                } else {
                    console.error("API returned invalid data format", data);
                    setBooks([]);
                }
            } catch (error) {
                console.error("Failed to fetch books:", error);
                setBooks([]);
            } finally {
                setIsLoading(false);
            }
        }
        fetchBooks();
    }, []);

    const filteredBooks = activeCategory === "All"
        ? books
        : books.filter(book => book.category === activeCategory);

    return (
        <div className="min-h-screen bg-background pb-32">
            {/* Immersive Header */}
            <div className="bg-primary pt-32 pb-24 px-4 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-fixed opacity-5 grayscale"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-primary/95 to-primary"></div>

                <div className="max-w-4xl mx-auto space-y-4 relative z-10">
                    <span className="inline-block px-4 py-1.5 mb-2 text-xs font-semibold tracking-widest text-secondary uppercase border border-secondary/30 rounded-full bg-secondary/10">
                        Digital Wisdom
                    </span>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight">Digital Book Library</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
                        Curated literature for the hungry soul. Download our digital books for in-depth study and personal growth.
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
                {/* Category Filters */}
                <div className="flex flex-wrap gap-4 mb-12 justify-center">
                    {["All", "Theology", "Apologetics", "Spiritual Life", "Study Guide"].map((tag) => (
                        <button
                            key={tag}
                            onClick={() => setActiveCategory(tag)}
                            className={`px-8 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${activeCategory === tag ? 'bg-secondary text-primary border-secondary shadow-lg' : 'bg-white text-text-light border-gray-200 hover:border-secondary hover:text-secondary'}`}
                        >
                            {tag}
                        </button>
                    ))}
                </div>

                {/* Books Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {filteredBooks.map((book) => (
                        <div key={book.id} className="flex flex-col sm:flex-row gap-8 items-center sm:items-stretch bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group">
                            {/* Book Cover */}
                            <div className="w-48 sm:w-56 flex-shrink-0 relative">
                                <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl relative">
                                    <img
                                        src={book.coverUrl}
                                        alt={book.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-2xl"></div>
                                </div>
                                {/* Decorative Elements */}
                                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-primary shadow-lg group-hover:rotate-12 transition-transform">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.18L12 21z" /></svg>
                                </div>
                            </div>

                            {/* Book Info */}
                            <div className="flex flex-col justify-center space-y-4">
                                <div className="space-y-1">
                                    <span className="text-[10px] uppercase tracking-widest text-secondary font-bold">{book.category}</span>
                                    <h3 className="text-2xl font-serif font-bold text-primary leading-tight group-hover:text-secondary transition-colors">{book.title}</h3>
                                    <p className="text-sm font-medium text-text-light">By {book.author}</p>
                                </div>

                                <p className="text-gray-500 text-sm leading-relaxed italic line-clamp-3">
                                    "{book.description}"
                                </p>

                                <div className="flex items-center gap-6 pt-2">
                                    <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                        {book.pages}
                                    </div>
                                    <div className="text-xs font-bold text-secondary uppercase tracking-widest">{book.price}</div>
                                </div>

                                <div className="pt-4">
                                    <button
                                        onClick={() => {
                                            if (book.pdfUrl) {
                                                let downloadUrl = book.pdfUrl;

                                                if (downloadUrl.includes('cloudinary.com') && downloadUrl.includes('/upload/')) {
                                                    if (!downloadUrl.includes('fl_attachment')) {
                                                        downloadUrl = downloadUrl.replace('/upload/', '/upload/fl_attachment/');
                                                    }
                                                }

                                                const link = document.createElement('a');
                                                link.href = downloadUrl;
                                                link.download = `${book.title}.pdf`;
                                                link.target = "_blank";
                                                document.body.appendChild(link);
                                                link.click();
                                                document.body.removeChild(link);
                                            }
                                        }}
                                        disabled={!book.pdfUrl}
                                        className="btn-primary w-full sm:w-auto text-xs py-3 px-8 flex items-center justify-center gap-2 group/btn disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Download PDF
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover/btn:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
