"use client";

import { CSSProperties } from "react";

export default function HeroSection() {
  // 애니메이션 스타일 정의
  const fadeInUp: CSSProperties = {
    opacity: 0,
    transform: "translateY(20px)",
    animation: "fadeInUp 0.8s ease forwards",
  };

  const fadeInUpDelay1: CSSProperties = {
    opacity: 0,
    transform: "translateY(20px)",
    animation: "fadeInUp 0.8s ease forwards 0.3s",
  };

  const fadeInUpDelay2: CSSProperties = {
    opacity: 0,
    transform: "translateY(20px)",
    animation: "fadeInUp 0.8s ease forwards 0.6s",
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>

      {/* 전체화면 히어로 섹션 (슬로건과 배경) */}
      <div className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/industry/masteco-building.jpg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-16 z-20">
          <div className="mb-3" style={fadeInUp}>
            <h1 className="text-white text-5xl md:text-6xl font-extrabold tracking-tight drop-shadow-lg leading-tight">
              MASTECO
            </h1>
          </div>
          <div style={fadeInUpDelay1}>
            <h2 className="text-blue-400 text-3xl md:text-4xl font-bold tracking-tight drop-shadow-lg leading-snug">
              FIRE PROTECTION
              <br />
              for SAFE WORLD
            </h2>
          </div>
          <p
            className="text-blue-200 text-lg md:text-xl max-w-xl mt-6 drop-shadow-md leading-relaxed"
            style={fadeInUpDelay2}
          >
            1982년부터 마스테코는 화재로부터 소중한 생명과 재산을 보호하는
            최고의 솔루션을 제공하고 있습니다.
          </p>
        </div>
      </div>
    </>
  );
}
