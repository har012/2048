import { useEffect, useState, useCallback } from 'react';

const KEY = 'theme-mode'; // 'light' | 'dark' | 'auto'

function getInitialTheme() {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === 'light' || saved === 'dark' || saved === 'auto') return saved;
  } catch {}
  return 'auto';
}

export function useTheme() {
  const [mode, setMode] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    try {
      localStorage.setItem(KEY, mode);
    } catch {}
  }, [mode]);

  const toggle = useCallback(() => {
    setMode((m) => (m === 'auto' ? 'dark' : m === 'dark' ? 'light' : 'auto'));
  }, []);

  const setAuto = useCallback(() => setMode('auto'), []);
  const setLight = useCallback(() => setMode('light'), []);
  const setDark = useCallback(() => setMode('dark'), []);

  return { mode, setMode, toggle, setAuto, setLight, setDark };
}