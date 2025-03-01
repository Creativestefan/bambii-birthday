
export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  duration: number; // in seconds
  albumArt: string;
  isVideo?: boolean; // Flag to indicate if albumArt is a video
}
