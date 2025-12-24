import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Star, Coffee } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#050505] pt-24 overflow-hidden">
      {/* Background glow */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 rounded-full bg-amber-900/10 blur-[140px]" />

      <div className="mx-auto max-w-400 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
        {/* LEFT CONTENT */}
        <div className="relative z-10 order-2 lg:order-1 text-center lg:text-left">
          {/* Social proof */}
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-neutral-900 px-4 py-2 mx-auto lg:mx-0">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-black"
                >
                  <Star size={10} fill="currentColor" />
                </span>
              ))}
            </div>
            <span className="text-[11px] font-semibold uppercase tracking-widest text-neutral-400">
              50,000+ Cups Brewed
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 text-4xl sm:text-5xl md:text-6xl xl:text-8xl font-black uppercase leading-[0.95] tracking-tight text-white">
            Better <br />
            <span className="italic text-amber-500">Beans.</span> <br />
            Better <span className="text-neutral-500">Days.</span>
          </h1>

          {/* Description */}
          <p className="mb-10 max-w-md mx-auto lg:mx-0 text-base sm:text-lg font-medium leading-relaxed text-neutral-400">
            Artisanal coffee sourced from high-altitude farms and roasted in
            small batches to unlock bold, unforgettable flavor.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-white px-10 py-5 text-xs font-extrabold uppercase tracking-widest text-black transition hover:bg-amber-500"
            >
              Shop Coffee <ArrowRight size={16} />
            </Link>

            <button
              aria-label="Watch our coffee process"
              className="group inline-flex items-center justify-center gap-3 px-8 py-5 text-xs font-extrabold uppercase tracking-widest text-white"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition group-hover:bg-white group-hover:text-black">
                <Play size={14} fill="currentColor" />
              </span>
              Watch Process
            </button>
          </div>
        </div>

        {/* RIGHT VISUAL */}
        <div className="relative order-1 lg:order-2 w-full">
          {/* Image container with fixed aspect */}
          <div className="relative aspect-4/5 sm:aspect-3/4 lg:aspect-5/5 w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto overflow-hidden ">
            <Image
              src="/images/hero-coffee.png"
              alt="Dark roasted specialty coffee"
              fill
              priority
              className="object-cover transition duration-700 "
            />

            {/* Floating card */}
            <div className="absolute bottom-4 sm:bottom-6 left-4 right-4 sm:left-6 sm:right-6 flex items-center gap-4 rounded-2xl border border-white/10 bg-black/60 p-4 sm:p-5 backdrop-blur-md">
              <span className="flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-amber-500 text-black">
                <Coffee size={20} />
              </span>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
                  Our Pick
                </p>
                <p className="text-sm sm:text-base font-semibold text-white">
                  Sumatra Gayo Dark Roast
                </p>
              </div>
            </div>
          </div>

          {/* Decorative orbs */}
          <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl hidden sm:block" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/5 blur-3xl hidden sm:block" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
