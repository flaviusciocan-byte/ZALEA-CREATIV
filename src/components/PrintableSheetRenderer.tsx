import React, { useState } from 'react';
import { Language, PrintableSheetPreview } from '../data/catalog';

interface PrintableSheetRendererProps {
  sheet: PrintableSheetPreview;
  lang: Language;
  interactiveColoring?: boolean;
  compact?: boolean;
}

const PALETTE_SWATCHES = [
  { id: 'none', name: { en: 'Pure Line Art', ro: 'Linie Fină Pură' }, fill: 'transparent', petal2: 'transparent', leaf: 'transparent' },
  { id: 'rose', name: { en: 'Powder Rose & Sage', ro: 'Roz Pudrat & Salvie' }, fill: '#EACBD5', petal2: '#F5E1E7', leaf: '#D7E0D0' },
  { id: 'mauve', name: { en: 'Dusty Mauve & Ochre', ro: 'Mov Prăfuit & Ocru' }, fill: '#D4B2C0', petal2: '#EAD5DE', leaf: '#E5D8B8' },
  { id: 'gold', name: { en: 'Champagne & Botanical', ro: 'Șampanie & Botanic' }, fill: '#E8D5B5', petal2: '#F5EBDC', leaf: '#CFD9C8' },
];

export const PrintableSheetRenderer: React.FC<PrintableSheetRendererProps> = ({
  sheet,
  lang,
  interactiveColoring = false,
  compact = false,
}) => {
  const [selectedSwatchId, setSelectedSwatchId] = useState<string>('rose');
  const activeSwatch = PALETTE_SWATCHES.find((s) => s.id === selectedSwatchId) || PALETTE_SWATCHES[0];

  const isBotanical = sheet.sheetType === 'botanical-rose' || sheet.sheetType === 'botanical-peony';

  return (
    <div className="flex flex-col items-center w-full">
      {interactiveColoring && isBotanical && (
        <div className="no-print mb-4 flex flex-wrap items-center justify-center gap-2 rounded-lg bg-[#FFF9F5] p-1.5 border border-[#30272D]/10">
          <span className="px-2 text-xs text-[#30272D]/70">
            {lang === 'en' ? 'Pencil Wash Preview:' : 'Previzualizare Creion:'}
          </span>
          {PALETTE_SWATCHES.map((swatch) => (
            <button
              key={swatch.id}
              type="button"
              onClick={() => setSelectedSwatchId(swatch.id)}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedSwatchId === swatch.id
                  ? 'bg-[#30272D] text-[#FFF9F5]'
                  : 'text-[#30272D]/80 hover:bg-[#EACBD5]/30'
              }`}
            >
              <span
                className="inline-block h-3 w-3 rounded-full border border-[#30272D]/30"
                style={{ backgroundColor: swatch.id === 'none' ? '#FFF9F5' : swatch.fill }}
              />
              <span>{swatch.name[lang]}</span>
            </button>
          ))}
        </div>
      )}

      {/* Printable Archival Sheet Container */}
      <div
        className={`relative w-full bg-[#FFFCF9] text-[#30272D] border border-[#30272D]/15 shadow-sm transition-all ${
          compact ? 'p-4 sm:p-5' : 'p-6 sm:p-10'
        } aspect-[1/1.32] max-w-[520px] flex flex-col justify-between overflow-hidden`}
      >
        {/* Outer Fine Archival Frame */}
        <div className="pointer-events-none absolute inset-3 border border-[#30272D]/20" />
        <div className="pointer-events-none absolute inset-4 border border-[#C8A46B]/30" />

        {/* Sheet Header */}
        <div className="relative z-10 flex items-center justify-between border-b border-[#30272D]/10 pb-2.5 text-[10px] tracking-widest uppercase text-[#30272D]/60">
          <span>ZALEA CREATIV ATELIER</span>
          <span className="tabular-nums">{sheet.pageNumber}</span>
        </div>

        {/* Sheet Body Content */}
        <div className="relative z-10 my-auto flex flex-col items-center justify-center py-4 w-full">
          {sheet.sheetType === 'botanical-rose' && (
            <div className="flex flex-col items-center w-full">
              <svg
                viewBox="0 0 320 340"
                className="w-full max-w-[270px] h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Stem */}
                <path
                  d="M160 315 C158 260, 165 200, 160 135"
                  stroke="#30272D"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
                <path
                  d="M161 240 C130 225, 105 195, 92 165"
                  stroke="#30272D"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />
                <path
                  d="M161 215 C195 198, 220 175, 232 145"
                  stroke="#30272D"
                  strokeWidth="1.1"
                  strokeLinecap="round"
                />

                {/* Left Acanthus Leaves */}
                <path
                  d="M158 255 C120 255, 85 235, 75 205 C105 202, 138 220, 158 255 Z"
                  fill={activeSwatch.leaf}
                  fillOpacity="0.65"
                  stroke="#30272D"
                  strokeWidth="1.1"
                />
                <path
                  d="M78 206 C110 222, 135 238, 157 254"
                  stroke="#30272D"
                  strokeWidth="0.7"
                  strokeDasharray="2 1"
                />

                {/* Right Acanthus Leaves */}
                <path
                  d="M162 235 C200 232, 238 212, 248 180 C215 178, 182 198, 162 235 Z"
                  fill={activeSwatch.leaf}
                  fillOpacity="0.65"
                  stroke="#30272D"
                  strokeWidth="1.1"
                />
                <path
                  d="M244 182 C214 198, 185 215, 163 234"
                  stroke="#30272D"
                  strokeWidth="0.7"
                />

                {/* Secondary Left Rosebud */}
                <path
                  d="M92 165 C75 152, 72 128, 86 112 C102 124, 106 148, 92 165 Z"
                  fill={activeSwatch.fill}
                  fillOpacity="0.7"
                  stroke="#30272D"
                  strokeWidth="1.1"
                />
                <path
                  d="M86 112 C94 128, 92 148, 92 165"
                  stroke="#30272D"
                  strokeWidth="0.75"
                />

                {/* Secondary Right Rosebud */}
                <path
                  d="M232 145 C248 132, 250 108, 236 94 C220 106, 218 128, 232 145 Z"
                  fill={activeSwatch.petal2}
                  fillOpacity="0.75"
                  stroke="#30272D"
                  strokeWidth="1.1"
                />

                {/* Main Central Rosa Gallica */}
                {/* Outer Petals */}
                <path
                  d="M160 155 C115 155, 92 120, 108 84 C122 55, 152 52, 160 68 C168 52, 198 55, 212 84 C228 120, 205 155, 160 155 Z"
                  fill={activeSwatch.petal2}
                  fillOpacity="0.75"
                  stroke="#30272D"
                  strokeWidth="1.2"
                />
                {/* Middle Petals */}
                <path
                  d="M160 142 C126 142, 112 112, 126 88 C138 68, 160 72, 160 85 C160 72, 182 68, 194 88 C208 112, 194 142, 160 142 Z"
                  fill={activeSwatch.fill}
                  fillOpacity="0.85"
                  stroke="#30272D"
                  strokeWidth="1.15"
                />
                {/* Inner Swirl Petals */}
                <path
                  d="M160 126 C140 126, 132 106, 144 92 C154 82, 168 82, 176 92 C188 106, 180 126, 160 126 Z"
                  fill={activeSwatch.petal2}
                  stroke="#30272D"
                  strokeWidth="1.1"
                />
                <path
                  d="M150 104 C156 96, 166 96, 170 104 C166 112, 154 112, 150 104 Z"
                  fill="#C8A46B"
                  fillOpacity="0.45"
                  stroke="#30272D"
                  strokeWidth="1"
                />
                {/* Botanical Details */}
                <circle cx="160" cy="104" r="2" fill="#30272D" />
                <circle cx="155" cy="102" r="1.2" fill="#30272D" />
                <circle cx="165" cy="102" r="1.2" fill="#30272D" />
                <path d="M132 120 C142 128, 152 132, 160 132" stroke="#30272D" strokeWidth="0.6" />
                <path d="M188 120 C178 128, 168 132, 160 132" stroke="#30272D" strokeWidth="0.6" />
              </svg>
              <p className="mt-2 font-editorial italic text-base sm:text-lg text-[#30272D]">
                Rosa Gallica &amp; Acanthus Mollis
              </p>
            </div>
          )}

          {sheet.sheetType === 'botanical-peony' && (
            <div className="flex flex-col items-center w-full">
              <svg
                viewBox="0 0 320 340"
                className="w-full max-w-[270px] h-auto"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M160 310 C160 250, 155 200, 160 150" stroke="#30272D" strokeWidth="1.5" />
                <path
                  d="M158 235 C115 230, 82 200, 75 168 C110 175, 140 198, 158 235 Z"
                  fill={activeSwatch.leaf}
                  fillOpacity="0.7"
                  stroke="#30272D"
                  strokeWidth="1.1"
                />
                <path
                  d="M162 220 C205 215, 238 185, 245 152 C210 160, 180 185, 162 220 Z"
                  fill={activeSwatch.leaf}
                  fillOpacity="0.7"
                  stroke="#30272D"
                  strokeWidth="1.1"
                />
                <ellipse
                  cx="160"
                  cy="118"
                  rx="68"
                  ry="52"
                  fill={activeSwatch.petal2}
                  fillOpacity="0.7"
                  stroke="#30272D"
                  strokeWidth="1.15"
                />
                <path
                  d="M105 118 C105 82, 135 66, 160 78 C185 66, 215 82, 215 118 C215 148, 185 162, 160 156 C135 162, 105 148, 105 118 Z"
                  fill={activeSwatch.fill}
                  fillOpacity="0.85"
                  stroke="#30272D"
                  strokeWidth="1.15"
                />
                <circle
                  cx="160"
                  cy="118"
                  r="22"
                  fill="#C8A46B"
                  fillOpacity="0.35"
                  stroke="#30272D"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
                <circle cx="160" cy="118" r="6" fill="#30272D" fillOpacity="0.75" />
              </svg>
              <p className="mt-2 font-editorial italic text-base sm:text-lg text-[#30272D]">
                Paeonia Lactiflora · Herbarium Plate XIX
              </p>
            </div>
          )}

          {sheet.sheetType === 'weekly-planner' && (
            <div className="w-full space-y-3 text-left">
              <div className="text-center border-b border-[#30272D]/15 pb-2">
                <h4 className="font-editorial text-xl tracking-wide text-[#30272D]">
                  {lang === 'en' ? 'THE WEEK AHEAD' : 'SĂPTĂMÂNA NOASTRĂ'}
                </h4>
                <p className="text-[10px] uppercase tracking-widest text-[#A67589]">
                  {lang === 'en' ? 'Family Rhythm & Little Moments' : 'Ritmul Familiei & Mici Bucurii'}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-1.5">
                {(lang === 'en'
                  ? ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Weekend Rituals']
                  : ['Luni', 'Marți', 'Miercuri', 'Joi', 'Vineri', 'Ritualuri de Weekend']
                ).map((day, idx) => (
                  <div
                    key={day}
                    className="flex items-center justify-between border-b border-[#30272D]/12 py-1.5 text-xs"
                  >
                    <span className="font-editorial italic font-semibold text-[#30272D] w-28">{day}</span>
                    <span className="flex-1 border-b border-dotted border-[#30272D]/20 mx-2 h-3" />
                    <span className="text-[10px] text-[#A67589] tabular-nums">0{idx + 1}</span>
                  </div>
                ))}
              </div>
              <div className="mt-2 rounded bg-[#EACBD5]/20 p-2.5 border border-[#EACBD5]/60">
                <p className="text-[10px] uppercase tracking-wider text-[#30272D]/70 mb-1">
                  {lang === 'en' ? 'Gratitude & Family Intention' : 'Recunoștință & Intenția Săptămânii'}
                </p>
                <div className="h-4 border-b border-[#30272D]/15" />
              </div>
            </div>
          )}

          {sheet.sheetType === 'meal-ritual' && (
            <div className="w-full space-y-3 text-left">
              <div className="text-center border-b border-[#30272D]/15 pb-2">
                <h4 className="font-editorial text-xl tracking-wide text-[#30272D]">
                  {lang === 'en' ? 'SEASONAL KITCHEN TABLE' : 'MENIUL CASEI DE SEZON'}
                </h4>
                <p className="text-[10px] uppercase tracking-widest text-[#A67589]">
                  {lang === 'en' ? 'Breakfast · Lunch · Family Dinner' : 'Mic Dejun · Prânz · Cină în Familie'}
                </p>
              </div>
              <div className="grid grid-cols-4 border-b border-[#30272D]/20 pb-1 text-[10px] font-semibold uppercase tracking-wider text-[#30272D]/70">
                <span>{lang === 'en' ? 'Day' : 'Ziua'}</span>
                <span>{lang === 'en' ? 'Morning' : 'Dimineața'}</span>
                <span>{lang === 'en' ? 'Midday' : 'Prânz'}</span>
                <span>{lang === 'en' ? 'Evening' : 'Seara'}</span>
              </div>
              {['Mon / Lun', 'Tue / Mar', 'Wed / Mie', 'Thu / Joi', 'Fri / Vin'].map((d) => (
                <div key={d} className="grid grid-cols-4 border-b border-[#30272D]/10 py-1.5 text-[11px]">
                  <span className="font-editorial italic font-medium">{d}</span>
                  <span className="text-[#30272D]/40">—</span>
                  <span className="text-[#30272D]/40">—</span>
                  <span className="text-[#30272D]/40">—</span>
                </div>
              ))}
            </div>
          )}

          {sheet.sheetType === 'montessori-flora' && (
            <div className="grid grid-cols-2 gap-2.5 w-full">
              {[
                { en: 'OAK TREE', ro: 'STEJAR', latin: 'Quercus robur', color: '#D7E0D0' },
                { en: 'WILD ROSE', ro: 'MĂCEȘ', latin: 'Rosa canina', color: '#EACBD5' },
                { en: 'WOODLAND FERN', ro: 'FERIGĂ', latin: 'Dryopteris filix-mas', color: '#CFD9C8' },
                { en: 'BLUEBELLS', ro: 'CLOPOȚEI', latin: 'Hyacinthoides', color: '#D4B2C0' },
              ].map((card) => (
                <div
                  key={card.en}
                  className="flex flex-col items-center justify-between rounded-lg border border-[#30272D]/20 bg-[#FFF9F5] p-2.5 text-center"
                >
                  <span className="text-[9px] tracking-widest uppercase text-[#30272D]/60">
                    {card.latin}
                  </span>
                  <div
                    className="my-2 flex h-12 w-12 items-center justify-center rounded-full border border-[#30272D]/20"
                    style={{ backgroundColor: card.color }}
                  >
                    <span className="font-editorial italic text-sm text-[#30272D]">✿</span>
                  </div>
                  <div>
                    <p className="font-editorial text-xs font-semibold tracking-wide text-[#30272D]">
                      {card.en}
                    </p>
                    <p className="text-[10px] text-[#A67589] font-medium">{card.ro}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {sheet.sheetType === 'woodland-alphabet' && (
            <div className="w-full space-y-3 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#C8A46B]/50 bg-[#EACBD5]/20">
                <span className="font-editorial text-4xl text-[#30272D]">Aa</span>
              </div>
              <p className="font-editorial italic text-base text-[#30272D]">
                {lang === 'en' ? 'Anemone · Acorn · Arbore' : 'Anemonă · Alună · Arbore'}
              </p>
              <div className="space-y-2 pt-2">
                {[1, 2, 3].map((line) => (
                  <div
                    key={line}
                    className="flex items-center justify-between border-y border-[#30272D]/15 py-1.5 px-3 text-sm font-editorial tracking-widest text-[#30272D]/35"
                  >
                    <span>A a</span>
                    <span>A a</span>
                    <span>A a</span>
                    <span>Ă ă</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {sheet.sheetType === 'lunar-calendar' && (
            <div className="w-full space-y-2.5 text-center">
              <p className="text-[10px] uppercase tracking-widest text-[#A67589]">2026 — 2027</p>
              <h4 className="font-editorial text-2xl text-[#30272D]">
                {lang === 'en' ? 'OCTOBER · OCTOMBRIE' : 'OCTOMBRIE · OCTOBER'}
              </h4>
              <div className="grid grid-cols-7 gap-1 pt-2 text-[10px] tabular-nums">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                  <span key={i} className="font-semibold text-[#A67589] py-1">
                    {d}
                  </span>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                  <span
                    key={day}
                    className={`py-1 rounded border border-[#30272D]/10 ${
                      day === 11 ? 'bg-[#EACBD5]/50 font-semibold text-[#30272D]' : 'text-[#30272D]/80'
                    }`}
                  >
                    {day}
                  </span>
                ))}
              </div>
            </div>
          )}

          {sheet.sheetType === 'gratitude-journal' && (
            <div className="w-full space-y-3 text-left">
              <div className="text-center">
                <h4 className="font-editorial italic text-xl text-[#30272D]">
                  {lang === 'en' ? 'Little Moments & Quiet Notes' : 'Mici Momente & Gânduri Seninătate'}
                </h4>
              </div>
              <div className="space-y-3 pt-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <div key={idx} className="border-b border-[#30272D]/15 h-5" />
                ))}
              </div>
              <div className="pt-2 flex items-center justify-between text-[10px] text-[#A67589]">
                <span>{lang === 'en' ? 'Color Swatch Test:' : 'Test Cromatic:'}</span>
                <div className="flex gap-1.5">
                  <span className="h-3.5 w-3.5 rounded-full bg-[#FFF9F5] border border-[#30272D]/20" />
                  <span className="h-3.5 w-3.5 rounded-full bg-[#EACBD5]" />
                  <span className="h-3.5 w-3.5 rounded-full bg-[#A67589]" />
                  <span className="h-3.5 w-3.5 rounded-full bg-[#C8A46B]" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sheet Footer */}
        <div className="relative z-10 flex items-center justify-between border-t border-[#30272D]/10 pt-2.5 text-[10px] text-[#30272D]/60">
          <span className="font-editorial italic">{sheet.title[lang]}</span>
          <span>zaleacreativ.com</span>
        </div>
      </div>
    </div>
  );
};
