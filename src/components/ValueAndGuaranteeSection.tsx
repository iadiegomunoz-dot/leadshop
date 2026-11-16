import { ArrowUpRight, Languages, MapPin } from 'lucide-react';
import { GUARANTEES } from '../data/zleadsData';

interface ValueAndGuaranteeSectionProps {
  onOpenSample: () => void;
  onStartOrder: () => void;
}

export function ValueAndGuaranteeSection({
  onOpenSample,
  onStartOrder,
}: ValueAndGuaranteeSectionProps) {
  return (
    <div className="space-y-12 pt-10 md:pt-14 pb-6">
      {/* LatAm + bilingual focus strip */}
      <section className="reveal-card rounded-[24px] bg-[#EFF4FA] px-6 py-7 sm:px-9 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="flex items-start gap-4 max-w-xl">
            <div className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl blue-card-gradient text-[#EAFC66]">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-[19px] sm:text-[22px] font-bold tracking-[-0.015em] text-[#181D27] [text-wrap:balance]">
                Hecho para Latinoamérica, en español e inglés
              </h2>
              <p className="mt-2 text-[13.5px] leading-[1.6] text-[#4C5565]">
                Armamos bases para ciudades de toda la región —Buenos Aires, CDMX,
                Bogotá, São Paulo, Miami, Madrid y más—. Escribe tu pedido en el idioma
                que prefieras y te respondemos en el tuyo.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2B62F6] px-4 py-1.5 text-[12px] font-bold text-white">
              <Languages className="h-3.5 w-3.5" />
              ES · EN
            </span>
            <button
              type="button"
              onClick={onStartOrder}
              className="group inline-flex items-center gap-2 text-[13.5px] font-bold text-[#2B62F6] hover:text-[#181D27] transition-colors whitespace-nowrap cursor-pointer"
            >
              <span>Desde US$5,99 · Armar mi base</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Sin letra chica — 4 Guarantee Cards */}
      <section className="pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="section-title text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] text-[#181D27]">
              Sin{' '}
              <span className="inline-block rounded-full bg-[#EAFC66] px-4 py-0.5 text-[#181D27]">
                letra chica
              </span>
            </h2>
            <p className="mt-2 text-[14px] text-[#60697A]">
              Pagas solo por clientes verificados y utilizables desde el primer pedido
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenSample}
            className="group self-start sm:self-auto inline-flex items-center gap-2.5 rounded-full bg-[#EFF4FA] py-1.5 pl-5 pr-1.5 text-[13px] font-bold text-[#181D27] hover:bg-[#E2EBFA] transition-colors cursor-pointer"
          >
            <span className="whitespace-nowrap">Probar con 5 clientes gratis</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
            </span>
          </button>
        </div>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {GUARANTEES.map((card) => {
            const isBlue = card.variant === 'blue';
            const isLime = card.variant === 'lime';
            const isIce = card.variant === 'ice';

            return (
              <div
                key={card.id}
                className={`audience-card flex flex-col justify-between rounded-[22px] p-6 transition-transform duration-200 hover:-translate-y-1 ${
                  card.variant === 'white' ? 'bg-[#F4F6FA] text-[#181D27]' : ''
                } ${isIce ? 'bg-[#E8EFFD] text-[#181D27]' : ''} ${
                  isLime ? 'lime-card-surface text-[#181D27]' : ''
                } ${isBlue ? 'blue-card-gradient text-white' : ''}`}
              >
                <h3 className="text-[16px] font-bold leading-[1.3] tracking-[-0.015em]">
                  {card.title}
                </h3>
                <p
                  className={`mt-5 text-[13px] leading-[1.5] ${
                    isBlue ? 'text-white/85' : 'text-[#4C5565]'
                  }`}
                >
                  {card.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
