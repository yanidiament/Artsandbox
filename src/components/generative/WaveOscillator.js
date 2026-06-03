// Oscillation & Waves Engine
// Concepts: Simple harmonic motion, angular velocity/acceleration, wave superposition, and double-pendulum-like orbits

class WaveAgent {
  constructor(x, y, color, weight, speedMultiplier, type) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.color = color;
    this.weight = weight;
    this.speed = speedMultiplier || 1.0;
    this.type = type || 'SineRibbon'; // 'SineRibbon' or 'PendulumOrbit'
    
    // Wave parameters
    this.phase = Math.random() * Math.PI * 2;
    this.frequency = Math.random() * 0.2 + 0.1;
    this.amplitude = Math.random() * 30 + 20;
    this.life = Math.random() * 80 + 60;
    this.maxLife = this.life;

    // Jointed Pendulum parameters
    this.angle1 = Math.random() * Math.PI * 2;
    this.angle2 = Math.random() * Math.PI * 2;
    this.speed1 = (Math.random() * 0.08 + 0.04) * (Math.random() < 0.5 ? 1 : -1);
    this.speed2 = (Math.random() * 0.16 + 0.08) * (Math.random() < 0.5 ? 1 : -1);
    this.arm1 = Math.random() * 25 + 15;
    this.arm2 = Math.random() * 15 + 10;
  }

  update(ctx, targetX, targetY, freqScale, ampScale) {
    if (this.life <= 0) return false;

    this.prevX = this.x;
    this.prevY = this.y;

    if (this.type === 'SineRibbon') {
      // 1. Draw sine waves oscillating perpendicular to the mouse cursor anchor
      this.phase += this.frequency * freqScale * this.speed;
      
      // Calculate offset based on sine wave
      const offset = Math.sin(this.phase) * this.amplitude * ampScale;
      
      // Gradually move the agent toward the target mouse position
      this.x += (targetX - this.x) * 0.12;
      this.y += (targetY - this.y) * 0.12;

      // Draw the wave trace
      const drawX = this.x + Math.cos(this.phase) * offset * 0.4;
      const drawY = this.y + Math.sin(this.phase) * offset * 0.4;

      ctx.beginPath();
      ctx.moveTo(this.prevX, this.prevY);
      ctx.lineTo(drawX, drawY);
    } else {
      // 2. Draw dual-pendulum orbit traces centered on the cursor
      this.angle1 += this.speed1 * freqScale * this.speed;
      this.angle2 += this.speed2 * freqScale * this.speed;

      // Center shifts towards target cursor
      this.x += (targetX - this.x) * 0.08;
      this.y += (targetY - this.y) * 0.08;

      // First joint coordinate
      const x1 = this.x + Math.cos(this.angle1) * this.arm1 * ampScale;
      const y1 = this.y + Math.sin(this.angle1) * this.arm1 * ampScale;

      // Second joint (tip) coordinate
      const x2 = x1 + Math.cos(this.angle2) * this.arm2 * ampScale;
      const y2 = y1 + Math.sin(this.angle2) * this.arm2 * ampScale;

      // Draw trace of the pendulum tip
      ctx.beginPath();
      // On first frame, jump to position to avoid a long starting line
      if (this.life === this.maxLife) {
        this.prevX = x2;
        this.prevY = y2;
      }
      ctx.moveTo(this.prevX, this.prevY);
      ctx.lineTo(x2, y2);

      // Save tip coordinate as the previous point for next frame
      this.prevX = x2;
      this.prevY = y2;
    }

    const lifeRatio = this.life / this.maxLife;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.weight * lifeRatio;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    this.life -= 1;
    // For pendulum, we preserve coordinates differently
    if (this.type === 'SineRibbon') {
      this.x = this.x; 
      this.y = this.y;
    } else {
      // Tip position is saved
    }

    return true;
  }
}

export default class WaveOscillatorSystem {
  constructor() {
    this.agents = [];
  }

  // Spawn oscillating agents
  spawn(x, y, color, weight, speedMultiplier, waveStyle) {
    const style = waveStyle || 'SineRibbon'; // 'SineRibbon' or 'PendulumOrbit'
    
    // Spawn 2 to 3 waves/pendulums to intertwine
    const count = style === 'SineRibbon' ? 3 : 2;
    for (let i = 0; i < count; i++) {
      this.agents.push(new WaveAgent(x, y, color, weight, speedMultiplier, style));
    }
  }

  // Update oscillating loops
  update(ctx, targetX, targetY, options = {}) {
    if (this.agents.length === 0) return false;

    const freqScale = options.frequency !== undefined ? options.frequency : 1.0;
    const ampScale = options.amplitude !== undefined ? options.amplitude : 1.0;

    // Filter out expired loops
    this.agents = this.agents.filter(agent => 
      agent.update(ctx, targetX, targetY, freqScale, ampScale)
    );

    return this.agents.length > 0;
  }

  clear() {
    this.agents = [];
  }
}
