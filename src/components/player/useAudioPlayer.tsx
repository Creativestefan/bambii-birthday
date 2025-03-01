
import { useState, useEffect, useRef } from "react";
import { Track } from "../../lib/types";

export const useAudioPlayer = (
  track: Track, 
  onNextTrack?: () => void,
  onPreviousTrack?: () => void
) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [hasEnded, setHasEnded] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Create a new audio element
    audioRef.current = new Audio();
    
    // Set default volume
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
    }
    
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
      setHasEnded(false); // Reset hasEnded when track changes
      
      if (wasPlaying) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(e => {
            console.error('Error playing audio after track change:', e);
            setIsPlaying(false);
          });
      }
    }
  }, [track]);

  const updateProgress = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
    animationRef.current = requestAnimationFrame(updateProgress);
  };

  const handleEnd = () => {
    console.log("Audio has ended! Setting hasEnded to true");
    setIsPlaying(false);
    setCurrentTime(0);
    setHasEnded(true);
    
    // Auto play next track when current track ends
    if (onNextTrack) {
      setTimeout(() => {
        onNextTrack();
      }, 2000); // Wait 2 seconds before changing tracks to allow for confetti animation
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // Reset hasEnded when starting to play again
        setHasEnded(false);
        // Attempt to play the audio - this action will trigger user interaction for iOS
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            console.log("Audio started playing successfully");
          })
          .catch(e => {
            console.error('Error playing audio:', e);
            setIsPlaying(false); // Revert state if play fails
          });
      }
    }
  };

  const handleSeek = (time: number) => {
    if (audioRef.current) {
      audioRef.current.currentTime = time;
      setCurrentTime(time);
    }
  };

  const skipNext = () => {
    if (onNextTrack) {
      onNextTrack();
    } else {
      console.log('Skip to next track');
    }
  };

  const skipPrevious = () => {
    if (onPreviousTrack) {
      onPreviousTrack();
    } else {
      console.log('Skip to previous track');
    }
  };

  return {
    isPlaying,
    currentTime,
    hasEnded,
    togglePlay,
    handleSeek,
    skipNext,
    skipPrevious
  };
};
