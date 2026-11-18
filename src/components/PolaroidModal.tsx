import { useEffect, useState, type CSSProperties } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, ChevronRight, RotateCw, Volume2, VolumeX, X } from 'lucide-react';
import { POLAROID_DATA, PROFILE_DATA } from '../constants/data';
import { formatMemoryCounter, wrapMemoryIndex } from '../utils/tributeState';
import { ResilientImage } from './ResilientImage';

interface PolaroidModalProps {
  isOpen: boolean;
  isPlaying: boolean;
  onToggleAudio: () => void;
  onClose: () => void;
}

export default function PolaroidModal({
  isOpen,
  isPlaying,
  onToggleAudio,
  onClose,
}: PolaroidModalProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [slideDirection, setSlideDirection] = useState<1 | -1 | 0>(0);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSelectedIndex(null);
      setSlideDirection(0);
      setIsFlipped(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      } else if (selectedIndex !== null && event.key === 'ArrowRight') {
        setIsFlipped(false);
        setSlideDirection(1);
        setSelectedIndex((prev) =>
          prev === null ? 0 : wrapMemoryIndex(prev, 1, POLAROID_DATA.length),
        );
      } else if (selectedIndex !== null && event.key === 'ArrowLeft') {
        setIsFlipped(false);
        setSlideDirection(-1);
        setSelectedIndex((prev) =>
          prev === null ? 0 : wrapMemoryIndex(prev, -1, POLAROID_DATA.length),
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, onClose]);

  const activeMemory = selectedIndex !== null ? POLAROID_DATA[selectedIndex] : null;

  const handleSelectPhoto = (index: number) => {
    setSlideDirection(0);
    setSelectedIndex(index);
    setIsFlipped(false);
  };

  const handleStep = (delta: 1 | -1) => {
    if (selectedIndex === null) return;
    setIsFlipped(false);
    setSlideDirection(delta);
    setSelectedIndex(wrapMemoryIndex(selectedIndex, delta, POLAROID_DATA.length));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="memories-modal-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22, ease: 'easeOut' }}
          className="fixed inset-0 z-50 flex flex-col bg-[radial-gradient(circle_at_top,rgba(131,24,67,0.96)_0%,rgba(65,6,29,0.98)_100%)] text-[#fff9fc]"
          onClick={onClose}
        >
          {/* Compact single-row modal header bar */}
          <div
            className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 sm:px-6 py-2.5 border-b border-pink-200/15 shrink-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-baseline gap-2.5 min-w-0">
              <h2
                id="memories-modal-title"
                className="font-display-cupid text-xl sm:text-2xl text-pink-200 truncate"
              >
                {activeMemory ? activeMemory.caption : 'Memory Polaroids'}
              </h2>
              <span className="hidden sm:inline text-xs text-pink-100/75 whitespace-nowrap shrink-0">
                {activeMemory
                  ? `${formatMemoryCounter(selectedIndex!, POLAROID_DATA.length)} · ${activeMemory.subtitle}`
                  : `· ${POLAROID_DATA.length} keepsake moments`}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={onToggleAudio}
                aria-label={isPlaying ? `Pause ${PROFILE_DATA.musicTitle}` : `Play ${PROFILE_DATA.musicTitle}`}
                className="inline-flex h-9 items-center gap-1.5 rounded-full border border-pink-300/35 bg-pink-500/25 px-3 text-xs font-medium text-pink-50 cursor-pointer transition-colors hover:bg-pink-500/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300 whitespace-nowrap"
              >
                {isPlaying ? (
                  <Volume2 className="h-3.5 w-3.5 text-pink-200" aria-hidden="true" />
                ) : (
                  <VolumeX className="h-3.5 w-3.5 text-pink-200/80" aria-hidden="true" />
                )}
                <span className="hidden sm:inline">
                  {isPlaying ? 'Pause Music' : 'Play Magnolia'}
                </span>
              </button>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close memory gallery"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-pink-200/25 bg-pink-500/20 text-white cursor-pointer transition-colors hover:bg-pink-500/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Centered Polaroid container (mirrors original centered flex-wrap layout) */}
          <div
            className="flex-1 overflow-y-auto px-4 sm:px-8 py-5 flex flex-col"
            onClick={onClose}
          >
            <div
              className="my-auto mx-auto w-full max-w-[1060px] flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <AnimatePresence mode="wait">
                {selectedIndex === null ? (
                  <motion.div
                    key="polaroid-gallery"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.18 }}
                    className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 w-full py-2"
                  >
                    {POLAROID_DATA.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 28, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                          delay: index * 0.06,
                          duration: 0.34,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleSelectPhoto(index)}
                          aria-label={`Open memory ${item.indexLabel}: ${item.caption}`}
                          style={{ '--tilt': `${item.rotationDeg}deg` } as CSSProperties}
                          className="polaroid-card group relative flex w-[152px] sm:w-[215px] flex-col bg-[#fffaf8] p-2.5 sm:p-3 pb-4 sm:pb-5 rounded-sm border border-pink-200/75 text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
                        >
                          {/* Subtle translucent pink washi tape at top */}
                          <span
                            aria-hidden="true"
                            className="pointer-events-none absolute -top-2 left-1/2 -translate-x-1/2 h-4 w-12 sm:h-5 sm:w-16 rounded-xs bg-pink-300/75 shadow-xs"
                          />

                          {/* Lightweight gradient well + uncropped foreground photo */}
                          <div className="relative aspect-square w-full overflow-hidden rounded-xs bg-[radial-gradient(circle_at_center,#591231_0%,#2b0515_100%)] shadow-inner">
                            <ResilientImage
                              src={item.src}
                              alt={item.caption}
                              className="h-full w-full object-contain transition-transform duration-200 group-hover:scale-[1.03]"
                              fallbackLabel={item.caption}
                            />
                          </div>

                          <div className="mt-2.5 sm:mt-3.5 text-center">
                            <p className="font-handwriting text-base sm:text-xl text-[#831843] leading-snug">
                              {item.caption}
                            </p>
                            <p className="mt-0.5 text-[11px] sm:text-xs font-medium text-[#9d174d]/80">
                              {item.indexLabel} · {item.subtitle}
                            </p>
                          </div>
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                ) : (
                  <motion.div
                    key="polaroid-detail"
                    initial={{ opacity: 0, scale: 0.92, y: 16 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: 16 }}
                    transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-col items-center w-full max-w-md"
                  >
                    {/* Directional slide wrapper when stepping Prev / Next */}
                    <AnimatePresence mode="wait" initial={false}>
                      <motion.div
                        key={activeMemory!.id}
                        initial={{
                          opacity: 0,
                          x: slideDirection === 0 ? 0 : slideDirection * 64,
                          scale: slideDirection === 0 ? 0.9 : 0.96,
                          rotate: slideDirection === 0 ? -2 : slideDirection * 3.5,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                          scale: 1,
                          rotate: 0,
                        }}
                        exit={{
                          opacity: 0,
                          x: slideDirection === 0 ? 0 : slideDirection * -64,
                          scale: 0.95,
                          rotate: slideDirection === 0 ? 2 : slideDirection * -3.5,
                        }}
                        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                        className="w-full flex justify-center"
                      >
                        {/* 3D Flip Card */}
                        <button
                          type="button"
                          onClick={() => setIsFlipped((prev) => !prev)}
                          aria-pressed={isFlipped}
                          aria-label={
                            isFlipped
                              ? `Flip back to photo for ${activeMemory!.caption}`
                              : `Flip card to read story for ${activeMemory!.caption}`
                          }
                          className="perspective-1200 group w-full max-w-[330px] h-[420px] sm:h-[455px] cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pink-300"
                        >
                          <div
                            className={`transform-style-3d relative h-full w-full transition-transform duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                              isFlipped ? 'rotate-y-180' : 'group-hover:-translate-y-1'
                            }`}
                          >
                            {/* Front: Polaroid photo */}
                            <div className="backface-hidden absolute inset-0 flex flex-col rounded-xl bg-[#fffaf8] p-3.5 pb-4 shadow-[0_22px_50px_rgba(0,0,0,0.42)] border border-pink-200/75">
                              <div className="relative flex-1 min-h-0 w-full overflow-hidden rounded-md bg-[radial-gradient(circle_at_center,#591231_0%,#2b0515_100%)] shadow-inner">
                                <ResilientImage
                                  src={activeMemory!.src}
                                  alt={activeMemory!.caption}
                                  className="h-full w-full object-contain"
                                  fallbackLabel={activeMemory!.caption}
                                />
                              </div>
                              <div className="mt-3 text-center px-1">
                                <p className="font-handwriting text-lg sm:text-xl text-[#831843] leading-tight">
                                  {activeMemory!.caption}
                                </p>
                                <p
                                  data-testid="polaroid-detail-caption"
                                  className="font-handwriting mt-0.5 text-[13px] sm:text-sm text-[#9d174d]/85 leading-snug tracking-[0.01em]"
                                >
                                  {activeMemory!.personalCaption}
                                </p>
                                <p className="mt-1.5 inline-flex items-center gap-1.5 text-[11px] font-medium text-[#db2777]">
                                  <RotateCw className="h-3 w-3 transition-transform duration-300 group-hover:rotate-45" aria-hidden="true" />
                                  <span>Tap card to read story</span>
                                </p>
                              </div>
                            </div>

                            {/* Back: Heartfelt story note */}
                            <div className="backface-hidden rotate-y-180 absolute inset-0 flex flex-col rounded-xl bg-[#fffaf8] stationery-lines p-6 shadow-[0_22px_50px_rgba(0,0,0,0.42)] border border-pink-200/75 text-[#4a102b]">
                              <div className="border-b border-pink-200/80 pb-3 mb-3 flex items-center justify-between gap-2">
                                <div>
                                  <p className="text-xs font-semibold text-[#be185d]">
                                    Memory {activeMemory!.indexLabel} · {activeMemory!.subtitle}
                                  </p>
                                  <h3 className="font-handwriting text-xl text-[#831843]">
                                    {activeMemory!.caption}
                                  </h3>
                                </div>
                                <div className="flex h-8 w-8 items-center justify-center rounded-md border border-dashed border-pink-300 bg-pink-50 text-[#be185d] shrink-0">
                                  <RotateCw className="h-3.5 w-3.5" aria-hidden="true" />
                                </div>
                              </div>

                              <div className="keepsake-scroll flex-1 overflow-y-auto pr-1.5">
                                <p className="font-letter-serif text-sm sm:text-[15px] leading-[1.75] text-[#4a102b] whitespace-pre-wrap">
                                  {activeMemory!.message}
                                </p>
                              </div>

                              <p className="mt-3 pt-2 border-t border-pink-200/70 text-center text-xs font-medium text-[#7c2d50]">
                                Tap card to flip back
                              </p>
                            </div>
                          </div>
                        </button>
                      </motion.div>
                    </AnimatePresence>

                    {/* Navigation controls below flip card */}
                    <div className="mt-6 flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => handleStep(-1)}
                        aria-label="Previous memory"
                        className="inline-flex h-11 items-center gap-1.5 rounded-full border border-pink-200/30 bg-pink-500/20 px-4 text-xs font-medium text-white cursor-pointer transition-transform duration-150 hover:bg-pink-500/35 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
                      >
                        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                        <span>Prev</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSlideDirection(0);
                          setSelectedIndex(null);
                          setIsFlipped(false);
                        }}
                        className="inline-flex h-11 items-center rounded-full bg-[#ec4899] px-5 text-xs font-semibold text-white cursor-pointer transition-transform duration-150 hover:bg-[#db2777] active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300 whitespace-nowrap"
                      >
                        All Polaroids
                      </button>

                      <button
                        type="button"
                        onClick={() => handleStep(1)}
                        aria-label="Next memory"
                        className="inline-flex h-11 items-center gap-1.5 rounded-full border border-pink-200/30 bg-pink-500/20 px-4 text-xs font-medium text-white cursor-pointer transition-transform duration-150 hover:bg-pink-500/35 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-300"
                      >
                        <span>Next</span>
                        <ChevronRight className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
