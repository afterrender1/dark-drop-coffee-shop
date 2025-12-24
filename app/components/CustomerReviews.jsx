import { Star, ArrowRight } from "lucide-react";
import Image from "next/image";

export default function CustomerReviews() {
    const reviews = [
        {
            id: "01",
            name: "Emily R.",
            status: "Verified Connoisseur",
            text: "The Sumatra Gayo Dark Roast is a masterclass in clarity. Rich, smooth, and precisely what the morning ritual requires.",
            image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: "02",
            name: "James L.",
            status: "Collector",
            text: "Exceptional freshness. The precision roasting method isn't just marketing—you can taste the thermal stability in every cup.",
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=800",
        },
        {
            id: "03",
            name: "Sophia M.",
            status: "Daily Ritualist",
            text: "Every cup feels premium. The aroma and depth of body are unparalleled in the current specialty market. Truly elite.",
            image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&q=80&w=800",
        },
    ];

    return (
        <section className="py-40 bg-[#000000] text-white">
            <div className="mx-auto max-w-7xl px-6">

                <div className="flex flex-col mb-32 space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="h-px] w-12 bg-amber-600" />
                        <span className="text-[10px] uppercase tracking-[0.8em] text-amber-600 font-bold">Sentiment</span>
                    </div>
                    <h2 className="text-7xl md:text-[120px] font-serif tracking-tighter leading-[0.85] lowercase">
                        The <span className="italic font-extralight opacity-40">Voices.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {reviews.map((item) => (
                        <div
                            key={item.id}
                            className="group relative flex flex-col justify-between p-12 aspect-3/4 bg-[#050505] border border-white/5 overflow-hidden transition-all duration-700 hover:border-amber-500/20"
                        >
                            <div className="absolute inset-0 z-0">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    fill
                                    className="object-cover opacity-20 grayscale transition-all duration-1000 scale-110 group-hover:scale-100 group-hover:opacity-40 group-hover:grayscale-0"
                                />
                                <div className="absolute inset-0 bg-linear-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-700" />
                            </div>

                            <div className="relative z-10 flex justify-between items-start">
                                <span className="font-mono text-[10px] text-neutral-600 group-hover:text-amber-500 transition-colors">
                  // {item.id}
                                </span>
                                <div className="flex gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} size={8} className="fill-amber-500 text-amber-500" />
                                    ))}
                                </div>
                            </div>

                            <div className="relative z-10 space-y-6">
                                <p className="text-3xl font-serif italic tracking-tight leading-snug text-neutral-200 group-hover:text-white transition-all duration-700">
                                    “{item.text}”
                                </p>
                            </div>

                            <div className="relative z-10 space-y-4">
                                <div className="h-px w-full bg-white/10 group-hover:bg-amber-500/40 transition-all" />
                                <div className="flex justify-between items-end">
                                    <div className="space-y-1">
                                        <p className="text-sm font-bold tracking-widest uppercase text-white">{item.name}</p>
                                        <p className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 group-hover:text-amber-500/80 transition-colors">{item.status}</p>
                                    </div>
                                    <ArrowRight size={16} className="text-neutral-700 group-hover:text-amber-500 transition-all group-hover:translate-x-2" />
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}