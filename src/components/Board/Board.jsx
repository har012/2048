import React, { useRef } from 'react';
import './Board.css';
import Tile from '@/components/Tile/Tile.jsx';
import { useKeyboard } from '@/hooks/useKeyboard.js';
import { useSwipe } from '@/hooks/useSwipe.js';
import { useGame } from '@/hooks/useGame.js';

function Board() {
  const { state, onDirection } = useGame();
  const wrapRef = useRef(null);

  useKeyboard(onDirection);
  useSwipe(wrapRef, onDirection);

  const mergedSet = new Set(state.lastMerged.map(([r, c]) => `${r}:${c}`));

  return (
    <div className="board-wrap" ref={wrapRef} aria-label="2048 board" role="grid">
      {state.board.map((row, r) => (
        <div className="board-row" role="row" key={`r-${r}`}>
          {row.map((v, c) => {
            const merged = mergedSet.has(`${r}:${c}`);
            return (
              <div className="board-cell" role="gridcell" key={`c-${r}-${c}`}>
                <Tile value={v} merged={merged} />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  )
}

export default Board;