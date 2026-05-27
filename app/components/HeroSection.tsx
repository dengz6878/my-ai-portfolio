"use client";

import { useRef, useEffect } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import FluidVisual from "./FluidVisual";

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

export default function HeroSection({
  mobile = false,
  heroProgress,
}: {
  mobile?: boolean;
  heroProgress?: MotionValue<number>;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const currentTimeRef = useRef(0);
  const rafRef = useRef<number>(0);

  // Mobile fallback: text is always fully visible
  const fallback = useMotionValue(1);
  const prog = heroProgress ?? fallback;

  // Text fades in when video is ~75-95% through
  const textOpacity = useTransform(prog, [0.72, 0.94], [0, 1]);
  const textY = useTransform(prog, [0.72, 0.94], [32, 0]);

  // CTA fades in slightly later for stagger feel
  const ctaOpacity = useTransform(prog, [0.82, 0.97], [0, 1]);
  const ctaY = useTransform(prog, [0.82, 0.97], [20, 0]);

  // Scroll hint fades out as progress begins
  const hintOpacity = useTransform(prog, [0, 0.18], [1, 0]);

  // Update target video time whenever heroProgress changes
  useMotionValueEvent(prog, "change", (v) => {
    const video = videoRef.current;
    if (video && video.duration && !isNaN(video.duration)) {
      targetTimeRef.current = v * video.duration;
    }
  });

  // RAF lerp loop — smoothly drives video.currentTime toward target
  useEffect(() => {
    if (mobile) return;

    const tick = () => {
      const video = videoRef.current;
      if (video && video.duration && !isNaN(video.duration)) {
        const diff = targetTimeRef.current - currentTimeRef.current;
        if (Math.abs(diff) > 0.001) {
          currentTimeRef.current = lerp(currentTimeRef.current, targetTimeRef.current, 0.12);
          try {
            video.currentTime = currentTimeRef.current;
          } catch {
            // currentTime assignment can throw during seek, safe to ignore
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [mobile]);

  // ── Mobile layout ──────────────────────────────────────────────
  if (mobile) {
    return (
      <section className="relative w-full min-h-screen bg-[#FBF9F6] flex flex-col justify-center px-6 py-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 30%, rgba(196,168,130,0.12) 0%, transparent 55%), radial-gradient(circle at 20% 75%, rgba(212,180,174,0.1) 0%, transparent 50%)",
          }}
        />

        {/* Identity tag */}
        <div className="mb-10 flex items-center gap-3">
          <div className="w-6 h-px" style={{ background: "#9B7B5C" }} />
          <span
            className="text-[11px] tracking-[0.32em] uppercase"
            style={{ color: "#9B7B5C", fontFamily: "var(--font-body)" }}
          >
            AI 数据与训练专家
          </span>
        </div>

        <h1
          className="mb-8"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "2.6rem",
            fontWeight: 600,
            lineHeight: 1.08,
            letterSpacing: "-0.01em",
            color: "#1A1A1A",
          }}
        >
          AI 负责效率，
          <br />
          <span style={{ fontStyle: "italic", color: "#9B7B5C" }}>人类负责温度。</span>
        </h1>

        <div className="mb-8">
          <div className="w-14 h-px" style={{ background: "rgba(26,26,26,0.15)" }} />
        </div>

        <p
          className="mb-12"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1.05rem",
            fontWeight: 300,
            lineHeight: 1.85,
            color: "#6B6459",
          }}
        >
          连接 AI 效率与人类温度之间的鸿沟，
          <br />以真实可量化的方式推动业务增长。
        </p>

        <div className="flex items-center gap-10">
          <a
            href="/cv.pdf"
            download
            className="group flex items-center gap-2"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", letterSpacing: "0.08em", color: "#1A1A1A", textDecoration: "none" }}
          >
            <span className="pb-px" style={{ borderBottom: "1px solid rgba(26,26,26,0.35)" }}>下载简历</span>
            <ArrowRight size={13} style={{ color: "#9B7B5C" }} />
          </a>
          <a
            href="mailto:1403672473@qq.com"
            className="group flex items-center gap-2"
            style={{ fontFamily: "var(--font-body)", fontSize: "0.92rem", letterSpacing: "0.08em", color: "#9B7B5C", textDecoration: "none" }}
          >
            <span className="pb-px" style={{ borderBottom: "1px solid rgba(155,123,92,0.4)" }}>联系我</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        <div className="mt-16 relative h-72">
          <FluidVisual />
        </div>
      </section>
    );
  }

  // ── Desktop layout ─────────────────────────────────────────────
  return (
    <section className="relative flex-shrink-0 w-screen h-full bg-[#FBF9F6] overflow-hidden flex items-center">
      {/* Ambient gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 40%, rgba(196,168,130,0.1) 0%, transparent 55%), radial-gradient(circle at 18% 70%, rgba(212,180,174,0.08) 0%, transparent 50%)",
        }}
      />

      <div
        className="relative z-10 w-full max-w-screen-xl mx-auto px-16 grid grid-cols-2 gap-8 h-full py-20"
        style={{ alignItems: "stretch" }}
      >
        {/* ── Left: text reveal ── */}
        <div className="flex flex-col justify-center pr-8">
          {/* Identity tag — always visible */}
          <div className="mb-10 flex items-center gap-3">
            <div className="w-6 h-px" style={{ background: "#9B7B5C" }} />
            <span
              className="text-[11px] tracking-[0.32em] uppercase"
              style={{ color: "#9B7B5C", fontFamily: "var(--font-body)" }}
            >
              AI 数据与训练专家
            </span>
          </div>

          {/* Headline — fades in at ~75% progress */}
          <motion.div style={{ opacity: textOpacity, y: textY }}>
            <h1
              className="mb-8"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(3rem, 5.2vw, 5.6rem)",
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
                color: "#1A1A1A",
              }}
            >
              AI 负责效率，
              <br />
              <span style={{ fontStyle: "italic", color: "#9B7B5C" }}>人类负责温度。</span>
            </h1>

            <div className="mb-8">
              <div className="w-14 h-px" style={{ background: "rgba(26,26,26,0.15)" }} />
            </div>

            <p
              className="mb-12 max-w-sm"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.05rem",
                fontWeight: 300,
                lineHeight: 1.85,
                letterSpacing: "0.01em",
                color: "#6B6459",
              }}
            >
              连接 AI 效率与人类温度之间的鸿沟，
              以真实可量化的方式推动业务增长。
            </p>
          </motion.div>

          {/* CTAs — staggered fade-in slightly after headline */}
          <motion.div
            style={{ opacity: ctaOpacity, y: ctaY }}
            className="flex items-center gap-10"
          >
            <a
              href="/cv.pdf"
              download
              className="group flex items-center gap-2"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.92rem",
                letterSpacing: "0.08em",
                color: "#1A1A1A",
                textDecoration: "none",
              }}
            >
              <span
                className="pb-px transition-all duration-300 group-hover:border-b-[#9B7B5C]"
                style={{ borderBottom: "1px solid rgba(26,26,26,0.35)" }}
              >
                下载简历
              </span>
              <ArrowRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-1"
                style={{ color: "#9B7B5C" }}
              />
            </a>
            <a
              href="mailto:1403672473@qq.com"
              className="group flex items-center gap-2"
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.92rem",
                letterSpacing: "0.08em",
                color: "#9B7B5C",
                textDecoration: "none",
              }}
            >
              <span
                className="pb-px transition-all duration-300"
                style={{ borderBottom: "1px solid rgba(155,123,92,0.4)" }}
              >
                联系我
              </span>
              <ArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </motion.div>

          {/* Scroll hint — visible at start, fades out as progress begins */}
          <motion.div style={{ opacity: hintOpacity }} className="mt-20">
            <motion.div
              animate={{ x: [0, 7, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              className="flex items-center gap-3"
              style={{
                fontSize: "0.7rem",
                letterSpacing: "0.25em",
                color: "rgba(26,26,26,0.28)",
                fontFamily: "var(--font-body)",
              }}
            >
              <div className="w-10 h-px" style={{ background: "rgba(26,26,26,0.15)" }} />
              滚动探索
            </motion.div>
          </motion.div>
        </div>

        {/* ── Right: scroll-driven video ── */}
        <div className="relative flex items-center justify-center overflow-hidden rounded-2xl">
          <video
            ref={videoRef}
            src="/transition.mp4"
            playsInline
            muted
            preload="auto"
            className="w-full h-full object-cover"
            style={{ display: "block" }}
          />
          {/* Subtle vignette overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at center, transparent 55%, rgba(251,249,246,0.35) 100%)",
            }}
          />
        </div>
      </div>
    </section>
  );
}
