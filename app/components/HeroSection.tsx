"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import FluidVisual from "./FluidVisual";

const ease: [number, number, number, number] = [0.16, 1, 0.3, 1];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.13, delayChildren: 0.2 } },
};
const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

export default function HeroSection({ mobile = false }: { mobile?: boolean }) {
  return (
    <section
      className={`relative flex-shrink-0 bg-[#FBF9F6] overflow-hidden ${
        mobile
          ? "w-full min-h-screen flex flex-col justify-center px-6 py-28"
          : "w-screen h-full flex items-center"
      }`}
    >
      {/* 极淡纹理感 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 75% 30%, rgba(196,168,130,0.12) 0%, transparent 55%), radial-gradient(circle at 20% 75%, rgba(212,180,174,0.1) 0%, transparent 50%)",
        }}
      />

      <div
        className={`relative z-10 w-full ${
          mobile
            ? ""
            : "max-w-screen-xl mx-auto px-16 grid grid-cols-2 gap-8 h-full py-20"
        }`}
        style={mobile ? {} : { alignItems: "stretch" }}
      >
        {/* ── 左：排版 ── */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className={mobile ? "" : "flex flex-col justify-center pr-8"}
        >
          {/* 身份标签 */}
          <motion.div variants={item} className="mb-10 flex items-center gap-3">
            <div
              className="w-6 h-px"
              style={{ background: "#9B7B5C" }}
            />
            <span
              className="text-[11px] tracking-[0.32em] uppercase"
              style={{ color: "#9B7B5C", fontFamily: "var(--font-body)" }}
            >
              AI 数据与训练专家
            </span>
          </motion.div>

          {/* 主标题 — Playfair Display */}
          <motion.div variants={item} className="mb-8">
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: mobile ? "2.6rem" : "clamp(3rem, 5.2vw, 5.6rem)",
                fontWeight: 600,
                lineHeight: 1.08,
                letterSpacing: "-0.01em",
                color: "#1A1A1A",
              }}
            >
              AI 负责效率，
              <br />
              <span style={{ fontStyle: "italic", color: "#9B7B5C" }}>
                人类负责温度。
              </span>
            </h1>
          </motion.div>

          {/* 细分割线 */}
          <motion.div variants={item} className="mb-8">
            <div
              className="w-14 h-px"
              style={{ background: "rgba(26,26,26,0.15)" }}
            />
          </motion.div>

          {/* 副标题 */}
          <motion.p
            variants={item}
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
          </motion.p>

          {/* 文字链接式 CTA */}
          <motion.div variants={item} className="flex items-center gap-10">
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
                className="pb-px transition-all duration-300"
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

          {/* 滚动提示 */}
          {!mobile && (
            <motion.div variants={item} className="mt-20">
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
          )}
        </motion.div>

        {/* ── 右：流体视觉 ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 0.4 }}
          className="relative"
          style={{ height: mobile ? 320 : "100%", marginTop: mobile ? 48 : 0 }}
        >
          <FluidVisual />
        </motion.div>
      </div>
    </section>
  );
}
