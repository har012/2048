import React from 'react';
import './GameOverModal.css';
import { useGameContext } from '@/state/GameContext.jsx';
import { ACT } from '@/state/actions.js';

function KeepPlayingButton() {
  const { state, dispatch } = useGameContext();
  return (
    <button
      className="gom-btn gom-outline"
      onClick={() => dispatch({ type: ACT.DISMISS_WIN })}
      disabled={!state.won}
      title="Hide this message and continue playing"
    >
      Keep Playing
    </button>
  );
}

function GameOverModal() {
  const { state, newGame } = useGameContext();
  const { won, over } = state;

  if (!won && !over) return null;

  return (
    <div className="gom-backdrop" role="dialog" aria-modal="true">
      <div className="gom-card">
        <h2 className="gom-title">{won ? 'You win!' : 'Game over'}</h2>

        <div className="gom-actions">
          <button className="gom-btn" onClick={newGame}>New Game</button>
          {won && <KeepPlayingButton />}
        </div>
      </div>
    </div>
  )
}

export default GameOverModal;