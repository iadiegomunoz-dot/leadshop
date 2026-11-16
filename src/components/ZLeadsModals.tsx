import confetti from 'canvas-confetti';
import { ArrowUpRight, CheckCircle2, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';
import {
  PRICING_PLANS,
  SAMPLE_PREVIEW_ROWS,
  type PricingPlan,
} from '../data/zleadsData';

interface OrderModalProps {
  isOpen: boolean;
  initialPlan: PricingPlan;
  initialQuery?: string;
  onClose: () => void;
}

export function OrderModal({
  isOpen,
  initialPlan,
  initialQuery = '',
  onClose,
}: OrderModalProps) {
  const [selectedPlanId, setSelectedPlanId] = useState<PricingPlan['id']>(initialPlan.id);
  const [queryText, setQueryText] = useState(initialQuery);
  const [contact, setContact] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    setSelectedPlanId(initialPlan.id);
    setQueryText(initialQuery);
    setSubmitted(false);
    setError('');
  }, [initialPlan, initialQuery, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const activePlan =
    PRICING_PLANS.find((p) => p.id === selectedPlanId) ?? PRICING_PLANS[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (queryText.trim().length < 4) {
      setError('Describí tu rubro y ciudad (ej. clínicas en Buenos Aires).');
      return;
    }
    const c = contact.trim();
    const isValidContact =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) ||
      /^\+?[0-9\s\-()]{8,}$/.test(c) ||
      /^@[a-zA-Z0-9_]{3,}$/.test(c);

    if (!isValidContact) {
      setError('Ingresá un email o WhatsApp válido para enviarte la base.');
      return;
    }

    setError('');
    setSubmitted(true);
    confetti({
      particleCount: 55,
      spread: 65,
      origin: { y: 0.6 },
      colors: ['#2B62F6', '#EAFC66', '#FFFFFF'],
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-[#0F1B3D]/55 p-0 sm:p-4 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-modal-title"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 56, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 340, damping: 32 }}
        className="relative w-full max-w-lg max-h-[92dvh] overflow-y-auto rounded-t-[28px] sm:rounded-[28px] bg-white p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar ventana"
          className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EFF4FA] text-[#181D27] hover:bg-[#DCE7FA] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {submitted ? (
          <div className="py-6 text-center">
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27]">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3
              id="order-modal-title"
              className="mt-4 text-[22px] font-bold text-[#181D27]"
            >
              ¡Pedido recibido!
            </h3>
            <p className="mt-2 text-[14px] leading-[1.55] text-[#60697A]">
              Estamos validando el universo para{' '}
              <span className="font-semibold text-[#181D27]">«{queryText}»</span> en el
              plan <span className="font-semibold text-[#2B62F6]">{activePlan.name}</span>.
              Te avisamos a <span className="font-semibold text-[#181D27]">{contact}</span>{' '}
              antes de cobrar.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-[#2B62F6] px-7 py-2.5 text-[14px] font-bold text-white hover:bg-[#2457ED] transition-colors cursor-pointer"
            >
              Listo
            </button>
          </div>
        ) : (
          <>
            <div className="inline-block rounded-full bg-[#EAFC66] px-3.5 py-1 text-[12px] font-bold text-[#181D27]">
              Armar mi base
            </div>
            <h3
              id="order-modal-title"
              className="mt-3 text-[22px] sm:text-[24px] font-bold text-[#181D27]"
            >
              Conseguir clientes verificados
            </h3>
            <p className="mt-1 text-[13.5px] text-[#60697A]">
              Validamos el alcance en tu rubro y zona antes de confirmar el pago
            </p>

            {/* Plan Switcher */}
            <div className="mt-5 grid grid-cols-3 gap-2 rounded-2xl bg-[#EFF4FA] p-1.5">
              {PRICING_PLANS.map((plan) => {
                const active = plan.id === selectedPlanId;
                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelectedPlanId(plan.id)}
                    className={`rounded-xl px-2 py-2 text-center transition-all cursor-pointer ${
                      active
                        ? 'bg-[#2B62F6] text-white shadow-sm'
                        : 'text-[#181D27] hover:bg-white/70'
                    }`}
                  >
                    <div className="text-[11.5px] font-bold truncate">{plan.name}</div>
                    <div
                      className={`text-[11px] font-semibold tabular-nums ${
                        active ? 'text-[#EAFC66]' : 'text-[#60697A]'
                      }`}
                    >
                      {plan.price}
                    </div>
                  </button>
                );
              })}
            </div>

            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor="order-query"
                  className="block text-[12.5px] font-semibold text-[#181D27]"
                >
                  ¿A quién quieres venderle? (Rubro, zona y canales)
                </label>
                <textarea
                  id="order-query"
                  rows={2}
                  value={queryText}
                  onChange={(e) => setQueryText(e.target.value)}
                  placeholder="Ej. Clínicas odontológicas en Buenos Aires con WhatsApp y sitio web"
                  className="mt-1.5 w-full resize-none rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-2.5 text-base sm:text-[14px] text-[#181D27] outline-none focus:border-[#2B62F6] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="order-contact"
                  className="block text-[12.5px] font-semibold text-[#181D27]"
                >
                  Email o WhatsApp para recibir la base
                </label>
                <input
                  id="order-contact"
                  type="text"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  placeholder="tu@empresa.com o +54 9 11..."
                  className="mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-2.5 text-base sm:text-[14px] text-[#181D27] outline-none focus:border-[#2B62F6] focus:bg-white transition-colors"
                />
              </div>

              {error && (
                <p className="text-[12.5px] font-medium text-red-600" role="alert">
                  {error}
                </p>
              )}

              <button
                type="submit"
                className="group mt-2 flex w-full items-center justify-between rounded-full bg-[#2B62F6] py-2 pl-6 pr-2 text-[14px] font-bold text-white hover:bg-[#2457ED] transition-colors cursor-pointer"
              >
                <span>Solicitar validación · {activePlan.price}</span>
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
                  <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
                </span>
              </button>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}

interface SampleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderCustom: () => void;
}

export function SampleModal({ isOpen, onClose, onOrderCustom }: SampleModalProps) {
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
          aria-label="Cerrar muestra"
          className="absolute right-5 top-5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#EFF4FA] text-[#181D27] hover:bg-[#DCE7FA] transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="inline-block rounded-full bg-[#EAFC66] px-3.5 py-1 text-[12px] font-bold text-[#181D27]">
          Muestra gratis de 5 clientes
        </div>
        <h3
          id="sample-modal-title"
          className="mt-3 text-[21px] sm:text-[24px] font-bold text-[#181D27]"
        >
          Ejemplo: Clínicas en Buenos Aires
        </h3>
        <p className="mt-1 text-[13.5px] text-[#60697A]">
          Así se ve una entrega verificada lista para exportar en CSV o XLSX
        </p>

        <div className="mt-5 overflow-x-auto rounded-[18px] border border-slate-200/80">
          <table className="w-full text-left text-[12.5px]">
            <thead className="bg-[#EFF4FA] text-[#181D27]">
              <tr>
                <th className="px-4 py-3 font-bold">Negocio</th>
                <th className="px-4 py-3 font-bold">WhatsApp</th>
                <th className="px-4 py-3 font-bold">Sitio web</th>
                <th className="px-4 py-3 font-bold tabular-nums">Rating</th>
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
            ¿Quieres 5 clientes gratis de tu propio rubro y ciudad?
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOrderCustom();
            }}
            className="group inline-flex items-center gap-3 rounded-full bg-[#2B62F6] py-2 pl-5 pr-2 text-[13.5px] font-bold text-white hover:bg-[#2457ED] transition-colors cursor-pointer"
          >
            <span>Pedir mi muestra gratis</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.2]" />
            </span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
