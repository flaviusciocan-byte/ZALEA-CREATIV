import React, { useState } from 'react';
import { CheckCircle2, Minus, Plus, Printer, ShoppingBag, Trash2, X } from 'lucide-react';
import { Language, Product, PrintableSheetPreview, UI_COPY } from '../data/catalog';
import { PrintableSheetRenderer } from './PrintableSheetRenderer';
import { StudioImage } from './StudioImage';

export interface CartItem {
  product: Product;
  license: 'personal' | 'educator';
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  lang: Language;
  onUpdateQuantity: (productId: string, license: 'personal' | 'educator', delta: number) => void;
  onRemoveItem: (productId: string, license: 'personal' | 'educator') => void;
  onClearCart: () => void;
  onExploreShop: () => void;
  onOpenSheetModal: (sheet: PrintableSheetPreview, productTitle: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  lang,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onExploreShop,
  onOpenSheetModal,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'checkout' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [confirmedItems, setConfirmedItems] = useState<CartItem[]>([]);
  const [orderNumber, setOrderNumber] = useState('ZC-4829');

  if (!isOpen) return null;

  const copy = UI_COPY[lang].cart;

  const subtotal = items.reduce((sum, item) => {
    const unitPrice =
      item.license === 'personal'
        ? item.product.price
        : item.product.price + item.product.educatorPriceDelta;
    return sum + unitPrice * item.quantity;
  }, 0);

  const discountAmount = discountApplied ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal - discountAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ZALEA10') {
      setDiscountApplied(true);
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerEmail.trim() || !customerName.trim()) return;
    setConfirmedItems([...items]);
    setOrderNumber(`ZC-${Math.floor(4100 + Math.random() * 5000)}`);
    setCheckoutStep('confirmed');
    onClearCart();
  };

  return (
    <div className="no-print fixed inset-0 z-50 flex justify-end bg-[#30272D]/45 backdrop-blur-[2px]">
      <div className="relative flex h-full w-full max-w-full sm:max-w-md flex-col bg-[#FFF9F5] text-[#30272D] shadow-2xl border-l border-[#30272D]/10">
        {/* Drawer Header */}
        <div className="flex items-center justify-between border-b border-[#30272D]/10 px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="h-4 w-4 text-[#A67589]" />
            <h2 className="font-editorial text-xl sm:text-2xl text-[#30272D]">{copy.title}</h2>
          </div>
          <button
            type="button"
            onClick={() => {
              setCheckoutStep('cart');
              onClose();
            }}
            className="rounded-lg p-2 text-[#30272D]/70 hover:bg-[#EACBD5]/30 hover:text-[#30272D] transition-colors"
            aria-label="Close bag"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-5 sm:py-6">
          {checkoutStep === 'confirmed' ? (
            <div className="space-y-6 py-4">
              <div className="rounded-2xl bg-[#EACBD5]/25 border border-[#30272D]/10 p-6 text-center space-y-3">
                <CheckCircle2 className="mx-auto h-9 w-9 text-[#A67589]" />
                <p className="text-xs uppercase tracking-widest text-[#A67589] tabular-nums">
                  {lang === 'en'
                    ? `Order #${orderNumber} Confirmed — Instant Archive Ready`
                    : `Comanda #${orderNumber} Confirmată — Arhivă Pregătită`}
                </p>
                <h3 className="font-editorial text-2xl text-[#30272D]">
                  {copy.orderConfirmedTitle}
                </h3>
                <p className="text-xs text-[#30272D]/80 leading-relaxed">
                  {copy.orderConfirmedSubtitle}{' '}
                  <span className="font-semibold text-[#30272D]">{customerEmail}</span>.
                </p>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#30272D]/70">
                  {lang === 'en' ? 'Your Unlocked 300 DPI Archives:' : 'Arhivele Tale PDF Deblocate:'}
                </p>
                {confirmedItems.map((item) => (
                  <div
                    key={`${item.product.id}-${item.license}`}
                    className="rounded-xl bg-[#FFFCF9] border border-[#30272D]/10 p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div>
                        <p className="font-editorial text-lg font-medium text-[#30272D]">
                          {item.product.title[lang]}
                        </p>
                        <p className="text-[11px] text-[#A67589]">
                          {item.product.pages} {UI_COPY[lang].productCard.pages} · A4 &amp; US Letter · EN + RO
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        onOpenSheetModal(
                          item.product.sheetPreviews[0],
                          item.product.title[lang]
                        );
                      }}
                      className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#30272D] px-4 py-2.5 text-xs font-medium text-[#FFF9F5] hover:bg-[#A67589] transition-colors"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      <span>{copy.downloadNowBtn}</span>
                    </button>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => {
                  setCheckoutStep('cart');
                  onClose();
                }}
                className="w-full rounded-xl border border-[#30272D]/20 py-3 text-xs font-medium text-[#30272D] hover:bg-[#EACBD5]/25 transition-colors"
              >
                {copy.continueShopping}
              </button>
            </div>
          ) : items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center py-12">
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#EACBD5]/30 text-[#A67589]">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <h3 className="font-editorial text-2xl text-[#30272D]">{copy.emptyTitle}</h3>
              <p className="mt-2 max-w-xs text-xs text-[#30272D]/70 leading-relaxed">
                {copy.emptySubtitle}
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onExploreShop();
                }}
                className="mt-6 rounded-xl bg-[#30272D] px-6 py-3 text-xs font-medium text-[#FFF9F5] hover:bg-[#A67589] transition-colors whitespace-nowrap shrink-0"
              >
                {copy.exploreBtn}
              </button>
            </div>
          ) : checkoutStep === 'checkout' ? (
            <form id="zalea-checkout-form" onSubmit={handleCompleteOrder} className="space-y-5">
              <button
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="text-xs text-[#A67589] hover:text-[#30272D] transition-colors"
              >
                ← {lang === 'en' ? 'Back to Collection Bag' : 'Înapoi la Coș'}
              </button>

              <div className="rounded-xl bg-[#FFFCF9] border border-[#30272D]/10 p-4 space-y-2">
                <p className="text-xs font-medium text-[#30272D]">
                  {lang === 'en'
                    ? 'Instant Digital Delivery (300 DPI PDF Archive)'
                    : 'Livrare Digitală Instantanee (Arhivă PDF 300 DPI)'}
                </p>
                <p className="text-[11px] text-[#30272D]/70">
                  {lang === 'en'
                    ? 'Both English (EN) and Romanian (RO) editions in A4 and US Letter sizes are unlocked immediately.'
                    : 'Edițiile în Engleză (EN) și Română (RO), în formatele A4 și US Letter, se deblochează imediat.'}
                </p>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#30272D]/80 mb-1.5">
                  {copy.nameLabel}
                </label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder={lang === 'en' ? 'Elena Popescu' : 'Elena Popescu'}
                  className="w-full rounded-lg border border-[#30272D]/15 bg-[#FFFCF9] px-3.5 py-2.5 text-sm text-[#30272D] focus:border-[#A67589] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#30272D]/80 mb-1.5">
                  {copy.emailLabel}
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  placeholder="elena@example.com"
                  className="w-full rounded-lg border border-[#30272D]/15 bg-[#FFFCF9] px-3.5 py-2.5 text-sm text-[#30272D] focus:border-[#A67589] focus:outline-none"
                />
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              {items.map((item) => {
                const unitPrice =
                  item.license === 'personal'
                    ? item.product.price
                    : item.product.price + item.product.educatorPriceDelta;
                return (
                  <div
                    key={`${item.product.id}-${item.license}`}
                    className="flex gap-4 rounded-xl bg-[#FFFCF9] p-3.5 border border-[#30272D]/10"
                  >
                    <div className="h-20 w-24 shrink-0 overflow-hidden rounded-lg bg-[#EACBD5]/20">
                      <StudioImage
                        src={item.product.image}
                        alt={item.product.title[lang]}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-editorial text-lg font-medium leading-snug text-[#30272D]">
                            {item.product.title[lang]}
                          </h4>
                          <button
                            type="button"
                            onClick={() => onRemoveItem(item.product.id, item.license)}
                            className="text-[#30272D]/45 hover:text-[#30272D] p-1"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <p className="text-[11px] text-[#A67589]">
                          {item.license === 'personal'
                            ? lang === 'en'
                              ? 'Personal & Household License'
                              : 'Licență Personală & Familie'
                            : lang === 'en'
                            ? 'Classroom & Educator License'
                            : 'Licență Educator & Clasă'}
                        </p>
                      </div>

                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-lg border border-[#30272D]/15 bg-[#FFF9F5] px-2 py-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.license, -1)}
                            className="p-1 text-[#30272D]/70 hover:text-[#30272D]"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="text-xs font-medium tabular-nums">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => onUpdateQuantity(item.product.id, item.license, 1)}
                            className="p-1 text-[#30272D]/70 hover:text-[#30272D]"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>

                        <span className="text-sm font-semibold text-[#30272D] tabular-nums">
                          €{(unitPrice * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}

              <form onSubmit={handleApplyPromo} className="pt-2 flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  placeholder={copy.promoPlaceholder}
                  className="flex-1 rounded-lg border border-[#30272D]/15 bg-[#FFFCF9] px-3 py-2 text-xs text-[#30272D] focus:border-[#A67589] focus:outline-none"
                />
                <button
                  type="submit"
                  className="rounded-lg border border-[#30272D]/20 bg-[#FFFCF9] px-4 py-2 text-xs font-medium text-[#30272D] hover:bg-[#EACBD5]/25 transition-colors whitespace-nowrap shrink-0"
                >
                  {copy.apply}
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {items.length > 0 && checkoutStep !== 'confirmed' && (
          <div className="border-t border-[#30272D]/10 bg-[#FFFCF9] px-6 py-5 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#30272D]/75">
                <span>{copy.subtotal}</span>
                <span className="tabular-nums">€{subtotal.toFixed(2)}</span>
              </div>
              {discountApplied && (
                <div className="flex justify-between text-[#A67589] font-medium">
                  <span>{copy.discount}</span>
                  <span className="tabular-nums">-€{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between pt-2 border-t border-[#30272D]/10 text-sm font-semibold text-[#30272D]">
                <span>{copy.total}</span>
                <span className="tabular-nums">€{total.toFixed(2)}</span>
              </div>
            </div>

            {checkoutStep === 'cart' ? (
              <button
                type="button"
                onClick={() => setCheckoutStep('checkout')}
                className="w-full rounded-xl bg-[#30272D] py-3.5 text-xs font-semibold text-[#FFF9F5] hover:bg-[#A67589] transition-colors whitespace-nowrap shrink-0"
              >
                {copy.checkoutBtn}
              </button>
            ) : (
              <button
                type="submit"
                form="zalea-checkout-form"
                className="w-full rounded-xl bg-[#30272D] py-3.5 text-xs font-semibold text-[#FFF9F5] hover:bg-[#A67589] transition-colors whitespace-nowrap shrink-0"
              >
                {copy.completeOrderBtn} — €{total.toFixed(2)}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

interface PrintablePreviewModalProps {
  sheet: PrintableSheetPreview | null;
  productTitle: string;
  lang: Language;
  onClose: () => void;
}

export const PrintablePreviewModal: React.FC<PrintablePreviewModalProps> = ({
  sheet,
  productTitle,
  lang,
  onClose,
}) => {
  if (!sheet) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#30272D]/60 p-3 sm:p-6 backdrop-blur-[2px] overflow-y-auto">
      <div className="relative my-auto w-full max-w-2xl rounded-2xl bg-[#FFF9F5] border border-[#30272D]/15 p-4 sm:p-8 shadow-2xl">
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#30272D]/10 pb-4 mb-4 sm:mb-6">
          <div className="flex items-center justify-between sm:block">
            <div>
              <p className="text-[11px] uppercase tracking-widest text-[#A67589]">
                {productTitle}
              </p>
              <h3 className="font-editorial text-xl sm:text-2xl text-[#30272D]">
                {sheet.title[lang]}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="sm:hidden rounded-lg p-2 text-[#30272D]/70 hover:bg-[#EACBD5]/30 hover:text-[#30272D]"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-[#30272D] px-3.5 sm:px-4 py-2 text-xs font-medium text-[#FFF9F5] hover:bg-[#A67589] transition-colors whitespace-nowrap shrink-0"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>
                {lang === 'en' ? 'Print Sample Sheet' : 'Tipărește Pagina Mostră'}
              </span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="hidden sm:block rounded-lg p-2 text-[#30272D]/70 hover:bg-[#EACBD5]/30 hover:text-[#30272D]"
              aria-label="Close preview"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        <PrintableSheetRenderer
          sheet={sheet}
          lang={lang}
          interactiveColoring={true}
        />

        <p className="no-print mt-4 text-center text-xs text-[#30272D]/65">
          {sheet.caption[lang]}
        </p>
      </div>
    </div>
  );
};
