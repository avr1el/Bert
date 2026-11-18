import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createSparkleParticle,
  shouldSpawnSparkle,
  stepSparkleParticles,
} from './sparkleTrail';

test('shouldSpawnSparkle enforces minimum pointer travel distance', () => {
  assert.equal(shouldSpawnSparkle(100, 100, 104, 103, 10), false);
  assert.equal(shouldSpawnSparkle(100, 100, 110, 100, 10), true);
  assert.equal(shouldSpawnSparkle(0, 0, 8, 8, 10), true);
});

test('stepSparkleParticles advances motion, decays life, and prunes expired stars', () => {
  const star = createSparkleParticle(200, 150, 0.4);
  const afterStep = stepSparkleParticles([star], 1, 45);
  assert.equal(afterStep.length, 1);
  assert.ok(afterStep[0].life < star.life);
  assert.ok(afterStep[0].y > star.y);

  const expired = { ...star, life: 0.01, decay: 0.05 };
  assert.equal(stepSparkleParticles([expired], 1, 45).length, 0);
});

test('stepSparkleParticles caps particle array to maxParticles', () => {
  const many = Array.from({ length: 60 }, (_, idx) =>
    createSparkleParticle(idx * 5, idx * 5, (idx % 10) / 10),
  );
  const capped = stepSparkleParticles(many, 1, 45);
  assert.equal(capped.length, 45);
});
