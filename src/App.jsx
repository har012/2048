import React from 'react';
import './App.css';

import '@/styles/variables.css';
import '@/styles/animations.css';
import '@/styles/layout.css';
import '@/styles/theme.css';

import { GameProvider, useGameContext } from '@/state/GameContext.jsx';
import ScorePanel from './components/ScorePanel/ScorePanel';
import Controls from './components/Controls/Controls';
import Board from './components/Board/Board';
import GameOverModal from './components/GameOverModal/GameOverModal';
import { useHotkeys } from '@/hooks/useHotkeys.js';
import { useTheme } from '@/hooks/useTheme.js';

function HotkeysBinder() {
  const { newGame, undo } = useGameContext();
  useHotkeys({
    n: newGame,
    u: undo,
  });
  return null;
}

function ThemeHotkeyBinder() {
  const { toggle } = useTheme();
  useHotkeys({ t: toggle });
  return null;
}

function App() {
  return (
    <GameProvider>
      <HotkeysBinder />
      <ThemeHotkeyBinder />
      
      <div className="app-shell">
        <header className="app-header" style={{display: 'flex', justifyContent: 'center'}}>
          <h1 style={{fontSize:'3rem'}}>2048</h1>
        </header>

        <main className="app-main">
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
            <ScorePanel />
            <Controls />
          </div>

          <Board />

          <p style={{ marginTop: 20 }}>
            Use arrow keys or WASD on desktop. Swipe on mobile.
          </p>
        </main>

        <GameOverModal />
      </div>
    </GameProvider>
  );
}

export default App;