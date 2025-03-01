
import { Track } from "../lib/types";
import AlbumArt from "./AlbumArt";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import PlayerHeader from "./player/PlayerHeader";
import PlayerBackground from "./player/PlayerBackground";
import TrackInfo from "./player/TrackInfo";
import { useAudioPlayer } from "./player/useAudioPlayer";
import Confetti from "./Confetti";

interface MusicPlayerProps {
  track: Track;
}

const MusicPlayer = ({ track }: MusicPlayerProps) => {
  const {
    isPlaying,
    currentTime,
    volume,
    hasEnded,
    togglePlay,
    handleSeek,
    skipNext,
    skipPrevious,
    handleVolumeChange
  } = useAudioPlayer(track);

  return (
    <div className="relative w-full min-h-screen overflow-hidden flex flex-col justify-between">
      {/* Show confetti when song has ended */}
      {hasEnded && <Confetti />}
      
      {/* Background effects */}
      <PlayerBackground track={track} isPlaying={isPlaying} />
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <PlayerHeader 
          volume={volume} 
          onVolumeChange={handleVolumeChange} 
        />
        
        {/* Album art - reduce size on mobile */}
        <div className="px-4 sm:px-8 md:px-12">
          <AlbumArt track={track} isPlaying={isPlaying} />
        </div>
        
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
          hasEnded={hasEnded}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
