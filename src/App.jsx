import React, { useState, useRef, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import CanvasArea from './components/CanvasArea';
import ExportModal from './components/ExportModal';
import { Sparkles, Image as ImageIcon, ChevronRight } from 'lucide-react';

const MODE_NAMES = {
  walkers: 'Vectors & Random Walks',
  forces: 'Forces & Gravity',
  waves: 'Oscillation & Waves',
  bursts: 'Particle Systems'
};

const INITIAL_OPTIONS = {
  attractionStrength: 0.5,
  downwardGravity: 0.2,
  windForce: 0.1,
  waveFrequency: 1.0,
  waveAmplitude: 1.0,
  waveStyle: 'SineRibbon',
  burstShape: 'random'
};

export default function App() {
  const canvasRef = useRef(null);

  // Core Drawing States
  const [activeMode, setActiveMode] = useState('walkers');
  const [color, setColor] = useState('#2e3440'); // Default Nordic Light first color
  const [weight, setWeight] = useState(2.5);
  const [speed, setSpeed] = useState(1.0);
  const [theme, setTheme] = useState('light');
  const [options, setOptions] = useState(INITIAL_OPTIONS);

  // App Workflow States
  const [canvasDirty, setCanvasDirty] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [snapshot, setSnapshot] = useState(null);
  const [isWiping, setIsWiping] = useState(false);

  // Apply theme classes to global body container
  useEffect(() => {
    const body = document.body;
    if (theme === 'dark') {
      body.classList.remove('light-theme');
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
      body.classList.add('light-theme');
    }
  }, [theme]);

  // Handle wiping the canvas
  const handleClear = () => {
    if (canvasRef.current) {
      canvasRef.current.clearCanvas();
    }
    setCanvasDirty(false);
  };

  // Open structured museum matte and frame preview
  const handleFinish = () => {
    if (canvasRef.current) {
      const dataURL = canvasRef.current.getHighResImage();
      setSnapshot(dataURL);
      setShowExport(true);
    }
  };

  // Post-Print/Export Automatic Reset
  const handleExportComplete = () => {
    // 1. Trigger the sweeping wiper animation overlay
    setIsWiping(true);

    // 2. Perform total sandbox purge
    setTimeout(() => {
      // Wipe drawings
      handleClear();

      // Reset coordinates, modes, weights, speeds and sliders
      setActiveMode('walkers');
      setColor(theme === 'dark' ? '#fafafa' : '#2e3440'); // Match active theme color
      setWeight(2.5);
      setSpeed(1.0);
      setOptions(INITIAL_OPTIONS);
      setCanvasDirty(false);
    }, 600); // Trigger clear halfway through sweep animation (when opaque)

    // 3. Remove sweep overlay when animation finishes
    setTimeout(() => {
      setIsWiping(false);
    }, 1200);
  };

  return (
    <div className="w-full h-screen overflow-hidden flex relative font-sans">
      
      {/* 1. Collapsible Sidebar Control Dashboard */}
      <Sidebar
        activeMode={activeMode}
        setActiveMode={setActiveMode}
        activeColor={color}
        setActiveColor={setColor}
        weight={weight}
        setWeight={setWeight}
        speed={speed}
        setSpeed={setSpeed}
        theme={theme}
        setTheme={setTheme}
        options={options}
        setOptions={setOptions}
        onClear={handleClear}
      />

      {/* 2. Interactive Main Canvas Viewport Container */}
      <main className="flex-1 h-full relative bg-transparent flex flex-col">
        
        {/* Floating Top Header bar (hides automatically during browser prints) */}
        <header className="absolute top-4 left-6 right-6 flex justify-between items-center z-30 pointer-events-none no-print">
          {/* Subtle floating branding details (only visible if sidebar is collapsed) */}
          <div className="flex items-center gap-2 p-2 px-3.5 rounded-full glass-panel border shadow-sm pointer-events-auto">
            <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
            <span className="font-display font-bold text-xs uppercase tracking-wider text-neutral-800 dark:text-neutral-200">
              {MODE_NAMES[activeMode]}
            </span>
          </div>

          {/* Elegant "Finish Artwork" Button */}
          <div className="pointer-events-auto">
            <button
              onClick={handleFinish}
              disabled={!canvasDirty}
              className={`py-2.5 px-5 rounded-full font-display font-bold tracking-wider text-xs uppercase transition duration-300 flex items-center gap-2.5 shadow-lg border cursor-pointer ${
                canvasDirty 
                  ? 'bg-gradient-to-r from-indigo-600 to-violet-600 border-indigo-500/10 text-white hover:scale-105 active:scale-95 shadow-indigo-600/20' 
                  : 'bg-neutral-300/20 border-neutral-300/30 text-neutral-400 dark:text-neutral-500 cursor-not-allowed'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Finish Artwork / Finalizar Propuesta</span>
            </button>
          </div>
        </header>

        {/* Dynamic Canvas Component */}
        <CanvasArea
          ref={canvasRef}
          activeMode={activeMode}
          color={color}
          weight={weight}
          speed={speed}
          theme={theme}
          options={options}
          onCanvasInteraction={() => setCanvasDirty(true)}
        />

        {/* Full-screen instructional hint (shown only when canvas is blank) */}
        {!canvasDirty && (
          <div className="absolute inset-0 flex items-center justify-center flex-col text-center pointer-events-none select-none z-20 animate-fade-in-scale no-print px-4">
            <h2 className="font-serif-display italic text-2xl md:text-3xl font-semibold text-neutral-400/80 dark:text-neutral-600/80 mb-2">
              The Canvas is a Museum Chamber
            </h2>
            <p className="font-display text-[10px] md:text-xs tracking-widest text-neutral-400/50 dark:text-neutral-600/50 uppercase max-w-sm leading-relaxed">
              Click and drag/move your cursor across the screen to co-create an algorithmic proposal with physics.
            </p>
          </div>
        )}

      </main>

      {/* 3. Curator Export Modal Popup */}
      <ExportModal
        isOpen={showExport}
        onClose={() => setShowExport(false)}
        canvasImage={snapshot}
        activeModeName={MODE_NAMES[activeMode]}
        theme={theme}
        onExportComplete={handleExportComplete}
      />

      {/* 4. Post-Export Automatic Sweep-Overlay (Transition wiper) */}
      <div 
        style={{ color: theme === 'dark' ? '#0b0b0c' : '#f6f5f2' }}
        className={`canvas-sweep-overlay ${isWiping ? 'canvas-sweep-active' : ''}`} 
      />

    </div>
  );
}
