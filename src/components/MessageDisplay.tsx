import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import Confetti from "./Confetti";

interface MessageDisplayProps {
  isPlaying: boolean;
  onClose: () => void;
  showConfetti?: boolean;
}

const MessageDisplay = ({ isPlaying, onClose, showConfetti = false }: MessageDisplayProps) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [internalShowConfetti, setInternalShowConfetti] = useState(false);
  
  // Birthday message broken down into meaningful segments
  const messages = [
    "Hey Bambii💕, today's your day, and I'm just lucky to be part of it.🎂",
    "I'm proud of you for being so strong and resilient, and for never letting life steal your softness 🌟",
    "You've been through things most people wouldn't even talk about, and you still move with grace, with light, with laughter.🎭",
    "You are worthy — of love, of rest, of joy, and of everything beautiful life has to offer. Never forget that.🎁",
    "May you find courage when facing obstacles, peace during uncertain times, and laughter that fills your soul. 💪",
    "You're still my sunrise — calm, warm, and hopeful. You're the flowering trees after a long dry season. 🌱",
    "The buzzing bees that remind me life is full of movement. The sweet scent of roses that lingers even after you're gone.💫",
    "Here's to your new age, Bambii — a fresh chapter, a deeper glow. I pray God blesses you in every way imaginable.ther year, but the beautiful, complex, one-of-a-kind person that you are. 🥂",
    "That your steps plant beauty wherever you go. That your voice opens doors no one can shut.🎉",
    "Happy birthday, my love ❤️ Let's make this year unforgettable — full of joy, silly dances, warm hugs, and love that keeps growing.. 💖",
    "I love you more than words will ever get right. Stefan"
  ];

  // Show confetti when reaching the last message OR when song ends
  useEffect(() => {
    if (currentIndex === messages.length - 1 || showConfetti) {
      setInternalShowConfetti(true);
    } else {
      setInternalShowConfetti(false);
    }
  }, [currentIndex, messages.length, showConfetti]);

  // Control scrolling based on play state
  useEffect(() => {
    let scrollInterval: NodeJS.Timeout | null = null;
    
    if (isPlaying) {
      scrollInterval = setInterval(() => {
        setCurrentIndex(prevIndex => {
          const nextIndex = (prevIndex + 1) % messages.length;
          return nextIndex;
        });
      }, 5000); // Change message every 5 seconds
    }
    
    return () => {
      if (scrollInterval) clearInterval(scrollInterval);
    };
  }, [isPlaying, messages.length]);

  // Auto-scroll to the newest message
  useEffect(() => {
    if (messagesRef.current) {
      const activeMessage = document.getElementById(`message-${currentIndex}`);
      if (activeMessage) {
        activeMessage.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
      }
    }
  }, [currentIndex]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
      {internalShowConfetti && <Confetti />}
      <div className="glass backdrop-blur-md rounded-t-lg shadow-lg w-full max-h-[60vh] overflow-hidden">
        <div className="flex justify-between items-center p-3 sm:p-4 border-b border-player-light/30">
          <h3 className="text-player-text font-medium text-sm sm:text-base">Birthday Messages</h3>
          <button 
            onClick={onClose}
            className="text-player-muted hover:text-player-text transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div 
          ref={messagesRef} 
          className="p-3 sm:p-4 h-[200px] sm:h-[300px] overflow-y-auto scrollbar-none py-6 sm:py-8"
        >
          <div className="flex flex-col items-center space-y-6">
            {messages.map((message, index) => (
              <div 
                id={`message-${index}`}
                key={index}
                className={`w-full max-w-lg transition-all duration-500 ease-in-out ${
                  index === currentIndex 
                    ? "scale-105 font-semibold" 
                    : "opacity-50"
                }`}
              >
                <p className={`text-center text-base sm:text-xl ${
                  index === currentIndex 
                    ? "text-white" 
                    : "text-player-muted"
                }`}>
                  {message}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-2 sm:p-4 border-t border-player-light/30 text-center text-xs sm:text-sm text-player-muted">
          {isPlaying ? "Messages automatically scroll as music plays" : "Play music to auto-scroll messages"}
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;
