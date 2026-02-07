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
                <p className="text-base text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light text-justify">
                    The Defender of Truth website is devoted to the propagation of the gospel of our Lord and Savior Jesus Christ. It is an offshoot of the Defender of Truth magazine which was first published in 1967 under the name Gospel Defender by Ezekiel Afolabi Akinyemi (1932-2020) but was rested in 1973 due to funding constraints. The magazine was revived with the name Defender of Truth under the founding editor in 1981 and was published until it was rested in 1989.
                    <br /><br />
                    The magazine which was resuscitated as an e-magazine in January 2021 is devoted to spreading the gospel and edifying Christians. This website will enable readers to download and read all editions of the magazine since its relaunch in January 2021. It also has books, articles, audio, and video sermons that will educate and edify all who make use of the website.
                    <br /><br />
                    We hope that the resources on this website will lead you to obey the gospel of Jesus Christ and inherit eternal life.
                </p>
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
