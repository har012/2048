import { useRef, useEffect } from 'react';

export function useSwipe(ref, onDirection, threshold = 30) {
  const start = useRef(null);

  useEffect(() => {
    const el = ref?.current ?? window;

    function onTouchStart(e) {
      const t = e.touches[0];
      start.current = { x: t.clientX, y: t.clientY };
    }
    function onTouchEnd(e) {
      if (!start.current) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - start.current.x;
      const dy = t.clientY - start.current.y;
      const ax = Math.abs(dx);
      const ay = Math.abs(dy);
      if (ax < threshold && ay < threshold) return;
      if (ax > ay) onDirection?.(dx > 0 ? 'right' : 'left');
      else onDirection?.(dy > 0 ? 'down' : 'up');
      start.current = null;
    }

    el.addEventListener('touchstart', onTouchStart, { passive: true });
    el.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, [ref, onDirection, threshold]);
}