import { WeddingConfig, MusicTrack, GuestbookEntry } from './types';

export const DEFAULT_CONFIG: WeddingConfig = {
  brideName: 'Evelyn',
  groomName: 'Alexander',
  weddingDate: '2026-10-18',
  weddingTime: '15:30',
  ceremonyVenue: 'St. Jude Cathedral Chapel',
  ceremonyAddress: '452 Cathedral Way, Portland, OR',
  receptionVenue: 'The Glasshouse Pavilion',
  receptionAddress: '788 Riverview Boulevard, Portland, OR',
  selectedTheme: 'royal',
  selectedTrackIndex: 0,
};

export const MUSIC_TRACKS: MusicTrack[] = [
  { title: 'Royal Waltz', genre: 'Classical Waltz', description: 'Harmonic synthesis of rich strings, harpsichords, and woodwind instruments.' },
  { title: 'Chiptune Dream', genre: '8-bit Electronic Synth', description: 'Retro synthesizer pulsewaves and triangle-wave counterpoint.' },
  { title: 'Serenade of Autumn', genre: 'Minimalist Soft Piano', description: 'Graceful, resonant piano frequencies with gentle spatial reverb.' }
];

export const INITIAL_GUESTBOOK: GuestbookEntry[] = [
  {
    id: '1',
    name: 'Eleanor Vance',
    message: 'So beautiful! Wishing you both a lifetime of absolute happiness, laughter, and endless adventure!',
    likes: 12,
    timestamp: '2026-07-15T18:30:00Z'
  },
  {
    id: '2',
    name: 'Marcus K.',
    message: 'Can\'t wait for the retro CRT cyber elements or the actual waltz! Super excited for this grand celebration!',
    likes: 8,
    timestamp: '2026-07-15T19:15:00Z'
  },
  {
    id: '3',
    name: 'Samantha & David',
    message: 'The minimalist aesthetic is absolutely stunning. Huge congratulations Evelyn and Alexander!',
    likes: 15,
    timestamp: '2026-07-15T20:05:00Z'
  }
];
