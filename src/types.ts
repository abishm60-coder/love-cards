export type ThemeType = 'royal' | 'crt' | 'editorial';

export interface WeddingConfig {
  brideName: string;
  groomName: string;
  weddingDate: string;
  weddingTime: string;
  ceremonyVenue: string;
  ceremonyAddress: string;
  receptionVenue: string;
  receptionAddress: string;
  selectedTheme: ThemeType;
  selectedTrackIndex: number;
}

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  likes: number;
  likedByCurrentUser?: boolean;
  timestamp: string;
}

export interface MusicTrack {
  title: string;
  genre: string;
  description: string;
}
