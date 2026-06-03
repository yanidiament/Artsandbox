// Forces & Gravity Engine
// Concepts: Newtonian physics integration (F = M * A), gravitational attraction, constant force systems (wind/gravity), and friction damping

class Particle {
  constructor(x, y, color, weight, speedMultiplier) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.vx = (Math.random() - 0.5) * 6;
    this.vy = (Math.random() - 0.5) * 6;
    this.ax = 0;
    this.ay = 0;
    this.color = color;
    this.weight = weight;
    this.speed = speedMultiplier || 1.0;
    this.life = Math.random() * 100 + 80;
    this.maxLife = this.life;
    this.drag = 0.98; // Friction factor
  }

  applyForce(fx, fy) {
    this.ax += fx;
    this.ay += fy;
  }

  update(ctx, targetX, targetY, attractionStrength, downwardGravity, windForce) {
    if (this.life <= 0) return false;

    this.prevX = this.x;
    this.prevY = this.y;

    // 1. Calculate Mouse Attraction Force (Newton's Gravity Approximation)
    const dx = targetX - this.x;
    const dy = targetY - this.y;
    const distanceSq = dx * dx + dy * dy + 100; // soft distance squared to prevent infinite acceleration
    const distance = Math.sqrt(distanceSq);
    
    if (distance > 2) {
      // Force proportional to 1/d, scaled by user setting
      const forceMag = (attractionStrength * 3.5) / distance;
      const forceX = (dx / distance) * forceMag;
      const forceY = (dy / distance) * forceMag;
      this.applyForce(forceX, forceY);
    }

    // 2. Apply Simulated Environmental Forces (Wind & Downward Gravity)
    this.applyForce(windForce * 0.15, downwardGravity * 0.1);

    // 3. Velocity Integration (Euler Method)
    this.vx += this.ax;
    this.vy += this.ay;

    // Apply speed scaling
    this.vx *= this.speed;
    this.vy *= this.speed;

    // Apply friction damping
    this.vx *= this.drag;
    this.vy *= this.drag;

    // Update coordinates
    this.x += this.vx;
    this.y += this.vy;

    // Clear acceleration accumulator
    this.ax = 0;
    this.ay = 0;

    // Draw segment on persistent canvas
    ctx.beginPath();
    ctx.moveTo(this.prevX, this.prevY);
    ctx.lineTo(this.x, this.y);

    const lifeRatio = this.life / this.maxLife;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.weight * lifeRatio;
    ctx.lineCap = 'round';
    ctx.stroke();

    this.life -= 1;
    return true;
  }
}

export default class ParticleFlowSystem {
  constructor() {
    this.particles = [];
    this.lastSpawnTime = 0;
  }

  // Spawn flowing particles
  spawn(x, y, color, weight, speedMultiplier) {
    // Limit spawn density to avoid lagging, but enough for thick trails
    const now = Date.now();
    if (now - this.lastSpawnTime < 16) return; // Cap at 60fps spawning
    this.lastSpawnTime = now;

    // Spawn 2 to 4 particles per movement event
    const spawnCount = Math.floor(Math.random() * 3) + 2;
    for (let i = 0; i < spawnCount; i++) {
      this.particles.push(new Particle(x, y, color, weight, speedMultiplier));
    }
  }

  // Update all particles with environment settings
  update(ctx, targetX, targetY, options = {}) {
    if (this.particles.length === 0) return false;

    const attractionStrength = options.attractionStrength !== undefined ? options.attractionStrength : 0.5;
    const downwardGravity = options.downwardGravity !== undefined ? options.downwardGravity : 0.2;
    const windForce = options.windForce !== undefined ? options.windForce : 0.1;

    this.particles = this.particles.filter(particle => 
      particle.update(ctx, targetX, targetY, attractionStrength, downwardGravity, windForce)
    );

    return this.particles.length > 0;
  }

  clear() {
    this.particles = [];
  }
}
