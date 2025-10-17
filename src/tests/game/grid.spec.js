import { describe, it, expect } from 'vitest';
import { move, canMove } from '@/game/grid.js';

function boardOf(rows) {
  return rows.map((r) => r.slice());
}

describe('2048 engine', () => {
  it('slides and merges left with single pass rules', () => {
    const start = boardOf([
      [2, 0, 2, 2],
      [0, 0, 0, 0],
      [4, 4, 8, 0],
      [2, 2, 2, 2],
    ]);

    const res = move(start, 'left');
    expect(res.board[0]).toEqual([4, 2, 0, 0]);  // 2+2=4, leftover 2
    expect(res.board[2]).toEqual([8, 8, 0, 0]);  // 4+4=8, 8 stays
    expect(res.board[3]).toEqual([4, 4, 0, 0]);  // (2+2),(2+2)
    expect(res.scoreGain).toBe(20);              // 4 + 8 + 4 + 4
    expect(res.moved).toBe(true);
  });

  it('derives other directions via transforms', () => {
    const start = boardOf([
      [2, 0, 0, 2],
      [0, 2, 0, 2],
      [0, 0, 2, 2],
      [0, 0, 0, 2],
    ]);

    const left = move(start, 'left');
    expect(left.board[0]).toEqual([4, 0, 0, 0]);    // row 0: 2 and 2 merge left

    const right = move(start, 'right');
    expect(right.board[0]).toEqual([0, 0, 0, 4]);   // row 0 merges to the right

    const up = move(start, 'up');
    // fourth column [2,2,2,2] -> [4,4,0,0], so top cell col=3 should be 4
    expect(up.board[0][3]).toBe(4);

    const down = move(start, 'down');
    // fourth column [2,2,2,2] -> [0,0,4,4], so bottom cell col=3 should be 4
    expect(down.board[3][3]).toBe(4);
  });

  it('reports merged coordinates', () => {
    const start = boardOf([
      [2, 2, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    const res = move(start, 'left');
    // merge lands at (row 0, col 0)
    expect(res.merged).toEqual([[0, 0]]);
  });

  it('canMove returns false when grid is full with no merges', () => {
    const fullNoMerge = boardOf([
      [2, 4, 2, 4],
      [4, 2, 4, 2],
      [2, 4, 2, 4],
      [4, 2, 4, 2],
    ]);
    expect(canMove(fullNoMerge)).toBe(false);
  });
});