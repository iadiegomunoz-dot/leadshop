import { ArrowUpRight } from 'lucide-react';
import { PRICING_PLANS, type PricingPlan } from '../data/zleadsData';

interface PricingSectionProps {
  onSelectPlan: (plan: PricingPlan) => void;
}

export function PricingSection({ onSelectPlan }: PricingSectionProps) {
  return (
    <section id="precios" className="pt-8 md:pt-12 pb-10 space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-block rounded-full bg-[#3368F7] px-4 py-1 text-[12px] font-bold text-white">
          Precio simple
        </span>
        <h2 className="section-title mt-3 text-[26px] sm:text-[34px] font-bold leading-[1.18] tracking-[-0.02em] text-[#181D27] [text-wrap:balance]">
          Pagas por clientes verificados
        </h2>
        <p className="mt-2.5 text-[14px] leading-[1.55] text-[#60697A]">
          Packs de 10 a 50 clientes, o volumen a medida. Sin suscripción ni letra chica.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-stretch">
        {PRICING_PLANS.map((plan) => {
          const isBlue = plan.variant === 'blue';
          const isIce = plan.variant === 'ice';
          const isLight = plan.variant === 'light';

          return (
            <article
              key={plan.id}
              className={`pricing-card relative flex flex-col justify-between overflow-hidden rounded-[24px] p-6 sm:p-7 transition-transform duration-200 hover:-translate-y-1 ${
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
                  {plan.name}
                </h3>

                <div className="mt-4 text-center">
                  <div
                    className={`text-[30px] sm:text-[34px] font-extrabold tracking-[-0.025em] tabular-nums ${
                      isBlue ? 'text-white' : 'text-[#2B62F6]'
                    }`}
                  >
                    {plan.price}
                  </div>
                  <p
                    className={`mt-1.5 text-[12.5px] leading-[1.45] ${
                      isBlue ? 'text-white/80' : 'text-[#60697A]'
                    }`}
                  >
                    {plan.subtitle}
                  </p>
                </div>

                <ul className="mt-6 space-y-3">
                  {plan.features.map((feature) => (
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
                  <span className="whitespace-nowrap">{plan.ctaLabel}</span>
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12 group-hover:scale-105">
                    <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
                  </span>
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom Validation Banner */}
      <div className="reveal-card lime-card-surface flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-[24px] p-6 sm:px-8">
        <p className="text-[15px] sm:text-[17px] font-bold text-[#181D27] [text-wrap:balance]">
          Define el cliente ideal, los canales y el volumen. Nosotros validamos el resto.
        </p>
        <button
          type="button"
          onClick={() => onSelectPlan(PRICING_PLANS[0])}
          className="group self-start sm:self-auto inline-flex items-center gap-3 rounded-full bg-[#181D27] py-2 pl-5 pr-2 text-[13.5px] font-bold text-white hover:bg-[#2B62F6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
        >
          <span>Armar mi base</span>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
            <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
          </span>
        </button>
      </div>
    </section>
  );
}
