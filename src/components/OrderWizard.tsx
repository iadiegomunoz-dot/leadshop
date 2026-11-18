import confetti from 'canvas-confetti';
import { ArrowRight, Check, CheckCircle2, X } from 'lucide-react';
import { motion } from 'motion/react';
import { useEffect, useMemo, useState } from 'react';
import { ChannelIcon } from './ChannelIcon';
import { OUTBOUND_CHANNELS } from '../data/siteData';
import { T, type Lang } from '../data/i18n';
import { submitLead } from '../lib/leads';
import { TermsModal } from './TermsModal';

const OTHER = '__other__';
const QTY_PRESETS = [25, 50, 100, 250, 500, 1000] as const;
const MIN_QTY = 25;

// Anchor prices in USD. Above 1000 -> custom quote.
// Per-contact price drops progressively: 0.84 / 0.78 / 0.70 / 0.60 / 0.50 / 0.40
const PRICE_ANCHORS: ReadonlyArray<readonly [number, number]> = [
  [25, 20.99],
  [50, 38.99],
  [100, 69.99],
  [250, 149.99],
  [500, 249.99],
  [1000, 399.99],
];
const round2 = (n: number) => Math.round(n * 100) / 100;
const EXTRA_CHANNEL_RATE = 0.1; // per extra channel, per contact

function basePriceUsd(qty: number): number | null {
  if (qty <= PRICE_ANCHORS[0][0]) return PRICE_ANCHORS[0][1];
  for (let i = 1; i < PRICE_ANCHORS.length; i++) {
    const [q1, p1] = PRICE_ANCHORS[i];
    if (qty <= q1) {
      const [q0, p0] = PRICE_ANCHORS[i - 1];
      return round2(p0 + ((qty - q0) * (p1 - p0)) / (q1 - q0));
    }
  }
  return null;
}

interface OrderWizardProps {
  isOpen: boolean;
  onClose: () => void;
  lang?: Lang;
  initialQty?: number;
  presetQuery?: string;
}

export function OrderWizard({
  isOpen,
  onClose,
  lang = 'es',
  initialQty = 25,
  presetQuery = '',
}: OrderWizardProps) {
  const w = T[lang].sec.wizard;
  const [nicheText, setNicheText] = useState('');
  const [cityText, setCityText] = useState('');
  const [countryText, setCountryText] = useState('');
  const [channels, setChannels] = useState<string[]>(['whatsapp', 'website']);
  const [qtyChoice, setQtyChoice] = useState<number | typeof OTHER | null>(
    initialQty
  );
  const [qtyOther, setQtyOther] = useState('');
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [contact, setContact] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [clpRate, setClpRate] = useState(950);

  // Approximate local-currency rate (fallback if the FX lookup fails)
  useEffect(() => {
    let alive = true;
    fetch('https://open.er-api.com/v6/latest/USD')
      .then((r) => r.json())
      .then((d) => {
        const clp = d?.rates?.CLP;
        if (alive && typeof clp === 'number' && clp > 100) setClpRate(clp);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  // Reset + prefill channels when reopened
  useEffect(() => {
    if (!isOpen) return;
    setSubmitted(false);
    setError('');
    setAcceptedTerms(false);
    setTermsOpen(false);
    setQtyChoice(initialQty);
    setQtyOther('');
    setChannels(() => {
      const q = presetQuery.toLowerCase();
      const found = OUTBOUND_CHANNELS.filter(
        (c) => q.includes(c.id) || q.includes(c.name.toLowerCase())
      ).map((c) => c.id);
      return found.length ? found : ['whatsapp', 'website'];
    });
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, initialQty, presetQuery, onClose]);

  const nicheLabel = nicheText.trim();
  const cityLabel = cityText.trim();
  const countryLabel = countryText.trim();

  const qtyNum = useMemo(() => {
    if (qtyChoice === null) return null;
    if (qtyChoice === OTHER) {
      const n = parseInt(qtyOther, 10);
      return Number.isFinite(n) ? n : null;
    }
    return qtyChoice;
  }, [qtyChoice, qtyOther]);

  const pricing = useMemo(() => {
    if (!qtyNum || qtyNum < MIN_QTY) return null;
    const base = basePriceUsd(qtyNum);
    const extraChannels = Math.max(0, channels.length - 2);
    const extraCost =
      base === null ? null : round2(extraChannels * EXTRA_CHANNEL_RATE * qtyNum);
    const total =
      base === null || extraCost === null ? null : round2(base + extraCost);
    return { base, extraChannels, extraCost, total };
  }, [qtyNum, channels.length]);

  const fmtUsd = (n: number) =>
    `US$${n.toLocaleString(lang === 'es' ? 'es-CL' : 'en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  const fmtClp = (n: number) =>
    `$${Math.round(n * clpRate).toLocaleString('es-CL')}`;

  const toggleChannel = (id: string) =>
    setChannels((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );

  const sectionTitle = (n: number, text: string) => (
    <div className="flex items-baseline gap-3">
      <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2B62F6] text-[12px] font-extrabold text-white">
        {n}
      </span>
      <h3 className="text-[17px] sm:text-[19px] font-bold text-[#181D27]">
        {text}
      </h3>
    </div>
  );

  const reveal = {
    initial: { opacity: 0, y: 26 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-30px' },
    transition: { duration: 0.45, ease: 'easeOut' as const },
  };

  const chip = (active: boolean) =>
    `rounded-full border px-4 py-2 text-[13px] font-semibold transition-all cursor-pointer ${
      active
        ? 'border-[#2B62F6] bg-[#2B62F6] text-white'
        : 'border-slate-200 bg-[#F8FAFD] text-[#4C5565] hover:border-[#2B62F6]/50'
    }`;

  const channelNames = channels
    .map((id) => OUTBOUND_CHANNELS.find((c) => c.id === id)?.name ?? id)
    .join(', ');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nicheLabel) {
      setError(w.errNiche);
      document.getElementById('wiz-step-1')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!cityLabel) {
      setError(w.errCity);
      document.getElementById('wiz-step-2')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (channels.length === 0) {
      setError(w.errChannels);
      document.getElementById('wiz-step-3')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!qtyNum || qtyNum < MIN_QTY) {
      setError(w.errQty);
      document.getElementById('wiz-step-4')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (!countryLabel) {
      setError(w.errCountry);
      document.getElementById('wiz-step-5')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (name.trim().length < 2) {
      setError(w.errName);
      return;
    }
    const c = contact.trim();
    const isValidContact =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) ||
      /^\+?[0-9\s\-()]{8,}$/.test(c) ||
      /^@[a-zA-Z0-9_]{3,}$/.test(c);
    if (!isValidContact) {
      setError(w.errContact);
      return;
    }
    if (!acceptedTerms) {
      setError(w.errTerms);
      return;
    }

    const qty = qtyNum;
    const total = pricing?.total ?? null;
    const planId = qty <= 25 ? 'starter' : qty <= 100 ? 'growth' : 'custom';

    const summary =
      `${lang === 'es' ? 'Pedido' : 'Order'}: ${nicheLabel} ${lang === 'es' ? 'en' : 'in'} ${cityLabel}` +
      ` — ${qty} ${lang === 'es' ? 'contactos' : 'contacts'}` +
      ` — ${lang === 'es' ? 'País' : 'Country'}: ${countryLabel}` +
      ` — ${lang === 'es' ? 'Canales' : 'Channels'}: ${channelNames}` +
      (presetQuery ? ` — ${presetQuery}` : '') +
      (total !== null
        ? ` — ${lang === 'es' ? 'Total aprox' : 'Approx total'}: ${fmtUsd(total)}`
        : ` — ${w.quote}`) +
      (company.trim()
        ? ` — ${lang === 'es' ? 'Empresa' : 'Company'}: ${company.trim()}`
        : '');

    setError('');
    void submitLead({
      name: name.trim(),
      company: company.trim(),
      contact: c,
      query: summary,
      targetDesc: `${nicheLabel} en ${cityLabel}, ${countryLabel} · ${qty} contactos · ${channelNames}`,
      country: countryLabel,
      source: 'order',
      plan: planId,
      lang,
      termsAccepted: acceptedTerms,
    });
    const waText = [
      lang === 'es' ? 'Hola, quiero armar mi base.' : 'Hi, I want to build my list.',
      '',
      lang === 'es' ? '*Pedido*' : '*Order*',
      `• ${lang === 'es' ? 'Cliente ideal' : 'Ideal client'}: ${nicheLabel} — ${cityLabel}`,
      `• ${lang === 'es' ? 'País' : 'Country'}: ${countryLabel}`,
      `• ${lang === 'es' ? 'Contactos' : 'Contacts'}: ${qty}`,
      `• ${lang === 'es' ? 'Canales' : 'Channels'}: ${channelNames}`,
      total !== null
        ? `• ${lang === 'es' ? 'Total aprox' : 'Approx total'}: ${fmtUsd(total)} (≈ ${fmtClp(total)} CLP)`
        : `• ${w.quote}`,
      company.trim()
        ? `• ${lang === 'es' ? 'Empresa' : 'Company'}: ${company.trim()}`
        : null,
      `• ${lang === 'es' ? 'Nombre' : 'Name'}: ${name.trim()}`,
      `• ${lang === 'es' ? 'Contacto' : 'Contact'}: ${c}`,
      presetQuery ? `• ${presetQuery}` : null,
    ]
      .filter(Boolean)
      .join('\n');

    window.open(
      `https://wa.me/56982355145?text=${encodeURIComponent(waText)}`,
      '_blank',
      'noopener,noreferrer'
    );
    setSubmitted(true);
    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2B62F6', '#EAFC66', '#FFFFFF'],
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-gradient-to-b from-[#E9EFFF] via-[#F4F7FC] to-[#F8FBFF]"
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={w.title}
    >
      {/* Animated ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-28 -left-28 h-96 w-96 rounded-full bg-[#2B62F6]/15 blur-3xl"
          animate={{ x: [0, 50, 0], y: [0, 36, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 h-[28rem] w-[28rem] rounded-full bg-[#EAFC66]/25 blur-3xl"
          animate={{ x: [0, -60, 0], y: [0, 44, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute -bottom-40 left-1/4 h-[26rem] w-[26rem] rounded-full bg-[#8FB4FF]/20 blur-3xl"
          animate={{ x: [0, 40, 0], y: [0, -48, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="relative mx-auto w-full max-w-2xl px-4 py-6 sm:py-10">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[24px] sm:text-[28px] font-extrabold tracking-[-0.02em] text-[#181D27]">
              {w.title}
            </h2>
            <p className="mt-1 text-[13px] text-[#60697A]">
              {w.s4sub}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={w.close}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-[#181D27] shadow-sm hover:bg-[#EFF4FA] transition-colors cursor-pointer"
          >
            <X className="h-4.5 w-4.5" />
          </button>
        </div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-[24px] bg-white p-8 text-center shadow-sm"
          >
            <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27]">
              <CheckCircle2 className="h-7 w-7" />
            </div>
            <h3 className="mt-4 text-[22px] font-bold text-[#181D27]">
              {w.successTitle}
            </h3>
            <p className="mt-2 text-[14px] leading-[1.55] text-[#60697A]">
              {w.successP1} {w.successP2}{' '}
              <span className="font-semibold text-[#181D27]">{contact}</span>{' '}
              {w.successP3}
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 rounded-full bg-[#2B62F6] px-8 py-2.5 text-[14px] font-bold text-white hover:bg-[#2457ED] transition-colors cursor-pointer"
            >
              {w.done}
            </button>
          </motion.div>
        ) : (
          <form
            id="order-wizard-form"
            onSubmit={handleSubmit}
            className="mt-6 space-y-6"
          >
            {/* 1 · Niche — free text first, quick-pick chips below */}
            <motion.section id="wiz-step-1" {...reveal} className="scroll-mt-6 rounded-[24px] bg-white p-5 sm:p-7 shadow-sm">
              {sectionTitle(1, w.s1q)}
              <p className="mt-1 pl-10 text-[13px] text-[#60697A]">{w.s1sub}</p>
              <input
                type="text"
                value={nicheText}
                onChange={(e) => setNicheText(e.target.value)}
                placeholder={w.s1q}
                className="ml-10 mt-4 w-[calc(100%-2.5rem)] rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-3 text-base sm:text-[15px] font-medium text-[#181D27] outline-none focus:border-[#2B62F6] focus:bg-white transition-colors"
              />
              <div className="mt-3 flex flex-wrap gap-2 pl-10">
                {w.niches.map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setNicheText(n)}
                    className={chip(nicheText === n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </motion.section>

            {/* 2 · City — free text first, quick-pick chips below */}
            <motion.section id="wiz-step-2" {...reveal} className="scroll-mt-6 rounded-[24px] bg-white p-5 sm:p-7 shadow-sm">
              {sectionTitle(2, w.s2q)}
              <p className="mt-1 pl-10 text-[13px] text-[#60697A]">{w.s2sub}</p>
              <input
                type="text"
                value={cityText}
                onChange={(e) => setCityText(e.target.value)}
                placeholder={w.s2q}
                className="ml-10 mt-4 w-[calc(100%-2.5rem)] rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-3 text-base sm:text-[15px] font-medium text-[#181D27] outline-none focus:border-[#2B62F6] focus:bg-white transition-colors"
              />
              <div className="mt-3 flex flex-wrap gap-2 pl-10">
                {w.cities.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCityText(c)}
                    className={chip(cityText === c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </motion.section>

            {/* 3 · Channels — vertical, price reacts live */}
            <motion.section id="wiz-step-3" {...reveal} className="scroll-mt-6 rounded-[24px] bg-white p-5 sm:p-7 shadow-sm">
              {sectionTitle(3, w.s3q)}
              <p className="mt-1 pl-10 text-[13px] text-[#60697A]">{w.s3sub}</p>
              <div className="mt-4 flex flex-col gap-2 pl-10">
                {OUTBOUND_CHANNELS.map((ch) => {
                  const sel = channels.includes(ch.id);
                  const isIncluded = sel && channels.indexOf(ch.id) < 2;
                  return (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => toggleChannel(ch.id)}
                      aria-pressed={sel}
                      className={`flex items-center gap-3 rounded-2xl border p-3 text-left transition-all cursor-pointer ${
                        sel
                          ? 'border-[#2B62F6]/60 bg-[#F2F6FF]'
                          : 'border-slate-200 bg-[#F8FAFD] hover:border-[#2B62F6]/40'
                      }`}
                    >
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-[12px] bg-white">
                        <ChannelIcon name={ch.icon} className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-[13.5px] font-bold text-[#181D27]">
                          {ch.name}
                        </span>
                      </span>
                      {isIncluded ? (
                        <span className="shrink-0 rounded-full bg-[#E7F8EE] px-2.5 py-1 text-[10.5px] font-bold text-[#128C4B]">
                          {w.incShort}
                        </span>
                      ) : sel ? (
                        <span className="shrink-0 rounded-full bg-[#E8EFFD] px-2.5 py-1 text-[10.5px] font-bold text-[#2B62F6] tabular-nums">
                          {w.extShort}
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-full bg-[#F4F6FA] px-2.5 py-1 text-[10.5px] font-semibold text-[#A7B0C0]">
                          +
                        </span>
                      )}
                      {sel && (
                        <Check className="h-4 w-4 shrink-0 stroke-[3] text-[#2B62F6]" />
                      )}
                    </button>
                  );
                })}
              </div>

              <p className="ml-10 mt-4 rounded-xl bg-[#EFF4FA] px-4 py-2.5 text-[12px] font-medium text-[#4C5565]">
                {w.s3note(channels.length)}
              </p>
            </motion.section>

            {/* 4 · Quantity */}
            <motion.section id="wiz-step-4" {...reveal} className="scroll-mt-6 rounded-[24px] bg-white p-5 sm:p-7 shadow-sm">
              {sectionTitle(4, w.s4q)}
              <p className="mt-1 pl-10 text-[13px] text-[#60697A]">{w.s4sub}</p>
              <div className="mt-4 flex flex-wrap gap-2 pl-10">
                {QTY_PRESETS.map((q) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => setQtyChoice(q)}
                    className={chip(qtyChoice === q)}
                  >
                    {q.toLocaleString(lang === 'es' ? 'es-CL' : 'en-US')}
                  </button>
                ))}
                <button
                  type="button"
                  onClick={() => setQtyChoice(OTHER)}
                  className={`rounded-full border border-dashed px-4 py-2 text-[13px] font-semibold transition-all cursor-pointer ${
                    qtyChoice === OTHER
                      ? 'border-[#2B62F6] bg-[#2B62F6] text-white'
                      : 'border-slate-300 bg-white text-[#60697A] hover:border-[#2B62F6]/50'
                  }`}
                >
                  {w.otherQty}
                </button>
              </div>
              {qtyChoice === OTHER && (
                <input
                  type="number"
                  min={MIN_QTY}
                  value={qtyOther}
                  onChange={(e) => setQtyOther(e.target.value)}
                  placeholder={w.otherQtyPh}
                  className="ml-10 mt-3 w-[calc(100%-2.5rem)] rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-2.5 text-base sm:text-[14px] text-[#181D27] outline-none focus:border-[#2B62F6] focus:bg-white transition-colors"
                />
              )}
              {qtyNum !== null && qtyNum > 1000 && (
                <p className="ml-10 mt-4 rounded-xl bg-[#EFF4FA] px-4 py-2.5 text-[12px] font-medium text-[#4C5565]">
                  {w.quote}
                </p>
              )}

              {/* Price — appears once channels + quantity are chosen */}
              {pricing && qtyNum != null && (
                <div className="ml-10 mt-5 rounded-2xl border border-[#2B62F6]/25 bg-gradient-to-br from-[#F2F6FF] to-white p-5">
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <div className="text-[11.5px] font-bold uppercase tracking-[0.08em] text-[#60697A]">
                        {w.totalLabel} ·{' '}
                        {qtyNum.toLocaleString(lang === 'es' ? 'es-CL' : 'en-US')}{' '}
                        {lang === 'es' ? 'contactos' : 'contacts'} ·{' '}
                        {channels.length}{' '}
                        {lang === 'es' ? 'canales' : 'channels'}
                      </div>
                      <div className="mt-0.5 text-[30px] font-extrabold text-[#181D27] tabular-nums">
                        {pricing.total !== null
                          ? fmtUsd(pricing.total)
                          : w.quote}
                      </div>
                      {pricing.total !== null && (
                        <div className="mt-1 text-[13px] font-semibold text-[#60697A] tabular-nums">
                          {w.clpApprox(fmtClp(pricing.total))}
                        </div>
                      )}
                      {pricing.total !== null && (
                        <div className="mt-0.5 text-[12px] font-medium text-[#60697A] tabular-nums">
                          {w.perContact(fmtUsd(round2(pricing.total / qtyNum)))}
                        </div>
                      )}
                    </div>
                  </div>
                  {pricing.base !== null && (
                    <div className="mt-3 space-y-1 border-t border-[#2B62F6]/15 pt-3 text-[12px] font-medium text-[#60697A] tabular-nums">
                      <div>
                        {w.breakdownBase(qtyNum, fmtUsd(pricing.base))}
                      </div>
                      {pricing.extraChannels > 0 &&
                        pricing.extraCost !== null && (
                          <div className="font-semibold text-[#2B62F6]">
                            {w.breakdownExtra(
                              pricing.extraChannels,
                              `+${fmtUsd(pricing.extraCost)}`
                            )}
                          </div>
                        )}
                    </div>
                  )}
                </div>
              )}
            </motion.section>

            {/* 5 · Country */}
            <motion.section id="wiz-step-5" {...reveal} className="scroll-mt-6 rounded-[24px] bg-white p-5 sm:p-7 shadow-sm">
              {sectionTitle(5, w.s5q)}
              <p className="mt-1 pl-10 text-[13px] text-[#60697A]">{w.s5sub}</p>
              <input
                type="text"
                value={countryText}
                onChange={(e) => setCountryText(e.target.value)}
                placeholder={w.s5q}
                className="ml-10 mt-4 w-[calc(100%-2.5rem)] rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-3 text-base sm:text-[15px] font-medium text-[#181D27] outline-none focus:border-[#2B62F6] focus:bg-white transition-colors"
              />
              <div className="mt-3 flex flex-wrap gap-2 pl-10">
                {w.countries.map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCountryText(c)}
                    className={chip(countryText === c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </motion.section>

            {/* 6 · Contact */}
            <motion.section id="wiz-step-6" {...reveal} className="scroll-mt-6 rounded-[24px] bg-white p-5 sm:p-7 shadow-sm">
              {sectionTitle(6, w.s6q)}
              <p className="mt-1 pl-10 text-[13px] text-[#60697A]">{w.s5sub}</p>
              <div className="mt-4 space-y-4 pl-10">
                <div>
                  <label className="block text-[12.5px] font-semibold text-[#181D27]">
                    {w.nameLabel}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={w.namePh}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-2.5 text-base sm:text-[14px] text-[#181D27] outline-none focus:border-[#2B62F6] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-[#181D27]">
                    {w.companyLabel}
                  </label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder={w.companyPh}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-2.5 text-base sm:text-[14px] text-[#181D27] outline-none focus:border-[#2B62F6] focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[12.5px] font-semibold text-[#181D27]">
                    {w.contactLabel}
                  </label>
                  <input
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={w.contactPh}
                    className="mt-1.5 w-full rounded-xl border border-slate-200 bg-[#F8FAFD] px-4 py-2.5 text-base sm:text-[14px] text-[#181D27] outline-none focus:border-[#2B62F6] focus:bg-white transition-colors"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 text-[12.5px] leading-[1.5] text-[#4C5565]">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(e) => setAcceptedTerms(e.target.checked)}
                    className="mt-0.5 h-4 w-4 shrink-0 accent-[#2B62F6]"
                  />
                  <span>
                    {w.termsAccept}{' '}
                    <button
                      type="button"
                      onClick={() => setTermsOpen(true)}
                      className="font-bold text-[#2B62F6] underline underline-offset-2 hover:text-[#2457ED] cursor-pointer"
                    >
                      {w.termsLink}
                    </button>
                    .
                  </span>
                </label>

                {error && (
                  <p className="text-[12.5px] font-medium text-red-600" role="alert">
                    {error}
                  </p>
                )}
              </div>
            </motion.section>

            {/* Submit */}
            <button
              type="submit"
              className="group flex w-full items-center justify-between rounded-full bg-[#2B62F6] py-3.5 pl-7 pr-2 text-[15px] font-bold text-white hover:bg-[#2457ED] transition-colors cursor-pointer shadow-[0_12px_30px_rgba(43,98,246,0.3)]"
            >
              <span>
                {pricing?.total != null
                  ? w.submit(fmtUsd(pricing.total))
                  : w.submitQuote}
              </span>
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
                <ArrowRight className="h-4.5 w-4.5 stroke-[2.4]" />
              </span>
            </button>
          </form>
        )}
      </div>

      <TermsModal
        isOpen={termsOpen}
        lang={lang}
        onClose={() => setTermsOpen(false)}
      />
    </div>
  );
}
