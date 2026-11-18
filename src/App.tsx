import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MotionConfig } from 'motion/react';
import FloatingHearts from './components/FloatingHearts';
import HeroSection from './components/HeroSection';
import MessageSection from './components/MessageSection';
import PolaroidModal from './components/PolaroidModal';
import SparkleCursorTrail from './components/SparkleCursorTrail';
import TopBar from './components/TopBar';
import { PROFILE_DATA } from './constants/data';
import {
  calculateAge,
  formatOrdinal,
  getLatestBirthdayYear,
} from './utils/tributeState';

export default function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const userPausedRef = useRef(false);

  const { age, ordinalAge, birthdayDateLabel, brandLabel } = useMemo(() => {
    const now = new Date();
    const computedAge = calculateAge(PROFILE_DATA.birthDate, now);
    const computedOrdinal = formatOrdinal(computedAge);
    const latestYear = getLatestBirthdayYear(PROFILE_DATA.birthDate, now);
    return {
      age: computedAge,
      ordinalAge: computedOrdinal,
      birthdayDateLabel: `${PROFILE_DATA.birthdayDayMonth}, ${latestYear}`,
      brandLabel: `${PROFILE_DATA.recipientName}'s ${computedOrdinal}`,
    };
  }, []);

  const attemptPlayAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || userPausedRef.current) return;
    audio.volume = 0.5;
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch(() => {
        setIsPlaying(false);
      });
  }, []);

  const toggleAudio = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      userPausedRef.current = false;
      attemptPlayAudio();
    } else {
      userPausedRef.current = true;
      audio.pause();
      setIsPlaying(false);
    }
  }, [attemptPlayAudio]);

  const handleOpenMemories = useCallback(() => {
    setIsModalOpen(true);
    if (!userPausedRef.current) {
      attemptPlayAudio();
    }
  }, [attemptPlayAudio]);

  // Play Magnolia immediately when the website opens, with automatic first-gesture fallback
  // if browser autoplay policy initially blocks unmuted playback.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    attemptPlayAudio();

    const unlockOnFirstGesture = () => {
      if (!userPausedRef.current && audio.paused) {
        attemptPlayAudio();
      }
      if (!audio.paused || userPausedRef.current) {
        window.removeEventListener('pointerdown', unlockOnFirstGesture);
        window.removeEventListener('keydown', unlockOnFirstGesture);
        window.removeEventListener('touchstart', unlockOnFirstGesture);
      }
    };

    window.addEventListener('pointerdown', unlockOnFirstGesture, { passive: true });
    window.addEventListener('keydown', unlockOnFirstGesture, { passive: true });
    window.addEventListener('touchstart', unlockOnFirstGesture, { passive: true });

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
      window.removeEventListener('pointerdown', unlockOnFirstGesture);
      window.removeEventListener('keydown', unlockOnFirstGesture);
      window.removeEventListener('touchstart', unlockOnFirstGesture);
    };
  }, [attemptPlayAudio]);

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen w-full bg-[#fff0f6]">
        <audio ref={audioRef} id="bg-music" autoPlay loop preload="auto">
          <source src={PROFILE_DATA.musicSrc} type="audio/mpeg" />
        </audio>

        <FloatingHearts isPaused={isModalOpen} />
        <SparkleCursorTrail />

        <TopBar
          brandLabel={brandLabel}
          isPlaying={isPlaying}
          onToggleAudio={toggleAudio}
          onOpenMemories={handleOpenMemories}
        />

        <main>
          <HeroSection
            age={age}
            ordinalAge={ordinalAge}
            birthdayDateLabel={birthdayDateLabel}
            isModalOpen={isModalOpen}
          />
          <MessageSection
            age={age}
            birthdayDateLabel={birthdayDateLabel}
            isRevealed={isRevealed}
            onReveal={() => setIsRevealed(true)}
            onOpenModal={handleOpenMemories}
          />
        </main>

        <footer className="bg-[#ffeaf3] border-t border-pink-300/60 py-6 px-4 text-center text-xs text-[#831843]">
          <p>
            {PROFILE_DATA.heroHeadline} {PROFILE_DATA.recipientFullName} · {birthdayDateLabel}
          </p>
        </footer>

        <PolaroidModal
          isOpen={isModalOpen}
          isPlaying={isPlaying}
          onToggleAudio={toggleAudio}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </MotionConfig>
  );
}
