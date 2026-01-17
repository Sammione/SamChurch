export default function Footer() {
    return (
        <footer className="bg-primary text-white py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="space-y-4">
                        <h3 className="text-2xl font-serif font-bold text-white">
                            DEFENDER <span className="text-secondary">OF TRUTH </span>
                        </h3>
                        <p className="text-gray-400 max-w-xs text-sm leading-relaxed">
                            Expositing the Word that gives life and truth. Sound doctrine for a firm foundation in Christ.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-serif font-semibold text-secondary">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><a href="/magazines" className="hover:text-white transition-colors">Magazines</a></li>
                            <li><a href="/audio" className="hover:text-white transition-colors">Audio Teachings</a></li>
                            <li><a href="/books" className="hover:text-white transition-colors">Digital Books</a></li>
                            <li><a href="/giving" className="hover:text-white transition-colors">Support Our Ministry</a></li>
                        </ul>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-lg font-serif font-semibold text-secondary">Connect</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li>Email: contact@truthdefender.org</li>
                            <li>Follow us on Twitter</li>
                            <li>Listen on Spotify</li>
                        </ul>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-white/10 text-center text-xs text-gray-500 uppercase tracking-widest">
                    &copy; {new Date().getFullYear()} Truthdefender Ministries. All rights reserved.
                </div>
            </div>
        </footer>
    );
}
