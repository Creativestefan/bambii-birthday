
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  albumArt: string;
  videoArt?: string; // New field for video URL
  isVideo?: boolean; // Flag to indicate if we should use video
  audioSrc?: string; // URL to the audio file
}

export interface PlayerState {
  currentTrackIndex: number;
  tracks: Track[];
}
