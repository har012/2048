import { describe, it, expect } from 'vitest';
import { makeRng } from '@/game/rng.js';

describe('rng', () => {
  it('produces same sequence for same seed', () => {
    const r1 = makeRng('seed');
    const r2 = makeRng('seed');
    const seq1 = Array.from({ length: 5 }, () => r1());
    const seq2 = Array.from({ length: 5 }, () => r2());
    expect(seq1).toEqual(seq2);
  });
});