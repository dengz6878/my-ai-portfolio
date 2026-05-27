"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import HeroSection from "./HeroSection";
import CompetenciesSection from "./CompetenciesSection";
import ProjectSection from "./ProjectSection";
import ContactSection from "./ContactSection";
import FloatingParticles from "./FloatingParticles";

const SECTIONS = 4;
const SECTION_LABELS = ["The Hook", "Powerhouse", "The Proof", "Connect"];

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [winW, setWinW] = useState(1440);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const update = () => {
      setIsMobile(window.innerWidth < 768);
      setWinW(window.innerWidth);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Horizontal transform driven by vertical scroll
  const { scrollYProgress } = useScroll({ target: containerRef });

  const rawX = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -(winW * (SECTIONS - 1))]
  );
  const x = useSpring(rawX, { stiffness: 65, damping: 22, restDelta: 0.5 });

  // Track active section for nav
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setActiveIdx(Math.round(v * (SECTIONS - 1)));
    });
  }, [scrollYProgress]);

  const scrollToSection = (idx: number) => {
    if (!containerRef.current) return;
    const total = containerRef.current.offsetHeight - window.innerHeight;
    window.scrollTo({ top: (idx / (SECTIONS - 1)) * total, behavior: "smooth" });
  };

  // ── Mobile: vertical layout ─────────────────────────────────────
  if (isMobile) {
    return (
      <div className="relative bg-[#0B0517]">
        <FloatingParticles />
        <HeroSection mobile />
        <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(75,146,167,0.2), transparent)" }} />
        <CompetenciesSection mobile />
        <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(234,206,221,0.15), transparent)" }} />
        <ProjectSection mobile />
        <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(75,146,167,0.2), transparent)" }} />
        <ContactSection mobile />
      </div>
    );
  }

  // ── Desktop: horizontal scroll ──────────────────────────────────
  return (
    <>
      <FloatingParticles />

      {/* ── Scroll progress bar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(to right, #4B92A7, #EACEDD, #4B92A7)",
        }}
      />

      {/* ── Right nav pills ── */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
        {SECTION_LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => scrollToSection(i)}
            title={label}
            className="group flex items-center gap-3 justify-end"
          >
            {/* Label tooltip on hover */}
            <span
              className="text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: "rgba(248,246,240,0.5)" }}
            >
              {label}
            </span>
            {/* Pill indicator */}
            <div
              className="rounded-full transition-all duration-400"
              style={{
                width: 6,
                height: activeIdx === i ? 22 : 6,
                background: activeIdx === i ? "#4B92A7" : "rgba(248,246,240,0.22)",
                transition: "height 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease",
              }}
            />
          </button>
        ))}
      </div>

      {/* ── Bottom section label ── */}
      <motion.div
        className="fixed bottom-7 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
      >
        {SECTION_LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => scrollToSection(i)}
            className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase transition-all duration-350"
            style={{
              color: activeIdx === i ? "#F8F6F0" : "rgba(248,246,240,0.28)",
              background: activeIdx === i ? "rgba(75,146,167,0.18)" : "transparent",
              border: activeIdx === i ? "1px solid rgba(75,146,167,0.35)" : "1px solid transparent",
              transition: "all 0.35s ease",
            }}
          >
            {label}
          </button>
        ))}
      </motion.div>

      {/* ── Outer scroll container (creates scroll space) ── */}
      <div
        ref={containerRef}
        style={{ height: `${SECTIONS * 100}vh` }}
        className="relative"
      >
        {/* Sticky viewport */}
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Horizontally translating track */}
          <motion.div
            style={{ x }}
            className="flex h-full horizontal-track"
          >
            <HeroSection />
            <CompetenciesSection />
            <ProjectSection />
            <ContactSection />
          </motion.div>
        </div>
      </div>
    </>
  );
}
