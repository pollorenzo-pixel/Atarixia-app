export class GrainCircle {
  constructor(canvas, options = {}) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext('2d', { alpha: true });
    this.options = {
      innerVoidRatio: 0.2,
      breathDurationMs: 7000,
      breathScale: 0.045,
      baseFadeAlpha: 0.34,
      particleAlpha: 0.5,
      ...options
    };
    this.dpr = 1;
    this.width = 0;
    this.height = 0;
    this.cx = 0;
    this.cy = 0;
    this.maxRadius = 0;
    this.particles = [];
    this.frameId = null;
    this.lastFrameTs = 0;
    this.audioAmplitude = 0;
    this.audioReactiveStrength = 0.012;
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
    this.tick = this.tick.bind(this);
    this.build();
  }

  build() {
    if (!this.canvas || !this.ctx) return;
    this.resize();
    this.createParticles();
    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  createParticles() {
    const minDimension = Math.max(1, Math.min(this.width, this.height));
    const mobile = minDimension < 460;
    const count = mobile ? 1700 : 2500;
    const inner = this.options.innerVoidRatio;
    this.particles = Array.from({ length: count }, () => {
      const radialBias = Math.pow(Math.random(), 0.62);
      const radialNorm = inner + (1 - inner) * radialBias;
      return {
        xJitter: (Math.random() - 0.5) * 0.22,
        yJitter: (Math.random() - 0.5) * 0.22,
        radialNorm,
        radialBreatheOffset: (Math.random() - 0.5) * 0.042,
        angle: Math.random() * Math.PI * 2,
        drift: (Math.random() - 0.5) * 0.004,
        wander: 0.2 + Math.random() * 0.9,
        pulse: 0.05 + Math.random() * 0.16,
        seed: Math.random() * Math.PI * 2,
        size: 0.35 + Math.random() * 0.8
      };
    });
  }

  resize() {
    if (!this.canvas || !this.ctx) return;
    const rect = this.canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(width * this.dpr);
    this.canvas.height = Math.round(height * this.dpr);
    this.width = width;
    this.height = height;
    this.cx = width * 0.5;
    this.cy = height * 0.5;
    this.maxRadius = Math.max(1, Math.min(width, height) * 0.5);
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.ctx.fillStyle = 'rgb(2,2,2)';
    this.ctx.fillRect(0, 0, this.width, this.height);
  }

  start() {
    if (!this.canvas || !this.ctx || this.frameId) return;
    this.lastFrameTs = performance.now();
    this.frameId = requestAnimationFrame(this.tick);
  }

  stop({ clear = false } = {}) {
    if (this.frameId) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    if (clear && this.ctx) {
      this.ctx.clearRect(0, 0, this.width, this.height);
    }
  }

  destroy() {
    this.stop({ clear: true });
    document.removeEventListener('visibilitychange', this.handleVisibilityChange);
    this.particles = [];
  }

  setAudioAmplitude(value) {
    const clamped = Math.max(0, Math.min(1, Number.isFinite(value) ? value : 0));
    this.audioAmplitude += (clamped - this.audioAmplitude) * 0.08;
  }

  handleVisibilityChange() {
    if (document.hidden) {
      this.stop();
      return;
    }
    this.start();
  }

  tick(now) {
    const deltaMs = Math.min(40, now - this.lastFrameTs || 16.67);
    this.lastFrameTs = now;
    const dt = deltaMs / 1000;
    this.render(now, dt);
    this.frameId = requestAnimationFrame(this.tick);
  }

  render(now, dt) {
    const { ctx } = this;
    if (!ctx) return;
    const t = now / 1000;
    const cycle = (now % this.options.breathDurationMs) / this.options.breathDurationMs;
    const breath = Math.sin(cycle * Math.PI * 2);
    const breathScale = 1 + (breath * this.options.breathScale) + (this.audioAmplitude * this.audioReactiveStrength);

    ctx.fillStyle = `rgba(2,2,2,${this.options.baseFadeAlpha})`;
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.fillStyle = `rgba(255,255,255,${this.options.particleAlpha})`;
    const innerVoid = this.maxRadius * this.options.innerVoidRatio;

    for (let i = 0; i < this.particles.length; i += 1) {
      const p = this.particles[i];
      p.angle += (p.drift + ((Math.random() - 0.5) * 0.002)) * dt;
      const randomWalkX = ((Math.random() - 0.5) * p.wander);
      const randomWalkY = ((Math.random() - 0.5) * p.wander);
      p.xJitter = (p.xJitter * 0.85) + (randomWalkX * 0.15);
      p.yJitter = (p.yJitter * 0.85) + (randomWalkY * 0.15);

      const grainPulse = Math.sin((t * (0.35 + p.pulse)) + (p.seed * 1.2)) * 0.022;
      const radialNoise = (Math.sin((t * 0.17) + (p.seed * 1.9)) * 0.02) + grainPulse;
      const radius = this.maxRadius * (p.radialNorm + radialNoise + (breath * p.radialBreatheOffset)) * breathScale;
      if (radius <= innerVoid) continue;
      const angle = p.angle + (Math.sin((t * 0.28) + p.seed) * 0.008);
      const x = this.cx + (Math.cos(angle) * radius) + p.xJitter;
      const y = this.cy + (Math.sin(angle) * radius) + p.yJitter;
      ctx.beginPath();
      ctx.arc(x, y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}
