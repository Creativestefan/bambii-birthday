
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

interface MessageDisplayProps {
  isPlaying: boolean;
  onClose: () => void;
}

const MessageDisplay = ({ isPlaying, onClose }: MessageDisplayProps) => {
  const messagesRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Birthday message broken down into meaningful segments
  const messages = [
    "On this special day, I want to take a moment to celebrate you. 🎂",
    "Birthdays have a way of making us pause and reflect, and I hope today finds you surrounded by love and joy. ✨",
    "Your journey through life – with all its ups and downs, triumphs and challenges – has shaped you into the incredible person you are today. 🌟",
    "Each experience, each moment, has added depth and richness to your story. 🎭",
    "May this new year of life bring you unexpected blessings, meaningful connections, and moments that take your breath away. 🎁",
    "May you find courage when facing obstacles, peace during uncertain times, and laughter that fills your soul. 💪",
    "Remember to be gentle with yourself as you grow and evolve. 🌱",
    "Your worth isn't measured by achievements or productivity, but by the love you share and the light you bring to others' lives. 💫",
    "Here's to celebrating not just another year, but the beautiful, complex, one-of-a-kind person that you are. 🥂",
    "Happy Birthday! 🎉"
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
      <div className="glass backdrop-blur-md rounded-t-lg shadow-lg w-full max-h-[60vh] overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b border-player-light/30">
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
                className={`w-full max-w-lg transition-all duration-500 ease-in-out ${
                  index === currentIndex 
                    ? "scale-105 font-semibold" 
                    : "opacity-50"
                }`}
              >
                <p className={`text-center text-xl ${
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
        
        <div className="p-4 border-t border-player-light/30 text-center text-sm text-player-muted">
          {isPlaying ? "Messages automatically scroll as music plays" : "Play music to auto-scroll messages"}
        </div>
      </div>
    </div>
  );
};

export default MessageDisplay;
