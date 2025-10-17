import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { gameReducer, initialState } from './gameReducer.js';
import { ACT } from './actions.js';

const GameContext = createContext(null);

export function GameProvider({ children }) {
  const [state, dispatch] = useReducer(gameReducer, undefined, initialState);

  const api = useMemo(() => ({
    newGame: () => dispatch({ type: ACT.NEW_GAME }),
    move: (direction) => dispatch({ type: ACT.MOVE, direction }),
    undo: () => dispatch({ type: ACT.UNDO }),
    state,
    dispatch, // expose raw dispatch for special cases (e.g., dismiss win)
  }), [state]);

  return <GameContext.Provider value={api}>{children}</GameContext.Provider>;
}

export function useGameContext() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGameContext must be used within GameProvider');
  return ctx;
}