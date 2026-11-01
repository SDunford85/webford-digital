"use client";

import { useEffect, useRef } from "react";

/**
 * The Hexford hexagon globe, drawn live and slowly turning: hexagon rings spread evenly over a sphere,
 * gold "continents" on a blue globe, darker towards the rim. Decorative only.
 * Stays still for visitors who ask their device to reduce motion, and stops drawing when off screen.
 */

type Cell = { p: [number, number, number]; e: [number, number, number]; n: [number, number, number]; gold: 0 | 1 | 2 };

const GOLD = "#E2B33A";
const GOLD_LIGHT = "#F2D27A";
const BLUE = "#4C7BF4";
const DEEP = "#1846C8";

function makeCells(count: number): Cell[] {
  const cells: Cell[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  // Gold patches: centres on the sphere (unit vectors), so gold is always somewhere in view
  const patches: [number, number, number, number][] = [
    [0.35, -0.55, 0.76, 0.5],
    [-0.8, 0.25, -0.55, 0.42],
    [0.55, 0.65, -0.5, 0.36],
  ];
  for (let i = 0; i < count; i++) {
    const y = 1 - (2 * (i + 0.5)) / count;
    const r = Math.sqrt(1 - y * y);
    const th = golden * i;
    const p: [number, number, number] = [Math.cos(th) * r, y, Math.sin(th) * r];
    // Tangent frame: east and north at this point
    let e: [number, number, number] = [-p[2], 0, p[0]];
    const el = Math.hypot(e[0], e[2]) || 1;
    e = [e[0] / el, 0, e[2] / el];
    const n: [number, number, number] = [p[1] * e[2] - p[2] * e[1], p[2] * e[0] - p[0] * e[2], p[0] * e[1] - p[1] * e[0]];
    let gold: 0 | 1 | 2 = 0;
    for (const [x, yy, z, rad] of patches) {
      const d = Math.acos(Math.max(-1, Math.min(1, p[0] * x + p[1] * yy + p[2] * z)));
      if (d < rad * 0.62) gold = 2;
      else if (d < rad && gold === 0) gold = 1;
    }
    cells.push({ p, e, n, gold });
  }
  return cells;
}

export function SpinningGlobe({ className = "", cells = 340 }: { className?: string; cells?: number }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const data = makeCells(cells);
    const spacing = Math.sqrt((4 * Math.PI) / cells); // average gap between cell centres on a unit sphere
    const hexR = spacing * 0.56;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const tilt = -0.38;
    const ct = Math.cos(tilt);
    const st = Math.sin(tilt);
    let angle = 0.6;
    let raf = 0;
    let visible = true;
    let last = performance.now();

    const size = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(r.width * dpr);
      canvas.height = Math.round(r.height * dpr);
    };

    const draw = () => {
      const W = canvas.width;
      const H = canvas.height;
      const R = Math.min(W, H) * 0.47;
      const cx = W / 2;
      const cy = H / 2;
      ctx.clearRect(0, 0, W, H);
      const ca = Math.cos(angle);
      const sa = Math.sin(angle);
      // rotate about the vertical axis, then tilt towards the viewer
      const tf = (v: [number, number, number]): [number, number, number] => {
        const x = v[0] * ca + v[2] * sa;
        const z0 = -v[0] * sa + v[2] * ca;
        const y = v[1] * ct - z0 * st;
        const z = v[1] * st + z0 * ct;
        return [x, y, z];
      };
      const list: { z: number; pts: number[]; inner: number[]; col: string }[] = [];
      for (const c of data) {
        const p = tf(c.p);
        if (p[2] < 0.04) continue;
        const e = tf(c.e);
        const n = tf(c.n);
        const outer: number[] = [];
        const inner: number[] = [];
        for (let k = 0; k < 6; k++) {
          const a = (Math.PI / 3) * k + Math.PI / 6;
          const ox = Math.cos(a) * hexR;
          const oy = Math.sin(a) * hexR;
          for (const [arr, f] of [
            [outer, 0.86],
            [inner, 0.44],
          ] as const) {
            const vx = p[0] + (e[0] * ox + n[0] * oy) * f;
            const vy = p[1] + (e[1] * ox + n[1] * oy) * f;
            arr.push(cx + vx * R, cy - vy * R);
          }
        }
        const col = c.gold === 2 ? GOLD : c.gold === 1 ? GOLD_LIGHT : p[2] > 0.42 ? BLUE : DEEP;
        list.push({ z: p[2], pts: outer, inner, col });
      }
      list.sort((a, b) => a.z - b.z);
      for (const it of list) {
        ctx.beginPath();
        ctx.moveTo(it.pts[0], it.pts[1]);
        for (let i = 2; i < 12; i += 2) ctx.lineTo(it.pts[i], it.pts[i + 1]);
        ctx.closePath();
        ctx.moveTo(it.inner[10], it.inner[11]);
        for (let i = 8; i >= 0; i -= 2) ctx.lineTo(it.inner[i], it.inner[i + 1]);
        ctx.closePath();
        ctx.globalAlpha = 0.35 + 0.65 * Math.min(1, it.z * 1.6);
        ctx.fillStyle = it.col;
        ctx.fill("evenodd");
      }
      ctx.globalAlpha = 1;
    };

    const tick = (now: number) => {
      const dt = Math.min(64, now - last);
      last = now;
      angle += dt * 0.00018;
      draw();
      raf = visible && !reduce.matches ? requestAnimationFrame(tick) : 0;
    };
    const start = () => {
      cancelAnimationFrame(raf);
      last = performance.now();
      if (reduce.matches) draw();
      else raf = requestAnimationFrame(tick);
    };

    size();
    start();
    const ro = new ResizeObserver(() => {
      size();
      draw();
    });
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else cancelAnimationFrame(raf);
    });
    io.observe(canvas);
    reduce.addEventListener("change", start);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      reduce.removeEventListener("change", start);
    };
  }, [cells]);

  return <canvas ref={ref} className={className} aria-hidden />;
}
