import { useEffect, useRef } from 'react';
import {
  createSparkleParticle,
  shouldSpawnSparkle,
  stepSparkleParticles,
  type SparkleParticle,
} from '../utils/sparkleTrail';

function drawFourPointStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  outerRadius: number,
  rotation: number,
  color: string,
  alpha: number,
) {
  const innerRadius = outerRadius * 0.34;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.globalAlpha = alpha;
  ctx.fillStyle = color;

  ctx.beginPath();
  for (let i = 0; i < 8; i += 1) {
    const r = i % 2 === 0 ? outerRadius : innerRadius;
    const angle = (i * Math.PI) / 4;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.fill();

  // Soft white-pink highlight core for subtle sparkle glints
  ctx.fillStyle = '#fff5f9';
  ctx.globalAlpha = alpha * 0.75;
  ctx.beginPath();
  ctx.arc(0, 0, Math.max(1, outerRadius * 0.2), 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

export default function SparkleCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isCoarsePointer) return;

    let particles: SparkleParticle[] = [];
    let rafId: number | null = null;
    let lastSpawnX = -999;
    let lastSpawnY = -999;
    let lastFrameTime = performance.now();

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resizeCanvas();

    const renderFrame = (now: number) => {
      const elapsedMs = Math.min(now - lastFrameTime, 48);
      lastFrameTime = now;
      const dtFactor = elapsedMs / 16.667;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      particles = stepSparkleParticles(particles, dtFactor, 45);

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];
        const twinkle = 0.72 + 0.28 * Math.sin(p.phase);
        const alpha = Math.max(0, Math.min(1, p.life * twinkle * 0.9));
        const radius = p.size * (0.55 + 0.45 * p.life);
        drawFourPointStar(ctx, p.x, p.y, radius, p.rotation, p.color, alpha);
      }

      if (particles.length > 0) {
        rafId = window.requestAnimationFrame(renderFrame);
      } else {
        rafId = null;
      }
    };

    const startLoopIfNeeded = () => {
      if (rafId === null) {
        lastFrameTime = performance.now();
        rafId = window.requestAnimationFrame(renderFrame);
      }
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      const { clientX, clientY } = event;

      if (!shouldSpawnSparkle(lastSpawnX, lastSpawnY, clientX, clientY, 10)) {
        return;
      }

      lastSpawnX = clientX;
      lastSpawnY = clientY;

      particles.push(createSparkleParticle(clientX, clientY, Math.random()));
      if (Math.random() > 0.45) {
        particles.push(createSparkleParticle(clientX, clientY, Math.random()));
      }

      startLoopIfNeeded();
    };

    window.addEventListener('resize', resizeCanvas, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('pointermove', handlePointerMove);
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      data-testid="sparkle-cursor-canvas"
      className="pointer-events-none fixed inset-0 z-[60]"
    />
  );
}
