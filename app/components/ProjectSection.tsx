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
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [inView, target, duration]);

  return <span ref={ref}>{val}</span>;
}

const STATS = [
  { icon: Zap,          label: "响应时间", value: "< 2秒",  color: "#4B92A7" },
  { icon: Users,        label: "覆盖语言", value: "8+",     color: "#EACEDD" },
  { icon: MessageSquare,label: "问题类型", value: "200+",   color: "#4B92A7" },
  { icon: ArrowUpRight, label: "NPS 提升", value: "+42",    color: "#EACEDD" },
];

const STEPS = [
  {
    step: "01",
    title: "核心痛点",
    body: "通用 AI 回复在 8 个跨境市场中无法引起文化共鸣，导致高放弃率与大量失望的客户。",
    accent: "rgba(75,146,167,0.65)",
  },
  {
    step: "02",
    title: "混合方案",
    body: "强大的 RAG 架构与母语本地化译员协同运作——AI 负责规模与速度，人类提供温度与文化细腻度。",
    accent: "rgba(234,206,221,0.65)",
  },
  {
    step: "03",
    title: "最终成果",
    body: "回复率提升 60%，NPS 改善 42 分，在所有目标市场实现可量化的转化率大幅提升。",
    accent: "rgba(75,146,167,0.65)",
  },
];

export default function ProjectSection({ mobile = false }: { mobile?: boolean }) {
  return (
    <section
      className={`relative flex-shrink-0 overflow-hidden ${
        mobile
          ? "w-full min-h-screen px-6 py-24"
          : "w-screen h-full flex items-center"
      }`}
      style={{
        background:
          "linear-gradient(150deg, #0B0517 0%, #0e0720 45%, #0B0517 100%)",
      }}
    >
      {/* 横线装饰 */}
      <div
        className="absolute top-0 left-0 w-full h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(75,146,167,0.28), transparent)" }}
      />
      <div
        className="absolute bottom-0 left-0 w-full h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(234,206,221,0.18), transparent)" }}
      />

      {/* 中心光晕 */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="rounded-full blur-[120px]"
          style={{ width: 500, height: 500, background: "rgba(75,146,167,0.04)" }}
        />
      </div>

      <div
        className={`relative z-10 w-full ${
          mobile ? "" : "max-w-screen-xl mx-auto px-16"
        }`}
      >
        {/* 区块标签 */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10"
        >
          <span
            className="text-[11px] tracking-[0.28em] uppercase font-medium"
            style={{ color: "#4B92A7" }}
          >
            03 — 标志性案例
          </span>
        </motion.div>

        <div
          className={`${
            mobile ? "space-y-12" : "grid grid-cols-[1fr_1fr] gap-20 items-start"
          }`}
        >
          {/* ── 左：核心数据 ── */}
          <motion.div
            initial={{ opacity: 0, x: -36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* 大数字指标 */}
            <div className="mb-8">
              <div
                className="font-bold leading-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: mobile ? "6.5rem" : "clamp(6rem, 11vw, 10.5rem)",
                  background:
                    "linear-gradient(130deg, #4B92A7 0%, #EACEDD 55%, #4B92A7 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                <CountUp target={60} />%
              </div>
              <div
                className="flex items-center gap-2 mt-1"
                style={{
                  color: "#4B92A7",
                  fontFamily: "var(--font-display)",
                  fontSize: "1.1rem",
                  fontWeight: 600,
                }}
              >
                <span style={{ fontSize: "1.3rem" }}>↑</span>
                回复率提升
              </div>
            </div>

            {/* 数据卡片组 */}
            <div className="grid grid-cols-2 gap-3">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i + 0.2, duration: 0.5 }}
                  whileHover={{ scale: 1.03 }}
                  className="p-4 rounded-2xl"
                  style={{
                    background: "rgba(248,246,240,0.04)",
                    border: "1px solid rgba(248,246,240,0.08)",
                  }}
                >
                  <s.icon size={13} style={{ color: s.color, marginBottom: 6 }} />
                  <div
                    className="text-xl font-bold mb-0.5"
                    style={{ fontFamily: "var(--font-display)", color: s.color }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="text-[10px] tracking-widest"
                    style={{ color: "rgba(248,246,240,0.38)" }}
                  >
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── 右：案例叙述 ── */}
          <motion.div
            initial={{ opacity: 0, x: 36 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="font-bold mb-8 leading-tight"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: mobile ? "1.8rem" : "clamp(1.7rem, 2.8vw, 2.6rem)",
                color: "#F8F6F0",
              }}
            >
              跨境电商
              <br />
              <span style={{ color: "#4B92A7" }}>AI 智能客服</span>
              <br />
              RAG 系统
            </h2>

            <div className="space-y-4">
              {STEPS.map((s, i) => (
                <motion.div
                  key={s.step}
                  initial={{ opacity: 0, x: 18 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 * i + 0.3, duration: 0.65 }}
                  className="flex gap-5 p-5 rounded-2xl"
                  style={{
                    background: "rgba(248,246,240,0.03)",
                    border: `1px solid rgba(248,246,240,0.07)`,
                    borderLeft: `3px solid ${s.accent}`,
                  }}
                >
                  <span
                    className="text-[10px] font-bold tracking-widest flex-shrink-0 pt-0.5"
                    style={{ color: s.accent }}
                  >
                    {s.step}
                  </span>
                  <div>
                    <div
                      className="font-semibold mb-1 text-sm"
                      style={{ color: "#F8F6F0" }}
                    >
                      {s.title}
                    </div>
                    <div
                      style={{
                        color: "rgba(248,246,240,0.48)",
                        fontSize: "0.84rem",
                        lineHeight: 1.75,
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
