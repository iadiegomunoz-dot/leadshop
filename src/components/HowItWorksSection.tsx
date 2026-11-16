import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { WORKFLOW_STEPS } from '../data/zleadsData';

interface HowItWorksSectionProps {
  onStartOrder: (presetQuery?: string) => void;
}

const PRESET_EXAMPLES = [
  {
    label: 'Clínicas · CABA',
    text: 'Vendo software de gestión a clínicas en Buenos Aires. Necesito 300 clientes potenciales con WhatsApp verificado, sitio web y 4+ estrellas.',
    parsed: { rubro: 'Clínicas', zona: 'CABA', volumen: '300 clientes', canales: 'WhatsApp · Web' },
  },
  {
    label: 'Estudios · Miami',
    text: 'Busco estudios de arquitectura e interiorismo en Miami con sitio web, WhatsApp e Instagram activo.',
    parsed: { rubro: 'Arquitectura', zona: 'Miami', volumen: '150 clientes', canales: 'WhatsApp · Web · Instagram' },
  },
  {
    label: 'Agencias · Madrid',
    text: 'Quiero contactar agencias de marketing y software en Madrid con LinkedIn, email corporativo y sitio web.',
    parsed: { rubro: 'Agencias B2B', zona: 'Madrid', volumen: '200 clientes', canales: 'LinkedIn · Email · Web' },
  },
];

export function HowItWorksSection({ onStartOrder }: HowItWorksSectionProps) {
  const [activePresetIdx, setActivePresetIdx] = useState(0);
  const [customPrompt, setCustomPrompt] = useState(PRESET_EXAMPLES[0].text);

  const selectPreset = (idx: number) => {
    setActivePresetIdx(idx);
    setCustomPrompt(PRESET_EXAMPLES[idx].text);
  };

  const activeParsed = PRESET_EXAMPLES[activePresetIdx].parsed;

  return (
    <section id="como-funciona" className="pt-10 md:pt-14 pb-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-block rounded-full bg-[#EAFC66] px-4 py-1 text-[12px] font-bold text-[#181D27]">
          Cómo funciona
        </span>
        <h2 className="section-title mt-3 text-[26px] sm:text-[34px] font-bold leading-[1.18] tracking-[-0.02em] text-[#181D27] [text-wrap:balance]">
          Tu base lista en 4 pasos simples
        </h2>
        <p className="mt-2.5 text-[14px] leading-[1.55] text-[#60697A]">
          Una base sirve cuando tu equipo sabe por qué contactar a cada empresa y tiene el
          canal para hacerlo.
        </p>
      </div>

      {/* Interactive Order Prompt Card (Ejemplo de pedido) */}
      <div className="reveal-card rounded-[26px] bg-[#EFF4FA] p-5 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[12.5px] font-bold text-[#2B62F6]">
                Ejemplo de pedido
              </span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_EXAMPLES.map((ex, idx) => (
                  <button
                    key={ex.label}
                    type="button"
                    onClick={() => selectPreset(idx)}
                    className={`rounded-full px-3 py-1 text-[11.5px] font-semibold transition-colors cursor-pointer ${
                      activePresetIdx === idx
                        ? 'bg-[#2B62F6] text-white'
                        : 'bg-white text-[#181D27] hover:bg-[#DCE7FA]'
                    }`}
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>

            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              rows={3}
              aria-label="Ejemplo de pedido en texto libre"
              className="mt-3 w-full resize-none rounded-[18px] border border-slate-200/80 bg-white px-4 py-3 text-base sm:text-[13.5px] leading-[1.5] text-[#181D27] outline-none focus:border-[#2B62F6]"
            />

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#60697A]">
              <span>Campos rápidos:</span>
              <span className="font-semibold text-[#181D27]">Cliente ideal</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#181D27]">Zona</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#181D27]">WhatsApp</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#181D27]">Web</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#181D27]">LinkedIn</span>
            </div>
          </div>

          {/* Detected Filters Preview */}
          <div className="lg:col-span-5 rounded-[22px] bg-white p-5 sm:p-6 shadow-[0_6px_22px_rgba(24,29,39,0.04)]">
            <div className="text-[12px] font-bold text-[#2B62F6]">
              Filtros detectados automáticamente
            </div>
            <dl className="mt-3.5 space-y-2.5 text-[13px]">
              <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                <dt className="text-[#60697A]">Cliente ideal</dt>
                <dd className="font-bold text-[#181D27]">{activeParsed.rubro}</dd>
              </div>
              <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                <dt className="text-[#60697A]">Zona</dt>
                <dd className="font-bold text-[#181D27]">{activeParsed.zona}</dd>
              </div>
              <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                <dt className="text-[#60697A]">Volumen sugerido</dt>
                <dd className="font-bold text-[#181D27] tabular-nums">{activeParsed.volumen}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#60697A]">Canales</dt>
                <dd className="font-bold text-[#2B62F6]">{activeParsed.canales}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => onStartOrder(customPrompt)}
              className="group mt-5 flex w-full items-center justify-between rounded-full bg-[#2B62F6] py-1.5 pl-5 pr-1.5 text-[13px] font-bold text-white hover:bg-[#2457ED] transition-colors cursor-pointer"
            >
              <span>Validar este pedido</span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Steps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-stretch">
        {WORKFLOW_STEPS.map((step) => {
          const isBlue = step.variant === 'blue';
          const isLime = step.variant === 'lime';
          const isIce = step.variant === 'ice';

          return (
            <article
              key={step.number}
              className={`why-card relative flex flex-col justify-between overflow-hidden rounded-[24px] p-6 sm:p-7 ${
                step.variant === 'white'
                  ? 'bg-[#F4F6FA] text-[#181D27]'
                  : isIce
                  ? 'bg-[#E8EFFD] text-[#181D27]'
                  : isLime
                  ? 'lime-card-surface text-[#181D27]'
                  : 'blue-card-gradient text-white'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={`text-[22px] font-extrabold tabular-nums ${
                      isBlue
                        ? 'text-[#EAFC66]'
                        : isLime
                        ? 'text-[#181D27]'
                        : 'text-[#2B62F6]'
                    }`}
                  >
                    {step.number}
                  </span>
                  <span
                    className={`text-[11px] font-bold tracking-wide ${
                      isBlue ? 'text-white/75' : 'text-[#60697A]'
                    }`}
                  >
                    {step.stepLabel}
                  </span>
                </div>

                <h3 className="mt-3 text-[19px] sm:text-[21px] font-bold leading-[1.24] tracking-[-0.015em]">
                  {step.title}
                </h3>
                <p
                  className={`mt-2.5 text-[13.5px] leading-[1.55] ${
                    isBlue ? 'text-white/85' : 'text-[#4C5565]'
                  }`}
                >
                  {step.description}
                </p>
              </div>

              {/* Clean typographic metadata strip */}
              <div
                className={`mt-6 pt-4 border-t text-[12px] font-semibold flex flex-wrap items-center gap-x-2 gap-y-1 ${
                  isBlue
                    ? 'border-white/15 text-[#EAFC66]'
                    : isLime
                    ? 'border-[#181D27]/15 text-[#181D27]'
                    : 'border-slate-200/80 text-[#2B62F6]'
                }`}
              >
                {step.highlights.map((item, idx) => (
                  <span key={item} className="inline-flex items-center gap-2">
                    <span>{item}</span>
                    {idx < step.highlights.length - 1 && (
                      <span aria-hidden="true" className="opacity-45">
                        ·
                      </span>
                    )}
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
