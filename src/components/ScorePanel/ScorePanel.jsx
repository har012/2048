import React from 'react';
import './ScorePanel.css';
import { useGameContext } from '@/state/GameContext.jsx';

function ScorePanel() {
  const { state } = useGameContext();

  return (
    <div className="score-panel">
      <div className="score-box">
        <div className="label">SCORE</div>
        <div className="value">{state.score}</div>
      </div>

      <div className="score-box">
        <div className="label">BEST</div>
        <div className="value">{state.best}</div>
      </div>
    </div>
  )
}

export default ScorePanel;