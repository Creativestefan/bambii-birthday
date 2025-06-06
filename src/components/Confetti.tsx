
import { useEffect, useState } from 'react';

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  rotation: number;
  speed: number;
}

const Confetti = () => {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);
  
  useEffect(() => {
    console.log("Confetti component mounted");
    
    // Create confetti pieces
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#ffffff', '#ffca4a', '#ff7cd8', '#9f56ff'];
    const newPieces: ConfettiPiece[] = [];
    
    // Create more confetti for a more dramatic effect
    for (let i = 0; i < 200; i++) {
      newPieces.push({
        id: i,
        x: Math.random() * 100, // Random position across the screen (%)
        y: -10 - Math.random() * 30, // Start further above the viewport for song ending
        size: 5 + Math.random() * 15, // Larger sizes for more impact
        color: colors[Math.floor(Math.random() * colors.length)], // Random color
        rotation: Math.random() * 360, // Random rotation
        speed: 1 + Math.random() * 5 // Faster fall speed for song ending
      });
    }
    
    setPieces(newPieces);
    console.log("Created", newPieces.length, "confetti pieces");
    
    // Animation loop
    let animationFrameId: number;
    let lastTimestamp: number;
    
    const animate = (timestamp: number) => {
      if (!lastTimestamp) lastTimestamp = timestamp;
      const deltaTime = timestamp - lastTimestamp;
      lastTimestamp = timestamp;
      
      setPieces(prevPieces => {
        const updatedPieces = prevPieces.map(piece => ({
          ...piece,
          y: piece.y + (piece.speed * deltaTime * 0.01), // Move down
          rotation: piece.rotation + (deltaTime * 0.01) // Rotate gradually
        })).filter(piece => piece.y < 120); // Remove pieces that have fallen off-screen
        
        return updatedPieces;
      });
      
      // Continue animation if any pieces are still visible
      if (pieces.length > 0 && pieces.some(piece => piece.y < 120)) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };
    
    animationFrameId = requestAnimationFrame(animate);
    
    return () => {
      console.log("Cleaning up confetti animation");
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);
  
  console.log("Rendering Confetti with", pieces.length, "pieces");
  
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="absolute rounded-sm"
          style={{
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            backgroundColor: piece.color,
            transform: `rotate(${piece.rotation}deg)`,
            opacity: 0.8,
          }}
        />
      ))}
    </div>
  );
};

export default Confetti;
