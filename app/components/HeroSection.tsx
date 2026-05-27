"use client";

import { motion } from "framer-motion";
import { Download, ArrowRight } from "lucide-react";
import MorphVisual from "./MorphVisual";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.25 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};

export default function HeroSection({ mobile = false }: { mobile?: boolean }) {
  return (
    <section
      className={`relative flex-shrink-0 overflow-hidden ${
        mobile
          ? "w-full min-h-screen flex flex-col justify-center px-6 py-28"
          : "w-screen h-full flex items-center"
      }`}
    >
      {/* 背景光晕 */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div
          className="absolute rounded-full blur-[120px]"
          style={{
            top: "10%", left: "5%",
            width: 400, height: 400,
            background: "radial-gradient(circle, rgba(75,146,167,0.18) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full blur-[100px]"
          style={{
            bottom: "15%", right: "8%",
            width: 320, height: 320,
            background: "radial-gradient(circle, rgba(234,206,221,0.12) 0%, transparent 70%)",
          }}
        />
      </div>

      <div
        className={`relative z-10 w-full ${
          mobile
            ? ""
            : "max-w-screen-xl mx-auto px-16 grid grid-cols-2 gap-12 h-full py-16"
        }`}
        style={mobile ? {} : { alignItems: "stretch" }}
      >
        {/* ── 左：文字区 ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={mobile ? "" : "flex flex-col justify-center"}
        >
          {/* 身份标签 */}
          <motion.div variants={item} className="mb-8">
            <span
              className="inline-flex items-center gap-2 text-[11px] font-medium tracking-[0.22em] px-4 py-2 rounded-full"
              style={{
                color: "#4B92A7",
                border: "1px solid rgba(75,146,167,0.28)",
                background: "rgba(75,146,167,0.06)",
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ background: "#4B92A7" }}
              />
              AI 数据与训练专家
            </span>
          </motion.div>

          {/* 主标题 */}
          <motion.div variants={item} className="mb-6">
            <h1
              className="leading-[1.02] font-bold"
              style={{
                fontFamily: "var(--font-display, Space Grotesk, sans-serif)",
                fontSize: mobile ? "2.8rem" : "clamp(3.2rem, 5.5vw, 5.8rem)",
                background:
                  "linear-gradient(140deg, #F8F6F0 0%, #EACEDD 45%, #F8F6F0 85%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              AI 负责效率，
              <br />
              人类负责温度。
            </h1>
          </motion.div>

          {/* 副标题 */}
          <motion.p
            variants={item}
            className="mb-10 max-w-[420px] leading-relaxed"
            style={{
              fontFamily: "var(--font-body, Inter, sans-serif)",
              fontSize: mobile ? "1rem" : "1.1rem",
              color: "rgba(248,246,240,0.58)",
            }}
          >
            连接 AI 效率与人类温度之间的鸿沟，以真实可量化的方式推动业务增长。
          </motion.p>

          {/* 按钮组 */}
          <motion.div variants={item} className="flex flex-wrap gap-4">
            <a
              href="/cv.pdf"
              download
              className="group flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-[1.04] hover:shadow-lg"
              style={{
                background: "linear-gradient(135deg, #4B92A7 0%, #3a7a8e 100%)",
                color: "#F8F6F0",
                boxShadow: "0 4px 24px rgba(75,146,167,0.25)",
              }}
            >
              <Download size={15} />
              下载简历
            </a>
            <a
              href="mailto:1403672473@qq.com"
              className="group flex items-center gap-3 px-7 py-3.5 rounded-full font-semibold text-sm tracking-wide transition-all duration-300 hover:scale-[1.04]"
              style={{
                border: "1px solid rgba(248,246,240,0.18)",
                color: "#F8F6F0",
                background: "rgba(248,246,240,0.04)",
              }}
            >
              联系我
              <ArrowRight
                size={14}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
          </motion.div>

          {/* 滚动提示（仅桌面） */}
          {!mobile && (
            <motion.div
              variants={item}
              className="mt-16 flex items-center gap-3"
            >
              <motion.div
                animate={{ x: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="flex items-center gap-2 text-[11px] tracking-[0.2em]"
                style={{ color: "rgba(248,246,240,0.28)" }}
              >
                <div
                  className="w-8 h-px"
                  style={{ background: "rgba(248,246,240,0.2)" }}
                />
                滚动探索
                <div
                  className="w-8 h-px"
                  style={{ background: "rgba(248,246,240,0.2)" }}
                />
              </motion.div>
            </motion.div>
          )}
        </motion.div>

        {/* ── 右：粒子视觉 ── */}
        <div
          className="relative"
          style={{ height: mobile ? 300 : "100%", marginTop: mobile ? 48 : 0 }}
        >
          <MorphVisual />
        </div>
      </div>
    </section>
  );
}
