import React from 'react';
import './Tile.css';

function Tile({ value, merged = false }) {
  const base = value ? `tile tile-${value}` : 'tile tile-empty';
  const cls = merged ? `${base} tile-merged` : base;

  return (
    <div className={cls} key={value || 'empty'}>
      {value || ''}
    </div>
  )
}

export default Tile;