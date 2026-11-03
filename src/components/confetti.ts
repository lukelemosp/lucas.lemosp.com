/** Confete leve em tons de laranja (canvas, sem dependências). Ignorado com prefers-reduced-motion. */
const COLORS = ['#FF9500', '#FFCC00', '#FFB340', '#F28500', '#C93400'];
const COUNT = 44;
const DURATION = 1800;

export function fireConfetti() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const canvas = document.createElement('canvas');
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const w = window.innerWidth, h = window.innerHeight;
  canvas.width = w * dpr; canvas.height = h * dpr;
  Object.assign(canvas.style, { position: 'fixed', inset: '0', width: `${w}px`, height: `${h}px`, pointerEvents: 'none', zIndex: '40' });
  canvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  if (!ctx) { canvas.remove(); return; }
  ctx.scale(dpr, dpr);

  // Sai de trás do banner de conquista (topo, centro) e cai abrindo em leque.
  const parts = Array.from({ length: COUNT }, () => {
    const angle = Math.PI / 2 + (Math.random() - 0.5) * 2.2;
    const speed = 4 + Math.random() * 5;
    return {
      x: w / 2 + (Math.random() - 0.5) * 120, y: 56,
      vx: Math.cos(angle) * speed, vy: Math.sin(angle) * speed * 0.6,
      size: 5 + Math.random() * 5, rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 0.3,
      color: COLORS[(Math.random() * COLORS.length) | 0],
    };
  });

  const start = performance.now();
  let prev = start;
  const tick = (now: number) => {
    const t = now - start;
    const dt = Math.min(2, (now - prev) / 16.67); prev = now;
    ctx.clearRect(0, 0, w, h);
    ctx.globalAlpha = Math.max(0, 1 - Math.max(0, t - DURATION * 0.6) / (DURATION * 0.4));
    for (const p of parts) {
      p.vy += 0.18 * dt; p.vx *= 0.99; p.vy *= 0.99;
      p.x += p.vx * dt; p.y += p.vy * dt; p.rot += p.vr * dt;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rot);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
      ctx.restore();
    }
    if (t < DURATION) requestAnimationFrame(tick); else canvas.remove();
  };
  requestAnimationFrame(tick);
}
