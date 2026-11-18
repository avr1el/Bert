export interface SparkleParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  life: number;
  decay: number;
  color: string;
  phase: number;
}

const PINK_SPARKLE_COLORS = [
  '#ec4899',
  '#f472b6',
  '#db2777',
  '#fb7185',
  '#f9a8d4',
];

export function shouldSpawnSparkle(
  lastX: number,
  lastY: number,
  nextX: number,
  nextY: number,
  minDistancePx = 10,
): boolean {
  const dx = nextX - lastX;
  const dy = nextY - lastY;
  return dx * dx + dy * dy >= minDistancePx * minDistancePx;
}

export function createSparkleParticle(
  x: number,
  y: number,
  seed = Math.random(),
): SparkleParticle {
  const angle = seed * Math.PI * 2;
  const speed = 0.25 + (seed * 0.55);
  const colorIndex = Math.floor(seed * PINK_SPARKLE_COLORS.length) % PINK_SPARKLE_COLORS.length;
  return {
    x: x + Math.cos(angle) * 3,
    y: y + Math.sin(angle) * 3,
    vx: Math.cos(angle) * speed * 0.5,
    vy: 0.35 + seed * 0.65,
    size: 4.5 + (seed * 5.5),
    rotation: seed * Math.PI,
    rotationSpeed: (seed - 0.5) * 0.08,
    life: 1,
    decay: 0.022 + (seed * 0.014),
    color: PINK_SPARKLE_COLORS[colorIndex],
    phase: seed * Math.PI * 2,
  };
}

export function stepSparkleParticles(
  particles: SparkleParticle[],
  dtFactor = 1,
  maxParticles = 45,
): SparkleParticle[] {
  const next: SparkleParticle[] = [];
  const startIdx = Math.max(0, particles.length - maxParticles);

  for (let i = startIdx; i < particles.length; i += 1) {
    const p = particles[i];
    const nextLife = p.life - p.decay * dtFactor;
    if (nextLife <= 0) continue;

    next.push({
      ...p,
      x: p.x + p.vx * dtFactor,
      y: p.y + p.vy * dtFactor,
      rotation: p.rotation + p.rotationSpeed * dtFactor,
      life: nextLife,
      phase: p.phase + 0.25 * dtFactor,
    });
  }

  return next;
}
