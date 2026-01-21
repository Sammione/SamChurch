"use client";

import { useState, useEffect } from "react";
import FileUpload from "@/app/components/FileUpload";

interface UploadModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    defaultType?: string;
}

export default function UploadModal({ isOpen, onClose, onSuccess, defaultType = "Magazine" }: UploadModalProps) {
    const [contentType, setContentType] = useState(defaultType);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Synchronize state with prop if it changes and modal opens
    useEffect(() => {
        if (isOpen) {
            // Map "Overview" or "Settings" to "Magazine" default
            const type = ["Magazine", "Audio Teachings", "Digital Books"].includes(defaultType)
                ? defaultType
                : "Magazine";

            // Convert "Audio Teachings" -> "Audio", "Digital Books" -> "Book"
            if (type === "Audio Teachings") setContentType("Audio");
            else if (type === "Digital Books") setContentType("Book");
            else setContentType("Magazine");
        }
    }, [isOpen, defaultType]);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        category: "",
        // Magazine
        issue: "",
        coverUrl: "",
        pdfUrl: "",
        // Audio
        speaker: "",
        series: "",
        audioUrl: "",
        duration: "",
        date: new Date().toISOString().split('T')[0],
        // Book
        author: "",
        price: "Digital Gift",
        pages: "",
    });

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        // Determine endpoint
        let endpoint = "";
        if (contentType === "Magazine") endpoint = "/api/magazines";
        else if (contentType === "Audio") endpoint = "/api/audio";
        else if (contentType === "Book") endpoint = "/api/books";

        try {
            const res = await fetch(endpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.error || "Failed to create content");
            }

            onSuccess();
            onClose();
            // Reset form (optional, or rely on unmount)
            setFormData({ ...formData, title: "", description: "" });

        } catch (err: any) {
            setError(err.message || "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl">
                <div className="p-8 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
                    <h2 className="text-2xl font-serif font-bold text-primary">Upload Content</h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold">
                            {error}
                        </div>
                    )}

                    <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Content Type</label>
                        <div className="flex gap-4">
                            {["Magazine", "Audio", "Book"].map((type) => (
                                <button
                                    key={type}
                                    type="button"
                                    onClick={() => setContentType(type)}
                                    className={`flex-1 py-3 type-button rounded-xl text-sm font-bold transition-all border ${contentType === type
                                        ? "bg-primary text-white border-primary"
                                        : "bg-white text-gray-400 border-gray-200 hover:border-primary/50"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Common Fields */}
                        <div className="col-span-2 space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Title</label>
                            <input required name="title" value={formData.title} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="Enter title..." />
                        </div>

                        <div className="col-span-2 space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Description</label>
                            <textarea required name="description" value={formData.description} onChange={handleChange} rows={3} className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="Short description..." />
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Category</label>
                            <input required name="category" value={formData.category} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="e.g. Faith, Culture" />
                        </div>

                        {/* Dynamic Fields */}
                        {contentType === "Magazine" && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Issue</label>
                                    <input required name="issue" value={formData.issue} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="e.g. Jan 2026" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Cover Image URL</label>
                                    <div className="flex gap-2">
                                        <input required name="coverUrl" value={formData.coverUrl} onChange={handleChange} className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="https://..." />
                                        <FileUpload onSuccess={(url) => setFormData(prev => ({ ...prev, coverUrl: url }))} resourceType="image" label="Upload" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">PDF URL (Optional)</label>
                                    <div className="flex gap-2">
                                        <input name="pdfUrl" value={formData.pdfUrl} onChange={handleChange} className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="https://..." />
                                        <FileUpload onSuccess={(url) => setFormData(prev => ({ ...prev, pdfUrl: url }))} resourceType="raw" label="Upload" />
                                    </div>
                                </div>
                            </>
                        )}

                        {contentType === "Audio" && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Speaker</label>
                                    <input required name="speaker" value={formData.speaker} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="e.g. Pastor Sam" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Series</label>
                                    <input required name="series" value={formData.series} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="e.g. Sunday Service" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Duration</label>
                                    <input required name="duration" value={formData.duration} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="e.g. 45 mins" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Date Recorded</label>
                                    <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" />
                                </div>
                                <div className="col-span-2 space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Audio URL</label>
                                    <div className="flex gap-2">
                                        <input required name="audioUrl" value={formData.audioUrl} onChange={handleChange} className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="https://..." />
                                        <FileUpload onSuccess={(url) => setFormData(prev => ({ ...prev, audioUrl: url }))} resourceType="video" label="Upload" />
                                    </div>
                                </div>
                            </>
                        )}

                        {contentType === "Book" && (
                            <>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Author</label>
                                    <input required name="author" value={formData.author} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="e.g. John Doe" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Pages</label>
                                    <input required name="pages" value={formData.pages} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="e.g. 150" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Price</label>
                                    <input required name="price" value={formData.price} onChange={handleChange} className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Cover Image URL</label>
                                    <div className="flex gap-2">
                                        <input required name="coverUrl" value={formData.coverUrl} onChange={handleChange} className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="https://..." />
                                        <FileUpload onSuccess={(url) => setFormData(prev => ({ ...prev, coverUrl: url }))} resourceType="image" label="Upload" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-widest text-gray-500">PDF URL (Optional)</label>
                                    <div className="flex gap-2">
                                        <input name="pdfUrl" value={formData.pdfUrl} onChange={handleChange} className="flex-1 px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" placeholder="https://..." />
                                        <FileUpload onSuccess={(url) => setFormData(prev => ({ ...prev, pdfUrl: url }))} resourceType="raw" label="Upload" />
                                    </div>
                                </div>
                            </>
                        )}

                    </div>

                    <div className="pt-6 flex justify-end gap-3 border-t border-gray-100">
                        <button type="button" onClick={onClose} className="px-6 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50 transition-colors">
                            Cancel
                        </button>
                        <button type="submit" disabled={isLoading} className="btn-primary px-8 py-3 text-sm flex items-center gap-2">
                            {isLoading && (
                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            )}
                            <span>{isLoading ? "Uploading..." : "Publish Content"}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
