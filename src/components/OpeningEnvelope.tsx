import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Settings, Music } from 'lucide-react';
import { ThemeType } from '../types';

interface OpeningEnvelopeProps {
  brideName: string;
  groomName: string;
  selectedTheme: ThemeType;
  onOpen: () => void;
  onOpenConfig?: () => void;
}

export const OpeningEnvelope: React.FC<OpeningEnvelopeProps> = ({
  brideName,
  groomName,
  selectedTheme,
  onOpen,
  onOpenConfig,
}) => {
  // Standardized style settings
  const styles = {
    bg: 'bg-[#faf8f5] border border-stone-200 shadow-[0_4px_24px_rgba(0,0,0,0.03)]',
    textColor: 'text-stone-800 font-sans',
    btn: 'bg-stone-900 text-white hover:bg-stone-800 font-sans tracking-widest uppercase text-xs transition-all',
    seal: 'bg-stone-700 text-white shadow-sm hover:bg-stone-850',
    titleFont: 'font-serif tracking-wide text-2xl md:text-3xl italic',
    bodyFont: 'font-serif text-sm tracking-wide text-stone-600',
    glare: 'absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent pointer-events-none',
  };

  // Helper names fallback to match mockup if defaults aren't updated yet
  const displayBride = brideName === 'Evelyn' ? 'Evelyn Sterling' : brideName;
  const displayGroom = groomName === 'Alexander' ? 'Alexander Wright' : groomName;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#faf8f5] overflow-hidden">
      {/* Top Left: Customize Card button */}
      <button
        onClick={onOpenConfig}
        className="absolute top-6 left-6 z-50 flex items-center gap-2 bg-black text-white hover:bg-stone-850 px-4 py-2.5 rounded-full text-xs font-semibold shadow-md active:scale-95 transition-all"
      >
        <Settings className="w-4 h-4" />
        <span>Customize Card</span>
      </button>

      {/* Main invitation Card Container */}
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0, y: -150 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[500px] aspect-[4/5] sm:aspect-square relative flex items-center justify-center p-4 sm:p-8 border border-stone-200 bg-white shadow-[0_12px_40px_rgba(0,0,0,0.06)] rounded-sm"
      >
        <div className="w-full h-full border border-stone-100/80 flex flex-col justify-between p-5 sm:p-8 relative">
          
          {/* Card Top Header */}
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-center mt-4 sm:mt-6"
          >
            <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-[0.25em] text-stone-400 font-sans block">
              {selectedTheme === 'crt' ? 'SYSTEM // THE CELEBRATION OF LOVE' : 'THE CELEBRATION OF LOVE'}
            </span>
            <div className="w-6 h-[1px] bg-stone-200 mx-auto mt-2" />
          </motion.div>
 
          {/* Card Mid: Happy Couple Names */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-center my-3 sm:my-4 space-y-1.5 sm:space-y-2"
          >
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-800 leading-snug tracking-wide">
              {displayGroom}
            </h1>
            <div className="text-stone-400/80 font-serif italic text-base sm:text-lg my-0.5 sm:my-1">&</div>
            <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl text-stone-800 leading-snug tracking-wide">
              {displayBride}
            </h1>
          </motion.div>
 
          {/* Card Description */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center max-w-xs sm:max-w-sm mx-auto"
          >
            <p className="font-serif text-stone-500 text-[11px] sm:text-xs md:text-sm leading-relaxed tracking-wide">
              We warmly welcome you to witness our vows.<br />
              Select the seal below to open your digital wedding card.
            </p>
          </motion.div>
 
          {/* Card Bottom: Interactive Wax Seal Button */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-col items-center justify-center mb-4 sm:mb-6"
          >
            <div className="relative">
              {/* Outer pulsing ring for aesthetic enhancement */}
              <motion.div 
                className="absolute inset-0 rounded-full bg-[#8c7a6b]/20"
                animate={{ scale: [1, 1.4, 1], opacity: [0.8, 0, 0.8] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                onClick={onOpen}
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#8c7a6b] hover:bg-[#7a6a5d] text-white flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg transition-colors relative z-10"
                aria-label="View Card"
              >
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white/95" />
              </motion.button>
            </div>
            <span className="mt-3 text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-stone-400 font-sans font-semibold">
              VIEW CARD
            </span>
          </motion.div>
 
        </div>
      </motion.div>

      {/* Bottom Right: Play Music Button (Mock/Interactive overlay indicator) */}
      <button
        onClick={onOpen}
        className="absolute bottom-6 right-6 z-50 flex items-center gap-2 bg-[#8c7a6b] text-white hover:bg-[#7a6a5d] px-4 py-2.5 rounded-full text-xs font-semibold shadow-md active:scale-95 transition-all"
      >
        <Music className="w-4 h-4" />
        <span>Play Music</span>
      </button>
    </div>
  );
};

