"use client";

import { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { clearCart } from "@/app/lib/features/cart/cartSlice";
import {
  ShieldCheck,
  Truck,
  ArrowLeft,
  MapPin,
  Loader2,
  CheckCircle2,
  Package,
  Clock,
} from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export default function CheckoutPage() {
  const [mounted, setMounted] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [address, setAddress] = useState("");
  const [orderStatus, setOrderStatus] = useState("idle");

  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Fix Hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const deliveryTime = useMemo(
    () => Math.floor(Math.random() * (45 - 25 + 1)) + 25,
    []
  );

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  const handleGetLocation = () => {
    if (!navigator.geolocation) return;
    setIsLocating(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      try {
        const { latitude, longitude } = position.coords;
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        setAddress(data.display_name || "Location found, please verify.");
      } catch (err) {
        console.error(err);
      } finally {
        setIsLocating(false);
      }
    });
  };

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;
    setOrderStatus("processing");
    setTimeout(() => {
      setOrderStatus("completed");
      dispatch(clearCart());
    }, 2500);
  };

  // Prevent rendering until client-side hydration is complete
  if (!mounted) return <div className="min-h-screen bg-[#050505]" />;

  if (orderStatus === "completed") {
    return (
      <div
        className={`min-h-screen bg-[#050505] text-white flex items-center justify-center p-4 md:p-6 ${inter.className}`}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl w-full bg-[#080808] border border-white/10 p-6 md:p-12 shadow-2xl rounded-sm text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, delay: 0.2 }}
            className="w-16 h-16 md:w-20 md:h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8"
          >
            <CheckCircle2
              size={32}
              className="text-green-500 md:w-10 md:h-10"
            />
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-serif mb-2 leading-tight">
            Order Confirmed.
          </h2>
          <p className="text-neutral-500 text-[10px] uppercase tracking-[0.3em] mb-8 md:mb-12">
            Transaction ID: #BE-{Math.floor(Math.random() * 1000000)}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 mb-8 md:mb-12 text-left">
            <div className="bg-white/5 p-5 border border-white/5">
              <Clock className="text-[#c89365] mb-3" size={18} />
              <p className="text-[9px] uppercase tracking-widest text-neutral-500 mb-1">
                Estimated Arrival
              </p>
              <p className="text-lg font-bold">{deliveryTime} Minutes</p>
            </div>
            <div className="bg-white/5 p-5 border border-white/5">
              <Package className="text-[#c89365] mb-3" size={18} />
              <p className="text-[9px] uppercase tracking-widest text-neutral-500 mb-1">
                Status
              </p>
              <p className="text-lg font-bold">In Preparation</p>
            </div>
          </div>

          <Link
            href="/"
            className="inline-block w-full bg-white text-black py-5 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#c89365] hover:text-white transition-all active:scale-95"
          >
            Return to Store
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#050505] text-white pt-20 md:pt-28 pb-12 ${inter.className} selection:bg-[#c89365]/30`}
    >
      <AnimatePresence>
        {orderStatus === "processing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center"
          >
            <Loader2 size={48} className="text-[#c89365] animate-spin mb-6" />
            <p className="text-[10px] uppercase tracking-[0.6em] animate-pulse text-[#c89365]">
              Securing Transaction...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-10 text-[10px] uppercase tracking-[0.4em]"
        >
          <ArrowLeft
            size={12}
            className="group-hover:-translate-x-1 transition-transform"
          />{" "}
          Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* FORM SIDE */}
          <div className="lg:col-span-7 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-8 gap-4">
                <h2 className="text-[11px] uppercase tracking-[0.5em] text-[#c89365] font-black flex items-center gap-4 flex-1">
                  01. Shipping <div className="h-px flex-1 bg-white/10" />
                </h2>
                <button
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="shrink-0 flex items-center gap-2 text-[9px] uppercase tracking-widest text-neutral-400 hover:text-white transition-all disabled:opacity-50"
                >
                  {isLocating ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <MapPin size={12} className="text-green-500" />
                  )}
                  {isLocating ? "Locating..." : "Auto-Fill"}
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="bg-white/5 border border-white/10 p-4 outline-none text-sm focus:border-[#c89365]/50 transition-colors"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="bg-white/5 border border-white/10 p-4 outline-none text-sm focus:border-[#c89365]/50 transition-colors"
                />
                <textarea
                  placeholder="Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="md:col-span-2 bg-white/5 border border-white/10 p-4 outline-none text-sm resize-none focus:border-[#c89365]/50 transition-colors"
                />
              </div>
            </section>

            <section>
              <h2 className="text-[11px] uppercase tracking-[0.5em] text-[#c89365] font-black mb-8 flex items-center gap-4">
                02. Payment <div className="h-px flex-1 bg-white/10" />
              </h2>
              <div className="bg-white/5 border border-white/10 p-6 space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="h-3 w-3 rounded-full bg-[#c89365] shadow-[0_0_8px_rgba(200,147,101,0.5)]" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Credit Card
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="bg-transparent border-none outline-none text-sm w-full placeholder:text-neutral-700 tracking-[0.2em]"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* SIDEBAR SIDE */}
          <div className="lg:col-span-5 relative">
            <div className="lg:sticky lg:top-32 bg-[#080808] border border-white/5 p-6 md:p-10 shadow-2xl rounded-sm">
              <h3 className="text-[11px] uppercase tracking-[0.5em] font-black mb-8 text-neutral-500">
                Review Selection
              </h3>

              <div className="space-y-6 max-h-[40vh] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 group">
                    <div className="relative h-16 w-16 bg-black border border-white/5 shrink-0 overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2 grayscale brightness-125 group-hover:grayscale-0 transition-all duration-500"
                      />
                      <span className="absolute -top-1 -right-1 bg-[#c89365] text-black text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full shadow-lg">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[11px] uppercase font-black text-white truncate">
                        {item.name}
                      </h4>
                      <p className="text-[9px] text-neutral-500 italic font-serif truncate">
                        {item.origin || "Exclusive Selection"}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-white tabular-nums">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4 text-[10px] uppercase tracking-widest">
                <div className="flex justify-between text-neutral-500">
                  <span>Subtotal</span>
                  <span className="text-white tabular-nums">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-neutral-500">
                  <span>Shipping</span>
                  <span className="text-[#c89365]">
                    {shipping === 0
                      ? "COMPLIMENTARY"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-2xl font-light border-t border-white/10 pt-6 mt-2 text-white">
                  <span className="text-[9px] font-bold self-center text-neutral-500">
                    Final Total
                  </span>
                  <span className="tracking-tighter tabular-nums">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0}
                className="w-full mt-10 bg-white text-black py-6 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#c89365] hover:text-white transition-all active:scale-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Place Order
              </button>

              <div className="mt-8 pt-8 border-t border-white/5 flex justify-center gap-8 opacity-20 grayscale">
                <ShieldCheck size={16} />
                <Truck size={16} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
