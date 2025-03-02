
import { useEffect, useRef } from 'react';

interface ShaderHookProps {
  fragmentShader: string;
  vertexShader?: string;
}

export const useShader = (canvas: HTMLCanvasElement | null, { fragmentShader, vertexShader }: ShaderHookProps) => {
  const mousePosition = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const animationFrameId = useRef<number | null>(null);
  const startTimeRef = useRef<number>(Date.now());

  useEffect(() => {
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    // Default vertex shader if none provided
    const defaultVertexShader = `
      attribute vec4 aVertexPosition;
      attribute vec2 aTextureCoord;
      varying vec2 v_uv;
      void main() {
        gl_Position = aVertexPosition;
        v_uv = aTextureCoord;
      }
    `;

    // Initialize shaders
    const vs = loadShader(gl, gl.VERTEX_SHADER, vertexShader || defaultVertexShader);
    const fs = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShader);

    // Create shader program
    const shaderProgram = gl.createProgram();
    if (!shaderProgram || !vs || !fs) {
      console.error("Failed to create shader program");
      return;
    }

    gl.attachShader(shaderProgram, vs);
    gl.attachShader(shaderProgram, fs);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      console.error("Unable to initialize the shader program: " + gl.getProgramInfoLog(shaderProgram));
      return;
    }

    // Collect all the shader program info
    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
        textureCoord: gl.getAttribLocation(shaderProgram, "aTextureCoord"),
      },
      uniformLocations: {
        time: gl.getUniformLocation(shaderProgram, "u_time"),
        mouse: gl.getUniformLocation(shaderProgram, "u_mouse"),
        resolution: gl.getUniformLocation(shaderProgram, "u_resolution"),
      },
    };

    // Create buffers for positions (full screen quad)
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = [-1.0, 1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    // Create buffer for texture coordinates
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    const textureCoordinates = [0.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0, 0.0];
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);

    // Render function
    const render = () => {
      if (!gl) return;

      const elapsedTime = (Date.now() - startTimeRef.current) * 0.001; // seconds

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(programInfo.program);

      // Set uniforms
      gl.uniform1f(programInfo.uniformLocations.time, elapsedTime);
      gl.uniform2f(
        programInfo.uniformLocations.mouse,
        mousePosition.current.x,
        mousePosition.current.y
      );
      gl.uniform2f(
        programInfo.uniformLocations.resolution,
        canvas.width,
        canvas.height
      );

      // Position attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      // Texture coordinate attribute
      gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
      gl.vertexAttribPointer(
        programInfo.attribLocations.textureCoord,
        2,
        gl.FLOAT,
        false,
        0,
        0
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);

      // Draw
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      // Request next frame
      animationFrameId.current = requestAnimationFrame(render);
    };

    // Helper function to load shaders
    function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
      const shader = gl.createShader(type);
      if (!shader) {
        console.error("Unable to create shader");
        return null;
      }

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    // Start rendering
    render();

    // Cleanup
    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [canvas, fragmentShader, vertexShader]);

  // Return functions to update mouse position
  return {
    updateMousePosition: (x: number, y: number) => {
      mousePosition.current = { x, y };
    },
  };
};
