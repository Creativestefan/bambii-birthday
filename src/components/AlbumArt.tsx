import { useState, useEffect, useRef } from "react";
import { Track } from "../lib/types";

interface AlbumArtProps {
  track: Track;
  isPlaying: boolean;
}

const AlbumArt = ({ track, isPlaying }: AlbumArtProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Reset loaded states when track changes
    setImageLoaded(false);
    setVideoLoaded(false);
    
    // Preload image
    const img = new Image();
    img.src = track.albumArt;
    img.onload = () => setImageLoaded(true);
    
    // Video will set loaded when it can play
  }, [track.albumArt]);

  useEffect(() => {
    // Control video playback based on isPlaying state
    if (videoRef.current && track.isVideo && track.videoArt) {
      if (isPlaying) {
        // When play is clicked, try to play the video
        videoRef.current.play()
          .catch(e => {
            console.error('Error playing video:', e);
            // This error can occur on iOS when user hasn't interacted with the page yet
          });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, track.isVideo, track.videoArt]);

  return (
    <div className="flex flex-col items-center justify-center w-full p-4 md:p-8 h-2/3">
      <div 
        className={`relative w-full max-w-md aspect-square rounded-md overflow-hidden shadow-2xl transform transition-all duration-700 ${
          imageLoaded ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
      >
        {/* Low-res blur placeholder */}
        <div 
          className="absolute inset-0 bg-gray-800 animate-pulse"
          style={{ 
            opacity: (imageLoaded || videoLoaded) ? 0 : 1,
            transition: 'opacity 0.5s ease-out'
          }}
        />
        
        {/* Static image album art (always present, but hidden when video is playing) */}
        <img
          src={track.albumArt}
          alt={`${track.title} by ${track.artist}`}
          className="w-full h-full object-cover"
          style={{ 
            opacity: isPlaying && track.isVideo && videoLoaded ? 0 : (imageLoaded ? 1 : 0),
            transition: 'opacity 0.5s ease-out'
          }}
        />
        
        {/* Video album art (only shown when playing) */}
        {track.isVideo && track.videoArt && (
          <video
            ref={videoRef}
            src={track.videoArt}
            className="w-full h-full object-cover absolute top-0 left-0"
            loop
            muted
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
            style={{ 
              opacity: isPlaying && videoLoaded ? 1 : 0,
              transition: 'opacity 0.5s ease-out',
              objectPosition: 'center -20px' // This moves the video up by 20px
            }}
          />
        )}
        
        {/* Center hole for vinyl effect (only for static image) */}
        {!isPlaying && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-player-dark rounded-full border-4 border-gray-800"></div>
        )}
      </div>
    </div>
  );
};

export default AlbumArt;
