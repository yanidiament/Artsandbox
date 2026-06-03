// Particle Systems Engine
// Concepts: Mass conservation, radial particle explosions, spin, decay, and geometric stamping

class BurstShape {
  constructor(x, y, color, weight, speedMultiplier, shapeType) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.weight = weight;
    this.speed = speedMultiplier || 1.0;
    this.shape = shapeType || 'circle'; // 'circle', 'ring', 'square', 'triangle', 'star', 'hexagon'
    
    // Random direction and velocity
    const angle = Math.random() * Math.PI * 2;
    const speed = (Math.random() * 5 + 2) * this.speed;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;

    // Size parameters
    this.size = Math.random() * 15 + 8;
    this.growth = Math.random() * 0.4 + 0.1; // Expand over time

    // Spin parameters
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.15;

    // Lifespan
    this.life = Math.random() * 40 + 30;
    this.maxLife = this.life;
    this.isFilled = Math.random() < 0.4; // 40% chance filled, 60% stroke outline
  }

  drawShape(ctx, x, y, size) {
    ctx.beginPath();
    const type = this.shape;

    if (type === 'circle' || type === 'ring') {
      ctx.arc(x, y, size, 0, Math.PI * 2);
    } else if (type === 'square') {
      ctx.rect(x - size, y - size, size * 2, size * 2);
    } else if (type === 'triangle') {
      ctx.moveTo(x + Math.cos(0 - Math.PI/2) * size, y + Math.sin(0 - Math.PI/2) * size);
      ctx.lineTo(x + Math.cos(Math.PI*2/3 - Math.PI/2) * size, y + Math.sin(Math.PI*2/3 - Math.PI/2) * size);
      ctx.lineTo(x + Math.cos(Math.PI*4/3 - Math.PI/2) * size, y + Math.sin(Math.PI*4/3 - Math.PI/2) * size);
      ctx.closePath();
    } else if (type === 'hexagon') {
      for (let i = 0; i < 6; i++) {
        const angle = (i * Math.PI) / 3;
        const px = x + Math.cos(angle) * size;
        const py = y + Math.sin(angle) * size;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    } else if (type === 'star') {
      const points = 5;
      const innerRadius = size * 0.4;
      const outerRadius = size;
      for (let i = 0; i < points * 2; i++) {
        const r = i % 2 === 0 ? outerRadius : innerRadius;
        const currAngle = (i * Math.PI) / points;
        const px = x + Math.cos(currAngle) * r;
        const py = y + Math.sin(currAngle) * r;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
    }
  }

  update(ctx) {
    if (this.life <= 0) return false;

    // Apply linear motion
    this.x += this.vx;
    this.y += this.vy;

    // Apply rotation
    this.rotation += this.rotationSpeed;

    // Grow or shrink size
    this.size += this.growth;

    // Drawing configuration
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);

    const lifeRatio = this.life / this.maxLife;

    // Configure stroke & fill
    ctx.strokeStyle = this.color;
    ctx.fillStyle = this.color;
    ctx.lineWidth = this.weight * 0.5 * lifeRatio;

    // Drawing context
    this.drawShape(ctx, 0, 0, this.size);

    if (this.shape === 'ring') {
      ctx.stroke();
    } else if (this.isFilled) {
      ctx.globalAlpha = 0.25 * lifeRatio; // semi-transparent fills
      ctx.fill();
      ctx.globalAlpha = 1.0;
      ctx.stroke();
    } else {
      ctx.stroke();
    }

    ctx.restore();

    this.life -= 1;
    return true;
  }
}

export default class BurstSystem {
  constructor() {
    this.shapes = [];
    this.lastSpawnTime = 0;
  }

  // Spawn geometric burst shapes
  spawn(x, y, color, weight, speedMultiplier, selectedShape) {
    // Throttle burst frequency slightly to allow space between clusters
    const now = Date.now();
    if (now - this.lastSpawnTime < 60) return; 
    this.lastSpawnTime = now;

    // Select a shape (or pick random one)
    const shapes = ['circle', 'ring', 'square', 'triangle', 'star', 'hexagon'];
    const activeShape = selectedShape && selectedShape !== 'random' 
      ? selectedShape 
      : shapes[Math.floor(Math.random() * shapes.length)];

    // Spawn a geometric burst of 3 to 7 particles
    const burstSize = Math.floor(Math.random() * 4) + 3;
    for (let i = 0; i < burstSize; i++) {
      this.shapes.push(new BurstShape(x, y, color, weight, speedMultiplier, activeShape));
    }
  }

  update(ctx) {
    if (this.shapes.length === 0) return false;

    // Update particles and remove dead ones
    this.shapes = this.shapes.filter(shape => shape.update(ctx));

    return this.shapes.length > 0;
  }

  clear() {
    this.shapes = [];
  }
}
