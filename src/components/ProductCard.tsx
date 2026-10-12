import React, { useState } from 'react';
import { Check, Plus } from 'lucide-react';
import { Language, Product, UI_COPY } from '../data/catalog';
import { StudioImage } from './StudioImage';

interface ProductCardProps {
  product: Product;
  lang: Language;
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, license: 'personal' | 'educator') => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  lang,
  onSelectProduct,
  onAddToCart,
}) => {
  const [justAdded, setJustAdded] = useState(false);
  const copy = UI_COPY[lang].productCard;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 'personal');
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1400);
  };

  return (
    <article
      onClick={() => onSelectProduct(product)}
      className="group cursor-pointer flex flex-col justify-between rounded-2xl bg-[#FFFCF9] border border-[#30272D]/10 overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-12px_rgba(48,39,45,0.12)]"
    >
      <div>
        {/* 4:3 Studio Product Imagery */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EACBD5]/20">
          <StudioImage
            src={product.image}
            alt={product.title[lang]}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        {/* Clean Unboxed Metadata & Editorial Title */}
        <div className="p-5 sm:p-6 pb-4">
          <div className="flex items-center gap-2 text-xs text-[#A67589] mb-2">
            <span className="uppercase tracking-wider font-medium">
              {product.categoryLabel[lang]}
            </span>
            <span aria-hidden="true">·</span>
            <span className="tabular-nums">
              {product.pages} {copy.pages}
            </span>
            <span aria-hidden="true">·</span>
            <span>{product.editionNote[lang]}</span>
          </div>

          <h3 className="font-editorial text-xl sm:text-2xl font-medium leading-snug text-[#30272D] group-hover:text-[#A67589] transition-colors">
            {product.title[lang]}
          </h3>

          <p className="mt-2 text-xs sm:text-sm text-[#30272D]/75 line-clamp-2 leading-relaxed">
            {product.subtitle[lang]}
          </p>
        </div>
      </div>

      {/* Price Baseline & Single-Line Action Bar */}
      <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-3 mt-2 border-t border-[#30272D]/8 flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <span className="text-base font-semibold text-[#30272D] tabular-nums">
            €{product.price.toFixed(2)}
          </span>
          <span className="text-[11px] text-[#30272D]/55">
            {lang === 'en' ? 'A4 & US Letter · EN + RO' : 'A4 & US Letter · EN + RO'}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(product);
            }}
            className="px-3.5 py-2 text-xs font-medium text-[#30272D] hover:text-[#A67589] transition-colors whitespace-nowrap shrink-0"
          >
            {copy.inspect}
          </button>

          <button
            type="button"
            onClick={handleQuickAdd}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
              justAdded
                ? 'bg-[#A67589] text-[#FFF9F5]'
                : 'bg-[#30272D] text-[#FFF9F5] hover:bg-[#A67589]'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="h-3.5 w-3.5" />
                <span>{copy.added}</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                <span>{copy.quickAdd}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
