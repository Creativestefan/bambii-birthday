
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface MessageDisplayProps {
  isPlaying: boolean;
  onClose: () => void;
}

const MessageDisplay = ({ isPlaying, onClose }: MessageDisplayProps) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Sample messages - these could be fetched from an API or props
  const messages = [
    "Happy Birthday to you! 🎂",
    "May all your wishes come true ✨",
    "Enjoy your special day! 🎉",
    "Wishing you health and happiness 🌟",
    "Another year of amazing experiences 🎊",
    "Keep smiling and shining! 💫"
  ];

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
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [currentIndex]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 animate-slide-up">
      <div className="bg-player-medium rounded-t-lg shadow-lg w-full max-h-[60vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-player-light">
          <h3 className="text-player-text font-medium">Birthday Messages</h3>
          <button 
            onClick={onClose}
            className="text-player-muted hover:text-player-text transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div 
          ref={messagesRef} 
          className="p-4 h-[300px] overflow-y-auto"
        >
          {messages.map((message, index) => (
            <div 
              key={index}
              className={`mb-4 p-3 rounded-lg ${
                index === currentIndex 
                  ? "bg-player-accent/20 border-l-4 border-player-accent animate-pulse-subtle" 
                  : "bg-player-light/30"
              } transition-all duration-300`}
            >
              <p className="text-player-text">{message}</p>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-player-light text-center text-sm text-player-muted">
          {isPlaying ? "Messages automatically scroll as music plays" : "Play music to auto-scroll messages"}
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;
