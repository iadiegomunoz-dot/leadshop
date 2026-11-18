import { ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { NAV_LINKS } from '../data/siteData';
import { T, type Lang } from '../data/i18n';

interface FooterProps {
  onNavigate: (href: string) => void;
  lang: Lang;
  onOpenTerms: () => void;
}

export function Footer({ onNavigate, lang, onOpenTerms }: FooterProps) {
  const t = T[lang];
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ['start 95%', 'end end'],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, 110]);
  const glowY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -50]);

  return (
    <footer ref={footerRef} className="blue-card-gradient relative mt-14 overflow-hidden rounded-[28px] sm:rounded-[36px] px-6 sm:px-10 lg:px-14 pt-12 sm:pt-16 pb-8 text-white">
      {/* Ambient glow */}
      <motion.div
        style={{ y: glowY }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 right-[10%] h-72 w-72 rounded-full bg-[#EAFC66]/15 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 left-[5%] h-64 w-64 rounded-full bg-white/10 blur-3xl"
      />

      {/* Giant wordmark */}
      <div className="relative">
        <motion.p
          style={{ y: wordY }}
          aria-hidden="true"
          className="select-none text-center text-[22vw] sm:text-[19vw] lg:text-[15rem] font-extrabold leading-[0.85] tracking-[-0.04em] text-white/[0.07] whitespace-nowrap"
        >
          LEADSHOP
        </motion.p>
        <div className="-mt-[6vw] sm:-mt-[4.5vw] lg:-mt-16 flex flex-col sm:flex-row sm:items-end justify-between gap-6 px-1 sm:px-4">
          <p className="max-w-xs text-[14px] leading-[1.6] text-white/75">
            {lang === 'es'
              ? 'Bases de negocios reales con WhatsApp verificado y sitio web, listas para contactar. Pago único, sin suscripción.'
              : 'Bases of real businesses with verified WhatsApp and website, ready to contact. One-time payment, no subscription.'}
          </p>
          <a
            href="https://wa.me/56982355145"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex w-fit items-center gap-3 rounded-full bg-white py-2 pl-5 pr-2 text-[13.5px] font-bold text-[#181D27] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(0,0,0,0.25)]"
          >
            <MessageCircle className="h-4 w-4 text-[#128C4B]" />
            <span>+56 9 8235 5145</span>
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
              <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
            </span>
          </a>
        </div>
      </div>

      {/* Link columns */}
      <div className="relative mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-white/15 pt-8">
        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
            {lang === 'es' ? 'Explorar' : 'Explore'}
          </h3>
          <nav className="mt-4 flex flex-col gap-2.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigate(link.href);
                }}
                className="w-fit text-[14px] font-medium text-white/85 transition-colors hover:text-[#EAFC66]"
              >
                {(T[lang].nav as Record<string, string>)[link.href] ?? link.label}
              </a>
            ))}
          </nav>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
            {lang === 'es' ? 'Contacto' : 'Contact'}
          </h3>
          <div className="mt-4 flex flex-col gap-2.5 text-[14px] font-medium text-white/85">
            <a
              href="https://wa.me/56982355145"
              target="_blank"
              rel="noreferrer"
              className="w-fit transition-colors hover:text-[#EAFC66]"
            >
              WhatsApp · +56 9 8235 5145
            </a>
            <a
              href="#hablemos"
              onClick={(e) => {
                e.preventDefault();
                onNavigate('#hablemos');
              }}
              className="w-fit transition-colors hover:text-[#EAFC66]"
            >
              {lang === 'es' ? 'Formulario de pedido' : 'Order form'}
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
            {lang === 'es' ? 'Producto' : 'Product'}
          </h3>
          <div className="mt-4 flex flex-col gap-2.5 text-[14px] font-medium text-white/85">
            <span>{lang === 'es' ? 'WhatsApp verificado' : 'Verified WhatsApp'}</span>
            <span>{lang === 'es' ? 'Sitio web incluido' : 'Website included'}</span>
            <span>{lang === 'es' ? 'Desde US$20,99' : 'From US$20.99'}</span>
            <span>{lang === 'es' ? 'Sin suscripción' : 'No subscription'}</span>
          </div>
        </div>
      </div>

      {/* Legal */}
      <div className="relative mt-8 flex items-center justify-between border-t border-white/15 pt-5 text-[12px] text-white/55">
        <button
          type="button"
          onClick={onOpenTerms}
          className="font-semibold text-white/70 underline-offset-4 transition-colors hover:text-[#EAFC66] hover:underline cursor-pointer"
        >
          {lang === 'es' ? 'Términos y condiciones' : 'Terms and conditions'}
        </button>
        <span className="uppercase tracking-[0.12em] font-bold">
          ES · EN · {lang === 'es' ? 'Latinoamérica' : 'Latin America'}
        </span>
      </div>

      {/* Bottom bar */}
      <div className="relative mt-10 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-white/15 pt-6 text-[12px] text-white/55">
        <span>
          © {year} LeadShop.{' '}
          {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
        </span>
        <span className="uppercase tracking-[0.12em] font-bold">
          ES · EN · {lang === 'es' ? 'Latinoamérica' : 'Latin America'}
        </span>
      </div>
    </footer>
  );
}
