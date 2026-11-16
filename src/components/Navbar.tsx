import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { NAV_LINKS } from '../data/zleadsData';

interface NavbarProps {
  onNavigate: (href: string) => void;
  onOpenOrder: () => void;
}

export function Navbar({ onNavigate, onOpenOrder }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    onNavigate(href);
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  return (
    <header className="relative z-30 flex items-center justify-between gap-8 px-1 py-4 md:py-5">
      {/* Zone 1: Brand wordmark */}
      <a
        href="#top"
        onClick={(e) => handleLinkClick(e, '#top')}
        className="inline-flex items-center gap-1.5 text-[15px] md:text-base font-bold tracking-tight text-[#2B62F6] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2B62F6] rounded"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className="shrink-0"
        >
          <path
            d="M6.2 2.2L2.8 13.8M12.6 2.2L9.2 13.8"
            stroke="#2B62F6"
            strokeWidth="2.1"
            strokeLinecap="round"
          />
        </svg>
        <span>LeadShop</span>
      </a>

      {/* Zone 2: 5 single-line navigation links */}
      <nav
        aria-label="Navegación principal"
        className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-[#2A313E]"
      >
        {NAV_LINKS.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => handleLinkClick(e, item.href)}
            className="relative py-1 whitespace-nowrap shrink-0 transition-colors duration-150 hover:text-[#2B62F6] after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#2B62F6] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#2B62F6] rounded"
          >
            {item.label}
          </a>
        ))}
      </nav>

      {/* Zone 3: 1 primary action */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          type="button"
          onClick={onOpenOrder}
          className="hidden sm:inline-flex items-center justify-center rounded-full border border-[#2B62F6]/35 bg-white px-5 py-2 text-[13.5px] font-semibold text-[#181D27] whitespace-nowrap shrink-0 transition-all duration-150 hover:border-[#2B62F6] hover:bg-[#2B62F6] hover:text-white active:scale-[0.98] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2B62F6]"
        >
          Armar mi base
        </button>

        <button
          type="button"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? 'Cerrar menú' : 'Abrir menú'}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-[#181D27] hover:bg-slate-50 cursor-pointer"
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 mt-2 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl">
          <nav className="flex flex-col gap-3">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => handleLinkClick(e, item.href)}
                className="rounded-xl px-3 py-2.5 text-sm font-semibold text-[#181D27] hover:bg-[#EFF4FA] hover:text-[#2B62F6] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onOpenOrder();
              }}
              className="mt-2 w-full rounded-full bg-[#2B62F6] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2457ED] transition-colors cursor-pointer"
            >
              Armar mi base
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
