"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";

export default function FloatingParticles() {
  const particles = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: ((i * 13 + 7) % 94) + 3,
        y: ((i * 17 + 11) % 90) + 5,
        size: i % 3 === 0 ? 3.5 : i % 3 === 1 ? 2.5 : 2,
        duration: 9 + ((i * 3) % 10),
        delay: (i * 0.65) % 5,
        opacity: 0.12 + (i % 4) * 0.05,
        color: i % 3 === 0 ? "#9B7B5C" : i % 3 === 1 ? "#D4B4AE" : "#6BA3B5",
        driftX: i % 2 === 0 ? 10 : -10,
        driftY: -18 - (i % 4) * 4,
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
            opacity: [p.opacity, p.opacity * 2.5, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
