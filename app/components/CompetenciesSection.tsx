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
    langTimer.current = setInterval(() => {
      setLangIdx((i) => (i + 1) % LANGS.length);
    }, 480);
  };
  const stopLangCycle = () => {
    if (langTimer.current) { clearInterval(langTimer.current); langTimer.current = null; }
    setLangIdx(0);
  };

  return (
    <section
      className={`relative flex-shrink-0 overflow-hidden ${
        mobile
          ? "w-full min-h-screen px-6 py-24"
          : "w-screen h-full flex flex-col justify-center"
      }`}
    >
      {/* 竖线装饰 */}
      <div
        className="absolute top-0 left-1/3 w-px h-full pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, transparent 0%, rgba(75,146,167,0.12) 30%, rgba(75,146,167,0.12) 70%, transparent 100%)",
        }}
      />

      <div
        className={`relative z-10 ${mobile ? "" : "max-w-screen-xl mx-auto px-16 w-full"}`}
      >
        {/* 标题区 */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <span
            className="text-[11px] font-medium tracking-[0.28em] uppercase"
            style={{ color: "#4B92A7" }}
          >
            02 — 核心能力
          </span>
          <h2
            className="mt-2 font-bold leading-tight"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: mobile ? "2.4rem" : "clamp(2.4rem, 4vw, 4.2rem)",
              background: "linear-gradient(135deg, #F8F6F0, #EACEDD)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            实力矩阵
          </h2>
        </motion.div>

        {/* 便当格布局 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className={`grid gap-4 ${
            mobile ? "grid-cols-1" : "grid-cols-3"
          }`}
          style={mobile ? {} : { gridTemplateRows: "230px 180px" }}
        >
          {/* ── 卡片一：企业级 RAG ── col-span-2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.05 }}
            onHoverStart={() => setHovered(1)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ scale: 1.01 }}
            className={`relative rounded-3xl overflow-hidden cursor-default ${
              mobile ? "min-h-[280px]" : "col-span-2 row-span-2"
            }`}
            style={{
              background:
                "linear-gradient(135deg, rgba(75,146,167,0.14) 0%, rgba(11,5,23,0.82) 100%)",
              border: "1px solid rgba(75,146,167,0.22)",
            }}
          >
            <div className="p-10 h-full flex flex-col justify-between">
              <div>
                <div
                  className="w-11 h-11 rounded-2xl flex items-center justify-center mb-7"
                  style={{
                    background: "rgba(75,146,167,0.14)",
                    border: "1px solid rgba(75,146,167,0.28)",
                  }}
                >
                  <Cpu size={20} style={{ color: "#4B92A7" }} />
                </div>
                <span
                  className="text-[10px] tracking-[0.28em] uppercase font-semibold mb-3 block"
                  style={{ color: "rgba(75,146,167,0.8)" }}
                >
                  结构化智能
                </span>
                <h3
                  className="font-bold text-2xl mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-display)", color: "#F8F6F0" }}
                >
                  企业级 RAG<br />与提示词工程
                </h3>
                <p
                  style={{
                    color: "rgba(248,246,240,0.5)",
                    lineHeight: 1.75,
                    fontSize: "0.93rem",
                    maxWidth: 380,
                  }}
                >
                  构建检索增强系统，将企业原始数据转化为安全、精准校准的输出——
                  每一条提示词都为规模化可靠性精心设计。
                </p>
              </div>

              {/* 悬停：代码微故障动效 */}
              <AnimatePresence>
                {hovered === 1 && (
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.3 }}
                    className="mt-7 p-5 rounded-2xl font-mono text-xs leading-[1.9]"
                    style={{
                      background: "rgba(11,5,23,0.85)",
                      border: "1px solid rgba(75,146,167,0.18)",
                      color: "#4B92A7",
                    }}
                  >
                    <span style={{ color: "rgba(75,146,167,0.45)" }}>$ </span>
                    sys.load(&quot;enterprise_rag&quot;)<br />
                    <span style={{ color: "rgba(248,246,240,0.25)" }}>
                      &gt; 正在初始化管道...
                    </span>
                    <br />
                    <span style={{ color: "#4fcf70" }}>✓</span>{" "}
                    上下文窗口：{" "}
                    <span style={{ color: "#EACEDD" }}>128k tokens</span>
                    <br />
                    <span style={{ color: "#4fcf70" }}>✓</span>{" "}
                    检索精度：{" "}
                    <span style={{ color: "#EACEDD" }}>94.2%</span>
                    <br />
                    <span style={{ color: "#4fcf70" }}>✓</span>{" "}
                    安全层：{" "}
                    <span style={{ color: "#4B92A7" }}>已激活</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* 角落光晕 */}
            <div
              className="absolute bottom-0 right-0 w-40 h-40 rounded-tl-full pointer-events-none"
              style={{ background: "radial-gradient(circle at 100% 100%, rgba(75,146,167,0.12), transparent 70%)" }}
            />
          </motion.div>

          {/* ── 卡片二：全球化本地化 ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            onHoverStart={() => { setHovered(2); startLangCycle(); }}
            onHoverEnd={() => { setHovered(null); stopLangCycle(); }}
            whileHover={{ scale: 1.02 }}
            className={`relative rounded-3xl overflow-hidden cursor-default ${
              mobile ? "min-h-[220px]" : "col-span-1"
            }`}
            style={{
              background:
                "linear-gradient(135deg, rgba(234,206,221,0.11) 0%, rgba(11,5,23,0.88) 100%)",
              border: "1px solid rgba(234,206,221,0.16)",
            }}
          >
            <div className="p-8 h-full flex flex-col justify-between" style={{ minHeight: 160 }}>
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(234,206,221,0.11)",
                    border: "1px solid rgba(234,206,221,0.2)",
                  }}
                >
                  <Globe2 size={18} style={{ color: "#EACEDD" }} />
                </div>
                <span
                  className="text-[10px] tracking-[0.26em] uppercase font-semibold mb-2 block"
                  style={{ color: "rgba(234,206,221,0.58)" }}
                >
                  人在回路
                </span>
                <h3
                  className="font-bold text-lg leading-tight"
                  style={{ fontFamily: "var(--font-display)", color: "#F8F6F0" }}
                >
                  全球化与本地化调优
                </h3>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={hovered === 2 ? langIdx : "static"}
                  initial={{ opacity: 0, scale: 0.75, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.75, y: -8 }}
                  transition={{ duration: 0.28 }}
                  className="font-bold mt-4"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.2rem",
                    color: "#EACEDD",
                    opacity: hovered === 2 ? 1 : 0.28,
                  }}
                >
                  {hovered === 2 ? LANGS[langIdx] : LANGS[0]}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* ── 卡片三：商业价值驱动 ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
            onHoverStart={() => setHovered(3)}
            onHoverEnd={() => setHovered(null)}
            whileHover={{ scale: 1.02 }}
            className={`relative rounded-3xl overflow-hidden cursor-default ${
              mobile ? "min-h-[220px]" : "col-span-1"
            }`}
            style={{
              background:
                "linear-gradient(135deg, rgba(75,146,167,0.07) 0%, rgba(234,206,221,0.07) 100%)",
              border: "1px solid rgba(248,246,240,0.1)",
            }}
          >
            <div className="p-8 h-full flex flex-col justify-between" style={{ minHeight: 160 }}>
              <div>
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-6"
                  style={{
                    background: "rgba(248,246,240,0.06)",
                    border: "1px solid rgba(248,246,240,0.11)",
                  }}
                >
                  <TrendingUp size={18} style={{ color: "#F8F6F0" }} />
                </div>
                <span
                  className="text-[10px] tracking-[0.26em] uppercase font-semibold mb-2 block"
                  style={{ color: "rgba(248,246,240,0.38)" }}
                >
                  零技术炫耀
                </span>
                <h3
                  className="font-bold text-lg leading-tight mb-3"
                  style={{ fontFamily: "var(--font-display)", color: "#F8F6F0" }}
                >
                  以商业价值为导向
                </h3>
                <p
                  style={{
                    color: "rgba(248,246,240,0.42)",
                    fontSize: "0.84rem",
                    lineHeight: 1.7,
                  }}
                >
                  纯粹聚焦转化率与可量化的业务增长。
                </p>
              </div>

              <motion.div
                className="font-bold mt-4"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "2.6rem",
                  color: "#4B92A7",
                  lineHeight: 1,
                }}
                animate={hovered === 3 ? { scale: [1, 1.06, 1] } : { scale: 1 }}
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
