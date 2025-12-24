import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Play, Star, Coffee, ChevronRight } from "lucide-react";
import { Poppins, Montserrat } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500"],
});
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500"],
});

const Hero = () => {
  return (
    <section className="relative min-h-screen bg-[#050505] pt-24 overflow-hidden">
      <div className="pointer-events-none absolute top-0 right-0 h-full w-1/2 rounded-full bg-amber-900/10 blur-[140px]" />

      <div className="mx-auto max-w-400 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-16 items-center">
        <div className="relative z-10 order-2 lg:order-1 text-center lg:text-left">
          <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-white/10 bg-neutral-900 px-4 py-2 mx-auto lg:mx-0">
            <div className="flex -space-x-1">
              {[...Array(3)].map((_, i) => (
                <span
                  key={i}
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-[#c89365] text-black"
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
          <h1
            className={`mb-6 text-4xl sm:text-5xl md:text-6xl xl:text-8xl font-black uppercase leading-[0.95] tracking-tight text-white ${poppins.className}`}
          >
            Better <br />
            <span className="italic text-[#c89365]">Beans.</span> <br />
            Better <span className="text-neutral-500">Days.</span>
          </h1>

          {/* Description */}
          <p className="mb-10 max-w-md mx-auto lg:mx-0 text-base sm:text-lg font-medium leading-relaxed text-neutral-400">
            Artisanal coffee sourced from high-altitude farms and roasted in
            small batches to unlock bold, unforgettable flavor.
          </p>

          {/* CTAs */}
          <div
            className={`flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start ${montserrat.className}`}
          >
            <Link
              href="/shop"
              className="group inline-flex items-center gap-3 rounded-full bg-[#c89365] px-9 py-4 text-xs font-bold uppercase tracking-widest text-black transition hover:bg-[#896647]"
            >
              Shop Coffee
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <button
              aria-label="Watch our coffee process"
              className="group inline-flex items-center gap-3 px-6 py-4 text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-white transition"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 transition group-hover:border-white group-hover:bg-white group-hover:text-black">
                <Play size={14} fill="currentColor" />
              </span>
              Watch Process
            </button>
          </div>
        </div>

        <div className="relative order-1 lg:order-2 w-full">
          <div className="relative aspect-4/5 sm:aspect-3/4 lg:aspect-5/5 w-full max-w-sm sm:max-w-md lg:max-w-none mx-auto overflow-hidden ">
            <Image
              src="/images/hero-coffee.png"
              alt="Dark roasted specialty coffee"
              fill
              priority
              className="object-cover transition duration-700 "
            />

            <div className="group absolute inset-x-5 bottom-5 flex cursor-pointer items-center gap-5 rounded-xl border border-white/5 bg-[#0A0A0A]/80 p-4 shadow-2xl backdrop-blur-2xl transition-all duration-700 hover:border-white/20 sm:inset-x-8 sm:bottom-8">
              <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg  shadow-inner">
                <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent" />
                <Coffee
                  size={22}
                  strokeWidth={1.5}
                  className="relative text-[#c89365] transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className={`flex flex-col gap-1 ${montserrat.className}`}>
                <div className="flex items-center gap-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500 transition-colors group-hover:text-amber-500">
                    Origin Selection
                  </span>
                  <span className="h-px w-8 bg-zinc-800 transition-all duration-500 group-hover:w-12 group-hover:bg-amber-500/50" />
                </div>

                <div className="flex flex-col">
                  <h3 className="text-base font-medium tracking-tight text-zinc-100 sm:text-lg">
                    Sumatra Gayo
                  </h3>
                  <p className="text-[11px] font-medium leading-none text-zinc-500 uppercase tracking-wider">
                    Batch No. 842 <span className="mx-2 text-zinc-700">/</span>{" "}
                    Dark Roast
                  </p>
                </div>
              </div>

              <div className="ml-auto flex items-center gap-4">
                <div className="hidden h-8 w-px bg-zinc-800 sm:block" />
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/5 bg-zinc-900/50 text-zinc-400 transition-all duration-300 group-hover:border-amber-500/20 group-hover:text-white">
                  <ArrowRight size={18} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-amber-500/10 blur-2xl hidden sm:block" />
          <div className="absolute -bottom-12 -left-12 h-40 w-40 rounded-full bg-white/5 blur-3xl hidden sm:block" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
