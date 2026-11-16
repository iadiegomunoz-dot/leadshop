import { motion, useScroll, useSpring } from 'motion/react';

/** Thin gradient progress bar pinned to the top of the viewport. */
export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.4,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[3px] origin-left bg-gradient-to-r from-[#EAFC66] via-[#7FB0FF] to-[#2B62F6]"
    />
  );
}

const MARQUEE_ITEMS = [
  'WhatsApp verificado',
  'Sitio web',
  'Instagram',
  'LinkedIn',
  'Email',
  'Teléfono',
  'TikTok',
  'Facebook',
  'YouTube',
  'Dirección',
  'Sin suscripción',
  'Desde US$5,99',
];

/** Infinite scrolling channel/ticker strip between hero and content. */
export function ChannelsMarquee() {
  const row = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden border-y border-slate-200/70 bg-[#F8FAFD] py-3.5"
    >
      <div className="marquee-track flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-8 text-[12.5px] font-bold tracking-[0.08em] text-[#60697A] uppercase"
          >
            {item}
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#EAFC66] ring-1 ring-[#181D27]/10" />
          </span>
        ))}
      </div>
      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#F8FAFD] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#F8FAFD] to-transparent" />
    </div>
  );
}
