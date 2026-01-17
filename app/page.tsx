"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import ResourceCards from "./components/ResourceCards";

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
          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1544427928-142ec2698301?q=80&w=2072&auto=format&fit=crop"
              alt="Scripture Study"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-primary/20"></div>
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
              <button className="btn-primary">Our Statement of Faith</button>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 text-center">
            {[
              { number: "500+", label: "Audio Messages" },
              { number: "120+", label: "Magazine Issues" },
              { number: "50+", label: "Published Books" },
              { number: "25K+", label: "Lives Impacted" }
            ].map((stat, i) => (
              <div key={i} className="space-y-2">
                <div className="text-4xl md:text-5xl font-bold font-serif text-secondary">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-300 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Latest Teachings Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">Latest Teachings</h2>
            <p className="text-xl text-text-light max-w-2xl mx-auto">
              Fresh insights and biblical exposition to strengthen your faith
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Power of Scripture in Daily Life",
                category: "Biblical Living",
                date: "January 10, 2026",
                image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=2070&auto=format&fit=crop",
                duration: "45 min"
              },
              {
                title: "Understanding God's Covenant Promises",
                category: "Theology",
                date: "January 8, 2026",
                image: "https://images.unsplash.com/photo-1501084291732-13b1ba8f0ebc?q=80&w=2069&auto=format&fit=crop",
                duration: "52 min"
              },
              {
                title: "Walking in Truth and Grace",
                category: "Christian Life",
                date: "January 5, 2026",
                image: "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?q=80&w=2071&auto=format&fit=crop",
                duration: "38 min"
              }
            ].map((teaching, i) => (
              <div key={i} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img src={teaching.image} alt={teaching.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-white text-xs font-semibold rounded-full">
                    {teaching.category}
                  </div>
                  <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs rounded-full">
                    {teaching.duration}
                  </div>
                </div>
                <div className="p-6 space-y-3">
                  <p className="text-sm text-text-light">{teaching.date}</p>
                  <h3 className="text-xl font-serif font-bold group-hover:text-secondary transition-colors">{teaching.title}</h3>
                  <button className="text-secondary font-semibold text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Listen Now
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-outline">View All Teachings</button>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-24 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { number: "500+", label: "Audio Messages" },
              { number: "120+", label: "Magazine Issues" },
              { number: "50+", label: "Published Books" },
              { number: "25K+", label: "Lives Impacted" }
            ].map((stat, i) => (
              <div key={i} className="text-center space-y-2">
                <div className="text-4xl md:text-5xl font-bold font-serif text-secondary">{stat.number}</div>
                <div className="text-sm md:text-base text-gray-300 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">A Commitment to the Word</h2>
            <p className="text-xl text-text-light max-w-2xl mx-auto">
              Dedicated to teaching Scripture with clarity and reverence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "Our teachings are grounded in Scripture, approached with careful study and respect for the Word of God, without personal opinions or modern distortions.",
              },
              {
                quote: "The aim is clarity and comprehension, helping believers understand what the Bible says, why it says it, and how it applies, rather than relying on emotional experiences.",
              },
              {
                quote: "All materials are developed with doctrinal consistency, ensuring alignment with biblical principles and faithful interpretation of Scripture.",
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-8 space-y-6 border border-gray-100">
                <div className="text-secondary text-5xl font-serif leading-none">"</div>
                <p className="text-text-light italic leading-relaxed">{testimonial.quote}</p>
                <div className="pt-4 border-t border-gray-200">
                  {/* <p className="font-semibold text-text">{testimonial.author}</p>
                  <p className="text-sm text-text-light">{testimonial.role}</p> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Magazine Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-block px-4 py-1.5 bg-secondary/10 text-secondary text-xs font-semibold uppercase tracking-widest rounded-full">
                Latest Issue
              </div>
              <h2 className="text-4xl md:text-5xl font-serif font-bold leading-tight">
              Defender of Truth Magazine <span className="text-secondary">2026</span>
              </h2>
              <p className="text-lg text-text-light leading-relaxed">
                This edition is dedicated to thoughtful examination of Scripture, presenting structured studies and reflections designed to strengthen understanding and encourage discernment through the Word of God.
              </p>
              <ul className="space-y-4">
                {[
                  "Understanding Biblical Prophecy in Modern Times",
                  "The Character of God: A Deep Dive",
                  "Practical Steps to Stronger Faith",
                  "Q&A with Leading Bible Scholars"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <svg className="w-6 h-6 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-text-light">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="flex gap-4">
                <button className="btn-primary">Read Now</button>
                <button className="btn-outline">Download PDF</button>
              </div>
            </div>

            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img
                  src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2028&auto=format&fit=crop"
                  alt="Magazine Cover"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/60 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl"></div>
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
