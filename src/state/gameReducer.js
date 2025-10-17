import { ACT } from './actions.js';
import { startNewBoard, move as doMove, spawnRandomTile, canMove } from '@/game/grid.js';
import { loadBestScore, saveBestScore } from '@/game/storage.js';
import { hasWon } from './selectors.js';

export const initialState = () => ({
  board: startNewBoard(),
  score: 0,
  best: loadBestScore() || 0,
  over: false,
  won: false,
  history: [],
  lastMerged: [],
});

export function gameReducer(state, action) {
  switch (action.type) {
    case ACT.NEW_GAME: {
      const next = { ...initialState(), best: state.best };
      return next;
    }

    case ACT.MOVE: {
      if (state.over) return state;

      const res = doMove(state.board, action.direction);
      if (!res.moved) {
        return { ...state, lastMerged: [] };
      }

      let board = spawnRandomTile(res.board);

      const score = state.score + res.scoreGain;
      const best = score > state.best ? score : state.best;
      if (best !== state.best) saveBestScore(best);

      const justWon = !state.won && hasWon(board);
      const over = !canMove(board);

      return {
        ...state,
        board,
        score,
        best,
        won: state.won || justWon,
        over,
        lastMerged: res.merged || [],
        history: [...state.history, { board: state.board, score: state.score }].slice(-20),
      };
    }

    case ACT.UNDO: {
      const last = state.history[state.history.length - 1];
      if (!last) return state;
      const history = state.history.slice(0, -1);
      return {
        ...state,
        board: last.board,
        score: last.score,
        over: false,
        lastMerged: [],
        history,
      };
    }

    case ACT.SET_BOARD: {
      return { ...state, board: action.board, lastMerged: [] };
    }

    case ACT.SET_SCORE: {
      const best = action.score > state.best ? action.score : state.best;
      if (best !== state.best) saveBestScore(best);
      return { ...state, score: action.score, best };
    }

    case ACT.DISMISS_WIN: {
      if (!state.won) return state;
      return { ...state, won: false, lastMerged: [] };
    }

    default:
      return state;
  }
}