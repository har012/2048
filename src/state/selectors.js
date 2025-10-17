import { TARGET_TILE } from '@/game/constants.js';

export function hasWon(board) {
  return board.some((row) => row.some((v) => v >= TARGET_TILE));
}

export function isGameOver(board) {
  const n = board.length;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const v = board[r][c];
      if (v === 0) return false;
      if (c + 1 < n && board[r][c + 1] === v) return false;
      if (r + 1 < n && board[r + 1][c] === v) return false;
    }
  }
  return true;
}