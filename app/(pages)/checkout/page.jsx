"use client";

import { useState } from "react"; // Added for loading state
import { useSelector } from "react-redux";
import Image from "next/image";
import Link from "next/link";
import { ShieldCheck, Truck, ArrowLeft, MapPin, Loader2 } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export default function CheckoutPage() {
  const cartItems = useSelector((state) => state.cart.items);
  const [isLocating, setIsLocating] = useState(false);
  const [address, setAddress] = useState("");

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 15;
  const total = subtotal + shipping;

  // ONE-CLICK LOCATION FUNCTION
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setAddress(data.display_name);
        } catch (error) {
          console.error("Error fetching address:", error);
        } finally {
          setIsLocating(false);
        }
      },
      (error) => {
        setIsLocating(false);
        alert(
          "Unable to retrieve your location. Please check your permissions."
        );
      }
    );
  };

  if (cartItems.length === 0) {
    return (
      <div
        className={`min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 ${inter.className}`}
      >
        <h2 className="text-4xl font-serif mb-6 italic opacity-80">
          Your log is empty
        </h2>
        <Link
          href="/"
          className="text-[#c89365] uppercase tracking-[0.4em] text-[10px] border-b border-[#c89365]/30 pb-2 hover:border-[#c89365] transition-all"
        >
          Return to Collection
        </Link>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen bg-[#050505] text-white pt-24 pb-12 ${inter.className}`}
    >
      <div className="container mx-auto px-4 max-w-6xl">
        <Link
          href="/"
          className="flex items-center gap-2 text-neutral-500 hover:text-white transition-colors mb-12 text-[10px] uppercase tracking-[0.4em]"
        >
          <ArrowLeft size={12} /> Back
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7 space-y-12">
            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-[11px] uppercase tracking-[0.5em] text-[#c89365] font-black flex items-center gap-4 flex-1">
                  01. Shipping Information{" "}
                  <div className="h-px flex-1 bg-white/10" />
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="bg-white/5 border border-white/10 p-4 focus:border-[#c89365] outline-none transition-colors text-sm placeholder:text-neutral-600"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="bg-white/5 border border-white/10 p-4 focus:border-[#c89365] outline-none transition-colors text-sm placeholder:text-neutral-600"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="md:col-span-2 bg-white/5 border border-white/10 p-4 focus:border-[#c89365] outline-none transition-colors text-sm placeholder:text-neutral-600"
                />

                {/* AUTO-FILLED ADDRESS FIELD */}
                <textarea
                  placeholder="Street Address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={3}
                  className="md:col-span-2 bg-white/5 border border-white/10 p-4 focus:border-[#c89365] outline-none transition-colors text-sm placeholder:text-neutral-600 resize-none"
                />
                {/* ONE-CLICK LOCATION BUTTON */}
                <button
                  onClick={handleGetLocation}
                  disabled={isLocating}
                  className="ml-4 cursor-pointer flex items-center gap-2 text-[9px] uppercase tracking-widest text-neutral-400 hover:text-white transition-all disabled:opacity-50"
                >
                  {isLocating ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : (
                    <MapPin size={12} className="text-green-400" />
                  )}
                  {isLocating ? "Locating..." : "Auto-Fill Location"}
                </button>
              </div>
            </section>

            <section>
              <h2 className="text-[11px] uppercase tracking-[0.5em] text-[#c89365] font-black mb-8 flex items-center gap-4">
                02. Payment Method <div className="h-px flex-1 bg-white/10" />
              </h2>
              <div className="bg-white/5 border border-white/10 p-6 rounded-sm space-y-4">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="h-3 w-3 rounded-full border-2 border-[#c89365] bg-[#c89365]" />
                  <span className="text-[10px] uppercase tracking-widest font-bold">
                    Credit / Debit Card
                  </span>
                </div>
                <div className="grid grid-cols-1 gap-4 pt-2">
                  <input
                    type="text"
                    placeholder="Card Number"
                    className="bg-transparent border-none outline-none text-sm placeholder:text-neutral-700"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* SUMMARY SIDEBAR */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 bg-[#080808] border border-white/5 p-8 shadow-2xl rounded-sm">
              <h3 className="text-[11px] uppercase tracking-[0.5em] font-black mb-8 text-neutral-400">
                Order Summary
              </h3>
              <div className="space-y-6 max-h-[40vh] overflow-y-auto mb-8 pr-2 custom-scrollbar">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-16 w-16 bg-black border border-white/5 shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-contain p-2 grayscale brightness-125"
                      />
                      <span className="absolute -top-2 -right-2 bg-[#c89365] text-black text-[9px] font-black h-5 w-5 flex items-center justify-center rounded-full shadow-lg">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 space-y-1">
                      <h4 className="text-[11px] uppercase font-black tracking-widest text-white leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[9px] text-neutral-500 italic font-serif">
                        {item.origin || "Exclusive Selection"}
                      </p>
                    </div>
                    <span className="text-[11px] font-bold text-white tracking-widest">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-6 space-y-4">
                <div className="flex justify-between text-[10px] text-neutral-500 uppercase tracking-widest">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[10px] text-neutral-500 uppercase tracking-widest">
                  <span>Shipping</span>
                  <span className="text-[#c89365]">
                    {shipping === 0
                      ? "COMPLIMENTARY"
                      : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-2xl font-light border-t border-white/10 pt-6 mt-2">
                  <span className="uppercase text-[9px] tracking-[0.6em] self-center text-neutral-500 font-bold">
                    Total Due
                  </span>
                  <span className="font-medium text-white tracking-tighter">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              <button className="w-full mt-10 bg-white text-black py-6 font-black uppercase tracking-[0.4em] text-[10px] hover:bg-[#c89365] hover:text-white transition-all duration-500 active:scale-95 cursor-pointer">
                Confirm Purchase
              </button>

              <div className="mt-10 pt-6 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 opacity-20 hover:opacity-50 transition-opacity">
                  <ShieldCheck size={12} />
                  <span className="text-[7px] uppercase tracking-[0.3em]">
                    AES-256 Encrypted
                  </span>
                </div>
                <div className="flex items-center gap-2 opacity-20 hover:opacity-50 transition-opacity">
                  <Truck size={12} />
                  <span className="text-[7px] uppercase tracking-[0.3em]">
                    Global Logistics
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
