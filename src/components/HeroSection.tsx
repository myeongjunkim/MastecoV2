"use client";

import { CSSProperties, useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

export default function HeroSection() {
  // 현재 표시 중인 슬라이드 인덱스
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // 배경 이미지 배열
  const backgroundImages = [
    "/images/industry/masteco-building.jpg",
    "/images/solutions/solution2.png",
    "/images/solutions/solution3.png",
  ];

  // 슬로건 텍스트 배열 추가
  const sloganTexts = [
    "INNOVATION TODAY FOR A TOMORROW",
    "FIRE PROTECTION FOR SAFE WORLD",
    "FIRE PROTECTION FOR SAFE WORLD",
  ];

  // 컴포넌트가 마운트되면 가시성 설정
  useEffect(() => {
    // Intersection Observer는 유지
    const observer = new IntersectionObserver(
      () => {
        // 이제 여기서는 아무 작업도 하지 않지만 향후 필요할 수 있어 구조 유지
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // 자동 슬라이드 전환을 위한 useEffect 추가
  useEffect(() => {
    const autoSlideInterval = setInterval(() => {
      nextSlide();
    }, 3000); // 3초 간격으로 다음 슬라이드로 전환

    return () => {
      clearInterval(autoSlideInterval); // 컴포넌트 언마운트 시 인터벌 정리
    };
  }, []);

  // 이전 슬라이드로 이동
  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? backgroundImages.length - 1 : prev - 1
    );
  };

  // 다음 슬라이드로 이동
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % backgroundImages.length);
  };

  // 애니메이션 스타일 정의
  const marqueeAnimation: CSSProperties = {
    animation: "marquee 80s linear infinite",
    whiteSpace: "nowrap",
    display: "inline-block",
    paddingLeft: "0",
    willChange: "transform",
  };

  const fadeInUpDelay1: CSSProperties = {
    opacity: 0,
    transform: "translateY(40px)",
    animation: "fadeInUp 1s ease forwards 0.3s",
  };

  const fadeInUpDelay2: CSSProperties = {
    opacity: 0,
    transform: "translateY(40px)",
    animation: "fadeInUp 0.8s ease forwards 0.6s",
  };

  // 배경 이미지 확대 애니메이션 스타일
  const zoomBackground: CSSProperties = {
    animation: "zoomBackground 10s cubic-bezier(0.19, 1, 0.22, 1) forwards",
  };

  return (
    <>
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes marquee {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-100%);
          }
        }

        @keyframes zoomBackground {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.3);
          }
        }

        .slide-transition {
          transition: opacity 1s ease-in-out;
        }

        .marquee-container {
          position: relative;
          width: 100%;
          overflow: hidden;
          white-space: nowrap;
        }
      `}</style>

      {/* 전체화면 히어로 섹션 (슬로건과 배경) */}
      <div
        className="relative h-screen w-full overflow-hidden"
        ref={sectionRef}
      >
        {/* 배경 이미지 캐러셀 */}
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center bg-no-repeat slide-transition ${
              currentSlide === index ? "opacity-100" : "opacity-0"
            }`}
            style={{
              backgroundImage: `url('${image}')`,
              ...(currentSlide === index ? zoomBackground : {}),
            }}
          ></div>
        ))}

        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* 중앙 슬로건 및 회사 소개 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-20 text-center">
          <div className="marquee-container mb-6 w-full overflow-hidden">
            <div
              className="inline-block whitespace-nowrap"
              style={fadeInUpDelay1}
            >
              <h1 className="text-white text-6xl md:text-8xl font-extrabold tracking-tight drop-shadow-lg leading-tight inline-block">
                <span style={marqueeAnimation}>
                  {sloganTexts[currentSlide]}&nbsp;&nbsp;&nbsp;
                  {sloganTexts[currentSlide]}&nbsp;&nbsp;&nbsp;
                  {sloganTexts[currentSlide]}&nbsp;&nbsp;&nbsp;
                  {sloganTexts[currentSlide]}&nbsp;&nbsp;&nbsp;
                </span>
              </h1>
            </div>
          </div>
          <p
            className="text-blue-200 text-lg md:text-xl max-w-2xl mt-2 drop-shadow-md leading-relaxed tracking-normal md:tracking-wide text-center mx-auto"
            style={fadeInUpDelay2}
          >
            {/* 모바일 뷰용 (세 줄) */}
            <span className="inline-block sm:hidden">
              1982년부터 마스테코는
              <br />
              화재로부터 소중한 생명과 재산을 보호하는
              <br />
              최고의 솔루션을 제공하고 있습니다.
            </span>
            {/* 태블릿 뷰용 (두 줄) */}
            <span className="hidden sm:inline-block md:hidden">
              1982년부터 마스테코는 화재로부터
              <br />
              소중한 생명과 재산을 보호하는 최고의 솔루션을 제공하고 있습니다.
            </span>
            {/* 데스크탑 뷰용 (두 줄) */}
            <span className="hidden md:inline-block">
              1982년부터 마스테코는 화재로부터 소중한 생명과 재산을 보호하는
              <br />
              최고의 솔루션을 제공하고 있습니다.
            </span>
          </p>
        </div>

        {/* 왼쪽 하단 캐러셀 컨트롤러 */}
        <div className="absolute bottom-10 left-10 z-30 flex items-center space-x-6">
          <button
            onClick={prevSlide}
            className="w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-all"
          >
            <FaChevronLeft size={24} />
          </button>

          <button
            onClick={nextSlide}
            className="w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-all"
          >
            <FaChevronRight size={24} />
          </button>

          <div className="flex items-center text-lg font-semibold ml-2">
            <span className="text-white">
              {String(currentSlide + 1).padStart(2, "0")}
            </span>
            <span className="text-gray-500 mx-1">/</span>
            <span className="text-gray-500">
              {String(backgroundImages.length).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* 우측 하단 문의하기 버튼 그룹은 외부로 분리 */}
      </div>

      {/* 고정된 문의하기 버튼 그룹 */}
      <div className="fixed bottom-10 right-10 z-50 flex flex-col">
        <Link
          href="/contact"
          className="flex flex-col items-center justify-center bg-blue-600 text-white w-20 h-20 shadow-lg"
        >
          <FaPhone className="mb-3 text-xl" />
          <span className="text-sm font-medium">문의하기</span>
        </Link>
        <Link
          href="/contact/email"
          className="flex flex-col items-center justify-center bg-blue-800 text-white w-20 h-20 shadow-lg"
        >
          <FaEnvelope className="mb-3 text-xl" />
          <span className="text-sm font-medium">뉴스레터</span>
        </Link>
        <Link
          href="/contact/chat"
          className="flex items-center justify-center bg-yellow-400 text-yellow-900 w-20 h-20 shadow-lg"
        >
          <Image
            src="/images/news/kakaoLogo.png"
            alt="카카오톡"
            width={20}
            height={20}
            className="w-full h-full object-contain"
          />
        </Link>
      </div>
    </>
  );
}
