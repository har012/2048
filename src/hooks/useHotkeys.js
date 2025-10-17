import { useEffect } from 'react';

export function useHotkeys(bindings) {
  useEffect(() => {
    function onKey(e) {
      const tag = (e.target?.tagName || '').toLowerCase();
      if (tag === 'input' || tag === 'textarea' || e.target?.isContentEditable) return;

      const k = e.key.toLowerCase();
      const fn = bindings[k];
      if (typeof fn === 'function') {
        e.preventDefault();
        fn();
      }
    }

    window.addEventListener('keydown', onKey, { passive: false });
    return () => window.removeEventListener('keydown', onKey);
  }, [bindings]);
}