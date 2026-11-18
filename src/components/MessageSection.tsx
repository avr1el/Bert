import { LockOpen, Sparkles } from 'lucide-react';
import { LETTER_CONTENT, PROFILE_DATA } from '../constants/data';
import { ResilientImage } from './ResilientImage';

interface MessageSectionProps {
  age: number;
  birthdayDateLabel: string;
  isRevealed: boolean;
  onReveal: () => void;
  onOpenModal: () => void;
}

export default function MessageSection({
  age,
  birthdayDateLabel,
  isRevealed,
  onReveal,
  onOpenModal,
}: MessageSectionProps) {
  return (
    <section
      id="letter"
      className="relative min-h-[100dvh] w-full bg-[linear-gradient(180deg,#fbcfe8_0%,#ffdbe9_50%,#ffeaf3_100%)] py-20 sm:py-24 px-4 sm:px-8 flex items-center"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 pink-paper-dots opacity-45" />

      <div className="relative z-10 mx-auto w-full max-w-6xl">
        <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left column: Layered stationery letter */}
          <div className="lg:col-span-7 relative">
            {/* Subtle offset parchment sheet behind the main letter */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 rounded-2xl bg-[#ffd9ea] border border-pink-300/70 -rotate-1 translate-x-1.5 translate-y-2 shadow-sm"
            />

            <article className="relative rounded-2xl border border-pink-300/85 bg-[#fff9fc] p-6 sm:p-10 shadow-[0_24px_60px_rgba(157,23,77,0.14)]">
              {/* Subtle pink washi tape detail */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-3.5 left-1/2 -translate-x-1/2 h-7 w-28 rotate-2 rounded-xs bg-pink-400/65 shadow-xs"
              />

              <div className="border-b border-pink-200/80 pb-4 mb-6 flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-display-cupid text-4xl sm:text-5xl text-[#be185d] leading-tight">
                  {LETTER_CONTENT.greeting}
                </h2>
                <span className="text-xs font-medium text-[#7c2d50]">
                  {birthdayDateLabel}
                </span>
              </div>

              <div className="stationery-lines space-y-5 font-letter-serif text-[15.5px] sm:text-base leading-[1.85] text-[#4a102b]">
                <p>{LETTER_CONTENT.mainWish}</p>

                {!isRevealed ? (
                  <div className="pt-2">
                    <p className="font-ui text-xs sm:text-sm font-medium text-[#be185d] mb-3">
                      {LETTER_CONTENT.spoilerWarning}
                    </p>
                    <button
                      type="button"
                      onClick={onReveal}
                      aria-label={LETTER_CONTENT.spoilerHint}
                      className="group relative w-full text-left rounded-xl border border-dashed border-pink-400/70 bg-pink-100/55 p-4 sm:p-5 cursor-pointer transition-all duration-200 hover:bg-pink-100/85 hover:border-pink-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#db2777]"
                    >
                      <span
                        aria-hidden="true"
                        className="block select-none blur-[5px] opacity-65 text-sm leading-relaxed text-[#4a102b] transition-all duration-300 group-hover:blur-[3.5px]"
                      >
                        {LETTER_CONTENT.secretMessage}
                      </span>
                      <span className="mt-3 inline-flex items-center gap-2 font-ui text-xs font-semibold text-[#be185d]">
                        <LockOpen className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{LETTER_CONTENT.spoilerHint}</span>
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="pt-2 transition-opacity duration-500">
                    <p>{LETTER_CONTENT.secretMessage}</p>
                  </div>
                )}
              </div>

              {/* Surprise modal trigger unlocked after revealing secret letter */}
              {isRevealed && (
                <div className="mt-7 pt-5 border-t border-pink-200/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <p className="font-ui text-xs sm:text-sm text-[#7c2d50]">
                    4 polaroid memories waiting inside · {PROFILE_DATA.musicTitle}
                  </p>
                  <button
                    type="button"
                    onClick={onOpenModal}
                    className="inline-flex items-center justify-center gap-2 rounded-full bg-[#db2777] px-6 py-3 font-ui text-sm font-semibold text-white shadow-[0_10px_24px_rgba(219,39,119,0.32)] cursor-pointer transition-all duration-200 hover:bg-[#be185d] hover:-translate-y-0.5 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#db2777] whitespace-nowrap shrink-0"
                  >
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <span>{LETTER_CONTENT.ctaLabel}</span>
                  </button>
                </div>
              )}
            </article>
          </div>

          {/* Right column: Framed keepsake portrait with photo corner accents */}
          <div className="lg:col-span-5 flex justify-center">
            <figure className="animate-gentle-float relative w-full max-w-xs sm:max-w-sm rounded-xl border border-pink-300/85 bg-[#fff9fc] p-3.5 pb-6 shadow-[0_22px_50px_rgba(157,23,77,0.16)] rotate-[1.5deg]">
              {/* Photo corner accents */}
              <span aria-hidden="true" className="pointer-events-none absolute top-2 left-2 z-10 h-5 w-5 border-t-2 border-l-2 border-pink-400/75" />
              <span aria-hidden="true" className="pointer-events-none absolute top-2 right-2 z-10 h-5 w-5 border-t-2 border-r-2 border-pink-400/75" />

              <div className="aspect-[3/4] w-full overflow-hidden rounded-lg bg-pink-50 ring-1 ring-pink-200/70">
                <ResilientImage
                  src={PROFILE_DATA.transparentPhoto}
                  alt="Rara smiling portrait print"
                  className="h-full w-full object-cover object-top"
                  fallbackLabel="Foto Rara"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between px-1">
                <span className="font-handwriting text-xl text-[#831843]">
                  {PROFILE_DATA.recipientName}
                </span>
                <span className="font-ui text-xs font-medium text-[#7c2d50]">
                  {age} th · {birthdayDateLabel}
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
