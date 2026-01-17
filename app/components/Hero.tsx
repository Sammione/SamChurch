export default function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-primary">
            {/* Background Pattern/Overlay */}
            <div className="absolute inset-0 opacity-20 bg-[url('https://images.unsplash.com/photo-1438032005730-c779502df39b?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/50 to-primary"></div>

            <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-secondary uppercase border border-secondary/30 rounded-full bg-secondary/10">
                    The Word of Truth
                </span>
                <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8 leading-[1.1]">
                    The Word that <span className="text-secondary italic">gives life</span> and truth
                </h1>
                <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed font-light">
                    “The entrance of Your words gives light; it gives understanding to the simple.”
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="btn-primary flex items-center justify-center gap-2 group">
                        Explore Audio
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                    <button className="btn-outline">
                        Browse Books
                    </button>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-50">
                <svg className="w-6 h-6 text-white" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                    <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
                </svg>
            </div>
        </section>
    );
}
