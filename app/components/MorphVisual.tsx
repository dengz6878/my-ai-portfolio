"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface Particle {
  col: number;
  row: number;
  gridX: number;
  gridY: number;
  organicOffX: number;
  organicOffY: number;
  phase: number;
  ampX: number;
  ampY: number;
  speed: number;
  ratio: number; // 0 = fully mechanical, 1 = fully organic
  size: number;
}

const COLS = 7;
const ROWS = 6;

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

const hexToRgb = (hex: string) => ({
  r: parseInt(hex.slice(1, 3), 16),
  g: parseInt(hex.slice(3, 5), 16),
  b: parseInt(hex.slice(5, 7), 16),
});

const CYAN = hexToRgb("#4B92A7");
const SAKURA = hexToRgb("#EACEDD");

export default function MorphVisual() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const buildParticles = (w: number, h: number) => {
      const px = w * 0.08;
      const py = h * 0.12;
      const cw = (w - px * 2) / (COLS - 1);
      const ch = (h - py * 2) / (ROWS - 1);
      const list: Particle[] = [];

      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          const ratio = c / (COLS - 1);
          list.push({
            col: c,
            row: r,
            gridX: px + c * cw,
            gridY: py + r * ch,
            organicOffX: (Math.random() - 0.5) * cw * 0.65,
            organicOffY: (Math.random() - 0.5) * ch * 0.65,
            phase: Math.random() * Math.PI * 2,
            ampX: (2 + Math.random() * 10) * ratio,
            ampY: (2 + Math.random() * 8) * ratio,
            speed: 0.25 + Math.random() * 0.4,
            ratio,
            size: 2 + ratio * 2.5,
          });
        }
      }
      particlesRef.current = list;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      buildParticles(rect.width, rect.height);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    let t0 = performance.now();

    const draw = (now: number) => {
      const rect = canvas.getBoundingClientRect();
      const W = rect.width;
      const H = rect.height;
      const t = (now - t0) / 1000;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      ctx.clearRect(0, 0, W, H);

      const pts = particlesRef.current.map((p) => {
        const fx = Math.sin(t * p.speed + p.phase) * p.ampX;
        const fy = Math.cos(t * p.speed * 0.73 + p.phase * 1.31) * p.ampY;
        let px = lerp(p.gridX, p.gridX + p.organicOffX + fx, p.ratio);
        let py = lerp(p.gridY, p.gridY + p.organicOffY + fy, p.ratio);

        // Mouse repulsion
        const dx = px - mx;
        const dy = py - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const rep = Math.max(0, 1 - dist / 90);
        if (rep > 0) {
          const a = Math.atan2(dy, dx);
          px += Math.cos(a) * rep * 30 * (0.3 + p.ratio * 0.7);
          py += Math.sin(a) * rep * 30 * (0.3 + p.ratio * 0.7);
        }
        return { x: px, y: py };
      });

      // Draw lines
      ctx.lineWidth = 1;
      for (let c = 0; c < COLS; c++) {
        for (let r = 0; r < ROWS; r++) {
          const i = c * ROWS + r;
          const p = particlesRef.current[i];
          const pos = pts[i];
          const cr = lerp(CYAN.r, SAKURA.r, p.ratio);
          const cg = lerp(CYAN.g, SAKURA.g, p.ratio);
          const cb = lerp(CYAN.b, SAKURA.b, p.ratio);

          const drawLink = (j: number, midRatio: number) => {
            const posJ = pts[j];
            const alpha = lerp(0.38, 0.12, midRatio);
            ctx.beginPath();
            ctx.moveTo(pos.x, pos.y);
            if (midRatio > 0.45) {
              const cpx = (pos.x + posJ.x) / 2 + Math.sin(t * 0.5 + p.phase) * 14 * midRatio;
              const cpy = (pos.y + posJ.y) / 2 + Math.cos(t * 0.4 + p.phase) * 8 * midRatio;
              ctx.quadraticCurveTo(cpx, cpy, posJ.x, posJ.y);
            } else {
              ctx.lineTo(posJ.x, posJ.y);
            }
            ctx.strokeStyle = `rgba(${cr},${cg},${cb},${alpha})`;
            ctx.lineWidth = lerp(1.4, 0.6, midRatio);
            ctx.stroke();
          };

          if (c < COLS - 1) drawLink((c + 1) * ROWS + r, (p.ratio + particlesRef.current[(c + 1) * ROWS + r].ratio) / 2);
          if (r < ROWS - 1) drawLink(c * ROWS + (r + 1), p.ratio);
        }
      }

      // Draw particles
      particlesRef.current.forEach((p, i) => {
        const pos = pts[i];
        const cr = lerp(CYAN.r, SAKURA.r, p.ratio);
        const cg = lerp(CYAN.g, SAKURA.g, p.ratio);
        const cb = lerp(CYAN.b, SAKURA.b, p.ratio);

        if (p.ratio > 0.4) {
          const glowR = p.size * (3.5 + Math.sin(t * p.speed + p.phase) * 0.8);
          const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowR);
          g.addColorStop(0, `rgba(${cr},${cg},${cb},${(p.ratio - 0.4) * 0.22})`);
          g.addColorStop(1, `rgba(${cr},${cg},${cb},0)`);
          ctx.beginPath();
          ctx.arc(pos.x, pos.y, glowR, 0, Math.PI * 2);
          ctx.fillStyle = g;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(pos.x, pos.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${lerp(0.9, 0.72, p.ratio)})`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.4, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full h-full"
    >
      {/* Labels */}
      <div className="absolute top-4 left-4 flex items-center gap-2 pointer-events-none z-10">
        <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: "rgba(75,146,167,0.7)" }}>
          机械
        </span>
        <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, rgba(75,146,167,0.5), rgba(234,206,221,0.5))", width: 60 }} />
        <span className="text-[10px] tracking-[0.25em] uppercase font-medium" style={{ color: "rgba(234,206,221,0.7)" }}>
          人类
        </span>
      </div>

      <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
    </motion.div>
  );
}
