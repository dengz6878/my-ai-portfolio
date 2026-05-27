"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        x: ((i * 13 + 7) % 97) + 1.5,
        y: ((i * 17 + 11) % 93) + 3.5,
        size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
        duration: 8 + ((i * 3) % 12),
        delay: (i * 0.7) % 5,
        opacity: 0.06 + (i % 5) * 0.025,
        color: i % 2 === 0 ? "#4B92A7" : "#EACEDD",
        driftX: i % 2 === 0 ? 12 : -12,
        driftY: -20 - (i % 4) * 5,
      })),
    []
  );

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            opacity: p.opacity,
          }}
          animate={{
            y: [0, p.driftY, 0],
            x: [0, p.driftX, 0],
            opacity: [p.opacity, p.opacity * 2.2, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Larger soft glows */}
      {[
        { x: 15, y: 20, color: "#4B92A7", size: 280 },
        { x: 80, y: 70, color: "#EACEDD", size: 200 },
        { x: 50, y: 45, color: "#4B92A7", size: 160 },
      ].map((g, i) => (
        <motion.div
          key={`glow-${i}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${g.x}%`,
            top: `${g.y}%`,
            width: g.size,
            height: g.size,
            background: g.color,
            opacity: 0.028,
            transform: "translate(-50%, -50%)",
          }}
          animate={{
            scale: [1, 1.25, 1],
            opacity: [0.028, 0.048, 0.028],
          }}
          transition={{
            duration: 10 + i * 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 2,
          }}
        />
      ))}
    </div>
  );
}
