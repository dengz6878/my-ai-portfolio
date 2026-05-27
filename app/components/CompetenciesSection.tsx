"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Globe2, TrendingUp } from "lucide-react";

const LANGS = ["你好", "Hello", "Bonjour", "مرحبا", "Hola", "Ciao", "こんにちは", "안녕"];

export default function CompetenciesSection({ mobile = false }: { mobile?: boolean }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [langIdx, setLangIdx] = useState(0);
  const langTimer = useRef<ReturnType<typeof setInterval> | null>(null);

  const startLangCycle = () => {
    if (langTimer.current) return;
    langTimer.current = setInterval(() => setLangIdx((i) => (i + 1) % LANGS.length), 480);
  };
  const stopLangCycle = () => {
    if (langTimer.current) { clearInterval(langTimer.current); langTimer.current = null; }
    setLangIdx(0);
  };

  return (
    <section
      className={`relative flex-shrink-0 bg-[#FBF9F6] overflow-hidden ${
        mobile ? "w-full min-h-screen px-6 py-24" : "w-screen h-full flex flex-col justify-center"
      }`}
    >
      {/* 极淡纹理 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle at 85% 85%, rgba(212,180,174,0.1) 0%, transparent 50%)",
        }}
      />

      <div className={`relative z-10 ${mobile ? "" : "max-w-screen-xl mx-auto px-16 w-full"}`}>
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex items-end justify-between"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-px" style={{ background: "#9B7B5C" }} />
              <span
                className="text-[11px] tracking-[0.32em] uppercase"
                style={{ color: "#9B7B5C", fontFamily: "var(--font-body)" }}
              >
                02 — 核心能力
              </span>
            </div>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: mobile ? "2.4rem" : "clamp(2.4rem, 3.8vw, 4rem)",
                fontWeight: 600,
                color: "#1A1A1A",
                letterSpacing: "-0.01em",
              }}
            >
              实力矩阵
            </h2>
          </div>
        </motion.div>

        {/* 便当格 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className={`grid gap-3 ${mobile ? "grid-cols-1" : "grid-cols-3"}`}
          style={mobile ? {} : { gridTemplateRows: "235px 185px" }}
        >
          {/* ── 卡片一：企业级 RAG ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            onHoverStart={() => setHovered(1)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ y: -3 }}
            className={`relative rounded-2xl overflow-hidden cursor-default ${
              mobile ? "min-h-[280px]" : "col-span-2 row-span-2"
            }`}
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(26,26,26,0.07)",
              boxShadow: hovered === 1
                ? "0 12px 48px rgba(26,26,26,0.1)"
                : "0 2px 16px rgba(26,26,26,0.05)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            <div className="p-10 h-full flex flex-col justify-between">
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-7"
                  style={{
                    background: "rgba(155,123,92,0.1)",
                    border: "1px solid rgba(155,123,92,0.2)",
                  }}
                >
                  <Cpu size={18} style={{ color: "#9B7B5C" }} />
                </div>
                <span
                  className="text-[10px] tracking-[0.28em] uppercase font-medium mb-3 block"
                  style={{ color: "#9B7B5C", fontFamily: "var(--font-body)" }}
                >
                  结构化智能
                </span>
                <h3
                  className="mb-4 leading-snug"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.55rem",
                    fontWeight: 600,
                    color: "#1A1A1A",
                  }}
                >
                  企业级 RAG<br />与提示词工程
                </h3>
                <p
                  style={{
                    color: "#6B6459",
                    lineHeight: 1.8,
                    fontSize: "0.92rem",
                    maxWidth: 360,
                    fontFamily: "var(--font-body)",
                    fontWeight: 300,
                  }}
                >
                  构建检索增强系统，将企业原始数据转化为安全、精准校准的输出——
                  每一条提示词都为规模化可靠性精心设计。
                </p>
              </div>

              {/* 悬停展开的代码块 */}
              <AnimatePresence>
                {hovered === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.28 }}
                    className="mt-7 p-5 rounded-xl font-mono text-xs leading-[1.9]"
                    style={{
                      background: "#F5F0E8",
                      border: "1px solid rgba(155,123,92,0.15)",
                      color: "#9B7B5C",
                    }}
                  >
                    <span style={{ color: "rgba(155,123,92,0.5)" }}>$ </span>
                    sys.load(&quot;enterprise_rag&quot;)<br />
                    <span style={{ color: "rgba(26,26,26,0.3)" }}>&gt; 正在初始化管道...</span><br />
                    <span style={{ color: "#6BA3B5" }}>✓</span> 上下文窗口：<span style={{ color: "#1A1A1A" }}>128k tokens</span><br />
                    <span style={{ color: "#6BA3B5" }}>✓</span> 检索精度：<span style={{ color: "#1A1A1A" }}>94.2%</span><br />
                    <span style={{ color: "#6BA3B5" }}>✓</span> 安全层：<span style={{ color: "#9B7B5C" }}>已激活</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 右下角暖色渐变 */}
            <div
              className="absolute bottom-0 right-0 w-48 h-48 pointer-events-none"
              style={{
                background: "radial-gradient(circle at 100% 100%, rgba(212,180,174,0.14), transparent 65%)",
              }}
            />
          </motion.div>

          {/* ── 卡片二：全球化本地化 ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            onHoverStart={() => { setHovered(2); startLangCycle(); }}
            onHoverEnd={() => { setHovered(null); stopLangCycle(); }}
            whileHover={{ y: -3 }}
            className={`relative rounded-2xl overflow-hidden cursor-default ${
              mobile ? "min-h-[220px]" : "col-span-1"
            }`}
            style={{
              background: "#FFFFFF",
              border: "1px solid rgba(26,26,26,0.07)",
              boxShadow: hovered === 2
                ? "0 12px 48px rgba(26,26,26,0.1)"
                : "0 2px 16px rgba(26,26,26,0.05)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            <div className="p-8 h-full flex flex-col justify-between" style={{ minHeight: 160 }}>
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(212,180,174,0.15)", border: "1px solid rgba(212,180,174,0.3)" }}
                >
                  <Globe2 size={18} style={{ color: "#D4B4AE" }} />
                </div>
                <span
                  className="text-[10px] tracking-[0.28em] uppercase font-medium mb-2 block"
                  style={{ color: "#D4B4AE", fontFamily: "var(--font-body)" }}
                >
                  人在回路
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    lineHeight: 1.3,
                  }}
                >
                  全球化与<br />本地化调优
                </h3>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={hovered === 2 ? langIdx : "s"}
                  initial={{ opacity: 0, scale: 0.8, y: 6 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: -6 }}
                  transition={{ duration: 0.25 }}
                  className="mt-4 font-bold"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2rem",
                    color: "#D4B4AE",
                    opacity: hovered === 2 ? 1 : 0.3,
                  }}
                >
                  {hovered === 2 ? LANGS[langIdx] : LANGS[0]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── 卡片三：商业价值 ── */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            onHoverStart={() => setHovered(3)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ y: -3 }}
            className={`relative rounded-2xl overflow-hidden cursor-default ${
              mobile ? "min-h-[220px]" : "col-span-1"
            }`}
            style={{
              background: "#F5F0E8",
              border: "1px solid rgba(26,26,26,0.07)",
              boxShadow: hovered === 3
                ? "0 12px 48px rgba(26,26,26,0.1)"
                : "0 2px 16px rgba(26,26,26,0.05)",
              transition: "box-shadow 0.4s ease",
            }}
          >
            <div className="p-8 h-full flex flex-col justify-between" style={{ minHeight: 160 }}>
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                  style={{ background: "rgba(26,26,26,0.06)", border: "1px solid rgba(26,26,26,0.1)" }}
                >
                  <TrendingUp size={18} style={{ color: "#6B6459" }} />
                </div>
                <span
                  className="text-[10px] tracking-[0.28em] uppercase font-medium mb-2 block"
                  style={{ color: "#6B6459", fontFamily: "var(--font-body)" }}
                >
                  零技术炫耀
                </span>
                <h3
                  className="mb-3"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "1.15rem",
                    fontWeight: 600,
                    color: "#1A1A1A",
                    lineHeight: 1.3,
                  }}
                >
                  以商业价值<br />为导向
                </h3>
                <p style={{ color: "#6B6459", fontSize: "0.84rem", lineHeight: 1.7, fontWeight: 300 }}>
                  纯粹聚焦转化率与可量化的业务增长。
                </p>
              </div>
              <motion.div
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.4rem",
                  fontWeight: 700,
                  color: "#9B7B5C",
                  lineHeight: 1,
                  marginTop: 16,
                }}
                animate={hovered === 3 ? { scale: [1, 1.05, 1] } : { scale: 1 }}
                transition={{ duration: 1.2, repeat: hovered === 3 ? Infinity : 0 }}
              >
                ROI↑
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
