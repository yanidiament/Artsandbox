import React, { useState } from 'react';
import { 
  Sparkles, Sliders, Sun, Moon, ChevronLeft, ChevronRight, 
  Compass, Activity, Waves, Boxes, Info, Palette 
} from 'lucide-react';

const PALETTES = [
  {
    name: 'Nordic Light',
    colors: ['#2e3440', '#4c566a', '#88c0d0', '#8fbcbb', '#ebcb8b', '#bf616a'],
    description: 'Clean slate, ice-blue, and soft candle gold.'
  },
  {
    name: 'Cyberpunk Neon',
    colors: ['#ff007f', '#00f0ff', '#7f00ff', '#fff000', '#00ff66', '#ffffff'],
    description: 'Vibrant hot magenta, digital cyan, and absolute neon.'
  },
  {
    name: 'Earthy Clay',
    colors: ['#7c2d12', '#c2410c', '#ea580c', '#f97316', '#ffedd5', '#1e293b'],
    description: 'Terracotta, warm ochre, burnt sienna, and natural ash.'
  },
  {
    name: 'Renaissance',
    colors: ['#1e293b', '#991b1b', '#d97706', '#065f46', '#f8fafc', '#475569'],
    description: 'Prussian blue, rich crimson, gold leaf, and gesso white.'
  },
  {
    name: 'Monochrome Ink',
    colors: ['#09090b', '#27272a', '#52525b', '#a1a1aa', '#e4e4e7', '#fafafa'],
    description: 'Deep carbon charcoal, brushed steel, and bone ivory.'
  }
];

export default function Sidebar({
  activeMode,
  setActiveMode,
  activeColor,
  setActiveColor,
  weight,
  setWeight,
  speed,
  setSpeed,
  theme,
  setTheme,
  options,
  setOptions,
  onClear
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedPaletteIdx, setSelectedPaletteIdx] = useState(0);

  // Update specific slider inside options
  const updateOption = (key, value) => {
    setOptions(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handlePaletteSelect = (idx) => {
    setSelectedPaletteIdx(idx);
    // Set the first color of the selected palette as active
    setActiveColor(PALETTES[idx].colors[0]);
  };

  return (
    <div className="relative h-full flex items-center z-40 select-none no-print sidebar-container">
      {/* Sidebar Content Panel */}
      <div 
        className={`h-full glass-panel flex flex-col justify-between transition-all duration-500 ease-in-out border-r overflow-hidden ${
          isOpen ? 'w-80 md:w-96 px-5 py-6 opacity-100' : 'w-0 p-0 opacity-0 border-r-0'
        }`}
      >
        <div className="flex-1 flex flex-col overflow-y-auto pr-1 gap-6">
          
          {/* Brand Identity / Header */}
          <div className="flex items-center gap-3 pb-3 border-b border-slate-400/20">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-0.5 shadow-md">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-display font-bold text-sm tracking-wider uppercase text-neutral-800 dark:text-neutral-100">
                Nature of Code
              </h1>
              <p className="text-[10px] tracking-widest font-mono text-neutral-400 uppercase">
                Algorithmic Art Sandbox
              </p>
            </div>
          </div>

          {/* Theme Toggler */}
          <div className="flex items-center justify-between p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
            <span className="text-[11px] font-medium tracking-wide uppercase text-neutral-500 dark:text-neutral-400">
              Gallery Atmosphere
            </span>
            <div className="flex gap-1">
              <button 
                onClick={() => setTheme('light')}
                className={`p-1.5 rounded transition ${
                  theme === 'light' 
                    ? 'bg-white text-indigo-600 shadow-sm' 
                    : 'text-neutral-400 hover:text-neutral-100'
                }`}
                title="Pristine Gallery Theme (Light)"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button 
                onClick={() => setTheme('dark')}
                className={`p-1.5 rounded transition ${
                  theme === 'dark' 
                    ? 'bg-neutral-800 text-indigo-400 shadow-sm' 
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
                title="Dramatic Vault Theme (Dark)"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 1. Algorithmic Modes Selector */}
          <div className="space-y-2.5">
            <label className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 font-mono block">
              Drawing Vector Engine
            </label>
            <div className="grid grid-cols-2 gap-2">
              
              {/* Walkers */}
              <button
                onClick={() => setActiveMode('walkers')}
                className={`p-3.5 rounded-xl border flex flex-col items-start text-left gap-1.5 transition-all ${
                  activeMode === 'walkers' 
                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'bg-transparent border-neutral-300/30 hover:border-neutral-500/35 text-neutral-500 dark:text-neutral-300'
                }`}
              >
                <Compass className="w-4 h-4" />
                <span className="text-[11px] font-bold font-display uppercase tracking-wide">Walkers</span>
                <span className="text-[9px] leading-tight text-neutral-400">Lévy random sketch vectors.</span>
              </button>

              {/* Forces */}
              <button
                onClick={() => setActiveMode('forces')}
                className={`p-3.5 rounded-xl border flex flex-col items-start text-left gap-1.5 transition-all ${
                  activeMode === 'forces' 
                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'bg-transparent border-neutral-300/30 hover:border-neutral-500/35 text-neutral-500 dark:text-neutral-300'
                }`}
              >
                <Activity className="w-4 h-4" />
                <span className="text-[11px] font-bold font-display uppercase tracking-wide">Forces</span>
                <span className="text-[9px] leading-tight text-neutral-400">Gravity & wind particle flows.</span>
              </button>

              {/* Waves */}
              <button
                onClick={() => setActiveMode('waves')}
                className={`p-3.5 rounded-xl border flex flex-col items-start text-left gap-1.5 transition-all ${
                  activeMode === 'waves' 
                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'bg-transparent border-neutral-300/30 hover:border-neutral-500/35 text-neutral-500 dark:text-neutral-300'
                }`}
              >
                <Waves className="w-4 h-4" />
                <span className="text-[11px] font-bold font-display uppercase tracking-wide">Waves</span>
                <span className="text-[9px] leading-tight text-neutral-400">Harmonographs & sine sweeps.</span>
              </button>

              {/* Particle Systems */}
              <button
                onClick={() => setActiveMode('bursts')}
                className={`p-3.5 rounded-xl border flex flex-col items-start text-left gap-1.5 transition-all ${
                  activeMode === 'bursts' 
                    ? 'bg-indigo-500/10 border-indigo-500 text-indigo-600 dark:text-indigo-400' 
                    : 'bg-transparent border-neutral-300/30 hover:border-neutral-500/35 text-neutral-500 dark:text-neutral-300'
                }`}
              >
                <Boxes className="w-4 h-4" />
                <span className="text-[11px] font-bold font-display uppercase tracking-wide">Burst Emitters</span>
                <span className="text-[9px] leading-tight text-neutral-400">Expanding shapes & stamps.</span>
              </button>

            </div>
          </div>

          {/* 2. Color Palettes Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-1.5">
              <Palette className="w-3.5 h-3.5 text-neutral-400" />
              <label className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 font-mono">
                Curated Color Palettes
              </label>
            </div>
            
            <div className="space-y-2">
              {PALETTES.map((pal, idx) => (
                <button
                  key={pal.name}
                  onClick={() => handlePaletteSelect(idx)}
                  className={`w-full p-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                    selectedPaletteIdx === idx 
                      ? 'bg-indigo-500/5 border-indigo-500/70 shadow-sm' 
                      : 'bg-black/5 dark:bg-white/5 border-transparent hover:border-neutral-300/30'
                  }`}
                >
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[11px] font-bold font-display text-neutral-700 dark:text-neutral-200">{pal.name}</span>
                    <span className="text-[8px] text-neutral-400 truncate w-40">{pal.description}</span>
                  </div>
                  <div className="flex -space-x-1.5">
                    {pal.colors.slice(0, 5).map((c, cIdx) => (
                      <div 
                        key={cIdx} 
                        style={{ backgroundColor: c }} 
                        className="w-4 h-4 rounded-full border border-white dark:border-neutral-900 shadow-sm"
                      />
                    ))}
                  </div>
                </button>
              ))}
            </div>

            {/* Individual active color swatches from selected palette */}
            <div className="pt-1.5 space-y-2">
              <span className="text-[9px] font-mono tracking-widest text-neutral-400 uppercase block">
                Select Active Color
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {PALETTES[selectedPaletteIdx].colors.map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveColor(c)}
                    style={{ backgroundColor: c }}
                    className={`w-7 h-7 rounded-full relative shadow-md transition-transform duration-200 border-2 ${
                      activeColor === c 
                        ? 'border-indigo-600 scale-110 shadow-indigo-600/30' 
                        : 'border-white dark:border-neutral-900 hover:scale-105'
                    }`}
                  >
                    {activeColor === c && (
                      <span className="absolute inset-0.5 rounded-full border border-white mix-blend-difference" />
                    )}
                  </button>
                ))}
                
                {/* Advanced Color Picker */}
                <div className="relative w-7 h-7 rounded-full overflow-hidden border-2 border-dashed border-neutral-400/50 hover:border-neutral-400 flex items-center justify-center bg-transparent group cursor-pointer">
                  <input
                    type="color"
                    value={activeColor}
                    onChange={(e) => setActiveColor(e.target.value)}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-400 via-green-400 to-blue-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* 3. Global parameters (Sliders) */}
          <div className="space-y-4 pt-2 border-t border-slate-400/10">
            <div className="flex items-center gap-1.5">
              <Sliders className="w-3.5 h-3.5 text-neutral-400" />
              <label className="text-[11px] font-bold tracking-widest uppercase text-neutral-400 font-mono">
                Drawing Calibration
              </label>
            </div>

            {/* Brush Weight */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-semibold text-neutral-500 dark:text-neutral-400">STROKE WEIGHT</span>
                <span className="font-mono text-neutral-400">{weight}px</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="12"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>

            {/* Render Speed */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-[10px]">
                <span className="font-semibold text-neutral-500 dark:text-neutral-400">VECTOR VELOCITY</span>
                <span className="font-mono text-neutral-400">x{speed.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="0.2"
                max="3.0"
                step="0.1"
                value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
            </div>
          </div>

          {/* 4. Mode-Specific Options Panels */}
          <div className="space-y-4 pt-4 border-t border-slate-400/10">
            <label className="text-[10px] font-bold tracking-widest uppercase text-neutral-400 font-mono block">
              {activeMode.toUpperCase()} SETTINGS
            </label>

            {/* Walkers Specific settings */}
            {activeMode === 'walkers' && (
              <div className="p-3 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 text-[10px] space-y-2 text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-1.5 font-bold text-neutral-700 dark:text-neutral-300">
                  <Info className="w-3.5 h-3.5 text-indigo-400" />
                  <span>LÉVY FLIGHT MOTION</span>
                </div>
                <p className="leading-relaxed">
                  Walkers calculate continuous step vectors. 94% of steps represent local cellular exploration, while 6% execute sudden, massive quantum jumps (Lévy flight), drawing gorgeous organic lightning or vine networks.
                </p>
              </div>
            )}

            {/* Forces & Gravity Settings */}
            {activeMode === 'forces' && (
              <div className="space-y-3.5">
                {/* Gravity Strength */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-semibold text-neutral-500 dark:text-neutral-400">CURSOR ATTRACTION</span>
                    <span className="font-mono text-neutral-400">{options.attractionStrength.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.5"
                    step="0.1"
                    value={options.attractionStrength}
                    onChange={(e) => updateOption('attractionStrength', parseFloat(e.target.value))}
                    className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Downward Gravity */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-semibold text-neutral-500 dark:text-neutral-400">ENVIRONMENTAL GRAVITY</span>
                    <span className="font-mono text-neutral-400">{options.downwardGravity.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="-1.0"
                    max="1.5"
                    step="0.1"
                    value={options.downwardGravity}
                    onChange={(e) => updateOption('downwardGravity', parseFloat(e.target.value))}
                    className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Wind Force */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-semibold text-neutral-500 dark:text-neutral-400">CROSSWIND INTENSITY</span>
                    <span className="font-mono text-neutral-400">{options.windForce.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="-1.5"
                    max="1.5"
                    step="0.1"
                    value={options.windForce}
                    onChange={(e) => updateOption('windForce', parseFloat(e.target.value))}
                    className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Oscillation & Waves Settings */}
            {activeMode === 'waves' && (
              <div className="space-y-4">
                
                {/* Wave Style selection */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-semibold text-neutral-400 block uppercase">OSCILLATING STYLE</span>
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => updateOption('waveStyle', 'SineRibbon')}
                      className={`p-2 rounded text-[10px] font-bold tracking-wide uppercase border text-center transition-all ${
                        options.waveStyle === 'SineRibbon'
                          ? 'bg-indigo-500/10 border-indigo-500 text-indigo-500'
                          : 'bg-transparent border-neutral-300/30 text-neutral-500 dark:text-neutral-400 hover:border-neutral-500/30'
                      }`}
                    >
                      Sine Ribbon
                    </button>
                    <button
                      onClick={() => updateOption('waveStyle', 'PendulumOrbit')}
                      className={`p-2 rounded text-[10px] font-bold tracking-wide uppercase border text-center transition-all ${
                        options.waveStyle === 'PendulumOrbit'
                          ? 'bg-indigo-500/10 border-indigo-500 text-indigo-500'
                          : 'bg-transparent border-neutral-300/30 text-neutral-500 dark:text-neutral-400 hover:border-neutral-500/30'
                      }`}
                    >
                      Pendulum
                    </button>
                  </div>
                </div>

                {/* Frequency */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-semibold text-neutral-500 dark:text-neutral-400">FREQUENCY (RATE)</span>
                    <span className="font-mono text-neutral-400">{options.waveFrequency.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={options.waveFrequency}
                    onChange={(e) => updateOption('waveFrequency', parseFloat(e.target.value))}
                    className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>

                {/* Amplitude */}
                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="font-semibold text-neutral-500 dark:text-neutral-400">AMPLITUDE (WIDTH)</span>
                    <span className="font-mono text-neutral-400">{options.waveAmplitude.toFixed(1)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.2"
                    max="2.5"
                    step="0.1"
                    value={options.waveAmplitude}
                    onChange={(e) => updateOption('waveAmplitude', parseFloat(e.target.value))}
                    className="w-full h-1 bg-black/10 dark:bg-white/10 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
                </div>
              </div>
            )}

            {/* Particle Systems Emitter settings */}
            {activeMode === 'bursts' && (
              <div className="space-y-4">
                
                {/* Geometric shapes Selection */}
                <div className="space-y-1.5">
                  <span className="text-[9px] font-semibold text-neutral-400 block uppercase">GEOMETRIC FORM</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['random', 'circle', 'ring', 'triangle', 'square', 'star'].map((shape) => (
                      <button
                        key={shape}
                        onClick={() => updateOption('burstShape', shape)}
                        className={`p-1.5 rounded text-[9px] font-bold tracking-wide uppercase border text-center transition-all ${
                          options.burstShape === shape
                            ? 'bg-indigo-500/10 border-indigo-500 text-indigo-500'
                            : 'bg-transparent border-neutral-300/30 text-neutral-500 dark:text-neutral-400 hover:border-neutral-500/30'
                        }`}
                      >
                        {shape}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Clear/Reset Canvas Button */}
        <div className="pt-4 border-t border-slate-400/20">
          <button
            onClick={onClear}
            className="w-full py-2.5 px-4 rounded-xl border border-rose-500/25 text-rose-500 hover:bg-rose-500/10 font-display font-semibold tracking-wide text-xs transition duration-200 shadow-sm"
          >
            Wipe Active Canvas / Borrar Lienzo
          </button>
        </div>

      </div>

      {/* Floating Sidebar Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-1/2 -translate-y-1/2 left-full -ml-[1px] p-2 py-6 rounded-r-xl border-y border-r border-slate-400/20 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-md text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 shadow-md cursor-pointer transition-all duration-300"
      >
        {isOpen ? <ChevronLeft className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
      </button>

    </div>
  );
}
