import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowUpRight } from 'lucide-react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ChannelsAndApiSection } from './components/ChannelsAndApiSection';
import { CoverageGlobeSection } from './components/CoverageGlobeSection';
import { FaqAndContactSection } from './components/FaqAndContactSection';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { Navbar } from './components/Navbar';
import { PricingSection } from './components/PricingSection';
import { ValueAndGuaranteeSection } from './components/ValueAndGuaranteeSection';
import { OrderModal, SampleModal } from './components/ZLeadsModals';
import { ChannelsMarquee, ScrollProgressBar } from './components/ScrollFX';
import { NAV_LINKS, PRICING_PLANS, type PricingPlan } from './data/zleadsData';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(PRICING_PLANS[0]);
  const [presetQuery, setPresetQuery] = useState('');
  const [sampleOpen, setSampleOpen] = useState(false);
  const [ctaHidden, setCtaHidden] = useState(false);
  const { scrollY } = useScroll();

  // Hide the sticky mobile CTA while scrolling down, reveal on scroll up
  useMotionValueEvent(scrollY, 'change', (latest) => {
    const prev = scrollY.getPrevious() ?? 0;
    setCtaHidden(latest > 480 && latest > prev);
  });

  // Initialize Lenis smooth scrolling synced with GSAP ScrollTrigger
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion) {
      const lenis = new Lenis({
        duration: 1.05,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });
      lenisRef.current = lenis;

      lenis.on('scroll', ScrollTrigger.update);

      const tick = (time: number) => {
        lenis.raf(time * 1000);
      };
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      return () => {
        gsap.ticker.remove(tick);
        lenis.destroy();
        lenisRef.current = null;
      };
    }
  }, []);

  // Section-by-section GSAP choreography
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.hero-stagger', {
        y: 22,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
      });

      gsap.utils.toArray<HTMLElement>('.section-title').forEach((title) => {
        gsap.from(title, {
          y: 20,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: title,
            start: 'top 88%',
            once: true,
          },
        });
      });

      gsap.from('.audience-card', {
        y: 26,
        opacity: 0,
        duration: 0.6,
        stagger: 0.09,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.audience-card',
          start: 'top 86%',
          once: true,
        },
      });

      gsap.from('.why-card', {
        y: 26,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '.why-card',
          start: 'top 86%',
          once: true,
        },
      });

      gsap.from('.pricing-card', {
        y: 28,
        opacity: 0,
        duration: 0.65,
        stagger: 0.11,
        ease: 'power3.out',
        clearProps: 'transform,opacity',
        scrollTrigger: {
          trigger: '#precios',
          start: 'top 82%',
          once: true,
        },
      });

      gsap.utils.toArray<HTMLElement>('.reveal-card').forEach((card) => {
        gsap.from(card, {
          y: 20,
          opacity: 0,
          duration: 0.55,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            once: true,
          },
        });
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  const handleNavigate = (href: string) => {
    const target = document.querySelector(href);
    if (!target) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target as HTMLElement, { offset: -20 });
    } else {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openOrderModal = (plan?: PricingPlan, query?: string) => {
    setSelectedPlan(plan ?? PRICING_PLANS[0]);
    setPresetQuery(query ?? '');
    setOrderOpen(true);
  };

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#2B62F6] px-2.5 py-3 sm:px-6 sm:py-6 lg:px-10 lg:py-9"
    >
      {/* Signature Rounded White Page Canvas inside Cobalt Blue Frame */}
      <div className="mx-auto max-w-[1160px] rounded-[28px] sm:rounded-[36px] bg-white px-4 sm:px-8 lg:px-12 pb-24 lg:pb-10 shadow-[0_30px_90px_rgba(11,34,112,0.32)]">
        <Navbar
          onNavigate={handleNavigate}
          onOpenOrder={() => openOrderModal(PRICING_PLANS[0])}
        />

        <main>
          <HeroSection
            onStartOrder={() => openOrderModal(PRICING_PLANS[0])}
            onOpenSample={() => setSampleOpen(true)}
          />

          <ChannelsMarquee />

          <ValueAndGuaranteeSection
            onOpenSample={() => setSampleOpen(true)}
            onStartOrder={() => openOrderModal(PRICING_PLANS[0])}
          />

          <CoverageGlobeSection
            onStartOrder={(query) => openOrderModal(PRICING_PLANS[0], query)}
          />

          <HowItWorksSection
            onStartOrder={(query) => openOrderModal(PRICING_PLANS[0], query)}
          />

          <ChannelsAndApiSection
            onStartOrder={(query) => openOrderModal(PRICING_PLANS[1], query)}
          />

          <PricingSection onSelectPlan={(plan) => openOrderModal(plan)} />

          <FaqAndContactSection
            onNavigateToPricing={() => handleNavigate('#precios')}
          />
        </main>

        {/* Quiet Footer */}
        <footer className="mt-6 border-t border-slate-200/80 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12.5px] text-[#60697A]">
          <div className="font-semibold text-[#181D27]">
            LeadShop · Z Aplicaciones · infozaplicaciones@gmail.com
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate(link.href);
                }}
                className="hover:text-[#2B62F6] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </footer>
      </div>

      <ScrollProgressBar />

      {/* Sticky mobile CTA (hidden on lg+, while a modal is open, or scrolling down) */}
      {!orderOpen && !sampleOpen && (
        <div
          className={`pointer-events-none fixed inset-x-0 bottom-0 z-40 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-300 ease-out lg:hidden ${
            ctaHidden ? 'translate-y-[130%]' : 'translate-y-0'
          }`}
        >
          <button
            type="button"
            onClick={() => openOrderModal(PRICING_PLANS[0])}
            className="pointer-events-auto group flex w-full items-center justify-between gap-3 rounded-full bg-[#181D27] py-2 pl-6 pr-2 text-[14px] font-bold text-white shadow-[0_14px_34px_rgba(24,29,39,0.35)] transition-transform duration-150 active:scale-[0.98] cursor-pointer"
          >
            <span>Armar mi base · desde US$5,99</span>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
              <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
            </span>
          </button>
        </div>
      )}

      <OrderModal
        isOpen={orderOpen}
        initialPlan={selectedPlan}
        initialQuery={presetQuery}
        onClose={() => setOrderOpen(false)}
      />

      <SampleModal
        isOpen={sampleOpen}
        onClose={() => setSampleOpen(false)}
        onOrderCustom={() =>
          openOrderModal(PRICING_PLANS[0], 'Muestra gratis de 5 clientes para mi rubro y zona')
        }
      />

    </div>
  );
}
