import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, Mail, MapPin, Printer } from 'lucide-react';
import { FAQ_ITEMS, Language, PageRoute, STUDIO_IMAGES } from '../data/catalog';
import { StudioImage } from './StudioImage';

interface AboutPageProps {
  lang: Language;
  onNavigate: (page: PageRoute) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ lang, onNavigate }) => {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-20">
      {/* Editorial Story Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
        <div className="lg:col-span-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A67589] mb-4">
            <span>{lang === 'en' ? 'The ZALEA CREATIV Story' : 'Povestea ZALEA CREATIV'}</span>
            <span aria-hidden="true">·</span>
            <span>{lang === 'en' ? 'Founded by Cristina' : 'Fondat de Cristina'}</span>
          </div>

          <h1 className="font-editorial text-4xl sm:text-5xl lg:text-[54px] leading-[1.1] text-[#30272D]">
            {lang === 'en'
              ? 'An Independent Studio Dedicated to Quiet Beauty on Paper.'
              : 'Un Studio Independent Dedicat Frumuseții Tihnite pe Hârtie.'}
          </h1>

          <div className="mt-6 space-y-5 text-base leading-relaxed text-[#30272D]/85">
            <p>
              {lang === 'en'
                ? 'ZALEA CREATIV began at Cristina’s sunlit oak table with a simple observation: our homes and family routines had become saturated with glowing screens, hurried notifications, and disposable plastic toys—leaving little room for slow, tactile wonder.'
                : 'ZALEA CREATIV a luat naștere la masa de stejar luminată de soare a Cristinei, dintr-o observație simplă: casele și rutinele noastre de familie au devenit saturate de ecrane și notificări grăbite, lăsând tot mai puțin loc pentru frumusețea tactilă a hârtiei.'}
            </p>
            <p>
              {lang === 'en'
                ? 'Drawing upon European botanical illustration traditions and Montessori tactile pedagogy, Cristina began creating printable coloring books, serene household planners, and bilingual nature study cards that any family can print on warm archival paper at home.'
                : 'Inspirându-se din tradiția europeană a ilustrației botanice și din pedagogia tactilă Montessori, Cristina a început să creeze cărți de colorat imprimabile, planificatoare de familie senine și carduri bilingve pentru studiul naturii, pe care orice familie le poate tipări acasă pe hârtie caldă de colecție.'}
            </p>
            <p>
              {lang === 'en'
                ? 'Because language and heritage are woven into family life, every single ZALEA CREATIV volume is published in both English and Romanian—allowing parents, children, and educators to move effortlessly between both languages.'
                : 'Întrucât limba și rădăcinile culturale fac parte din sufletul familiei, fiecare volum ZALEA CREATIV este publicat atât în Engleză, cât și în Română — oferind părinților, copiilor și educatorilor bucuria de a învăța și crea în ambele limbi.'}
            </p>
          </div>

          <div className="mt-8 pt-6 border-t border-[#30272D]/10 flex flex-wrap items-center justify-between gap-6">
            <div>
              <p className="font-editorial italic text-2xl text-[#30272D]">Cristina</p>
              <p className="text-xs text-[#A67589] mt-0.5">
                {lang === 'en'
                  ? 'Founder, Illustrator & Creative Director · zaleacreativ.com'
                  : 'Fondatoare, Ilustratoare & Director Creativ · zaleacreativ.com'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => onNavigate('shop')}
              className="inline-flex items-center gap-2 rounded-lg bg-[#30272D] px-6 py-3 text-xs font-medium text-[#FFF9F5] hover:bg-[#A67589] transition-colors whitespace-nowrap shrink-0"
            >
              <span>{lang === 'en' ? 'Explore the Collection' : 'Explorează Colecția'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative h-full min-h-[380px] rounded-2xl overflow-hidden border border-[#30272D]/10 bg-[#EACBD5]/20">
            <StudioImage
              src={STUDIO_IMAGES.founderAtelier}
              alt={
                lang === 'en'
                  ? 'Cristina illustrating botanical plates in the ZALEA CREATIV studio'
                  : 'Cristina ilustrând planșe botanice în atelierul ZALEA CREATIV'
              }
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 4 Editorial Craft Pillars */}
      <div className="mt-20 pt-16 border-t border-[#30272D]/10">
        <div className="max-w-2xl mb-12">
          <p className="text-xs uppercase tracking-widest text-[#A67589] mb-2">
            {lang === 'en' ? 'Our Publishing Philosophy' : 'Filosofia Noastră Editorială'}
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#30272D]">
            {lang === 'en'
              ? 'Four Principles Behind Every ZALEA Edition'
              : 'Patru Principii la Baza Fiecărei Ediții ZALEA'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              index: '01.',
              title: {
                en: 'Hand-Inked Botanical Line Art',
                ro: 'Ilustrație Botanică Desenată Manual',
              },
              body: {
                en: 'We never use stock clip art. Every petal, leaf vein, and woodland creature is drawn with organic line modulation for colored pencils and watercolors.',
                ro: 'Nu folosim niciodată imagini de stoc. Fiecare petală, nervură și pasăre de pădure este desenată manual cu linii fine, ideale pentru creioane colorate și acuarelă.',
              },
            },
            {
              index: '02.',
              title: {
                en: 'Editorial Typography & Calm Grids',
                ro: 'Tipografie Editorială & Grile Aerisite',
              },
              body: {
                en: 'Our family planners reject cramped boxes in favor of generous margins, classical serif headings, and soothing visual rhythm.',
                ro: 'Planificatoarele noastre evită tabelele înghesuite, oferind margini generoase, titluri clasice și un ritm vizual odihnitor.',
              },
            },
            {
              index: '03.',
              title: {
                en: 'Bilingual English & Romanian Heritage',
                ro: 'Moștenire Bilingvă Engleză & Română',
              },
              body: {
                en: 'Every creation includes both complete English and Romanian editions—supporting bilingual households, diaspora families, and educators.',
                ro: 'Fiecare creație include ediții complete în Engleză și Română — susținând familiile bilingve, comunitățile din diaspora și educatorii.',
              },
            },
            {
              index: '04.',
              title: {
                en: 'Archival 300 DPI Print Precision',
                ro: 'Precizie Tipografică la 300 DPI',
              },
              body: {
                en: 'Individually proportioned for both International A4 and North American US Letter so nothing ever clips or scales awkwardly.',
                ro: 'Machetate individual pentru formatele A4 și US Letter, astfel încât marginile și proporțiile să rămână impecabile la tipar.',
              },
            },
          ].map((pillar) => (
            <div
              key={pillar.index}
              className="rounded-2xl bg-[#FFFCF9] p-6 border border-[#30272D]/10 flex flex-col justify-between"
            >
              <div>
                <span className="font-editorial text-2xl text-[#C8A46B]">{pillar.index}</span>
                <h3 className="mt-3 font-editorial text-2xl text-[#30272D]">
                  {pillar.title[lang]}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-[#30272D]/75">
                  {pillar.body[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Cristina's Paper & Printing Guide */}
      <div className="mt-20 rounded-2xl bg-[#EACBD5]/25 border border-[#30272D]/10 p-8 sm:p-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#A67589] mb-2">
              <Printer className="h-3.5 w-3.5" />
              <span>{lang === 'en' ? 'Atelier Printing Notes' : 'Ghidul de Tipărire al Atelierului'}</span>
            </div>
            <h3 className="font-editorial text-3xl text-[#30272D]">
              {lang === 'en'
                ? 'How to Transform Digital Files into Heirloom Stationery'
                : 'Cum Transformi Fișierele Digitale în Papetărie de Colecție'}
            </h3>
            <p className="mt-3 text-sm sm:text-base text-[#30272D]/80 leading-relaxed">
              {lang === 'en'
                ? 'The secret to boutique-quality printables lies in paper texture. Instead of bright blue-white copy paper, choose warm ivory or natural cream uncoated stock (120gsm for planners, 180gsm cotton for coloring books, and 300gsm matte cardstock for Montessori cards).'
                : 'Secretul unor materiale imprimabile cu aspect de boutique stă în textura hârtiei. În locul hârtiei albe reci de birou, alege hârtie necretată în nuanța ivoar cald sau crem natural (120g/mp pentru planificatoare, 180g/mp cu bumbac pentru cărțile de colorat și carton mat de 300g/mp pentru cardurile Montessori).'}
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <button
              type="button"
              onClick={() => onNavigate('faq')}
              className="rounded-lg border border-[#30272D] px-5 py-3 text-xs font-medium text-[#30272D] hover:bg-[#30272D] hover:text-[#FFF9F5] transition-colors whitespace-nowrap shrink-0"
            >
              {lang === 'en' ? 'Read Full Printing FAQ' : 'Vezi Întrebările despre Tipărire'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContactPageProps {
  lang: Language;
}

export const ContactPage: React.FC<ContactPageProps> = ({ lang }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('order');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 py-10 sm:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-widest text-[#A67589] mb-3">
              {lang === 'en' ? 'Correspondence & Atelier Support' : 'Corespondență & Suport Atelier'}
            </p>
            <h1 className="font-editorial text-4xl sm:text-5xl text-[#30272D]">
              {lang === 'en' ? 'Write to Cristina & the Studio' : 'Scrie-ne în Atelierul ZALEA'}
            </h1>
            <p className="mt-4 text-base text-[#30272D]/80 leading-relaxed">
              {lang === 'en'
                ? 'Whether you have a question about paper selection, need assistance with your digital download archive, or wish to inquire about school licensing and custom illustrations, we read every note personally.'
                : 'Fie că ai o întrebare despre alegerea hârtiei, ai nevoie de ajutor cu arhiva digitală sau dorești o licență pentru școală ori o ilustrație personalizată, citim fiecare mesaj cu bucurie.'}
            </p>

            <div className="mt-8 space-y-5 pt-6 border-t border-[#30272D]/10 text-sm">
              <div className="flex items-start gap-3.5">
                <Mail className="h-4 w-4 text-[#A67589] mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-[#30272D]">
                    {lang === 'en' ? 'Direct Atelier Email' : 'E-mail Direct Atelier'}
                  </p>
                  <p className="text-[#30272D]/75">cristina@zaleacreativ.com</p>
                  <p className="text-xs text-[#A67589] mt-0.5">
                    {lang === 'en'
                      ? 'Responses within 24 hours (Monday – Friday)'
                      : 'Răspundem în maximum 24 de ore (Luni – Vineri)'}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <MapPin className="h-4 w-4 text-[#A67589] mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-[#30272D]">
                    {lang === 'en' ? 'Studio Location & Languages' : 'Locația Studioului & Limbi'}
                  </p>
                  <p className="text-[#30272D]/75">
                    {lang === 'en'
                      ? 'European Digital Publishing Studio · Correspondence in English & Romanian'
                      : 'Studio European de Publicații Digitale · Corespondență în Română & Engleză'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 rounded-2xl bg-[#FFFCF9] p-6 border border-[#30272D]/10">
            <p className="font-editorial italic text-xl text-[#30272D]">
              {lang === 'en'
                ? '“Every message from a mother, child, or teacher who prints our work brings warmth to our drawing table.”'
                : '„Fiecare mesaj de la o mamă, un copil sau un educator care tipărește creațiile noastre aduce lumină pe masa noastră de desen.”'}
            </p>
            <p className="mt-2 text-xs text-[#A67589]">— Cristina, ZALEA CREATIV</p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="rounded-2xl bg-[#FFFCF9] p-8 sm:p-10 border border-[#30272D]/10">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="mx-auto h-10 w-10 text-[#A67589]" />
                <h2 className="font-editorial text-3xl text-[#30272D]">
                  {lang === 'en'
                    ? 'Thank You for Writing to ZALEA CREATIV'
                    : 'Îți Mulțumim pentru Mesajul Trimis'}
                </h2>
                <p className="mx-auto max-w-md text-sm text-[#30272D]/75 leading-relaxed">
                  {lang === 'en'
                    ? `Dear ${name}, Cristina has received your note and will reply to ${email} within one business day.`
                    : `Dragă ${name}, am primit mesajul tău în atelier și îți vom răspunde pe adresa ${email} în cel mult o zi lucrătoare.`}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setMessage('');
                  }}
                  className="mt-4 rounded-lg border border-[#30272D]/20 px-5 py-2.5 text-xs font-medium text-[#30272D] hover:bg-[#EACBD5]/30 transition-colors"
                >
                  {lang === 'en' ? 'Send Another Note' : 'Trimite un Alt Mesaj'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <h2 className="font-editorial text-2xl sm:text-3xl text-[#30272D]">
                  {lang === 'en' ? 'Send a Note to the Studio' : 'Trimite o Scrisoare către Atelier'}
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-medium text-[#30272D]/80 mb-2">
                      {lang === 'en' ? 'Your Name' : 'Numele Tău'}
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={lang === 'en' ? 'e.g. Ana Maria Popescu' : 'ex. Ana Maria Popescu'}
                      className="w-full rounded-lg border border-[#30272D]/15 bg-[#FFF9F5] px-4 py-3 text-sm text-[#30272D] focus:border-[#A67589] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-[#30272D]/80 mb-2">
                      {lang === 'en' ? 'Email Address' : 'Adresa de E-mail'}
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full rounded-lg border border-[#30272D]/15 bg-[#FFF9F5] px-4 py-3 text-sm text-[#30272D] focus:border-[#A67589] focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#30272D]/80 mb-2">
                    {lang === 'en' ? 'Subject of Inquiry' : 'Subiectul Mesajului'}
                  </label>
                  <select
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="w-full rounded-lg border border-[#30272D]/15 bg-[#FFF9F5] px-4 py-3 text-sm text-[#30272D] focus:border-[#A67589] focus:outline-none"
                  >
                    <option value="order">
                      {lang === 'en'
                        ? 'Download Support & Printing Advice'
                        : 'Asistență Descărcare & Sfaturi de Tipărire'}
                    </option>
                    <option value="educator">
                      {lang === 'en'
                        ? 'Montessori / School & Classroom Licensing'
                        : 'Licențe pentru Școli, Grădinițe & Educatori Montessori'}
                    </option>
                    <option value="custom">
                      {lang === 'en'
                        ? 'Bespoke Botanical Illustration Commission'
                        : 'Comandă Personalizată de Ilustrație Botanică'}
                    </option>
                    <option value="press">
                      {lang === 'en'
                        ? 'Press, Boutique Partnerships & Editorial'
                        : 'Presă, Colaborări & Parteneriate'}
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#30272D]/80 mb-2">
                    {lang === 'en' ? 'Your Message' : 'Mesajul Tău'}
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={
                      lang === 'en'
                        ? 'Tell us how we can help you...'
                        : 'Spune-ne cum te putem ajuta...'
                    }
                    className="w-full rounded-lg border border-[#30272D]/15 bg-[#FFF9F5] px-4 py-3 text-sm text-[#30272D] focus:border-[#A67589] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-lg bg-[#30272D] px-8 py-3.5 text-xs font-medium text-[#FFF9F5] hover:bg-[#A67589] transition-colors whitespace-nowrap shrink-0"
                >
                  {lang === 'en' ? 'Send Correspondence' : 'Trimite Mesajul'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

interface FaqPageProps {
  lang: Language;
  onNavigate: (page: PageRoute) => void;
}

export const FaqPage: React.FC<FaqPageProps> = ({ lang, onNavigate }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'downloads' | 'printing' | 'bilingual' | 'licensing'>('all');
  const [openId, setOpenId] = useState<string>('faq-1');

  const filteredFaqs =
    activeCategory === 'all'
      ? FAQ_ITEMS
      : FAQ_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <div className="mx-auto max-w-4xl px-4 sm:px-6 py-10 sm:py-20">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-widest text-[#A67589] mb-2">
          {lang === 'en' ? 'Atelier Guidance & Support' : 'Ghidul Atelierului & Întrebări Frecvente'}
        </p>
        <h1 className="font-editorial text-4xl sm:text-5xl text-[#30272D]">
          {lang === 'en' ? 'Frequently Asked Questions' : 'Întrebări Frecvente'}
        </h1>
        <p className="mt-4 text-base text-[#30272D]/75">
          {lang === 'en'
            ? 'Everything you need to know about instant digital downloads, archival paper selection, home printing, and bilingual editions.'
            : 'Tot ce trebuie să știi despre descărcarea instantanee a fișierelor PDF, alegerea hârtiei, tipărirea acasă și edițiile bilingve.'}
        </p>
      </div>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-[#EACBD5]/25 rounded-xl border border-[#30272D]/10">
        {[
          { id: 'all', label: { en: 'All Questions', ro: 'Toate Întrebările' } },
          { id: 'downloads', label: { en: 'Instant Downloads', ro: 'Descărcare Digitală' } },
          { id: 'printing', label: { en: 'Paper & Printing', ro: 'Hârtie & Tipărire' } },
          { id: 'bilingual', label: { en: 'Bilingual EN / RO', ro: 'Ediții Bilingve EN / RO' } },
          { id: 'licensing', label: { en: 'Print Licensing', ro: 'Licențe de Tipărire' } },
        ].map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveCategory(tab.id as typeof activeCategory)}
            className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 ${
              activeCategory === tab.id
                ? 'bg-[#30272D] text-[#FFF9F5]'
                : 'text-[#30272D]/80 hover:bg-[#FFF9F5]'
            }`}
          >
            {tab.label[lang]}
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-4">
        {filteredFaqs.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className="rounded-2xl bg-[#FFFCF9] border border-[#30272D]/10 overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? '' : item.id)}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="font-editorial text-xl sm:text-2xl text-[#30272D]">
                  {item.question[lang]}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-[#A67589] shrink-0 transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[#30272D]/80 leading-relaxed border-t border-[#30272D]/8">
                  {item.answer[lang]}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-2xl bg-[#FFFCF9] border border-[#30272D]/10 p-8 text-center">
        <h3 className="font-editorial text-2xl text-[#30272D]">
          {lang === 'en' ? 'Still have a specific question?' : 'Ai o altă întrebare pentru noi?'}
        </h3>
        <p className="mt-2 text-sm text-[#30272D]/75">
          {lang === 'en'
            ? 'Cristina is happy to advise on paper weights, printer settings, or classroom bundles.'
            : 'Cristina îți răspunde cu drag la orice întrebare despre hârtie, imprimantă sau pachete educaționale.'}
        </p>
        <button
          type="button"
          onClick={() => onNavigate('contact')}
          className="mt-5 rounded-lg bg-[#30272D] px-6 py-2.5 text-xs font-medium text-[#FFF9F5] hover:bg-[#A67589] transition-colors whitespace-nowrap shrink-0"
        >
          {lang === 'en' ? 'Contact the Studio' : 'Scrie-ne în Atelier'}
        </button>
      </div>
    </div>
  );
};

interface LegalPageProps {
  type: 'privacy' | 'terms';
  lang: Language;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type, lang }) => {
  if (type === 'privacy') {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-20">
        <p className="text-xs uppercase tracking-widest text-[#A67589] mb-2">
          zaleacreativ.com · {lang === 'en' ? 'Last Updated October 2026' : 'Actualizat Octombrie 2026'}
        </p>
        <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#30272D]">
          {lang === 'en' ? 'Privacy Policy & Data Stewardship' : 'Politica de Confidențialitate & GDPR'}
        </h1>

        <div className="mt-8 space-y-8 text-sm sm:text-base leading-relaxed text-[#30272D]/85">
          <section className="space-y-2">
            <h2 className="font-editorial text-2xl text-[#30272D]">
              {lang === 'en' ? '01. Studio Controller & Commitment' : '01. Operatorul de Date & Angajamentul Nostru'}
            </h2>
            <p>
              {lang === 'en'
                ? 'ZALEA CREATIV (“we”, “our studio”, zaleacreativ.com), founded by Cristina, respects your privacy and handles all personal data in strict compliance with the European Union General Data Protection Regulation (GDPR - Regulation EU 2016/679).'
                : 'ZALEA CREATIV („noi”, „studioul nostru”, zaleacreativ.com), fondat de Cristina, respectă confidențialitatea datelor dumneavoastră în deplină conformitate cu Regulamentul General privind Protecția Datelor din Uniunea Europeană (GDPR - Regulamentul UE 2016/679).'}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-2xl text-[#30272D]">
              {lang === 'en' ? '02. Information We Collect' : '02. Datele pe Care le Colectăm'}
            </h2>
            <p>
              {lang === 'en'
                ? 'When you purchase a digital printable edition or correspond with our studio, we collect only the essential information required to deliver your high-resolution PDF archives: your name, email address, billing country, and order history. We never store raw payment card numbers on our servers.'
                : 'Atunci când achiziționați un produs digital imprimabil sau ne scrieți, colectăm exclusiv datele necesare pentru livrarea arhivelor PDF: numele, adresa de e-mail, țara de facturare și istoricul comenzii. Nu stocăm niciodată datele cardului bancar.'}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-2xl text-[#30272D]">
              {lang === 'en' ? '03. How Your Digital Archive Links Are Protected' : '03. Protecția Linkurilor de Descărcare'}
            </h2>
            <p>
              {lang === 'en'
                ? 'Your email address is used solely to transmit your instant download links and order confirmations. We never sell, rent, or trade customer lists with third-party advertisers.'
                : 'Adresa dumneavoastră de e-mail este utilizată exclusiv pentru transmiterea fișierelor achiziționate și a confirmării comenzii. Nu vindem și nu înstrăinăm niciodată datele clienților către terți.'}
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="font-editorial text-2xl text-[#30272D]">
              {lang === 'en' ? '04. Your Rights Under EU Law' : '04. Drepturile Dumneavoastră Conform GDPR'}
            </h2>
            <p>
              {lang === 'en'
                ? 'You have the right to request access to, rectification of, or erasure of your personal data at any time by writing directly to cristina@zaleacreativ.com.'
                : 'Aveți dreptul de acces, rectificare sau ștergere a datelor personale în orice moment, printr-un mesaj direct la adresa cristina@zaleacreativ.com.'}
            </p>
          </section>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 py-10 sm:py-20">
      <p className="text-xs uppercase tracking-widest text-[#A67589] mb-2">
        zaleacreativ.com · {lang === 'en' ? 'Digital Publishing License Terms' : 'Termeni și Condiții de Utilizare'}
      </p>
      <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#30272D]">
        {lang === 'en' ? 'Terms & Conditions' : 'Termeni și Condiții'}
      </h1>

      <div className="mt-8 space-y-8 text-sm sm:text-base leading-relaxed text-[#30272D]/85">
        <section className="space-y-2">
          <h2 className="font-editorial text-2xl text-[#30272D]">
            {lang === 'en' ? '01. Nature of Digital Products' : '01. Natura Produselor Digitale Imprimabile'}
          </h2>
          <p>
            {lang === 'en'
              ? 'All items offered on zaleacreativ.com are high-resolution digital printable publications (300 DPI PDF archives). No physical books or printed paper goods are shipped by post. Upon checkout, instant download access is granted immediately.'
              : 'Toate produsele oferite pe zaleacreativ.com sunt publicații digitale imprimabile de înaltă rezoluție (fișiere PDF la 300 DPI). Nu se expediază produse fizice prin curier. Accesul la descărcare este oferit instantaneu după finalizarea comenzii.'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-editorial text-2xl text-[#30272D]">
            {lang === 'en' ? '02. Intellectual Property & Print Licenses' : '02. Drepturi de Autor & Licențe de Tipărire'}
          </h2>
          <p>
            {lang === 'en'
              ? 'All illustrations, botanical line art, page layouts, and bilingual texts are original works created by Cristina and remain the exclusive copyright of ZALEA CREATIV. Purchasing a Personal License grants you unlimited printing rights for your own household. Purchasing an Educator License grants printing rights for a single teacher’s classroom (up to 30 students).'
              : 'Toate ilustrațiile botanice, machetele grafice și textele bilingve sunt creații originale realizate de Cristina și rămân proprietatea intelectuală exclusivă a ZALEA CREATIV. Licența Personală permite tipărirea nelimitată în cadrul propriei familii. Licența pentru Educatori permite tipărirea pentru o singură grupă sau clasă (până la 30 de elevi).'}
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-editorial text-2xl text-[#30272D]">
            {lang === 'en' ? '03. EU Digital Content Right of Withdrawal' : '03. Politica de Retur pentru Conținut Digital'}
          </h2>
          <p>
            {lang === 'en'
              ? 'In accordance with EU Consumer Rights Directive 2011/83/EU for instant digital downloads, once a digital archive has been downloaded, orders are non-refundable. However, if you experience any technical difficulty, Cristina will personally assist you.'
              : 'În conformitate cu legislația europeană privind produsele digitale descărcabile instantaneu, odată ce arhiva PDF a fost descărcată, comanda nu poate fi returnată. Cu toate acestea, dacă întâmpinați orice dificultate tehnică, Cristina vă va oferi asistență.'}
          </p>
        </section>
      </div>
    </div>
  );
};
