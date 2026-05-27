"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Zap, Users, MessageSquare, ArrowUpRight } from "lucide-react";

function CountUp({ target, duration = 2 }: { target: number; duration?: number }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const tick = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / (duration * 1000), 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);
  return <span ref={ref}>{val}</span>;
}

const STATS = [
  { icon: Zap,           label: "响应时间", value: "< 2秒", color: "#9B7B5C" },
  { icon: Users,         label: "覆盖语言", value: "8+",    color: "#6BA3B5" },
  { icon: MessageSquare, label: "问题类型", value: "200+",  color: "#9B7B5C" },
  { icon: ArrowUpRight,  label: "NPS 提升", value: "+42",   color: "#D4B4AE" },
];

const STEPS = [
  {
    step: "01", title: "核心痛点",
    body: "通用 AI 回复在 8 个跨境市场中无法引起文化共鸣，导致高放弃率与大量失望的客户。",
    accent: "#9B7B5C",
  },
  {
    step: "02", title: "混合方案",
    body: "强大的 RAG 架构与母语本地化译员协同运作——AI 负责规模与速度，人类提供温度与文化细腻度。",
    accent: "#6BA3B5",
  },
  {
    step: "03", title: "最终成果",
    body: "回复率提升 60%，NPS 改善 42 分，在所有目标市场实现可量化的转化率大幅提升。",
    accent: "#D4B4AE",
  },
];

export default function ProjectSection({ mobile = false }: { mobile?: boolean }) {
  return (
    <section
      className={`relative flex-shrink-0 overflow-hidden ${
        mobile ? "w-full min-h-screen px-6 py-24" : "w-screen h-full flex items-center"
      }`}
      style={{ background: "#F5F0E8" }}
    >
      {/* 顶部细线 */}
      <div
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{ background: "rgba(26,26,26,0.08)" }}
      />

      {/* 淡纹理 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 20% 20%, rgba(107,163,181,0.1) 0%, transparent 55%)",
        }}
      />

      <div className={`relative z-10 w-full ${mobile ? "" : "max-w-screen-xl mx-auto px-16"}`}>
        {/* 区块标签 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-center gap-3"
        >
          <div className="w-6 h-px" style={{ background: "#9B7B5C" }} />
          <span
            className="text-[11px] tracking-[0.32em] uppercase"
            style={{ color: "#9B7B5C", fontFamily: "var(--font-body)" }}
          >
            03 — 标志性案例
          </span>
        </motion.div>

        <div className={mobile ? "space-y-12" : "grid grid-cols-[1fr_1fr] gap-20 items-start"}>
          {/* ── 左：核心数据 ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 大指标 */}
            <div className="mb-8">
              <div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: mobile ? "6rem" : "clamp(5.5rem, 11vw, 10rem)",
                  fontWeight: 700,
                  lineHeight: 1,
                  color: "#9B7B5C",
                  letterSpacing: "-0.02em",
                }}
              >
                <CountUp target={60} />%
              </div>
              <div
                className="flex items-center gap-2 mt-2"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.88rem",
                  letterSpacing: "0.12em",
                  color: "#6B6459",
                }}
              >
                <span style={{ color: "#9B7B5C", fontSize: "1rem" }}>↑</span>
                回复率提升
              </div>
            </div>

            {/* 数据卡片 */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                  whileHover={{ y: -2 }}
                  className="p-4 rounded-xl"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(26,26,26,0.07)",
                    boxShadow: "0 2px 12px rgba(26,26,26,0.04)",
                  }}
                >
                  <s.icon size={13} style={{ color: s.color, marginBottom: 6 }} />
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.4rem",
                      fontWeight: 600,
                      color: "#1A1A1A",
                      marginBottom: 2,
                    }}
                  >
                    {s.value}
                  </div>
                  <div style={{ fontSize: "0.72rem", color: "#6B6459", letterSpacing: "0.05em" }}>
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 右：案例叙述 ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="mb-8 leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: mobile ? "1.8rem" : "clamp(1.7rem, 2.8vw, 2.5rem)",
                fontWeight: 600,
                color: "#1A1A1A",
                letterSpacing: "-0.01em",
              }}
            >
              跨境电商
              <span style={{ fontStyle: "italic", color: "#9B7B5C" }}> AI 智能客服</span>
              <br />RAG 系统
            </h2>

            <div className="space-y-3">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: 16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 * i + 0.3, duration: 0.6 }}
                  className="flex gap-5 p-5 rounded-xl"
                  style={{
                    background: "#FFFFFF",
                    border: "1px solid rgba(26,26,26,0.07)",
                    borderLeft: `3px solid ${s.accent}`,
                    boxShadow: "0 2px 10px rgba(26,26,26,0.04)",
                  }}
                >
                  <span
                    className="text-[10px] font-bold tracking-widest flex-shrink-0 pt-0.5"
                    style={{ color: s.accent, fontFamily: "var(--font-body)" }}
                  >
                    {s.step}
                  </span>
                  <div>
                    <div
                      className="mb-1 text-sm font-semibold"
                      style={{ color: "#1A1A1A", fontFamily: "var(--font-body)" }}
                    >
                      {s.title}
                    </div>
                    <div
                      style={{
                        color: "#6B6459",
                        fontSize: "0.84rem",
                        lineHeight: 1.8,
                        fontWeight: 300,
                        fontFamily: "var(--font-body)",
                      }}
                    >
                      {s.body}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
