
import { useRef, useEffect } from "react";
import { useShader } from "../hooks/useShader";

interface ShaderBackgroundProps {
  className?: string;
}

const ShaderBackground = ({ className = "" }: ShaderBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fragment shader
  const fragmentShader = `
    precision mediump float;
    #define GLSLIFY 1

    uniform float u_time;
    uniform vec2 u_mouse;
    uniform vec2 u_resolution;
    varying vec2 v_uv;

    vec2 rotate2D(vec2 p, float angle) {
        float s = sin(angle), c = cos(angle);
        return mat2(c, -s, s, c) * p;
    }

    float gridPattern(vec2 p) {
        vec2 grid = abs(fract(p - 0.5) - 0.5) / fwidth(p);
        return min(grid.x, grid.y);
    }

    float isoGrid(vec2 p) {
        p = rotate2D(p, 3.14159 / 4.0);
        vec2 grid1 = p;
        vec2 grid2 = rotate2D(p, 3.14159 / 3.0);
        return min(gridPattern(grid1 * 8.0), gridPattern(grid2 * 8.0));
    }

    void main() {
        vec2 uv = v_uv;
        vec2 aspect = vec2(u_resolution.x/u_resolution.y, 1.0);
        uv = (uv - 0.5) * aspect + 0.5;
        
        vec2 mouseInfluence = u_mouse - uv;
        float mouseDist = length(mouseInfluence);
        float distortionAmount = smoothstep(0.3, 0.0, mouseDist) * 0.2;
        
        vec2 distortedUV = uv + normalize(mouseInfluence) * distortionAmount;
        
        float grid = isoGrid(distortedUV + u_time * 0.1);
        
        vec3 color1 = vec3(0.2, 0.4, 0.8);
        vec3 color2 = vec3(0.9, 0.3, 0.5);
        vec3 bgColor = vec3(0.1, 0.1, 0.2);
        
        float gridLines = smoothstep(0.8, 0.2, grid);
        vec3 finalColor = mix(bgColor, mix(color1, color2, sin(u_time) * 0.5 + 0.5), gridLines);
        
        gl_FragColor = vec4(finalColor, 1.0);
    }
  `;

  const { updateMousePosition } = useShader(canvasRef.current, { fragmentShader });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Handle resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (canvas) {
        updateMousePosition(
          e.clientX / canvas.width,
          1.0 - e.clientY / canvas.height // Flip Y for WebGL coordinate system
        );
      }
    };

    // Handle touch for mobile
    const handleTouch = (e: TouchEvent) => {
      if (canvas && e.touches.length > 0) {
        updateMousePosition(
          e.touches[0].clientX / canvas.width,
          1.0 - e.touches[0].clientY / canvas.height
        );
        e.preventDefault();
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouch);
    window.addEventListener("touchstart", handleTouch);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouch);
      window.removeEventListener("touchstart", handleTouch);
    };
  }, [updateMousePosition]);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className}`}
    />
  );
};

export default ShaderBackground;
