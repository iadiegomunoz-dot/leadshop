import { ArrowUpRight } from 'lucide-react';
import { GUARANTEES } from '../data/siteData';
import { T, type Lang } from '../data/i18n';

interface ValueAndGuaranteeSectionProps {
  onOpenSample: () => void;
  lang?: Lang;
}

export function ValueAndGuaranteeSection({ onOpenSample, lang = 'es' }: ValueAndGuaranteeSectionProps) {
  const g = T[lang].sec.guarantees;
  const cardText = g.cards as Record<string, { title: string; desc: string }>;

  return (
    <div className="space-y-12 pt-10 md:pt-14 pb-6">
      {/* Sin letra chica — 4 Guarantee Cards */}
      <section className="pt-2">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="section-title text-[26px] sm:text-[32px] font-bold tracking-[-0.02em] text-[#181D27]">
              {g.titleA}{' '}
              <span className="inline-block rounded-full bg-[#EAFC66] px-4 py-0.5 text-[#181D27]">
                {g.titleB}
              </span>
            </h2>
            <p className="mt-2 text-[14px] text-[#60697A]">
              {g.sub}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenSample}
            className="group self-start sm:self-auto inline-flex items-center gap-2.5 rounded-full bg-[#EFF4FA] py-1.5 pl-5 pr-1.5 text-[13px] font-bold text-[#181D27] hover:bg-[#E2EBFA] transition-colors cursor-pointer"
          >
            <span className="whitespace-nowrap">{g.btn}</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
            </span>
          </button>
        </div>

        <div className="mt-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
          {GUARANTEES.map((card) => {
            const text = cardText[card.id] ?? cardText[card.id.replace(/-/g, '')];
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
                  {text?.title ?? card.title}
                </h3>
                <p
                  className={`mt-5 text-[13px] leading-[1.5] ${
                    isBlue ? 'text-white/85' : 'text-[#4C5565]'
                  }`}
                >
                  {text?.desc ?? card.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
