
import { useState, useEffect } from "react";
import MusicPlayer from "../components/MusicPlayer";
import { Track, PlayerState } from "../lib/types";

// Image URL
const IMAGE_ALBUM_ART = "https://images.chiefpriest.design/es5.png";
// Video URL
const VIDEO_ALBUM_ART = "https://images.chiefpriest.design/es.webm";
// Audio URL
const AUDIO_URL = "https://images.chiefpriest.design/Esosa.mp3";
// Birthday Audio URL 
const BIRTHDAY_AUDIO_URL = "https://images.chiefpriest.design/birthday.mp3";

const Index = () => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrackIndex: 0,
    tracks: [
      {
        id: "1",
        title: "Happy Birthday",
        artist: "Esosa",
        album: "",
        duration: 154, // 2:34
        albumArt: IMAGE_ALBUM_ART,
        videoArt: VIDEO_ALBUM_ART,
        isVideo: true,
        audioSrc: AUDIO_URL,
      },
      {
        id: "2",
        title: "Birthday Song",
        artist: "Esosa",
        album: "",
        duration: 154, // assume same duration
        albumArt: IMAGE_ALBUM_ART,
        isVideo: false,
        audioSrc: BIRTHDAY_AUDIO_URL,
      }
    ]
  });

  const handleTrackChange = (newIndex: number) => {
    setPlayerState(prev => ({
      ...prev,
      currentTrackIndex: newIndex
    }));
  };

  const currentTrack = playerState.tracks[playerState.currentTrackIndex];

  return (
    <div className="min-h-screen bg-player-dark text-white">
      <MusicPlayer 
        track={currentTrack} 
        onNextTrack={() => {
          const nextIndex = (playerState.currentTrackIndex + 1) % playerState.tracks.length;
          handleTrackChange(nextIndex);
        }}
        onPreviousTrack={() => {
          const prevIndex = playerState.currentTrackIndex === 0 
            ? playerState.tracks.length - 1 
            : playerState.currentTrackIndex - 1;
          handleTrackChange(prevIndex);
        }}
      />
    </div>
  );
};

export default Index;
