// Vectors & Random Walks Engine
// Concepts: Vector addition, Lévy flight distributions, organic branching, and alpha decay paths

class Walker {
  constructor(x, y, color, weight, speedMultiplier) {
    this.x = x;
    this.y = y;
    this.prevX = x;
    this.prevY = y;
    this.color = color;
    this.weight = weight;
    this.speed = speedMultiplier || 1.0;
    this.life = Math.random() * 80 + 40; // Lifespan in frames
    this.maxLife = this.life;
    this.angle = Math.random() * Math.PI * 2;
  }

  update(ctx) {
    if (this.life <= 0) return false;

    // Save previous state for continuous line drawing
    this.prevX = this.x;
    this.prevY = this.y;

    // 1. Organic direction changes (Perlin-noise-like angular drift)
    this.angle += (Math.random() - 0.5) * 0.9;

    // 2. Lévy Flight distribution: mostly small steps, occasionally a very long step
    const r1 = Math.random();
    const r2 = Math.random();
    let stepSize = 1.5;

    if (r1 < 0.06) {
      // 6% chance of a sudden large leap (Lévy flight)
      stepSize = r2 * 22 * this.speed;
    } else {
      // 94% chance of organic local crawl
      stepSize = r2 * 3.5 * this.speed;
    }

    // Apply vector movement
    this.x += Math.cos(this.angle) * stepSize;
    this.y += Math.sin(this.angle) * stepSize;

    // Draw segment on persistent canvas
    ctx.beginPath();
    ctx.moveTo(this.prevX, this.prevY);
    ctx.lineTo(this.x, this.y);

    // Fade the color weight slightly as it reaches the end of its life
    const lifeRatio = this.life / this.maxLife;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.weight * lifeRatio;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.stroke();

    this.life -= 1;
    return true;
  }
}

export default class RandomWalkersSystem {
  constructor() {
    this.walkers = [];
  }

  // Spawn a cluster of walkers at the cursor coordinate
  spawn(x, y, color, weight, speedMultiplier) {
    // Spawn 3 to 6 walkers per move to create beautiful organic bundles
    const count = Math.floor(Math.random() * 4) + 3;
    for (let i = 0; i < count; i++) {
      this.walkers.push(new Walker(x, y, color, weight, speedMultiplier));
    }
  }

  // Update all active walkers, drawing them to the offscreen buffer
  update(ctx) {
    if (this.walkers.length === 0) return false;

    // Update and filter out dead walkers
    this.walkers = this.walkers.filter(walker => walker.update(ctx));

    return this.walkers.length > 0;
  }

  // Wipe states
  clear() {
    this.walkers = [];
  }
}
