
import { ChevronDown } from "lucide-react";
import VolumeControl from "../VolumeControl";

interface PlayerHeaderProps {
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const PlayerHeader = ({ volume, onVolumeChange }: PlayerHeaderProps) => {
  return (
    <div className="flex justify-between items-center p-3 sm:p-4 md:p-6">
      <button className="p-2 rounded-full hover:bg-player-light/30 transition-colors duration-200">
        <ChevronDown size={20} className="sm:w-6 sm:h-6" />
      </button>
      <div className="text-center animate-fade-in">
        <h2 className="text-xs uppercase tracking-wider text-player-muted font-medium">
          Now Playing
        </h2>
      </div>
      {/* Removed volume control from header as it's now in the main controls for consistency */}
      <div className="w-8 h-8 opacity-0">
        {/* Invisible placeholder to maintain layout */}
      </div>
    </div>
  );
};

export default PlayerHeader;
