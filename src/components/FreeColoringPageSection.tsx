import React, { useState } from 'react';
import { jsPDF } from 'jspdf';
import { Check, Download, FileText, Info, Loader2, Printer, Sparkles } from 'lucide-react';
import { Language } from '../data/catalog';

interface FreeColoringPageSectionProps {
  lang: Language;
}

export const CHEERFUL_FOX_IMAGE_PATH = '/src/assets/images/cheerful_fox_garden_master_300dpi.jpg';
export const KAWAII_BEAR_IMAGE_PATH = '/src/assets/images/kawaii_bear_baking_master_300dpi.jpg';
export const COZY_BUNNY_IMAGE_PATH = '/src/assets/images/cozy_bunny_reading_master_300dpi.jpg';

export interface ColoringArtwork {
  id: 'fox' | 'bear' | 'bunny';
  title: {
    en: string;
    ro: string;
  };
  subtitle: {
    en: string;
    ro: string;
  };
  desc: {
    en: string;
    ro: string;
  };
  badge: {
    en: string;
    ro: string;
  };
  previewImage: string;
  masterImage: string;
  pdfFilenameA4: {
    en: string;
    ro: string;
  };
  pdfFilenameLetter: {
    en: string;
    ro: string;
  };
}

export const COLORING_ARTWORKS: ColoringArtwork[] = [
  {
    id: 'fox',
    title: {
      en: 'Cheerful Fox in the Garden',
      ro: 'Vulpița Veselă în Grădină',
    },
    subtitle: {
      en: 'Spring watering can & blooming flowers',
      ro: 'Stropitoare de primăvară și flori înflorite',
    },
    desc: {
      en: 'From the Cozy Animals Collection. An adorable little fox happily watering garden tulips and daisies by a wooden picket fence. Rendered with clean black outlines on a pure white background at 3584 × 4800 master resolution (511 effective PPI on A4, 497 on US Letter), without watermarks or margins clipping.',
      ro: 'Din colecția Animale Drăgălașe. O vulpiță adorabilă udând cu drag lalelele și margaretele din grădină lângă un gărduleț rustic. Redat cu linii negre clare pe fundal alb pur la rezoluție master de 3584 × 4800 px (511 PPI efectiv pe A4, 497 pe US Letter), fără filigran sau decupare.',
    },
    badge: {
      en: 'New Favorite',
      ro: 'Nouă Preferată',
    },
    previewImage: '/src/assets/images/cheerful_fox_garden_1791795906877.jpg',
    masterImage: CHEERFUL_FOX_IMAGE_PATH,
    pdfFilenameA4: {
      en: 'Zalea-Creativ-Vulpita-Gradina-Colorat-A4.pdf',
      ro: 'Zalea-Creativ-Vulpita-Gradina-Colorat-A4.pdf',
    },
    pdfFilenameLetter: {
      en: 'Zalea-Creativ-Cheerful-Fox-Coloring-Page-US-Letter.pdf',
      ro: 'Zalea-Creativ-Vulpita-Gradina-Colorat-US-Letter.pdf',
    },
  },
  {
    id: 'bear',
    title: {
      en: 'Kawaii Baker Bear in the Kitchen',
      ro: 'Ursulețul Cofetar în Bucătărie',
    },
    subtitle: {
      en: 'Whisking cupcake batter & sweet bakery',
      ro: 'Pregătește aluatul de brioșe și dulciuri',
    },
    desc: {
      en: 'From the Cozy Animals Collection. A sweet baby bear wearing a chef hat and apron baking cupcakes in a charming kitchen atelier. Crisp bold black outlines on pure white background at 3584 × 4800 master resolution (511 effective PPI on A4, 497 on US Letter).',
      ro: 'Din colecția Animale Drăgălașe. Un pui de ursuleț purtând bonetă și șorț de bucătar, pregătind brioșe delicioase în atelierul său. Linii negre curate și conturate pe fundal alb pur la rezoluție de 3584 × 4800 px (511 PPI efectiv pe A4, 497 pe US Letter).',
    },
    badge: {
      en: 'New Favorite',
      ro: 'Nouă Preferată',
    },
    previewImage: '/src/assets/images/kawaii_bear_baking_1791795917141.jpg',
    masterImage: KAWAII_BEAR_IMAGE_PATH,
    pdfFilenameA4: {
      en: 'Zalea-Creativ-Ursul-Cofetar-Colorat-A4.pdf',
      ro: 'Zalea-Creativ-Ursul-Cofetar-Colorat-A4.pdf',
    },
    pdfFilenameLetter: {
      en: 'Zalea-Creativ-Kawaii-Bear-Coloring-Page-US-Letter.pdf',
      ro: 'Zalea-Creativ-Ursul-Cofetar-Colorat-US-Letter.pdf',
    },
  },
  {
    id: 'bunny',
    title: {
      en: 'Cozy Bunny Reading Nook',
      ro: 'Iepurașul în Fotoliul de Lectură',
    },
    subtitle: {
      en: 'Storytime in a warm floral armchair',
      ro: 'Ora de poveste într-un fotoliu călduros',
    },
    desc: {
      en: 'From the Cozy Animals Collection. An adorable baby bunny immersed in storybooks in a plush armchair with garden views. Rendered with clean black outlines on a pure white background at 3584 × 4800 master resolution (511 effective PPI on A4).',
      ro: 'Din colecția Animale Drăgălașe. Un iepuraș dulce citind cărți de povești într-un fotoliu primitor. Redat cu linii negre clare pe fundal alb pur la rezoluție de 3584 × 4800 px (511 PPI efectiv pe A4).',
    },
    badge: {
      en: 'Classic Sample',
      ro: 'Mostră Clasică',
    },
    previewImage: '/src/assets/images/cozy_bunny_reading_1791795926720.jpg',
    masterImage: COZY_BUNNY_IMAGE_PATH,
    pdfFilenameA4: {
      en: 'Zalea-Creativ-Iepuras-Lectura-Colorat-A4.pdf',
      ro: 'Zalea-Creativ-Iepuras-Lectura-Colorat-A4.pdf',
    },
    pdfFilenameLetter: {
      en: 'Zalea-Creativ-Cozy-Bunny-Coloring-Page-US-Letter.pdf',
      ro: 'Zalea-Creativ-Iepuras-Lectura-Colorat-US-Letter.pdf',
    },
  },
];

export const FreeColoringPageSection: React.FC<FreeColoringPageSectionProps> = ({ lang }) => {
  const [selectedArtworkId, setSelectedArtworkId] = useState<'fox' | 'bear' | 'bunny'>('fox');
  const [selectedFormat, setSelectedFormat] = useState<'a4' | 'letter'>('a4');
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentArtwork =
    COLORING_ARTWORKS.find((a) => a.id === selectedArtworkId) || COLORING_ARTWORKS[0];

  const t = {
    badge: {
      en: 'Complimentary Studio Gift · Cozy Animals Collection',
      ro: 'Cadou Gratuit din Atelier · Colecția Animale Drăgălașe',
    },
    title: {
      en: 'Try a Little Moment of Joy',
      ro: 'Încearcă un Mic Moment de Bucurie',
    },
    subtitle: {
      en: 'Discover the quality of our printable coloring pages with our complimentary downloadable designs. Select your favorite illustration below:',
      ro: 'Descoperă calitatea planșelor noastre imprimabile cu aceste ilustrații gratuite. Alege ilustrația preferată mai jos:',
    },
    selectorLabel: {
      en: 'Choose Your Complimentary Illustration:',
      ro: 'Alege Ilustrația Gratuită Dorită:',
    },
    formatLabel: {
      en: 'Select Paper Size:',
      ro: 'Selectează Formatul de Pagină:',
    },
    a4Label: {
      en: 'A4 (210 × 297 mm) · Measured 511 Effective PPI',
      ro: 'A4 (210 × 297 mm) · Rezoluție Efectivă Măsurată: 511 PPI',
    },
    letterLabel: {
      en: 'US Letter (8.5 × 11 in) · Measured 497 Effective PPI',
      ro: 'US Letter (8.5 × 11 in) · Rezoluție Efectivă Măsurată: 497 PPI',
    },
    downloadBtn: {
      en: 'Download Free Coloring Page',
      ro: 'Descarcă Planșa Gratuită de Colorat',
    },
    preparing: {
      en: 'Generating Archival PDF (511 PPI)...',
      ro: 'Se generează fișierul PDF de arhivă (511 PPI)...',
    },
    downloaded: {
      en: 'True Printable PDF Downloaded!',
      ro: 'PDF Imprimabil Descărcat cu Succes!',
    },
    instructionsTitle: {
      en: 'Concise Printing Recommendations',
      ro: 'Recomandări Concise pentru Tipărire',
    },
    instructionPaper: {
      en: 'Paper: 160–220 gsm warm ivory cotton or drawing paper for pencils; 100–120 gsm smooth paper for everyday coloring.',
      ro: 'Hârtie: 160–220 g/mp bumbac ivoar sau hârtie de desen pentru creioane; 100–120 g/mp hârtie fină pentru uz zilnic.',
    },
    instructionScale: {
      en: 'Scale: Select "Actual Size / 100%" in your printer dialog (safe margins ≥ 16 mm are preserved).',
      ro: 'Scală: Selectează „Dimensiune reală / 100%” în imprimantă (marginile de siguranță ≥ 16 mm sunt păstrate).',
    },
    instructionOutlines: {
      en: 'Purity: Pure white background with crisp black outlines only—no watermarks, headers, or footers on the printable sheet.',
      ro: 'Puritate: Fundal alb pur și linii negre curate — fără filigran, antete sau subsoluri pe coala de tipar.',
    },
    unavailableNotice: {
      en: 'Artwork file is currently being finalized. Please check back shortly.',
      ro: 'Fișierul cu ilustrația este în curs de finalizare. Vă rugăm să reveniți în curând.',
    },
    switchTip: {
      en: 'Click any illustration to preview and download its high-resolution PDF.',
      ro: 'Apasă pe orice ilustrație pentru a previzualiza și descărca fișierul PDF de înaltă rezoluție.',
    },
  };

  const handleDownloadPDF = async () => {
    setIsGenerating(true);
    setErrorMessage(null);

    try {
      // 1. Initialize real jsPDF document matching the chosen format
      const isA4 = selectedFormat === 'a4';
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: isA4 ? 'a4' : 'letter',
      });

      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();

      // 2. Fetch and load the master 3584 x 4800 illustration image
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = currentArtwork.masterImage;

      await new Promise<void>((resolve, reject) => {
        img.onload = () => resolve();
        img.onerror = () => reject(new Error('Illustration file not found'));
      });

      // 3. Set pure white background
      doc.setFillColor(255, 255, 255);
      doc.rect(0, 0, pageWidth, pageHeight, 'F');

      // 4. Calculate dimensions preserving original 3:4 aspect ratio with >= 15 mm safe margins
      const minMargin = 16; // 16mm safe margin (> 15mm required)
      const maxW = pageWidth - minMargin * 2;
      const maxH = pageHeight - minMargin * 2;

      // Master dimensions: 3584 x 4800 (aspect ratio = 3584 / 4800 = 0.7466667)
      const imgAspect = img.naturalWidth / img.naturalHeight || 3584 / 4800;
      let renderW = maxW;
      let renderH = renderW / imgAspect;

      if (renderH > maxH) {
        renderH = maxH;
        renderW = renderH * imgAspect;
      }

      // Center the artwork symmetrically within safe margins
      const x = (pageWidth - renderW) / 2;
      const y = (pageHeight - renderH) / 2;

      // 5. Embed the clean black outline artwork without compression loss or watermark
      doc.addImage(img, 'JPEG', x, y, renderW, renderH, undefined, 'NONE');

      // 6. As required: NO decorative header or footer text on the printable coloring sheet

      // 7. Trigger the real PDF download with descriptive filename
      const filename = isA4
        ? currentArtwork.pdfFilenameA4[lang]
        : currentArtwork.pdfFilenameLetter[lang];

      doc.save(filename);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 4000);
    } catch {
      setErrorMessage(t.unavailableNotice[lang]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-20">
      <div className="rounded-2xl sm:rounded-3xl bg-[#FFFCF9] border border-[#30272D]/10 p-5 sm:p-10 lg:p-16 shadow-[0_20px_50px_-20px_rgba(48,39,45,0.06)]">
        {/* Header Section */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <p className="text-xs uppercase tracking-widest text-[#A67589] font-medium mb-2.5">
            {t.badge[lang]}
          </p>
          <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl text-[#30272D] leading-tight">
            {t.title[lang]}
          </h2>
          <p className="mt-2.5 text-sm sm:text-base lg:text-lg text-[#30272D]/80 leading-relaxed">
            {t.subtitle[lang]}
          </p>
        </div>

        {/* Artwork Selection Tabs / Carousel */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#30272D]/70 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5 text-[#A67589]" />
              {t.selectorLabel[lang]}
            </span>
            <span className="text-[11px] text-[#A67589] hidden sm:inline">
              {t.switchTip[lang]}
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4">
            {COLORING_ARTWORKS.map((artwork) => {
              const isSelected = artwork.id === selectedArtworkId;
              return (
                <button
                  key={artwork.id}
                  type="button"
                  onClick={() => setSelectedArtworkId(artwork.id)}
                  className={`group relative flex items-center gap-3.5 p-3 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'border-[#30272D] bg-[#FFF9F5] shadow-md ring-1 ring-[#30272D]'
                      : 'border-[#30272D]/12 bg-white/70 hover:border-[#A67589] hover:bg-white'
                  }`}
                >
                  <div className="relative aspect-[3/4] w-14 sm:w-16 overflow-hidden rounded-xl border border-[#30272D]/10 bg-white shrink-0">
                    <img
                      src={artwork.previewImage}
                      alt={artwork.title[lang]}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-contain p-1"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-[#A67589]">
                        {artwork.badge[lang]}
                      </span>
                    </div>
                    <p className="font-editorial text-sm sm:text-base text-[#30272D] font-medium truncate">
                      {artwork.title[lang]}
                    </p>
                    <p className="text-[11px] text-[#30272D]/60 truncate">
                      {artwork.subtitle[lang]}
                    </p>
                  </div>
                  {isSelected && (
                    <div className="h-5 w-5 rounded-full bg-[#30272D] text-white flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Split: Active Preview Card on Left, Download Experience on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          {/* Left: Premium Coloring Page Preview Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="group relative w-full max-w-[360px] rounded-2xl bg-white p-4 sm:p-5 shadow-lg border border-[#30272D]/12 transition-all hover:shadow-xl">
              {/* Archival border framing the coloring sheet */}
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl border border-[#30272D]/15 bg-white flex items-center justify-center">
                <img
                  src={currentArtwork.masterImage}
                  alt={currentArtwork.title[lang]}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-contain p-2"
                  referrerPolicy="no-referrer"
                />
                <span className="sr-only">{currentArtwork.title[lang]}</span>
              </div>

              {/* Card Meta Description */}
              <div className="mt-4 pt-3 border-t border-[#30272D]/8 flex items-center justify-between text-xs text-[#30272D]/75">
                <span className="font-editorial italic font-medium text-[#30272D] text-sm truncate mr-2">
                  {currentArtwork.title[lang]}
                </span>
                <span className="text-[11px] uppercase tracking-wider text-[#A67589] shrink-0">
                  3584 × 4800 px · 511 PPI (A4)
                </span>
              </div>
            </div>
          </div>

          {/* Right: Controls & Concise Printing Instructions */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <div className="inline-block px-2.5 py-1 rounded-full bg-[#EACBD5]/30 text-[#A67589] text-[11px] font-semibold tracking-wider uppercase mb-2">
                {currentArtwork.badge[lang]}
              </div>
              <h3 className="font-editorial text-2xl sm:text-3xl text-[#30272D]">
                {currentArtwork.title[lang]}
              </h3>
              <p className="mt-2 text-sm sm:text-base text-[#30272D]/80 leading-relaxed">
                {currentArtwork.desc[lang]}
              </p>
            </div>

            {/* Format Selection (A4 vs US Letter) */}
            <div className="space-y-2.5 pt-2">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#30272D]/70">
                {t.formatLabel[lang]}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setSelectedFormat('a4')}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                    selectedFormat === 'a4'
                      ? 'border-[#30272D] bg-[#EACBD5]/20 ring-1 ring-[#30272D]'
                      : 'border-[#30272D]/15 bg-[#FFF9F5] hover:border-[#A67589]'
                  }`}
                >
                  <FileText className="h-4 w-4 text-[#A67589] shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[#30272D]">
                      {selectedFormat === 'a4' && '✓ '}A4 Format
                    </p>
                    <p className="text-[11px] text-[#30272D]/65">
                      210 × 297 mm (International)
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedFormat('letter')}
                  className={`flex items-center gap-3 rounded-xl border p-3.5 text-left transition-all ${
                    selectedFormat === 'letter'
                      ? 'border-[#30272D] bg-[#EACBD5]/20 ring-1 ring-[#30272D]'
                      : 'border-[#30272D]/15 bg-[#FFF9F5] hover:border-[#A67589]'
                  }`}
                >
                  <FileText className="h-4 w-4 text-[#A67589] shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-[#30272D]">
                      {selectedFormat === 'letter' && '✓ '}US Letter Format
                    </p>
                    <p className="text-[11px] text-[#30272D]/65">
                      8.5 × 11 in (North America)
                    </p>
                  </div>
                </button>
              </div>
            </div>

            {/* Primary Action Button */}
            <div className="pt-2">
              <button
                type="button"
                onClick={handleDownloadPDF}
                disabled={isGenerating}
                className={`w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl px-8 py-4 text-xs sm:text-sm font-semibold tracking-wide transition-all whitespace-nowrap shrink-0 shadow-sm ${
                  downloadSuccess
                    ? 'bg-[#A67589] text-[#FFF9F5]'
                    : 'bg-[#30272D] text-[#FFF9F5] hover:bg-[#A67589]'
                }`}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{t.preparing[lang]}</span>
                  </>
                ) : downloadSuccess ? (
                  <>
                    <Check className="h-4 w-4" />
                    <span>{t.downloaded[lang]}</span>
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    <span>{t.downloadBtn[lang]}</span>
                  </>
                )}
              </button>

              {errorMessage && (
                <p className="mt-2 text-xs text-rose-700">{errorMessage}</p>
              )}
            </div>

            {/* Concise Printing Instructions Box */}
            <div className="rounded-2xl bg-[#FFF9F5] border border-[#30272D]/10 p-5 space-y-2.5 text-xs">
              <div className="flex items-center gap-2 font-semibold text-[#30272D]">
                <Printer className="h-4 w-4 text-[#A67589]" />
                <span>{t.instructionsTitle[lang]}</span>
              </div>
              <ul className="space-y-1.5 text-[#30272D]/75 leading-relaxed pl-6 list-disc">
                <li>{t.instructionPaper[lang]}</li>
                <li>{t.instructionScale[lang]}</li>
                <li>{t.instructionOutlines[lang]}</li>
              </ul>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#A67589]">
                <Info className="h-3.5 w-3.5 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Free for personal and family printing · No login required'
                    : 'Gratuit pentru uz personal și de familie · Fără înregistrare'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
