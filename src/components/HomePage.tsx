import React, { useState } from 'react';
import { ArrowRight, BookOpen, Check, Eye, Layers, Printer, ShoppingBag, Sparkles } from 'lucide-react';
import {
  Language,
  PRODUCTS,
  PageRoute,
  Product,
  ProductCategory,
  PrintableSheetPreview,
  STUDIO_IMAGES,
  TESTIMONIALS,
  UI_COPY,
} from '../data/catalog';
import { ProductCard } from './ProductCard';
import { PrintableSheetRenderer } from './PrintableSheetRenderer';
import { StudioImage } from './StudioImage';
import { FreeColoringPageSection } from './FreeColoringPageSection';

interface HomePageProps {
  lang: Language;
  onNavigate: (page: PageRoute, category?: ProductCategory) => void;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, license: 'personal' | 'educator') => void;
  onOpenSheetModal: (sheet: PrintableSheetPreview, productTitle: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  lang,
  onNavigate,
  onSelectProduct,
  onAddToCart,
  onOpenSheetModal,
}) => {
  const [activeCategory, setActiveCategory] = useState<ProductCategory>('all');
  const [selectedPreviewIdx, setSelectedPreviewIdx] = useState<number>(0);
  const [heroMediaTab, setHeroMediaTab] = useState<'cover' | 'sheet' | 'studio'>('cover');
  const [heroAddedFeedback, setHeroAddedFeedback] = useState(false);

  const featuredProduct = PRODUCTS[0]; // Botanica: Acanthus, Peony & Wild Rose

  const handleHeroAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(featuredProduct, 'personal');
    setHeroAddedFeedback(true);
    setTimeout(() => setHeroAddedFeedback(false), 2000);
  };

  const copy = UI_COPY[lang];

  const displayedProducts =
    activeCategory === 'all'
      ? PRODUCTS.slice(0, 6)
      : PRODUCTS.filter((p) => p.category === activeCategory);

  const interactiveShowcaseSheets: {
    label: { en: string; ro: string };
    product: Product;
    sheet: PrintableSheetPreview;
  }[] = [
    {
      label: { en: '01. Botanical Coloring Plate', ro: '01. Planșă Botanică de Colorat' },
      product: PRODUCTS[0],
      sheet: PRODUCTS[0].sheetPreviews[0],
    },
    {
      label: { en: '02. Serene Family Planner', ro: '02. Planificator de Familie' },
      product: PRODUCTS[1],
      sheet: PRODUCTS[1].sheetPreviews[0],
    },
    {
      label: { en: '03. Bilingual Montessori Cards', ro: '03. Carduri Bilingve Montessori' },
      product: PRODUCTS[2],
      sheet: PRODUCTS[2].sheetPreviews[0],
    },
  ];

  const currentShowcase = interactiveShowcaseSheets[selectedPreviewIdx];

  return (
    <div className="space-y-16 sm:space-y-24 lg:space-y-32 pb-16 sm:pb-20">
      {/* SECTION 1: HERO SECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 pt-5 sm:pt-10 lg:pt-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Introductory Content: Typography & CTAs (Appears first on mobile) */}
          <div className="lg:col-span-6 flex flex-col justify-between py-1 sm:py-2">
            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs uppercase tracking-widest text-[#A67589]">
                <span>{copy.hero.kicker}</span>
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-normal leading-[1.12] sm:leading-[1.08] tracking-tight text-[#30272D]">
                {copy.hero.headline}
              </h1>

              <p className="max-w-xl text-sm sm:text-base lg:text-lg text-[#30272D]/80 leading-relaxed">
                {copy.hero.subheadline}
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('shop')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-[#30272D] px-6 sm:px-7 py-3.5 sm:py-4 text-xs sm:text-sm font-medium text-[#FFF9F5] hover:bg-[#A67589] transition-colors whitespace-nowrap shadow-xs"
                >
                  <span>{copy.hero.primaryCta}</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#30272D]/25 bg-[#FFFCF9] px-6 py-3.5 sm:py-4 text-xs sm:text-sm font-medium text-[#30272D] hover:bg-[#EACBD5]/30 transition-colors whitespace-nowrap"
                >
                  <span>{copy.hero.secondaryCta}</span>
                </button>
              </div>
            </div>

            <div className="mt-6 sm:mt-10 pt-4 sm:pt-6 border-t border-[#30272D]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#30272D]/70">
              <span className="leading-relaxed">
                {lang === 'en'
                  ? 'Botanical Coloring Books · Family Planners · Montessori Nature Cards'
                  : 'Cărți de Colorat Botanice · Planificatoare · Carduri Montessori'}
              </span>
              <button
                type="button"
                onClick={() =>
                  onOpenSheetModal(
                    PRODUCTS[0].sheetPreviews[0],
                    PRODUCTS[0].title[lang]
                  )
                }
                className="inline-flex items-center gap-1.5 font-medium text-[#A67589] hover:text-[#30272D] transition-colors whitespace-nowrap shrink-0"
              >
                <Eye className="h-3.5 w-3.5" />
                <span>{copy.hero.sampleCta}</span>
              </button>
            </div>
          </div>

          {/* Featured Real Product Showcase: Botanica: Acanthus, Peony & Wild Rose */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div className="rounded-2xl bg-[#FFFCF9] border border-[#30272D]/12 overflow-hidden shadow-[0_14px_34px_-12px_rgba(48,39,45,0.12)] flex flex-col justify-between h-full">
              {/* Product Header Bar */}
              <div className="p-4 sm:p-5 pb-3 border-b border-[#30272D]/8 bg-[#FAF7F2]/80 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-medium text-[#A67589] uppercase tracking-wider text-[11px]">
                    {lang === 'en' ? 'Featured Volume' : 'Volum Recomandat'}
                  </span>
                  <span className="text-[#30272D]/30">·</span>
                  <span className="text-[#30272D]/75 text-[11px] font-medium">
                    {featuredProduct.editionNote[lang]}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#A67589] bg-[#EACBD5]/30 px-2.5 py-1 rounded-md">
                  <span>300 DPI Archival PDF</span>
                </div>
              </div>

              {/* Interactive Stage & Controls */}
              <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
                {/* 3 Interactive View Tabs */}
                <div className="flex items-center gap-1 p-1 bg-[#EACBD5]/20 rounded-xl border border-[#30272D]/10">
                  <button
                    type="button"
                    onClick={() => setHeroMediaTab('cover')}
                    className={`flex-1 py-1.5 px-2 text-[11px] sm:text-xs font-medium rounded-lg transition-all text-center ${
                      heroMediaTab === 'cover'
                        ? 'bg-[#30272D] text-[#FFF9F5] shadow-xs'
                        : 'text-[#30272D]/75 hover:bg-[#FFF9F5]'
                    }`}
                  >
                    {lang === 'en' ? 'Edition Cover' : 'Copertă Ediție'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroMediaTab('sheet')}
                    className={`flex-1 py-1.5 px-2 text-[11px] sm:text-xs font-medium rounded-lg transition-all text-center flex items-center justify-center gap-1 ${
                      heroMediaTab === 'sheet'
                        ? 'bg-[#30272D] text-[#FFF9F5] shadow-xs'
                        : 'text-[#30272D]/75 hover:bg-[#FFF9F5]'
                    }`}
                  >
                    <span>{lang === 'en' ? 'Interactive Plate IV' : 'Planșă Interactivă IV'}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setHeroMediaTab('studio')}
                    className={`flex-1 py-1.5 px-2 text-[11px] sm:text-xs font-medium rounded-lg transition-all text-center ${
                      heroMediaTab === 'studio'
                        ? 'bg-[#30272D] text-[#FFF9F5] shadow-xs'
                        : 'text-[#30272D]/75 hover:bg-[#FFF9F5]'
                    }`}
                  >
                    {lang === 'en' ? 'Studio Setup' : 'Atelier & Machetă'}
                  </button>
                </div>

                {/* View Container */}
                <div className="relative aspect-[4/3] sm:aspect-[16/11] w-full rounded-xl overflow-hidden border border-[#30272D]/10 bg-[#FAF7F2] flex items-center justify-center shadow-inner">
                  {heroMediaTab === 'cover' && (
                    <div
                      onClick={() => onSelectProduct(featuredProduct)}
                      className="cursor-pointer h-full w-full relative group"
                    >
                      <StudioImage
                        src={featuredProduct.image}
                        alt={featuredProduct.title[lang]}
                        loading="eager"
                        fetchPriority="high"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                      <div className="absolute inset-0 bg-[#30272D]/0 group-hover:bg-[#30272D]/15 transition-colors flex items-center justify-center">
                        <span className="opacity-0 group-hover:opacity-100 transition-opacity rounded-lg bg-white/95 px-3 py-1.5 text-xs font-medium text-[#30272D] shadow-sm">
                          {lang === 'en' ? 'Click to Inspect Edition' : 'Apasă pentru Detalii'}
                        </span>
                      </div>
                    </div>
                  )}

                  {heroMediaTab === 'sheet' && (
                    <div className="h-full w-full overflow-y-auto p-2.5 sm:p-3 flex flex-col items-center justify-center bg-[#FFFCF9]">
                      <PrintableSheetRenderer
                        sheet={featuredProduct.sheetPreviews[0]}
                        lang={lang}
                        interactiveColoring={true}
                        compact={true}
                      />
                    </div>
                  )}

                  {heroMediaTab === 'studio' && (
                    <div
                      onClick={() => onSelectProduct(featuredProduct)}
                      className="cursor-pointer h-full w-full"
                    >
                      <StudioImage
                        src={featuredProduct.secondaryImage}
                        alt="ZALEA CREATIV Botanical Coloring Book and Family Planner Flat-Lay"
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Real Product Metadata & Inclusions */}
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3
                        onClick={() => onSelectProduct(featuredProduct)}
                        className="font-editorial text-xl sm:text-2xl font-medium text-[#30272D] hover:text-[#A67589] cursor-pointer transition-colors"
                      >
                        {featuredProduct.title[lang]}
                      </h3>
                      <p className="mt-1 text-xs sm:text-sm text-[#30272D]/75 leading-relaxed line-clamp-2">
                        {featuredProduct.subtitle[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Tactile Craft Specification Badges */}
                  <div className="mt-3 flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] text-[#30272D]/75">
                    <span className="inline-flex items-center gap-1 bg-[#FAF7F2] border border-[#30272D]/10 px-2 py-1 rounded-md">
                      <BookOpen className="h-3 w-3 text-[#A67589] shrink-0" />
                      <span>{lang === 'en' ? '42 Hand-Inked Plates' : '42 Planșe Desenate Manual'}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#FAF7F2] border border-[#30272D]/10 px-2 py-1 rounded-md">
                      <Layers className="h-3 w-3 text-[#A67589] shrink-0" />
                      <span>A4 &amp; US Letter</span>
                    </span>
                    <span className="inline-flex items-center gap-1 bg-[#FAF7F2] border border-[#30272D]/10 px-2 py-1 rounded-md">
                      <Sparkles className="h-3 w-3 text-[#C8A46B] shrink-0" />
                      <span>{lang === 'en' ? 'Bilingual EN + RO Index' : 'Index Bilingv EN + RO'}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Product Action Bar: Price + Add to Bag + Inspect */}
              <div className="p-4 sm:p-5 pt-3 border-t border-[#30272D]/10 bg-[#FAF7F2]/70 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3.5">
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl sm:text-2xl font-semibold text-[#30272D] tabular-nums">
                      €{featuredProduct.price.toFixed(2)}
                    </span>
                    <span className="text-[11px] text-[#30272D]/60 font-medium">
                      {lang === 'en' ? 'Personal License' : 'Licență Personală'}
                    </span>
                  </div>
                  <span className="text-[10px] text-[#A67589] uppercase tracking-wider font-medium mt-0.5">
                    {lang === 'en' ? 'Instant Digital Download (PDF)' : 'Descărcare Digitală Instantanee (PDF)'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() =>
                      onOpenSheetModal(
                        featuredProduct.sheetPreviews[0],
                        featuredProduct.title[lang]
                      )
                    }
                    className="flex-1 sm:flex-none px-3.5 py-2.5 text-xs font-medium text-[#30272D] hover:text-[#A67589] border border-[#30272D]/15 rounded-xl bg-white hover:bg-[#FAF7F2] transition-colors whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5"
                  >
                    <Eye className="h-3.5 w-3.5 text-[#A67589]" />
                    <span>{lang === 'en' ? 'Inspect Plate' : 'Inspectează'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleHeroAddToCart}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                      heroAddedFeedback
                        ? 'bg-[#A67589] text-[#FFF9F5]'
                        : 'bg-[#30272D] text-[#FFF9F5] hover:bg-[#A67589]'
                    }`}
                  >
                    {heroAddedFeedback ? (
                      <>
                        <Check className="h-3.5 w-3.5" />
                        <span>{lang === 'en' ? 'Added to Bag!' : 'Adăugat în Coș!'}</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="h-3.5 w-3.5" />
                        <span>{lang === 'en' ? 'Add to Bag' : 'Adaugă în Coș'}</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectProduct(featuredProduct)}
                    className="hidden sm:inline-flex px-3 py-2.5 text-xs font-medium text-[#30272D]/75 hover:text-[#30272D] transition-colors whitespace-nowrap shrink-0"
                    title={lang === 'en' ? 'View Complete Edition' : 'Vezi Toată Ediția'}
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights Strip: 2x2 on Mobile, 4-col on Desktop */}
        <div className="mt-8 sm:mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 rounded-2xl bg-[#FFFCF9] border border-[#30272D]/10 p-5 sm:p-8">
          {copy.hero.metrics.map((metric, index) => (
            <div
              key={index}
              className={`flex flex-col justify-between ${
                index % 2 === 0 ? 'pr-3 border-r border-[#30272D]/10 lg:border-r' : 'pl-3 lg:pl-0'
              } ${
                index < 2 ? 'border-b border-[#30272D]/10 pb-4 lg:border-b-0 lg:pb-0' : 'pt-2 lg:pt-0'
              } ${
                index !== 3 ? 'lg:border-r lg:pr-6' : 'lg:border-r-0'
              }`}
            >
              <span className="font-editorial text-xl sm:text-2xl lg:text-3xl font-semibold text-[#30272D] tabular-nums">
                {metric.value}
              </span>
              <span className="mt-1 text-[11px] sm:text-xs text-[#30272D]/70 leading-relaxed">
                {metric.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION: TRY A LITTLE MOMENT OF JOY (COMPLIMENTARY COLORING PAGE SAMPLE) */}
      <FreeColoringPageSection lang={lang} />

      {/* SECTION 2: CURATED COLLECTION */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-10">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-widest text-[#A67589] mb-2">
              {copy.homeSections.curatedKicker}
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#30272D]">
              {copy.homeSections.curatedTitle}
            </h2>
            <p className="mt-2.5 text-sm sm:text-base text-[#30272D]/75 leading-relaxed">
              {copy.homeSections.curatedSubtitle}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#30272D] hover:text-[#A67589] transition-colors whitespace-nowrap shrink-0"
          >
            <span>{copy.homeSections.viewAllShop}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Category Tabs: Scrollable on narrow mobile */}
        <div className="mb-8 sm:mb-10 flex items-center gap-1.5 p-1.5 bg-[#EACBD5]/25 rounded-xl border border-[#30272D]/10 max-w-full overflow-x-auto no-scrollbar">
          {(
            [
              { id: 'all', label: copy.categories.all },
              { id: 'coloring', label: copy.categories.coloring },
              { id: 'planners', label: copy.categories.planners },
              { id: 'educational', label: copy.categories.educational },
              { id: 'calendars', label: copy.categories.calendars },
            ] as { id: ProductCategory; label: string }[]
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3.5 sm:px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                activeCategory === tab.id
                  ? 'bg-[#30272D] text-[#FFF9F5]'
                  : 'text-[#30272D]/80 hover:bg-[#FFF9F5]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 3-Column Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              lang={lang}
              onSelectProduct={onSelectProduct}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </section>

      {/* SECTION 3: INTERACTIVE PRINTABLE SHEET PREVIEW */}
      <section className="bg-[#EACBD5]/20 border-y border-[#30272D]/10 py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Description & Switcher */}
            <div className="lg:col-span-5 space-y-5 sm:space-y-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#A67589] mb-2">
                  {copy.homeSections.insideLookKicker}
                </p>
                <h2 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-[#30272D]">
                  {copy.homeSections.insideLookTitle}
                </h2>
                <p className="mt-2.5 text-xs sm:text-sm lg:text-base text-[#30272D]/80 leading-relaxed">
                  {copy.homeSections.insideLookSubtitle}
                </p>
              </div>

              <div className="space-y-2.5">
                {interactiveShowcaseSheets.map((item, idx) => (
                  <button
                    key={item.sheet.id}
                    type="button"
                    onClick={() => setSelectedPreviewIdx(idx)}
                    className={`w-full rounded-xl border p-3.5 sm:p-4 text-left transition-all ${
                      selectedPreviewIdx === idx
                        ? 'border-[#30272D] bg-[#FFFCF9] shadow-xs'
                        : 'border-[#30272D]/12 bg-[#FFF9F5]/60 hover:bg-[#FFFCF9]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-editorial text-lg sm:text-xl font-medium text-[#30272D]">
                        {item.label[lang]}
                      </span>
                      <span className="text-xs text-[#A67589] tabular-nums">
                        {item.sheet.pageNumber}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-[#30272D]/70">
                      {item.sheet.caption[lang]}
                    </p>
                  </button>
                ))}
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() =>
                    onOpenSheetModal(
                      currentShowcase.sheet,
                      currentShowcase.product.title[lang]
                    )
                  }
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#30272D] px-5 py-3 text-xs font-medium text-[#FFF9F5] hover:bg-[#A67589] transition-colors whitespace-nowrap shadow-xs"
                >
                  <Printer className="h-3.5 w-3.5" />
                  <span>{copy.homeSections.printSampleBtn}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onSelectProduct(currentShowcase.product)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-xl border border-[#30272D]/20 bg-[#FFFCF9] px-5 py-3 text-xs font-medium text-[#30272D] hover:bg-[#EACBD5]/30 transition-colors whitespace-nowrap"
                >
                  <span>
                    {lang === 'en' ? 'Inspect Full Volume' : 'Vezi Întregul Volum'}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>

            {/* Right Column: Live Printable Sheet */}
            <div className="lg:col-span-7 flex justify-center w-full overflow-hidden">
              <PrintableSheetRenderer
                sheet={currentShowcase.sheet}
                lang={lang}
                interactiveColoring={true}
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FOUNDER STORY & TESTIMONIALS */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 space-y-16 sm:space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          <div className="lg:col-span-5">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full lg:min-h-[340px] rounded-2xl overflow-hidden border border-[#30272D]/10">
              <StudioImage
                src={STUDIO_IMAGES.founderAtelier}
                alt="Cristina at the ZALEA CREATIV drawing table"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-5 lg:pl-6">
            <p className="text-xs uppercase tracking-widest text-[#A67589]">
              {copy.homeSections.founderKicker}
            </p>
            <h2 className="font-editorial text-2xl sm:text-3xl lg:text-5xl text-[#30272D]">
              {copy.homeSections.founderTitle}
            </h2>
            <p className="font-editorial italic text-lg sm:text-xl lg:text-2xl text-[#30272D]/90 leading-relaxed">
              {copy.homeSections.founderBody1}
            </p>
            <p className="text-xs sm:text-sm lg:text-base text-[#30272D]/75 leading-relaxed">
              {copy.homeSections.founderBody2}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-[#30272D]/10">
              <div>
                <p className="font-editorial italic text-xl sm:text-2xl text-[#30272D]">Cristina</p>
                <p className="text-xs text-[#A67589]">
                  {lang === 'en' ? 'Founder & Illustrator, ZALEA CREATIV' : 'Fondatoare & Ilustratoare, ZALEA CREATIV'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#30272D]/25 px-5 py-2.5 text-xs font-medium text-[#30272D] hover:bg-[#30272D] hover:text-[#FFF9F5] transition-colors whitespace-nowrap"
              >
                <span>{copy.homeSections.readFullStory}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Attributable Reader Testimonials */}
        <div className="pt-12 border-t border-[#30272D]/10">
          <div className="max-w-2xl mb-10">
            <p className="text-xs uppercase tracking-widest text-[#A67589] mb-2">
              {copy.homeSections.testimonialsKicker}
            </p>
            <h3 className="font-editorial text-3xl sm:text-4xl text-[#30272D]">
              {copy.homeSections.testimonialsTitle}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t) => (
              <blockquote
                key={t.id}
                className="rounded-2xl bg-[#FFFCF9] border border-[#30272D]/10 p-6 sm:p-8 flex flex-col justify-between"
              >
                <p className="text-sm sm:text-base text-[#30272D]/85 leading-relaxed">
                  “{t.quote[lang]}”
                </p>
                <footer className="mt-6 pt-4 border-t border-[#30272D]/8">
                  <p className="font-editorial text-xl font-semibold text-[#30272D]">
                    {t.author}
                  </p>
                  <p className="text-xs text-[#30272D]/70 mt-0.5">
                    {t.role[lang]} · {t.location}
                  </p>
                  <p className="text-[11px] text-[#A67589] mt-1">
                    {t.productReferenced[lang]}
                  </p>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
