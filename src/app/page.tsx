"use client";

import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaPen } from "react-icons/fa";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import { useEffect } from "react";

export default function Home() {
  // Intersection Observer를 사용하여 스크롤 애니메이션 적용
  useEffect(() => {
    const fadeElements = document.querySelectorAll(".fade-in-element");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 요소에 데이터 인덱스 속성 추가 (이미 있으면 그 값 사용)
            const element = entry.target as HTMLElement;
            const dataIndex =
              element.dataset.fadeIndex ||
              element.getAttribute("data-fade-index");
            const delay = dataIndex ? parseInt(dataIndex) * 0.15 : 0;

            // 지연 시간 적용
            setTimeout(() => {
              element.classList.add("fade-in");
            }, delay * 1000);

            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // 각 요소에 인덱스를 부여
    fadeElements.forEach((element, index) => {
      (element as HTMLElement).dataset.fadeIndex = index.toString();
      observer.observe(element);
    });

    return () => {
      fadeElements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        .fade-in-element {
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 1.2s ease-out, transform 1.2s ease-out;
          will-change: opacity, transform;
        }

        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>

      {/* 히어로 섹션 - 클라이언트 컴포넌트로 분리 */}
      <HeroSection />

      {/* 2. 회사 설명 섹션 - 블루 박스 */}
      <div className="relative py-12 bg-white">
        {/* 상단 타이틀 - 왼쪽 정렬 */}
        <div className="container mx-auto px-4 md:px-16 mb-8">
          <div className="flex items-center">
            <h2 className="text-blue-900 text-xl font-semibold">
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
              <div className="md:w-1/2 relative mb-10 md:mb-0">
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
              <div className="md:w-1/2 bg-blue-900 text-white p-12 flex flex-col justify-center">
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
      <div className="relative py-20 bg-gray-50">
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
                <div className="md:w-1/2 fade-in-element" data-fade-index="1">
                  <div className="h-[400px] relative overflow-hidden group border-2 border-transparent transition-colors duration-300 hover:border-red-600">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/images/industry/Visual 01.png')`,
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 group-hover:opacity-20"></div>
                    <div className="absolute bottom-0 left-0 p-6 z-10">
                      <h3 className="text-white text-2xl font-bold drop-shadow-lg">
                        수계 소화설비
                      </h3>
                    </div>
                  </div>
                </div>
                <div
                  className="md:w-1/2 flex items-center bg-white fade-in-element"
                  data-fade-index="2"
                >
                  <div className="p-8 md:p-16">
                    <h2 className="text-gray-900 text-2xl font-bold mb-6">
                      수계 소화설비
                    </h2>
                    <p className="text-gray-500 mb-4 leading-relaxed">
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
                <div className="md:w-1/2 fade-in-element" data-fade-index="3">
                  <div className="h-[400px] relative overflow-hidden group border-2 border-transparent transition-colors duration-300 hover:border-red-600">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/images/industry/Visual 02.png')`,
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 group-hover:opacity-20"></div>
                    <div className="absolute bottom-0 left-0 p-6 z-10">
                      <h3 className="text-white text-2xl font-bold drop-shadow-lg">
                        가스계 소화설비
                      </h3>
                    </div>
                  </div>
                </div>
                <div
                  className="md:w-1/2 flex items-center bg-white fade-in-element"
                  data-fade-index="4"
                >
                  <div className="p-8 md:p-16">
                    <h2 className="text-gray-900 text-2xl font-bold mb-6">
                      가스계 소화설비
                    </h2>
                    <p className="text-gray-500 mb-4 leading-relaxed">
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
                <div className="md:w-1/2 fade-in-element" data-fade-index="5">
                  <div className="h-[400px] relative overflow-hidden group border-2 border-transparent transition-colors duration-300 hover:border-red-600">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/images/industry/Visual 03.png')`,
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 group-hover:opacity-20"></div>
                    <div className="absolute bottom-0 left-0 p-6 z-10">
                      <h3 className="text-white text-2xl font-bold drop-shadow-lg">
                        맞춤형 소방 솔루션
                      </h3>
                    </div>
                  </div>
                </div>
                <div
                  className="md:w-1/2 flex items-center bg-white fade-in-element"
                  data-fade-index="6"
                >
                  <div className="p-8 md:p-16">
                    <h2 className="text-gray-900 text-2xl font-bold mb-6">
                      맞춤형 소방 솔루션
                    </h2>
                    <p className="text-gray-500 mb-4 leading-relaxed">
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
                <div className="md:w-1/2 fade-in-element" data-fade-index="7">
                  <div className="h-[400px] relative overflow-hidden group border-2 border-transparent transition-colors duration-300 hover:border-red-600">
                    <div
                      className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform group-hover:scale-110"
                      style={{
                        backgroundImage: `url('/images/industry/Visual 04.png')`,
                      }}
                    ></div>
                    <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 group-hover:opacity-20"></div>
                    <div className="absolute bottom-0 left-0 p-6 z-10">
                      <h3 className="text-white text-2xl font-bold drop-shadow-lg">
                        설계 및 컨설팅
                      </h3>
                    </div>
                  </div>
                </div>
                <div
                  className="md:w-1/2 flex items-center bg-white fade-in-element"
                  data-fade-index="8"
                >
                  <div className="p-8 md:p-16">
                    <h2 className="text-gray-900 text-2xl font-bold mb-6">
                      설계 및 컨설팅
                    </h2>
                    <p className="text-gray-500 mb-4 leading-relaxed">
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
      <div className="relative py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-gray-700 text-sm font-light uppercase tracking-wider mb-2">
              Industries
            </h2>
            <h3 className="text-gray-900 text-3xl font-bold">적용 산업 분야</h3>
            <div className="w-20 h-1 bg-blue-900 mx-auto mt-4"></div>
          </div>

          <div className="flex flex-col md:flex-row-reverse">
            <div className="md:w-1/2">
              <div className="h-[400px] relative overflow-hidden group border-2 border-transparent transition-colors duration-300 hover:border-red-600">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 transform group-hover:scale-110"
                  style={{
                    backgroundImage: `url('/images/industry/masteco-building.jpg')`,
                  }}
                ></div>
                <div className="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 group-hover:opacity-20"></div>
                <div className="absolute bottom-0 left-0 p-6 z-10">
                  <h3 className="text-white text-2xl font-bold drop-shadow-lg">
                    다양한 산업 분야
                  </h3>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 flex items-center">
              <div className="p-8 md:p-16">
                <h2 className="text-gray-900 text-2xl font-bold mb-6">
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
      <div className="relative">
        {/* 상단 타이틀 */}
        <div className="bg-white py-6 border-b border-gray-200">
          <div className="container mx-auto px-4 md:px-16">
            <div className="flex items-baseline">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mr-2">
                MASTECO <span className="font-black">INDUSTRY</span>
              </h2>
              <span className="text-sm text-gray-600 ml-2">
                마스테코 산업분야
              </span>
            </div>
          </div>
        </div>

        {/* 메인 이미지 섹션 */}
        <div className="h-[400px]">
          {/* 이미지 배경 */}
          <div className="relative h-full overflow-hidden border-2 border-transparent hover:border-red-600 transition-colors duration-300">
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-500 hover:scale-105"
              style={{
                backgroundImage: `url('/images/solutions/solution1.png')`,
              }}
            ></div>
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="absolute bottom-0 left-0 p-8 z-10">
              <h3 className="text-white text-2xl font-bold drop-shadow-lg">
                소방설비
              </h3>
            </div>

            {/* Read More 링크 */}
            <div className="absolute bottom-0 right-0 p-8 z-10">
              <Link
                href="/industry/aerospace"
                className="flex items-center text-white font-semibold hover:text-blue-300 transition-colors"
              >
                <span className="mr-2">Read More</span>
                <span className="border-b border-white w-10"></span>
              </Link>
            </div>

            {/* 문의하기 버튼 */}
            <div className="absolute right-0 top-0 p-4 z-10">
              <Link
                href="/contact"
                className="bg-white text-blue-900 py-2 px-4 flex items-center font-bold shadow-md hover:bg-gray-100 transition-colors"
              >
                <FaPen className="mr-2" />
                문의하기
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* 6. 공지사항 섹션 */}
      <div className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-gray-700 text-sm font-light uppercase tracking-wider mb-2">
              News & Notice
            </h2>
            <h3 className="text-gray-900 text-3xl font-bold">공지사항</h3>
            <div className="w-20 h-1 bg-blue-900 mx-auto mt-4"></div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 px-4 md:px-16 mb-10 md:mb-0">
              <h2 className="text-gray-900 text-2xl font-bold mb-6">
                마스테코 소식
              </h2>
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
            <div className="md:w-2/3 px-4 md:px-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                <div>
                  <div className="bg-black h-52 relative overflow-hidden group border-2 border-transparent transition-colors duration-300 hover:border-red-600">
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
                <div>
                  <div className="bg-black h-52 relative overflow-hidden group border-2 border-transparent transition-colors duration-300 hover:border-red-600">
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
              <div className="bg-white shadow-md p-6">
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
      <div className="relative py-20">
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
            <h2 className="text-blue-200 text-sm font-light uppercase tracking-wider mb-2">
              Join Us
            </h2>
            <h3 className="text-white text-3xl font-bold">인재채용</h3>
            <div className="w-20 h-1 bg-white mx-auto mt-4"></div>
          </div>

          <p className="text-white text-lg mb-8 max-w-3xl mx-auto leading-relaxed drop-shadow-md">
            마스테코와 함께 성장하고 혁신할 인재를 찾고 있습니다. <br />
            화재로부터 안전한 세상을 만들기 위한 여정에 동참하세요.
          </p>
          <Link
            href="/careers"
            className="inline-block bg-white text-blue-900 hover:bg-blue-50 py-3 px-8 rounded-md transition duration-300 font-bold shadow-lg"
          >
            채용 정보 보기
          </Link>
        </div>
      </div>

      {/* 8. 문의하기 섹션 - 간략하게 표시 */}
      <div className="relative py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-16">
            <h2 className="text-gray-700 text-sm font-light uppercase tracking-wider mb-2">
              Contact
            </h2>
            <h3 className="text-blue-900 text-3xl font-bold">문의하기</h3>
            <div className="w-20 h-1 bg-blue-900 mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center bg-gray-50 p-8 rounded-md shadow-sm">
              <div className="w-16 h-16 mx-auto bg-blue-900 rounded-full flex items-center justify-center mb-4 shadow-md">
                <FaPhone className="text-white text-xl" />
              </div>
              <h4 className="text-blue-900 font-bold mb-2">전화</h4>
              <p className="text-gray-700 font-medium">1644-0690</p>
            </div>
            <div className="text-center bg-gray-50 p-8 rounded-md shadow-sm">
              <div className="w-16 h-16 mx-auto bg-blue-900 rounded-full flex items-center justify-center mb-4 shadow-md">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <h4 className="text-blue-900 font-bold mb-2">이메일</h4>
              <p className="text-gray-700 font-medium">info@masteco.co.kr</p>
            </div>
            <div className="text-center bg-gray-50 p-8 rounded-md shadow-sm">
              <div className="w-16 h-16 mx-auto bg-blue-900 rounded-full flex items-center justify-center mb-4 shadow-md">
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
    </>
  );
}
