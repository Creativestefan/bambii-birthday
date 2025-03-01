
import { useEffect, useState, useRef } from "react";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (time: number) => void;
}

const ProgressBar = ({ currentTime, duration, onSeek }: ProgressBarProps) => {
  const [isChanging, setIsChanging] = useState(false);
  const [seekValue, setSeekValue] = useState(0);
  const progressRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isChanging) {
      setSeekValue(currentTime);
    }
  }, [currentTime, isChanging]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSeekValue(Number(e.target.value));
  };

  const handleMouseDown = () => {
    setIsChanging(true);
  };

  const handleMouseUp = () => {
    onSeek(seekValue);
    setIsChanging(false);
  };

  const progressPercentage = (seekValue / duration) * 100;

  return (
    <div className="w-full px-4 animate-slide-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center w-full">
        <input
          ref={progressRef}
          type="range"
          min={0}
          max={duration || 100}
          value={seekValue}
          onChange={handleChange}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          className="w-full h-2" /* Increased height for better touch targets */
          style={{
            background: `linear-gradient(to right, #9b87f5 ${progressPercentage}%, #4d4d4d ${progressPercentage}%)`,
          }}
        />
      </div>
      
      <div className="flex justify-between text-xs text-player-muted mt-1 font-medium">
        <span>{formatTime(currentTime)}</span>
        <span>{formatTime(duration)}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
