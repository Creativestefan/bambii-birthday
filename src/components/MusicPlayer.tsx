
import { Track } from "../lib/types";
import AlbumArt from "./AlbumArt";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import PlayerHeader from "./player/PlayerHeader";
import PlayerBackground from "./player/PlayerBackground";
import TrackInfo from "./player/TrackInfo";
import { useAudioPlayer } from "./player/useAudioPlayer";

interface MusicPlayerProps {
  track: Track;
}

const MusicPlayer = ({ track }: MusicPlayerProps) => {
  const {
    isPlaying,
    currentTime,
    volume,
    togglePlay,
    handleSeek,
    skipNext,
    skipPrevious,
    handleVolumeChange
  } = useAudioPlayer(track);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
      {/* Background effects */}
      <PlayerBackground track={track} />
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <PlayerHeader 
          volume={volume} 
          onVolumeChange={handleVolumeChange} 
        />
        
        {/* Album art */}
        <AlbumArt track={track} isPlaying={isPlaying} />
        
        {/* Track info */}
        <TrackInfo track={track} isPlaying={isPlaying} />
        
        {/* Progress bar */}
        <ProgressBar 
          currentTime={currentTime} 
          duration={track.duration}
          onSeek={handleSeek} 
        />
        
        {/* Controls */}
        <PlayerControls 
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          skipNext={skipNext}
          skipPrevious={skipPrevious}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
