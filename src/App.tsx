import React, { useEffect, useState } from 'react';
import { Check, Menu, ShoppingBag, X } from 'lucide-react';
import {
  CartDrawer,
  CartItem,
  PrintablePreviewModal,
} from './components/CartDrawerAndModal';
import { MobileMenu } from './components/MobileMenu';
import { HomePage } from './components/HomePage';
import {
  AboutPage,
  ContactPage,
  FaqPage,
  LegalPage,
} from './components/SecondaryPages';
import {
  ProductDetailsPage,
  ShopPage,
} from './components/ShopAndProductPages';
import {
  Language,
  PRODUCTS,
  PageRoute,
  Product,
  ProductCategory,
  PrintableSheetPreview,
  UI_COPY,
} from './data/catalog';

export default function App() {
  const [lang, setLang] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [shopCategory, setShopCategory] = useState<ProductCategory>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      license: 'personal',
      quantity: 1,
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [previewModalState, setPreviewModalState] = useState<{
    sheet: PrintableSheetPreview | null;
    productTitle: string;
  }>({
    sheet: null,
    productTitle: '',
  });
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  const copy = UI_COPY[lang];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, selectedProduct]);

  const handleNavigate = (page: PageRoute, category: ProductCategory = 'all') => {
    setShopCategory(category);
    setCurrentPage(page);
    setIsMobileMenuOpen(false);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentPage('product');
    setIsMobileMenuOpen(false);
  };

  const handleAddToCart = (product: Product, license: 'personal' | 'educator') => {
    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product.id === product.id && item.license === license
      );
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + 1,
        };
        return updated;
      }
      return [...prev, { product, license, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (
    productId: string,
    license: 'personal' | 'educator',
    delta: number
  ) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId && item.license === license) {
            const nextQty = item.quantity + delta;
            return nextQty > 0 ? { ...item, quantity: nextQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveItem = (productId: string, license: 'personal' | 'educator') => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.license === license)
      )
    );
  };

  const totalBagCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterJoined(true);
    setNewsletterEmail('');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9F5] text-[#30272D]">
      {/* Top Bar Navigation */}
      <header className="no-print sticky top-0 z-40 bg-[#FFF9F5]/95 backdrop-blur-md border-b border-[#30272D]/10">
        <div className="mx-auto max-w-7xl flex items-center justify-between gap-4 px-4 sm:px-6 py-3.5 sm:py-4">
          {/* Zone 1: Brand Wordmark (Compact on mobile) */}
          <button
            type="button"
            onClick={() => handleNavigate('home')}
            className="font-editorial text-xl sm:text-2xl md:text-[28px] font-semibold tracking-[0.12em] sm:tracking-[0.14em] text-[#30272D] whitespace-nowrap shrink-0 text-left hover:opacity-85 transition-opacity"
          >
            ZALEA CREATIV
          </button>

          {/* Zone 2: Concise Single-Line Navigation Links (Hidden on mobile <768px) */}
          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-[#30272D]/80">
            <button
              type="button"
              onClick={() => handleNavigate('home')}
              className={`hover:text-[#30272D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentPage === 'home'
                  ? 'border-[#C8A46B] text-[#30272D]'
                  : 'border-transparent'
              }`}
            >
              {copy.nav.home}
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('shop')}
              className={`hover:text-[#30272D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentPage === 'shop' || currentPage === 'product'
                  ? 'border-[#C8A46B] text-[#30272D]'
                  : 'border-transparent'
              }`}
            >
              {copy.nav.shop}
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('about')}
              className={`hover:text-[#30272D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentPage === 'about'
                  ? 'border-[#C8A46B] text-[#30272D]'
                  : 'border-transparent'
              }`}
            >
              {copy.nav.about}
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('faq')}
              className={`hover:text-[#30272D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentPage === 'faq'
                  ? 'border-[#C8A46B] text-[#30272D]'
                  : 'border-transparent'
              }`}
            >
              {copy.nav.faq}
            </button>
            <button
              type="button"
              onClick={() => handleNavigate('contact')}
              className={`hover:text-[#30272D] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 ${
                currentPage === 'contact'
                  ? 'border-[#C8A46B] text-[#30272D]'
                  : 'border-transparent'
              }`}
            >
              {copy.nav.contact}
            </button>
          </nav>

          {/* Zone 3: Actions & Navigation Triggers */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Desktop Language Switcher EN / RO */}
            <div className="hidden sm:flex items-center rounded-lg border border-[#30272D]/15 bg-[#FFFCF9] p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'en'
                    ? 'bg-[#30272D] text-[#FFF9F5]'
                    : 'text-[#30272D]/70 hover:text-[#30272D]'
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setLang('ro')}
                className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 ${
                  lang === 'ro'
                    ? 'bg-[#30272D] text-[#FFF9F5]'
                    : 'text-[#30272D]/70 hover:text-[#30272D]'
                }`}
              >
                RO
              </button>
            </div>

            {/* Desktop Shopping Bag (Full pill with label & counter) */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="hidden md:inline-flex items-center gap-2 rounded-xl bg-[#30272D] px-4 py-2.5 text-xs font-medium text-[#FFF9F5] hover:bg-[#A67589] transition-colors whitespace-nowrap shrink-0 shadow-xs"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span>{copy.nav.bag}</span>
              <span className="tabular-nums">({totalBagCount})</span>
            </button>

            {/* Mobile Shopping Bag: Compact Icon with small badge indicator */}
            <button
              type="button"
              onClick={() => setIsCartOpen(true)}
              className="relative md:hidden p-2 rounded-xl border border-[#30272D]/15 text-[#30272D] hover:bg-[#EACBD5]/25 transition-colors"
              aria-label={
                lang === 'en'
                  ? `Shopping bag with ${totalBagCount} items`
                  : `Coș de cumpărături cu ${totalBagCount} produse`
              }
            >
              <ShoppingBag className="h-5 w-5" />
              {totalBagCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] flex items-center justify-center rounded-full bg-[#30272D] text-[10px] font-bold text-[#FFF9F5] px-1 tabular-nums shadow-xs">
                  {totalBagCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Menu Icon Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 rounded-xl border border-[#30272D]/15 text-[#30272D] hover:bg-[#EACBD5]/25 transition-colors"
              aria-label={lang === 'en' ? 'Open navigation menu' : 'Deschide meniul de navigare'}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Accessible Animated Mobile Menu Drawer */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        currentPage={currentPage}
        onNavigate={handleNavigate}
        lang={lang}
        onLanguageChange={setLang}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'home' && (
          <HomePage
            lang={lang}
            onNavigate={handleNavigate}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onOpenSheetModal={(sheet, productTitle) =>
              setPreviewModalState({ sheet, productTitle })
            }
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            lang={lang}
            initialCategory={shopCategory}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
          />
        )}

        {currentPage === 'product' && (
          <ProductDetailsPage
            product={selectedProduct}
            lang={lang}
            onBackToShop={() => handleNavigate('shop')}
            onSelectProduct={handleSelectProduct}
            onAddToCart={handleAddToCart}
            onOpenSheetModal={(sheet, productTitle) =>
              setPreviewModalState({ sheet, productTitle })
            }
          />
        )}

        {currentPage === 'about' && (
          <AboutPage lang={lang} onNavigate={handleNavigate} />
        )}

        {currentPage === 'contact' && <ContactPage lang={lang} />}

        {currentPage === 'faq' && (
          <FaqPage lang={lang} onNavigate={handleNavigate} />
        )}

        {currentPage === 'privacy' && <LegalPage type="privacy" lang={lang} />}

        {currentPage === 'terms' && <LegalPage type="terms" lang={lang} />}
      </main>

      {/* Editorial Footer */}
      <footer className="no-print bg-[#30272D] text-[#FFF9F5] border-t border-[#C8A46B]/30">
        <div className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-[#FFF9F5]/12">
            {/* Brand & Cristina's Note */}
            <div className="lg:col-span-4 space-y-4">
              <p className="font-editorial text-2xl tracking-[0.14em] text-[#FFF9F5]">
                ZALEA CREATIV
              </p>
              <p className="text-sm text-[#FFF9F5]/75 leading-relaxed max-w-sm">
                {lang === 'en'
                  ? 'Independent female-founded digital publishing studio by Cristina. Printable botanical coloring books, serene family planners, and bilingual educational treasures.'
                  : 'Studio independent de publicații digitale fondat de Cristina. Cărți de colorat botanice, planificatoare senine de familie și resurse educaționale bilingve.'}
              </p>
              <p className="text-xs text-[#EACBD5] tracking-wider">
                zaleacreativ.com · EN / RO
              </p>
            </div>

            {/* Collections Navigation */}
            <div className="lg:col-span-3 space-y-3 text-xs">
              <p className="uppercase tracking-widest text-[#C8A46B] font-semibold">
                {lang === 'en' ? 'Collections' : 'Colecții'}
              </p>
              <ul className="space-y-2.5 text-[#FFF9F5]/80">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('shop', 'coloring')}
                    className="hover:text-[#EACBD5] transition-colors"
                  >
                    {copy.categories.coloring}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('shop', 'planners')}
                    className="hover:text-[#EACBD5] transition-colors"
                  >
                    {copy.categories.planners}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('shop', 'educational')}
                    className="hover:text-[#EACBD5] transition-colors"
                  >
                    {copy.categories.educational}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('shop', 'calendars')}
                    className="hover:text-[#EACBD5] transition-colors"
                  >
                    {copy.categories.calendars}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleSelectProduct(PRODUCTS[0])}
                    className="hover:text-[#EACBD5] transition-colors"
                  >
                    {lang === 'en' ? 'Featured Edition Details' : 'Detalii Ediție Recomandată'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Studio & Legal Pages */}
            <div className="lg:col-span-2 space-y-3 text-xs">
              <p className="uppercase tracking-widest text-[#C8A46B] font-semibold">
                {lang === 'en' ? 'Studio House' : 'Casa ZALEA'}
              </p>
              <ul className="space-y-2.5 text-[#FFF9F5]/80">
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('about')}
                    className="hover:text-[#EACBD5] transition-colors"
                  >
                    {lang === 'en' ? 'About ZALEA' : 'Despre ZALEA'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('contact')}
                    className="hover:text-[#EACBD5] transition-colors"
                  >
                    {copy.nav.contact}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('faq')}
                    className="hover:text-[#EACBD5] transition-colors"
                  >
                    {copy.nav.faq}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('privacy')}
                    className="hover:text-[#EACBD5] transition-colors"
                  >
                    {lang === 'en' ? 'Privacy Policy' : 'Politica de Confidențialitate'}
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => handleNavigate('terms')}
                    className="hover:text-[#EACBD5] transition-colors"
                  >
                    {lang === 'en' ? 'Terms & Conditions' : 'Termeni și Condiții'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Atelier Letters Dispatch */}
            <div className="lg:col-span-3 space-y-3">
              <p className="text-xs uppercase tracking-widest text-[#C8A46B] font-semibold">
                {lang === 'en' ? 'Letters from Cristina’s Desk' : 'Scrisori din Atelierul Cristinei'}
              </p>
              <p className="text-xs text-[#FFF9F5]/75 leading-relaxed">
                {lang === 'en'
                  ? 'Receive a complimentary printable botanical bookmark set and seasonal studio releases.'
                  : 'Primești gratuit un set de semne de carte botanice imprimabile și noutățile sezoniere ale studioului.'}
              </p>

              {newsletterJoined ? (
                <div className="flex items-center gap-2 rounded-lg bg-[#FFF9F5]/10 px-3.5 py-2.5 text-xs text-[#EACBD5]">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>
                    {lang === 'en'
                      ? 'Welcome to the Atelier list! Check your inbox.'
                      : 'Bun venit în lista Atelierului! Verifică-ți căsuța de e-mail.'}
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full rounded-lg border border-[#FFF9F5]/20 bg-[#FFF9F5]/10 px-3.5 py-2 text-xs text-[#FFF9F5] placeholder:text-[#FFF9F5]/45 focus:border-[#EACBD5] focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="rounded-lg bg-[#C8A46B] px-4 py-2 text-xs font-semibold text-[#30272D] hover:bg-[#EACBD5] transition-colors whitespace-nowrap shrink-0"
                  >
                    {lang === 'en' ? 'Join' : 'Abonează-te'}
                  </button>
                </form>
              )}
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF9F5]/60">
            <p>
              © {new Date().getFullYear()} ZALEA CREATIV (zaleacreativ.com) ·{' '}
              {lang === 'en'
                ? 'Founded by Cristina. All botanical illustrations and publications reserved.'
                : 'Fondat de Cristina. Toate drepturile asupra ilustrațiilor și publicațiilor sunt rezervate.'}
            </p>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setLang('en')}
                className={`hover:text-[#FFF9F5] transition-colors ${
                  lang === 'en' ? 'text-[#EACBD5] font-medium' : ''
                }`}
              >
                English
              </button>
              <span>·</span>
              <button
                type="button"
                onClick={() => setLang('ro')}
                className={`hover:text-[#FFF9F5] transition-colors ${
                  lang === 'ro' ? 'text-[#EACBD5] font-medium' : ''
                }`}
              >
                Română
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Slide-Over Collection Bag & Instant Checkout Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        lang={lang}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={() => setCartItems([])}
        onExploreShop={() => handleNavigate('shop')}
        onOpenSheetModal={(sheet, productTitle) =>
          setPreviewModalState({ sheet, productTitle })
        }
      />

      {/* Full-Screen Printable Sheet Preview Modal */}
      <PrintablePreviewModal
        sheet={previewModalState.sheet}
        productTitle={previewModalState.productTitle}
        lang={lang}
        onClose={() => setPreviewModalState({ sheet: null, productTitle: '' })}
      />
    </div>
  );
}
