import { useEffect, type RefObject } from 'react';

/**
 * Arrastar para fechar o menu lateral no celular (como uma sheet do iOS).
 * Segue o dedo, tem resistência elástica para a direita e fecha por
 * distância (30% da largura) ou velocidade. Gestos verticais rolam o menu.
 */
export function useSwipeToClose(ref: RefObject<HTMLElement>, open: boolean, onClose: () => void) {
  useEffect(() => {
    const el = ref.current;
    if (!el || !open || !window.matchMedia('(max-width: 743px)').matches) return;
    const scrim = document.querySelector<HTMLElement>('.scrim');
    let startX = 0, startY = 0, lastX = 0, lastT = 0, dx = 0, vx = 0;
    let tracking = false, dragging = false, suppressClick = false;

    const restore = () => {
      el.style.transition = ''; el.style.transform = '';
      if (scrim) { scrim.style.transition = ''; scrim.style.opacity = ''; }
    };

    const down = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      startX = lastX = e.clientX; startY = e.clientY; lastT = e.timeStamp;
      dx = 0; vx = 0; tracking = true; dragging = false;
    };
    const move = (e: PointerEvent) => {
      if (!tracking) return;
      const mx = e.clientX - startX, my = e.clientY - startY;
      if (!dragging) {
        if (Math.abs(mx) < 8 && Math.abs(my) < 8) return;
        if (Math.abs(my) > Math.abs(mx)) { tracking = false; return; } // rolagem vertical
        dragging = true;
        el.style.transition = 'none';
        if (scrim) scrim.style.transition = 'none';
      }
      dx = mx < 0 ? mx : Math.min(mx * 0.15, 14); // elástico para a direita
      const dt = e.timeStamp - lastT;
      if (dt > 0) vx = 0.8 * ((e.clientX - lastX) / dt) + 0.2 * vx;
      lastX = e.clientX; lastT = e.timeStamp;
      el.style.transform = `translateX(${dx}px)`;
      if (scrim) scrim.style.opacity = String(Math.max(0, 1 + dx / el.offsetWidth));
    };
    const up = () => {
      if (!tracking) return;
      tracking = false;
      if (!dragging) return;
      suppressClick = true;
      window.setTimeout(() => { suppressClick = false; }, 0);
      const close = dx < -el.offsetWidth * 0.3 || vx < -0.45;
      restore(); // a transição CSS leva de onde o dedo soltou até aberto/fechado
      if (close) onClose();
    };
    const click = (e: MouseEvent) => { if (suppressClick) { e.preventDefault(); e.stopPropagation(); } };

    el.addEventListener('pointerdown', down);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerup', up);
    el.addEventListener('pointercancel', up);
    el.addEventListener('click', click, true);
    return () => {
      el.removeEventListener('pointerdown', down);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerup', up);
      el.removeEventListener('pointercancel', up);
      el.removeEventListener('click', click, true);
      restore();
    };
  }, [ref, open, onClose]);
}
