import { ArrowUpRight, CheckCircle2, Instagram, Linkedin, Mail, MessageCircle, Minus, Phone, Plus } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';
import { CONTACT_CHANNELS, FAQ_ITEMS } from '../data/zleadsData';

interface FaqAndContactSectionProps {
  onNavigateToPricing: () => void;
}

const CHANNEL_ICONS = {
  whatsapp: MessageCircle,
  phone: Phone,
  instagram: Instagram,
  linkedin: Linkedin,
  email: Mail,
} as const;

export function FaqAndContactSection({ onNavigateToPricing }: FaqAndContactSectionProps) {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQ_ITEMS[0].id);

  // Contact form state
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [targetDesc, setTargetDesc] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim().length < 2) {
      setError('Ingresá tu nombre (mínimo 2 caracteres).');
      return;
    }
    const c = contact.trim();
    const isValid =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c) ||
      /^\+?[0-9\s\-()]{8,}$/.test(c) ||
      /^@[a-zA-Z0-9_]{3,}$/.test(c);
    if (!isValid) {
      setError('Ingresá un email o WhatsApp válido.');
      return;
    }
    if (targetDesc.trim().length < 5) {
      setError('Cuéntanos brevemente a quién quieres venderle.');
      return;
    }

    setError('');
    setSubmitted(true);
  };

  return (
    <div className="space-y-12 pt-4 pb-6">
      {/* FAQ Section: Antes de armar tu base */}
      <section id="preguntas" className="rounded-[28px] bg-[#EFF4FA] p-6 sm:p-8 lg:p-10">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="section-title text-[25px] sm:text-[32px] font-bold tracking-[-0.02em] text-[#181D27]">
            Antes de{' '}
            <span className="inline-block rounded-full bg-[#EAFC66] px-4 py-0.5 text-[#181D27]">
              armar tu base
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
            Ver todas las preguntas frecuentes
          </button>
          <span aria-hidden="true">·</span>
          <button
            type="button"
            onClick={onNavigateToPricing}
            className="hover:text-[#2B62F6] transition-colors cursor-pointer"
          >
            Precios por volumen
          </button>
          <span aria-hidden="true">·</span>
          <a href="#como-funciona" className="hover:text-[#2B62F6] transition-colors">
            Guía de bases B2B
          </a>
        </div>
      </section>

      {/* Contact Section: Hablemos */}
      <section id="hablemos">
        <div className="text-center max-w-2xl mx-auto">
          <span className="inline-block rounded-full bg-[#3368F7] px-4 py-1 text-[12px] font-bold text-white">
            Hablemos
          </span>
          <h2 className="section-title mt-3 text-[26px] sm:text-[34px] font-bold leading-[1.18] tracking-[-0.02em] text-[#181D27]">
            Cuéntanos qué necesitas y lo armamos
          </h2>
          <p className="mt-2 text-[14px] text-[#60697A]">
            Escríbenos por el canal que prefieras o deja tu consulta aquí abajo. Atendemos
            en <span className="font-semibold text-[#181D27]">español e inglés</span>,
            con foco en <span className="font-semibold text-[#181D27]">Latinoamérica</span>.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Direct Channels Card (Blue Gradient) */}
          <div className="lg:col-span-5 blue-card-gradient relative flex flex-col justify-between overflow-hidden rounded-[24px] p-6 sm:p-8 text-white">
            <div className="space-y-4 relative z-10">
              {CONTACT_CHANNELS.map((ch) => {
                const ChannelIcon = CHANNEL_ICONS[ch.icon as keyof typeof CHANNEL_ICONS];
                return (
                <a
                  key={ch.value}
                  href={ch.href}
                  target={ch.href.startsWith('http') ? '_blank' : undefined}
                  rel={ch.href.startsWith('http') ? 'noreferrer' : undefined}
                  className="flex items-center gap-3.5 rounded-[16px] bg-white/10 px-4 py-3 transition-colors hover:bg-white/18"
                >
                  <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white">
                    {ChannelIcon && <ChannelIcon className="h-4.5 w-4.5" />}
                  </span>
                  <span>
                    <span className="block text-[11.5px] font-medium text-white/75">{ch.label}</span>
                    <span className="mt-0.5 block text-[14.5px] font-bold text-[#EAFC66] tabular-nums">
                      {ch.value}
                    </span>
                  </span>
                </a>
                );
              })}
            </div>
          </div>

          {/* Right Form Card (Light Ice/White) */}
          <div className="lg:col-span-7 rounded-[24px] bg-[#F4F6FA] p-6 sm:p-8 flex flex-col justify-center">
            {submitted ? (
              <div className="py-8 text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27]">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mt-4 text-[22px] font-bold text-[#181D27]">
                  ¡Consulta enviada!
                </h3>
                <p className="mt-2 max-w-md mx-auto text-[14px] leading-[1.55] text-[#60697A]">
                  Gracias, <span className="font-semibold text-[#181D27]">{name}</span>.
                  Te respondemos en el día a{' '}
                  <span className="font-semibold text-[#2B62F6]">{contact}</span> con una
                  propuesta para tu base.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setContact('');
                    setTargetDesc('');
                  }}
                  className="mt-6 rounded-full bg-[#2B62F6] px-6 py-2.5 text-[13.5px] font-bold text-white hover:bg-[#2457ED] transition-colors cursor-pointer"
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block text-[12.5px] font-semibold text-[#181D27]"
                  >
                    Tu nombre
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre"
                    className="mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-base sm:text-[14px] text-[#181D27] outline-none focus:border-[#2B62F6]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email-wa"
                    className="block text-[12.5px] font-semibold text-[#181D27]"
                  >
                    Email o WhatsApp
                  </label>
                  <input
                    id="contact-email-wa"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder="Email o WhatsApp"
                    className="mt-1.5 w-full rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-base sm:text-[14px] text-[#181D27] outline-none focus:border-[#2B62F6]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-target"
                    className="block text-[12.5px] font-semibold text-[#181D27]"
                  >
                    ¿A quién quieres venderle?
                  </label>
                  <textarea
                    id="contact-target"
                    rows={3}
                    value={targetDesc}
                    onChange={(e) => setTargetDesc(e.target.value)}
                    placeholder="¿A quién quieres venderle? Ej. clínicas en Buenos Aires con WhatsApp y sitio web"
                    className="mt-1.5 w-full resize-none rounded-xl border border-slate-200/90 bg-white px-4 py-3 text-base sm:text-[14px] text-[#181D27] outline-none focus:border-[#2B62F6]"
                  />
                </div>

                {error && (
                  <p className="text-[12.5px] font-medium text-red-600" role="alert">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  className="group mt-1 inline-flex w-full sm:w-auto items-center justify-between gap-4 rounded-full bg-[#2B62F6] py-2 pl-6 pr-2 text-[14px] font-bold text-white hover:bg-[#2457ED] transition-colors cursor-pointer"
                >
                  <span>Enviar consulta</span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
                    <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
