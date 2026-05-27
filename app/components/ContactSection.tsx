"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowUpRight } from "lucide-react";

export default function ContactSection({ mobile = false }: { mobile?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      className={`relative flex-shrink-0 overflow-hidden ${
        mobile
          ? "w-full min-h-screen px-6 py-24 flex flex-col justify-center"
          : "w-screen h-full flex items-center justify-center"
      }`}
    >
      {/* Breathing ambient light */}
      <motion.div
        className="absolute inset-0 pointer-events-none flex items-center justify-center"
        aria-hidden
      >
        <motion.div
          className="rounded-full blur-[140px]"
          style={{
            width: 700,
            height: 500,
            background:
              "radial-gradient(ellipse at center, rgba(75,146,167,0.12) 0%, rgba(234,206,221,0.08) 50%, transparent 75%)",
          }}
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(248,246,240,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(248,246,240,0.5) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className={`relative z-10 text-center ${
          mobile ? "w-full" : "max-w-2xl mx-auto px-8"
        }`}
      >
        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8"
        >
          <span
            className="text-[11px] tracking-[0.28em] uppercase font-medium"
            style={{ color: "#4B92A7" }}
          >
            04 — Let&apos;s Connect
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="font-bold mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: mobile ? "3rem" : "clamp(3rem, 6vw, 5.8rem)",
            lineHeight: 1.04,
            background:
              "linear-gradient(140deg, #F8F6F0 0%, #EACEDD 40%, #F8F6F0 80%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Let&apos;s Build
          <br />
          Something Real.
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.75 }}
          className="mb-12 mx-auto max-w-sm"
          style={{
            color: "rgba(248,246,240,0.48)",
            fontSize: "0.98rem",
            lineHeight: 1.75,
          }}
        >
          Currently open to senior AI Data, Training, or Product Specialist
          opportunities.
        </motion.p>

        {/* Email CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.a
            href="mailto:1403672473@qq.com"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-4 px-10 py-5 rounded-full font-semibold relative overflow-hidden"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: mobile ? "1rem" : "1.15rem",
              letterSpacing: "0.02em",
              color: "#F8F6F0",
              background: hovered
                ? "linear-gradient(135deg, #4B92A7 0%, #3a7a8e 100%)"
                : "rgba(75,146,167,0.1)",
              border: "1px solid rgba(75,146,167,0.38)",
              transition: "background 0.4s ease, box-shadow 0.4s ease",
              boxShadow: hovered ? "0 8px 40px rgba(75,146,167,0.3)" : "none",
            }}
          >
            <Mail size={19} />
            1403672473@qq.com
            <motion.div
              animate={{ x: hovered ? 0 : -6, opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <ArrowUpRight size={18} />
            </motion.div>
          </motion.a>
        </motion.div>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          className="mt-16 flex items-center gap-4 justify-center"
        >
          <div
            className="w-12 h-px"
            style={{ background: "rgba(248,246,240,0.12)" }}
          />
          <span
            className="text-[11px] tracking-[0.18em]"
            style={{ color: "rgba(248,246,240,0.22)" }}
          >
            AI 负责效率，人类负责温度。
          </span>
          <div
            className="w-12 h-px"
            style={{ background: "rgba(248,246,240,0.12)" }}
          />
        </motion.div>

        {/* Bottom micro-copy */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-6 text-[10px] tracking-[0.15em] uppercase"
          style={{ color: "rgba(248,246,240,0.18)" }}
        >
          © 2024 · All rights reserved
        </motion.p>
      </div>
    </section>
  );
}
