import React from 'react';
import './Controls.css';
import { useGameContext } from '@/state/GameContext.jsx';
import { useTheme } from '@/hooks/useTheme.js';

function Controls() {
  const { newGame, undo } = useGameContext();
  const { mode, toggle, setAuto, setDark, setLight } = useTheme();

  return (
    <div className="controls">
      <button onClick={newGame}>New Game</button>
      <button onClick={undo}>Undo</button>

      <div className="theme-group" role="group" aria-label="Theme">
        <button
          className={mode === 'auto' ? 'active' : ''}
          onClick={setAuto}
          title="Follow system theme"
        >
          Auto
        </button>
        
        <button
          className={mode === 'dark' ? 'active' : ''}
          onClick={setDark}
          title="Force dark theme"
        >
          Dark
        </button>

        <button
          className={mode === 'light' ? 'active' : ''}
          onClick={setLight}
          title="Force light theme"
        >
          Light
        </button>
      </div>

      <span className="hint">N = New, U = Undo, T = Cycle Theme</span>
    </div>
  )
}

export default Controls;