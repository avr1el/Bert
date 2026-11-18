import { useEffect, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import { MARQUEE_IMAGES, PROFILE_DATA } from '../constants/data';
import {
  formatOrdinal,
  getNextBirthdayCountdown,
  type NextBirthdayCountdown,
} from '../utils/tributeState';
import { ResilientImage } from './ResilientImage';

interface HeroSectionProps {
  age: number;
  ordinalAge: string;
  birthdayDateLabel: string;
  isModalOpen: boolean;
}

export default function HeroSection({
  age,
  ordinalAge,
  birthdayDateLabel,
  isModalOpen,
}: HeroSectionProps) {
  const [countdown, setCountdown] = useState<NextBirthdayCountdown | null>(() =>
    getNextBirthdayCountdown(PROFILE_DATA.birthDate, new Date()),
  );

  useEffect(() => {
    const updateCountdown = () => {
      setCountdown(getNextBirthdayCountdown(PROFILE_DATA.birthDate, new Date()));
    };
    const timer = window.setInterval(updateCountdown, 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const trackItems = [...MARQUEE_IMAGES, ...MARQUEE_IMAGES, ...MARQUEE_IMAGES];
  const birthStamp = `${String(PROFILE_DATA.birthDate.day).padStart(2, '0')} · ${String(
    PROFILE_DATA.birthDate.month,
  ).padStart(2, '0')} · ${PROFILE_DATA.birthDate.year}`;

  return (
    <section
      id="hero"
      className={`relative min-h-[100dvh] w-full overflow-hidden bg-[linear-gradient(155deg,#fff0f6_0%,#ffd6e8_52%,#fbcfe8_100%)] pt-14 flex items-center ${
        isModalOpen ? 'marquee-paused' : ''
      }`}
    >

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex flex-col justify-center gap-6 opacity-50 -rotate-3 scale-115"
      >
        <div className="marquee-track">
          {trackItems.map((src, idx) => (
            <div
              key={`row1-${idx}`}
              className="h-44 w-64 sm:h-52 sm:w-72 shrink-0 overflow-hidden rounded-xl border border-pink-300/60 bg-pink-100 shadow-sm"
            >
              <ResilientImage src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        <div className="marquee-track marquee-track-fast">
          {[...trackItems].reverse().map((src, idx) => (
            <div
              key={`row2-${idx}`}
              className="h-44 w-64 sm:h-52 sm:w-72 shrink-0 overflow-hidden rounded-xl border border-pink-300/60 bg-pink-100 shadow-sm"
            >
              <ResilientImage src={src} alt="" className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,240,246,0.34)_0%,rgba(255,214,232,0.58)_68%,rgba(251,207,232,0.78)_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#fbcfe8] to-transparent"
      />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 lg:py-14">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-10">
          
          <div className="lg:col-span-4 text-center lg:text-left order-2 lg:order-1">
            <div className="inline-block rounded-2xl bg-[#fff5f9]/75 px-5 py-4 border border-pink-300/60 shadow-[0_12px_32px_rgba(157,23,77,0.08)]">
              <p className="text-sm font-semibold text-[#9d174d] mb-2">
                {PROFILE_DATA.recipientFullName} · {birthdayDateLabel}
              </p>
              <h1 className="font-display-cupid text-5xl sm:text-6xl lg:text-[4rem] leading-[1.04] text-[#831843] [text-wrap:balance]">
                {PROFILE_DATA.heroHeadline}
              </h1>
              <p className="font-letter-serif mt-3 max-w-md mx-auto lg:mx-0 text-sm sm:text-base leading-relaxed text-[#6b2149]">
                A special letter and four small polaroid memories kept for your {ordinalAge} year.
              </p>
            </div>
          </div>

            <div className="lg:col-span-4 flex justify-center order-1 lg:order-2">
            <div className="animate-gentle-float relative w-60 sm:w-72 lg:w-80">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -top-3.5 left-1/2 -translate-x-1/2 z-20 h-7 w-24 -rotate-2 rounded-xs bg-pink-400/65 shadow-xs"
              />
              <div className="rounded-xl border border-pink-300/85 bg-[#fff9fc] p-3 pb-5 shadow-[0_24px_60px_rgba(190,24,93,0.22)] rotate-[-1.5deg]">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-pink-100 ring-1 ring-pink-300/45">
                  <ResilientImage
                    src={PROFILE_DATA.mainPhoto}
                    alt="Rara main birthday portrait"
                    className="h-full w-full object-cover object-center"
                    fallbackLabel="Rara's Portrait"
                  />
                </div>
                <div className="mt-3 flex items-center justify-between px-1 text-xs text-[#831843]/85">
                  <span className="font-handwriting text-base text-[#831843]">
                    {PROFILE_DATA.recipientName}
                  </span>
                  <span className="font-ui font-medium tabular-nums">
                    {birthStamp}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-4 flex flex-col items-center lg:items-end text-center lg:text-right order-3">
            <div className="relative inline-flex flex-col items-center lg:items-end rounded-2xl border border-dashed border-pink-400/70 bg-[#fff5f9]/80 px-6 py-4 shadow-[0_12px_32px_rgba(190,24,93,0.1)]">
              <span
                data-testid="dynamic-age-display"
                className="font-display-cupid text-6xl sm:text-7xl lg:text-[5.25rem] leading-none text-[#9d174d] tabular-nums"
              >
                {age} th
              </span>
              <p className="mt-1.5 font-handwriting text-xl sm:text-2xl text-[#be185d]">
                {birthdayDateLabel}
              </p>
            </div>

            {countdown && (
              <p
                data-testid="next-birthday-countdown"
                className="mt-3.5 inline-flex items-center gap-2 rounded-xl border border-pink-300/75 bg-[#fff5f9]/78 px-4 py-2 text-xs sm:text-[13px] text-[#7c2d50] shadow-[0_6px_18px_rgba(157,23,77,0.06)]"
              >
                <span>Until {formatOrdinal(countdown.nextAge)}</span>
                <span aria-hidden="true">·</span>
                <span className="font-semibold text-[#9d174d] tabular-nums">
                  {countdown.days}d {String(countdown.hours).padStart(2, '0')}h
                </span>
              </p>
            )}

            <a
              href="#letter"
              className="mt-5 inline-flex items-center gap-2.5 rounded-full bg-[#db2777] px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(219,39,119,0.34)] transition-transform duration-200 hover:bg-[#be185d] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#db2777]"
            >
              <span>Read the letter</span>
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
