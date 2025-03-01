
import { Track } from "../../lib/types";

interface TrackInfoProps {
  track: Track;
  isPlaying: boolean;
}

const TrackInfo = ({ track, isPlaying }: TrackInfoProps) => {
  return (
    <>
      {/* Track info */}
      <div className="text-center p-4 animate-slide-up">
        <h1 className="text-2xl font-bold mb-1 tracking-tight">{track.title}</h1>
        <p className="text-player-muted">{track.artist} • {track.album}</p>
      </div>
      
      {/* Playback visualizer (only showing when playing) */}
      {isPlaying && (
        <div className="flex justify-center items-end h-4 space-x-1 my-2">
          <div className="w-1 h-1 bg-player-accent rounded-full animate-equalizer-1"></div>
          <div className="w-1 h-1 bg-player-accent rounded-full animate-equalizer-2"></div>
          <div className="w-1 h-1 bg-player-accent rounded-full animate-equalizer-3"></div>
        </div>
      )}
    </>
  );
};

export default TrackInfo;
