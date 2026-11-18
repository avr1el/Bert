import { Volume2, VolumeX } from 'lucide-react';
import { PROFILE_DATA } from '../constants/data';

interface TopBarProps {
  brandLabel: string;
  isPlaying: boolean;
  onToggleAudio: () => void;
  onOpenMemories: () => void;
}

export default function TopBar({
  brandLabel,
  isPlaying,
  onToggleAudio,
  onOpenMemories,
}: TopBarProps) {
  return (
    <header className="fixed top-0 inset-x-0 z-40 border-b border-pink-200/90 bg-[#fff0f6]/88 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 sm:gap-8 px-4 sm:px-6">
        <a
          href="#hero"
          className="font-display-cupid text-xl sm:text-2xl tracking-wide text-[#9d174d] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#db2777]"
        >
          {brandLabel}
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden sm:flex items-center gap-7 text-sm font-medium text-[#831843]"
        >
          <a
            href="#hero"
            className="whitespace-nowrap shrink-0 hover:text-[#db2777] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#db2777]"
          >
            Cover
          </a>
          <a
            href="#letter"
            className="whitespace-nowrap shrink-0 hover:text-[#db2777] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#db2777]"
          >
            Letter
          </a>
          <button
            type="button"
            onClick={onOpenMemories}
            className="whitespace-nowrap shrink-0 cursor-pointer hover:text-[#db2777] transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#db2777]"
          >
            Memories
          </button>
        </nav>

        <button
          type="button"
          onClick={onToggleAudio}
          aria-label={isPlaying ? `Pause ${PROFILE_DATA.musicTitle}` : `Play ${PROFILE_DATA.musicTitle}`}
          aria-pressed={isPlaying}
          className="inline-flex items-center gap-2 rounded-full bg-[#db2777] px-3.5 py-2 text-xs font-semibold text-white shadow-[0_6px_16px_rgba(219,39,119,0.28)] whitespace-nowrap shrink-0 cursor-pointer transition-colors duration-150 hover:bg-[#be185d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#db2777]"
        >
          {isPlaying ? (
            <Volume2 className="h-3.5 w-3.5 text-pink-100" aria-hidden="true" />
          ) : (
            <VolumeX className="h-3.5 w-3.5 text-pink-100" aria-hidden="true" />
          )}
          <span>{isPlaying ? 'Pause Music' : 'Play Magnolia'}</span>
        </button>
      </div>
    </header>
  );
}
