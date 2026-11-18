import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { useEffect } from 'react';
import { TERMS } from '../data/terms';
import type { Lang } from '../data/i18n';

interface TermsModalProps {
  isOpen: boolean;
  lang: Lang;
  onClose: () => void;
}

export function TermsModal({ isOpen, lang, onClose }: TermsModalProps) {
  const t = TERMS[lang];

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center p-0 sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label={t.title}
        >
          <button
            type="button"
            aria-label={lang === 'es' ? 'Cerrar términos' : 'Close terms'}
            onClick={onClose}
            className="absolute inset-0 bg-[#181D27]/50 backdrop-blur-sm cursor-default"
          />
          <motion.div
            initial={{ opacity: 0, y: 48, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 32, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 30 }}
            className="relative flex max-h-[88vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-[24px] sm:rounded-[24px] bg-white shadow-[0_32px_80px_rgba(24,29,39,0.35)]"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-[20px] font-extrabold tracking-[-0.02em] text-[#181D27]">
                  {t.title}
                </h2>
                <p className="mt-1 text-[12.5px] text-[#60697A]">
                  LeadShop
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-[#181D27] transition-colors hover:bg-slate-200 cursor-pointer"
                aria-label={lang === 'es' ? 'Cerrar' : 'Close'}
              >
                <X className="h-4.5 w-4.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5">
              <p className="text-[13.5px] leading-[1.7] text-[#4C5565]">{t.intro}</p>
              <div className="mt-5 space-y-5">
                {t.sections.map((s) => (
                  <div key={s.title}>
                    <h3 className="text-[14px] font-bold text-[#181D27]">{s.title}</h3>
                    {s.body.map((p, i) => (
                      <p key={i} className="mt-1.5 text-[13px] leading-[1.65] text-[#4C5565]">
                        {p}
                      </p>
                    ))}
                  </div>
                ))}
              </div>
              <p className="mt-6 rounded-xl bg-slate-50 px-4 py-3 text-[12.5px] leading-[1.6] text-[#60697A]">
                {t.contact}
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
