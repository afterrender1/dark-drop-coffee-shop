"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
import Image from "next/image";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const navLinks = [
  { name: "Shop", href: "/shop" },
  { name: "Coffee", href: "/coffee" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    setIsScrolled(latest > 20);
  });

  useEffect(() => setIsOpen(false), [pathname]);

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={isHidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-500 ${
        isScrolled
          ? "bg-black/60 backdrop-blur-xl py-3 border-b border-white/10"
          : "bg-transparent py-6"
      }`}
    >
      <div className="mx-auto flex max-w-400 items-center justify-between px-6 md:px-12">
        <Link
          href="/"
          className="group flex items-center gap-3 text-xl font-bold tracking-tighter text-white"
        >
          <motion.div className="relative">
            <Image
              src="/logos/brandlogo.png"
              alt="Black Drop Coffee"
              width={140}
              height={40}
              priority
              className="object-cover rounded-xl"
            />
          </motion.div>
        </Link>

        <nav
          className={`hidden md:flex items-center gap-8 ${raleway.className}`}
        >
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative text-[12px] font-bold uppercase tracking-[0.2em] transition-colors hover:text-white ${
                  isActive ? "text-white" : "text-neutral-400"
                }`}
              >
                {link.name}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 h-0.5 w-full bg-amber-500"
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-5">
          <button className="text-neutral-400 hover:text-white transition-colors">
            <Search size={18} strokeWidth={2} />
          </button>

          <Link href="/cart" className="group relative text-white">
            <ShoppingBag
              size={20}
              strokeWidth={1.5}
              className="group-hover:scale-110 transition-transform"
            />
            <span className="absolute -right-1.5 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[8px] font-black text-black ring-2 ring-black">
              2
            </span>
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-white p-2 -mr-2"
          >
            <div className="flex flex-col gap-1.5 w-6">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 7.5 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-full bg-white block"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-0.5 w-full bg-white block"
              />
              <motion.span
                animate={
                  isOpen ? { rotate: -45, y: -7.5 } : { rotate: 0, y: 0 }
                }
                className="h-0.5 w-full bg-white block"
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 90% 10%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 90% 10%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[-1] flex flex-col items-center justify-center bg-black/95 backdrop-blur-2xl md:hidden"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * i }}
                >
                  <Link
                    href={link.href}
                    className="text-4xl font-black uppercase tracking-tighter text-white hover:text-amber-500 transition-colors"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
