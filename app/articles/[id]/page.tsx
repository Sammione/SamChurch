"use client";

import { use, useState, useEffect } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";

// Mock data (same as in the listing page, ideally this should be in a shared file or API)
const articlesData = [
    {
        id: "1",
        title: "The Foundation of Faith",
        content: `
            <p class="mb-4">Faith is not just a belief; it is the substance of things hoped for, the evidence of things not seen. In a world that demands tangible proof, biblical faith calls us to trust in the character and promises of God.</p>
            <p class="mb-4">True faith is not a leap in the dark, but a step into the light of God's Word. It is anchored in the person of Jesus Christ and His finished work on the cross.</p>
            <h3 class="text-xl font-bold my-4">What is Faith?</h3>
            <p class="mb-4">Hebrews 11:1 defines faith as the "substance of things hoped for, the evidence of things not seen." This means faith gives reality to what we hope for in Christ.</p>
            <p class="mb-4">As we build our faith, we must immerse ourselves in Scripture, for "faith comes by hearing, and hearing by the word of God" (Romans 10:17).</p>
        `,
        author: "Pastor Sam",
        date: "October 12, 2025",
        category: "Doctrine",
        coverUrl: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        readTime: "5 min read"
    },
    {
        id: "2",
        title: "Walking in the Spirit",
        content: `
            <p class="mb-4">To walk in the Spirit is to live a life that is responsive to the leading of the Holy Spirit. It stands in contrast to walking according to the flesh, which seeks to satisfy selfish desires.</p>
            <p class="mb-4">Galatians 5:16 says, "Walk in the Spirit, and you shall not fulfill the lust of the flesh." This is the secret to victory in the Christian life.</p>
            <h3 class="text-xl font-bold my-4">How to Walk in the Spirit</h3>
            <ul class="list-disc pl-5 mb-4 space-y-2">
                <li>Yield to the Spirit's guidance daily.</li>
                <li>Soak your mind in the Word of God.</li>
                <li>Maintain a sensitive conscience through confession and repentance.</li>
                <li>Pray without ceasing.</li>
            </ul>
        `,
        author: "Pastor Sam",
        date: "October 15, 2025",
        category: "Christian Living",
        coverUrl: "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
        readTime: "7 min read"
    },
    {
        id: "3",
        title: "Understanding Grace",
        content: `
            <p class="mb-4">Grace is the unmerited favor of God. It is God giving us what we do not deserve. Salvation is by grace through faith, not of works, lest anyone should boast.</p>
            <p class="mb-4">Grace teaches us to say no to ungodliness and worldly passions, and to live self-controlled, upright and godly lives in this present age (Titus 2:11-12).</p>
        `,
        author: "Pastor Sam",
        date: "October 20, 2025",
        category: "Theology",
        coverUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-1.2.1&auto=format&fit=crop&w=1440&q=80",
        readTime: "6 min read"
    }
];

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using use() hook for Next.js 15+
    const resolvedParams = use(params);
    const [article, setArticle] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate API fetch
        const found = articlesData.find(a => a.id === resolvedParams.id);
        if (found) {
            setArticle(found);
        }
        setIsLoading(false);
    }, [resolvedParams.id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex justify-center items-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="min-h-screen flex flex-col justify-center items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-800">Article not found</h1>
                <Link href="/articles" className="text-primary underline">Back to Articles</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white pb-32">

            {/* Hero Image */}
            <div className="w-full h-[50vh] relative">
                <img
                    src={article.coverUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex flex-col justify-end pb-20 px-4">
                    <div className="max-w-3xl mx-auto w-full text-white space-y-4">
                        <span className="inline-block px-3 py-1 bg-secondary text-xs uppercase font-bold tracking-widest rounded-full text-primary">
                            {article.category}
                        </span>
                        <h1 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
                            {article.title}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 bg-gray-300 rounded-full overflow-hidden">
                                    {/* Avatar placeholder */}
                                    <div className="w-full h-full bg-gray-400"></div>
                                </div>
                                <span className="font-medium text-white">{article.author}</span>
                            </div>
                            <span>•</span>
                            <span>{article.date}</span>
                            <span>•</span>
                            <span>{article.readTime}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-3xl mx-auto px-4 py-12">
                {/* Breadcrumbs */}
                <div className="mb-8 text-sm text-gray-500">
                    <Link href="/articles" className="hover:text-primary transition-colors">Articles</Link>
                    <span className="mx-2">/</span>
                    <span className="text-gray-800">{article.title}</span>
                </div>

                {/* Article Body */}
                <div
                    className="prose prose-lg prose-headings:font-serif prose-headings:text-primary prose-p:text-gray-600 max-w-none"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                >
                </div>
            </div>
        </div>
    );
}
