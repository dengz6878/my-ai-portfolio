"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import HeroSection from "./HeroSection";
import CompetenciesSection from "./CompetenciesSection";
import ProjectSection from "./ProjectSection";
import ContactSection from "./ContactSection";
import FloatingParticles from "./FloatingParticles";

// Hero occupies 4 of 7 total vertical scroll units
const HERO_VH = 4;
const TOTAL_VH = 7; // 4 hero + 3 horizontal sections
const HERO_FRAC = HERO_VH / TOTAL_VH; // ~0.571

const SECTION_LABELS = ["开场", "实力", "案例", "联系"];

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

  const { scrollYProgress } = useScroll({ target: containerRef });

  // Hero video progress: 0→1 over the first HERO_FRAC of total scroll
  const heroProgress: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, HERO_FRAC],
    [0, 1],
    { clamp: true }
  );

  // Horizontal translate: after hero is done, slides Competencies→Project→Contact
  // All 4 sections sit in the track; hero stays fixed while x=0, then slides away
  const rawX = useTransform(
    scrollYProgress,
    [HERO_FRAC, 1],
    [0, -(winW * 3)],
    { clamp: true }
  );
  const x = useSpring(rawX, { stiffness: 65, damping: 22, restDelta: 0.5 });

  // Active nav index
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const hFrac = Math.max(0, (v - HERO_FRAC) / (1 - HERO_FRAC));
      setActiveIdx(Math.round(hFrac * 3));
    });
  }, [scrollYProgress]);

  const scrollToSection = (idx: number) => {
    if (!containerRef.current) return;
    const total = containerRef.current.offsetHeight - window.innerHeight;
    let targetFrac: number;
    if (idx === 0) {
      targetFrac = 0;
    } else {
      // idx 1,2,3 → Competencies, Project, Contact
      // x hits -winW*(idx) at HERO_FRAC + (idx/3)*(1-HERO_FRAC)
      targetFrac = HERO_FRAC + (idx / 3) * (1 - HERO_FRAC);
    }
    window.scrollTo({ top: targetFrac * total, behavior: "smooth" });
  };

  // ── Mobile: vertical layout ─────────────────────────────────────
  if (isMobile) {
    return (
      <div className="relative bg-[#FBF9F6]">
        <FloatingParticles />
        <HeroSection mobile />
        <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(155,123,92,0.2), transparent)" }} />
        <CompetenciesSection mobile />
        <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(212,180,174,0.15), transparent)" }} />
        <ProjectSection mobile />
        <div className="w-full h-px" style={{ background: "linear-gradient(to right, transparent, rgba(155,123,92,0.2), transparent)" }} />
        <ContactSection mobile />
      </div>
    );
  }

  // ── Desktop ─────────────────────────────────────────────────────
  return (
    <>
      <FloatingParticles />

      {/* Scroll progress bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 h-[2px] origin-left"
        style={{
          scaleX: scrollYProgress,
          background: "linear-gradient(to right, #9B7B5C, #D4B4AE, #9B7B5C)",
        }}
      />

      {/* Right nav pills */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2.5">
        {SECTION_LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => scrollToSection(i)}
            title={label}
            className="group flex items-center gap-3 justify-end"
          >
            <span
              className="text-[10px] tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ color: "rgba(26,26,26,0.4)", fontFamily: "var(--font-body)" }}
            >
              {label}
            </span>
            <div
              className="rounded-full"
              style={{
                width: 5,
                height: activeIdx === i ? 20 : 5,
                background: activeIdx === i ? "#9B7B5C" : "rgba(26,26,26,0.18)",
                transition: "height 0.35s cubic-bezier(0.16,1,0.3,1), background 0.3s ease",
              }}
            />
          </button>
        ))}
      </div>

      {/* Bottom section dots */}
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
            className="px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase"
            style={{
              color: activeIdx === i ? "#1A1A1A" : "rgba(26,26,26,0.32)",
              background: activeIdx === i ? "rgba(155,123,92,0.1)" : "transparent",
              border: activeIdx === i ? "1px solid rgba(155,123,92,0.3)" : "1px solid transparent",
              transition: "all 0.35s ease",
            }}
          >
            {label}
          </button>
        ))}
      </motion.div>

      {/* Outer scroll container (7×100vh) */}
      <div
        ref={containerRef}
        style={{ height: `${TOTAL_VH * 100}vh` }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <motion.div
            style={{ x }}
            className="flex h-full horizontal-track"
          >
            <HeroSection heroProgress={heroProgress} />
            <CompetenciesSection />
            <ProjectSection />
            <ContactSection />
          </motion.div>
        </div>
      </div>
    </>
  );
}
