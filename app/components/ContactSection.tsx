"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function ContactSection({ mobile = false }: { mobile?: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <section
      className={`relative flex-shrink-0 bg-[#FBF9F6] overflow-hidden ${
        mobile
          ? "w-full min-h-screen px-6 py-24 flex flex-col justify-center"
          : "w-screen h-full flex items-center justify-center"
      }`}
    >
      {/* 极淡色块装饰 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 60%, rgba(212,180,174,0.13) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(107,163,181,0.09) 0%, transparent 45%)",
        }}
      />

      {/* 细网格底纹 */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(26,26,26,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(26,26,26,0.03) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div
        className={`relative z-10 ${
          mobile ? "w-full" : "max-w-xl mx-auto px-8 text-center"
        }`}
        style={mobile ? { textAlign: "center" } : {}}
      >
        {/* 区块标签 */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 flex items-center gap-3 justify-center"
        >
          <div className="w-6 h-px" style={{ background: "#9B7B5C" }} />
          <span
            className="text-[11px] tracking-[0.32em] uppercase"
            style={{ color: "#9B7B5C", fontFamily: "var(--font-body)" }}
          >
            04 — 与我联系
          </span>
          <div className="w-6 h-px" style={{ background: "#9B7B5C" }} />
        </motion.div>

        {/* 主标题 */}
        <motion.h2
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: mobile ? "2.8rem" : "clamp(2.8rem, 5.5vw, 5.2rem)",
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: "-0.01em",
            color: "#1A1A1A",
          }}
        >
          一起创造
          <br />
          <span style={{ fontStyle: "italic", color: "#9B7B5C" }}>真实的价值。</span>
        </motion.h2>

        {/* 副标题 */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mb-14 mx-auto"
          style={{
            maxWidth: 340,
            color: "#6B6459",
            fontSize: "0.98rem",
            lineHeight: 1.8,
            fontWeight: 300,
            fontFamily: "var(--font-body)",
          }}
        >
          目前开放高级 AI 数据、训练或产品专家职位机会。
        </motion.p>

        {/* 邮件链接 — 文字样式而非按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.32, duration: 0.8 }}
        >
          <motion.a
            href="mailto:1403672473@qq.com"
            onHoverStart={() => setHovered(true)}
            onHoverEnd={() => setHovered(false)}
            className="group inline-flex items-center gap-3"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: mobile ? "1.2rem" : "clamp(1.2rem, 2vw, 1.6rem)",
              fontWeight: 500,
              color: "#1A1A1A",
              textDecoration: "none",
              letterSpacing: "0.01em",
            }}
          >
            <span
              className="pb-1 transition-all duration-400"
              style={{
                borderBottom: hovered ? "2px solid #9B7B5C" : "1px solid rgba(26,26,26,0.2)",
                color: hovered ? "#9B7B5C" : "#1A1A1A",
                transition: "border-color 0.3s ease, color 0.3s ease",
              }}
            >
              1403672473@qq.com
            </span>
            <motion.span
              animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
              transition={{ duration: 0.25 }}
              style={{ color: hovered ? "#9B7B5C" : "#6B6459" }}
            >
              <ArrowUpRight size={20} />
            </motion.span>
          </motion.a>
        </motion.div>

        {/* 底部装饰 */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-20 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-5">
            <div className="w-10 h-px" style={{ background: "rgba(26,26,26,0.12)" }} />
            <span
              className="text-[11px] tracking-[0.18em]"
              style={{ color: "rgba(26,26,26,0.28)", fontFamily: "var(--font-body)" }}
            >
              AI 负责效率，人类负责温度。
            </span>
            <div className="w-10 h-px" style={{ background: "rgba(26,26,26,0.12)" }} />
          </div>
          <p
            className="text-[10px] tracking-[0.12em]"
            style={{ color: "rgba(26,26,26,0.2)", fontFamily: "var(--font-body)" }}
          >
            © 2024 · 保留所有权利
          </p>
        </motion.div>
      </div>
    </section>
  );
}
