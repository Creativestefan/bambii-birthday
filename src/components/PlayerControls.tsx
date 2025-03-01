
import { SkipBack, SkipForward, Play, Pause, Repeat, Shuffle, MessageCircle, Volume, Volume1, Volume2, VolumeX } from "lucide-react";
import { useState } from "react";
import VolumeControl from "./VolumeControl";
import MessageDisplay from "./MessageDisplay";

interface PlayerControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  skipNext: () => void;
  skipPrevious: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const PlayerControls = ({
  isPlaying,
  togglePlay,
  skipNext,
  skipPrevious,
  volume,
  onVolumeChange
}: PlayerControlsProps) => {
  const [showMessage, setShowMessage] = useState(false);

  const toggleMessageDisplay = () => {
    setShowMessage(!showMessage);
  };

  // Volume icon based on current level
  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={18} />;
    if (volume < 0.3) return <Volume size={18} />;
    if (volume < 0.7) return <Volume1 size={18} />;
    return <Volume2 size={18} />;
  };

  return (
    <div className="w-full p-4 md:p-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
      <div className="flex flex-col items-center">
        {/* Secondary controls (shuffle, repeat, message) */}
        <div className="flex justify-center items-center space-x-6 mb-4 text-player-muted">
          <button className="hover:text-player-text transition-colors duration-200">
            <Shuffle size={18} />
          </button>
          <button 
            className="hover:text-player-text transition-colors duration-200"
            onClick={toggleMessageDisplay}
          >
            <MessageCircle size={18} />
          </button>
          <button className="hover:text-player-text transition-colors duration-200">
            <Repeat size={18} />
          </button>
        </div>
        
        {/* Primary controls (skip, play/pause) */}
        <div className="flex justify-center items-center space-x-6">
          <button 
            onClick={skipPrevious}
            className="text-white opacity-90 hover:opacity-100 transition-opacity duration-200"
          >
            <SkipBack size={24} />
          </button>
          
          <button 
            onClick={togglePlay}
            className="bg-white text-black rounded-full p-3 transform hover:scale-105 transition-transform duration-200 active:scale-95"
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          
          <button 
            onClick={skipNext}
            className="text-white opacity-90 hover:opacity-100 transition-opacity duration-200"
          >
            <SkipForward size={24} />
          </button>
        </div>
        
        {/* Mobile volume control - always visible but compact */}
        <div className="mt-6 flex items-center justify-center">
          <button className="mr-2 text-player-muted hover:text-player-text transition-colors">
            <VolumeIcon />
          </button>
          <div className="w-24 sm:w-32">
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full"
              style={{
                background: `linear-gradient(to right, #9b87f5 ${volume * 100}%, #4d4d4d ${volume * 100}%)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Message Display */}
      {showMessage && (
        <MessageDisplay isPlaying={isPlaying} onClose={() => setShowMessage(false)} />
      )}
    </div>
  );
};

export default PlayerControls;
