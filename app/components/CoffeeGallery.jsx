import Image from "next/image";

export default function CoffeeGallery() {
    const images = [
        {
            src: "/images/gallery/reserve.png",
            title: "Sumatra Gayo Reserve",
            meta: "Origin: Aceh // Process: Wet-Hulled // Score: 88.5",
            aspect: "aspect-video",
        },
        {
            src: "/images/gallery/ethopia.png",

            title: "Ethiopia Yirgacheffe",
            meta: "Alt: 1,800m // Profile: Floral & Citric // Batch: 02",
            aspect: "aspect-[4/5]",
        },
        {
            src: "/images/gallery/roast.png",

            title: "The Molecular Roast",
            meta: "Temp: 212°C // Time: 11:45 // Precision Profiling",
            aspect: "aspect-square",
        },
        {
            src: "/images/gallery/final.png",

            title: "Final Extraction",
            meta: "Ratio: 1:16 // Dose: 18.5g // Temp: 93°C",
            aspect: "aspect-video",
        },
    ];

    return (
        <section className="py-40 bg-black text-white">
            <div className="mx-auto max-w-7xl px-6">

                {/* Header: Pure Architectural Alignment */}
                <div className="flex flex-col md:flex-row justify-between items-baseline mb-32 border-b border-white/10 pb-12">
                    <div className="space-y-4">
                        <span className="text-amber-500 font-mono text-[10px] uppercase tracking-[0.6em] block">
                            Technical Documentation
                        </span>
                        <h2 className="text-5xl md:text-7xl font-serif tracking-tighter leading-none lowercase">
                            the <span className="italic font-extralight text-neutral-500">visual record.</span>
                        </h2>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-600 mt-4 md:mt-0">
                        Archive // Vol. 2025
                    </span>
                </div>

                {/* Journal Stack: The 4 Critical Points */}
                <div className="space-y-40">
                    {images.map((item, idx) => (
                        <div key={idx} className="grid grid-cols-1 lg:grid-cols-12 gap-12 group items-center">

                            {/* Left: Metadata - High Precision */}
                            <div className="lg:col-span-3 space-y-6 pt-2">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-xs text-amber-500">Ref_0{idx + 1}</span>
                                    <div className="h-px w-8 bg-white/10 group-hover:w-16 group-hover:bg-amber-500 transition-all duration-700" />
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-600 font-black">Data Specifications</p>
                                    <p className="font-mono text-[11px] text-neutral-400 uppercase tracking-tighter leading-relaxed">
                                        {item.meta}
                                    </p>
                                </div>
                            </div>

                            {/* Middle: Image - The Cinematic Frame */}
                            <div className="lg:col-span-6">
                                <div className={`relative w-full ${item.aspect} overflow-hidden bg-[#050505] border border-white/5`}>
                                    <Image
                                        src={`${item.src}`}
                                        alt={item.title}
                                        fill
                                        className="object-cover grayscale transition-all duration-[1.2s] group-hover:grayscale-0 group-hover:scale-105"
                                    />
                                    {/* Digital Texture Overlay */}
                                    <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.15)_50%)] bg-size-[100%_4px] pointer-events-none opacity-20" />
                                </div>
                            </div>

                            {/* Right: Title - Minimalist Signature */}
                            <div className="lg:col-span-3 flex flex-col lg:items-end justify-center lg:text-right">
                                <h3 className="text-3xl md:text-5xl font-serif italic tracking-tight text-neutral-200 group-hover:text-amber-500 transition-all duration-500 leading-tight">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Closing: Status Indicator */}
                <div className="mt-64 flex justify-between items-center opacity-20 hover:opacity-100 transition-opacity duration-1000">
                    <div className="h-px grow bg-white/10" />
                    <div className="px-12 flex flex-col items-center gap-4">
                        <div className="h-1 w-1 bg-amber-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(245,158,11,1)]" />
                        <span className="font-mono text-[9px] uppercase tracking-[1em] whitespace-nowrap">Verified Protocol</span>
                    </div>
                    <div className="h-px grow bg-white/10" />
                </div>
            </div>
        </section>
    );
}