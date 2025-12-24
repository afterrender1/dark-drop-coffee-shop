import { Coffee, Leaf, Flame, Package, ArrowRight } from "lucide-react";

export default function OurProcess() {
    const steps = [
        { id: "01", title: "Sourcing", tag: "Soil", icon: Leaf, detail: "Direct-Trade Protocol" },
        { id: "02", title: "Roasting", tag: "Fire", icon: Flame, detail: "12kg Micro-Batches" },
        { id: "03", title: "Cupping", tag: "Soul", icon: Coffee, detail: "Score 86+ Mandate" },
        { id: "04", title: "Shipping", tag: "Flow", icon: Package, detail: "48hr Freshness Chain" },
    ];

    return (
        <section id="process" className="py-24 bg-[#030303] text-white">
            <div className="mx-auto max-w-7xl px-6">

                {/* LEFT PANEL */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

                    <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-8">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                                <span className="text-[10px] uppercase tracking-[0.5em] text-neutral-500 font-bold">
                                    The Cycle
                                </span>
                            </div>
                            <h2 className="text-6xl font-serif tracking-tighter leading-tight">
                                Our <br />
                                <span className="italic font-extralight text-neutral-500">Process.</span>
                            </h2>
                        </div>
                        <p className="text-neutral-500 text-sm font-light leading-relaxed max-w-70">
                            A precise chronological study of coffee science, from origin to extraction.
                        </p>
                        <div className="pt-10">
                            <div className="h-px w-20 bg-amber-500/50" />
                        </div>
                    </div>

                    {/* RIGHT PANEL */}
                    <div className="lg:col-span-8 border-t border-white/10">
                        {steps.map((step) => {
                            const Icon = step.icon;
                            return (
                                <div
                                    key={step.id}
                                    className="group relative border-b border-white/5 py-10 transition-all duration-500 hover:bg-white/1 cursor-pointer"
                                >
                                    <div className="flex items-center justify-between relative z-10">

                                        {/* LEFT SIDE: ID & Title */}
                                        <div className="flex items-center gap-10">
                                            <span className="font-mono text-xs text-neutral-700 group-hover:text-amber-500 transition-colors">
                                                {step.id}
                                            </span>
                                            <div>
                                                <h3 className="text-3xl font-serif tracking-tight transition-all duration-500 group-hover:translate-x-2">
                                                    {step.title}
                                                </h3>
                                                <span className="text-[9px] uppercase tracking-widest text-neutral-600 group-hover:text-amber-500/60 transition-colors">
                                                    {step.detail}
                                                </span>
                                            </div>
                                        </div>

                                        {/* RIGHT SIDE: Icon & Tag */}
                                        <div className="flex items-center gap-12">
                                            <div className="hidden md:flex flex-col text-right">
                                                <span className="text-[9px] uppercase tracking-widest text-neutral-800 font-bold group-hover:text-neutral-500">
                                                    Element
                                                </span>
                                                <span className="text-sm font-serif italic text-neutral-500">{step.tag}</span>
                                            </div>
                                            <div className="h-12 w-12 flex items-center justify-center border border-white/5 rounded-full group-hover:border-amber-500/30 transition-all duration-700">
                                                <Icon size={20} strokeWidth={1} className="text-neutral-700 group-hover:text-amber-500" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress underline */}
                                    <div className="absolute bottom-0 left-0 h-px w-0 bg-amber-500 transition-all duration-700 group-hover:w-full" />
                                </div>
                            );
                        })}

                        {/* Archive Footer */}
                        <div className="pt-12 flex justify-between items-center opacity-20 hover:opacity-100 transition-opacity">
                            <span className="text-[9px] font-mono tracking-widest uppercase">Archive // 2025</span>
                            <ArrowRight size={14} className="text-amber-500" />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}
