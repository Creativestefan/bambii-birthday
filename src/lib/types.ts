
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  albumArt: string;
  videoArt?: string; // New field for video URL
  isVideo?: boolean; // Flag to indicate if we should use video
}
