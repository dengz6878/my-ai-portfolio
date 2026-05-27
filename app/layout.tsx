import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI 数据与训练专家",
  description:
    "AI 负责效率，人类负责温度——连接 AI 工程能力与人类温度，驱动真实业务增长。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="zh-CN"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body
        className="bg-[#0B0517] text-[#F8F6F0] antialiased"
        style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
      >
        {children}
      </body>
    </html>
  );
}
