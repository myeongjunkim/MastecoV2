"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch, FaChevronDown } from "react-icons/fa";

interface MenuItem {
  title: string;
  path: string;
  submenu: SubMenuItem[];
}

interface SubMenuItem {
  title: string;
  path: string;
  submenu?: SubMenuItem[];
}

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const menuItems: MenuItem[] = [
    {
      title: "회사소개",
      path: "/about",
      submenu: [
        { title: "CEO 인사말", path: "/about/ceo" },
        { title: "경영이념", path: "/about/philosophy" },
        { title: "글로벌 네트워크", path: "/about/global-network" },
        { title: "회사연혁", path: "/about/history" },
        { title: "오시는 길", path: "/about/location" },
      ],
    },
    {
      title: "제품소개",
      path: "/products",
      submenu: [
        { title: "소화기시스템", path: "/products/fire-extinguisher" },
        {
          title: "부압식 소프링클러 시스템",
          path: "/products/negative-pressure-sprinkler",
        },
        { title: "스프링클러", path: "/products/sprinkler" },
        { title: "후레시블 조인트", path: "/products/flexible-joint" },
        { title: "소방밸브", path: "/products/valve" },
        { title: "주거용 주방소화장치", path: "/products/kitchen-fire" },
        { title: "소공간 자동소화장치", path: "/products/small-space" },
        { title: "소화기 (클린 에이전트)", path: "/products/clean-agent" },
        { title: "포소화설비 (폼시스템)", path: "/products/foam-system" },
      ],
    },
    {
      title: "자료실",
      path: "/resources",
      submenu: [
        { title: "일반자료", path: "/resources/general" },
        { title: "제품/기술자료 및 MSDS", path: "/resources/technical" },
        { title: "비포서비스(BS)", path: "/resources/before-service" },
        { title: "소방관련법령 및 규정", path: "/resources/regulations" },
      ],
    },
    {
      title: "고객지원",
      path: "/support",
      submenu: [],
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[1001] transition-all duration-300 ${
        scrolled
          ? "bg-white text-blue-900 shadow-md py-3"
          : "bg-white/10 text-white py-5"
      }`}
    >
      <style jsx global>{`
        /* 헤더 고정 스타일 추가 */
        header {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          width: 100% !important;
          z-index: 1001 !important; /* 다른 모든 요소보다 위에 오도록 설정 */
        }

        /* 메뉴 호버시 커서 포인터 추가 */
        .group:hover,
        .group\/sub:hover,
        .group\/subsub:hover,
        nav a:hover,
        .submenu-level4 a:hover,
        button:hover {
          cursor: pointer !important;
        }

        /* 링크 호버 애니메이션 - 가운데에서 양쪽으로 확장되는 보더 */
        nav a {
          position: relative;
        }

        nav a::after {
          content: "";
          position: absolute;
          bottom: -3px;
          left: 50%;
          width: 0;
          height: 2px;
          background-color: #d23c3c;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        nav a:hover::after {
          width: 100%;
        }
      `}</style>

      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center focus:outline-none">
          <Image
            src="/images/logos/masteco-logo-origin.png"
            alt="MASTECO Logo"
            width={200}
            height={40}
            className="w-56"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link
                href={item.path}
                className={`text-lg font-medium flex items-center cursor-pointer ${
                  scrolled
                    ? "text-blue-900 hover:text-[rgba(255,100,100,0.95)]"
                    : "text-white hover:text-[rgba(255,100,100,0.95)]"
                }`}
              >
                {item.title}
                {item.submenu.length > 0 && (
                  <FaChevronDown className="ml-1 text-xs" />
                )}
              </Link>

              {item.submenu.length > 0 && (
                <div className="absolute left-0 top-full pt-5 min-w-[12rem] w-fit whitespace-nowrap hidden group-hover:block">
                  <div className="py-2 bg-[rgba(210,60,60,0.9)] text-white rounded-md shadow-lg">
                    {item.submenu.map((subitem, subindex) => (
                      <div key={subindex} className="relative group/sub">
                        <Link
                          href={subitem.path}
                          className={`px-4 py-2 hover:bg-[rgba(255,100,100,0.95)] transition-colors flex items-center justify-between whitespace-nowrap`}
                        >
                          {subitem.title}
                          {subitem.submenu && subitem.submenu.length > 0 && (
                            <FaChevronDown className="ml-2 text-xs transform -rotate-90 flex-shrink-0" />
                          )}
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          <button
            className={`${
              scrolled
                ? "text-blue-900 hover:text-blue-700"
                : "text-white hover:text-blue-300"
            } ml-2`}
          >
            <FaSearch size={18} />
          </button>
        </nav>

        <button
          className={`md:hidden focus:outline-none ${
            scrolled ? "text-blue-900" : "text-white"
          }`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div
          className={`md:hidden fixed top-0 left-0 right-0 w-full h-screen z-50 ${
            scrolled
              ? "bg-white bg-opacity-95 text-blue-900"
              : "bg-blue-900 bg-opacity-90 text-white"
          } shadow-lg overflow-y-auto`}
        >
          <div className="container mx-auto px-4 py-6">
            <div className="flex justify-between items-center pb-4 ">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Image
                  src="/images/logos/masteco-logo-origin.png"
                  alt="MASTECO Logo"
                  width={180}
                  height={40}
                />
              </Link>
              <button
                className={`${scrolled ? "text-blue-900" : "text-white"} ml-2`}
                onClick={toggleMenu}
              >
                <FaTimes size={24} />
              </button>
            </div>

            <nav className="flex flex-col space-y-6">
              {menuItems.map((item, index) => (
                <div key={index} className="space-y-2">
                  <Link
                    href={item.path}
                    className={`font-medium text-lg py-3 border-b flex justify-between items-center ${
                      scrolled
                        ? "border-gray-200 text-blue-900 hover:text-blue-700"
                        : "border-blue-800 text-white hover:text-blue-300"
                    }`}
                    onClick={() =>
                      item.submenu.length === 0 && setIsMenuOpen(false)
                    }
                  >
                    {item.title}
                    {item.submenu.length > 0 && (
                      <FaChevronDown className="text-xs" />
                    )}
                  </Link>

                  {item.submenu.length > 0 && (
                    <div className="pl-4 space-y-2">
                      {item.submenu.map((subitem, subindex) => (
                        <div key={subindex}>
                          <Link
                            href={subitem.path}
                            className={`flex py-2 justify-between items-center hover:cursor-pointer relative ${
                              scrolled
                                ? "text-blue-700 hover:text-blue-900"
                                : "text-blue-200 hover:text-white"
                            }`}
                            onClick={() =>
                              !subitem.submenu && setIsMenuOpen(false)
                            }
                          >
                            - {subitem.title}
                            {subitem.submenu && subitem.submenu.length > 0 && (
                              <FaChevronDown className="text-xs" />
                            )}
                          </Link>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="py-3 flex justify-center">
                <FaSearch
                  size={24}
                  className={scrolled ? "text-blue-900" : "text-white"}
                />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
