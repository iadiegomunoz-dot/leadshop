import { ArrowUpRight, Minus, Plus } from 'lucide-react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef, useState } from 'react';
import { T, type Lang } from '../data/i18n';

interface FaqAndContactSectionProps {
  onNavigateToPricing: () => void;
  onStartOrder: () => void;
  lang?: Lang;
}

export function FaqAndContactSection({ onNavigateToPricing, onStartOrder, lang = 'es' }: FaqAndContactSectionProps) {
  const fc = T[lang].sec.faqContact;
  const FAQ_ITEMS = fc.faqItems;
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ['start end', 'end start'],
  });
  const blobA = useTransform(ctaProgress, [0, 1], reduceMotion ? [0, 0] : [0, -56]);
  const blobB = useTransform(ctaProgress, [0, 1], reduceMotion ? [0, 0] : [0, 48]);

  return (
    <div className="space-y-12 pt-4 pb-6">
      {/* FAQ Section: Antes de armar tu base */}
      <section id="preguntas" className="rounded-[28px] bg-[#EFF4FA] p-6 sm:p-8 lg:p-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="section-title text-[25px] sm:text-[32px] font-bold tracking-[-0.02em] text-[#181D27]">
            {fc.faqTitleA}{' '}
            <span className="inline-block rounded-full bg-[#EAFC66] px-4 py-0.5 text-[#181D27]">
              {fc.faqTitleB}
            </span>
          </h2>
        </div>

        <div className="mt-7 max-w-3xl mx-auto space-y-2.5">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openFaqId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-[18px] bg-white transition-shadow duration-150"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaqId(isOpen ? null : item.id)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[#2B62F6]"
                >
                  <span className="text-[14px] sm:text-[15px] font-bold text-[#181D27]">
                    {item.question}
                  </span>
                  <span
                    className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-colors ${
                      isOpen
                        ? 'bg-[#2B62F6] text-white'
                        : 'bg-[#EFF4FA] text-[#181D27]'
                    }`}
                  >
                    {isOpen ? <Minus className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.32, 0.72, 0, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 pb-4 text-[13.5px] leading-[1.6] text-[#4C5565]">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quiet bottom utility links */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-[12.5px] font-medium text-[#60697A]">
          <button
            type="button"
            onClick={() => setOpenFaqId(FAQ_ITEMS[0].id)}
            className="hover:text-[#2B62F6] transition-colors cursor-pointer"
          >
            {fc.faqLinks[0]}
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={onNavigateToPricing}
            className="hover:text-[#2B62F6] transition-colors cursor-pointer"
          >
            {fc.faqLinks[1]}
          </button>
          <span aria-hidden="true">·</span>
          <a href="#como-funciona" className="hover:text-[#2B62F6] transition-colors">
            {fc.faqLinks[2]}
          </a>
        </div>
      </section>

      {/* Contact Section: Hablemos */}
      <section id="hablemos">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-[#3368F7] px-4 py-1 text-[12px] font-bold text-white">
            {fc.contactBadge}
          </span>
          <h2 className="section-title mt-3 text-[26px] sm:text-[34px] font-bold leading-[1.18] tracking-[-0.02em] text-[#181D27]">
            {fc.contactTitle}
          </h2>
          <p className="mt-2 text-[14px] text-[#60697A]">
            {fc.contactP}
          </p>
        </div>

        <div className="mt-8 max-w-4xl mx-auto">
          {/* Big CTA box → order wizard */}
          <div ref={ctaRef} className="relative overflow-hidden rounded-[28px] bg-[#2B62F6] p-6 sm:p-12 flex flex-col items-center text-center shadow-[0_18px_44px_rgba(43,98,246,0.28)]">
            <motion.div
              style={{ y: blobA }}
              aria-hidden="true"
              className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/[0.06] blur-2xl"
            />
            <motion.div
              style={{ y: blobB }}
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-[#EAFC66]/10 blur-2xl"
            />
            <div className="relative">
              <span className="inline-block rounded-full bg-[#EAFC66] px-3.5 py-1 text-[11.5px] font-extrabold uppercase tracking-[0.08em] text-[#181D27]">
                {fc.ctaBadge}
              </span>
              <h3 className="mt-4 text-[24px] sm:text-[30px] font-extrabold leading-[1.15] tracking-[-0.02em] text-white">
                {fc.ctaTitle}
              </h3>
              <p className="mt-3 max-w-lg text-[14px] leading-[1.6] text-white">
                {fc.ctaP}
              </p>
              <button
                type="button"
                onClick={onStartOrder}
                className="group mt-7 inline-flex w-full sm:w-auto items-center justify-between gap-5 rounded-full bg-white py-3.5 pl-8 pr-2 text-[15px] font-extrabold text-[#181D27] shadow-lg transition-transform duration-150 hover:scale-[1.02] active:scale-[0.99] cursor-pointer"
              >
                <span>{fc.ctaBtn}</span>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
                  <ArrowUpRight className="h-4.5 w-4.5 stroke-[2.4]" />
                </span>
              </button>
              <p className="mt-4 text-[12px] font-medium text-white/90">
                {fc.ctaNote}
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
