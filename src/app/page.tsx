"use client";

import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPen } from "react-icons/fa";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";

export default function Home() {
  // 인트로 비디오를 위한 상태 변수 추가
  const [showIntro, setShowIntro] = useState(true);
  const [videoFading, setVideoFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // 캐러셀을 위한 상태 변수 추가
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 비디오 설정 및 종료 후 화면 전환을 위한 useEffect
  useEffect(() => {
    const videoElement = videoRef.current;

    if (videoElement) {
      // 비디오 로드 후 1.5배속으로 설정
      videoElement.playbackRate = 1;

      // 비디오가 끝나기 1초 전에 페이드 아웃 시작
      const handleTimeUpdate = () => {
        if (videoElement.duration - videoElement.currentTime < 1) {
          setVideoFading(true);
        }
      };

      const handleVideoEnd = () => {
        // 비디오 종료 1초 후 컴포넌트 제거
        setTimeout(() => {
          setShowIntro(false);
        }, 1000);
      };

      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.addEventListener("ended", handleVideoEnd);

      // 클린업 함수
      return () => {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.removeEventListener("ended", handleVideoEnd);
      };
    }
  }, []);

  // 스크롤 이벤트를 감지하여 비디오를 숨기는 효과 추가
  useEffect(() => {
    const handleScroll = () => {
      // 스크롤 위치가 100px 이상이면 비디오 페이드 아웃 시작
      if (window.scrollY > 100 && showIntro) {
        setVideoFading(true);

        // 페이드 아웃 후 비디오 완전히 제거
        setTimeout(() => {
          setShowIntro(false);
        }, 1000);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [showIntro]);

  // 산업 분야 이미지 배열
  const industryImages = [
    "/images/solutions/industry1.png",
    "/images/solutions/industry2.png",
    "/images/solutions/industry3.png",
  ];

  // 다음 이미지로 이동하는 함수
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === industryImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  // 이전 이미지로 이동하는 함수
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? industryImages.length - 1 : prevIndex - 1
    );
  };

  // 자동 이미지 전환 효과
  useEffect(() => {
    const intervalId = setInterval(() => {
      nextImage();
    }, 3000); // 3초마다 이미지 전환

    return () => clearInterval(intervalId);
  }, []);

  // Intersection Observer를 사용하여 스크롤 애니메이션 적용
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-in-element");
    const slideLeftElements = document.querySelectorAll(".slide-left-element");
    const slideRightElements = document.querySelectorAll(
      ".slide-right-element"
    );
    const scaleUpElements = document.querySelectorAll(".scale-up-element");
    const slideUpElements = document.querySelectorAll(".slide-up-element");
    const rotateElements = document.querySelectorAll(".rotate-element");

    // 이미지 애니메이션 완료 시간 계산 (CSS에서 정의된 전환 시간에 기반)
    const getAnimationDuration = () => {
      // 가상 요소를 생성하여 CSS 스타일 가져오기
      const tempElement = document.createElement("div");
      tempElement.className = "slide-up-element";
      document.body.appendChild(tempElement);

      // 계산된 스타일에서 transition-duration 값 가져오기
      const styles = window.getComputedStyle(tempElement);
      const transitionDuration = styles.getPropertyValue("transition-duration");

      // 임시 요소 제거
      document.body.removeChild(tempElement);

      // 문자열(예: "0.8s")에서 숫자로 변환
      let durationInSeconds = 0.8; // 기본값
      if (transitionDuration) {
        durationInSeconds = parseFloat(transitionDuration);
        // 'ms' 단위인 경우 초 단위로 변환
        if (transitionDuration.includes("ms")) {
          durationInSeconds = durationInSeconds / 1000;
        }
      }

      return durationInSeconds;
    };

    // 이미지 애니메이션 지속 시간 + 여유 시간
    const imageDuration = getAnimationDuration() + 0.5; // 애니메이션 완료 후 0.5초 여유

    // 섹션별로 다른 Observer를 생성하여 스크롤 위치에 따라 더 정확하게 애니메이션 적용
    const createObserver = (options: IntersectionObserverInit) => {
      return new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          // 요소가 뷰포트 안에 들어왔을 때
          if (entry.isIntersecting) {
            // 핵심 제품 솔루션 솔루션 행마다 더 큰 지연 시간 적용
            let delay = 0;

            // 핵심 제품 솔루션 섹션의 텍스트 요소 (slide-right-element, slide-left-element)에 더 큰 지연 적용
            const fadeIndex = parseInt(element.dataset.fadeIndex || "0");

            // 디버깅: fadeIndex 확인
            if (
              element.classList.contains("slide-up-element") ||
              element.classList.contains("slide-right-element") ||
              element.classList.contains("slide-left-element")
            ) {
              console.log(
                `Element class: ${element.className}, fadeIndex: ${fadeIndex}, data-fade-index: ${element.dataset.fadeIndex}`
              );

              // 요소의 텍스트 컨텐츠도 출력하여 어떤 요소인지 식별
              const heading = element.querySelector("h2");
              if (heading) {
                console.log(`Element heading: ${heading.textContent}`);
              }
            }

            // 클래스명과 부모 요소를 기반으로 핵심 제품 솔루션 섹션의 요소 식별
            const sectionElement = element.closest(".section-trigger");
            const isSolutionSection = sectionElement
              ? sectionElement
                  .querySelector("h3")
                  ?.textContent?.includes("핵심 제품 솔루션") ?? false
              : false;

            // 이미지 요소 - 핵심 제품 솔루션 섹션의 slide-up-element 클래스를 가진 요소
            const isProductSolutionImage =
              isSolutionSection &&
              element.classList.contains("slide-up-element");

            // 텍스트 요소 - 핵심 제품 솔루션 섹션의 slide-right-element 또는 slide-left-element 클래스를 가진 요소
            const isProductSolutionText =
              isSolutionSection &&
              (element.classList.contains("slide-right-element") ||
                element.classList.contains("slide-left-element"));

            // 디버깅: 식별된 요소 확인
            if (isProductSolutionText) {
              console.log(`텍스트 요소 감지: ${element.className}`);
            }

            if (isProductSolutionImage) {
              console.log(`이미지 요소 감지: ${element.className}`);
            }

            if (isProductSolutionText) {
              // 텍스트 요소는 이미지 애니메이션이 완료된 후에 표시 (CSS 애니메이션 시간 + 약간의 여유)
              delay = imageDuration;
            } else if (isProductSolutionImage) {
              // 이미지는 즉시 표시 (0 딜레이)
              delay = 0;
            }

            // 요소가 화면에 얼마나 들어왔는지에 따라 애니메이션 시작 시간 조정
            const visibleRatio = entry.intersectionRatio;
            const adjustedDelay = delay * (0.6 - visibleRatio * 0.3);

            // 최소 지연 시간 보장으로 더 부드러운 진입 효과
            setTimeout(() => {
              element.classList.add("animate-in");
            }, Math.max(50, adjustedDelay * 1000));
          } else {
            // 요소가 뷰포트에서 벗어났을 때 애니메이션 클래스 제거
            element.classList.remove("animate-in");
          }
        });
      }, options);
    };

    // 메인 관찰자: 일반적인 요소용 - 점진적 감지를 위한 설정
    const observer = createObserver({
      threshold: [0, 0.1, 0.2], // 더 많은 임계값으로 점진적 감지
      rootMargin: "0px 0px -5% 0px", // 화면에 더 많이 들어와야 애니메이션 시작
    });

    // About MASTECO 섹션을 위한 특별 관찰자
    const aboutMastecoObserver = createObserver({
      threshold: 0.1, // 요소가 10% 이상 보일 때 애니메이션 시작
      rootMargin: "0px 0px -10% 0px", // 화면 하단에서 10% 위치에서 애니메이션 시작
    });

    // 헤더/타이틀 요소를 위한 관찰자
    const headerObserver = createObserver({
      threshold: 0.05,
      rootMargin: "0px 0px 0px 0px", // 기본 설정
    });

    // 각 섹션에 대한 특별 관찰자
    const sectionObserver = createObserver({
      threshold: 0.05,
      rootMargin: "0px 0px -5% 0px", // 화면에 더 많이 들어와야 애니메이션 시작
    });

    // 문의하기 섹션을 위한 관찰자
    const contactObserver = createObserver({
      threshold: 0.05,
      rootMargin: "0px 0px 5% 0px", // 약간 일찍 감지
    });

    // 핵심 제품 솔루션을 위한 특별 관찰자 - 빠르게 감지하지만 천천히 움직이도록
    const productSolutionObserver = createObserver({
      threshold: 0.8, // 요소가 80% 이상 보일 때 애니메이션 시작
      rootMargin: "0px 0px -10% 0px", // 화면 하단에서 10% 위치에서 애니메이션 시작
    });

    // 각 요소에 인덱스를 부여하고 해당 섹션에 맞는 Observer 적용
    const allAnimatedElements = [
      ...fadeElements,
      ...slideLeftElements,
      ...slideRightElements,
      ...scaleUpElements,
      ...slideUpElements,
      ...rotateElements,
    ];

    allAnimatedElements.forEach((element, index) => {
      (element as HTMLElement).dataset.fadeIndex = index.toString();

      // About MASTECO 섹션 요소 식별 - 구조적 특징 사용
      const isAboutMastecoSection =
        element.closest(".bg-white") !== null &&
        element
          .closest(".bg-white")
          ?.querySelector("h2")
          ?.textContent?.includes("About MASTECO") &&
        (element.classList.contains("slide-left-element") ||
          element.classList.contains("slide-right-element"));

      // 요소의 위치나 역할에 따라 다른 Observer 사용
      const elementClasses = element.classList;
      const isHeader =
        elementClasses.contains("text-3xl") ||
        elementClasses.contains("text-xl") ||
        element.tagName === "H2" ||
        element.tagName === "H3";

      const isInSection = element.closest(".section-trigger") !== null;

      // 문의하기 섹션 요소 식별
      const isContactSection =
        element.closest('[data-fade-index="43"]') !== null ||
        element.closest('[data-fade-index="44"]') !== null ||
        element.closest('[data-fade-index="45"]') !== null ||
        element.closest('[data-fade-index="46"]') !== null ||
        element.closest('[data-fade-index="47"]') !== null ||
        element.closest('[data-fade-index="48"]') !== null ||
        element.closest('[data-fade-index="49"]') !== null ||
        element.closest('[data-fade-index="50"]') !== null ||
        element.closest('[data-fade-index="51"]') !== null ||
        parseInt((element as HTMLElement).dataset.fadeIndex || "0") >= 43;

      // 핵심 제품 솔루션 섹션 요소 식별 (data-fade-index가 1-8인 요소들)
      const isProductSolution =
        parseInt((element as HTMLElement).dataset.fadeIndex || "0") >= 1 &&
        parseInt((element as HTMLElement).dataset.fadeIndex || "0") <= 8;

      // 핵심 제품 솔루션 섹션의 텍스트 요소에 대해 transition duration 증가
      if (
        isProductSolution &&
        (element.classList.contains("slide-left-element") ||
          element.classList.contains("slide-right-element"))
      ) {
        (element as HTMLElement).style.transition =
          "opacity 1.5s cubic-bezier(0.22, 0.61, 0.36, 1), transform 1.5s cubic-bezier(0.22, 0.61, 0.36, 1)";
      }

      if (isAboutMastecoSection) {
        aboutMastecoObserver.observe(element);
      } else if (isProductSolution) {
        productSolutionObserver.observe(element);
      } else if (isContactSection) {
        contactObserver.observe(element);
      } else if (isHeader) {
        headerObserver.observe(element);
      } else if (isInSection) {
        sectionObserver.observe(element);
      } else {
        observer.observe(element);
      }
    });

    return () => {
      allAnimatedElements.forEach((element) => {
        observer.unobserve(element);
        headerObserver.unobserve(element);
        sectionObserver.unobserve(element);
        contactObserver.unobserve(element);
        productSolutionObserver.unobserve(element);
        aboutMastecoObserver.unobserve(element);
      });
    };
  }, []);

  return (
    <div className="overflow-x-hidden">
      <style jsx global>{`
        /* Base animation classes - define the initial hidden state */
        .fade-in-element,
        .slide-left-element,
        .slide-right-element,
        .scale-up-element,
        .slide-up-element,
        .rotate-element {
          opacity: 0;
          transition: opacity 1s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.8s cubic-bezier(0.22, 0.61, 0.36, 1);
          will-change: opacity, transform;
        }

        /* Specific transformations for each animation type */
        .fade-in-element {
          transform: translateY(40px);
        }

        .slide-left-element {
          transform: translateX(-100px);
        }

        .slide-right-element {
          transform: translateX(100px);
        }

        .slide-left-element-solution {
          transform: translateX(-20vw);
          transition: transform 1s;
        }

        .slide-right-element-solution {
          transform: translateX(20vw);
          transition: transform 1s;
        }

        .scale-up-element {
          transform: scale(0.9);
        }

        .slide-up-element {
          transform: translateY(120px);
          transition: opacity 0.9s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        .rotate-element {
          transform: rotateY(15deg) translateZ(15px);
          perspective: 1000px;
          transition: opacity 0.9s cubic-bezier(0.22, 0.61, 0.36, 1),
            transform 0.9s cubic-bezier(0.22, 0.61, 0.36, 1);
        }

        /* Common animated-in state for all elements */
        .animate-in {
          opacity: 1;
          transform: translateY(0) translateX(0) scale(1) rotateY(0)
            translateZ(0);
        }

        /* Container for sections */
        .section-trigger {
          overflow: hidden;
        }

        /* 인트로 비디오 스타일 */
        .intro-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: 50; /* 헤더보다 낮은 z-index로 변경 */
          background-color: #000;
          opacity: 1; /* fade in 효과 제거 */
          transition: opacity 1s ease-out;
        }

        .intro-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .intro-container.fade-out {
          opacity: 0;
          transition: opacity 1s ease-out;
        }

        /* 헤더 스타일 - 스크롤시에도 항상 보이도록 */
        header {
          position: fixed;
          z-index: 1001; /* 비디오와 hero 섹션보다 위에 표시 */
        }

        /* Hero 섹션도 전체 화면을 차지하도록 설정 */
        .hero-fullscreen {
          min-height: 100vh;
          width: 100%;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          z-index: 49; /* 헤더보다 낮은 z-index로 변경 */
          margin-top: 0;
          padding-top: 0;
        }

        /* Removed custom About section animations */
      `}</style>

      {/* 인트로 비디오 컴포넌트 */}
      {showIntro && (
        <div className={`intro-container ${videoFading ? "fade-out" : ""}`}>
          <video
            ref={videoRef}
            className="intro-video"
            autoPlay
            muted
            playsInline
            src="/images/intro/masteco_video.mp4"
          >
            <source src="/images/intro/masteco_video.mp4" type="video/mp4" />
            브라우저가 비디오 태그를 지원하지 않습니다.
          </video>
        </div>
      )}

      {/* 히어로 섹션 - 클라이언트 컴포넌트로 분리 */}
      {/* <div className="hero-fullscreen"> */}
      <HeroSection showIntro={showIntro} />
      {/* </div> */}

      {/* 2. 회사 설명 섹션 */}
      <div className="relative section-trigger bg-white">
        {/* 빨간색 직사각형 영역 - 상단 */}
        <div className="container mx-auto px-4 md:px-8 pt-12">
          <div className="flex items-center">
            <h2
              className="text-black text-xl font-semibold slide-left-element"
              data-fade-index="0"
            >
              About MASTECO
              <span className="inline-block ml-2 w-8 h-0.5 bg-black"></span>
            </h2>
          </div>
        </div>
        <div className="relative bg-red-700 h-[400px] mt-10"></div>

        {/* 경계선에 이미지 갤러리 배치 */}
        <div className="relative z-10">
          {/* 소방전문 제조기업 타이틀 추가 */}
          <div className="absolute -top-[260px] left-0 right-0 w-full flex justify-center">
            <h3
              className="text-white text-2xl slide-up-element bg-red-700 px-6 py-2"
              data-fade-index="3"
            >
              소방전문 제조기업
            </h3>
          </div>
          <div
            className="absolute -top-[200px] left-0 right-0 w-full flex justify-center slide-up-element"
            data-fade-index="2"
          >
            <div className="grid grid-cols-4 w-full max-w-5xl">
              <div className="col-span-1">
                <img
                  src="/images/about/about2.png"
                  alt="소방 설비"
                  className="h-96 w-full object-cover shadow-lg"
                />
              </div>
              <div className="col-span-1">
                <img
                  src="/images/about/about3.png"
                  alt="소방 설비"
                  className="h-96 w-full object-cover shadow-lg"
                />
              </div>
              <div className="col-span-1">
                <img
                  src="/images/about/about4.png"
                  alt="소방 설비"
                  className="h-96 w-full object-cover shadow-lg"
                />
              </div>
              <div className="col-span-1">
                <img
                  src="/images/about/about5.png"
                  alt="소방 설비"
                  className="h-96 w-full object-cover shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 흰색 영역 - 하단 */}
        <div className="bg-white pt-72 pb-20">
          <div className="container mx-auto px-4 md:px-8">
            {/* 회사 설명 텍스트 - 흰색 영역 */}
            <div className="max-w-2xl slide-up-element" data-fade-index="1">
              <h2 className="text-5xl font-bold mb-8 text-gray-900">
                MASTECO is
              </h2>
              <p className="text-lg mb-6 text-gray-700">
                화재로부터 안전한 세상을 만들기 위해 사회적 책임감을 바탕으로
                소방설비 산업에 기여하는 전문 기업입니다.
              </p>
              <p className="mb-6 text-gray-700">
                1982년부터 마스테코는 엄격한 산업 표준에 따라 자체 시설에서 모든
                제품을 설계, 생산, 테스트하며, 국내외 승인 기관의 인증을 획득한
                안전한 소방 솔루션을 제공합니다.
              </p>
              <p className="text-gray-700">
                소방 설비의 품질과 신뢰성에 집중하여 고객의 안전을 최우선으로
                생각합니다.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 바둑판식 이미지와 솔루션 설명 섹션 */}
      <div className="relative py-20 bg-gray-50 section-trigger">
        <div className="container mx-auto px-4 md:px-8">
          <div
            className="mb-16 text-center fade-in-element"
            data-fade-index="0"
          >
            <h2 className="text-gray-700 text-sm font-light uppercase tracking-wider mb-2">
              Our Solutions
            </h2>
            <h3 className="text-gray-900 text-3xl font-bold">
              핵심 제품 솔루션
            </h3>
            <div className="w-20 h-1 bg-blue-900 mx-auto mt-4"></div>
          </div>

          <div className="overflow-hidden">
            {/* 3-1. 첫 번째 솔루션 섹션 */}
            <div>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 slide-up-element" data-fade-index="1">
                  <div className="h-[400px] relative overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/images/solutions/solution8.png')`,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  className="md:w-1/2 flex items-center bg-white slide-right-element slide-right-element-solution"
                  data-fade-index="2"
                >
                  <div className="p-8 md:p-16">
                    <h2 className="text-gray-900 text-3xl mb-4">
                      수계 소화설비
                    </h2>
                    <p className="text-gray-500 mb-4 leading-relaxed max-w-sm">
                      스프링클러 헤드, 스테인리스 스틸 플렉시블 호스 및 피팅,
                      알람 체크 밸브, 프리액션 밸브, 델류지 밸브 등 다양한 수계
                      소화설비 솔루션을 제공합니다.
                    </p>
                    <Link
                      href="/products/water-based"
                      className="text-blue-700 font-semibold hover:text-blue-500 flex items-end gap-2 group"
                    >
                      <span className="transition-all duration-300 group-hover:tracking-widest">
                        View
                      </span>
                      <div className="w-8 h-[1px] bg-blue-700 group-hover:bg-blue-500 relative mb-[0.4em] transition-all duration-300 group-hover:w-12">
                        <div className="absolute top-0 right-0 w-3 h-[1px] bg-blue-700 group-hover:bg-blue-500 rotate-45 origin-right transition-all duration-300 group-hover:w-4"></div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 3-2. 두 번째 솔루션 섹션 */}
            <div>
              <div className="flex flex-col md:flex-row-reverse">
                <div className="md:w-1/2 slide-up-element" data-fade-index="3">
                  <div className="h-[400px] relative overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/images/solutions/solution6.png')`,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  className="md:w-1/2 flex items-center bg-white slide-left-element slide-left-element-solution"
                  data-fade-index="4"
                >
                  <div className="p-8 md:p-16">
                    <h2 className="text-gray-900 text-3xl mb-4">
                      가스계 소화설비
                    </h2>
                    <p className="text-gray-500 mb-4 leading-relaxed max-w-sm">
                      FIRESAFE, 주방 자동 소화장치, 캐비닛형, 모듈형 자동
                      소화장치, FM-200 피스톤 플로우 시스템 등 첨단 가스계
                      소화설비를 제공합니다.
                    </p>
                    <Link
                      href="/products/gaseous"
                      className="text-blue-700 font-semibold hover:text-blue-500 flex items-end gap-2 group"
                    >
                      <span className="transition-all duration-300 group-hover:tracking-widest">
                        View
                      </span>
                      <div className="w-8 h-[1px] bg-blue-700 group-hover:bg-blue-500 relative mb-[0.4em] transition-all duration-300 group-hover:w-12">
                        <div className="absolute top-0 right-0 w-3 h-[1px] bg-blue-700 group-hover:bg-blue-500 rotate-45 origin-right transition-all duration-300 group-hover:w-4"></div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 3-3. 세 번째 솔루션 섹션 */}
            <div>
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 slide-up-element" data-fade-index="5">
                  <div className="h-[400px] relative overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/images/solutions/solution7.png')`,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  className="md:w-1/2 flex items-center bg-white slide-right-element slide-right-element-solution"
                  data-fade-index="6"
                >
                  <div className="p-8 md:p-16">
                    <h2 className="text-gray-900 text-3xl mb-4">
                      맞춤형 소방 솔루션
                    </h2>
                    <p className="text-gray-500 mb-4 leading-relaxed max-w-sm">
                      고객의 산업 및 적용 분야별 특정 요구사항을 충족시키기 위해
                      설계된 맞춤형 소방 솔루션을 제공합니다.
                    </p>
                    <Link
                      href="/products/custom"
                      className="text-blue-700 font-semibold hover:text-blue-500 flex items-end gap-2 group"
                    >
                      <span className="transition-all duration-300 group-hover:tracking-widest">
                        View
                      </span>
                      <div className="w-8 h-[1px] bg-blue-700 group-hover:bg-blue-500 relative mb-[0.4em] transition-all duration-300 group-hover:w-12">
                        <div className="absolute top-0 right-0 w-3 h-[1px] bg-blue-700 group-hover:bg-blue-500 rotate-45 origin-right transition-all duration-300 group-hover:w-4"></div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* 3-4. 네 번째 솔루션 섹션 (추가) */}
            <div>
              <div className="flex flex-col md:flex-row-reverse">
                <div className="md:w-1/2 slide-up-element" data-fade-index="7">
                  <div className="h-[400px] relative overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/images/industry/Visual 04.png')`,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  className="md:w-1/2 flex items-center bg-white slide-left-element slide-left-element-solution"
                  data-fade-index="8"
                >
                  <div className="p-8 md:p-16">
                    <h2 className="text-gray-900 text-3xl mb-4">
                      설계 및 컨설팅
                    </h2>
                    <p className="text-gray-500 mb-4 leading-relaxed max-w-sm">
                      마스테코는 소방 시스템 설계부터 설치, 유지보수까지
                      소방설비의 전체 수명 주기에 걸친 전문적인 컨설팅 서비스를
                      제공합니다.
                    </p>
                    <Link
                      href="/products/consulting"
                      className="text-blue-700 font-semibold hover:text-blue-500 flex items-end gap-2 group"
                    >
                      <span className="transition-all duration-300 group-hover:tracking-widest">
                        View
                      </span>
                      <div className="w-8 h-[1px] bg-blue-700 group-hover:bg-blue-500 relative mb-[0.4em] transition-all duration-300 group-hover:w-12">
                        <div className="absolute top-0 right-0 w-3 h-[1px] bg-blue-700 group-hover:bg-blue-500 rotate-45 origin-right transition-all duration-300 group-hover:w-4"></div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. 산업 분야 설명 섹션 */}
      <div className="relative py-20 bg-white section-trigger">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2
              className="text-gray-700 text-sm font-light uppercase tracking-wider mb-2 fade-in-element"
              data-fade-index="20"
            >
              Industries
            </h2>
            <h3
              className="text-gray-900 text-3xl font-bold fade-in-element"
              data-fade-index="21"
            >
              적용 산업 분야
            </h3>
            <div
              className="w-20 h-1 bg-blue-900 mx-auto mt-4 scale-up-element"
              data-fade-index="22"
            ></div>
          </div>

          <div className="flex flex-col md:flex-row-reverse">
            <div className="md:w-1/2 slide-right-element" data-fade-index="23">
              {/* 기존 단일 이미지 대신 캐러셀 구현 */}
              <div className="h-[400px] relative overflow-hidden group">
                {/* 캐러셀 이미지 */}
                {industryImages.map((image, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform ${
                      index === currentImageIndex ? "opacity-100" : "opacity-0"
                    }`}
                    style={{
                      backgroundImage: `url('${image}')`,
                      transition: "opacity 0.8s ease-in-out",
                    }}
                  ></div>
                ))}

                {/* 컨트롤러 (화살표 + 인덱스) - 좌측 하단에 배치 */}
                <div className="absolute left-6 bottom-6 flex items-center z-10 space-x-4">
                  {/* 이전 화살표 */}
                  <button
                    onClick={prevImage}
                    className="text-white transition-transform hover:scale-110"
                    aria-label="이전 이미지"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                  </button>

                  {/* 다음 화살표 */}
                  <button
                    onClick={nextImage}
                    className="text-white transition-transform hover:scale-110"
                    aria-label="다음 이미지"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>

                  {/* 페이지 인디케이터 */}
                  <div className="text-white text-lg font-medium ml-2">
                    <span className="text-white">
                      {String(currentImageIndex + 1).padStart(2, "0")}
                    </span>
                    <span className="text-gray-400">
                      {" "}
                      / {String(industryImages.length).padStart(2, "0")}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="md:w-1/2 flex items-center slide-left-element"
              data-fade-index="24"
            >
              <div className="p-8 md:p-16">
                <h2 className="text-gray-900 text-3xl mb-4">
                  다양한 산업 분야
                </h2>
                <p className="text-gray-500 mb-4 leading-relaxed">
                  마스테코는 제조업, 상업시설, 데이터센터, 의료시설, 교육기관,
                  정부시설 등 다양한 분야에 최적화된 소방 솔루션을 제공합니다.
                </p>
                <Link
                  href="/industry"
                  className="text-blue-700 font-semibold hover:text-blue-500 flex items-end gap-2 group"
                >
                  <span className="transition-all duration-300 group-hover:tracking-widest">
                    View
                  </span>
                  <div className="w-8 h-[1px] bg-blue-700 group-hover:bg-blue-500 relative mb-[0.4em] transition-all duration-300 group-hover:w-12">
                    <div className="absolute top-0 right-0 w-3 h-[1px] bg-blue-700 group-hover:bg-blue-500 rotate-45 origin-right transition-all duration-300 group-hover:w-4"></div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. 산업 분야 배너 섹션 */}
      <div className="relative section-trigger">
        {/* 상단 타이틀 */}
        <div className="bg-white py-6 border-b border-gray-200">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-baseline">
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mr-2 slide-left-element"
                data-fade-index="25"
              >
                MASTECO <span className="font-black">INDUSTRY</span>
              </h2>
              <span
                className="text-sm text-gray-600 ml-2 fade-in-element min-w-fit"
                data-fade-index="26"
              >
                마스테코 산업분야
              </span>
            </div>
          </div>
        </div>

        {/* 메인 이미지 섹션 */}
        <div className="h-[400px]">
          {/* 이미지 배경 */}
          <div
            className="relative h-full overflow-hidden scale-up-element"
            data-fade-index="27"
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 hover:scale-105"
              style={{
                backgroundImage: `url('/images/solutions/solution1.png')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="absolute bottom-0 left-0 p-8 z-10">
              {/* Title removed */}
            </div>

            {/* Read More 링크 */}
            <div className="absolute bottom-0 right-0 p-8 z-10">
              <Link
                href="/industry/aerospace"
                className="flex items-center text-white font-semibold hover:text-blue-300 transition-colors slide-up-element"
                data-fade-index="28"
              >
                <span className="mr-2">Read More</span>
                <span className="border-b border-white w-10"></span>
              </Link>
            </div>

            {/* 문의하기 버튼 */}
            <div className="absolute right-0 top-0 p-4 z-10">
              <Link
                href="/contact"
                className="bg-white text-blue-900 py-2 px-4 flex items-center font-bold shadow-md hover:bg-gray-100 transition-colors slide-left-element"
                data-fade-index="29"
              >
                <FaPen className="mr-2" />
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 6. 공지사항 섹션 */}
      <div className="relative py-20 bg-gray-50 section-trigger">
        <div className="container mx-auto px-4 md:px-8">
          <div className="mb-16 text-center">
            <h2
              className="text-gray-700 text-sm font-light uppercase tracking-wider mb-2 fade-in-element"
              data-fade-index="30"
            >
              News & Notice
            </h2>
            <h3
              className="text-gray-900 text-3xl font-bold fade-in-element"
              data-fade-index="31"
            >
              공지사항
            </h3>
            <div
              className="w-20 h-1 bg-blue-900 mx-auto mt-4 scale-up-element"
              data-fade-index="32"
            ></div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div
              className="md:w-1/3 px-4 md:px-16 mb-10 md:mb-0 slide-right-element"
              data-fade-index="33"
            >
              <h2 className="text-gray-900 text-3xl mb-4">마스테코 소식</h2>
              <p className="text-gray-500 mb-6 leading-relaxed">
                마스테코의 최신 소식과 공지사항을 확인하세요. 새로운 제품 출시,
                인증 획득, 기업 소식 및 채용 정보를 안내해 드립니다.
              </p>
              <Link
                href="/news"
                className="text-blue-700 font-semibold hover:text-blue-500 flex items-end gap-2 group"
              >
                <span className="transition-all duration-300 group-hover:tracking-widest">
                  View
                </span>
                <div className="w-8 h-[1px] bg-blue-700 group-hover:bg-blue-500 relative mb-[0.4em] transition-all duration-300 group-hover:w-12">
                  <div className="absolute top-0 right-0 w-3 h-[1px] bg-blue-700 group-hover:bg-blue-500 rotate-45 origin-right transition-all duration-300 group-hover:w-4"></div>
                </div>
              </Link>
            </div>
            <div
              className="md:w-2/3 px-4 md:px-16 slide-left-element"
              data-fade-index="34"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                <div className="rotate-element" data-fade-index="35">
                  <div className="bg-black h-52 relative overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/images/solutions/solution1.png')`,
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 group-hover:opacity-20"></div>
                    <div className="absolute bottom-0 left-0 p-4 z-10">
                      <h3 className="text-white text-xl font-bold drop-shadow-lg">
                        최신 소방 기술 도입
                      </h3>
                    </div>
                  </div>
                </div>
                <div className="rotate-element" data-fade-index="36">
                  <div className="bg-black h-52 relative overflow-hidden group">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/images/solutions/solution2.png')`,
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 group-hover:opacity-20"></div>
                    <div className="absolute bottom-0 left-0 p-4 z-10">
                      <h3 className="text-white text-xl font-bold drop-shadow-lg">
                        품질 인증 획득
                      </h3>
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="bg-white shadow-md p-6 slide-up-element"
                data-fade-index="37"
              >
                <ul className="space-y-4">
                  <li>
                    <Link
                      href="/notice/1"
                      className="block hover:bg-gray-50 py-3 border-b border-gray-200 transition-colors"
                    >
                      <div className="text-sm text-gray-500 mb-1">
                        2023.11.10
                      </div>
                      <p className="font-medium text-gray-800">
                        마스테코 ISO 9001 인증 갱신 완료
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/notice/2"
                      className="block hover:bg-gray-50 py-3 border-b border-gray-200 transition-colors"
                    >
                      <div className="text-sm text-gray-500 mb-1">
                        2023.10.25
                      </div>
                      <p className="font-medium text-gray-800">
                        2023 하반기 신입/경력 채용 공고
                      </p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/notice/3"
                      className="block hover:bg-gray-50 py-3 border-b border-gray-200 transition-colors"
                    >
                      <div className="text-sm text-gray-500 mb-1">
                        2023.09.15
                      </div>
                      <p className="font-medium text-gray-800">
                        마스테코 홈페이지 리뉴얼 안내
                      </p>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 7. 채용 정보 섹션 */}
      <div className="relative py-20 section-trigger">
        {/* 배경 이미지 */}
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <div
              style={{ backgroundImage: "url('/images/news/recruit.png')" }}
              role="img"
              aria-label="채용 배경 이미지"
              className="w-full h-full bg-cover bg-center"
            />
            <div className="absolute inset-0 bg-blue-900 opacity-70"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-10">
            <h2
              className="text-blue-200 text-sm font-light uppercase tracking-wider mb-2 fade-in-element"
              data-fade-index="38"
            >
              Join Us
            </h2>
            <h3
              className="text-white text-3xl font-bold fade-in-element"
              data-fade-index="39"
            >
              인재채용
            </h3>
            <div
              className="w-20 h-1 bg-white mx-auto mt-4 scale-up-element"
              data-fade-index="40"
            ></div>
          </div>

          <p
            className="text-white text-lg mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md fade-in-element"
            data-fade-index="41"
          >
            마스테코와 함께 성장하고 혁신할 인재를 찾고 있습니다. <br />
            화재로부터 안전한 세상을 만들기 위한 여정에 동참하세요.
          </p>
          <Link
            href="/careers"
            className="inline-block bg-white text-blue-900 hover:bg-blue-50 py-3 px-8 rounded-md transition duration-300 font-bold shadow-lg scale-up-element"
            data-fade-index="42"
          >
            채용 정보 보기
          </Link>
        </div>
      </div>

      {/* 8. 문의하기 섹션 - 간략하게 표시 */}
      <div className="relative py-20 bg-white section-trigger">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-16">
            <h2
              className="text-gray-700 text-sm font-light uppercase tracking-wider mb-2 fade-in-element"
              data-fade-index="43"
            >
              Contact
            </h2>
            <h3
              className="text-blue-900 text-3xl font-bold fade-in-element"
              data-fade-index="44"
            >
              문의하기
            </h3>
            <div
              className="w-20 h-1 bg-blue-900 mx-auto mt-4 scale-up-element"
              data-fade-index="45"
            ></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div
              className="text-center bg-gray-50 p-8 rounded-md shadow-sm slide-up-element"
              data-fade-index="46"
            >
              <div
                className="w-16 h-16 mx-auto bg-blue-900 rounded-full flex items-center justify-center mb-4 shadow-md scale-up-element"
                data-fade-index="47"
              >
                <FaPhone className="text-white text-xl" />
              </div>
              <h4 className="text-blue-900 font-bold mb-2">전화</h4>
              <p className="text-gray-700 font-medium">1644-0690</p>
            </div>
            <div
              className="text-center bg-gray-50 p-8 rounded-md shadow-sm slide-up-element"
              data-fade-index="48"
            >
              <div
                className="w-16 h-16 mx-auto bg-blue-900 rounded-full flex items-center justify-center mb-4 shadow-md scale-up-element"
                data-fade-index="49"
              >
                <FaEnvelope className="text-white text-xl" />
              </div>
              <h4 className="text-blue-900 font-bold mb-2">이메일</h4>
              <p className="text-gray-700 font-medium">info@masteco.co.kr</p>
            </div>
            <div
              className="text-center bg-gray-50 p-8 rounded-md shadow-sm slide-up-element"
              data-fade-index="50"
            >
              <div
                className="w-16 h-16 mx-auto bg-blue-900 rounded-full flex items-center justify-center mb-4 shadow-md scale-up-element"
                data-fade-index="51"
              >
                <FaMapMarkerAlt className="text-white text-xl" />
              </div>
              <h4 className="text-blue-900 font-bold mb-2">주소</h4>
              <p className="text-gray-700 font-medium">
                인천광역시 남동구 앵고개로 490번길 173
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 고정된 문의하기 버튼 그룹 */}
      {!showIntro && (
        <div className="fixed bottom-4 sm:bottom-10 right-4 sm:right-10 z-50 flex flex-col">
          <Link
            href="/products/parts"
            className="flex flex-col items-center justify-center bg-teal-600 text-white w-14 h-14 md:w-20 md:h-20 shadow-lg mb-1 rounded-lg"
          >
            <div className="relative mt-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mb-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                />
              </svg>
            </div>
            <span className="text-xs md:text-sm font-medium">A/S부품구매</span>
          </Link>
          <Link
            href="/certification"
            className="flex flex-col items-center justify-center bg-blue-700 text-white w-14 h-14 md:w-20 md:h-20 shadow-lg mb-1 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-2 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
              />
            </svg>
            <span className="text-xs md:text-sm font-medium">형식승인서</span>
          </Link>
          <Link
            href="/catalog"
            className="flex flex-col items-center justify-center bg-blue-500 text-white w-14 h-14 md:w-20 md:h-20 shadow-lg mb-1 rounded-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mt-2 mb-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25"
              />
            </svg>
            <span className="text-xs md:text-sm font-medium text-center">
              카탈로그
              <br />
              자재승인서
            </span>
          </Link>
          <Link
            href="/newsletter"
            className="flex flex-col items-center justify-center bg-blue-800 text-white w-14 h-14 md:w-20 md:h-20 shadow-lg mb-1 rounded-lg"
          >
            <FaEnvelope className="h-6 w-6 mt-2 mb-1" />
            <span className="text-xs md:text-sm font-medium">뉴스레터</span>
          </Link>
          <Link
            href="/contact"
            className="flex flex-col items-center justify-center bg-[#FFE812] text-yellow-900 w-14 h-14 md:w-20 md:h-20 shadow-lg rounded-lg"
          >
            <div className="mt-2 mb-1 w-6 h-6 md:w-10 md:h-10 flex items-center justify-center">
              <Image
                src="/images/news/kakaotalk.svg"
                alt="고객문의"
                width={22}
                height={22}
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xs md:text-sm font-medium">고객문의</span>
          </Link>
        </div>
      )}
    </div>
  );
}
