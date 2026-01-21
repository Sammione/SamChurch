"use client";

import { useState } from "react";
import Link from "next/link";
import Hero from "./components/Hero";
import ResourceCards from "./components/ResourceCards";
import LatestContent from "./components/LatestContent";

export default function Home() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Subscription failed");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Something went wrong");
    }
  };

  return (
    <div className="flex flex-col w-full">
      <Hero />
      <ResourceCards />

      {/* About / Doctrine Section */}
      <section className="py-24 bg-white border-y border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          {/* Logo Section with Extraordinary Design */}
          <div className="relative group">
            {/* Animated Background Circles */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="absolute w-72 h-72 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute w-96 h-96 bg-gradient-to-tr from-primary/10 to-secondary/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Logo Container */}
            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl transform group-hover:scale-105 transition-all duration-700 bg-gradient-to-br from-gray-50 to-white border-4 border-secondary/20">
              {/* Decorative Corner Accents */}
              <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-secondary rounded-tl-3xl"></div>
              <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-secondary rounded-br-3xl"></div>

              {/* Logo Image */}
              <div className="absolute inset-0 flex items-center justify-center p-8">
                <img
                  src="/defender-logo.png"
                  alt="Defender of Truth - Set For the Defence of the Gospel"
                  className="w-full h-full object-contain drop-shadow-2xl transform group-hover:rotate-3 transition-transform duration-700"
                />
              </div>

              {/* Animated Light Rays */}
              <div className="absolute inset-0 opacity-30">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent rotate-45 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-1 bg-gradient-to-r from-transparent via-secondary to-transparent -rotate-45 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
              </div>

              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-3xl ring-2 ring-secondary/50 ring-offset-4 ring-offset-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-primary text-white px-6 py-3 rounded-full shadow-xl border-4 border-white transform group-hover:scale-110 transition-transform duration-300">
              <p className="text-sm font-bold uppercase tracking-wider">Phil 1:17</p>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-3xl md:text-5xl font-serif font-bold leading-tight">
              A Foundation Built on <span className="text-secondary">Eternal Truth</span>
            </h2>
            <div className="space-y-4 text-text-light text-lg italic leading-relaxed font-light">
              <p>“Faith is built and hearts are aligned with God’s truth.”</p>
              <p>“Understanding grows through careful study of Scripture.”</p>
              <p>“Lives are transformed by the living Word of God.”</p>
            </div>
            <div className="pt-4">
              {/* Placeholder for Statement of Faith - could link to a new page in future */}
              <button className="btn-primary cursor-not-allowed opacity-80" disabled>Our Statement of Faith</button>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Content Section */}
      <section className="py-24 bg-gradient-to-b from-background to-white relative">
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Latest Content</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
            <p className="text-xl text-text-light max-w-2xl mx-auto font-light">
              Fresh resources across all categories to strengthen your faith
            </p>
          </div>

          <LatestContent />

          <div className="text-center mt-12">
            <div className="flex gap-4 justify-center">
              <Link href="/magazines" className="btn-outline inline-block px-8 py-4 border-2 shadow-sm hover:shadow-secondary/20">View Magazines</Link>
              <Link href="/audio" className="btn-outline inline-block px-8 py-4 border-2 shadow-sm hover:shadow-secondary/20">View Audio</Link>
              <Link href="/books" className="btn-outline inline-block px-8 py-4 border-2 shadow-sm hover:shadow-secondary/20">View Books</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Guiding Principles Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        {/* Decorative branding elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-secondary/50 to-transparent"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-secondary/[0.03] rounded-full blur-[120px]"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-white">Standing on the Sure Foundation of God’s Word</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
            <p className="text-xl text-white/70 max-w-2xl mx-auto font-light italic">
              “Set for the defence of the Gospel”
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                title: "Scriptural Authority",
                quote: "“Your word is a lamp to my feet and a light to my path.” — Psalm 119:105",
                icon: "📜"
              },
              {
                title: "Persistent Message",
                quote: "“The grass withers, the flower fades, but the word of our God stands forever.” — Isaiah 40:8",
                icon: "💡"
              },
              {
                title: "Sanctifying Truth",
                quote: "“Sanctify them by Your truth.” — John 17:17",
                icon: "⚖️"
              }
            ].map((item, i) => (
              <div key={i} className="group p-8 rounded-[32px] bg-white/5 border border-white/10 hover:bg-white/[0.08] hover:border-secondary/30 transition-all duration-500 shadow-2xl">
                <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center text-3xl mb-8 group-hover:scale-110 transition-transform duration-500">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-secondary mb-4">{item.title}</h3>
                <p className="text-white/80 leading-relaxed font-light italic relative">
                  <span className="absolute -left-4 -top-2 text-4xl text-secondary/20 font-serif">“</span>
                  {item.quote}
                  <span className="inline-block text-4xl text-secondary/20 font-serif translate-y-2 ml-1">”</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Mission & Vision Section */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Subtle Background Elements */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 space-y-4">
            <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-widest rounded-full">
              Our Mission & Vision
            </div>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-primary">
              Defender of Truth
            </h2>
            <p className="text-lg md:text-xl text-text-light font-medium tracking-wide">
              Proclaiming the Gospel • Edifying the Saints • Preparing Souls for Eternity
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 mb-20">
            {/* Vision Container */}
            <div className="space-y-8 p-10 bg-gray-50/50 rounded-[40px] border border-gray-100 hover:shadow-xl transition-shadow duration-500">
              <div className="space-y-4">
                <h3 className="text-3xl font-serif font-bold text-primary flex items-center gap-3">
                  <span className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center text-secondary text-xl font-bold italic">V</span>
                  Vision
                </h3>
                <p className="text-lg text-text-light leading-relaxed font-light">
                  We prayerfully desire that every resource on this platform will lead souls to obey the gospel of Jesus Christ and ultimately inherit eternal life.
                </p>
              </div>
              <blockquote className="p-8 bg-white rounded-3xl border-l-4 border-secondary shadow-sm">
                <p className="text-xl font-serif italic text-primary leading-relaxed">
                  “And this is life eternal, that they might know thee the only true God, and Jesus Christ, whom thou hast sent.”
                </p>
                <footer className="mt-4 text-sm font-bold text-secondary uppercase tracking-widest">— John 17:3</footer>
              </blockquote>
            </div>

            {/* Mission Container */}
            <div className="space-y-8 p-10 bg-primary/[0.02] rounded-[40px] border border-gray-100 hover:shadow-xl transition-shadow duration-500">
              <div className="space-y-4">
                <h3 className="text-3xl font-serif font-bold text-primary flex items-center gap-3">
                  <span className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl font-bold italic">M</span>
                  Mission
                </h3>
                <p className="text-lg text-text-light leading-relaxed font-light">
                  The Defender of Truth website is devoted to the propagation of the gospel of our Lord and Savior Jesus Christ and the edification of Christians through sound, scriptural teaching.
                </p>
              </div>
              <div className="text-sm text-text-light leading-relaxed space-y-4 bg-white/50 p-6 rounded-2xl italic border border-gray-50">
                <p>
                  Rooted in the legacy of the Defender of Truth Magazine—first published in 1967 as <span className="font-bold">Gospel Defender</span> by Ezekiel Afolabi Akinyemi (1932–2020)—this platform continues a long-standing commitment to defending the truth of God’s Word.
                </p>
                <p>
                  Though publication was paused in earlier years due to constraints, the magazine was revived as an e-magazine in January 2021, and its mission remains unchanged.
                </p>
              </div>
            </div>
          </div>

          {/* Access Items Section */}
          <div className="bg-primary text-white rounded-[40px] p-12 mb-20 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/10 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-700 group-hover:scale-110"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h3 className="text-3xl font-serif font-bold">Through this website, readers can access:</h3>
                <div className="space-y-4">
                  {[
                    "All editions of Defender of Truth since its relaunch",
                    "Bible-based articles and books",
                    "Audio and video sermons for teaching and exhortation"
                  ].map((item, i) => (
                    <div key={i} className="flex font-light items-center gap-4 text-lg text-gray-300">
                      <div className="w-2 h-2 bg-secondary rounded-full"></div>
                      {item}
                    </div>
                  ))}
                </div>
                <p className="text-gray-400 font-light italic text-sm border-t border-white/10 pt-4">
                  All materials are designed to teach, reprove, correct, and instruct in righteousness, so that believers may grow to spiritual maturity.
                </p>
              </div>

              <blockquote className="p-8 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
                <p className="text-xl font-serif italic leading-relaxed text-secondary/90">
                  “All scripture is given by inspiration of God, and is profitable for doctrine, for reproof, for correction, for instruction in righteousness.”
                </p>
                <footer className="mt-4 text-sm font-bold text-gray-400 uppercase tracking-widest">— 2 Timothy 3:16</footer>
              </blockquote>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 text-center">
            <div className="space-y-4 p-8">
              <div className="text-secondary text-4xl mb-2">✝</div>
              <h4 className="font-bold text-xl font-serif">Our Commitment</h4>
              <ul className="space-y-2 text-text-light text-sm font-light">
                <li>To preach Christ crucified (1 Cor 1:23)</li>
                <li>To contend earnestly for the faith (Jude 1:3)</li>
                <li>To equip believers for faithful living (Eph 4:11–13)</li>
              </ul>
            </div>
            <div className="md:col-span-2 flex items-center justify-center">
              <blockquote className="max-w-xl text-2xl md:text-3xl font-serif italic text-primary/80 border-x-2 border-secondary/20 px-8">
                “Go ye therefore, and teach all nations…”
                <footer className="block mt-2 text-sm font-bold text-secondary uppercase tracking-widest">— Matthew 28:19</footer>
              </blockquote>
            </div>
          </div>

          <div className="text-center space-y-8">
            <div className="text-2xl font-serif font-bold text-primary tracking-widest uppercase">
              Read • Learn • Obey the Gospel
            </div>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/magazines" className="btn-primary px-10 py-5 text-base flex items-center gap-3 group">
                Download Magazine
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
              </Link>
              <Link href="/books" className="btn-outline px-10 py-5 text-base border-2 hover:bg-gray-50 flex items-center gap-3">
                Explore Resources
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Ministry Impact Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Mission in Action</h2>
            <p className="text-xl text-text-light max-w-2xl mx-auto">
              Extending understanding of Scripture beyond borders
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🌍", title: "Global Presence", desc: "Reaching individuals and study groups across diverse regions" },
              { icon: "📖", title: "Faithful to Scripture", desc: "Content developed with careful attention to biblical consistency" },
              { icon: "🎓", title: "Teaching & Learning", desc: "Supporting structured study and spiritual education" },
              { icon: "💝", title: "Open Access", desc: "Providing resources freely for those seeking understanding" }
            ].map((item, i) => (
              <div key={i} className="text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 font-serif">{item.title}</h3>
                <p className="text-text-light text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter / CTA
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="max-w-3xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Join our community</h2>
          <p className="text-gray-400">Receive regular updates, magazines, and teachings directly in your inbox.</p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-6 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-secondary transition-colors text-white"
            />
            <button className="btn-primary whitespace-nowrap">Subscribe</button>
          </div>
          <p className="text-sm text-gray-500 pt-4">
            Join over 15,000 subscribers receiving weekly inspiration
          </p>
        </div>
      </section> */}
      {/* Newsletter / CTA */}
      <section className="py-24 bg-primary text-white overflow-hidden relative border-t border-white/5">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="max-w-3xl mx-auto px-4 text-center space-y-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white">Join our community</h2>
          <p className="text-gray-400">Receive regular updates, magazines, and teachings directly in your inbox.</p>

          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              required
              placeholder="Your email address"
              className="flex-grow px-6 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-secondary transition-colors text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
            />
            <button
              type="submit"
              className="btn-primary whitespace-nowrap disabled:opacity-70"
              disabled={status === "loading"}
            >
              {status === "loading" ? "Subscribing..." : "Subscribe"}
            </button>
          </form>

          {status === "success" && <p className="text-secondary font-bold animate-pulse">Successfully subscribed!</p>}
          {status === "error" && <p className="text-red-400 font-bold">{errorMessage}</p>}

          <p className="text-sm text-gray-500 pt-4">
            Join thousands of believers receiving sound doctrine weekly.
          </p>
        </div>
      </section>
    </div>
  );
}
