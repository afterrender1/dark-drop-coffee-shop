"use client";

import { useState } from "react";
import Image from "next/image";
import { featuredCoffees } from "../data/featuredCoffees";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { addToCart } from "../lib/features/cart/cartSlice";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-inter",
});

export default function FeaturedCoffee() {
  const dispatch = useDispatch();
  const [lastAddedId, setLastAddedId] = useState(null);

  const handleAddToCart = (coffee) => {
    dispatch(addToCart(coffee));
    setLastAddedId(coffee.id);

    // Reset the individual button state after 2 seconds
    setTimeout(() => {
      setLastAddedId(null);
    }, 2000);
  };

  return (
    <section
      id="shop"
      className="py-32 bg-[#020202] text-white selection:bg-amber-500/30"
    >
      {/* GLOBAL TOAST NOTIFICATION */}
      <AnimatePresence>
        {lastAddedId && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-1000 w-[90%] max-w-100"
          >
            <div className="bg-white text-black p-4 shadow-2xl flex items-center gap-3 border-l-4 border-green-500">
              <div className="bg-green-100 p-1 rounded-full">
                <Check size={16} className="text-green-600" strokeWidth={3} />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest leading-none">
                  Selection Logged
                </p>
                <p className="text-xs font-serif italic text-neutral-500">
                  Added to your collection
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

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
          {featuredCoffees.map((coffee) => {
            const isAdded = lastAddedId === coffee.id;

            return (
              <div key={coffee.id} className="group relative">
                <Link href={`/product/${coffee.id}`} className="block">
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
                </Link>

                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  <div className={`space-y-2 ${inter.className}`}>
                    <h3 className="text-4xl font-serif tracking-tight group-hover:text-[#c89365] transition-colors duration-500">
                      {coffee.name}
                    </h3>
                    <p className="text-[10px] uppercase tracking-[0.4em] text-[#c89365] font-bold">
                      Origin: {coffee.origin || "Exclusive Blend"}
                    </p>
                  </div>

                  <div className={`md:text-right space-y-4 ${inter.className}`}>
                    <p className="text-sm text-neutral-500 font-light leading-relaxed line-clamp-3">
                      {coffee.description}
                    </p>
                    <div className="flex md:justify-end gap-4 border-t border-white/10 pt-4">
                      {["Velvet", "Dark Fruit", "Spice"].map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] uppercase tracking-widest text-neutral-400 italic"
                        >
                          # {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-center md:justify-end transition-all duration-500">
                      <button
                        onClick={() => handleAddToCart(coffee)}
                        disabled={isAdded}
                        className={`group relative overflow-hidden cursor-pointer px-8 py-5 transition-all duration-500 ${
                          isAdded ? "bg-green-600" : "bg-white"
                        } `}
                      >
                        <span
                          className={`relative z-10 text-[11px] font-black uppercase tracking-[0.3em] transition-colors duration-500 ${
                            isAdded
                              ? "text-white"
                              : "text-black group-hover:text-white"
                          }`}
                        >
                          {isAdded
                            ? "Added ✓"
                            : `Add To Cart — $${coffee.price}`}
                        </span>

                        {/* Hover slide effect - only active when not added */}
                        {!isAdded && (
                          <div className="absolute inset-0 bg-[#c89365] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
