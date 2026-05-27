import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
  description: "AI 负责效率，人类负责温度——连接 AI 工程能力与人类温度，驱动真实业务增长。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${playfair.variable} ${inter.variable}`}>
      <body
        className="bg-[#FBF9F6] text-[#1A1A1A] antialiased"
        style={{ fontFamily: "var(--font-body, Inter, sans-serif)" }}
      >
        {children}
      </body>
    </html>
  );
}
