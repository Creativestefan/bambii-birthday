
import { useState, useEffect, useRef } from "react";
import { Track } from "../lib/types";

interface AlbumArtProps {
  track: Track;
  isPlaying: boolean;
}

const AlbumArt = ({ track, isPlaying }: AlbumArtProps) => {
  const [loaded, setLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Reset loaded state when track changes
    setLoaded(false);
    
    if (track.isVideo) {
      // For video, we'll set loaded when the video can play
      return;
    } else {
      // For images, preload as before
      const img = new Image();
      img.src = track.albumArt;
      img.onload = () => setLoaded(true);
    }
  }, [track.albumArt, track.isVideo]);

  useEffect(() => {
    // Control video playback based on isPlaying state
    if (videoRef.current && track.isVideo) {
      if (isPlaying) {
        videoRef.current.play().catch(e => console.error('Error playing video:', e));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, track.isVideo]);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 md:p-8 h-2/3">
      <div 
        className={`relative w-full max-w-md aspect-square rounded-md overflow-hidden shadow-2xl transform transition-all duration-700 ${
          loaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        } ${isPlaying && !track.isVideo ? 'album-rotate playing' : 'album-rotate'}`}
      >
        {/* Low-res blur placeholder */}
        <div 
          className="absolute inset-0 bg-gray-800 animate-pulse"
          style={{ 
            opacity: loaded ? 0 : 1,
            transition: 'opacity 0.5s ease-out'
          }}
        />
        
        {track.isVideo ? (
          /* Video album art */
          <video
            ref={videoRef}
            src={track.albumArt}
            className="w-full h-full object-cover"
            loop
            muted
            playsInline
            onCanPlay={() => setLoaded(true)}
            style={{ 
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.5s ease-out',
              objectPosition: 'center -20px' // This moves the video up by 20px
            }}
          />
        ) : (
          /* Static image album art */
          <img
            src={track.albumArt}
            alt={`${track.title} by ${track.artist}`}
            className="w-full h-full object-cover"
            style={{ 
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.5s ease-out'
            }}
          />
        )}
        
        {/* Center hole for vinyl effect (only for non-video album art) */}
        {!track.isVideo && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-player-dark rounded-full border-4 border-gray-800"></div>
        )}
      </div>
    </div>
  );
};

export default AlbumArt;
