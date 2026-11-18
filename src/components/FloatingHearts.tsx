import type { CSSProperties } from 'react';

interface HeartSpec {
  id: number;
  leftPercent: number;
  sizePx: number;
  durationSec: number;
  delaySec: number;
  driftXPx: number;
  rotationDeg: number;
  opacity: number;
  color: string;
}

const FLOATING_HEARTS: HeartSpec[] = [
  { id: 1, leftPercent: 6, sizePx: 18, durationSec: 17, delaySec: -3, driftXPx: 22, rotationDeg: -10, opacity: 0.34, color: '#ec4899' },
  { id: 2, leftPercent: 13, sizePx: 26, durationSec: 21, delaySec: -12, driftXPx: -24, rotationDeg: 8, opacity: 0.24, color: '#f472b6' },
  { id: 3, leftPercent: 21, sizePx: 15, durationSec: 15, delaySec: -7, driftXPx: 16, rotationDeg: 14, opacity: 0.38, color: '#db2777' },
  { id: 4, leftPercent: 29, sizePx: 22, durationSec: 19, delaySec: -15, driftXPx: -18, rotationDeg: -6, opacity: 0.28, color: '#fb7185' },
  { id: 5, leftPercent: 37, sizePx: 16, durationSec: 16, delaySec: -2, driftXPx: 20, rotationDeg: 10, opacity: 0.32, color: '#f472b6' },
  { id: 6, leftPercent: 46, sizePx: 28, durationSec: 23, delaySec: -10, driftXPx: -26, rotationDeg: -12, opacity: 0.2, color: '#ec4899' },
  { id: 7, leftPercent: 54, sizePx: 14, durationSec: 14, delaySec: -6, driftXPx: 14, rotationDeg: 6, opacity: 0.36, color: '#db2777' },
  { id: 8, leftPercent: 62, sizePx: 24, durationSec: 20, delaySec: -17, driftXPx: -20, rotationDeg: 12, opacity: 0.26, color: '#f472b6' },
  { id: 9, leftPercent: 70, sizePx: 19, durationSec: 18, delaySec: -4, driftXPx: 24, rotationDeg: -8, opacity: 0.32, color: '#fb7185' },
  { id: 10, leftPercent: 78, sizePx: 25, durationSec: 22, delaySec: -13, driftXPx: -22, rotationDeg: 9, opacity: 0.25, color: '#ec4899' },
  { id: 11, leftPercent: 86, sizePx: 16, durationSec: 16, delaySec: -9, driftXPx: 18, rotationDeg: -14, opacity: 0.35, color: '#f472b6' },
  { id: 12, leftPercent: 93, sizePx: 21, durationSec: 19, delaySec: -1, driftXPx: -16, rotationDeg: 7, opacity: 0.28, color: '#db2777' },
  { id: 13, leftPercent: 17, sizePx: 20, durationSec: 20, delaySec: -18, driftXPx: 19, rotationDeg: -5, opacity: 0.27, color: '#fb7185' },
  { id: 14, leftPercent: 82, sizePx: 15, durationSec: 15, delaySec: -11, driftXPx: -15, rotationDeg: 11, opacity: 0.34, color: '#ec4899' },
];

interface FloatingHeartsProps {
  isPaused?: boolean;
}

export default function FloatingHearts({ isPaused = false }: FloatingHeartsProps) {
  return (
    <div
      aria-hidden="true"
      data-testid="floating-hearts-layer"
      className={`pointer-events-none fixed inset-0 z-[5] overflow-hidden ${
        isPaused ? 'hearts-paused' : ''
      }`}
    >
      {FLOATING_HEARTS.map((heart) => {
        const style = {
          left: `${heart.leftPercent}%`,
          top: 0,
          width: `${heart.sizePx}px`,
          height: `${heart.sizePx}px`,
          color: heart.color,
          '--duration': `${heart.durationSec}s`,
          '--delay': `${heart.delaySec}s`,
          '--drift-x': `${heart.driftXPx}px`,
          '--heart-rot': `${heart.rotationDeg}deg`,
          '--heart-opacity': heart.opacity,
        } as CSSProperties;

        return (
          <svg
            key={heart.id}
            viewBox="0 0 24 24"
            fill="currentColor"
            style={style}
            className="floating-heart absolute"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        );
      })}
    </div>
  );
}
