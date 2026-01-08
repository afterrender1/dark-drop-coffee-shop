"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Inter } from "next/font/google";

import { featuredCoffees } from "@/app/data/featuredCoffees";
import { addToCart } from "@/app/lib/features/cart/cartSlice";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

export default function CoffeeDetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const coffee = featuredCoffees.find((c) => c.id === id);

  const handleAddToCart = () => {
    dispatch(addToCart(coffee));
    setAdded(true);
    // Reset the button state after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  if (!coffee)
    return (
      <div className="text-white p-20 font-serif min-h-screen bg-[#050505] flex items-center justify-center">
        Product Not Found
      </div>
    );

  return (
    <>
      <Navbar />

      {/* SUCCESS TOAST NOTIFICATION */}
      <AnimatePresence>
        {added && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className="fixed bottom-10 left-1/2 z-1000 w-[90%] max-w-100"
          >
            <div className="bg-white text-black p-4 shadow-2xl flex items-center justify-between border-l-4 border-green-500">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-1 rounded-full">
                  <Check size={16} className="text-green-600" strokeWidth={3} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest leading-none">
                    Added to Experience
                  </p>
                  <p className="text-xs font-serif italic text-neutral-500">
                    {coffee.name}
                  </p>
                </div>
              </div>
              <Link
                href="/checkout"
                className="text-[9px] font-bold uppercase tracking-tighter flex items-center gap-1 hover:text-amber-600 transition-colors"
              >
                Checkout <ArrowRight size={12} />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div
        className={`min-h-screen bg-[#050505] text-white selection:bg-[#c89365]/30 selection:text-white pt-20 ${inter.className}`}
      >
        <div className="container mx-auto px-4 sm:px-8 py-8 lg:py-16 max-w-7xl">
          {/* Navigation */}
          <nav className="mb-8 lg:mb-16">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-neutral-500 hover:text-white transition-all underline-offset-8 hover:underline"
            >
              <span className="transition-transform group-hover:-translate-x-1">
                ←
              </span>
              <span>Back to Collection</span>
            </Link>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-24 items-center">
            {/* Left: Image Section */}
            <div className="lg:col-span-7 w-full order-1">
              <div className="relative aspect-4/5 sm:aspect-square lg:aspect-4/5 w-full overflow-hidden bg-[#080808] border border-white/5 shadow-2xl rounded-sm group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(80,80,80,0.15)_0%,rgba(8,8,8,1)_100%)] z-10" />

                <Image
                  src={coffee.image}
                  alt={coffee.name}
                  fill
                  className="object-contain p-8 sm:p-16 lg:p-20 z-20 transition-transform duration-[3s] ease-out group-hover:scale-110"
                  priority
                />

                <div className="absolute top-6 right-6 z-30 hidden sm:block">
                  <span className="text-[9px] uppercase tracking-[0.6em] text-white/30 [writing-mode:vertical-lr] font-light">
                    Specialty Grade — {coffee.origin || "Estate"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Info Section */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 space-y-8 lg:space-y-12">
              <header className="space-y-4 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3">
                  <div className="hidden lg:block h-px w-8 bg-[#c89365]" />
                  <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.5em] text-[#c89365] font-bold">
                    {coffee.origin || "Exclusive Blend"}
                  </span>
                </div>
                <h1 className="text-[clamp(2.5rem,8vw,4.5rem)] font-serif leading-[1.1] tracking-tighter">
                  {coffee.name}
                </h1>
              </header>

              <div className="space-y-8">
                <p className="text-base sm:text-lg text-neutral-400 font-light leading-relaxed text-center lg:text-left max-w-xl mx-auto lg:mx-0">
                  {coffee.description}
                </p>

                {/* Flavor Notes */}
                <div className="grid grid-cols-3 gap-4 py-8 border-y border-white/5">
                  {["Velvet", "Dark Fruit", "Spice"].map((tag) => (
                    <div
                      key={tag}
                      className="flex flex-col items-center lg:items-start gap-1"
                    >
                      <span className="text-[8px] uppercase tracking-widest text-neutral-500">
                        Note
                      </span>
                      <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-white italic font-medium">
                        {tag}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Pricing & CTA */}
              <div className="space-y-8">
                <div className="flex items-baseline justify-center lg:justify-start gap-4">
                  <span className="text-4xl sm:text-5xl font-light">
                    ${coffee.price}
                  </span>
                  <span className="text-xs sm:text-sm text-neutral-600 line-through tracking-[0.2em] font-mono">
                    $42.00
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={added}
                    className="w-full group relative overflow-hidden bg-white px-6 py-5 sm:py-6 transition-transform active:scale-[0.98] cursor-pointer disabled:cursor-default"
                  >
                    <span className="relative z-10 text-black group-hover:text-white text-[10px] sm:text-[11px] font-black uppercase tracking-[0.4em] transition-colors duration-500 flex items-center justify-center gap-2">
                      {added ? (
                        <>
                          <Check size={16} strokeWidth={3} /> Added to
                          Experience
                        </>
                      ) : (
                        "Add To Cart"
                      )}
                    </span>
                    {/* Hover Effect Layer */}
                    <div
                      className={`absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${
                        added
                          ? "bg-green-600 translate-y-0"
                          : "bg-[#c89365] translate-y-full group-hover:translate-y-0"
                      }`}
                    />
                  </button>

                  <p className="text-[9px] uppercase tracking-[0.3em] text-neutral-500 text-center">
                    Complimentary Express Shipping on Curator Orders
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
