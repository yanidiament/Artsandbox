// Engine Manager
// Orchestrates active physics engines and redirects mouse drawing streams

import RandomWalkersSystem from './RandomWalkers';
import ParticleFlowSystem from './ParticleFlow';
import WaveOscillatorSystem from './WaveOscillator';
import BurstSystem from './BurstSystem';

export default class EngineManager {
  constructor() {
    this.systems = {
      walkers: new RandomWalkersSystem(),
      forces: new ParticleFlowSystem(),
      waves: new WaveOscillatorSystem(),
      bursts: new BurstSystem()
    };
    
    this.activeMode = 'walkers'; // Default mode
    this.isDragging = false;
    this.mouseX = 0;
    this.mouseY = 0;
  }

  setMode(mode) {
    if (this.systems[mode]) {
      this.activeMode = mode;
    }
  }

  // Triggered on mouse click/drag start
  startDrawing(x, y, options = {}) {
    this.isDragging = true;
    this.mouseX = x;
    this.mouseY = y;
    
    // Immediately spawn a starting seed in the active engine
    this.spawnAt(x, y, options);
  }

  // Triggered during drag motion
  drag(x, y, options = {}) {
    this.mouseX = x;
    this.mouseY = y;
    
    if (this.isDragging) {
      this.spawnAt(x, y, options);
    }
  }

  // Triggered on mouse release
  stopDrawing() {
    this.isDragging = false;
  }

  // Helper to spawn elements in the active system
  spawnAt(x, y, options = {}) {
    const color = options.color || '#3b82f6';
    const weight = options.weight !== undefined ? options.weight : 2;
    const speed = options.speed !== undefined ? options.speed : 1.0;

    switch (this.activeMode) {
      case 'walkers':
        this.systems.walkers.spawn(x, y, color, weight, speed);
        break;
      case 'forces':
        this.systems.forces.spawn(x, y, color, weight, speed);
        break;
      case 'waves':
        // Pass oscillation style: 'SineRibbon' or 'PendulumOrbit'
        const waveStyle = options.waveStyle || 'SineRibbon';
        this.systems.waves.spawn(x, y, color, weight, speed, waveStyle);
        break;
      case 'bursts':
        // Pass geometric shape constraint: 'circle', 'ring', 'square', 'triangle', 'star', 'hexagon', 'random'
        const burstShape = options.burstShape || 'random';
        this.systems.bursts.spawn(x, y, color, weight, speed, burstShape);
        break;
    }
  }

  // Execute tick updates for all engines (drawn onto persistent canvas context)
  update(ctx, options = {}) {
    let hasUpdates = false;

    // Tick the vectors/random walkers
    const walkersActive = this.systems.walkers.update(ctx);
    
    // Tick the force particles (requires current cursor coordinates)
    const forceOptions = {
      attractionStrength: options.attractionStrength,
      downwardGravity: options.downwardGravity,
      windForce: options.windForce
    };
    const forcesActive = this.systems.forces.update(ctx, this.mouseX, this.mouseY, forceOptions);
    
    // Tick the wave oscillators (requires current cursor coordinates)
    const waveOptions = {
      frequency: options.waveFrequency,
      amplitude: options.waveAmplitude
    };
    const wavesActive = this.systems.waves.update(ctx, this.mouseX, this.mouseY, waveOptions);
    
    // Tick the geometric bursts
    const burstsActive = this.systems.bursts.update(ctx);

    hasUpdates = walkersActive || forcesActive || wavesActive || burstsActive || this.isDragging;
    return hasUpdates;
  }

  // Wipe all memory states across engines
  clear() {
    this.systems.walkers.clear();
    this.systems.forces.clear();
    this.systems.waves.clear();
    this.systems.bursts.clear();
    this.isDragging = false;
  }
}
