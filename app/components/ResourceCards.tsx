const resources = [
    {
        title: "Magazines",
        description: "Read our regular publications filled with sound doctrine and inspired messages.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
        ),
        link: "/magazines",
        tag: "Publication"
    },
    {
        title: "Audio Teachings",
        description: "Listen to anointed teachings that provide spiritual nourishment and clarity.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
        ),
        link: "/audio",
        tag: "Media"
    },
    {
        title: "Digital Books",
        description: "Study in-depth biblical truths through our curated collection of books.",
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
            </svg>
        ),
        link: "/books",
        tag: "Study"
    }
];

export default function ResourceCards() {
    return (
        <section className="py-24 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Be nourished by the Word</h2>
                <p className="text-text-light max-w-2xl mx-auto text-lg leading-relaxed">
                    Through sound doctrine, publications, and teachings, believers are strengthened to walk in righteousness.
                </p>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                {resources.map((res, i) => (
                    <div key={i} className="resource-card flex flex-col items-start text-left">
                        <div className="w-12 h-12 bg-secondary/10 flex items-center justify-center rounded-xl text-secondary mb-6">
                            {res.icon}
                        </div>
                        <span className="text-[10px] uppercase tracking-widest text-secondary font-bold mb-2 ml-1">{res.tag}</span>
                        <h3 className="text-2xl font-serif font-bold mb-4">{res.title}</h3>
                        <p className="text-gray-600 mb-8 leading-relaxed text-sm">{res.description}</p>
                        <a href={res.link} className="mt-auto text-primary font-bold text-xs uppercase tracking-widest flex items-center gap-2 group hover:text-secondary transition-colors underline-offset-4 hover:underline">
                            Explore More
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
