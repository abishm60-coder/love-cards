import React from 'react';
import { X, Sliders, Calendar, MapPin, Music } from 'lucide-react';
import { WeddingConfig } from '../types';
import { MUSIC_TRACKS } from '../data';

interface LiveConfiguratorProps {
  config: WeddingConfig;
  isOpen: boolean;
  onClose: () => void;
  onUpdateConfig: (updated: Partial<WeddingConfig>) => void;
}

export const LiveConfigurator: React.FC<LiveConfiguratorProps> = ({
  config,
  isOpen,
  onClose,
  onUpdateConfig,
}) => {
  return (
    <>
      {/* Drawer Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}

      {/* Drawer Panel */}
      <div 
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md shadow-2xl transition-transform duration-300 transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } bg-[#fcfbf7] border-l border-stone-200 font-sans text-stone-800 scrollbar-editorial overflow-y-auto`}
      >
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2 text-stone-750">
              <Sliders className="w-5 h-5" />
              <h2 className="text-sm font-bold uppercase tracking-wider font-sans">Configurator</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-1 rounded hover:bg-stone-100 transition-colors"
              aria-label="Close configuration panel"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-6 space-y-6">
            {/* Names Input */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-stone-400 font-semibold border-b border-stone-100 pb-1">The Couple Names</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-stone-400">Bride Name</label>
                  <input
                    type="text"
                    value={config.brideName}
                    onChange={(e) => onUpdateConfig({ brideName: e.target.value })}
                    className="w-full bg-white border border-stone-200 p-2 text-xs rounded outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-stone-400">Groom Name</label>
                  <input
                    type="text"
                    value={config.groomName}
                    onChange={(e) => onUpdateConfig({ groomName: e.target.value })}
                    className="w-full bg-white border border-stone-200 p-2 text-xs rounded outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Date and Time */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-stone-400 font-semibold border-b border-stone-100 pb-1">
                <Calendar className="inline-block w-3.5 h-3.5 mr-1" /> Schedule details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-stone-400">Wedding Date</label>
                  <input
                    type="date"
                    value={config.weddingDate}
                    onChange={(e) => onUpdateConfig({ weddingDate: e.target.value })}
                    className="w-full bg-white border border-stone-200 p-2 text-xs rounded outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-stone-400">Start Time</label>
                  <input
                    type="time"
                    value={config.weddingTime}
                    onChange={(e) => onUpdateConfig({ weddingTime: e.target.value })}
                    className="w-full bg-white border border-stone-200 p-2 text-xs rounded outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Venues */}
            <div className="space-y-4">
              <h3 className="text-xs uppercase tracking-widest text-stone-400 font-semibold border-b border-stone-100 pb-1">
                <MapPin className="inline-block w-3.5 h-3.5 mr-1" /> Venues & Locations
              </h3>
              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-stone-400">Ceremony Hall Name</label>
                  <input
                    type="text"
                    value={config.ceremonyVenue}
                    onChange={(e) => onUpdateConfig({ ceremonyVenue: e.target.value })}
                    className="w-full bg-white border border-stone-200 p-2 text-xs rounded outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-stone-400">Ceremony Address</label>
                  <input
                    type="text"
                    value={config.ceremonyAddress}
                    onChange={(e) => onUpdateConfig({ ceremonyAddress: e.target.value })}
                    className="w-full bg-white border border-stone-200 p-2 text-xs rounded outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-stone-400">Reception Hall Name</label>
                  <input
                    type="text"
                    value={config.receptionVenue}
                    onChange={(e) => onUpdateConfig({ receptionVenue: e.target.value })}
                    className="w-full bg-white border border-stone-200 p-2 text-xs rounded outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase font-semibold text-stone-400">Reception Address</label>
                  <input
                    type="text"
                    value={config.receptionAddress}
                    onChange={(e) => onUpdateConfig({ receptionAddress: e.target.value })}
                    className="w-full bg-white border border-stone-200 p-2 text-xs rounded outline-none focus:border-stone-400 transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Music Tracks selection */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-stone-450">
                <Music className="w-4 h-4" /> Synthesizer Sound
              </label>
              <div className="space-y-2">
                {MUSIC_TRACKS.map((track, idx) => (
                  <button
                    key={track.title}
                    onClick={() => onUpdateConfig({ selectedTrackIndex: idx })}
                    className={`w-full text-left p-3 border rounded text-xs transition-all ${
                      config.selectedTrackIndex === idx
                        ? 'border-stone-800 bg-stone-900 text-white font-bold'
                        : 'border-stone-200 bg-white text-stone-500 hover:border-stone-300'
                    }`}
                  >
                    <div className="font-sans font-bold uppercase tracking-wider">{track.title}</div>
                    <div className="opacity-80 mt-1">{track.description}</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

