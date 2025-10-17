const BEST_KEY = 'best-score';

export function loadBestScore() {
  try {
    const raw = localStorage.getItem(BEST_KEY);
    return raw ? Number(raw) : 0;
  } catch {
    return 0;
  }
}

export function saveBestScore(value) {
  try {
    localStorage.setItem(BEST_KEY, String(value));
  } catch {
    
  }
}