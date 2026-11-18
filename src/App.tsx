import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { ArrowUpRight } from 'lucide-react';
import { useMotionValueEvent, useScroll } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { ChannelsSection } from './components/ChannelsSection';
import { CoverageGlobeSection } from './components/CoverageGlobeSection';
import { FaqAndContactSection } from './components/FaqAndContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { HowItWorksSection } from './components/HowItWorksSection';
import { Navbar } from './components/Navbar';
import { PricingSection } from './components/PricingSection';
import { ValueAndGuaranteeSection } from './components/ValueAndGuaranteeSection';
import { SampleModal } from './components/SampleModal';
import { OrderWizard } from './components/OrderWizard';
import { TermsModal } from './components/TermsModal';
import { ScrollProgressBar } from './components/ScrollFX';
import { PRICING_PLANS, type PricingPlan } from './data/siteData';
import { T, type Lang } from './data/i18n';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const pageRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  const [orderOpen, setOrderOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(PRICING_PLANS[0]);
  const [presetQuery, setPresetQuery] = useState('');
  const [sampleOpen, setSampleOpen] = useState(false);
  const [termsOpen, setTermsOpen] = useState(false);
  const [ctaHidden, setCtaHidden] = useState(false);
  const [lang, setLang] = useState<Lang>('es');
  const { scrollY } = useScroll();

  // Keep document language in sync with the ES/EN selector
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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

  // Pause smooth scroll while a fullscreen overlay is open
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (orderOpen || sampleOpen || termsOpen) {
      lenis.stop();
    } else {
      lenis.start();
    }
  }, [orderOpen, sampleOpen, termsOpen]);

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
    <div ref={pageRef} className="min-h-screen bg-white">
      {/* Full-width page canvas */}
      <div className="mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-14 pb-24 lg:pb-10">
        <Navbar
          onNavigate={handleNavigate}
          onOpenOrder={() => openOrderModal(PRICING_PLANS[0])}
          lang={lang}
          onLangChange={setLang}
        />

        <main>
          <HeroSection
            onStartOrder={() => openOrderModal(PRICING_PLANS[0])}
            onOpenSample={() => setSampleOpen(true)}
            lang={lang}
          />


          <ValueAndGuaranteeSection
            onOpenSample={() => setSampleOpen(true)}
            lang={lang}
          />

          <CoverageGlobeSection
            onStartOrder={(query) => openOrderModal(PRICING_PLANS[0], query)}
            lang={lang}
          />

          <HowItWorksSection
            onStartOrder={(query) => openOrderModal(PRICING_PLANS[0], query)}
            lang={lang}
          />

          <ChannelsSection
            onStartOrder={(query) => openOrderModal(PRICING_PLANS[1], query)}
            lang={lang}
          />

          <PricingSection
            onSelectPlan={(plan) => openOrderModal(plan)}
            lang={lang}
          />

          <FaqAndContactSection
            onNavigateToPricing={() => handleNavigate('#precios')}
            onStartOrder={() => openOrderModal(PRICING_PLANS[0])}
            lang={lang}
          />
        </main>

        <Footer
          onNavigate={handleNavigate}
          lang={lang}
          onOpenTerms={() => setTermsOpen(true)}
        />
      </div>

      <ScrollProgressBar />

      {/* Sticky mobile CTA (hidden on lg+, while a modal is open, or scrolling down) */}
      {!orderOpen && !sampleOpen && !termsOpen && (
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
            <span>{T[lang].sticky}</span>
            <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAFC66] text-[#181D27] transition-transform duration-200 group-hover:rotate-12">
              <ArrowUpRight className="h-4 w-4 stroke-[2.2]" />
            </span>
          </button>
        </div>
      )}

      <OrderWizard
        isOpen={orderOpen}
        initialQty={
          selectedPlan.id === 'growth' ? 100 : selectedPlan.id === 'custom' ? 250 : 25
        }
        presetQuery={presetQuery}
        onClose={() => setOrderOpen(false)}
        lang={lang}
      />

      <SampleModal
        isOpen={sampleOpen}
        onClose={() => setSampleOpen(false)}
        lang={lang}
        onOrderCustom={() => {
          window.open(
            'https://wa.me/56982355145?text=' +
              encodeURIComponent(T[lang].sampleWaMsg),
            '_blank',
            'noopener,noreferrer'
          );
        }}
      />

      <TermsModal
        isOpen={termsOpen}
        lang={lang}
        onClose={() => setTermsOpen(false)}
      />

    </div>
  );
}
