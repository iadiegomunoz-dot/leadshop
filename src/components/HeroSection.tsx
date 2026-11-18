import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { lazy, Suspense, useRef } from 'react';
import { T, type Lang } from '../data/i18n';
const ThreeBraces = lazy(() =>
  import('./ThreeBraces').then((m) => ({ default: m.ThreeBraces }))
);

interface HeroSectionProps {
  onStartOrder: () => void;
  onOpenSample: () => void;
  lang?: Lang;
}

export function HeroSection({ onStartOrder, onOpenSample, lang = 'es' }: HeroSectionProps) {
  const t = T[lang];
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [0, 7]);
  // Background curves drift upward against the copy — depth layer
  const bgY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -90]);
  const chipsY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -46]);

  return (
    <section id="top" ref={sectionRef} className="relative">
      <div className="hero-gradient relative overflow-hidden rounded-[26px] md:rounded-[30px] px-6 py-8 sm:px-10 sm:py-11 lg:px-12 lg:py-12 text-white">
        {/* Subtle low-opacity architectural curve texture */}
        <motion.svg
          style={{ y: bgY }}
          className="pointer-events-none absolute -top-10 right-[18%] h-[125%] w-auto opacity-[0.06]"
          viewBox="0 0 420 500"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M170 20C95 20 75 65 75 130V195C75 230 50 245 20 250C50 255 75 270 75 305V370C75 435 95 480 170 480"
            stroke="white"
            strokeWidth="44"
            strokeLinecap="round"
          />
          <path
            d="M250 20C325 20 345 65 345 130V195C345 230 370 245 400 250C370 255 345 270 345 305V370C345 435 325 480 250 480"
            stroke="white"
            strokeWidth="44"
            strokeLinecap="round"
          />
        </motion.svg>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Typography & CTA Column */}
          <motion.div style={{ y: copyY }} className="lg:col-span-8 max-w-2xl">
            <div className="hero-stagger inline-flex max-w-full items-center rounded-full bg-[#EAFC66] px-4 py-1.5 text-center text-[12px] md:text-[13px] font-semibold leading-[1.35] text-[#181D27] tracking-[-0.01em]">
              {t.heroBadge}
            </div>

            <h1 className="hero-stagger mt-5 text-[30px] sm:text-[40px] lg:text-[46px] font-bold leading-[1.09] tracking-[-0.025em] text-white [text-wrap:balance]">
              {t.heroL1}
              <br />
              <span className="relative inline-block text-[#EAFC66]">
                {t.heroL2}
                <svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 220 12"
                  fill="none"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <path
                    d="M3 9C60 3 160 3 217 8"
                    stroke="#EAFC66"
                    strokeWidth="5"
                    strokeLinecap="round"
                    opacity="0.55"
                  />
                </svg>
              </span>
            </h1>

            <p className="hero-stagger mt-5 max-w-xl text-[14px] sm:text-[15.5px] leading-[1.6] text-white/90">
              {t.heroP}
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="hero-stagger mt-7 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onStartOrder}
                className="group inline-flex items-center gap-3.5 rounded-full bg-white py-2 pl-6 pr-2 text-[14px] font-bold text-[#181D27] shadow-[0_12px_30px_rgba(12,35,112,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(12,35,112,0.28)] active:translate-y-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EAFC66]"
              >
                <span className="whitespace-nowrap">{t.heroCta1}</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12 group-hover:scale-105">
                  <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
                </span>
              </button>

              <button
                type="button"
                onClick={onOpenSample}
                className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-5 py-3 text-[13.5px] font-semibold text-white backdrop-blur-xs transition-all duration-150 hover:bg-white/20 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                {t.heroCta2}
              </button>
            </div>

            {/* Unboxed Metadata Line with typographic separators */}
            <div className="hero-stagger mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] font-medium text-white/80 tabular-nums">
              <span className="font-bold text-[#EAFC66]">{t.meta[0]}</span>
              {t.meta.slice(1).map((item) => (
                <span key={item} className="inline-flex items-center gap-x-2.5">
                  <span aria-hidden="true">·</span>
                  <span>{item}</span>
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right 3D Braces Sculpture Column */}
          <motion.div
            style={{ y: artY, rotate: artRotate }}
            className="lg:col-span-4 relative h-[210px] sm:h-[290px] lg:h-[360px] lg:-mr-6 lg:-mb-14"
          >
            <Suspense
              fallback={
                <div className="h-full w-full animate-pulse rounded-[28px] bg-white/10" />
              }
            >
              <ThreeBraces />
            </Suspense>

            {/* Floating labels que le dan sentido al objeto 3D: es tu base de clientes.
                En móvil solo se muestra la etiqueta principal, centrada. */}
            <motion.div
              style={{ y: chipsY }}
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
            >
              {t.heroChips.map((chip, i) => (
                <span
                  key={chip}
                  className={`float-chip${i === 1 ? ' delay-1' : i === 2 ? ' delay-2' : ''} absolute inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#181D27] shadow-[0_10px_26px_rgba(11,34,112,0.22)] whitespace-nowrap ${
                    i === 0
                      ? 'left-1/2 top-2 -translate-x-1/2 sm:left-0 sm:top-4 sm:translate-x-0'
                      : i === 1
                        ? 'right-0 top-16 hidden sm:inline-flex'
                        : 'bottom-8 left-2 hidden sm:inline-flex'
                  }`}
                >
                  <span
                    className={`inline-block h-2 w-2 rounded-full ${
                      i === 1 ? 'bg-[#2B62F6]' : 'bg-[#EAFC66] ring-1 ring-[#181D27]/15'
                    }`}
                  />
                  {chip}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
