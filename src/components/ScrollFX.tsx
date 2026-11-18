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
