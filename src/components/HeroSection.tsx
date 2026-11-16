import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { ThreeBraces } from './ThreeBraces';

interface HeroSectionProps {
  onStartOrder: () => void;
  onOpenSample: () => void;
}

export function HeroSection({ onStartOrder, onOpenSample }: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const artRotate = useTransform(scrollYProgress, [0, 1], [0, 7]);

  return (
    <section id="top" ref={sectionRef} className="relative">
      <div className="hero-gradient relative overflow-hidden rounded-[26px] md:rounded-[30px] px-6 py-8 sm:px-10 sm:py-11 lg:px-12 lg:py-12 text-white">
        {/* Subtle low-opacity architectural curve texture */}
        <svg
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
        </svg>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Typography & CTA Column */}
          <motion.div style={{ y: copyY }} className="lg:col-span-8 max-w-2xl">
            <div className="hero-stagger inline-flex items-center rounded-full bg-[#EAFC66] px-4 py-1.5 text-[12px] md:text-[13px] font-semibold text-[#181D27] tracking-[-0.01em] whitespace-nowrap">
              Encontramos y verificamos a tus próximos clientes
            </div>

            <h1 className="hero-stagger mt-5 text-[30px] sm:text-[40px] lg:text-[46px] font-bold leading-[1.09] tracking-[-0.025em] text-white [text-wrap:balance]">
              Encuentra y contacta a tus{' '}
              <span className="relative inline-block text-[#EAFC66]">
                próximos clientes
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
              </span>{' '}
              en minutos.
            </h1>

            <p className="hero-stagger mt-5 max-w-xl text-[14px] sm:text-[15.5px] leading-[1.6] text-white/90">
              Nos dices a quién le quieres vender, por ejemplo clínicas de Buenos Aires. Te
              entregamos una lista de negocios reales con su WhatsApp verificado y su sitio
              web, lista para contactar. Cada cliente es un negocio real, verificado y
              listo para escribirle.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="hero-stagger mt-7 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onStartOrder}
                className="group inline-flex items-center gap-3.5 rounded-full bg-white py-2 pl-6 pr-2 text-[14px] font-bold text-[#181D27] shadow-[0_12px_30px_rgba(12,35,112,0.22)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_36px_rgba(12,35,112,0.28)] active:translate-y-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#EAFC66]"
              >
                <span className="whitespace-nowrap">Conseguir clientes</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12 group-hover:scale-105">
                  <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
                </span>
              </button>

              <button
                type="button"
                onClick={onOpenSample}
                className="inline-flex items-center rounded-full border border-white/35 bg-white/10 px-5 py-3 text-[13.5px] font-semibold text-white backdrop-blur-xs transition-all duration-150 hover:bg-white/20 whitespace-nowrap cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Ver una muestra gratis
              </button>
            </div>

            {/* Unboxed Metadata Line with typographic separators */}
            <div className="hero-stagger mt-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-[12.5px] font-medium text-white/80 tabular-nums">
              <span className="font-bold text-[#EAFC66]">Desde US$5,99 por 10 clientes</span>
              <span aria-hidden="true">·</span>
              <span>Sin suscripción</span>
              <span aria-hidden="true">·</span>
              <span>WhatsApp verificado</span>
              <span aria-hidden="true">·</span>
              <span>Español e inglés</span>
              <span aria-hidden="true">·</span>
              <span>Si uno no sirve, lo reemplazamos</span>
            </div>
          </motion.div>

          {/* Right 3D Braces Sculpture Column */}
          <motion.div
            style={{ y: artY, rotate: artRotate }}
            className="lg:col-span-4 relative h-[240px] sm:h-[290px] lg:h-[360px] lg:-mr-6 lg:-mb-14"
          >
            <ThreeBraces />

            {/* Floating labels que le dan sentido al objeto 3D: es tu base de clientes */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 hidden sm:block"
            >
              <span className="float-chip absolute left-0 top-4 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#181D27] shadow-[0_10px_26px_rgba(11,34,112,0.22)]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#EAFC66] ring-1 ring-[#181D27]/15" />
                + cliente verificado
              </span>
              <span className="float-chip delay-1 absolute right-0 top-16 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#181D27] shadow-[0_10px_26px_rgba(11,34,112,0.22)]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#2B62F6]" />
                WhatsApp activo
              </span>
              <span className="float-chip delay-2 absolute bottom-8 left-2 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#181D27] shadow-[0_10px_26px_rgba(11,34,112,0.22)]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#EAFC66] ring-1 ring-[#181D27]/15" />
                CSV / XLSX listo
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
