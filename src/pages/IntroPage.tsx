import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ShaderBackground from "../components/ShaderBackground";

const introTexts = [
  "Happy Birthday",
  "To The Most Amazing Person",
  "May Your Day Be Filled With Joy",
  "And Your Year With Success",
  "Now Let's Celebrate With Music"
];

const IntroPage = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");
  const navigate = useNavigate();

  useEffect(() => {
    // Set up transition timing
    const transitionInterval = setInterval(() => {
      // Start fade out
      setFadeState("out");
      
      // After fade out completes, change text and fade in
      setTimeout(() => {
        // If we've shown all texts, navigate to music player
        if (currentTextIndex >= introTexts.length - 1) {
          navigate("/player");
          clearInterval(transitionInterval);
          return;
        }
        
        // Otherwise, move to next text
        setCurrentTextIndex(prevIndex => prevIndex + 1);
        setFadeState("in");
      }, 1000); // Match this with the CSS transition duration
    }, 3000); // Time each text is fully visible

    return () => clearInterval(transitionInterval);
  }, [currentTextIndex, navigate]);

  return (
    <div className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      <ShaderBackground />
      
      <div className="z-10 text-center px-6">
        <h1 
          className={`text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 transition-opacity duration-1000 ${
            fadeState === "in" ? "opacity-100" : "opacity-0"
          }`}
        >
          {introTexts[currentTextIndex]}
        </h1>
      </div>
    </div>
  );
};

export default IntroPage;
