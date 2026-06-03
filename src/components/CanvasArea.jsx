import React, { useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import EngineManager from './generative/EngineManager';

const CanvasArea = forwardRef(({
  activeMode,
  color,
  weight,
  speed,
  theme,
  options,
  onCanvasInteraction
}, ref) => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const offscreenCanvasRef = useRef(null);
  
  // Keep the engine manager persistent
  const engineRef = useRef(new EngineManager());
  const animationFrameRef = useRef(null);

  // Expose clear and snapshot methods to App
  useImperativeHandle(ref, () => ({
    clearCanvas() {
      const offscreen = offscreenCanvasRef.current;
      const canvas = canvasRef.current;
      if (!offscreen || !canvas) return;

      const offCtx = offscreen.getContext('2d');
      const ctx = canvas.getContext('2d');

      // Clear offscreen with solid base theme color
      offCtx.fillStyle = theme === 'dark' ? '#0b0b0c' : '#f6f5f2';
      offCtx.fillRect(0, 0, offscreen.width, offscreen.height);

      // Clear engines
      engineRef.current.clear();

      // Mirror onto screen
      ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
    },

    getHighResImage() {
      // Returns high-res PNG from offscreen canvas buffer
      const offscreen = offscreenCanvasRef.current;
      if (!offscreen) return null;
      return offscreen.toDataURL('image/png', 1.0);
    }
  }));

  // Handle engine mode changes
  useEffect(() => {
    engineRef.current.setMode(activeMode);
  }, [activeMode]);

  // Synchronize canvases with container size, preserving drawings
  useEffect(() => {
    const handleResize = () => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      const offscreen = offscreenCanvasRef.current;
      if (!container || !canvas || !offscreen) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;

      const newWidth = Math.floor(rect.width);
      const newHeight = Math.floor(rect.height);

      // Skip if dimensions didn't actually change
      if (canvas.style.width === `${newWidth}px` && canvas.style.height === `${newHeight}px`) {
        return;
      }

      // 1. Create a temporary canvas to save current content
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = offscreen.width;
      tempCanvas.height = offscreen.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(offscreen, 0, 0);

      // 2. Set backing store dimensions
      canvas.width = newWidth * dpr;
      canvas.height = newHeight * dpr;
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;

      offscreen.width = newWidth * dpr;
      offscreen.height = newHeight * dpr;

      // 3. Fill offscreen background with theme color
      const offCtx = offscreen.getContext('2d');
      offCtx.fillStyle = theme === 'dark' ? '#0b0b0c' : '#f6f5f2';
      offCtx.fillRect(0, 0, offscreen.width, offscreen.height);

      // 4. Restore drawing scaled to new dimensions
      offCtx.drawImage(tempCanvas, 0, 0, offscreen.width, offscreen.height);

      // 5. Mirror to onscreen
      const ctx = canvas.getContext('2d');
      ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
    };

    // Initialize dimensions
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [theme]); // Re-run when theme shifts to apply correct background fills on resize

  // Physics animation tick loop
  useEffect(() => {
    const tick = () => {
      const canvas = canvasRef.current;
      const offscreen = offscreenCanvasRef.current;
      if (!canvas || !offscreen) {
        animationFrameRef.current = requestAnimationFrame(tick);
        return;
      }

      const offCtx = offscreen.getContext('2d');
      const ctx = canvas.getContext('2d');

      // Update calculations inside engines, drawing permanently onto offscreen buffer
      const hasUpdates = engineRef.current.update(offCtx, {
        color,
        weight: weight * (window.devicePixelRatio || 1), // scale brush weight by DPR
        speed,
        // Mode Specific Sliders
        windForce: options.windForce,
        downwardGravity: options.downwardGravity,
        attractionStrength: options.attractionStrength,
        waveFrequency: options.waveFrequency,
        waveAmplitude: options.waveAmplitude,
        waveStyle: options.waveStyle,
        burstShape: options.burstShape
      });

      // If active changes are drawn, mirror onto the screen
      if (hasUpdates) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(offscreen, 0, 0, canvas.width, canvas.height);
      }

      animationFrameRef.current = requestAnimationFrame(tick);
    };

    animationFrameRef.current = requestAnimationFrame(tick);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [color, weight, speed, options]);

  // Map absolute event coordinates to canvas space
  const getCanvasCoords = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Check if touch or mouse event
    let clientX, clientY;
    if (e.touches && e.touches.length > 0) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: (clientX - rect.left) * dpr,
      y: (clientY - rect.top) * dpr
    };
  };

  // Drawing event wrappers
  const handleStart = (e) => {
    const coords = getCanvasCoords(e);
    engineRef.current.startDrawing(coords.x, coords.y, {
      color,
      weight: weight * (window.devicePixelRatio || 1),
      speed,
      waveStyle: options.waveStyle,
      burstShape: options.burstShape
    });
    
    if (onCanvasInteraction) onCanvasInteraction();
  };

  const handleMove = (e) => {
    if (!engineRef.current.isDragging) return;
    const coords = getCanvasCoords(e);
    engineRef.current.drag(coords.x, coords.y, {
      color,
      weight: weight * (window.devicePixelRatio || 1),
      speed,
      waveStyle: options.waveStyle,
      burstShape: options.burstShape
    });
  };

  const handleEnd = () => {
    engineRef.current.stopDrawing();
  };

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden museum-crosshair select-none print-canvas-target">
      {/* Onscreen Display Canvas */}
      <canvas
        ref={canvasRef}
        onMouseDown={handleStart}
        onMouseMove={handleMove}
        onMouseUp={handleEnd}
        onMouseLeave={handleEnd}
        onTouchStart={(e) => { e.preventDefault(); handleStart(e); }}
        onTouchMove={(e) => { e.preventDefault(); handleMove(e); }}
        onTouchEnd={handleEnd}
        className="absolute top-0 left-0 w-full h-full block bg-transparent"
      />
      {/* Offscreen high-res backing buffer */}
      <canvas ref={offscreenCanvasRef} className="hidden" />
    </div>
  );
});

export default CanvasArea;
