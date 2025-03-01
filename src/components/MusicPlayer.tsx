
import { useState, useEffect, useRef } from "react";
import { Track } from "../lib/types";
import AlbumArt from "./AlbumArt";
import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import { ChevronDown } from "lucide-react";
import VolumeControl from "./VolumeControl";

interface MusicPlayerProps {
  track: Track;
}

const MusicPlayer = ({ track }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isBackgroundLoaded, setIsBackgroundLoaded] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Create a new audio element
    audioRef.current = new Audio();
    
    // Set up event listeners for the audio element
    const audio = audioRef.current;
    
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', handleEnd);
    
    // Clean up event listeners when component unmounts
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (audio) {
        audio.pause();
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('ended', handleEnd);
      }
    };
  }, []);

  useEffect(() => {
    // Preload background image
    const img = new Image();
    img.src = track.albumArt;
    img.onload = () => setIsBackgroundLoaded(true);
    
    // Update audio source when track changes
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      
      // We'll mock the audio source for now
      // In a real app, this would be a link to the audio file
      // audioRef.current.src = track.audioSrc;
      
      setCurrentTime(0);
      
      if (wasPlaying) {
        audioRef.current.play().catch(e => console.error('Error playing audio:', e));
      }
    }
  }, [track]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const handleEnd = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    // In a real app, you might want to skip to the next track here
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // In a real app, this would actually play audio
        // For now, we'll just simulate playing with the time updating
        if (!animationRef.current) {
          animationRef.current = requestAnimationFrame(updateProgress);
        }
        // audioRef.current.play().catch(e => console.error('Error playing audio:', e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipNext = () => {
    // In a real app, this would actually change the track
    console.log('Skip to next track');
  };

  const skipPrevious = () => {
    // In a real app, this would actually change the track
    console.log('Skip to previous track');
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  // Simulating playing progress for the demo
  useEffect(() => {
    let interval: number;
    
    if (isPlaying) {
      interval = window.setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= track.duration) {
            clearInterval(interval);
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, track.duration]);

  return (
    <div className="relative w-full h-screen overflow-hidden flex flex-col justify-between">
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
      
      {/* Content container */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 md:p-6">
          <button className="p-2 rounded-full hover:bg-player-light/30 transition-colors duration-200">
            <ChevronDown size={24} />
          </button>
          <div className="text-center animate-fade-in">
            <h2 className="text-xs uppercase tracking-wider text-player-muted font-medium">
              Now Playing
            </h2>
          </div>
          <div className="w-8 h-8 md:hidden">
            <VolumeControl volume={volume} onVolumeChange={handleVolumeChange} />
          </div>
        </div>
        
        {/* Album art */}
        <AlbumArt track={track} isPlaying={isPlaying} />
        
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
        
        {/* Progress bar */}
        <ProgressBar 
          currentTime={currentTime} 
          duration={track.duration}
          onSeek={handleSeek} 
        />
        
        {/* Controls */}
        <PlayerControls 
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          skipNext={skipNext}
          skipPrevious={skipPrevious}
          volume={volume}
          onVolumeChange={handleVolumeChange}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
