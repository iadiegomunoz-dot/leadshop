import { ArrowUpRight } from 'lucide-react';
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from 'motion/react';
import { useRef } from 'react';
import { PRICING_PLANS, type PricingPlan } from '../data/siteData';
import { T, type Lang } from '../data/i18n';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
  lang?: Lang;
}

/** 3D tilt card with cursor-tracking glare — 21st.dev "Pricing Plan Tilt" pattern */
function TiltCard({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  const rx = useSpring(useMotionValue(0), { stiffness: 160, damping: 18, mass: 0.6 });
  const ry = useSpring(useMotionValue(0), { stiffness: 160, damping: 18, mass: 0.6 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glareOpacity = useSpring(useMotionValue(0), { stiffness: 200, damping: 25 });
  const glare = useMotionTemplate`radial-gradient(480px circle at ${gx}% ${gy}%, rgba(255,255,255,0.32), rgba(255,255,255,0) 62%)`;

  const handleMove = (e: React.PointerEvent) => {
    if (reduceMotion.current || e.pointerType === 'touch') return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * 9);
    rx.set(-(py - 0.5) * 7);
    gx.set(px * 100);
    gy.set(py * 100);
    glareOpacity.set(1);
  };

  const handleLeave = () => {
    rx.set(0);
    ry.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.article
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={{
        rotateX: rx,
        rotateY: ry,
        transformPerspective: 1100,
        transformStyle: 'preserve-3d',
      }}
      className={className}
    >
      {/* Cursor glare */}
      <motion.div
        aria-hidden="true"
        style={{ backgroundImage: glare, opacity: glareOpacity }}
        className="pointer-events-none absolute inset-0"
      />
      {children}
    </motion.article>
  );
}

export function PricingSection({ onSelectPlan, lang = 'es' }: PricingSectionProps) {
  const p = T[lang].sec.pricing;
  const planText = (id: PricingPlan['id']) =>
    (p.plans as Record<string, { name: string; price: string; subtitle: string; cta: string; features: readonly string[] }>)[id];

  return (
    <section id="precios" className="pt-8 md:pt-12 pb-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-block rounded-full bg-[#3368F7] px-4 py-1 text-[12px] font-bold text-white">
          {p.badge}
        </span>
        <h2 className="section-title mt-3 text-[26px] sm:text-[34px] font-bold leading-[1.18] tracking-[-0.02em] text-[#181D27] [text-wrap:balance]">
          {p.title}
        </h2>
        <p className="mt-2.5 text-[14px] leading-[1.55] text-[#60697A]">
          {p.p}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isBlue = plan.variant === 'blue';
          const isIce = plan.variant === 'ice';
          const isLight = plan.variant === 'light';
          const text = planText(plan.id);

          return (
            <TiltCard
              key={plan.id}
              className={`pricing-card group relative flex flex-col justify-between overflow-hidden rounded-[24px] p-6 sm:p-7 ${
                plan.id === 'custom' ? 'conic-border' : ''
              } ${
                isLight ? 'bg-[#F4F6FA] text-[#181D27]' : ''
              } ${isIce ? 'bg-[#E8EFFD] text-[#181D27]' : ''} ${
                isBlue
                  ? 'blue-card-gradient text-white shadow-[0_18px_40px_rgba(43,98,246,0.24)]'
                  : ''
              }`}
            >
              {/* Soft organic corner petals */}
              <svg
                className="pointer-events-none absolute -bottom-2 -right-2 h-32 w-32"
                viewBox="0 0 140 140"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M140 140H32C40 100 68 74 106 86C116 42 132 24 140 20V140Z"
                  fill={isBlue ? '#497EFF' : isIce ? '#D5E2FB' : '#DDE7FA'}
                  fillOpacity={isBlue ? '0.45' : '0.85'}
                />
              </svg>

              {/* Top */}
              <div className="relative z-10">
                <h3
                  className={`text-center text-[18px] sm:text-[19px] font-bold tracking-[-0.015em] ${
                    isBlue ? 'text-white' : 'text-[#181D27]'
                  }`}
                >
                  {text.name}
                </h3>

                <div className="mt-4 text-center">
                  <div
                    className={`text-[30px] sm:text-[34px] font-extrabold tracking-[-0.025em] tabular-nums ${
                      isBlue ? 'text-white' : 'text-[#2B62F6]'
                    }`}
                  >
                    {text.price}
                  </div>
                  <p
                    className={`mt-1.5 text-[12.5px] leading-[1.45] ${
                      isBlue ? 'text-white/80' : 'text-[#60697A]'
                    }`}
                  >
                    {text.subtitle}
                  </p>
                </div>

                <ul className="mt-6 space-y-3">
                  {text.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-start gap-2.5 text-[13px] leading-[1.45] ${
                        isBlue ? 'text-white/92' : 'text-[#394150]'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full ${
                          isBlue ? 'bg-[#EAFC66]' : 'bg-[#3368F7]'
                        }`}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Bottom CTA */}
              <div className="relative z-10 mt-8 pt-2 text-center">
                <button
                  type="button"
                  onClick={() => onSelectPlan(plan)}
                  className={`group inline-flex w-full max-w-[235px] items-center justify-between gap-3 rounded-full py-1.5 pl-6 pr-1.5 text-[13.5px] font-bold transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isIce
                      ? 'bg-[#2B62F6] text-white shadow-[0_10px_24px_rgba(43,98,246,0.28)] hover:bg-[#2457ED] focus-visible:outline-[#2B62F6]'
                      : 'bg-white text-[#181D27] shadow-[0_8px_22px_rgba(24,29,39,0.08)] hover:shadow-[0_12px_26px_rgba(24,29,39,0.12)] focus-visible:outline-[#2B62F6]'
                  }`}
                >
                  <span className="whitespace-nowrap">{text.cta}</span>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12 group-hover:scale-105">
                    <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
                  </span>
                </button>
              </div>
            </TiltCard>
          );
        })}
      </div>

      {/* Bottom Validation Banner */}
      <div className="reveal-card lime-card-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[24px] p-6 sm:px-8">
        <p className="text-[15px] sm:text-[17px] font-bold text-[#181D27] [text-wrap:balance]">
          {p.banner}
        </p>
        <button
          type="button"
          onClick={() => onSelectPlan(PRICING_PLANS[0])}
          className="group self-start sm:self-auto inline-flex items-center gap-3 rounded-full bg-[#181D27] py-2 pl-5 pr-2 text-[13.5px] font-bold text-white hover:bg-[#2B62F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>{p.bannerBtn}</span>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
            <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
          </span>
        </button>
      </div>
    </section>
  );
}
