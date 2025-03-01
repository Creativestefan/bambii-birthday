
import { useState, useEffect } from "react";
import MusicPlayer from "../components/MusicPlayer";
import { Track } from "../lib/types";

// Image URL
const IMAGE_ALBUM_ART = "https://images.chiefpriest.design/esosa.png";
// Video URL
const VIDEO_ALBUM_ART = "https://images.chiefpriest.design/es.webm";

const Index = () => {
  const [track, setTrack] = useState<Track>({
    id: "1",
    title: "Dreaming",
    artist: "John Smith",
    album: "Night Stories",
    duration: 241, // 4:01
    albumArt: IMAGE_ALBUM_ART,
    videoArt: VIDEO_ALBUM_ART,
    isVideo: true,
  });

  return (
    <div className="min-h-screen bg-player-dark text-white">
      <MusicPlayer track={track} />
    </div>
  );
};

export default Index;
