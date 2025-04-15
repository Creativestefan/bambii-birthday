import { useState, useEffect } from "react";
import MusicPlayer from "../components/MusicPlayer";
import { Track, PlayerState } from "../lib/types";

// Image URLs
const IMAGE_ALBUM_ART = "https://pub-f92fa681d4be4b0fa5ef358bad4ea28f.r2.dev/229bc27a-b9a7-4df6-92fd-84b524d435be.JPG";
const IMAGE_ALBUM_ART_2 = "https://pub-f92fa681d4be4b0fa5ef358bad4ea28f.r2.dev/09180db9-46ac-4973-a8d0-14fd9f6b2a66.JPG";
// Video URL
const VIDEO_ALBUM_ART = "https://images.chiefpriest.design/es.webm";
// Audio URL
const AUDIO_URL = "https://pub-f92fa681d4be4b0fa5ef358bad4ea28f.r2.dev/Bambii's%20Birthday%20Song.mp3";
// Birthday Audio URL 
const BIRTHDAY_AUDIO_URL = "https://pub-f92fa681d4be4b0fa5ef358bad4ea28f.r2.dev/Bambii's%20Birthday%20Song.mp3";

const Index = () => {
  const [playerState, setPlayerState] = useState<PlayerState>({
    currentTrackIndex: 0,
    tracks: [
      {
        id: "1",
        title: "Happy Birthday",
        artist: "Bambii",
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
        artist: "Bambii",
        album: "",
        duration: 154, // assume same duration
        albumArt: IMAGE_ALBUM_ART_2,
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
    <div className="h-screen bg-player-dark text-white">
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
