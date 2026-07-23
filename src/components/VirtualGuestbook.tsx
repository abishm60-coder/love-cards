import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GuestbookEntry, ThemeType } from '../types';

interface VirtualGuestbookProps {
  entries: GuestbookEntry[];
  selectedTheme: ThemeType;
  onAddEntry: (name: string, message: string) => void;
  onRemoveEntry?: (id: string) => void;
  onLikeEntry: (id: string) => void;
}

export const VirtualGuestbook: React.FC<VirtualGuestbookProps> = ({
  entries,
  selectedTheme,
  onAddEntry,
  onRemoveEntry,
  onLikeEntry,
}) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const triggerConfetti = (x: number, y: number) => {
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { x: x / window.innerWidth, y: y / window.innerHeight },
      colors: ['#8c7a6b', '#c4b5fd', '#d4af37']
    });
  };

  const handleLike = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    onLikeEntry(id);
    triggerConfetti(e.clientX, e.clientY);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    onAddEntry(name, message);
    setName('');
    setMessage('');
  };

  return (
    <div className="w-full max-w-xl mx-auto font-sans text-center">
      {/* Header Icon & Title */}
      <div className="flex flex-col items-center justify-center space-y-2 mb-4">
        <Heart className="w-6 h-6 text-[#8c7a6b]" />
        <h3 className="font-serif text-2xl md:text-3xl text-stone-800 tracking-wide">
          Virtual Guestbook
        </h3>
        <p className="text-stone-400 text-xs tracking-wide max-w-xs mx-auto">
          Share your blessing, congratulations, or a beautiful memory with the newlyweds.
        </p>
      </div>

      {/* Form with side by side inputs */}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-transparent border-b border-stone-200 py-2.5 px-1 text-sm text-stone-800 focus:outline-none focus:border-stone-400 placeholder:text-stone-400 transition-colors"
            required
          />
          <input
            type="text"
            placeholder="Write your congratulations..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-[2] bg-transparent border-b border-stone-200 py-2.5 px-1 text-sm text-stone-800 focus:outline-none focus:border-stone-400 placeholder:text-stone-400 transition-colors"
            required
          />
        </div>

        {/* Publish Note Button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="bg-[#f2f0eb] hover:bg-[#e6e3dd] text-stone-500 font-sans font-semibold px-6 py-2.5 text-xs tracking-wider uppercase transition-colors"
          >
            PUBLISH NOTE
          </button>
        </div>
      </form>

      {/* Guestbook List */}
      <div className="mt-10 text-left space-y-8 max-h-[400px] overflow-y-auto pr-2 scrollbar-editorial">
        <AnimatePresence initial={false}>
          {entries.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border-b border-stone-100 pb-6"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-serif text-sm font-bold text-stone-800">{entry.name}</h4>
                  <span className="text-[10px] text-stone-400 tracking-wider">
                    {new Date(entry.timestamp).toLocaleDateString(undefined, {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {onRemoveEntry && (
                    <button
                      onClick={() => onRemoveEntry(entry.id)}
                      className="p-1.5 text-stone-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                      title="Delete wish note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={(e) => handleLike(e, entry.id)}
                    className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded ${
                      entry.likedByCurrentUser 
                        ? 'bg-red-50 text-red-500 border border-red-100' 
                        : 'bg-stone-50 text-stone-500 hover:bg-stone-100 border border-stone-100'
                    } transition-colors`}
                  >
                    <Heart className={`w-3.5 h-3.5 ${entry.likedByCurrentUser ? 'fill-current' : ''}`} />
                    <span>{entry.likes}</span>
                  </button>
                </div>
              </div>
              <p className="mt-3 text-stone-600 text-xs italic font-serif leading-relaxed">
                "{entry.message}"
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

