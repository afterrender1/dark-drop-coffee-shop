"use client"
import Image from "next/image";
import { featuredCoffees } from "../data/featuredCoffees";
import { Raleway } from "next/font/google";

const raleway = Raleway({
    subsets: ["latin"],
    weight: ["400", "500"],
})

export default function FeaturedCoffee() {
    return (
        <section id="shop" className="py-32 bg-[#020202] text-white selection:bg-amber-500/30">
            <div className="mx-auto max-w-7xl px-6">

                <div className="flex flex-col mb-16 space-y-4">
                    <div className="flex items-center gap-4">
                        <span className="h-0.5 w-16 bg-[#c89365]" />
                        <span className="text-[11px] uppercase tracking-[0.7em] text-[#c89365] font-black">
                            Featured
                        </span>
                    </div>
                    <h2 className="text-7xl md:text-9xl font-serif tracking-tighter leading-none">
                        Black <span className="italic font-thin opacity-40">Edition.</span>
                    </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-32">
                    {featuredCoffees.map((coffee) => (
                        <div key={coffee.id} className="group relative">

                            <div className="relative aspect-square w-full overflow-hidden bg-[#080808] border border-white/5 shadow-2xl">

                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(50,50,50,1)_0%,rgba(8,8,8,1)_80%)] opacity-60 z-0" />

                                <Image
                                    src={coffee.image}
                                    alt={coffee.name}
                                    fill
                                    className="object-contain p-4 z-10 transition-transform duration-[1.5s] cubic-bezier(0.22, 1, 0.36, 1) group-hover:scale-105"
                                    priority
                                />

                             
                            </div>

                            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                                <div className="space-y-2">
                                    <h3 className="text-4xl font-serif tracking-tight group-hover:text-[#c89365] transition-colors duration-500">
                                        {coffee.name}
                                    </h3>
                                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#c89365] font-bold">
                                        Origin: {coffee.origin || "Exclusive Blend"}
                                    </p>
                                </div>

                                <div className="md:text-right space-y-4">
                                    <p className="text-sm text-neutral-500 font-light leading-relaxed line-clamp-3">
                                        {coffee.description}
                                    </p>
                                    <div className="flex md:justify-end gap-4 border-t border-white/10 pt-4">
                                        {["Velvet", "Dark Fruit", "Spice"].map((tag) => (
                                            <span key={tag} className="text-[9px] uppercase tracking-widest text-neutral-400 italic">
                                                # {tag}
                                            </span>
                                        ))}
                                    </div>
                                       <div className="flex justify-center   transition-all duration-500">
                                    <button onClick={() => {

                                        console.log(

                                            coffee.id

                                        );

                                    }} className={`cursor-pointer px-12 py-5 bg-white text-black hover:text-white text-[11px] font-black uppercase tracking-[0.3em] hover:bg-[#c89365] transition-colors ${raleway.className}`}>
                                        Add To Cart  — ${coffee.price}
                                    </button>
                                </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}