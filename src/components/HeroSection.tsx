"use client";

import { CSSProperties, useState, useEffect, useRef, useCallback } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface HeroSectionProps {
  showIntro?: boolean;
}

export default function HeroSection({ showIntro = false }: HeroSectionProps) {
  // 현재 표시 중인 슬라이드 인덱스
  const [currentSlide, setCurrentSlide] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  // 애니메이션 리셋을 위한 키 상태 추가
  const [animationKey, setAnimationKey] = useState(0);
  // 트랜지션 상태 추가
  const [isTransitioning, setIsTransitioning] = useState(false);

  // 배경 이미지 배열
  const backgroundImages = [
    "/images/solutions/masteco-building1.png",
    "/images/solutions/solution2.png",
    "/images/solutions/solution3.png",
  ];

  // 슬로건 텍스트 배열 추가
  const sloganTexts = [
    {
      part1: "INNOVATING FOR A SAFER TOMORROW,",
      part2: "CARRIED ON TODAY",
    },
    {
      part1: "TOWARDS GLOBAL LEADER IN FIRE",
      part2: "PROTECTION PRODUCTS",
    },
    {
      part1: "IN TIMES OF CRISIS, MASTECO WILL",
      part2: "BE A TRUSTED NAME",
    },
  ];

  // 무한 슬라이드를 위한 슬라이드 배열 생성
  const allSlides = [
    backgroundImages[backgroundImages.length - 1], // 마지막 슬라이드를 첫 번째로 복제
    ...backgroundImages,
    backgroundImages[0], // 첫 번째 슬라이드를 마지막으로 복제
  ];

  // 무한 슬라이드를 위한 슬로건 배열 생성
  const allSlogans = [
    sloganTexts[sloganTexts.length - 1],
    ...sloganTexts,
    sloganTexts[0],
  ];

  // nextSlide의 메모이제이션된 버전 생성 (dependency cycle 방지)
  const nextSlideCallback = useCallback(() => {
    if (isTransitioning) return; // 전환 중이면 무시

    setIsTransitioning(true);
    // 애니메이션 리셋 - 슬라이드 전환 전에 즉시 설정하여 애니메이션이 재설정되도록 함
    setAnimationKey((prev) => prev + 1);

    if (currentSlide === backgroundImages.length - 1) {
      // 현재 마지막 (원본) 슬라이드라면
      setCurrentSlide(backgroundImages.length); // 복제된 첫 번째 슬라이드로 설정

      // 애니메이션이 끝나면 트랜지션 없이 진짜 첫 번째 슬라이드로 이동
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(0);
      }, 800); // 트랜지션 시간과 일치시킴
    } else {
      setCurrentSlide(currentSlide + 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }
  }, [currentSlide, isTransitioning, backgroundImages.length]);

  // 이전 슬라이드로 이동 (무한 루프 처리)
  const prevSlide = () => {
    if (isTransitioning) return; // 전환 중이면 무시

    setIsTransitioning(true);
    // 애니메이션 리셋 - 슬라이드 전환 전에 즉시 설정하여 애니메이션이 재설정되도록 함
    setAnimationKey((prev) => prev + 1);

    if (currentSlide === 0) {
      // 현재 첫 번째 (원본) 슬라이드라면
      setCurrentSlide(backgroundImages.length); // 마지막 슬라이드로 설정

      // 애니메이션이 끝나면 트랜지션 없이 진짜 마지막 슬라이드로 이동
      setTimeout(() => {
        setIsTransitioning(false);
        setCurrentSlide(backgroundImages.length - 1);
      }, 800); // 트랜지션 시간과 일치시킴
    } else {
      setCurrentSlide(currentSlide - 1);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 800);
    }
  };

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
    let autoSlideInterval: NodeJS.Timeout | null = null;

    // 트랜지션 중이 아니고, 인트로 비디오가 보이지 않을 때만 자동 슬라이드 타이머 설정
    if (!isTransitioning && !showIntro) {
      autoSlideInterval = setInterval(() => {
        nextSlideCallback();
      }, 5000); // 10초 간격으로 다음 슬라이드로 전환
    }

    return () => {
      if (autoSlideInterval) {
        clearInterval(autoSlideInterval); // 컴포넌트 언마운트 시 인터벌 정리
      }
    };
  }, [nextSlideCallback, showIntro]); // showIntro를 의존성 배열에 추가

  // 애니메이션 스타일 정의
  const slideInFromLeft: CSSProperties = {
    opacity: 0,
    transform: "translateX(-50%)",
    animation: "slideInFromLeft 1s ease-out forwards",
  };

  const slideInFromRight: CSSProperties = {
    opacity: 0,
    transform: "translateX(50%)",
    animation: "slideInFromRight 1s ease-out forwards 0.3s",
  };

  const fadeInUpDelay2: CSSProperties = {
    opacity: 0,
    transform: "translateY(40px)",
    animation: "fadeInUp 0.8s ease forwards 1s",
  };

  // 배경 이미지 확대 애니메이션 스타일
  const zoomBackground: CSSProperties = {
    animation: "zoomBackground 10s cubic-bezier(0.19, 1, 0.22, 1) forwards",
  };

  // 현재 실제 인덱스 계산 (표시용)
  const displayIndex =
    currentSlide === backgroundImages.length
      ? 0
      : currentSlide === -1
      ? backgroundImages.length - 1
      : currentSlide;

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

        @keyframes slideInFromRight {
          0% {
            opacity: 0;
            transform: translateX(50%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInFromLeft {
          0% {
            opacity: 0;
            transform: translateX(-50%);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
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

        /* 전역 폰트 설정 */
        html,
        body {
          font-family: "Noto Sans", sans-serif;
        }

        .slide-transition {
          transition: transform 0.8s ease-in-out;
        }

        .carousel-container {
          width: 100%;
          height: 100%;
          position: relative;
          overflow: hidden;
        }

        .carousel-track {
          display: flex;
          width: ${allSlides.length *
          100}%; /* dynamic width based on all slides (including clones) */
          height: 100%;
          transition: transform 0.8s ease-in-out;
        }

        .carousel-track.no-transition {
          transition: none;
        }

        .carousel-slide {
          flex: 1;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        /* 화면 비율에 특화된 미디어 쿼리 */
        @media (min-aspect-ratio: 16/9) {
          /* Removed slogan-text class rules */
        }

        @media (min-aspect-ratio: 16/10) {
          /* Removed slogan-text class rules */
        }

        /* 아주 넓은 화면에 대응 */
        @media (min-width: 1600px) {
          /* Removed slogan-text class rules */
        }

        /* 아주 좁은 화면 대응 */
        @media (max-width: 480px) {
          /* Removed slogan-text class rules */
        }
      `}</style>

      {/* 전체화면 히어로 섹션 (슬로건과 배경) */}
      <div
        className="relative h-screen w-full overflow-hidden"
        ref={sectionRef}
      >
        {/* 배경 이미지 캐러셀 */}
        <div className="carousel-container absolute inset-0">
          <div
            className={`carousel-track ${
              isTransitioning ? "" : "no-transition"
            }`}
            style={{
              transform: `translateX(-${
                (currentSlide + 1) * (100 / allSlides.length)
              }%)`,
            }}
          >
            {allSlides.map((image, index) => (
              <div
                key={index}
                className="carousel-slide"
                style={{
                  backgroundImage: `url('${image}')`,
                  ...(index === currentSlide + 1 && !showIntro
                    ? zoomBackground
                    : {}),
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black opacity-20"></div>

        {/* 중앙 슬로건 및 회사 소개 */}
        <div className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center">
          <div
            key={`slogan-${animationKey}`}
            className="mb-6 flex flex-col items-center justify-center w-full overflow-hidden"
          >
            <h1 className="text-white text-3xl md:text-4xl lg:text-7xl font-extrabold drop-shadow-lg mb-2 w-full overflow-hidden">
              <span
                className="inline-block w-full"
                style={
                  isTransitioning || showIntro
                    ? { opacity: 0 }
                    : slideInFromLeft
                }
              >
                {allSlogans[currentSlide + 1].part1}
              </span>
            </h1>
            <h1 className="text-white text-3xl md:text-4xl lg:text-7xl font-extrabold drop-shadow-lg w-full overflow-hidden">
              <span
                className="inline-block w-full"
                style={
                  isTransitioning || showIntro
                    ? { opacity: 0 }
                    : slideInFromRight
                }
              >
                {allSlogans[currentSlide + 1].part2}
              </span>
            </h1>
          </div>
          <p
            key={`intro-${animationKey}`}
            className="text-white text-lg md:text-xl max-w-2xl mt-2 drop-shadow-md leading-relaxed tracking-normal md:tracking-wide text-center mx-auto"
            style={showIntro ? { opacity: 0 } : fadeInUpDelay2}
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
            onClick={nextSlideCallback}
            className="w-10 h-10 flex items-center justify-center text-white hover:text-gray-300 transition-all"
          >
            <FaChevronRight size={24} />
          </button>

          <div className="flex items-center text-lg font-semibold ml-2">
            <span className="text-white">
              {String(displayIndex + 1).padStart(2, "0")}
            </span>
            <span className="text-gray-500 mx-1">/</span>
            <span className="text-gray-500">
              {String(backgroundImages.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
