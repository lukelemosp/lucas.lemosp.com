import { useLayoutEffect, type RefObject } from 'react';
import { EASE_OUT } from './motion';

/**
 * Transição "zoom" (estilo iOS 18) do ícone de um tile da home para o
 * cabeçalho da página de destino. Um "fantasma" fixo cobre a troca de rota
 * (o AnimatePresence desmonta a origem antes de montar o destino) e voa até
 * a posição final do ícone na página.
 */
let pending: { key: string; ghost: HTMLElement; timer: number } | null = null;

const reduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clear() {
  if (!pending) return;
  window.clearTimeout(pending.timer);
  pending.ghost.remove();
  pending = null;
}

/** Chamar no clique do link do tile, com o elemento de origem (o ícone do cabeçalho). */
export function startZoom(key: string, source: Element | null | undefined) {
  clear();
  if (!source || reduced()) return;
  const r = source.getBoundingClientRect();
  const ghost = document.createElement('div');
  ghost.className = 'zoom-ghost';
  ghost.setAttribute('aria-hidden', 'true');
  ghost.appendChild(source.cloneNode(true));
  Object.assign(ghost.style, { left: `${r.left}px`, top: `${r.top}px`, width: `${r.width}px`, height: `${r.height}px` });
  document.body.appendChild(ghost);
  pending = { key, ghost, timer: window.setTimeout(clear, 1500) };
}

/** No destino: se houver um zoom pendente para `key`, anima o fantasma até `ref`. */
export function useZoomTarget(key: string, ref: RefObject<HTMLElement>) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!pending || pending.key !== key || !el) return;
    const { ghost } = pending;
    window.clearTimeout(pending.timer);
    pending = null;

    // O card entra com translate/scale do framer: compensa para mirar a posição final.
    const card = el.closest<HTMLElement>('.doc');
    const t = card ? getComputedStyle(card).transform : 'none';
    const m = new DOMMatrix(t === 'none' ? undefined : t);
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    const icon = el.querySelector('svg');
    const iconSize = icon ? icon.getBoundingClientRect().width / m.a : 26;
    const to = { left: (r.left - m.e) , top: (r.top - m.f), width: r.width / m.a, height: r.height / m.d };

    el.style.visibility = 'hidden';
    const g = ghost.getBoundingClientRect();
    const opts: KeyframeAnimationOptions = { duration: 480, easing: `cubic-bezier(${EASE_OUT.join(',')})`, fill: 'forwards' };
    const box = ghost.animate([
      { left: `${g.left}px`, top: `${g.top}px`, width: `${g.width}px`, height: `${g.height}px`,
        backgroundColor: 'transparent', borderColor: 'transparent', borderRadius: '6px', boxShadow: 'none' },
      { left: `${to.left}px`, top: `${to.top}px`, width: `${to.width}px`, height: `${to.height}px`,
        backgroundColor: cs.backgroundColor, borderColor: cs.borderTopColor, borderRadius: cs.borderTopLeftRadius, boxShadow: cs.boxShadow },
    ], opts);
    ghost.firstElementChild?.animate([{ width: `${g.width}px`, height: `${g.height}px` }, { width: `${iconSize}px`, height: `${iconSize}px` }], opts);

    const finish = () => {
      el.style.visibility = '';
      ghost.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140, fill: 'forwards' }).onfinish = () => ghost.remove();
    };
    box.onfinish = finish;
    box.oncancel = finish;
  }, [key, ref]);
}
