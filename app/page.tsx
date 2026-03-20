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
      <section className="py-12 bg-white border-y border-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Logo Section - Compacted */}
          <div className="relative group max-w-xs mx-auto md:max-w-none">
            {/* Animated Background Circles - Scaled down */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="absolute w-40 h-40 bg-gradient-to-br from-secondary/15 to-primary/15 rounded-full blur-2xl animate-pulse"></div>
            </div>

            {/* Main Logo Container - Much Smaller */}
            <div className="relative aspect-square w-48 md:w-56 mx-auto rounded-3xl overflow-hidden shadow-xl transform group-hover:scale-105 transition-all duration-700 bg-gradient-to-br from-gray-50 to-white border-2 border-secondary/10">
              <div className="absolute inset-0 flex items-center justify-center p-6">
                <img
                  src="/defender-logo.png"
                  alt="Logo"
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>

              {/* Glowing Border Effect */}
              <div className="absolute inset-0 rounded-3xl ring-1 ring-secondary/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            {/* Floating Badge - Smaller */}
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1.5 rounded-full shadow-lg border-2 border-white">
              <p className="text-[10px] font-bold uppercase tracking-widest">Phil 1:17</p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-3 text-text-light text-base italic leading-relaxed font-light">
              <p>
                "For I am not ashamed of the gospel of Christ, for it is the power of God to salvation for everyone who believes, for the Jew first and also for the Greek. For in it the righteousness of God is revealed from faith to faith; as it is written, &ldquo;The just shall live by faith.&rdquo;"
              </p>
              <p className="not-italic font-bold text-secondary text-sm">— Romans 1:16-17</p>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Content Section - Compacted */}
      <section className="py-12 bg-gradient-to-b from-background to-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-10 space-y-2">
            <h2 className="text-2xl md:text-3xl font-serif font-bold">Latest Content</h2>
            <div className="w-16 h-1 bg-secondary mx-auto rounded-full"></div>
            <p className="text-sm text-text-light max-w-2xl mx-auto font-light">
              Fresh resources to strengthen your faith
            </p>
          </div>

          <LatestContent />

          <div className="text-center mt-8">
            <div className="flex gap-3 justify-center">
              <Link href="/magazines" className="btn-outline inline-block px-6 py-2.5 text-xs border-2 shadow-sm">Magazines</Link>
              <Link href="/audio" className="btn-outline inline-block px-6 py-2.5 text-xs border-2 shadow-sm">Audio</Link>
              <Link href="/books" className="btn-outline inline-block px-6 py-2.5 text-xs border-2 shadow-sm">Books</Link>
            </div>
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
            Join thousands of believers receiving sound doctrine.
          </p>
        </div>
      </section>
    </div>
  );
}
