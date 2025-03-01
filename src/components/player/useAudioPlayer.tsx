
import { useState, useEffect, useRef } from "react";
import { Track } from "../../lib/types";

export const useAudioPlayer = (track: Track) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [hasEnded, setHasEnded] = useState(false);
  
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
    // Update audio source when track changes
    if (audioRef.current) {
      const wasPlaying = !audioRef.current.paused;
      
      // Set the actual audio source
      audioRef.current.src = track.audioSrc || '';
      
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
    setHasEnded(true);
    // In a real app, you might want to skip to the next track here
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        // Reset hasEnded when starting to play again
        setHasEnded(false);
        // Actually play the audio
        audioRef.current.play().catch(e => console.error('Error playing audio:', e));
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

  return {
    isPlaying,
    currentTime,
    volume,
    hasEnded,
    togglePlay,
    handleSeek,
    skipNext,
    skipPrevious,
    handleVolumeChange
  };
};
