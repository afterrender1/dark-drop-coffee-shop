import { Coffee, Heart, Truck, Shield, MoveRight } from "lucide-react";

export default function WhyChooseUs() {
    const features = [
        {
            id: "01",
            title: "Ethical Sourcing",
            label: "Direct Trade",
            description:
                "We work directly with farmers to ensure fair trade practices and sustainable coffee production.",
            icon: Heart,
        },
        {
            id: "02",
            title: "Precision Roasting",
            label: "Small-Batch Expertise",
            description:
                "Every batch is roasted with precision to bring out unique flavors, aroma, and texture.",
            icon: Coffee,
        },
        {
            id: "03",
            title: "Fast Delivery",
            label: "Fresh to Doorstep",
            description:
                "Our vacuum-sealed coffee is delivered within 48 hours of roasting to ensure peak freshness.",
            icon: Truck,
        },
        {
            id: "04",
            title: "Quality Guarantee",
            label: "Specialty Grade",
            description:
                "We only ship coffees that meet our strict quality standards — if it doesn’t meet them, it won’t leave our roastery.",
            icon: Shield,
        },
    ];

    return (
        <section className="py-32 bg-[#020202] text-white ">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-24 border-b border-white/10 pb-12">
                    <div className="max-w-2xl">
                        <span className="text-amber-500 font-mono text-xs uppercase tracking-[0.5em] font-bold mb-4 block">
                            Our Core Principles
                        </span>
                        <h2 className="text-6xl md:text-8xl font-serif tracking-tight leading-none text-neutral-100">
                            Why <span className="italic text-neutral-500">Choose Us</span>
                        </h2>
                    </div>
                    <p className="max-w-[320px] text-neutral-400 text-base font-light leading-relaxed mt-8 md:mt-0">
                        From ethically sourced beans to precision roasting, we craft coffee experiences worth savoring.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5 border border-white/5">
                    {features.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div
                                key={item.id}
                                className="group relative cursor-default bg-[#050505] p-10 flex flex-col justify-between transition-all duration-500 hover:bg-[#080808]"
                            >
                                <div className="flex justify-between items-center mb-12">
                                    <span className="font-mono text-sm text-neutral-600 group-hover:text-amber-500 transition-colors">
                                        {item.id}
                                    </span>
                                    <div className="h-10 w-10 flex items-center justify-center rounded-full bg-neutral-900 border border-white/10 group-hover:border-amber-500/50">
                                        <Icon size={18} strokeWidth={1.5} className="text-amber-500" />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div>
                                        <span className="text-[10px] uppercase tracking-[0.3em] text-neutral-500 font-bold mb-2 block">
                                            {item.label}
                                        </span>
                                        <h3 className="text-3xl font-serif tracking-tight text-neutral-100 group-hover:text-amber-500 transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="text-[15px] text-neutral-400 font-light leading-[1.7] group-hover:text-neutral-200 transition-colors">
                                        {item.description}
                                    </p>
                                </div>

                                <div className="mt-12 flex items-center gap-3 pt-6 border-t border-white/5 opacity-40 group-hover:opacity-100 transition-all">
                                    <span className="text-[10px] uppercase tracking-widest font-bold">Learn More</span>
                                    <MoveRight size={14} className="text-amber-500 group-hover:translate-x-2 transition-transform" />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
