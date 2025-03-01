
import { Track } from "../../lib/types";

interface TrackInfoProps {
  track: Track;
  isPlaying: boolean;
}

const TrackInfo = ({ track, isPlaying }: TrackInfoProps) => {
  return (
    <>
      {/* Track info */}
      <div className="text-center p-3 sm:p-4 animate-slide-up">
        <h1 className="text-xl sm:text-2xl font-bold mb-1 tracking-tight">{track.title}</h1>
        <p className="text-sm sm:text-base text-player-muted">
          {track.artist}{track.album ? ` • ${track.album}` : ''}
        </p>
      </div>
    </>
  );
};

export default TrackInfo;
