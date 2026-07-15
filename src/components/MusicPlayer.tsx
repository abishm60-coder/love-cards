import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause, SkipForward } from 'lucide-react';
import { MusicTrack, ThemeType } from '../types';
import { MUSIC_TRACKS } from '../data';

interface MusicPlayerProps {
  selectedTrackIndex: number;
  selectedTheme: ThemeType;
  onTrackChange: (index: number) => void;
}

export const MusicPlayer: React.FC<MusicPlayerProps> = ({
  selectedTrackIndex,
  selectedTheme,
  onTrackChange,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const [synthLabel, setSynthLabel] = useState('Standby');

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const schedulerTimerRef = useRef<number | null>(null);
  
  const currentTrack = MUSIC_TRACKS[selectedTrackIndex];

  // Synth pattern parameters
  const currentBeat = useRef(0);
  const tempo = 120; // BPM
  const secondsPerBeat = 60 / tempo;

  // Initialize Web Audio API context
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass();
      const gain = ctx.createGain();
      gain.gain.value = volume;
      gain.connect(ctx.destination);
      
      audioCtxRef.current = ctx;
      gainNodeRef.current = gain;
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
  };

  // Adjust volume
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  // Synthesize note frequencies
  const playSynthNote = (freq: number, time: number, duration: number, type: 'sine' | 'square' | 'triangle' | 'sawtooth' = 'sine') => {
    if (!audioCtxRef.current || !gainNodeRef.current) return;
    const osc = audioCtxRef.current.createOscillator();
    const gain = audioCtxRef.current.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(0, time);
    // Attack
    gain.gain.linearRampToValueAtTime(type === 'square' ? 0.08 : 0.2, time + 0.02);
    // Decay/Release
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(gain);
    gain.connect(gainNodeRef.current);

    osc.start(time);
    osc.stop(time + duration);
  };

  // Sound loops scheduler
  const scheduleNextBeat = (time: number) => {
    const beat = currentBeat.current;
    
    if (selectedTrackIndex === 0) {
      // Royal Waltz: 3/4 time signature
      // Melodic royal waltz chord progressions (C major - G major - F major - G major)
      const waltzChords = [
        [261.63, 329.63, 392.00], // C major (C4, E4, G4)
        [261.63, 329.63, 392.00], 
        [261.63, 329.63, 392.00],
        [196.00, 246.94, 293.66], // G major (G3, B3, D4)
        [196.00, 246.94, 293.66],
        [196.00, 246.94, 293.66],
        [349.23, 440.00, 523.25], // F major (F4, A4, C5)
        [349.23, 440.00, 523.25],
        [349.23, 440.00, 523.25],
        [196.00, 246.94, 293.66], // G major
        [196.00, 246.94, 293.66],
        [196.00, 246.94, 293.66],
      ];
      const melodies = [
        523.25, 587.33, 659.25, 783.99, 659.25, 587.33,
        493.88, 523.25, 587.33, 698.46, 587.33, 523.25
      ];
      const chordIndex = beat % waltzChords.length;
      const beatInMeasure = beat % 3;

      if (beatInMeasure === 0) {
        // Base note on downbeat
        playSynthNote(waltzChords[chordIndex][0] / 2, time, secondsPerBeat * 0.8, 'sine');
      } else {
        // Light chord strums
        waltzChords[chordIndex].forEach(freq => {
          playSynthNote(freq, time, secondsPerBeat * 0.5, 'triangle');
        });
      }

      // Continuous melody
      if (beat % 2 === 0) {
        const melodyNote = melodies[Math.floor(beat / 2) % melodies.length];
        playSynthNote(melodyNote, time, secondsPerBeat * 1.5, 'sine');
      }

    } else if (selectedTrackIndex === 1) {
      // Chiptune Dream: retro fast beats
      const retroMelody = [
        261.63, 293.66, 329.63, 349.23, 392.00, 349.23, 329.63, 293.66,
        329.63, 349.23, 392.00, 440.00, 493.88, 440.00, 392.00, 349.23
      ];
      const note = retroMelody[beat % retroMelody.length];
      
      // Fast arpeggiated retro run
      playSynthNote(note, time, secondsPerBeat * 0.25, 'square');
      
      // Retro bassline
      if (beat % 2 === 0) {
        playSynthNote(note / 4, time, secondsPerBeat * 0.4, 'triangle');
      }
      
      // Virtual noise-like drum snare
      if (beat % 4 === 2) {
        playSynthNote(150, time, 0.05, 'sawtooth');
      }
    } else {
      // Serenade of Autumn: Minimalist slow piano
      const pianoMelody = [
        329.63, 0, 392.00, 0, 440.00, 0, 523.25, 0,
        392.00, 0, 349.23, 0, 329.63, 0, 293.66, 0
      ];
      const note = pianoMelody[beat % pianoMelody.length];
      
      if (note > 0) {
        playSynthNote(note, time, secondsPerBeat * 2.5, 'sine');
        // Gentle harmony
        playSynthNote(note * 1.25, time + 0.1, secondsPerBeat * 2.0, 'sine');
      }
      
      if (beat % 4 === 0) {
        // Deep warm baseline
        playSynthNote(110.00, time, secondsPerBeat * 3.5, 'sine');
      }
    }

    currentBeat.current++;
  };

  const startPlaybackLoop = () => {
    if (!audioCtxRef.current) return;
    let nextNoteTime = audioCtxRef.current.currentTime;
    
    const scheduler = () => {
      while (nextNoteTime < audioCtxRef.current!.currentTime + 0.1) {
        scheduleNextBeat(nextNoteTime);
        nextNoteTime += secondsPerBeat;
      }
      schedulerTimerRef.current = window.setTimeout(scheduler, 50.0);
    };
    
    scheduler();
  };

  const togglePlay = () => {
    initAudio();
    if (isPlaying) {
      if (schedulerTimerRef.current) {
        clearTimeout(schedulerTimerRef.current);
      }
      setIsPlaying(false);
      setSynthLabel('Paused');
    } else {
      currentBeat.current = 0;
      setIsPlaying(true);
      startPlaybackLoop();
      setSynthLabel('Playing Web-Synth');
    }
  };

  const handleNextTrack = () => {
    const nextIndex = (selectedTrackIndex + 1) % MUSIC_TRACKS.length;
    onTrackChange(nextIndex);
    if (isPlaying) {
      // Reboot playback with new instrument styles
      if (schedulerTimerRef.current) {
        clearTimeout(schedulerTimerRef.current);
      }
      currentBeat.current = 0;
      startPlaybackLoop();
    }
  };

  // Clean up synth loops on unmount
  useEffect(() => {
    return () => {
      if (schedulerTimerRef.current) {
        clearTimeout(schedulerTimerRef.current);
      }
    };
  }, []);

  const getPlayerStyles = () => {
    switch (selectedTheme) {
      case 'crt':
        return {
          card: 'bg-black border border-green-500 p-4 crt-border-glow font-mono text-green-500',
          btn: 'border border-green-500 text-green-500 p-2 hover:bg-green-950/40 rounded transition-all',
          slider: 'accent-green-500 h-1 bg-green-950 rounded-lg appearance-none cursor-pointer',
          textMuted: 'text-green-500/60 text-xs',
        };
      case 'editorial':
        return {
          card: 'bg-stone-50 border border-stone-200 p-4 rounded-none font-sans text-stone-800',
          btn: 'border border-stone-300 text-stone-700 p-2 hover:bg-stone-100 rounded-none transition-all',
          slider: 'accent-stone-800 h-1 bg-stone-200 rounded-none appearance-none cursor-pointer',
          textMuted: 'text-stone-400 text-xs font-serif italic',
        };
      case 'royal':
      default:
        return {
          card: 'bg-gradient-to-br from-[#4d0c13] to-[#2b0509] border border-[#d4af37]/30 p-4 rounded-xl shadow-lg font-serif text-[#f3e5ab]',
          btn: 'bg-[#d4af37] text-[#30050a] p-2 hover:brightness-110 rounded-full transition-all shadow',
          slider: 'accent-[#d4af37] h-1 bg-[#4d0c13] rounded-lg appearance-none cursor-pointer',
          textMuted: 'text-[#f3e5ab]/70 text-xs',
        };
    }
  };

  const styles = getPlayerStyles();

  return (
    <div className={`w-full max-w-sm mx-auto shadow-md ${styles.card}`}>
      <div className="flex items-center justify-between gap-4">
        {/* Play/Pause control */}
        <button 
          onClick={togglePlay} 
          className={`flex items-center justify-center w-10 h-10 ${styles.btn}`}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>

        {/* Track info readout */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-sm truncate leading-snug">{currentTrack.title}</h4>
          <p className={`truncate leading-none mt-1 ${styles.textMuted}`}>
            {synthLabel} &bull; {currentTrack.genre}
          </p>
        </div>

        {/* Skip track control */}
        <button 
          onClick={handleNextTrack} 
          className={`flex items-center justify-center w-8 h-8 ${
            selectedTheme === 'royal' ? 'border border-[#d4af37]/40 text-[#d4af37] rounded-full hover:bg-[#d4af37]/10' : styles.btn
          }`}
          aria-label="Skip to next track"
        >
          <SkipForward className="w-4 h-4" />
        </button>

        {/* Mute toggle */}
        <button 
          onClick={() => setIsMuted(!isMuted)} 
          className={`flex items-center justify-center w-8 h-8 ${
            selectedTheme === 'royal' ? 'border border-[#d4af37]/40 text-[#d4af37] rounded-full hover:bg-[#d4af37]/10' : styles.btn
          }`}
          aria-label={isMuted ? 'Unmute music' : 'Mute music'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Volume slider control */}
      <div className="mt-3 flex items-center gap-2">
        <span className="text-[10px] opacity-75">VOL</span>
        <input 
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={volume}
          onChange={(e) => {
            setVolume(parseFloat(e.target.value));
            setIsMuted(false);
          }}
          className={`flex-1 ${styles.slider}`}
        />
      </div>
    </div>
  );
};
