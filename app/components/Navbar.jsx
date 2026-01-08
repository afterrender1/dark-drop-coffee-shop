"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import {
  ShoppingBag,
  X,
  ArrowRight,
  Shield,
  Plus,
  Minus,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { Raleway, Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

// 1. Redux Imports
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart,
  decrementQuantity,
} from "@/app/lib/features/cart/cartSlice";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const navLinks = [
  { name: "Coffee", href: "#shop" },
  { name: "Process", href: "#process" },
  { name: "About", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // 2. Redux Hooks
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  // Calculate total items (sum of all quantities)
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // Calculate subtotal
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const { scrollY } = useScroll();

  const handleClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsOpen(false);
    }
  };

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150 && !isOpen && !isCartOpen) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    if (isOpen || isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen, isCartOpen]);

  return (
    <>
      <motion.header
        variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-200 transition-all duration-500 ${
          isScrolled || isOpen || isCartOpen
            ? "bg-black/80 backdrop-blur-xl py-3 border-b border-white/10"
            : "bg-transparent py-6"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 md:px-12">
          <Link
            href="/"
            className={`${
              isOpen || isCartOpen ? "opacity-0" : "opacity-100"
            } transition-opacity`}
          >
            <Image
              src="/logos/b-logo.png"
              alt="Logo"
              width={140}
              height={35}
              priority
              className="object-contain"
            />
          </Link>

          <nav
            className={`hidden md:flex items-center gap-8 ${raleway.className}`}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                onClick={(e) => handleClick(e, link.href)}
                href={link.href}
                className="text-[11px] font-bold uppercase tracking-[0.3em] text-neutral-400 hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsCartOpen(true)}
              className={`group relative text-white transition-all ${
                isOpen ? "opacity-0" : "opacity-100"
              }`}
            >
              <ShoppingBag
                size={20}
                strokeWidth={1.5}
                className="group-hover:scale-110 cursor-pointer transition-transform"
              />
              {totalItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[8px] font-black text-black ring-2 ring-black"
                >
                  {totalItems}
                </motion.span>
              )}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white z-210"
            >
              <div className="flex flex-col gap-1.5 w-6">
                <motion.span
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="h-0.5 w-full bg-white block origin-center"
                />
                <motion.span
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="h-0.5 w-full bg-white block"
                />
                <motion.span
                  animate={
                    isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }
                  }
                  className="h-0.5 w-full bg-white block origin-center"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-250 ${inter.className}`}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 35, stiffness: 300 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#080808] z-300 flex flex-col shadow-2xl border-l border-white/10"
            >
              <div className="p-6 flex items-center justify-between border-b border-white/10 bg-black">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.6)]" />
                  <span className="text-[11px]  uppercase tracking-[0.2em] text-white font-bold">
                    Selection.Log
                  </span>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="text-white hover:text-amber-500 cursor-pointer transition-colors p-1"
                >
                  <X size={20} />
                </button>
              </div>

              {/* DYNAMIC CART ITEMS */}
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-2 custom-scrollbar">
                {cartItems.length === 0 ? (
                  <div className="h-full flex items-center justify-center text-neutral-500 font-serif italic">
                    Your cart is empty.
                  </div>
                ) : (
                  cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="group relative grid grid-cols-[85px_1fr] gap-5 py-6 border-b border-white/10 last:border-none"
                    >
                      <div className="relative h-20 w-20 bg-neutral-900 rounded-sm overflow-hidden border border-white/10">
                        <Image
                          src={item.image}
                          fill
                          className="object-contain p-2  transition-all duration-500"
                          alt={item.name}
                        />
                      </div>

                      <div className="flex flex-col justify-between py-0.5">
                        <div
                          className={`flex justify-between items-start ${inter.className}`}
                        >
                          <div className="space-y-1">
                            <h3 className="text-[12px] font-black uppercase tracking-tight text-white leading-none">
                              {item.name}
                            </h3>
                            <p className="text-[10px]  italic text-white/80">
                              {item.origin || "Exclusive Blend"}
                            </p>
                          </div>
                          <span className="text-[11px]  text-amber-500 font-bold">
                            ${item.price * item.quantity}
                          </span>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center bg-white/5 border border-white/10 rounded-sm overflow-hidden backdrop-blur-md">
                            {/* Minus Button */}
                            <button
                              onClick={() =>
                                dispatch(decrementQuantity(item.id))
                              }
                              className="flex items-center justify-center w-10 h-10 hover:bg-[#c89365] hover:text-white text-neutral-400 transition-all duration-300 cursor-pointer group active:scale-90"
                            >
                              <Minus
                                size={14}
                                strokeWidth={3}
                                className="group-hover:scale-110"
                              />
                            </button>

                            {/* Quantity Display */}
                            <div className="w-12 h-10 flex items-center justify-center border-x border-white/10 relative overflow-hidden">
                              {/* Subtle Vertical Number Glow */}
                              <div className="absolute inset-0 bg-white/2 pointer-events-none" />
                              <span
                                className={`text-[13px] font-mono font-black text-white tracking-tighter ${inter.className}`}
                              >
                                {item.quantity.toString().padStart(2, "0")}
                              </span>
                            </div>

                            {/* Plus Button */}
                            <button
                              onClick={() => dispatch(addToCart(item))}
                              className="flex items-center justify-center w-10 h-10 hover:bg-[#c89365] hover:text-white text-neutral-400 transition-all duration-300 cursor-pointer group active:scale-90"
                            >
                              <Plus
                                size={14}
                                strokeWidth={3}
                                className="group-hover:scale-110"
                              />
                            </button>
                          </div>
                          <button
                            onClick={() => dispatch(removeFromCart(item.id))}
                            className="text-[9px] font-mono uppercase cursor-pointer text-white/60 hover:text-red-500 transition-colors tracking-widest underline underline-offset-4"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* FOOTER */}
              <div
                className={`p-8 bg-black border-t border-white/20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] ${inter.className}`}
              >
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px]  text-white uppercase tracking-widest font-medium">
                      Subtotal
                    </span>
                    <span className="text-xl font-black text-white tracking-tighter">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                </div>
                <Link href="/checkout" className="flex items-center gap-1">
                  <button className="relative w-full cursor-pointer h-14 bg-white text-black overflow-hidden hover:bg-amber-500 transition-all duration-300 active:scale-[0.98] group">
                    <div className="flex items-center justify-center gap-3 text-[11px] font-black uppercase tracking-[0.4em]">
                      Initiate Checkout{" "}
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-2 transition-transform"
                      />
                    </div>
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      {/* ... Mobile Nav Presence Remains Same ... */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-150 bg-black md:hidden"
          >
            {/* Background Subtle Gradient */}
            <div className="absolute inset-0 opacity-40 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(200,147,101,0.05)_0%,transparent_100%)]" />

            <nav className="relative z-20 flex h-full flex-col items-center justify-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{
                    delay: 0.1 * i,
                    duration: 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleClick(e, link.href)}
                    className="group flex flex-col items-center"
                  >
                    <span className="text-5xl font-serif italic tracking-tighter text-white group-hover:text-[#c89365] transition-colors">
                      {link.name}
                    </span>
                    {/* Animated Underline */}
                    <motion.div className="h-px bg-[#c89365] w-0 group-hover:w-full transition-all duration-500" />
                  </Link>
                </motion.div>
              ))}

              {/* Bottom Contact Detail in Menu */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-12 text-center"
              >
                <p className="text-[9px] uppercase tracking-[0.5em] text-neutral-500 mb-2">
                  Based in Seattle
                </p>
                <p className="text-[11px] font-mono text-[#c89365]">
                  hello@boutiquecoffee.com
                </p>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
