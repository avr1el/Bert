import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateAge,
  computeLetterProgress,
  formatMemoryCounter,
  formatOrdinal,
  getLatestBirthdayYear,
  getNextBirthdayCountdown,
  wrapMemoryIndex,
} from './tributeState';

const RARA_BIRTH_DATE = { year: 2007, month: 4, day: 19 };

test('calculateAge accurately increases on April 19 each year', () => {
  assert.equal(calculateAge(RARA_BIRTH_DATE, new Date(2026, 3, 18)), 18); // Apr 18, 2026
  assert.equal(calculateAge(RARA_BIRTH_DATE, new Date(2026, 3, 19)), 19); // Apr 19, 2026
  assert.equal(calculateAge(RARA_BIRTH_DATE, new Date(2026, 10, 18)), 19); // Nov 18, 2026
  assert.equal(calculateAge(RARA_BIRTH_DATE, new Date(2027, 3, 18)), 19); // Apr 18, 2027
  assert.equal(calculateAge(RARA_BIRTH_DATE, new Date(2027, 3, 19)), 20); // Apr 19, 2027
});

test('formatOrdinal handles 1st, 2nd, 3rd, teens, and 21st+', () => {
  assert.equal(formatOrdinal(19), '19th');
  assert.equal(formatOrdinal(20), '20th');
  assert.equal(formatOrdinal(21), '21st');
  assert.equal(formatOrdinal(22), '22nd');
  assert.equal(formatOrdinal(23), '23rd');
});

test('getLatestBirthdayYear returns current year on/after Apr 19 and previous year before Apr 19', () => {
  assert.equal(getLatestBirthdayYear(RARA_BIRTH_DATE, new Date(2026, 3, 18)), 2025);
  assert.equal(getLatestBirthdayYear(RARA_BIRTH_DATE, new Date(2026, 3, 19)), 2026);
  assert.equal(getLatestBirthdayYear(RARA_BIRTH_DATE, new Date(2026, 10, 18)), 2026);
});

test('getNextBirthdayCountdown returns null during birthday month (April) and accurate days/hours otherwise', () => {
  assert.equal(getNextBirthdayCountdown(RARA_BIRTH_DATE, new Date(2026, 3, 1, 12, 0)), null);
  assert.equal(getNextBirthdayCountdown(RARA_BIRTH_DATE, new Date(2026, 3, 19, 0, 0)), null);

  const novCountdown = getNextBirthdayCountdown(RARA_BIRTH_DATE, new Date(2026, 10, 18, 14, 30));
  assert.ok(novCountdown !== null);
  assert.equal(novCountdown.nextYear, 2027);
  assert.equal(novCountdown.nextAge, 20);
  assert.equal(novCountdown.days, 151);
  assert.equal(novCountdown.hours, 9);

  const marCountdown = getNextBirthdayCountdown(RARA_BIRTH_DATE, new Date(2027, 2, 19, 0, 0));
  assert.ok(marCountdown !== null);
  assert.equal(marCountdown.nextYear, 2027);
  assert.equal(marCountdown.days, 31);
  assert.equal(marCountdown.hours, 0);
});

test('wrapMemoryIndex cycles forward and backward across boundaries', () => {
  assert.equal(wrapMemoryIndex(0, 1, 4), 1);
  assert.equal(wrapMemoryIndex(3, 1, 4), 0);
  assert.equal(wrapMemoryIndex(0, -1, 4), 3);
  assert.equal(wrapMemoryIndex(2, -1, 4), 1);
  assert.equal(wrapMemoryIndex(0, 1, 0), 0);
});

test('formatMemoryCounter pads indices and clamps out-of-range values', () => {
  assert.equal(formatMemoryCounter(0, 4), '01 / 04');
  assert.equal(formatMemoryCounter(3, 4), '04 / 04');
  assert.equal(formatMemoryCounter(9, 4), '04 / 04');
  assert.equal(formatMemoryCounter(-2, 4), '01 / 04');
});

test('computeLetterProgress deduplicates visited memories and calculates percentage', () => {
  assert.equal(computeLetterProgress(false, [], 4), 0);
  assert.equal(computeLetterProgress(true, [], 4), 20);
  assert.equal(computeLetterProgress(true, ['a', 'a', 'b'], 4), 60);
  assert.equal(computeLetterProgress(true, ['a', 'b', 'c', 'd'], 4), 100);
});
