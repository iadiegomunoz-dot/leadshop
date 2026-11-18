import { ArrowUpRight } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { lazy, Suspense, useRef, useState } from 'react';
import { COVERAGE_CITIES, type CityTarget } from '../data/siteData';
import { T, type Lang } from '../data/i18n';
const ThreeGlobe = lazy(() =>
  import('./ThreeGlobe').then((m) => ({ default: m.ThreeGlobe }))
);

interface CoverageGlobeSectionProps {
  onStartOrder: (presetQuery?: string) => void;
  lang?: Lang;
}

export function CoverageGlobeSection({ onStartOrder, lang = 'es' }: CoverageGlobeSectionProps) {
  const [selectedCity, setSelectedCity] = useState<CityTarget>(COVERAGE_CITIES[0]);
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 34]);
  const globeY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -72]);
  const waveY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 26]);
  const c = T[lang].sec.coverage;
  const sampleQuery =
    c.sampleQueries[selectedCity.id] ?? selectedCity.sampleQuery;

  return (
    <section id="cobertura" ref={sectionRef} className="pt-8 pb-6">
      <div className="relative overflow-hidden rounded-[28px] md:rounded-[34px] bg-[#EFF4FA] px-5 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-12">
        {/* Soft wave silhouettes */}
        <motion.svg
          style={{ y: waveY }}
          className="pointer-events-none absolute bottom-0 left-0 w-full h-36 opacity-80"
          viewBox="0 0 1200 180"
          preserveAspectRatio="none"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M-40 160C45 85 155 95 235 135C315 175 410 100 510 125C610 150 695 85 810 115C925 145 1030 90 1240 140V190H-40V160Z"
            fill="#E3ECF9"
          />
        </motion.svg>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Copy & Interactive City Buttons */}
          <motion.div style={{ y: copyY }} className="lg:col-span-7">
            <span className="inline-block rounded-full bg-[#3368F7] px-4 py-1 text-[12px] font-bold text-white">
              {c.badge}
            </span>
            <h2 className="section-title mt-4 text-[26px] sm:text-[34px] font-bold leading-[1.16] tracking-[-0.02em] text-[#181D27] [text-wrap:balance]">
              {c.title}
            </h2>
            <p className="mt-3.5 max-w-xl text-[14px] leading-[1.6] text-[#4C5565]">
              {c.p}
            </p>

            {/* Interactive City Selector */}
            <div className="mt-6 flex flex-wrap gap-2">
              {COVERAGE_CITIES.map((city) => {
                const active = city.id === selectedCity.id;
                return (
                  <button
                    key={city.id}
                    type="button"
                    onClick={() => setSelectedCity(city)}
                    className={`rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold transition-all duration-150 cursor-pointer ${
                      active
                        ? 'bg-[#2B62F6] text-white shadow-[0_8px_18px_rgba(43,98,246,0.25)]'
                        : 'bg-white text-[#181D27] hover:bg-[#E1EBFD]'
                    }`}
                  >
                    {city.name}
                  </button>
                );
              })}
            </div>

            {/* Active City Preview Strip */}
            <div className="mt-5 rounded-[18px] bg-white px-4 py-3.5 text-[13px] text-[#181D27] shadow-[0_4px_16px_rgba(24,29,39,0.03)]">
              <span className="font-bold text-[#2B62F6]">{selectedCity.name}:</span>{' '}
              <span className="text-[#4C5565]">{sampleQuery}</span>
            </div>

            <p className="mt-3 text-[12px] text-[#60697A]">
              {c.hint}
            </p>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => onStartOrder(sampleQuery)}
                className="group inline-flex items-center gap-3 rounded-full bg-[#2B62F6] py-2 pl-6 pr-2 text-[13.5px] font-bold text-white shadow-[0_10px_24px_rgba(43,98,246,0.28)] transition-all hover:-translate-y-0.5 hover:bg-[#2457ED] cursor-pointer"
              >
                <span>{c.cta}</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
                  <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
                </span>
              </button>
            </div>
          </motion.div>

          {/* Right Draggable 3D Three.js Globe */}
          <motion.div style={{ y: globeY }} className="lg:col-span-5 relative h-[260px] sm:h-[360px] flex items-center justify-center">
            <Suspense
              fallback={
                <div className="h-full w-full animate-pulse rounded-full bg-[#DCE7FA]" />
              }
            >
              <ThreeGlobe selectedCity={selectedCity} onSelectCity={setSelectedCity} />
            </Suspense>
            <span className="float-chip pointer-events-none absolute bottom-1 left-1/2 -translate-x-1/2 inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3.5 py-1.5 text-[11.5px] font-bold text-[#181D27] shadow-[0_10px_26px_rgba(24,29,39,0.14)] whitespace-nowrap">
              <span className="inline-block h-2 w-2 rounded-full bg-[#EAFC66] ring-1 ring-[#181D27]/15" />
              {c.globeChip(selectedCity.name)}
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
