
import { useState, useEffect } from "react";
import { Volume2, VolumeX, Volume1 } from "lucide-react";

interface VolumeControlProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const VolumeControl = ({ volume, onVolumeChange }: VolumeControlProps) => {
  const [prevVolume, setPrevVolume] = useState(volume);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Listen for resize events
    window.addEventListener('resize', checkIfMobile);
    
    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  const toggleMute = () => {
    if (volume > 0) {
      setPrevVolume(volume);
      onVolumeChange(0);
    } else {
      onVolumeChange(prevVolume || 0.5);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    onVolumeChange(newVolume);
  };

  const VolumeIcon = () => {
    if (volume === 0) return <VolumeX size={20} className="min-w-5" />;
    if (volume < 0.5) return <Volume1 size={20} className="min-w-5" />;
    return <Volume2 size={20} className="min-w-5" />;
  };

  const progressPercentage = volume * 100;

  if (isMobile) {
    return (
      <button 
        onClick={toggleMute}
        className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-player-light"
      >
        <VolumeIcon />
      </button>
    );
  }

  return (
    <div 
      className="flex items-center space-x-2 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button 
        onClick={toggleMute}
        className="flex items-center justify-center w-8 h-8 rounded-full transition-all duration-200 hover:bg-player-light"
      >
        <VolumeIcon />
      </button>
      
      <div 
        className={`w-0 overflow-hidden transition-all duration-300 ease-in-out ${
          isHovered ? 'w-20' : 'w-0'
        }`}
      >
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={handleVolumeChange}
          className="w-full"
          style={{
            background: `linear-gradient(to right, #9b87f5 ${progressPercentage}%, #4d4d4d ${progressPercentage}%)`,
          }}
        />
      </div>
    </div>
  );
};

export default VolumeControl;
