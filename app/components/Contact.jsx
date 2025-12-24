"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function Contact() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitted(false), 4000);
    };

    return (
        <section className="py-32 bg-[#050505] text-white">
            <div className="mx-auto max-w-6xl px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

                    <div className="space-y-8">
                        <div className="space-y-4">
                            <span className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.4em]">
                                Connectivity
                            </span>
                            <h2 className="text-6xl font-serif tracking-tighter">
                                Let's <span className="italic font-extralight text-neutral-500">talk.</span>
                            </h2>
                        </div>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-sm">
                            For wholesale inquiries, collaborations, or general questions,
                            please reach out through the portal.
                        </p>
                        <div className="pt-8 flex flex-col gap-4 text-xs font-mono uppercase tracking-widest text-neutral-600">
                            <p className="hover:text-amber-500 transition-colors cursor-pointer">hello@blackdrop.coffee</p>
                            <p>Monday — Friday</p>
                        </div>
                    </div>

                    <div className="relative">
                        {submitted ? (
                            <div className="h-100 flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                                <CheckCircle2 size={48} className="text-amber-500 mb-6 font-light" />
                                <h3 className="text-2xl font-serif italic mb-2">Message Received.</h3>
                                <p className="text-neutral-500 text-xs uppercase tracking-widest font-mono">We will respond shortly.</p>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-12">
                                <div className="space-y-8">
                                    <div className="group relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                            placeholder="Your Name"
                                            className="w-full bg-transparent border-b border-white/10 py-4 text-lg outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-700"
                                        />
                                    </div>

                                    <div className="group relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                            placeholder="Email Address"
                                            className="w-full bg-transparent border-b border-white/10 py-4 text-lg outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-700"
                                        />
                                    </div>

                                    <div className="group relative">
                                        <textarea
                                            name="message"
                                            value={form.message}
                                            onChange={handleChange}
                                            required
                                            rows={3}
                                            placeholder="Your Message"
                                            className="w-full bg-transparent border-b border-white/10 py-4 text-lg outline-none focus:border-amber-500 transition-colors placeholder:text-neutral-700 resize-none"
                                        />
                                    </div>
                                </div>
                                <button
                                    type="submit"
                                    className="relative flex items-center gap-4 py-2 text-[10px] font-mono uppercase tracking-[0.5em] text-white hover:text-amber-500 transition-colors duration-500 group"
                                >
                                    <span className="relative z-10">Send Messege</span>

                                    <ArrowRight
                                        size={14}
                                        className="relative z-10 transition-all duration-500 ease-out group-hover:translate-x-3 group-hover:text-amber-500"
                                    />

                                    <div className="absolute bottom-0 left-0 w-0 h-px bg-amber-500 transition-all duration-700 ease-in-out group-hover:w-full" />

                                    <div className="absolute bottom-0 left-0 w-full h-px bg-white/5" />
                                </button>
                            </form>
                        )}
                    </div>
                </div>

                <div className="mt-32 pt-12 border-t border-white/5 flex justify-between items-center text-[10px] font-mono text-neutral-800 uppercase tracking-[0.6em]">
                    <span>©2025 Reserve Archive</span>
                    <span className="hidden md:block">Quality Over Speed</span>
                </div>
            </div>
        </section>
    );
}