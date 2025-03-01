
import { useState, useEffect } from "react";
import MusicPlayer from "../components/MusicPlayer";
import { Track } from "../lib/types";

// Default album image in case the user hasn't uploaded one yet
const DEFAULT_ALBUM_ART = "/placeholder.svg";

const Index = () => {
  const [track, setTrack] = useState<Track>({
    id: "1",
    title: "Dreaming",
    artist: "John Smith",
    album: "Night Stories",
    duration: 241, // 4:01
    albumArt: DEFAULT_ALBUM_ART,
  });

  // This effect would normally handle any initialization
  // Here we're just setting up our track data
  useEffect(() => {
    // Check if there's any recently uploaded image
    // If you have an existing mechanism to store/retrieve uploaded images,
    // you could integrate that here
    
    // For now, we'll just use our default placeholder
    // Note: In a real app with actual image uploads, you'd update this
  }, []);

  return (
    <div className="min-h-screen bg-player-dark text-white">
      <MusicPlayer track={track} />
    </div>
  );
};

export default Index;
