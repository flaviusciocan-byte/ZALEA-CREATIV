export type Language = 'en' | 'ro';

export type PageRoute =
  | 'home'
  | 'shop'
  | 'product'
  | 'about'
  | 'contact'
  | 'faq'
  | 'privacy'
  | 'terms';

export type ProductCategory = 'all' | 'coloring' | 'planners' | 'educational' | 'calendars';

export interface PrintableSheetPreview {
  id: string;
  title: { en: string; ro: string };
  caption: { en: string; ro: string };
  sheetType:
    | 'botanical-rose'
    | 'botanical-peony'
    | 'weekly-planner'
    | 'meal-ritual'
    | 'montessori-flora'
    | 'woodland-alphabet'
    | 'lunar-calendar'
    | 'gratitude-journal';
  pageNumber: string;
}

export interface Product {
  id: string;
  sku: string;
  category: Exclude<ProductCategory, 'all'>;
  categoryLabel: { en: string; ro: string };
  title: { en: string; ro: string };
  subtitle: { en: string; ro: string };
  price: number;
  educatorPriceDelta: number;
  pages: number;
  dpi: string;
  dimensions: string;
  paperRecommendation: { en: string; ro: string };
  bilingualIncluded: boolean;
  featured: boolean;
  image: string;
  secondaryImage: string;
  editionNote: { en: string; ro: string };
  description: { en: string[]; ro: string[] };
  whatsIncluded: { en: string[]; ro: string[] };
  sheetPreviews: PrintableSheetPreview[];
}

export interface Testimonial {
  id: string;
  quote: { en: string; ro: string };
  author: string;
  role: { en: string; ro: string };
  location: string;
  productReferenced: { en: string; ro: string };
}

export interface FaqItem {
  id: string;
  category: 'downloads' | 'printing' | 'licensing' | 'bilingual';
  question: { en: string; ro: string };
  answer: { en: string; ro: string };
}

export const STUDIO_IMAGES = {
  heroStationery: '/src/assets/images/hero_editorial_stationery_1791750152381.jpg',
  botanicalColoring: '/src/assets/images/product_botanical_coloring_1791750161704.jpg',
  familyPlanner: '/src/assets/images/product_family_planner_1791750171455.jpg',
  montessoriCards: '/src/assets/images/product_montessori_cards_1791750181182.jpg',
  founderAtelier: '/src/assets/images/founder_studio_atelier_1791750191763.jpg',
};

export const PRODUCTS: Product[] = [
  {
    id: 'botanica-secret-garden',
    sku: 'ZC-CB-001',
    category: 'coloring',
    categoryLabel: {
      en: 'Coloring Books',
      ro: 'Cărți de Colorat',
    },
    title: {
      en: 'Botanica: Acanthus, Peony & Wild Rose',
      ro: 'Botanica: Acant, Bujor & Trandafir Sălbatic',
    },
    subtitle: {
      en: '42 hand-drawn botanical plates for mindful evening rituals and watercolor pencils',
      ro: '42 de planșe botanice desenate manual pentru seri liniștite și creioane acuarelă',
    },
    price: 22,
    educatorPriceDelta: 14,
    pages: 42,
    dpi: '300 DPI Archival Vector PDF',
    dimensions: 'A4 (210 × 297 mm) & US Letter (8.5 × 11 in)',
    paperRecommendation: {
      en: '160gsm – 220gsm warm ivory cotton or lightly textured watercolor paper',
      ro: 'Hârtie 160g/mp – 220g/mp din bumbac ivoar cald sau hârtie fin texturată',
    },
    bilingualIncluded: true,
    featured: true,
    image: STUDIO_IMAGES.botanicalColoring,
    secondaryImage: STUDIO_IMAGES.heroStationery,
    editionNote: {
      en: 'Signature Edition',
      ro: 'Ediție Semnătură',
    },
    description: {
      en: [
        'Illustrated by hand in Cristina’s studio, Botanica is an heirloom-grade printable coloring book inspired by 19th-century European herbariums and quiet meadow gardens.',
        'Every plate is composed with deliberate line-weight variation rather than harsh computer outlines, allowing colored pencils, pastel chalks, or light washes to blend effortlessly.',
      ],
      ro: [
        'Ilustrată manual în atelierul Cristinei, Botanica este o carte de colorat imprimabilă de colecție, inspirată de ierbarele europene din secolul al XIX-lea și de grădinile liniștite cu flori de câmp.',
        'Fiecare planșă este compusă cu variații delicate ale liniei, permițând creioanelor colorate, pastelurilor sau tușelor fine de acuarelă să se îmbine armonios.',
      ],
    },
    whatsIncluded: {
      en: [
        '42 full-page botanical illustrations (single-sided print layout)',
        'Bilingual Latin, English & Romanian floral index with color swatch test sheet',
        'Both A4 and US Letter master PDF files at 300 DPI print resolution',
        'Home & local print-shop binding guide by Cristina',
      ],
      ro: [
        '42 de ilustrații botanice pe toată pagina (format pregătit pentru tipărire pe o singură față)',
        'Index floral bilingv (Latină, Engleză și Română) plus fișă pentru testarea nuanțelor',
        'Fișiere PDF master în ambele formate A4 și US Letter la rezoluție 300 DPI',
        'Ghid complet de tipărire acasă sau la centru de print semnat de Cristina',
      ],
    },
    sheetPreviews: [
      {
        id: 'plate-04',
        title: { en: 'Plate IV — Rosa Gallica & Acanthus', ro: 'Planșa IV — Rosa Gallica & Acant' },
        caption: { en: 'Fine-line botanical engraving with petal shading guides', ro: 'Gravură botanică în linie fină cu ghidaje delicate pentru petale' },
        sheetType: 'botanical-rose',
        pageNumber: '04 / 42',
      },
      {
        id: 'plate-19',
        title: { en: 'Plate XIX — Garden Peony & Wild Chamomile', ro: 'Planșa XIX — Bujor de Grădină & Mușețel' },
        caption: { en: 'Open composition ideal for soft powder rose & sage pencils', ro: 'Compoziție aerisită ideală pentru tonuri de roz pudrat și salvie' },
        sheetType: 'botanical-peony',
        pageNumber: '19 / 42',
      },
      {
        id: 'swatch-01',
        title: { en: 'Atelier Swatch & Paper Test Sheet', ro: 'Fișă de Atelier pentru Paletă & Hârtie' },
        caption: { en: 'Included calibration sheet for testing pencil layering', ro: 'Fișă inclusă pentru testarea suprapunerii creioanelor' },
        sheetType: 'gratitude-journal',
        pageNumber: '42 / 42',
      },
    ],
  },
  {
    id: 'serene-household-family-planner',
    sku: 'ZC-FP-002',
    category: 'planners',
    categoryLabel: {
      en: 'Family Planners',
      ro: 'Planificatoare de Familie',
    },
    title: {
      en: 'The Serene Household: Undated Family & Meal Rituals',
      ro: 'Căminul Senin: Planificator de Familie & Meniuri',
    },
    subtitle: {
      en: '56 modular weekly, seasonal meal, and family rhythm templates for a calm home',
      ro: '56 de șabloane modulare săptămânale, meniuri de sezon și rutine calme pentru familie',
    },
    price: 24,
    educatorPriceDelta: 12,
    pages: 56,
    dpi: '300 DPI Print & iPad GoodNotes PDF',
    dimensions: 'A4, A5 & US Letter',
    paperRecommendation: {
      en: '120gsm uncoated warm cream writing paper (fountain-pen friendly)',
      ro: 'Hârtie de scris 120g/mp ivoar necretată (potrivită pentru stilou)',
    },
    bilingualIncluded: true,
    featured: true,
    image: STUDIO_IMAGES.familyPlanner,
    secondaryImage: STUDIO_IMAGES.heroStationery,
    editionNote: {
      en: 'Bestseller',
      ro: 'Cel Mai Iubit',
    },
    description: {
      en: [
        'Designed for mothers and families who crave structure without sterile corporate spreadsheets. The Serene Household brings warmth and breathing room to your kitchen desk or brass clipboard.',
        'Includes undated weekly rhythms, seasonal pantry inventories, Sunday meal preparation sheets, and gentle habit trackers in both English and Romanian.',
      ],
      ro: [
        'Conceput pentru mamele și familiile care își doresc organizare fără răceala tabelelor corporatiste. Căminul Senin aduce căldură, ordine și tihnă pe biroul din bucătărie.',
        'Include planificatoare săptămânale nedatate, inventar de cămară pe anotimpuri, liste de cumpărături și obiceiuri blânde, disponibile în Engleză și Română.',
      ],
    },
    whatsIncluded: {
      en: [
        '56 coordinated printable templates (Weekly, Monthly, Meal Plan, Pantry, Family Budget)',
        'Complete English (EN) and Romanian (RO) editions in every download',
        'A4, A5, and US Letter sizes plus hyperlinked tablet PDF',
        'Unlimited lifetime re-printing for your household',
      ],
      ro: [
        '56 de șabloane coordonate (Săptămânal, Lunar, Meniu, Cămară, Bugetul Familiei)',
        'Ediții complete în Engleză (EN) și Română (RO) incluse în pachet',
        'Formate A4, A5 și US Letter plus versiune interactivă pentru tabletă',
        'Drept de retipărire nelimitat pentru propria familie',
      ],
    },
    sheetPreviews: [
      {
        id: 'weekly-spread',
        title: { en: 'The Week Ahead & Family Rhythm', ro: 'Săptămâna Noastră & Ritmul Familiei' },
        caption: { en: 'Balanced single-page layout for appointments and shared moments', ro: 'Format echilibrat pe o pagină pentru programări și momente împreună' },
        sheetType: 'weekly-planner',
        pageNumber: '08 / 56',
      },
      {
        id: 'meal-ritual',
        title: { en: 'Seasonal Kitchen & Market List', ro: 'Bucătăria de Sezon & Lista de Piață' },
        caption: { en: 'Breakfast, lunch, and dinner table with categorized market basket', ro: 'Tabel pentru mic dejun, prânz și cină cu listă de cumpărături organizată' },
        sheetType: 'meal-ritual',
        pageNumber: '14 / 56',
      },
      {
        id: 'gratitude-sheet',
        title: { en: 'Sunday Reflection & Little Joys', ro: 'Reflecție de Duminică & Mici Bucurii' },
        caption: { en: 'End-of-week journaling page for family memories', ro: 'Pagină de jurnal pentru amintirile frumoase ale săptămânii' },
        sheetType: 'gratitude-journal',
        pageNumber: '52 / 56',
      },
    ],
  },
  {
    id: 'woodland-flora-montessori-treasury',
    sku: 'ZC-ED-003',
    category: 'educational',
    categoryLabel: {
      en: 'Educational Resources',
      ro: 'Resurse Educaționale',
    },
    title: {
      en: 'Woodland & Meadow: Bilingual Nature Study Cards',
      ro: 'Pădurea & Lunca: Carduri Bilingve pentru Studiul Naturii',
    },
    subtitle: {
      en: '64 illustrated Montessori 3-part cards, scavenger hunts, and botanical matching sheets',
      ro: '64 de carduri Montessori ilustrate, jocuri de observare în natură și fișe botanice',
    },
    price: 19,
    educatorPriceDelta: 15,
    pages: 38,
    dpi: '300 DPI Full-Color Archival PDF',
    dimensions: 'A4 & US Letter (4 Cards per Sheet + Full Worksheets)',
    paperRecommendation: {
      en: '250gsm – 300gsm matte warm white cardstock; optional rounded-corner punch',
      ro: 'Carton mat 250g/mp – 300g/mp; opțional perforator pentru colțuri rotunjite',
    },
    bilingualIncluded: true,
    featured: true,
    image: STUDIO_IMAGES.montessoriCards,
    secondaryImage: STUDIO_IMAGES.founderAtelier,
    editionNote: {
      en: 'Bilingual EN + RO',
      ro: 'Bilingv EN + RO',
    },
    description: {
      en: [
        'Created for curious young minds ages 3 to 9, this nature study treasury replaces loud plastic flashcards with hand-painted watercolor flora, woodland birds, and forest creatures.',
        'Because language learning flourishes through tactile play, every card set and outdoor scavenger hunt is included in both English and Romanian—ideal for bilingual homes and classrooms.',
      ],
      ro: [
        'Creată pentru copii curioși între 3 și 9 ani, această colecție de studiu al naturii înlocuiește cardurile stridente din plastic cu ilustrații delicate în acuarelă: plante de pădure, păsări și animale.',
        'Întrucât învățarea limbilor străine înflorește prin joc tactil, fiecare set de carduri și fișă de explorare este inclus atât în Engleză, cât și în Română.',
      ],
    },
    whatsIncluded: {
      en: [
        '64 illustrated three-part nomenclature cards (Trees, Wildflowers, Woodland Birds, Fungi)',
        '8 outdoor nature walk scavenger hunts & botanical matching worksheets',
        'Complete English and Romanian card decks included',
        'Cutting crop marks and parent/educator activity booklet',
      ],
      ro: [
        '64 de carduri ilustrate în 3 părți (Arbori, Flori de Câmp, Păsări de Pădure, Ciuperci)',
        '8 fișe de explorare în aer liber și jocuri de asociere botanică',
        'Seturi complete în limba Engleză și limba Română incluse',
        'Ghidaje discrete de decupare și broșură cu activități pentru părinți și educatori',
      ],
    },
    sheetPreviews: [
      {
        id: 'montessori-flora',
        title: { en: 'Sheet 01 — Oak, Fern, Robin & Bluebells Cards', ro: 'Coala 01 — Carduri Stejar, Ferigă, Măcăleandru & Clopoței' },
        caption: { en: '4-up rounded card grid with trim marks for 300gsm cardstock', ro: 'Grilă cu 4 carduri pe pagină și repere fine de decupare' },
        sheetType: 'montessori-flora',
        pageNumber: '01 / 38',
      },
      {
        id: 'woodland-hunt',
        title: { en: 'Sheet 18 — Woodland Scavenger Hunt & Matching', ro: 'Coala 18 — Explorare în Pădure & Asociere Botanică' },
        caption: { en: 'Interactive outdoor observation checklist for children', ro: 'Fișă interactivă de observare în natură pentru cei mici' },
        sheetType: 'woodland-alphabet',
        pageNumber: '18 / 38',
      },
      {
        id: 'botanical-trace',
        title: { en: 'Sheet 30 — Leaf Venation Coloring & Tracing', ro: 'Coala 30 — Nervurile Frunzelor: Colorare & Trasare' },
        caption: { en: 'Fine-motor botanical tracing worksheet', ro: 'Fișă pentru dezvoltarea motricității fine prin desen botanic' },
        sheetType: 'botanical-rose',
        pageNumber: '30 / 38',
      },
    ],
  },
  {
    id: 'quiet-mornings-floral-calendar',
    sku: 'ZC-CA-004',
    category: 'calendars',
    categoryLabel: {
      en: 'Calendars & Journals',
      ro: 'Calendare & Jurnale',
    },
    title: {
      en: '2026–2027 Botanical Wall & Desk Perpetual Calendar',
      ro: 'Calendar Perpetuu & Anual Botanic de Birou 2026–2027',
    },
    subtitle: {
      en: '12 seasonal herbarium plates with spacious monthly grids and brass-clip desk cards',
      ro: '12 planșe de ierbar pe anotimpuri cu grile lunare aerisite și carduri de birou',
    },
    price: 18,
    educatorPriceDelta: 10,
    pages: 28,
    dpi: '300 DPI Archival Print PDF',
    dimensions: 'A4, A3 Wall & 5×7 in Desk Card',
    paperRecommendation: {
      en: '220gsm natural cotton rag or textured ivory cardstock',
      ro: 'Carton 220g/mp din bumbac natural sau carton texturat ivoar',
    },
    bilingualIncluded: true,
    featured: true,
    image: STUDIO_IMAGES.heroStationery,
    secondaryImage: STUDIO_IMAGES.familyPlanner,
    editionNote: {
      en: '2026–2027 Edition',
      ro: 'Ediția 2026–2027',
    },
    description: {
      en: [
        'Celebrate the turning of each season with twelve original botanical drawings paired with calm, generous typography. Once each month concludes, trim along the subtle hairline guide to frame the artwork.',
        'Includes Monday-start and Sunday-start variations in both English and Romanian.',
      ],
      ro: [
        'Sărbătorește trecerea fiecărui anotimp cu douăsprezece ilustrații botanice originale, alături de o tipografie calmă și aerisită. La finalul lunii, ilustrația poate fi decupată și înrămată.',
        'Include variante cu început de săptămână Luni sau Duminică, în Engleză și Română.',
      ],
    },
    whatsIncluded: {
      en: [
        '12 dated monthly wall calendar sheets (2026 & 2027 included)',
        '12 undated perpetual birthday & anniversary keeper sheets',
        '5×7 inch minimalist desk calendar cards with crop marks',
        'English and Romanian editions included',
      ],
      ro: [
        '12 file lunare datate pentru perete sau clipboard (2026 și 2027 incluse)',
        '12 file perpetue pentru zile de naștere și aniversări de familie',
        'Carduri minimaliste de birou (13×18 cm) cu repere de tăiere',
        'Ediții în Engleză și Română incluse',
      ],
    },
    sheetPreviews: [
      {
        id: 'calendar-oct',
        title: { en: 'October — Autumn Rosehip & Fig Branch', ro: 'Octombrie — Măceș de Toamnă & Ramură de Smochin' },
        caption: { en: 'Monthly botanical plate with tabular date grid', ro: 'Planșă botanică lunară cu grilă calendaristică proporționată' },
        sheetType: 'lunar-calendar',
        pageNumber: '10 / 28',
      },
      {
        id: 'calendar-may',
        title: { en: 'May — Peony Blossom & Lily of the Valley', ro: 'Mai — Floare de Bujor & Lăcrămioare' },
        caption: { en: 'Keep-and-frame upper illustration panel', ro: 'Panou superior ilustrat conceput pentru a fi păstrat și înrămat' },
        sheetType: 'botanical-peony',
        pageNumber: '05 / 28',
      },
      {
        id: 'perpetual-dates',
        title: { en: 'Perpetual Family Celebrations Register', ro: 'Registrul Perpetuu al Aniversărilor din Familie' },
        caption: { en: 'Heirloom birthday and namesake day tracker', ro: 'Evidență de colecție pentru zile de naștere și onomastici' },
        sheetType: 'weekly-planner',
        pageNumber: '25 / 28',
      },
    ],
  },
  {
    id: 'little-hands-bilingual-calligraphy',
    sku: 'ZC-ED-005',
    category: 'educational',
    categoryLabel: {
      en: 'Educational Resources',
      ro: 'Resurse Educaționale',
    },
    title: {
      en: 'First Letters & Cursive Grace: Illustrated Alphabet Workbook',
      ro: 'Primele Litere & Caligrafie Blândă: Caiet Ilustrat al Alfabetului',
    },
    subtitle: {
      en: '68 gentle handwriting, phonics, and botanical letter-tracing pages for ages 4–8',
      ro: '68 de pagini cu exerciții blânde de caligrafie și litere botanice pentru 4–8 ani',
    },
    price: 21,
    educatorPriceDelta: 14,
    pages: 68,
    dpi: '300 DPI Vector PDF',
    dimensions: 'A4 & US Letter',
    paperRecommendation: {
      en: '100gsm – 120gsm smooth uncoated ivory paper',
      ro: 'Hârtie netedă necretată 100g/mp – 120g/mp',
    },
    bilingualIncluded: true,
    featured: false,
    image: STUDIO_IMAGES.montessoriCards,
    secondaryImage: STUDIO_IMAGES.botanicalColoring,
    editionNote: {
      en: 'Montessori Aligned',
      ro: 'Inspirat Montessori',
    },
    description: {
      en: [
        'Instead of noisy drills, First Letters & Cursive Grace introduces young writers to the beauty of letterforms through botanical monograms and gentle stroke-order guides.',
        'Includes both the 26-letter English alphabet and full Romanian diacritics (Ă, Â, Î, Ș, Ț) with nature vocabulary in both languages.',
      ],
      ro: [
        'În locul exercițiilor aglomerate, acest caiet îi introduce pe cei mici în frumusețea scrisului de mână prin monograme botanice și ghidaje blânde.',
        'Include atât alfabetul englez, cât și toate diacriticele limbii române (Ă, Â, Î, Ș, Ț), cu vocabular din natură în ambele limbi.',
      ],
    },
    whatsIncluded: {
      en: [
        '68 progressive pre-writing, print, and introductory cursive sheets',
        'Full Romanian diacritics section (Ă, Â, Î, Ș, Ț) + English phonics pack',
        'Botanical monogram coloring certificates',
        'A4 & US Letter high-resolution PDF files',
      ],
      ro: [
        '68 de fișe progresive de pre-scriere, litere de tipar și inițiere în scrisul caligrafic',
        'Secțiune completă pentru diacritice românești (Ă, Â, Î, Ș, Ț) + ediția în Engleză',
        'Diplome ilustrate cu monograme botanice de colorat',
        'Fișiere PDF A4 și US Letter la rezoluție înaltă',
      ],
    },
    sheetPreviews: [
      {
        id: 'alphabet-a',
        title: { en: 'Monogram A — Acorn & Anemone Stroke Guide', ro: 'Monograma A — Afină & Anemonă: Ghid de Scriere' },
        caption: { en: 'Upper and lowercase practice with botanical illustration', ro: 'Exersare majusculă și minusculă cu ilustrație botanică' },
        sheetType: 'woodland-alphabet',
        pageNumber: '06 / 68',
      },
    ],
  },
  {
    id: 'transylvanian-meadows-coloring',
    sku: 'ZC-CB-006',
    category: 'coloring',
    categoryLabel: {
      en: 'Coloring Books',
      ro: 'Cărți de Colorat',
    },
    title: {
      en: 'Carpathian Meadows & Porcelain Teacups: Coloring Anthology',
      ro: 'Pajiști Carpatine & Cești de Porțelan: Antologie de Colorat',
    },
    subtitle: {
      en: '36 cozy still-life and wildflower illustrations celebrating slow afternoons',
      ro: '36 de ilustrații cu flori de câmp, cești de porțelan și colțuri de lectură',
    },
    price: 20,
    educatorPriceDelta: 12,
    pages: 36,
    dpi: '300 DPI Archival Vector PDF',
    dimensions: 'A4 & US Letter',
    paperRecommendation: {
      en: '160gsm – 200gsm warm ivory drawing paper',
      ro: 'Hârtie de desen 160g/mp – 200g/mp ivoar cald',
    },
    bilingualIncluded: true,
    featured: false,
    image: STUDIO_IMAGES.botanicalColoring,
    secondaryImage: STUDIO_IMAGES.founderAtelier,
    editionNote: {
      en: 'Collector’s Volume',
      ro: 'Volum de Colecție',
    },
    description: {
      en: [
        'An intimate tribute to slow Sunday afternoons: linen-draped window sills, vintage porcelain teacups overflowing with chamomile, and open poetry books.',
        'Created for mothers and older children to color side by side at the dining table.',
      ],
      ro: [
        'Un omagiu intim adus după-amiezilor tihnite de duminică: pervazuri îmbrăcate în in, cești de porțelan pline cu mușețel sălbatic și cărți deschise.',
        'Creată pentru ca mamele și copiii mai mari să coloreze împreună în jurul mesei.',
      ],
    },
    whatsIncluded: {
      en: [
        '36 original hand-inked still-life and floral plates',
        '8 printable botanical bookmarks to color and gift',
        'A4 and US Letter 300 DPI PDF editions',
        'Color palette inspiration guide in powder rose, sage, and ochre',
      ],
      ro: [
        '36 de planșe originale cu natură statică și compoziții florale',
        '8 semne de carte botanice imprimabile, gata de colorat și dăruit',
        'Ediții PDF 300 DPI în formatele A4 și US Letter',
        'Ghid de inspirație cromatică în tonuri de roz pudrat, salvie și ocru',
      ],
    },
    sheetPreviews: [
      {
        id: 'teacup-plate',
        title: { en: 'Plate VII — Porcelain Teacup & Wild Peonies', ro: 'Planșa VII — Ceașcă de Porțelan & Bujori' },
        caption: { en: 'Delicate porcelain pattern and floral arrangement', ro: 'Detalii fine de porțelan și aranjament floral bogat' },
        sheetType: 'botanical-peony',
        pageNumber: '07 / 36',
      },
    ],
  },
  {
    id: 'mindful-motherhood-journal',
    sku: 'ZC-CA-007',
    category: 'calendars',
    categoryLabel: {
      en: 'Calendars & Journals',
      ro: 'Calendare & Jurnale',
    },
    title: {
      en: 'Quiet Chapters: Mindful Reflection & Seasonal Journal',
      ro: 'Capitole de Liniște: Jurnal de Reflecție & Anotimpuri',
    },
    subtitle: {
      en: '48 guided journaling prompts, reading logs, and seasonal intention sheets',
      ro: '48 de pagini ghidate de jurnal, evidența lecturilor și intenții pe anotimpuri',
    },
    price: 17,
    educatorPriceDelta: 10,
    pages: 48,
    dpi: '300 DPI Print & Digital PDF',
    dimensions: 'A4, A5 Binder & US Letter',
    paperRecommendation: {
      en: '100gsm – 120gsm cream laid or cotton writing paper',
      ro: 'Hârtie 100g/mp – 120g/mp crem vergé sau cu fibră de bumbac',
    },
    bilingualIncluded: true,
    featured: false,
    image: STUDIO_IMAGES.founderAtelier,
    secondaryImage: STUDIO_IMAGES.familyPlanner,
    editionNote: {
      en: 'A4 + A5 Journal',
      ro: 'Jurnal A4 + A5',
    },
    description: {
      en: [
        'A sanctuary on paper. Quiet Chapters invites you to pause for ten minutes each morning or evening with gentle, unhurried writing prompts, botanical border vignettes, and space for gratitude.',
      ],
      ro: [
        'Un refugiu pe hârtie. Capitole de Liniște te invită la zece minute de răgaz în fiecare dimineață sau seară, cu întrebări blânde de reflecție, viniete botanice și spațiu pentru recunoștință.',
      ],
    },
    whatsIncluded: {
      en: [
        '48 guided journaling, seasonal intention, and book club reflection pages',
        'A5 booklet imposition file for folding your own stitched journal',
        'Complete English and Romanian editions',
      ],
      ro: [
        '48 de pagini ghidate de jurnal, intenții sezoniere și jurnal de lectură',
        'Fișier A5 pregătit pentru pliere și legare manuală tip caiet',
        'Ediții complete în Engleză și Română',
      ],
    },
    sheetPreviews: [
      {
        id: 'journal-prompt',
        title: { en: 'Morning Tea & Three Quiet Intentions', ro: 'Ceaiul de Dimineață & Trei Intenții Blânde' },
        caption: { en: 'Spacious lined composition with botanical crest', ro: 'Compoziție liniată aerisită cu emblemă botanică' },
        sheetType: 'gratitude-journal',
        pageNumber: '03 / 48',
      },
    ],
  },
  {
    id: 'complete-atelier-heirloom-bundle',
    sku: 'ZC-BN-008',
    category: 'planners',
    categoryLabel: {
      en: 'Family Planners',
      ro: 'Planificatoare de Familie',
    },
    title: {
      en: 'The Complete ZALEA Atelier Collector’s Treasury (All 7 Volumes)',
      ro: 'Colecția Completă ZALEA Atelier (Toate cele 7 Volume)',
    },
    subtitle: {
      en: 'Over 310 printable pages of botanical coloring books, family planners, calendars & Montessori cards',
      ro: 'Peste 310 pagini imprimabile: cărți de colorat, planificatoare de familie, calendare și carduri Montessori',
    },
    price: 78,
    educatorPriceDelta: 32,
    pages: 316,
    dpi: '300 DPI Archival Master Archive',
    dimensions: 'A4, A5, A3 & US Letter Complete Suite',
    paperRecommendation: {
      en: 'Includes Cristina’s complete paper & home-printing master guide',
      ro: 'Include ghidul complet al Cristinei pentru alegerea hârtiei și tipărire',
    },
    bilingualIncluded: true,
    featured: false,
    image: STUDIO_IMAGES.heroStationery,
    secondaryImage: STUDIO_IMAGES.botanicalColoring,
    editionNote: {
      en: 'Complete Studio Archive · Save 35%',
      ro: 'Arhiva Completă · Economisești 35%',
    },
    description: {
      en: [
        'Our signature collector’s bundle brings together every volume published by ZALEA CREATIV into one harmonious, lifetime-access digital library.',
        'Whether you are setting up a calm Sunday family planning ritual, preparing bilingual nature activities for your children, or unwinding with botanical coloring plates, the Complete Atelier Treasury accompanies every season of home life.',
      ],
      ro: [
        'Pachetul nostru de colecție reunește toate cele 7 volume publicate de ZALEA CREATIV într-o bibliotecă digitală armonioasă, cu acces pe viață.',
        'Fie că îți organizezi săptămâna în familie, pregătești activități bilingve în natură pentru cei mici sau te relaxezi colorând planșe botanice, Colecția Completă însoțește fiecare anotimp din viața căminului tău.',
      ],
    },
    whatsIncluded: {
      en: [
        'All 7 ZALEA CREATIV volumes (316 printable pages in total)',
        'Both English and Romanian editions for every single product',
        'Bonus: 12 Printable Botanical Gift Tags & Stationery Writing Paper',
        'Complimentary future seasonal updates for 2026–2027',
      ],
      ro: [
        'Toate cele 7 volume ZALEA CREATIV (316 pagini imprimabile în total)',
        'Edițiile în Engleză și Română pentru fiecare produs în parte',
        'Bonus: 12 Etichete Botanice pentru Cadouri & Hârtie de Scrisori',
        'Actualizări sezoniere gratuite pentru 2026–2027',
      ],
    },
    sheetPreviews: [
      {
        id: 'bundle-1',
        title: { en: 'Botanica Coloring Plate IV', ro: 'Planșa Botanică IV' },
        caption: { en: 'From Botanica: Acanthus, Peony & Wild Rose', ro: 'Din volumul Botanica: Acant, Bujor & Trandafir Sălbatic' },
        sheetType: 'botanical-rose',
        pageNumber: 'Vol. I',
      },
      {
        id: 'bundle-2',
        title: { en: 'The Week Ahead Family Planner', ro: 'Planificatorul Săptămânal al Familiei' },
        caption: { en: 'From The Serene Household', ro: 'Din volumul Căminul Senin' },
        sheetType: 'weekly-planner',
        pageNumber: 'Vol. II',
      },
      {
        id: 'bundle-3',
        title: { en: 'Woodland & Meadow Montessori Cards', ro: 'Cardurile Montessori Pădurea & Lunca' },
        caption: { en: 'From Bilingual Nature Study Cards', ro: 'Din volumul Carduri Bilingve pentru Studiul Naturii' },
        sheetType: 'montessori-flora',
        pageNumber: 'Vol. III',
      },
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    quote: {
      en: 'Printing The Serene Household on 120gsm cream cotton paper completely transformed our Sunday evenings. Instead of staring at phone screens, my daughter and I plan our week and color a botanical plate together with tea.',
      ro: 'Tipărirea planificatorului Căminul Senin pe hârtie crem de 120g a transformat complet serile noastre de duminică. În loc să privim în ecrane, planificăm săptămâna și colorăm împreună la o ceașcă de ceai.',
    },
    author: 'Elena Vasilescu-Moor',
    role: {
      en: 'Architect & Mother of Two',
      ro: 'Arhitect & Mamă a doi copii',
    },
    location: 'Cluj-Napoca & Vienna',
    productReferenced: {
      en: 'The Serene Household & Botanica',
      ro: 'Căminul Senin & Botanica',
    },
  },
  {
    id: 't2',
    quote: {
      en: 'As a Montessori guide in a bilingual classroom, finding educational printables that are artistically refined rather than primary-colored clip art is rare. Cristina’s Woodland Nature Cards are cherished by our 4-to-7 age group.',
      ro: 'Ca pedagog Montessori într-o grupă bilingvă, este rar să găsești materiale educaționale cu adevărat rafinate artistic. Cardurile pentru studiul naturii create de Cristina sunt adorate de copiii între 4 și 7 ani.',
    },
    author: 'Clara Lindqvist',
    role: {
      en: 'Lead Montessori Educator, Atelier Kinderhaus',
      ro: 'Pedagog Montessori Coordonator, Atelier Kinderhaus',
    },
    location: 'Munich, Germany',
    productReferenced: {
      en: 'Woodland & Meadow Nature Study Cards (Educator License)',
      ro: 'Carduri pentru Studiul Naturii (Licență Educator)',
    },
  },
  {
    id: 't3',
    quote: {
      en: 'The line quality in Botanica is extraordinary—you can immediately see Cristina’s hand in every peony petal and leaf vein. Printed on 200gsm Fabriano paper, it feels like a limited-edition art book from a museum shop.',
      ro: 'Calitatea liniei din Botanica este extraordinară — se simte mâna Cristinei în fiecare petală de bujor. Tipărită pe hârtie Fabriano de 200g, arată ca un album de artă dintr-un muzeu.',
    },
    author: 'Sophie Moreau',
    role: {
      en: 'Botanical Illustrator & Collector',
      ro: 'Ilustrator Botanic & Colecționar',
    },
    location: 'Lyon, France',
    productReferenced: {
      en: 'Botanica: Acanthus, Peony & Wild Rose',
      ro: 'Botanica: Acant, Bujor & Trandafir Sălbatic',
    },
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'downloads',
    question: {
      en: 'How do I receive my ZALEA CREATIV products after checkout?',
      ro: 'Cum primesc produsele ZALEA CREATIV după finalizarea comenzii?',
    },
    answer: {
      en: 'Every creation in our studio is an instant digital download. Immediately upon completing checkout, you receive direct download access on your confirmation screen as well as an archive link sent to your email. No physical waiting times or shipping fees apply.',
      ro: 'Fiecare creație din studioul nostru este un produs digital cu descărcare instantanee. Imediat după finalizarea comenzii, primești acces direct la fișiere în pagina de confirmare, precum și pe e-mail. Nu există taxe de curierat sau timp de așteptare.',
    },
  },
  {
    id: 'faq-2',
    category: 'printing',
    question: {
      en: 'What paper weight and printer settings does Cristina recommend?',
      ro: 'Ce tip de hârtie și ce setări de imprimare recomandă Cristina?',
    },
    answer: {
      en: 'For family planners and journals, we recommend 100gsm–120gsm warm ivory uncoated paper. For coloring books, choose 160gsm–220gsm cotton or drawing paper. For Montessori flashcards, 250gsm–300gsm matte cardstock offers heirloom durability. Always select "Actual Size / 100% Scale" in your printer dialog.',
      ro: 'Pentru planificatoare și jurnale, recomandăm hârtie necretată ivoar cald de 100g/mp–120g/mp. Pentru cărțile de colorat, alegeți hârtie de desen sau bumbac de 160g/mp–220g/mp. Pentru cardurile Montessori, cartonul mat de 250g/mp–300g/mp oferă o rezistență deosebită. Selectați întotdeauna „Dimensiune reală / 100%” în setările imprimantei.',
    },
  },
  {
    id: 'faq-3',
    category: 'printing',
    question: {
      en: 'Are both European A4 and North American US Letter sizes included?',
      ro: 'Sunt incluse atât formatul european A4, cât și cel american US Letter?',
    },
    answer: {
      en: 'Yes. Every ZALEA CREATIV release includes individually typeset master PDF files for both International A4 (210 × 297 mm) and US Letter (8.5 × 11 inches) at 300 DPI archival resolution, ensuring balanced margins wherever you live.',
      ro: 'Da. Fiecare produs ZALEA CREATIV include fișiere PDF master machetate individual atât pentru formatul internațional A4 (210 × 297 mm), cât și pentru US Letter, la rezoluție de arhivă 300 DPI.',
    },
  },
  {
    id: 'faq-4',
    category: 'bilingual',
    question: {
      en: 'Do I receive both English and Romanian versions when I purchase?',
      ro: 'Primesc atât versiunea în Engleză, cât și pe cea în Română la achiziție?',
    },
    answer: {
      en: 'Yes! Because ZALEA CREATIV celebrates bilingual family life and cultural heritage, every purchase includes both the English (EN) edition and the Romanian (RO) edition inside your download folder at no additional cost.',
      ro: 'Da! Întrucât ZALEA CREATIV celebrează educația bilingvă și frumusețea limbii materne, fiecare achiziție include atât ediția în Engleză (EN), cât și ediția în Română (RO) în pachetul de descărcare, fără niciun cost suplimentar.',
    },
  },
  {
    id: 'faq-5',
    category: 'licensing',
    question: {
      en: 'How many times can I print my downloaded files? Can I use them in a classroom?',
      ro: 'De câte ori pot tipări fișierele descărcate? Le pot folosi la clasă?',
    },
    answer: {
      en: 'With our Standard Personal & Household License, you may re-print the files an unlimited number of times for yourself and your immediate family. If you are a teacher, Montessori guide, or therapist printing for up to 30 students, simply select the "Classroom & Educator License" option on the product page.',
      ro: 'Cu Licența Personală și de Familie, puteți retipări fișierele de un număr nelimitat de ori pentru dumneavoastră și membrii familiei. Dacă sunteți cadru didactic, pedagog Montessori sau terapeut și tipăriți pentru o grupă de până la 30 de copii, selectați opțiunea „Licență Educator & Clasă” în pagina produsului.',
    },
  },
  {
    id: 'faq-6',
    category: 'downloads',
    question: {
      en: 'Can I use the planners and coloring books on an iPad with Apple Pencil?',
      ro: 'Pot folosi planificatoarele și cărțile de colorat pe iPad cu Apple Pencil?',
    },
    answer: {
      en: 'Absolutely. All of our high-resolution PDFs are vector-crisp and compatible with GoodNotes, Notability, and Procreate on iPad or Android tablets, in addition to traditional paper printing.',
      ro: 'Absolut. Toate fișierele noastre PDF de înaltă rezoluție sunt compatibile cu aplicațiile GoodNotes, Notability și Procreate pe iPad sau tablete grafice, pe lângă tipărirea tradițională pe hârtie.',
    },
  },
];

export const UI_COPY = {
  en: {
    nav: {
      home: 'Home',
      shop: 'Shop',
      about: 'About',
      faq: 'FAQ',
      contact: 'Contact',
      bag: 'Collection Bag',
    },
    hero: {
      kicker: 'Independent Digital Publishing Studio · Founded by Cristina',
      headline: 'Little Moments. Beautiful Creations.',
      subheadline:
        'Thoughtfully designed printables, coloring books and creative treasures for everyday inspiration.',
      primaryCta: 'Explore the Collection',
      secondaryCta: 'Discover Our Story',
      sampleCta: 'Inspect Sample Pages',
      metrics: [
        { value: '300 DPI', label: 'Archival Vector Print Quality · A4 & US Letter' },
        { value: 'EN + RO', label: 'Dual Bilingual Editions Included in Every Treasure' },
        { value: '100% Hand-Drawn', label: 'Original Botanical Line Art by Cristina' },
        { value: 'Instant Access', label: 'Unlimited Personal & Family Re-Printing' },
      ],
    },
    categories: {
      all: 'All Creations',
      coloring: 'Coloring Books',
      planners: 'Family Planners',
      educational: 'Educational Resources',
      calendars: 'Calendars & Journals',
    },
    homeSections: {
      curatedKicker: 'Curated Studio Releases',
      curatedTitle: 'Heirloom Paper Goods, Ready to Print at Home',
      curatedSubtitle:
        'Each volume is crafted for tactile warmth—whether clipped to a brass board in your kitchen or colored beside a porcelain cup of evening tea.',
      viewAllShop: 'View Complete Catalog',
      insideLookKicker: 'Tactile Craftsmanship',
      insideLookTitle: 'Inspect the Line Art & Paper Architecture',
      insideLookSubtitle:
        'Preview actual interior sheets from our coloring books, family planners, and bilingual Montessori nature cards before you download.',
      printSampleBtn: 'Print This Sample Sheet',
      founderKicker: 'From Cristina’s Desk',
      founderTitle: 'Designed with Patience for Quiet, Creative Homes',
      founderBody1:
        '“I founded ZALEA CREATIV out of a desire to bring slow, tactile beauty back to our kitchen tables. In a world of hurried notifications, sitting down with warm ivory paper, colored pencils, and a thoughtfully structured family planner turns ordinary afternoons into cherished rituals.”',
      founderBody2:
        'Every botanical petal, Montessori flashcard, and seasonal planner layout is drawn and typeset in our studio with bilingual English and Romanian families in mind.',
      readFullStory: 'Read Cristina’s Story',
      testimonialsKicker: 'Reader & Educator Reflections',
      testimonialsTitle: 'Cherished at Kitchen Tables & Montessori Classrooms Across Europe',
    },
    productCard: {
      pages: 'pages',
      inspect: 'View Details',
      quickAdd: 'Add to Bag',
      added: 'Added',
    },
    shopPage: {
      kicker: 'The ZALEA CREATIV Archive',
      title: 'Boutique Printable Collection',
      subtitle:
        'Every creation includes both A4 and US Letter archival PDF files alongside complete English and Romanian editions.',
      searchPlaceholder: 'Search by botanical theme, planner, age group...',
      sortBy: 'Sort by',
      sortFeatured: 'Studio Curated',
      sortPriceAsc: 'Price: Low to High',
      sortPriceDesc: 'Price: High to Low',
      sortPagesDesc: 'Page Count: Most Comprehensive',
      showingCount: 'creations available for instant download',
    },
    pdp: {
      backToShop: 'Back to Collection',
      licenseLabel: 'Select Print License Edition',
      personalLicense: 'Personal & Household License',
      personalLicenseDesc: 'Unlimited printing for you and your immediate family',
      educatorLicense: 'Classroom & Educator License',
      educatorLicenseDesc: 'Permits printing for up to 30 students in a classroom or studio',
      addToBag: 'Add to Collection Bag',
      previewSheetBtn: 'Open Full-Screen Printable Preview',
      instantDeliveryNote: 'Instant 300 DPI PDF Download · Includes A4 & US Letter · English & Romanian Editions',
      whatsIncludedTitle: 'What Is Inside Your Download Archive',
      specificationsTitle: 'Archival & Printing Specifications',
      paperRecLabel: 'Recommended Paper',
      dimensionsLabel: 'Included Formats',
      resolutionLabel: 'Print Resolution',
      languagesLabel: 'Languages Included',
      languagesValue: 'English (EN) + Română (RO) Dual Pack',
      insidePagesTitle: 'Inspect Interior Printable Sheets',
      relatedTitle: 'Companion Creations from the Atelier',
    },
    cart: {
      title: 'Your Collection Bag',
      emptyTitle: 'Your collection bag is waiting for inspiration.',
      emptySubtitle: 'Explore our botanical coloring books, family planners, and bilingual educational treasures.',
      exploreBtn: 'Browse the Collection',
      promoPlaceholder: 'Atelier code (try ZALEA10)',
      apply: 'Apply',
      subtotal: 'Subtotal',
      discount: 'Atelier Welcome (10%)',
      total: 'Total (Instant Digital Delivery)',
      checkoutBtn: 'Proceed to Instant Download Checkout',
      emailLabel: 'Delivery Email Address for Your PDF Archive',
      nameLabel: 'Your Full Name',
      completeOrderBtn: 'Complete Order & Unlock Downloads',
      orderConfirmedTitle: 'Thank You! Your Creations Are Ready.',
      orderConfirmedSubtitle: 'We have prepared your 300 DPI master PDF archives below and sent a permanent backup copy to',
      downloadNowBtn: 'Print / Save Printable Sheet',
      continueShopping: 'Return to Atelier',
    },
  },
  ro: {
    nav: {
      home: 'Acasă',
      shop: 'Colecție',
      about: 'Despre ZALEA',
      faq: 'Întrebări',
      contact: 'Contact',
      bag: 'Coșul Meu',
    },
    hero: {
      kicker: 'Studio Independent de Publicații Digitale · Fondat de Cristina',
      headline: 'Mici Momente. Creații Frumoase.',
      subheadline:
        'Planificatoare, cărți de colorat și comori creative desenate cu grijă pentru inspirația de zi cu zi.',
      primaryCta: 'Explorează Colecția',
      secondaryCta: 'Descoperă Povestea Noastră',
      sampleCta: 'Răsfoiește Pagini Mostră',
      metrics: [
        { value: '300 DPI', label: 'Calitate de Arhivă Vectorială · A4 & US Letter' },
        { value: 'EN + RO', label: 'Ediții Bilingve Incluse în Fiecare Creație' },
        { value: '100% Desenat Manual', label: 'Ilustrații Botanice Originale Semnate de Cristina' },
        { value: 'Acces Instant', label: 'Retipărire Nelimitată pentru Familia Ta' },
      ],
    },
    categories: {
      all: 'Toate Creațiile',
      coloring: 'Cărți de Colorat',
      planners: 'Planificatoare de Familie',
      educational: 'Resurse Educaționale',
      calendars: 'Calendare & Jurnale',
    },
    homeSections: {
      curatedKicker: 'Selecția Atelierului',
      curatedTitle: 'Papetărie de Colecție, Gata de Tipărit Acasă',
      curatedSubtitle:
        'Fiecare volum este conceput pentru căldură tactilă — fie prins într-un clipboard de alamă în bucătărie, fie colorat alături de o ceașcă de ceai.',
      viewAllShop: 'Vezi Întregul Catalog',
      insideLookKicker: 'Arhitectura Paginii',
      insideLookTitle: 'Explorează Ilustrațiile și Structura Paginilor',
      insideLookSubtitle:
        'Răsfoiește file reale din cărțile noastre de colorat, planificatoarele de familie și cardurile Montessori înainte de descărcare.',
      printSampleBtn: 'Tipărește Această Pagină Mostră',
      founderKicker: 'Din Atelierul Cristinei',
      founderTitle: 'Create cu Răbdare pentru Cămine Calde și Creative',
      founderBody1:
        '„Am fondat ZALEA CREATIV din dorința de a readuce frumusețea tactilă și liniștea în jurul mesei din bucătărie. Într-o lume a notificărilor grăbite, răgazul de a te așeza în fața unei coli ivoar, cu creioane colorate și un planificator aerisit, transformă după-amiezile obișnuite în ritualuri dragi.”',
      founderBody2:
        'Fiecare petală botanică, card Montessori și planificator sezonier este desenat și machetat în studioul nostru, gândit atât în Engleză, cât și în Română.',
      readFullStory: 'Citește Povestea Cristinei',
      testimonialsKicker: 'Impresii de la Cititori & Educatori',
      testimonialsTitle: 'Prețuite în Case de Familie și Grupe Montessori din Întreaga Europă',
    },
    productCard: {
      pages: 'pagini',
      inspect: 'Vezi Detalii',
      quickAdd: 'Adaugă în Coș',
      added: 'Adăugat',
    },
    shopPage: {
      kicker: 'Arhiva ZALEA CREATIV',
      title: 'Colecția de Papetărie Imprimabilă',
      subtitle:
        'Fiecare creație include fișiere PDF de arhivă în formatele A4 și US Letter, alături de edițiile complete în Engleză și Română.',
      searchPlaceholder: 'Caută după temă botanică, planificator, vârstă...',
      sortBy: 'Sortează după',
      sortFeatured: 'Selecția Studioului',
      sortPriceAsc: 'Preț: Crescător',
      sortPriceDesc: 'Preț: Descrescător',
      sortPagesDesc: 'Număr de Pagini',
      showingCount: 'creații disponibile pentru descărcare instantanee',
    },
    pdp: {
      backToShop: 'Înapoi la Colecție',
      licenseLabel: 'Alege Tipul de Licență',
      personalLicense: 'Licență Personală & de Familie',
      personalLicenseDesc: 'Tipărire nelimitată pentru tine și familia ta',
      educatorLicense: 'Licență Educator & Clasă',
      educatorLicenseDesc: 'Permite tipărirea pentru până la 30 de copii la clasă sau atelier',
      addToBag: 'Adaugă în Coșul de Colecție',
      previewSheetBtn: 'Deschide Previzualizarea Paginii',
      instantDeliveryNote: 'Descărcare Instantanee PDF 300 DPI · Include A4 & US Letter · Ediții Engleză & Română',
      whatsIncludedTitle: 'Ce Conține Arhiva Digitală',
      specificationsTitle: 'Specificații Tehnice & de Tipărire',
      paperRecLabel: 'Hârtie Recomandată',
      dimensionsLabel: 'Formate Incluse',
      resolutionLabel: 'Rezoluție la Tipar',
      languagesLabel: 'Limbi Incluse',
      languagesValue: 'Pachet Dublu Engleză (EN) + Română (RO)',
      insidePagesTitle: 'Explorează Paginile Interioare',
      relatedTitle: 'Creații Complementare din Atelier',
    },
    cart: {
      title: 'Coșul Tău de Colecție',
      emptyTitle: 'Coșul tău așteaptă primele creații.',
      emptySubtitle: 'Explorează cărțile de colorat botanice, planificatoarele de familie și resursele educaționale bilingve.',
      exploreBtn: 'Descoperă Colecția',
      promoPlaceholder: 'Cod atelier (încearcă ZALEA10)',
      apply: 'Aplică',
      subtotal: 'Subtotal',
      discount: 'Bun Venit în Atelier (10%)',
      total: 'Total (Livrare Digitală Instantanee)',
      checkoutBtn: 'Continuă spre Descărcarea Instantanee',
      emailLabel: 'Adresa de E-mail pentru Livrarea Arhivei PDF',
      nameLabel: 'Numele Tău Complet',
      completeOrderBtn: 'Finalizează Comanda & Descarcă Fișierele',
      orderConfirmedTitle: 'Îți Mulțumim! Creațiile Tale Sunt Pregătite.',
      orderConfirmedSubtitle: 'Am pregătit mai jos arhivele PDF la 300 DPI și am trimis o copie permanentă pe adresa',
      downloadNowBtn: 'Tipărește / Salvează Fișa',
      continueShopping: 'Înapoi în Atelier',
    },
  },
};
