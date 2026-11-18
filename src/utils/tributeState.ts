export type TributeSection = 'hero' | 'letter';

export interface BirthDate {
  year: number;
  month: number; // 1-12
  day: number; // 1-31
}

export function calculateAge(birthDate: BirthDate, referenceDate: Date = new Date()): number {
  const refYear = referenceDate.getFullYear();
  const refMonth = referenceDate.getMonth() + 1;
  const refDay = referenceDate.getDate();

  let age = refYear - birthDate.year;
  if (refMonth < birthDate.month || (refMonth === birthDate.month && refDay < birthDate.day)) {
    age -= 1;
  }
  return Math.max(0, age);
}

export function formatOrdinal(n: number): string {
  const mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  switch (n % 10) {
    case 1:
      return `${n}st`;
    case 2:
      return `${n}nd`;
    case 3:
      return `${n}rd`;
    default:
      return `${n}th`;
  }
}

export function getLatestBirthdayYear(birthDate: BirthDate, referenceDate: Date = new Date()): number {
  const refYear = referenceDate.getFullYear();
  const refMonth = referenceDate.getMonth() + 1;
  const refDay = referenceDate.getDate();

  if (refMonth < birthDate.month || (refMonth === birthDate.month && refDay < birthDate.day)) {
    return refYear - 1;
  }
  return refYear;
}

export interface NextBirthdayCountdown {
  nextYear: number;
  nextAge: number;
  days: number;
  hours: number;
  minutes: number;
}

export function getNextBirthdayCountdown(
  birthDate: BirthDate,
  referenceDate: Date = new Date(),
): NextBirthdayCountdown | null {
  const refMonth = referenceDate.getMonth() + 1;
  if (refMonth === birthDate.month) {
    return null;
  }

  const refYear = referenceDate.getFullYear();
  const nextYear = refMonth > birthDate.month ? refYear + 1 : refYear;
  const target = new Date(nextYear, birthDate.month - 1, birthDate.day, 0, 0, 0, 0);
  const diffMs = Math.max(0, target.getTime() - referenceDate.getTime());

  const totalMinutes = Math.floor(diffMs / 60_000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  return {
    nextYear,
    nextAge: nextYear - birthDate.year,
    days,
    hours,
    minutes,
  };
}

export function wrapMemoryIndex(current: number, delta: number, total: number): number {
  if (total <= 0) return 0;
  return ((current + delta) % total + total) % total;
}

export function formatMemoryCounter(index: number, total: number): string {
  const safeTotal = Math.max(total, 1);
  const clamped = Math.min(Math.max(index, 0), safeTotal - 1);
  const currentNum = String(clamped + 1).padStart(2, '0');
  const totalNum = String(safeTotal).padStart(2, '0');
  return `${currentNum} / ${totalNum}`;
}

export function computeLetterProgress(isRevealed: boolean, visitedMemoryIds: string[], totalMemories: number): number {
  const revealScore = isRevealed ? 1 : 0;
  const uniqueVisited = new Set(visitedMemoryIds).size;
  const totalSteps = 1 + Math.max(totalMemories, 0);
  if (totalSteps === 0) return 100;
  return Math.min(100, Math.round(((revealScore + Math.min(uniqueVisited, totalMemories)) / totalSteps) * 100));
}
