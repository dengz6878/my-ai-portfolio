"use client";

import dynamic from "next/dynamic";

const Portfolio = dynamic(() => import("./components/Portfolio"), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-screen bg-[#0B0517] flex items-center justify-center"
    >
      <div
        className="animate-pulse rounded-full"
        style={{ width: 4, height: 40, background: "#4B92A7" }}
      />
    </div>
  ),
});

export default function Home() {
  return <Portfolio />;
}
