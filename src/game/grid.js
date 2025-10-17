import { BOARD_SIZE, SPAWN_CHOICES } from './constants.js';
import { weightedChoice } from './rng.js';

export function emptyBoard(size = BOARD_SIZE) {
  return Array.from({ length: size }, () => Array(size).fill(0));
}

export function cloneBoard(board) {
  return board.map((row) => row.slice());
}

export function spawnRandomTile(board) {
  const empties = [];
  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === 0) empties.push([r, c]);
    }
  }
  if (empties.length === 0) return board;

  const [row, col] = empties[Math.floor(Math.random() * empties.length)];
  const value = weightedChoice(SPAWN_CHOICES);
  const next = cloneBoard(board);
  next[row][col] = value;
  return next;
}

function transpose(board) {
  const n = board.length;
  const out = emptyBoard(n);
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) out[c][r] = board[r][c];
  return out;
}
function reverseRows(board) {
  const out = cloneBoard(board);
  for (let r = 0; r < out.length; r++) out[r].reverse();
  return out;
}

function coordLeftToRight(n, r, c) {
  return [r, n - 1 - c];
}
function coordLeftToUp(n, r, c) {
  return [c, r];
}
function coordLeftToDown(n, r, c) {
  return [c, n - 1 - r];
}

function applyLeftRow(row) {
  const n = row.length;
  // compact non-zeros:
  const compact = [];
  for (let i = 0; i < n; i++) if (row[i] !== 0) compact.push(row[i]);

  const out = Array(n).fill(0);
  let write = 0;
  let scoreGain = 0;
  const mergedCols = [];

  for (let i = 0; i < compact.length; i++) {
    const curr = compact[i];
    const next = compact[i + 1];

    if (next !== undefined && next === curr) {
      const merged = curr * 2;
      out[write] = merged;
      scoreGain += merged;
      mergedCols.push(write);
      write += 1;
      i += 1;
    } else {
      out[write] = curr;
      write += 1;
    }
  }

  const moved = out.some((v, i) => v !== row[i]);
  return { row: out, scoreGain, moved, mergedCols };
}

function applyLeft(board) {
  let scoreGain = 0;
  let moved = false;
  const mergedPerRow = [];

  const next = board.map((row, r) => {
    const res = applyLeftRow(row);
    scoreGain += res.scoreGain;
    moved = moved || res.moved;
    if (res.mergedCols.length) {
      for (const c of res.mergedCols) mergedPerRow.push([r, c]);
    }
    return res.row;
  });

  return { board: next, scoreGain, moved, mergedLeftCoords: mergedPerRow };
}

export function move(board, direction) {
  const n = board.length;
  let working = board;
  let transformCoordBack = (r, c) => [r, c];

  if (direction === 'right') {
    working = reverseRows(board);
    transformCoordBack = (r, c) => coordLeftToRight(n, r, c);
  } else if (direction === 'up') {
    working = transpose(board);
    transformCoordBack = (r, c) => coordLeftToUp(n, r, c);
  } else if (direction === 'down') {
    working = transpose(board);
    working = reverseRows(working);
    transformCoordBack = (r, c) => coordLeftToDown(n, r, c);
  } else if (direction !== 'left') {
    throw new Error(`Unknown direction: ${direction}`);
  }

  const leftRes = applyLeft(working);
  let transformedBoard = leftRes.board;
  if (direction === 'right') {
    transformedBoard = reverseRows(transformedBoard);
  } else if (direction === 'up') {
    transformedBoard = transpose(transformedBoard);
  } else if (direction === 'down') {
    transformedBoard = transpose(reverseRows(transformedBoard));
  }

  const merged = leftRes.mergedLeftCoords.map(([r, c]) => transformCoordBack(r, c));

  return {
    board: transformedBoard,
    scoreGain: leftRes.scoreGain,
    moved: leftRes.moved,
    merged,
  };
}

export function canMove(board) {
  for (let r = 0; r < board.length; r++)
    for (let c = 0; c < board[r].length; c++)
      if (board[r][c] === 0) return true;

  const n = board.length;
  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      const v = board[r][c];
      if (c + 1 < n && board[r][c + 1] === v) return true;
      if (r + 1 < n && board[r + 1][c] === v) return true;
    }
  }
  return false;
}

export function startNewBoard() {
  let b = emptyBoard();
  b = spawnRandomTile(b);
  b = spawnRandomTile(b);
  return b;
}