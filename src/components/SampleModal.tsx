import { ArrowUpRight, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect } from 'react';
import { SAMPLE_PREVIEW_ROWS } from '../data/siteData';
import { T, type Lang } from '../data/i18n';

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCustom: () => void;
  lang?: Lang;
}

export function SampleModal({ isOpen, onClose, onOrderCustom, lang = 'es' }: SampleModalProps) {
  const m = T[lang].sec.modals;
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0F1B3D]/55 p-0 sm:p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="sample-modal-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 56, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        className="relative w-full max-w-3xl max-h-[92dvh] overflow-y-auto rounded-t-[28px] sm:rounded-[28px] bg-white p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={m.closeSample}
          className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EFF4FA] text-[#181D27] hover:bg-[#DCE7FA] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="inline-block rounded-full bg-[#EAFC66] px-3.5 py-1 text-[12px] font-bold text-[#181D27]">
          {m.sampleBadge}
        </div>
        <h3
          id="sample-modal-title"
          className="mt-3 text-[21px] sm:text-[24px] font-bold text-[#181D27]"
        >
          {m.sampleTitle}
        </h3>
        <p className="mt-1 text-[13.5px] text-[#60697A]">
          {m.sampleSub}
        </p>

        <div className="mt-5 overflow-x-auto rounded-[18px] border border-slate-200/80">
          <table className="w-full text-left text-[12.5px]">
            <thead className="bg-[#EFF4FA] text-[#181D27]">
              <tr>
                <th className="px-4 py-3 font-bold">{m.thBusiness}</th>
                <th className="px-4 py-3 font-bold">{m.thWhatsapp}</th>
                <th className="px-4 py-3 font-bold">{m.thWeb}</th>
                <th className="px-4 py-3 font-bold tabular-nums">{m.thRating}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {SAMPLE_PREVIEW_ROWS.map((row) => (
                <tr key={row.business} className="hover:bg-[#F8FAFD]">
                  <td className="px-4 py-3">
                    <div className="font-bold text-[#181D27]">{row.business}</div>
                    <div className="text-[11.5px] text-[#60697A]">{row.city}</div>
                  </td>
                  <td className="px-4 py-3 font-medium text-[#2B62F6] tabular-nums whitespace-nowrap">
                    {row.whatsapp}
                  </td>
                  <td className="px-4 py-3 text-[#4C5565] whitespace-nowrap">{row.website}</td>
                  <td className="px-4 py-3 font-semibold text-[#181D27] tabular-nums whitespace-nowrap">
                    {row.rating}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="text-[12.5px] text-[#60697A]">
            {m.sampleBottom}
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOrderCustom();
            }}
            className="group inline-flex items-center gap-3 rounded-full bg-[#2B62F6] py-2 pl-5 pr-2 text-[13.5px] font-bold text-white hover:bg-[#2457ED] transition-colors cursor-pointer"
          >
            <span>{m.sampleBtn}</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
