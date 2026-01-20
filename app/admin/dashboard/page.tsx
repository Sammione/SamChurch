"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const sidebarLinks = [
    {
        name: 'Overview', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
        )
    },
    {
        name: 'Magazines', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
        )
    },
    {
        name: 'Audio Teachings', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" /></svg>
        )
    },
    {
        name: 'Digital Books', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" /></svg>
        )
    },
    {
        name: 'Settings', icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
        )
    },
];

import UploadModal from "./UploadModal";

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('Overview');
    const [statsData, setStatsData] = useState<any[]>([]);
    const [recentContent, setRecentContent] = useState<any[]>([]);
    const [allMagazines, setAllMagazines] = useState<any[]>([]);
    const [allAudio, setAllAudio] = useState<any[]>([]);
    const [allBooks, setAllBooks] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploadOpen, setIsUploadOpen] = useState(false);

    const fetchDashboardData = async () => {
        setIsLoading(true);
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

            setAllMagazines(Array.isArray(magazines) ? magazines : []);
            setAllAudio(Array.isArray(audio) ? audio : []);
            setAllBooks(Array.isArray(books) ? books : []);

            setStatsData([
                { label: 'Total Magazines', value: Array.isArray(magazines) ? magazines.length : 0, change: '+0 this month', icon: 'bg-blue-50 text-blue-600' },
                { label: 'Audio Teachings', value: Array.isArray(audio) ? audio.length : 0, change: '+0 this week', icon: 'bg-purple-50 text-purple-600' },
                { label: 'Digital Books', value: Array.isArray(books) ? books.length : 0, change: '0 change', icon: 'bg-amber-50 text-amber-600' },
                { label: 'Subscribers', value: '0', change: '+0%', icon: 'bg-emerald-50 text-emerald-600' },
            ]);

            const combined = [
                ...(Array.isArray(magazines) ? magazines.map((m: any) => ({ ...m, type: 'Magazine' })) : []),
                ...(Array.isArray(audio) ? audio.map((a: any) => ({ ...a, type: 'Audio' })) : []),
                ...(Array.isArray(books) ? books.map((b: any) => ({ ...b, type: 'Book' })) : [])
            ].sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            setRecentContent(combined.slice(0, 10));
        } catch (error) {
            console.error("Dashboard fetch error:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center h-64">
                    <div className="w-8 h-8 border-4 border-secondary border-t-transparent rounded-full animate-spin"></div>
                </div>
            );
        }

        if (activeTab === 'Overview') {
            return (
                <>
                    {/* Dashboard Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {statsData.map((stat) => (
                            <div key={stat.label} className="bg-white p-6 rounded-3xl border border-gray-50 shadow-sm">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl ${stat.icon}`}>
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-sm font-medium text-text-light">{stat.label}</h3>
                                    <div className="text-3xl font-serif font-bold text-primary">{stat.value}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Recent Content Table */}
                    <div className="bg-white rounded-[32px] border border-gray-50 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-gray-50 flex justify-between items-center">
                            <h2 className="text-xl font-serif font-bold text-primary">Recent Publications</h2>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="bg-gray-50/50">
                                        <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Content Title</th>
                                        <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</th>
                                        <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Type</th>
                                        <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Date Added</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-50">
                                    {recentContent.map((item, i) => (
                                        <tr key={i} className="group hover:bg-gray-50/50 transition-colors">
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-4 text-sm font-bold text-primary">
                                                    {item.title}
                                                </div>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-text-light">{item.category}</td>
                                            <td className="px-8 py-5">
                                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest">{item.type}</span>
                                            </td>
                                            <td className="px-8 py-5 text-sm text-gray-400">{new Date(item.createdAt).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                    {recentContent.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="px-8 py-20 text-center text-gray-400 italic">No content found. Start by uploading some!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            );
        }

        if (activeTab === 'Magazines') {
            return (
                <div className="bg-white rounded-[32px] border border-gray-50 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50"><h2 className="text-xl font-serif font-bold text-primary">All Magazines</h2></div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Title</th>
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Issue</th>
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Category</th>
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {allMagazines.map((item, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50">
                                        <td className="px-8 py-5 text-sm font-bold text-primary">{item.title}</td>
                                        <td className="px-8 py-5 text-sm text-text-light">{item.issue}</td>
                                        <td className="px-8 py-5 text-sm text-text-light">{item.category}</td>
                                        <td className="px-8 py-5">
                                            <button
                                                onClick={() => handleDelete("Magazine", item.id, item.title)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                                title="Delete magazine"
                                            >
                                                <svg className="w-5 h-5 text-gray-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {allMagazines.length === 0 && <div className="p-10 text-center text-gray-400">No magazines found.</div>}
                    </div>
                </div>
            );
        }

        if (activeTab === 'Audio Teachings') {
            return (
                <div className="bg-white rounded-[32px] border border-gray-50 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50"><h2 className="text-xl font-serif font-bold text-primary">Audio Library</h2></div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Title</th>
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Speaker</th>
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Series</th>
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Date</th>
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {allAudio.map((item, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50">
                                        <td className="px-8 py-5 text-sm font-bold text-primary">{item.title}</td>
                                        <td className="px-8 py-5 text-sm text-text-light">{item.speaker}</td>
                                        <td className="px-8 py-5 text-sm text-text-light">{item.series}</td>
                                        <td className="px-8 py-5 text-sm text-text-light">{new Date(item.date).toLocaleDateString()}</td>
                                        <td className="px-8 py-5">
                                            <button
                                                onClick={() => handleDelete("Audio", item.id, item.title)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                                title="Delete audio teaching"
                                            >
                                                <svg className="w-5 h-5 text-gray-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {allAudio.length === 0 && <div className="p-10 text-center text-gray-400">No audio teachings found.</div>}
                    </div>
                </div>
            );
        }

        if (activeTab === 'Digital Books') {
            return (
                <div className="bg-white rounded-[32px] border border-gray-50 shadow-sm overflow-hidden">
                    <div className="p-8 border-b border-gray-50"><h2 className="text-xl font-serif font-bold text-primary">All Books</h2></div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Title</th>
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Author</th>
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Price</th>
                                    <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {allBooks.map((item, i) => (
                                    <tr key={i} className="hover:bg-gray-50/50">
                                        <td className="px-8 py-5 text-sm font-bold text-primary">{item.title}</td>
                                        <td className="px-8 py-5 text-sm text-text-light">{item.author}</td>
                                        <td className="px-8 py-5 text-sm text-text-light">{item.price}</td>
                                        <td className="px-8 py-5">
                                            <button
                                                onClick={() => handleDelete("Book", item.id, item.title)}
                                                className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                                title="Delete book"
                                            >
                                                <svg className="w-5 h-5 text-gray-400 group-hover:text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {allBooks.length === 0 && <div className="p-10 text-center text-gray-400">No books found.</div>}
                    </div>
                </div>
            );
        }

        if (activeTab === 'Settings') {
            return (
                <div className="max-w-2xl mx-auto">
                    <div className="bg-white rounded-[32px] border border-gray-50 shadow-sm overflow-hidden p-8 space-y-8">
                        <div>
                            <h2 className="text-xl font-serif font-bold text-primary mb-2">Profile Settings</h2>
                            <p className="text-sm text-text-light">Update your admin profile and security credentials.</p>
                        </div>

                        <form onSubmit={handleProfileUpdate} className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Display Name</label>
                                <input name="name" placeholder="Administrator Name" className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" />
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <h3 className="text-sm font-bold text-primary mb-4">Change Password</h3>
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">New Password</label>
                                        <input type="password" name="newPassword" className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold uppercase tracking-widest text-gray-500">Confirm Password</label>
                                        <input type="password" name="confirmPassword" className="w-full px-4 py-3 bg-gray-50 rounded-xl border-transparent focus:bg-white focus:border-secondary border-2 transition-all outline-none" />
                                    </div>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 pt-4">
                                <button type="submit" disabled={isLoading} className="btn-primary px-8 py-3 text-sm flex items-center gap-2">
                                    {isLoading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            );
        }

        return null; // Fallback
    };

    // Delete handler
    const handleDelete = async (type: string, id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"? This action cannot be undone.`)) {
            return;
        }

        setIsLoading(true);
        try {
            let endpoint = "";
            if (type === "Magazine") endpoint = `/api/magazines/${id}`;
            else if (type === "Audio") endpoint = `/api/audio/${id}`;
            else if (type === "Book") endpoint = `/api/books/${id}`;

            const res = await fetch(endpoint, {
                method: "DELETE",
            });

            if (res.ok) {
                alert("Content deleted successfully");
                fetchDashboardData(); // Refresh the data
            } else {
                const data = await res.json();
                alert(data.error || "Failed to delete content");
            }
        } catch (error) {
            console.error("Delete error:", error);
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    // Add inside component
    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const newPassword = (form.elements.namedItem('newPassword') as HTMLInputElement).value;
        const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement).value;

        if (newPassword && newPassword !== confirmPassword) {
            alert("Passwords do not match");
            setIsLoading(false);
            return;
        }

        try {
            const res = await fetch('/api/admin/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, newPassword }),
            });

            if (res.ok) {
                alert("Profile updated successfully");
                form.reset();
            } else {
                alert("Failed to update profile");
            }
        } catch (err) {
            console.error(err);
            alert("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8fafc] flex">
            {/* Sidebar */}
            <aside className="w-72 bg-primary flex flex-col fixed h-full z-30">
                <div className="p-8">
                    <Link href="/" className="text-xl font-serif font-bold text-white tracking-tighter">
                        DEFENDER <span className="text-secondary">OF TRUTH</span>
                    </Link>
                    <div className="mt-2 text-[10px] uppercase tracking-widest text-gray-500 font-bold">Admin Panel</div>
                </div>

                <nav className="flex-grow px-4 space-y-2">
                    {sidebarLinks.map((link) => (
                        <button
                            key={link.name}
                            onClick={() => setActiveTab(link.name)}
                            className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-xl text-sm font-medium transition-all ${activeTab === link.name
                                ? 'bg-secondary text-primary shadow-lg shadow-secondary/10'
                                : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {link.icon}
                            {link.name}
                        </button>
                    ))}
                </nav>

                <div className="p-4 mt-auto">
                    <div className="bg-white/5 rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-primary font-bold">
                            AD
                        </div>
                        <div className="flex-grow">
                            <div className="text-xs font-bold text-white">Admin User</div>
                            <div className="text-[10px] text-gray-500">Super Admin</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="ml-72 flex-grow p-10">
                <header className="flex justify-between items-center mb-10">
                    <div>
                        <h1 className="text-3xl font-serif font-bold text-primary">{activeTab}</h1>
                        <p className="text-sm text-text-light">Manage your content and analytics.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button onClick={() => setIsUploadOpen(true)} className="btn-primary py-3 px-6 text-xs flex items-center gap-3">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                            Upload Content
                        </button>
                    </div>
                </header>

                {renderContent()}

                <UploadModal
                    isOpen={isUploadOpen}
                    onClose={() => setIsUploadOpen(false)}
                    onSuccess={fetchDashboardData}
                    defaultType={activeTab}
                />
            </main>
        </div>
    );
}
