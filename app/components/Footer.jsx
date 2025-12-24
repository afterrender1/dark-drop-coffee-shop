import Image from "next/image";
import { ArrowRight, Instagram, Twitter, Youtube, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    const navLinks = ["Shop", "Coffee", "About", "Contact"];

    return (
        <footer className="bg-black text-white border-t border-white/10 selection:bg-amber-500/30">
            <div className="mx-auto max-w-7xl px-6 pt-24 pb-12">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">

                    <div className="lg:col-span-5 space-y-8">
                        <Link href="/" className="flex items-center gap-4 group">
                            <div className=" relative overflow-hidden ">
                                <Image
                                    src="/logos/b-logo.png"
                                    alt="Black Drop"
                                    height={200}
                                    width={200}
                                    priority
                                    className="object-contain p-2 "
                                />
                            </div>

                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-sm font-light">
                            Architecting a new standard for the modern ritual. Every bean is a data point; every roast is a protocol.
                        </p>
                    </div>

                    <div className="lg:col-span-7 w-full">
                        <div className="space-y-4 max-w-md lg:ml-auto">
                            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.5em]">The Newsletter Protocol</span>
                            <form className="relative group">
                                <input
                                    type="email"
                                    placeholder="IDENTITY@EMAIL.COM"
                                    className="w-full bg-transparent border-b border-white/20 py-4 font-mono text-sm tracking-widest focus:outline-none focus:border-amber-500 transition-all placeholder:text-neutral-400 uppercase text-white"
                                />
                                <button className="absolute right-0 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-amber-500 transition-all flex items-center gap-2 group/btn">
                                    <span className="text-[9px] font-mono opacity-0 group-hover/btn:opacity-100 transition-opacity">CONNECT</span>
                                    <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </form>
                            <p className="text-[9px] text-neutral-700 uppercase tracking-tighter font-mono">
                                * Secure extraction logs delivered bi-weekly.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-x-16 gap-y-8 py-12 border-y border-white/5 mb-12">
                    {navLinks.map((link) => (
                        <Link
                            key={link}
                            href={`/${link.toLowerCase()}`}
                            className="text-lg font-serif italic tracking-tight text-neutral-400 hover:text-white transition-all duration-500 hover:translate-x-2 flex items-center gap-2 group"
                        >
                            <span className="text-amber-500/40 font-mono text-[10px] group-hover:text-amber-500 transition-colors">0{navLinks.indexOf(link) + 1}</span>
                            {link}
                        </Link>
                    ))}
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center gap-8">

                    <div className="flex items-center gap-6 order-2 md:order-1">
                        <div className="flex items-center gap-2">
                            <ShieldCheck size={12} className="text-amber-500/50" />
                            <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-[0.2em]">
                                © {currentYear} BLACK DROP COFFEE // ALL RIGHTS RESERVED
                            </span>
                        </div>
                        <div className="hidden lg:block h-3 w-px bg-white/10" />
                        <span className="hidden lg:block text-[9px] font-mono text-neutral-400 uppercase tracking-widest">
                            Afterrender_Ref_v4.0
                        </span>
                    </div>

                    <div className="flex items-center gap-8 order-1 md:order-2">
                        {[
                            { icon: Instagram, label: "INSTA" },
                            { icon: Twitter, label: "X_LOG" },
                            { icon: Youtube, label: "YTBE" }
                        ].map((social) => (
                            <Link key={social.label} href="#" className="flex items-center gap-2 group">
                                <social.icon size={14} className="text-neutral-700 group-hover:text-amber-500 transition-colors" />
                                <span className="text-[9px] font-mono text-neutral-400 group-hover:text-neutral-400 transition-colors tracking-tighter uppercase">
                                    {social.label}
                                </span>
                            </Link>
                        ))}
                    </div>

                </div>
            </div>
        </footer>
    );
}   