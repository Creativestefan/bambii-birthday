
import { useState, useEffect } from "react";
import { Track } from "../../lib/types";

interface PlayerBackgroundProps {
  track: Track;
}

const PlayerBackground = ({ track }: PlayerBackgroundProps) => {
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);

  useEffect(() => {
    // Preload background image
    const img = new Image();
    img.src = track.albumArt;
    img.onload = () => setIsBackgroundLoaded(true);
  }, [track.albumArt]);

  return (
    <>
      {/* Background gradient with blur */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-player-medium/50 to-player-dark"
        style={{ 
          backgroundImage: isBackgroundLoaded ? `url(${track.albumArt})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(30px) brightness(0.4)',
          transform: 'scale(1.1)', // Prevent blur edges
          opacity: isBackgroundLoaded ? 1 : 0,
          transition: 'opacity 1s ease-in-out'
        }}
      />
      
      {/* Subtle matching background overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-[#E5DEFF]/30 to-[#FFDEE2]/20"
        style={{
          mixBlendMode: 'overlay',
          opacity: 0.6
        }}
      />
    </>
  );
};

export default PlayerBackground;
