import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { WORKFLOW_STEPS } from '../data/siteData';
import { T, type Lang } from '../data/i18n';

interface HowItWorksSectionProps {
  onStartOrder: (presetQuery?: string) => void;
  lang?: Lang;
}

export function HowItWorksSection({ onStartOrder, lang = 'es' }: HowItWorksSectionProps) {
  const h = T[lang].sec.how;
  const [activePresetIdx, setActivePresetIdx] = useState(0);
  const [customPrompt, setCustomPrompt] = useState<string>(h.presets[0].text);

  // Reset the demo prompt when the language changes
  useEffect(() => {
    setActivePresetIdx(0);
    setCustomPrompt(h.presets[0].text);
  }, [lang]); // eslint-disable-line react-hooks/exhaustive-deps
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 55%'],
  });
  const lineScale = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    mass: 0.5,
  });

  const selectPreset = (idx: number) => {
    setActivePresetIdx(idx);
    setCustomPrompt(h.presets[idx].text);
  };

  const activeParsed = h.presets[activePresetIdx].parsed;

  return (
    <section id="como-funciona" className="pt-10 md:pt-14 pb-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="inline-block rounded-full bg-[#EAFC66] px-4 py-1 text-[12px] font-bold text-[#181D27]">
          {h.badge}
        </span>
        <h2 className="section-title mt-3 text-[26px] sm:text-[34px] font-bold leading-[1.18] tracking-[-0.02em] text-[#181D27] [text-wrap:balance]">
          {h.title}
        </h2>
        <p className="mt-2.5 text-[14px] leading-[1.55] text-[#60697A]">
          {h.p}
        </p>
      </div>

      {/* Interactive Order Prompt Card (Ejemplo de pedido) */}
      <div className="reveal-card rounded-[26px] bg-[#EFF4FA] p-5 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-7">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-[12.5px] font-bold text-[#2B62F6]">
                {h.exampleBadge}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {h.presets.map((ex, idx) => (
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
              aria-label={h.exampleBadge}
              className="mt-3 w-full resize-none rounded-[18px] border border-slate-200/80 bg-white px-4 py-3 text-base sm:text-[13.5px] leading-[1.5] text-[#181D27] outline-none focus:border-[#2B62F6]"
            />

            <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-[#60697A]">
              <span>{h.quickFields}</span>
              <span className="font-semibold text-[#181D27]">{h.parsed.ideal}</span>
              <span aria-hidden="true">·</span>
              <span className="font-semibold text-[#181D27]">{h.parsed.zone}</span>
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
              {h.parsedTitle}
            </div>
            <dl className="mt-3.5 space-y-2.5 text-[13px]">
              <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                <dt className="text-[#60697A]">{h.parsed.ideal}</dt>
                <dd className="font-bold text-[#181D27]">{activeParsed.rubro}</dd>
              </div>
              <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                <dt className="text-[#60697A]">{h.parsed.zone}</dt>
                <dd className="font-bold text-[#181D27]">{activeParsed.zona}</dd>
              </div>
              <div className="flex justify-between gap-2 border-b border-slate-100 pb-2">
                <dt className="text-[#60697A]">{h.parsed.volume}</dt>
                <dd className="font-bold text-[#181D27] tabular-nums">{activeParsed.volumen}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-[#60697A]">{h.parsed.channels}</dt>
                <dd className="font-bold text-[#2B62F6]">{activeParsed.canales}</dd>
              </div>
            </dl>

            <button
              type="button"
              onClick={() => onStartOrder(customPrompt)}
              className="group mt-5 flex w-full items-center justify-between rounded-full bg-[#2B62F6] py-1.5 pl-5 pr-1.5 text-[13px] font-bold text-white hover:bg-[#2457ED] transition-colors cursor-pointer"
            >
              <span>{h.validateBtn}</span>
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Steps — Vertical Timeline with scroll progress */}
      <div ref={timelineRef} className="relative mx-auto max-w-3xl">
        {/* Rail track */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-[23px] top-8 w-px bg-[#DCE7FA]"
        />
        {/* Progress line that fills as you scroll */}
        <motion.div
          aria-hidden="true"
          style={{ scaleY: lineScale }}
          className="absolute bottom-8 left-[23px] top-8 w-px origin-top bg-gradient-to-b from-[#EAFC66] via-[#2B62F6] to-[#3368F7]"
        />

        <div className="space-y-6">
          {WORKFLOW_STEPS.map((step, idx) => {
            const stepText = h.steps[idx];
            const isBlue = step.variant === 'blue';
            const isLime = step.variant === 'lime';
            const isIce = step.variant === 'ice';

            const nodeClass = isBlue
              ? 'blue-card-gradient text-white'
              : isLime
              ? 'lime-card-surface text-[#181D27]'
              : isIce
              ? 'bg-[#E8EFFD] text-[#2B62F6]'
              : 'bg-white text-[#2B62F6]';

            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -28 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-70px' }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex items-center gap-5"
              >
                {/* Timeline node */}
                <motion.span
                  aria-hidden="true"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-70px' }}
                  transition={{
                    type: 'spring',
                    stiffness: 320,
                    damping: 18,
                    delay: idx * 0.08 + 0.1,
                  }}
                  className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-[15px] font-extrabold tabular-nums shadow-[0_8px_20px_rgba(24,29,39,0.14)] ring-4 ring-[#F8FAFD] ${nodeClass}`}
                >
                  {step.number}
                </motion.span>

                {/* Step card */}
                <article
                  className={`flex flex-1 flex-col justify-between overflow-hidden rounded-[22px] p-5 sm:p-6 ${
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
                    <span
                      className={`text-[10.5px] font-bold tracking-[0.12em] uppercase ${
                        isBlue ? 'text-[#EAFC66]' : 'text-[#2B62F6]'
                      }`}
                    >
                      {h.stepLabel(idx + 1)}
                    </span>
                    <h3 className="mt-2 text-[16.5px] sm:text-[17.5px] font-bold leading-[1.28] tracking-[-0.015em]">
                      {stepText.title}
                    </h3>
                    <p
                      className={`mt-2 text-[12.5px] leading-[1.55] ${
                        isBlue ? 'text-white/85' : 'text-[#4C5565]'
                      }`}
                    >
                      {stepText.description}
                    </p>
                  </div>

                  {/* Metadata strip */}
                  <div
                    className={`mt-4 pt-3 border-t text-[11.5px] font-semibold flex flex-wrap items-center gap-x-2 gap-y-1 ${
                      isBlue
                        ? 'border-white/15 text-[#EAFC66]'
                        : isLime
                        ? 'border-[#181D27]/15 text-[#181D27]'
                        : 'border-slate-200/80 text-[#2B62F6]'
                    }`}
                  >
                    {stepText.highlights.map((item, hIdx) => (
                      <span key={item} className="inline-flex items-center gap-2">
                        <span>{item}</span>
                        {hIdx < stepText.highlights.length - 1 && (
                          <span aria-hidden="true" className="opacity-45">
                            ·
                          </span>
                        )}
                      </span>
                    ))}
                  </div>
                </article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
