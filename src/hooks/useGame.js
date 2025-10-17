import { useCallback } from 'react';
import { useGameContext } from '@/state/GameContext.jsx';

export function useGame() {
  const { state, move, newGame, undo } = useGameContext();

  const onDirection = useCallback((dir) => {
    move(dir);
  }, [move]);

  return {
    state,
    onDirection,
    newGame,
    undo,
  };
}