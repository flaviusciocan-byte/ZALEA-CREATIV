import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Globe, X } from 'lucide-react';
import { Language, PageRoute, UI_COPY } from '../data/catalog';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  currentPage: PageRoute;
  onNavigate: (page: PageRoute) => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  currentPage,
  onNavigate,
  lang,
  onLanguageChange,
}) => {
  const [isRendered, setIsRendered] = useState(isOpen);
  const [isVisible, setIsVisible] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const previousActiveElementRef = useRef<HTMLElement | null>(null);

  const copy = UI_COPY[lang];

  // Control smooth animation lifecycle and body scroll lock
  useEffect(() => {
    if (isOpen) {
      previousActiveElementRef.current = document.activeElement as HTMLElement | null;
      setIsRendered(true);

      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Trigger enter animation on next frame
      const animationFrame = requestAnimationFrame(() => {
        setIsVisible(true);
      });

      // Focus close button on open
      const focusTimer = setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);

      return () => {
        cancelAnimationFrame(animationFrame);
        clearTimeout(focusTimer);
        document.body.style.overflow = originalOverflow;
      };
    } else {
      setIsVisible(false);
      const exitTimer = setTimeout(() => {
        setIsRendered(false);
        if (previousActiveElementRef.current) {
          previousActiveElementRef.current.focus();
        }
      }, 300);

      return () => clearTimeout(exitTimer);
    }
  }, [isOpen]);

  // Handle Escape key and keyboard focus trap
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (focusableElements.length === 0) return;

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isRendered) return null;

  const navItems: { page: PageRoute; label: string }[] = [
    { page: 'home', label: copy.nav.home },
    { page: 'shop', label: copy.nav.shop },
    { page: 'about', label: copy.nav.about },
    { page: 'faq', label: copy.nav.faq },
    { page: 'contact', label: copy.nav.contact },
  ];

  return (
    <div
      className="fixed inset-0 z-50 md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label={lang === 'en' ? 'Mobile Navigation Menu' : 'Meniu Navigație Mobil'}
    >
      {/* Backdrop with smooth fade */}
      <div
        className={`fixed inset-0 bg-[#30272D]/50 backdrop-blur-xs transition-opacity duration-300 ease-in-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Panel with smooth slide-in from right */}
      <div
        ref={menuRef}
        id="mobile-navigation"
        className={`fixed inset-y-0 right-0 w-full max-w-xs sm:max-w-sm bg-[#FFF9F5] shadow-2xl flex flex-col justify-between p-6 overflow-y-auto transform transition-transform duration-300 ease-out border-l border-[#30272D]/10 ${
          isVisible ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header with Wordmark & Close Button */}
        <div>
          <div className="flex items-center justify-between pb-5 border-b border-[#30272D]/10">
            <span className="font-editorial text-xl font-semibold tracking-[0.14em] text-[#30272D]">
              ZALEA CREATIV
            </span>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-[#30272D]/70 hover:text-[#30272D] hover:bg-[#EACBD5]/30 transition-colors focus:outline-none focus:ring-2 focus:ring-[#30272D]"
              aria-label={lang === 'en' ? 'Close menu' : 'Închide meniul'}
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-6 flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive =
                currentPage === item.page ||
                (item.page === 'shop' && currentPage === 'product');
              return (
                <button
                  key={item.page}
                  type="button"
                  onClick={() => {
                    onNavigate(item.page);
                    onClose();
                  }}
                  className={`flex items-center justify-between py-3.5 px-3 rounded-xl text-left transition-colors ${
                    isActive
                      ? 'bg-[#EACBD5]/30 text-[#30272D] font-semibold'
                      : 'text-[#30272D]/80 hover:bg-[#EACBD5]/15 hover:text-[#30272D]'
                  }`}
                >
                  <span className="font-editorial text-lg tracking-wide">{item.label}</span>
                  <ArrowRight
                    className={`h-4 w-4 transition-transform ${
                      isActive ? 'text-[#C8A46B] translate-x-1' : 'text-[#30272D]/30'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Footer Area: Language Switcher & Studio Note */}
        <div className="pt-6 border-t border-[#30272D]/10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs font-medium text-[#A67589]">
              <Globe className="h-3.5 w-3.5" />
              <span>{lang === 'en' ? 'Language / Limba' : 'Limba / Language'}</span>
            </div>
            <div className="flex items-center rounded-lg border border-[#30272D]/15 bg-[#FFFCF9] p-0.5 text-xs">
              <button
                type="button"
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  lang === 'en'
                    ? 'bg-[#30272D] text-[#FFF9F5]'
                    : 'text-[#30272D]/70 hover:text-[#30272D]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => onLanguageChange('ro')}
                className={`px-3 py-1 font-medium rounded-md transition-colors ${
                  lang === 'ro'
                    ? 'bg-[#30272D] text-[#FFF9F5]'
                    : 'text-[#30272D]/70 hover:text-[#30272D]'
                }`}
              >
                RO
              </button>
            </div>
          </div>

          <p className="text-[11px] text-[#30272D]/55 leading-relaxed">
            {lang === 'en'
              ? 'Independent female-founded digital publishing studio by Cristina.'
              : 'Studio independent de publicații digitale fondat de Cristina.'}
          </p>
        </div>
      </div>
    </div>
  );
};
