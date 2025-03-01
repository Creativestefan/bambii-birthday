
import { SkipBack, SkipForward, Play, Pause, Repeat, Shuffle, MessageCircle } from "lucide-react";
import { useState } from "react";
import MessageDisplay from "./MessageDisplay";

interface PlayerControlsProps {
  isPlaying: boolean;
  togglePlay: () => void;
  skipNext: () => void;
  skipPrevious: () => void;
  hasEnded?: boolean;
}

const PlayerControls = ({
  isPlaying,
  togglePlay,
  skipNext,
  skipPrevious,
  hasEnded = false
}: PlayerControlsProps) => {
  const [showMessage, setShowMessage] = useState(false);

  const toggleMessageDisplay = () => {
    setShowMessage(!showMessage);
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
      </div>

      {/* Message Display */}
      {showMessage && (
        <MessageDisplay 
          isPlaying={isPlaying} 
          onClose={() => setShowMessage(false)}
          showConfetti={hasEnded}
        />
      )}
    </div>
  );
};

export default PlayerControls;
