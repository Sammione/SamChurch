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
