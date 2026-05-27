"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const PARTICLES = [
  { size: 5, color: "#9B7B5C", x: "18%", y: "22%", dur: 8,  delay: 0   },
  { size: 3, color: "#D4B4AE", x: "72%", y: "15%", dur: 11, delay: 1.5 },
  { size: 4, color: "#6BA3B5", x: "55%", y: "70%", dur: 9,  delay: 0.8 },
  { size: 2, color: "#9B7B5C", x: "82%", y: "55%", dur: 13, delay: 2.2 },
  { size: 3, color: "#D4B4AE", x: "30%", y: "80%", dur: 7,  delay: 3.1 },
  { size: 4, color: "#6BA3B5", x: "12%", y: "60%", dur: 10, delay: 1.0 },
  { size: 2, color: "#9B7B5C", x: "65%", y: "35%", dur: 12, delay: 4.0 },
  { size: 3, color: "#D4B4AE", x: "42%", y: "12%", dur: 9,  delay: 2.7 },
];

export default function FluidVisual() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) * 0.04);
    mouseY.set((e.clientY - cy) * 0.04);
  };
  const resetMouse = () => { mouseX.set(0); mouseY.set(0); };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden"
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
    >
      {/* ── Blob 1: warm sand/cognac (large, center-left) ── */}
      <motion.div
        className="absolute"
        style={{
          width: "58%", height: "55%",
          top: "22%", left: "8%",
          borderRadius: "62% 38% 46% 54% / 60% 44% 56% 40%",
          background: "linear-gradient(135deg, rgba(196,168,130,0.55), rgba(155,123,92,0.35))",
          filter: "blur(38px)",
          x: springX,
          y: springY,
        }}
        animate={{
          borderRadius: [
            "62% 38% 46% 54% / 60% 44% 56% 40%",
            "44% 56% 62% 38% / 50% 56% 44% 50%",
            "70% 30% 38% 62% / 42% 62% 38% 58%",
            "62% 38% 46% 54% / 60% 44% 56% 40%",
          ],
          scale: [1, 1.05, 0.97, 1],
        }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Blob 2: blush (upper right) ── */}
      <motion.div
        className="absolute"
        style={{
          width: "45%", height: "42%",
          top: "5%", right: "2%",
          borderRadius: "38% 62% 54% 46% / 48% 40% 60% 52%",
          background: "linear-gradient(150deg, rgba(212,180,174,0.5), rgba(232,206,200,0.35))",
          filter: "blur(50px)",
        }}
        animate={{
          borderRadius: [
            "38% 62% 54% 46% / 48% 40% 60% 52%",
            "62% 38% 40% 60% / 60% 52% 48% 40%",
            "38% 62% 54% 46% / 48% 40% 60% 52%",
          ],
          scale: [1, 1.08, 1],
          x: [0, -18, 0],
          y: [0, 22, 0],
        }}
        transition={{ duration: 13, delay: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Blob 3: soft teal (lower center) ── */}
      <motion.div
        className="absolute"
        style={{
          width: "38%", height: "38%",
          bottom: "8%", right: "18%",
          borderRadius: "54% 46% 38% 62% / 52% 60% 40% 48%",
          background: "linear-gradient(120deg, rgba(107,163,181,0.38), rgba(91,145,165,0.22))",
          filter: "blur(55px)",
        }}
        animate={{
          borderRadius: [
            "54% 46% 38% 62% / 52% 60% 40% 48%",
            "38% 62% 58% 42% / 44% 48% 56% 52%",
            "54% 46% 38% 62% / 52% 60% 40% 48%",
          ],
          scale: [1, 1.1, 1],
          x: [0, 15, 0],
          y: [0, -18, 0],
        }}
        transition={{ duration: 11, delay: 3.5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* ── Thin organic SVG lines ── */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 500 600"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M 40 520 C 120 400, 280 320, 400 180"
          stroke="rgba(155,123,92,0.18)"
          strokeWidth="1.2"
          strokeDasharray="6 12"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M 80 560 C 180 440, 320 360, 460 220"
          stroke="rgba(107,163,181,0.14)"
          strokeWidth="1"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 3.2, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
        />
        <motion.path
          d="M 200 580 C 260 480, 380 380, 480 260"
          stroke="rgba(212,180,174,0.2)"
          strokeWidth="0.8"
          strokeDasharray="3 10"
          fill="none"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2.5, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>

      {/* ── Floating micro-particles ── */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size,
            background: p.color,
            left: p.x,
            top: p.y,
            opacity: 0.45,
          }}
          animate={{
            y: [0, -22 - i * 2, 0],
            x: [0, i % 2 === 0 ? 12 : -12, 0],
            opacity: [0.3, 0.7, 0.3],
            scale: [1, 1.4, 1],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
