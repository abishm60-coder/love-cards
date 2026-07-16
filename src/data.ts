import { WeddingConfig, MusicTrack, GuestbookEntry } from './types';

export const DEFAULT_CONFIG: WeddingConfig = {
  brideName: 'S. Krishna Priya',
  groomName: 'A. Aslin Shiju',
  weddingDate: '2026-09-07',
  weddingTime: '10:00',
  ceremonyVenue: "The St.Roch's Church",
  ceremonyAddress: 'Arokiapuram',
  receptionVenue: 'Alan Annai Community Hall',
  receptionAddress: 'Alanvilai',
  selectedTheme: 'royal',
  selectedTrackIndex: 0,
};

export const MUSIC_TRACKS: MusicTrack[] = [
  { title: 'Royal Waltz', genre: 'Classical Waltz', description: 'Harmonic synthesis of rich strings, harpsichords, and woodwind instruments.' },
  { title: 'Chiptune Dream', genre: '8-bit Electronic Synth', description: 'Retro synthesizer pulsewaves and triangle-wave counterpoint.' },
  { title: 'Serenade of Autumn', genre: 'Minimalist Soft Piano', description: 'Graceful, resonant piano frequencies with gentle spatial reverb.' }
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [];
