import { useEffect } from 'react';

const SELECTOR = '.tile, .doc';
const MAX_TILT = 2.5; // graus

/**
 * Hover estilo visionOS nos cards: brilho que segue o cursor (--mx/--my) e
 * leve inclinação 3D (--tilt-x/--tilt-y/--tilt). Só em mouse/trackpad e sem
 * prefers-reduced-motion. Um único listener delegado para todos os cards.
 */
export function usePointerGlow() {
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let current: HTMLElement | null = null;
    let frame = 0;
    let last: PointerEvent | null = null;

    const reset = (el: HTMLElement) => {
      el.removeAttribute('data-glow');
      el.style.setProperty('--tilt', '0deg');
    };

    const apply = () => {
      frame = 0;
      if (!last) return;
      const target = (last.target as Element | null)?.closest<HTMLElement>(SELECTOR) ?? null;
      if (current && current !== target) reset(current);
      current = target;
      if (!target) return;
      const r = target.getBoundingClientRect();
      const px = (last.clientX - r.left) / r.width;  // 0..1
      const py = (last.clientY - r.top) / r.height;
      target.setAttribute('data-glow', '');
      target.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      target.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
      // Cards grandes (páginas de documento) inclinam menos.
      const scale = Math.min(1, 420 / Math.max(r.width, r.height));
      const ax = -(py - 0.5); // eixo X: cima/baixo
      const ay = px - 0.5;    // eixo Y: esquerda/direita
      const mag = Math.hypot(ax, ay);
      target.style.setProperty('--tilt-x', ax.toFixed(3));
      target.style.setProperty('--tilt-y', ay.toFixed(3));
      target.style.setProperty('--tilt', `${(mag * 2 * MAX_TILT * scale).toFixed(2)}deg`);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || !fine.matches || reduced.matches) return;
      last = e;
      if (!frame) frame = requestAnimationFrame(apply);
    };
    const onLeave = () => { if (current) reset(current); current = null; last = null; };

    document.addEventListener('pointermove', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      document.removeEventListener('pointermove', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      cancelAnimationFrame(frame);
      if (current) reset(current);
    };
  }, []);
}
