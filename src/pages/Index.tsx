
import { useState, useEffect } from "react";
import MusicPlayer from "../components/MusicPlayer";
import { Track } from "../lib/types";

// Image URL
const IMAGE_ALBUM_ART = "https://images.chiefpriest.design/es5.png";
// Video URL
const VIDEO_ALBUM_ART = "https://images.chiefpriest.design/es.webm";
// Audio URL
const AUDIO_URL = "https://images.chiefpriest.design/Esosa.mp3";

const Index = () => {
  const [track, setTrack] = useState<Track>({
    id: "1",
    title: "Happy Birthday",
    artist: "Esosa",
    album: "",
    duration: 154, // 2:34 - Changed from 241 to 154 seconds
    albumArt: IMAGE_ALBUM_ART,
    videoArt: VIDEO_ALBUM_ART,
    isVideo: true,
    audioSrc: AUDIO_URL,
  });

  return (
    <div className="min-h-screen bg-player-dark text-white">
      <MusicPlayer track={track} />
    </div>
  );
};

export default Index;
