import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Heart, Music, Calendar, Clock, MapPin, Sparkles, Phone, Mail } from 'lucide-react';

import { OpeningEnvelope } from './components/OpeningEnvelope';
import { CountdownTimer } from './components/CountdownTimer';
import { MusicPlayer } from './components/MusicPlayer';
import { LiveConfigurator } from './components/LiveConfigurator';
import { VirtualGuestbook } from './components/VirtualGuestbook';

import { DEFAULT_CONFIG, INITIAL_GUESTBOOK } from './data';
import { WeddingConfig, GuestbookEntry } from './types';

import brideImg from './assets/bride.png';
import groomImg from './assets/groom.png';
import gallery1 from './assets/gallery1.png';
import gallery2 from './assets/gallery2.png';
import gallery3 from './assets/gallery3.png';
import archImg from './assets/arch.png';

function App() {
  const [config, setConfig] = useState<WeddingConfig>(DEFAULT_CONFIG);
  const [isOpenEnvelope, setIsOpenEnvelope] = useState(true);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [guestbookEntries, setGuestbookEntries] = useState<GuestbookEntry[]>(INITIAL_GUESTBOOK);

  // Generate gentle ambient floating particles for Royal Luxury theme
  const [particles, setParticles] = useState<{ id: number; left: string; size: string; delay: string; duration: string }[]>([]);

  useEffect(() => {
    if (config.selectedTheme === 'royal') {
      const generated = Array.from({ length: 25 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: `${Math.random() * 6 + 2}px`,
        delay: `${Math.random() * 5}s`,
        duration: `${Math.random() * 10 + 8}s`,
      }));
      setParticles(generated);
    } else {
      setParticles([]);
    }
  }, [config.selectedTheme]);

  const handleUpdateConfig = (updated: Partial<WeddingConfig>) => {
    setConfig(prev => ({ ...prev, ...updated }));
  };

  const handleAddGuestbookEntry = (name: string, message: string) => {
    const newEntry: GuestbookEntry = {
      id: String(Date.now()),
      name,
      message,
      likes: 0,
      timestamp: new Date().toISOString(),
    };
    setGuestbookEntries(prev => [newEntry, ...prev]);
  };

  const handleLikeGuestbookEntry = (id: string) => {
    setGuestbookEntries(prev =>
      prev.map(entry => {
        if (entry.id === id) {
          const alreadyLiked = entry.likedByCurrentUser;
          return {
            ...entry,
            likes: alreadyLiked ? entry.likes - 1 : entry.likes + 1,
            likedByCurrentUser: !alreadyLiked
          };
        }
        return entry;
      })
    );
  };

  // Get theme-reactive classNames
  const getThemeClasses = () => {
    return {
      bodyBg: 'bg-[#faf8f5] min-h-screen text-stone-800 font-sans overflow-x-hidden selection:bg-stone-200 antialiased',
      container: 'max-w-6xl mx-auto px-6 py-12 md:py-24 space-y-16 md:space-y-32 z-10 relative',
      heroTitle: 'text-6xl md:text-8xl font-light text-left tracking-tight text-stone-900 font-serif leading-none',
      heroSubtitle: 'text-xs md:text-sm tracking-[0.3em] text-left text-stone-400 font-sans uppercase font-medium mt-4',
      card: 'bg-[#faf8f5] p-4 md:p-10 relative',
      cardHeader: 'text-stone-455 font-sans text-[10px] tracking-[0.25em] uppercase font-semibold border-b border-stone-100 pb-2 mb-6',
      titleFont: 'font-serif italic text-2xl md:text-3xl text-stone-900',
      descFont: 'font-serif text-stone-600 text-sm md:text-base leading-relaxed',
      accentBorder: 'border-l-2 border-stone-850',
      btnFloat: 'bg-stone-900 text-white hover:bg-stone-800 shadow-md',
    };
  };

  const classes = getThemeClasses();

  return (
    <div className={classes.bodyBg}>
      {/* Dynamic Background Effects */}
      {config.selectedTheme === 'royal' && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          {particles.map(p => (
            <span
              key={p.id}
              className="absolute bg-gradient-to-t from-[#d4af37] to-[#f3e5ab]/30 rounded-full"
              style={{
                left: p.left,
                width: p.size,
                height: p.size,
                bottom: '-20px',
                animation: `float ${p.duration} linear infinite`,
                animationDelay: p.delay,
              }}
            />
          ))}
        </div>
      )}

      {config.selectedTheme === 'crt' && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          {/* Neon green grid scanner block */}
          <div className="w-full h-1 bg-green-500/10 absolute top-0 left-0 animate-scanline" />
        </div>
      )}

      {/* Opening Envelope Overlay */}
      <AnimatePresence>
        {isOpenEnvelope && (
          <OpeningEnvelope
            brideName={config.brideName}
            groomName={config.groomName}
            selectedTheme={config.selectedTheme}
            onOpen={() => setIsOpenEnvelope(false)}
            onOpenConfig={() => setIsConfigOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Main Layout Container */}
      {!isOpenEnvelope && (
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={classes.container}
        >
          {/* Hero Section: Left Text Names & Right Arch Image */}
          <header className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center py-6">
            <div className="md:col-span-7 space-y-8">
              <div className="space-y-2 flex flex-col items-center justify-center text-center">
                <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-[#8c7a6b] font-sans font-semibold block text-center">
                  THE WEDDING INVITATION
                </span>
                <div className="w-8 h-[2px] bg-stone-300" />
              </div>

              <div className="space-y-4">
                <span className="text-xs tracking-[0.2em] text-stone-400 font-sans uppercase font-medium">
                  Together with their families
                </span>
                <h1 className="font-serif text-5xl md:text-7xl text-stone-850 leading-tight">
                  Alexander
                </h1>
                <div className="text-stone-400 font-serif italic text-2xl my-2">&</div>
                <h1 className="font-serif text-5xl md:text-7xl text-stone-850 leading-tight">
                  Evelyn
                </h1>
              </div>

              <div className="w-full h-px bg-stone-200" />

              <p className="font-serif italic text-stone-500 text-sm md:text-base leading-relaxed">
                invite you to share in their joy as they exchange wedding vows and celebrate their union.
              </p>
            </div>

            <div className="md:col-span-5 flex justify-center">
              <div className="w-full max-w-[340px] aspect-[2/3] rounded-t-full border border-stone-250/70 p-2 overflow-hidden bg-white shadow-sm flex items-center justify-center">
                <img 
                  src={archImg} 
                  alt="Floral Wedding Arch Decor" 
                  className="w-full h-full object-cover rounded-t-full"
                />
              </div>
            </div>
          </header>

          {/* Countdown Clock Section */}
          <section className="space-y-12">
            <CountdownTimer
              targetDateStr={config.weddingDate}
              targetTimeStr={config.weddingTime}
              selectedTheme={config.selectedTheme}
            />

            {/* Ceremony and Reception detail blocks side-by-side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto pt-6 border-t border-stone-200/50">
              {/* Ceremony Card block */}
              <div className="space-y-4 pl-4 border-l border-stone-300">
                <div className="flex items-center gap-2 text-stone-600">
                  <Calendar className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">The Wedding Ceremony</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-stone-850">Friday, September 18, 2026</h4>
                  <p className="text-xs text-stone-400 font-sans tracking-wide">16:00</p>
                </div>
                <div className="space-y-1 text-xs text-stone-500 font-serif">
                  <p className="font-bold text-stone-700">The Grand Conservatory</p>
                  <p>42 Orchid Boulevard, Botanical Gardens</p>
                </div>
              </div>

              {/* Dinner Reception Card block */}
              <div className="space-y-4 pl-4 border-l border-stone-300">
                <div className="flex items-center gap-2 text-stone-600">
                  <MapPin className="w-5 h-5" />
                  <span className="text-xs uppercase tracking-wider font-semibold">The Dinner Reception</span>
                </div>
                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-stone-850">Friday, September 18, 2026</h4>
                  <p className="text-xs text-stone-400 font-sans tracking-wide">18:30</p>
                </div>
                <div className="space-y-1 text-xs text-stone-500 font-serif">
                  <p className="font-bold text-stone-700">The Glass Pavilion Ballroom</p>
                  <p>42 Orchid Boulevard, Botanical Gardens</p>
                </div>
              </div>
            </div>
          </section>

          {/* Bride & Groom Showcase Section */}
          <section className="space-y-12 py-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-stone-400 font-sans block">
                INTRODUCING THE COUPLE
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-850">
                The Bride & Groom
              </h2>
              <div className="w-12 h-px bg-stone-300 mx-auto my-2" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 max-w-4xl mx-auto">
              {/* Groom Card */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-full max-w-[280px] aspect-[3/4] border border-stone-200 bg-white p-2 shadow-sm">
                  <img 
                    src={groomImg} 
                    alt="Alexander Wright - The Groom" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl text-stone-850">Alexander Wright</h3>
                  <span className="text-[9px] uppercase tracking-widest text-[#8c7a6b] font-sans font-semibold">THE GROOM</span>
                </div>
                <p className="font-serif text-stone-500 text-xs leading-relaxed max-w-xs">
                  Alexander, with his gentle spirit and supportive nature, stands ready to build a lifetime of beautiful memories side-by-side.
                </p>
              </div>

              {/* Bride Card */}
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-full max-w-[280px] aspect-[3/4] border border-stone-200 bg-white p-2 shadow-sm">
                  <img 
                    src={brideImg} 
                    alt="Evelyn Sterling - The Bride" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-xl text-stone-850">Evelyn Sterling</h3>
                  <span className="text-[9px] uppercase tracking-widest text-[#8c7a6b] font-sans font-semibold">THE BRIDE</span>
                </div>
                <p className="font-serif text-stone-500 text-xs leading-relaxed max-w-xs">
                  Evelyn, with her radiant warmth and artistic vision, looks forward to stepping into this magical new chapter hand-in-hand.
                </p>
              </div>
            </div>
          </section>

          {/* Narrative / Our Serendipitous Beginning Section */}
          <section className="text-center space-y-4 max-w-xl mx-auto py-8">
            <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-stone-400 font-sans block">
              OUR NARRATIVE
            </span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-800">
              Our Serendipitous Beginning
            </h2>
            <div className="w-12 h-px bg-stone-300 mx-auto my-2" />
            <p className="font-serif text-stone-600 text-sm md:text-base leading-relaxed italic max-w-lg mx-auto">
              "We met on a rainy Tuesday afternoon at a quaint bookstore in Paris. Both reaching for the last copy of a classic travel novel, our eyes met, and we spent the next four hours talking over warm cups of espresso. That single, beautiful moment turned into years of shared adventures, quiet mornings, and a deep, everlasting love. Now, we are ready to begin our greatest chapter yet."
            </p>
          </section>

          {/* Celebration Timeline Section */}
          <section className="space-y-8 max-w-xl mx-auto py-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-stone-400 font-sans block">
                PROGRAM OF EVENTS
              </span>
              <h2 className="font-serif text-3xl md:text-4xl text-stone-800">
                Celebration Timeline
              </h2>
              <div className="w-12 h-px bg-stone-300 mx-auto my-2" />
            </div>

            {/* Vertically Aligned Timeline */}
            <div className="relative border-l border-stone-200 ml-4 md:ml-auto md:mr-auto max-w-md py-6 space-y-12">
              {/* Event 1 */}
              <div className="relative pl-8">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#8c7a6b] ring-4 ring-[#faf8f5]" />
                <span className="text-xs font-semibold text-stone-400 tracking-wider">4:00 PM</span>
                <h4 className="font-serif text-base font-bold text-stone-850 mt-1">The Wedding Ceremony</h4>
                <p className="font-serif text-xs text-stone-500 leading-relaxed mt-1">
                  Witness our exchange of vows amidst the blooming orchids of the Grand Conservatory.
                </p>
              </div>

              {/* Event 2 */}
              <div className="relative pl-8">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#8c7a6b] ring-4 ring-[#faf8f5]" />
                <span className="text-xs font-semibold text-stone-400 tracking-wider">5:00 PM</span>
                <h4 className="font-serif text-base font-bold text-stone-850 mt-1">Cocktails & Garden Mingling</h4>
                <p className="font-serif text-xs text-stone-500 leading-relaxed mt-1">
                  Enjoy handcrafted botanical refreshments and harp melodies in the rose garden.
                </p>
              </div>

              {/* Event 3 */}
              <div className="relative pl-8">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-[#8c7a6b] ring-4 ring-[#faf8f5]" />
                <span className="text-xs font-semibold text-stone-400 tracking-wider">6:30 PM</span>
                <h4 className="font-serif text-base font-bold text-stone-850 mt-1">The Grand Reception & Dinner</h4>
                <p className="font-serif text-xs text-stone-500 leading-relaxed mt-1">
                  A candlelit four-course banquet inside the dazzling Glass Pavilion Ballroom.
                </p>
              </div>
            </div>
          </section>

          {/* Gallery / Captured Memories Section */}
          <section className="space-y-8 max-w-3xl mx-auto py-8">
            <div className="text-center space-y-2">
              <span className="text-[10px] md:text-xs uppercase tracking-[0.25em] text-stone-400 font-sans block">
                CAPTURED MEMORIES
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Photo 1 */}
              <div className="bg-white p-4 border border-stone-100 shadow-sm flex flex-col items-center">
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img src={gallery1} alt="Walk" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-serif italic text-stone-450 mt-3 text-center block">
                  Our first travel adventure together
                </span>
              </div>

              {/* Photo 2 */}
              <div className="bg-white p-4 border border-stone-100 shadow-sm flex flex-col items-center">
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img src={gallery2} alt="Paris kiss" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-serif italic text-stone-450 mt-3 text-center block">
                  The magical moment in Paris
                </span>
              </div>

              {/* Photo 3 */}
              <div className="bg-white p-4 border border-stone-100 shadow-sm flex flex-col items-center">
                <div className="aspect-[4/3] w-full overflow-hidden bg-stone-100">
                  <img src={gallery3} alt="Garden hold" className="w-full h-full object-cover" />
                </div>
                <span className="text-[10px] font-serif italic text-stone-450 mt-3 text-center block">
                  Quiet mornings in our home garden
                </span>
              </div>
            </div>
          </section>

          {/* Virtual Guestbook board */}
          <section className="border border-stone-100 bg-white p-6 md:p-12 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <VirtualGuestbook
              entries={guestbookEntries}
              selectedTheme={config.selectedTheme}
              onAddEntry={handleAddGuestbookEntry}
              onLikeEntry={handleLikeGuestbookEntry}
            />
          </section>

          {/* Final Callout Footer */}
          <section className="text-center space-y-4 max-w-md mx-auto py-8">
            <div className="flex justify-center text-[#8c7a6b]">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-2xl text-stone-800">
              Alexander & Evelyn
            </h3>
            <p className="font-serif text-stone-500 text-xs md:text-sm leading-relaxed">
              We can't wait to celebrate this monumental day with our favorite people!<br />
              Thank you for being a part of our beautiful journey.
            </p>
            
            {/* Contact details */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-2 text-stone-500 text-xs font-sans">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5" />
                <span>+1 (555) 019-2834</span>
              </span>
              <span className="hidden sm:inline text-stone-300">|</span>
              <span className="flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5" />
                <span>celebration@alexander-evelyn.com</span>
              </span>
            </div>
          </section>

          {/* Footer details */}
          <footer className="text-center pb-12 opacity-65 text-[10px] uppercase tracking-[0.2em] font-sans text-stone-400">
            WEDDING STATIONERY CARD &bull; EDITORIAL COLLECTION &bull; {new Date().getFullYear()}
          </footer>

          {/* Floating Configurator Toggle Button */}
          <button
            onClick={() => setIsConfigOpen(true)}
            className={`fixed bottom-6 right-6 z-30 p-3 rounded-full flex items-center justify-center transition-transform hover:scale-110 active:scale-95 ${classes.btnFloat}`}
            aria-label="Open wedding parameters panel"
          >
            <Settings className="w-6 h-6 animate-spin-slow" />
          </button>

          {/* Side Drawer Configurator Component */}
          <LiveConfigurator
            config={config}
            isOpen={isConfigOpen}
            onClose={() => setIsConfigOpen(false)}
            onUpdateConfig={handleUpdateConfig}
          />
        </motion.div>
      )}
    </div>
  );
}

export default App;
;
