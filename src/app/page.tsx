"use client";

import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPen } from "react-icons/fa";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { useEffect } from "react";

export default function Home() {
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
    <>
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
      `}</style>

      {/* 히어로 섹션 - 클라이언트 컴포넌트로 분리 */}
      <HeroSection />

      {/* 2. 회사 설명 섹션 - 블루 박스 */}
      <div className="relative py-12 bg-white">
        {/* 상단 타이틀 - 왼쪽 정렬 */}
        <div className="container mx-auto px-4 md:px-16 mb-8">
          <div className="flex items-center">
            <h2
              className="text-blue-900 text-xl font-semibold slide-left-element"
              data-fade-index="0"
            >
              About MASTECO
              <span className="inline-block ml-2 w-8 h-0.5 bg-blue-900"></span>
            </h2>
          </div>
        </div>

        {/* 콘텐츠 영역 */}
        <div className="relative">
          {/* 왼쪽 이미지 & 이진수 배경 */}
          <div
            className="absolute inset-0 z-0 opacity-10 bg-repeat"
            style={{
              backgroundImage: `url('/images/bg-binary.png')`,
              backgroundSize: "400px",
            }}
          ></div>

          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-stretch">
              {/* 왼쪽 영역: 이미지 */}
              <div
                className="md:w-1/2 relative mb-10 md:mb-0 slide-left-element"
                data-fade-index="1"
              >
                <div className="h-full flex items-center">
                  <div className="relative w-full h-[400px] overflow-hidden">
                    <img
                      src="/images/solutions/solution4.png"
                      alt="MASTECO 기술"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>
              </div>

              {/* 오른쪽 영역: 파란색 배경의 텍스트 박스 */}
              <div
                className="md:w-1/2 bg-blue-900 text-white p-12 flex flex-col justify-center slide-right-element"
                data-fade-index="2"
              >
                <h2 className="text-5xl font-bold mb-8">MASTECO is</h2>
                <p className="text-lg mb-6 text-blue-50">
                  화재로부터 안전한 세상을 만들기 위해 사회적 책임감을 바탕으로
                  소방설비 산업에 기여하는 전문 기업입니다.
                </p>
                <p className="mb-6 text-blue-50">
                  1982년부터 마스테코는 엄격한 산업 표준에 따라 자체 시설에서
                  모든 제품을 설계, 생산, 테스트하며, 국내외 승인 기관의 인증을
                  획득한 안전한 소방 솔루션을 제공합니다.
                </p>
                <p className="text-blue-50">
                  소방 설비의 품질과 신뢰성에 집중하여 고객의 안전을 최우선으로
                  생각합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 바둑판식 이미지와 솔루션 설명 섹션 */}
      <div className="relative py-20 bg-gray-50 section-trigger">
        <div className="container mx-auto px-4">
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
                        backgroundImage: `url('/images/industry/Visual 01.png')`,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  className="md:w-1/2 flex items-center bg-white slide-right-element"
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
                        backgroundImage: `url('/images/industry/Visual 02.png')`,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  className="md:w-1/2 flex items-center bg-white slide-left-element"
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
                        backgroundImage: `url('/images/industry/Visual 03.png')`,
                      }}
                    ></div>
                  </div>
                </div>
                <div
                  className="md:w-1/2 flex items-center bg-white slide-right-element"
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
                  className="md:w-1/2 flex items-center bg-white slide-left-element"
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
        <div className="container mx-auto px-4">
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
              <div className="h-[400px] relative overflow-hidden group">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/images/industry/masteco-building.jpg')`,
                  }}
                ></div>
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
          <div className="container mx-auto px-4 md:px-16">
            <div className="flex items-baseline">
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mr-2 slide-left-element"
                data-fade-index="25"
              >
                MASTECO <span className="font-black">INDUSTRY</span>
              </h2>
              <span
                className="text-sm text-gray-600 ml-2 fade-in-element"
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
        <div className="container mx-auto px-4">
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

      <style jsx global>{`
        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}
