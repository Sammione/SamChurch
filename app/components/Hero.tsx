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
                    Set for the <span className="text-secondary italic">Defense of the Gospel</span>
                </h1>
                <div className="mt-12 bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 text-left shadow-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div className="space-y-6">
                            <h3 className="text-2xl font-serif font-bold text-white mb-4 border-l-4 border-secondary pl-4 relative">
                                A Legacy of Truth
                                <span className="absolute -left-[5px] -bottom-[1px] w-1 h-3/4 bg-gradient-to-t from-transparent to-secondary opacity-50"></span>
                            </h3>
                            <p className="text-gray-300 leading-relaxed font-light text-sm md:text-base">
                                The Defender of Truth website is devoted to the propagation of the gospel of our Lord and Savior Jesus Christ. Rooted in history, it serves as the digital offshoot of the <span className="text-secondary font-medium">Defender of Truth magazine</span>.
                            </p>

                            <div className="relative pl-6 border-l border-white/10 space-y-6 pt-2">
                                <div className="relative group">
                                    <span className="absolute -left-[29px] top-1.5 w-3 h-3 bg-secondary rounded-full border-2 border-primary group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(var(--secondary-rgb),0.5)]"></span>
                                    <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors"><strong className="text-white block mb-1">1967</strong> First published as <em className="text-secondary/80">Gospel Defender</em> by Ezekiel Afolabi Akinyemi (1932-2020).</p>
                                </div>
                                <div className="relative group">
                                    <span className="absolute -left-[29px] top-1.5 w-3 h-3 bg-secondary rounded-full border-2 border-primary group-hover:scale-125 transition-transform duration-300 shadow-[0_0_10px_rgba(var(--secondary-rgb),0.5)]"></span>
                                    <p className="text-sm text-gray-400 group-hover:text-gray-200 transition-colors"><strong className="text-white block mb-1">1981</strong> Revived as <em className="text-secondary/80">Defender of Truth</em> under the founding editor until 1989.</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6 relative">
                            {/* Decorative background element for the second column */}
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>

                            <h3 className="text-2xl font-serif font-bold text-white mb-4 border-l-4 border-secondary pl-4">
                                Modern Mission
                            </h3>
                            <div className="space-y-4 text-gray-300 font-light text-sm md:text-base leading-relaxed">
                                <p>
                                    Resuscitated as an e-magazine in <strong className="text-white">January 2021</strong>, we are devoted to spreading the gospel and edifying Christians.
                                </p>
                                <p>
                                    This website enables readers to download and read all editions since its relaunch. It also hosts <span className="text-white font-normal">books, articles, audio, and video sermons</span> designed to educate and edify.
                                </p>
                                <div className="p-4 bg-secondary/10 rounded-xl border border-secondary/20 mt-6 relative overflow-hidden group">
                                    <div className="absolute inset-0 bg-secondary/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                    <p className="text-white italic font-serif relative z-10 text-center">
                                        "Our prayer is that these resources will lead you to obey the gospel of Jesus Christ and inherit eternal life."
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
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
