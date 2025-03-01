
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
          className="p-4 h-[300px] overflow-y-auto scrollbar-none py-8"
        >
          <div className="flex flex-col items-center space-y-6">
            {messages.map((message, index) => (
              <div 
                id={`message-${index}`}
                key={index}
                className={`w-full max-w-lg transition-all duration-300 ease-in-out ${
                  index === currentIndex 
                    ? "scale-105 font-semibold" 
                    : "opacity-50"
                }`}
              >
                <p className={`text-center text-lg ${
                  index === currentIndex 
                    ? "text-player-accent" 
                    : "text-player-muted"
                }`}>
                  {message}
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-player-light text-center text-sm text-player-muted">
          {isPlaying ? "Messages automatically scroll as music plays" : "Play music to auto-scroll messages"}
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;
