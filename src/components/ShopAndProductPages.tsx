import React, { useMemo, useState } from 'react';
import { ArrowLeft, Check, Eye, FileText, Layers, Printer, Search, Sparkles } from 'lucide-react';
import {
  Language,
  PRODUCTS,
  Product,
  ProductCategory,
  PrintableSheetPreview,
  UI_COPY,
} from '../data/catalog';
import { ProductCard } from './ProductCard';
import { PrintableSheetRenderer } from './PrintableSheetRenderer';
import { StudioImage } from './StudioImage';

interface ShopPageProps {
  lang: Language;
  initialCategory?: ProductCategory;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, license: 'personal' | 'educator') => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  lang,
  initialCategory = 'all',
  onSelectProduct,
  onAddToCart,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'pages-desc'>('featured');

  const copy = UI_COPY[lang];

  const filteredProducts = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PRODUCTS.filter((product) => {
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesQuery =
        !q ||
        product.title[lang].toLowerCase().includes(q) ||
        product.subtitle[lang].toLowerCase().includes(q) ||
        product.categoryLabel[lang].toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'pages-desc') return b.pages - a.pages;
      return Number(b.featured) - Number(a.featured);
    });
  }, [selectedCategory, searchQuery, sortBy, lang]);

  const categories: { id: ProductCategory; label: string }[] = [
    { id: 'all', label: copy.categories.all },
    { id: 'coloring', label: copy.categories.coloring },
    { id: 'planners', label: copy.categories.planners },
    { id: 'educational', label: copy.categories.educational },
    { id: 'calendars', label: copy.categories.calendars },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-8 sm:py-16">
      {/* Header */}
      <div className="max-w-3xl">
        <p className="text-xs uppercase tracking-widest text-[#A67589] mb-2">
          {copy.shopPage.kicker}
        </p>
        <h1 className="font-editorial text-3xl sm:text-5xl text-[#30272D]">
          {copy.shopPage.title}
        </h1>
        <p className="mt-2.5 text-sm sm:text-base text-[#30272D]/75 leading-relaxed">
          {copy.shopPage.subtitle}
        </p>
      </div>

      {/* Interactive Filter & Search Toolbar */}
      <div className="mt-8 sm:mt-10 flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 sm:pb-8 border-b border-[#30272D]/10">
        {/* Category Tabs: Scrollable on mobile */}
        <div className="flex items-center gap-1.5 p-1.5 bg-[#EACBD5]/25 rounded-xl border border-[#30272D]/10 max-w-full overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#30272D] text-[#FFF9F5] shadow-xs'
                  : 'text-[#30272D]/80 hover:bg-[#FFF9F5]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative min-w-[240px]">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#A67589]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={copy.shopPage.searchPlaceholder}
              className="w-full rounded-lg border border-[#30272D]/15 bg-[#FFFCF9] pl-10 pr-4 py-2 text-xs text-[#30272D] placeholder:text-[#30272D]/45 focus:border-[#A67589] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-[#30272D]/65 whitespace-nowrap shrink-0">
              {copy.shopPage.sortBy}:
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-[#30272D]/15 bg-[#FFFCF9] px-3 py-2 text-xs font-medium text-[#30272D] focus:border-[#A67589] focus:outline-none"
            >
              <option value="featured">{copy.shopPage.sortFeatured}</option>
              <option value="price-asc">{copy.shopPage.sortPriceAsc}</option>
              <option value="price-desc">{copy.shopPage.sortPriceDesc}</option>
              <option value="pages-desc">{copy.shopPage.sortPagesDesc}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Count Line */}
      <div className="mt-6 flex items-center justify-between text-xs text-[#30272D]/65">
        <span className="tabular-nums">
          {filteredProducts.length} {copy.shopPage.showingCount}
        </span>
        <span>300 DPI PDF · A4 &amp; US Letter · EN + RO</span>
      </div>

      {/* 3-Column Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="my-16 rounded-2xl bg-[#FFFCF9] border border-[#30272D]/10 p-12 text-center">
          <p className="font-editorial text-2xl text-[#30272D]">
            {lang === 'en'
              ? 'No creations matched your search filter.'
              : 'Nicio creație nu corespunde filtrului selectat.'}
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('all');
              setSearchQuery('');
            }}
            className="mt-4 rounded-lg bg-[#30272D] px-5 py-2.5 text-xs font-medium text-[#FFF9F5] hover:bg-[#A67589] transition-colors"
          >
            {lang === 'en' ? 'Reset Filters' : 'Resetează Filtrele'}
          </button>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

interface ProductDetailsPageProps {
  product: Product;
  lang: Language;
  onBackToShop: () => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, license: 'personal' | 'educator') => void;
  onOpenSheetModal: (sheet: PrintableSheetPreview, productTitle: string) => void;
}

export const ProductDetailsPage: React.FC<ProductDetailsPageProps> = ({
  product,
  lang,
  onBackToShop,
  onSelectProduct,
  onAddToCart,
  onOpenSheetModal,
}) => {
  const [selectedLicense, setSelectedLicense] = useState<'personal' | 'educator'>('personal');
  const [activeMediaTab, setActiveMediaTab] = useState<'photo-1' | 'photo-2' | string>('photo-1');
  const [addedFeedback, setAddedFeedback] = useState(false);

  const copy = UI_COPY[lang].pdp;
  const finalPrice =
    selectedLicense === 'personal' ? product.price : product.price + product.educatorPriceDelta;

  const activeSheet = product.sheetPreviews.find((s) => s.id === activeMediaTab);

  const relatedProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);
  }, [product.id]);

  const handleAdd = () => {
    onAddToCart(product, selectedLicense);
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 1600);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-14">
      <button
        type="button"
        onClick={onBackToShop}
        className="inline-flex items-center gap-2 text-xs font-medium text-[#30272D]/75 hover:text-[#30272D] transition-colors mb-6 sm:mb-8 whitespace-nowrap shrink-0"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        <span>{copy.backToShop}</span>
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Gallery & Interactive Interior Sheet Viewer */}
        <div className="lg:col-span-7 lg:sticky lg:top-24 space-y-4">
          <div className="rounded-2xl bg-[#FFFCF9] border border-[#30272D]/10 overflow-hidden p-4 sm:p-6">
            {activeSheet ? (
              <div className="py-2">
                <PrintableSheetRenderer
                  sheet={activeSheet}
                  lang={lang}
                  interactiveColoring={true}
                />
              </div>
            ) : (
              <div className="aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#EACBD5]/20">
                <StudioImage
                  src={activeMediaTab === 'photo-2' ? product.secondaryImage : product.image}
                  alt={product.title[lang]}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-medium text-[#A67589] mb-2.5">
              {copy.insidePagesTitle}:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
              <button
                type="button"
                onClick={() => setActiveMediaTab('photo-1')}
                className={`rounded-xl overflow-hidden border text-left transition-all p-1.5 bg-[#FFFCF9] ${
                  activeMediaTab === 'photo-1'
                    ? 'border-[#30272D] ring-1 ring-[#30272D]'
                    : 'border-[#30272D]/12 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-1">
                  <StudioImage
                    src={product.image}
                    alt={product.title[lang]}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-[10px] font-medium text-[#30272D] truncate px-1">
                  {lang === 'en' ? 'Studio Edition' : 'Fotografie Studio'}
                </p>
              </button>

              <button
                type="button"
                onClick={() => setActiveMediaTab('photo-2')}
                className={`rounded-xl overflow-hidden border text-left transition-all p-1.5 bg-[#FFFCF9] ${
                  activeMediaTab === 'photo-2'
                    ? 'border-[#30272D] ring-1 ring-[#30272D]'
                    : 'border-[#30272D]/12 opacity-80 hover:opacity-100'
                }`}
              >
                <div className="aspect-[4/3] rounded-lg overflow-hidden mb-1">
                  <StudioImage
                    src={product.secondaryImage}
                    alt={product.title[lang]}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </div>
                <p className="text-[10px] font-medium text-[#30272D] truncate px-1">
                  {lang === 'en' ? 'Flat-Lay Detail' : 'Detaliu Papetărie'}
                </p>
              </button>

              {product.sheetPreviews.map((sheet, idx) => (
                <button
                  key={sheet.id}
                  type="button"
                  onClick={() => setActiveMediaTab(sheet.id)}
                  className={`rounded-xl border text-left transition-all p-2.5 bg-[#FFFCF9] flex flex-col justify-between ${
                    activeMediaTab === sheet.id
                      ? 'border-[#30272D] ring-1 ring-[#30272D]'
                      : 'border-[#30272D]/12 hover:border-[#A67589]'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-[#A67589]">
                    <FileText className="h-3.5 w-3.5" />
                    <span className="tabular-nums">{sheet.pageNumber}</span>
                  </div>
                  <p className="mt-2 text-[11px] font-editorial font-semibold text-[#30272D] line-clamp-2 leading-tight">
                    {sheet.title[lang]}
                  </p>
                  <span className="mt-1 text-[9px] uppercase tracking-wider text-[#A67589]">
                    {lang === 'en' ? `Plate ${idx + 1}` : `Planșa ${idx + 1}`}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 rounded-2xl bg-[#FFFCF9] border border-[#30272D]/10 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2 text-xs text-[#A67589]">
            <span className="uppercase tracking-wider font-medium">
              {product.categoryLabel[lang]}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">SKU {product.sku}</span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {product.pages} {UI_COPY[lang].productCard.pages}
            </span>
          </div>

          <div>
            <h1 className="font-editorial text-3xl sm:text-4xl text-[#30272D] leading-tight">
              {product.title[lang]}
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-[#30272D]/75 leading-relaxed">
              {product.subtitle[lang]}
            </p>
          </div>

          <div className="flex items-baseline justify-between pt-2 border-t border-[#30272D]/10">
            <div>
              <span className="font-editorial text-3xl sm:text-4xl font-semibold text-[#30272D] tabular-nums">
                €{finalPrice.toFixed(2)}
              </span>
              <span className="ml-2 text-xs text-[#30272D]/60">
                {lang === 'en' ? 'VAT included · Instant Digital Archive' : 'TVA inclus · Arhivă Digitală Instantanee'}
              </span>
            </div>
          </div>

          {/* License Selector */}
          <div className="space-y-2.5">
            <label className="block text-xs font-medium uppercase tracking-wider text-[#30272D]/75">
              {copy.licenseLabel}
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              <button
                type="button"
                onClick={() => setSelectedLicense('personal')}
                className={`flex items-start justify-between rounded-xl border p-3.5 text-left transition-colors ${
                  selectedLicense === 'personal'
                    ? 'border-[#30272D] bg-[#EACBD5]/20'
                    : 'border-[#30272D]/15 bg-[#FFF9F5] hover:border-[#A67589]'
                }`}
              >
                <div>
                  <p className="text-xs font-semibold text-[#30272D]">{copy.personalLicense}</p>
                  <p className="mt-0.5 text-xs text-[#30272D]/70">{copy.personalLicenseDesc}</p>
                </div>
                <span className="text-xs font-semibold text-[#30272D] tabular-nums shrink-0 ml-3">
                  €{product.price.toFixed(2)}
                </span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedLicense('educator')}
                className={`flex items-start justify-between rounded-xl border p-3.5 text-left transition-colors ${
                  selectedLicense === 'educator'
                    ? 'border-[#30272D] bg-[#EACBD5]/20'
                    : 'border-[#30272D]/15 bg-[#FFF9F5] hover:border-[#A67589]'
                }`}
              >
                <div>
                  <p className="text-xs font-semibold text-[#30272D]">{copy.educatorLicense}</p>
                  <p className="mt-0.5 text-xs text-[#30272D]/70">{copy.educatorLicenseDesc}</p>
                </div>
                <span className="text-xs font-semibold text-[#30272D] tabular-nums shrink-0 ml-3">
                  €{(product.price + product.educatorPriceDelta).toFixed(2)}
                </span>
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3 pt-2">
            <button
              type="button"
              onClick={handleAdd}
              className={`w-full flex items-center justify-center gap-2 rounded-xl px-6 py-4 text-xs font-semibold tracking-wide transition-colors whitespace-nowrap shrink-0 ${
                addedFeedback
                  ? 'bg-[#A67589] text-[#FFF9F5]'
                  : 'bg-[#30272D] text-[#FFF9F5] hover:bg-[#A67589]'
              }`}
            >
              {addedFeedback ? (
                <>
                  <Check className="h-4 w-4" />
                  <span>
                    {lang === 'en'
                      ? 'Added to Your Collection Bag'
                      : 'Adăugat în Coșul de Colecție'}
                  </span>
                </>
              ) : (
                <span>
                  {copy.addToBag} — €{finalPrice.toFixed(2)}
                </span>
              )}
            </button>

            <button
              type="button"
              onClick={() =>
                onOpenSheetModal(product.sheetPreviews[0], product.title[lang])
              }
              className="w-full flex items-center justify-center gap-2 rounded-xl border border-[#30272D]/20 bg-[#FFF9F5] px-5 py-3 text-xs font-medium text-[#30272D] hover:bg-[#EACBD5]/25 transition-colors whitespace-nowrap shrink-0"
            >
              <Eye className="h-3.5 w-3.5 text-[#A67589]" />
              <span>{copy.previewSheetBtn}</span>
            </button>

            <p className="text-center text-[11px] text-[#30272D]/65">
              {copy.instantDeliveryNote}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-[#30272D]/10 text-sm text-[#30272D]/85 leading-relaxed">
            {product.description[lang].map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>

          <div className="pt-4 border-t border-[#30272D]/10">
            <h3 className="font-editorial text-xl text-[#30272D] mb-3">
              {copy.whatsIncludedTitle}
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-[#30272D]/80">
              {product.whatsIncluded[lang].map((item, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Sparkles className="h-3.5 w-3.5 text-[#C8A46B] shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-4 border-t border-[#30272D]/10 space-y-2.5 text-xs">
            <h3 className="font-editorial text-xl text-[#30272D] mb-2">
              {copy.specificationsTitle}
            </h3>
            <div className="flex items-start justify-between gap-4 py-1.5 border-b border-[#30272D]/8">
              <span className="text-[#30272D]/65 flex items-center gap-1.5">
                <Printer className="h-3.5 w-3.5 text-[#A67589]" />
                {copy.paperRecLabel}
              </span>
              <span className="text-right font-medium text-[#30272D] max-w-[230px]">
                {product.paperRecommendation[lang]}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1.5 border-b border-[#30272D]/8">
              <span className="text-[#30272D]/65 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-[#A67589]" />
                {copy.dimensionsLabel}
              </span>
              <span className="text-right font-medium text-[#30272D] tabular-nums">
                {product.dimensions}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1.5 border-b border-[#30272D]/8">
              <span className="text-[#30272D]/65">{copy.resolutionLabel}</span>
              <span className="text-right font-medium text-[#30272D] tabular-nums">
                {product.dpi}
              </span>
            </div>
            <div className="flex items-center justify-between gap-4 py-1.5">
              <span className="text-[#30272D]/65">{copy.languagesLabel}</span>
              <span className="text-right font-medium text-[#30272D]">
                {copy.languagesValue}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Companion Creations */}
      <div className="mt-20 pt-14 border-t border-[#30272D]/10">
        <h2 className="font-editorial text-3xl sm:text-4xl text-[#30272D] mb-8">
          {copy.relatedTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedProducts.map((rel) => (
            <ProductCard
              key={rel.id}
              product={rel}
              lang={lang}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
