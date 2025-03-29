"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
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
  const level3MenuRefs = useRef<(HTMLDivElement | null)[]>([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const updateLevel3MenuDirection = () => {
      const cleanupListeners: Array<() => void> = [];

      level3MenuRefs.current.forEach((menuItem) => {
        if (!menuItem) return;

        const handleMouseEnter = () => {
          const rect = menuItem.getBoundingClientRect();
          const windowWidth = window.innerWidth;

          const LEVEL4_MENU_WIDTH = 300;
          const SAFETY_MARGIN = 20;

          const spaceOnRight = windowWidth - rect.right;

          if (spaceOnRight < LEVEL4_MENU_WIDTH + SAFETY_MARGIN) {
            menuItem.dataset.dropDirection = "bottom";
            console.log("Menu direction changed to bottom:", {
              item: menuItem.textContent,
              spaceOnRight,
              threshold: LEVEL4_MENU_WIDTH + SAFETY_MARGIN,
            });
          } else {
            menuItem.dataset.dropDirection = "right";
            console.log("Menu direction set to right:", {
              item: menuItem.textContent,
              spaceOnRight,
              threshold: LEVEL4_MENU_WIDTH + SAFETY_MARGIN,
            });
          }
        };

        menuItem.addEventListener("mouseenter", handleMouseEnter);

        handleMouseEnter();

        cleanupListeners.push(() =>
          menuItem.removeEventListener("mouseenter", handleMouseEnter)
        );
      });

      return () => {
        cleanupListeners.forEach((cleanup) => cleanup());
      };
    };

    const handleResize = () => {
      updateLevel3MenuDirection();
    };

    const cleanupUpdateDirection = updateLevel3MenuDirection();
    window.addEventListener("resize", handleResize);

    const timeoutId = setTimeout(updateLevel3MenuDirection, 500);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
      if (cleanupUpdateDirection) cleanupUpdateDirection();
    };
  }, []);

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
          : "bg-transparent text-white py-5"
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

        /* 방향 전환을 위한 스타일 개선 - 하단 드롭다운 시 디자인 변경 */
        [data-drop-direction="bottom"] .submenu-level4 {
          position: static !important;
          left: auto !important;
          top: auto !important;
          margin-left: 0 !important;
          margin-top: 0 !important;
          display: none;
        }

        /* 하단 드롭다운 시에는 hover가 아닌 클릭으로만 동작하도록 수정 */
        [data-drop-direction="bottom"] .group-hover-subsub .submenu-level4 {
          display: block !important;
          margin-top: 0;
          margin-bottom: 8px;
        }

        /* hover로 열리는 기능 비활성화 */
        [data-drop-direction="bottom"] .group\/subsub:hover .submenu-level4 {
          display: none !important;
        }

        [data-drop-direction="bottom"] .submenu-level4 > div {
          margin-left: 20px !important;
          box-shadow: none !important;
          border-left: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 0 !important;
          background-color: transparent !important;
        }

        [data-drop-direction="bottom"] .submenu-level4 a {
          padding-left: 16px !important;
          font-size: 0.9em;
        }

        /* 화살표 아이콘 스타일 변경 - 하단 방향일 때 다르게 보이도록 */
        [data-drop-direction="bottom"] .subsubChevron {
          transform: rotate(90deg) !important;
          transition: transform 0.2s ease;
          cursor: pointer; /* 클릭 가능함을 시각적으로 표시 */
        }

        [data-drop-direction="bottom"] .group-hover-subsub .subsubChevron {
          transform: rotate(270deg) !important;
        }

        /* 오른쪽 방향 드롭다운은 hover로 계속 동작 */
        .group\/subsub:not([data-drop-direction="bottom"]):hover
          .submenu-level4 {
          display: block !important;
        }

        /* 4단계 메뉴 스타일 */
        .submenu-level4 > div {
          max-width: 300px;
          width: max-content;
          transition: all 0.3s ease;
        }

        /* 서브메뉴 항목 호버 스타일 */
        .group\/subsub:hover > a {
          background-color: rgba(255, 100, 100, 0.95) !important;
        }

        /* 활성화된 3단계 메뉴 스타일 - 하위메뉴가 열려있을 때 */
        .group-hover-subsub > a {
          background-color: rgba(255, 100, 100, 0.95) !important;
        }

        /* 4단계 메뉴 항목은 기본적으로 배경색 없음 */

        /* 4단계 메뉴 항목은 호버 시에만 배경색 변경 */

        /* 그룹 자체의 배경색은 유지 */

        /* 메뉴 호버시 커서 포인터 추가 */
        .group:hover,
        .group\/sub:hover,
        .group\/subsub:hover,
        nav a:hover,
        .submenu-level4 a:hover,
        button:hover {
          cursor: pointer !important;
        }
      `}</style>

      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center focus:outline-none">
          <Image
            src="/images/logos/image.png"
            alt="MASTECO Logo"
            width={150}
            height={40}
            className="h-6 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          {menuItems.map((item, index) => (
            <div key={index} className="relative group">
              <Link
                href={item.path}
                className={`font-medium flex items-center cursor-pointer ${
                  scrolled
                    ? "text-blue-900 hover:text-blue-700"
                    : "text-white hover:text-blue-300"
                }`}
              >
                {item.title}
                {item.submenu.length > 0 && (
                  <FaChevronDown className="ml-1 text-xs" />
                )}
              </Link>

              {item.submenu.length > 0 && (
                <div className="absolute left-0 top-full pt-5 min-w-[12rem] w-fit whitespace-nowrap hidden group-hover:block">
                  <div className="absolute h-5 -top-5 left-0 right-0"></div>
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

                        {subitem.submenu && subitem.submenu.length > 0 && (
                          <div
                            className="absolute left-full top-0 min-w-[14rem] w-fit hidden group-hover/sub:block"
                            ref={(el) => {
                              if (el && !level3MenuRefs.current.includes(el)) {
                                level3MenuRefs.current.push(el);
                              }
                            }}
                          >
                            <div className="py-2 bg-[rgba(210,60,60,0.9)] text-white rounded-md shadow-lg ml-2">
                              {subitem.submenu.map(
                                (subsubitem, subsubindex) => (
                                  <div
                                    key={subsubindex}
                                    className="relative group/subsub"
                                  >
                                    <Link
                                      href={subsubitem.path}
                                      className={`block px-4 py-2 hover:bg-[rgba(255,100,100,0.95)] transition-colors whitespace-nowrap flex items-center justify-between`}
                                    >
                                      {subsubitem.title}
                                      {subsubitem.submenu &&
                                        subsubitem.submenu.length > 0 && (
                                          <FaChevronDown
                                            className="ml-2 text-xs transform -rotate-90 flex-shrink-0 subsubChevron"
                                            onClick={(e) => {
                                              // 링크 클릭을 방지하고 하위 메뉴만 토글
                                              e.preventDefault();
                                              e.stopPropagation();
                                              const parent =
                                                e.currentTarget.closest(
                                                  ".group\\/subsub"
                                                );
                                              if (parent) {
                                                parent.classList.toggle(
                                                  "group-hover-subsub"
                                                );
                                                console.log(
                                                  "메뉴 토글:",
                                                  parent.textContent?.trim()
                                                );
                                              }
                                            }}
                                          />
                                        )}
                                    </Link>

                                    {subsubitem.submenu &&
                                      subsubitem.submenu.length > 0 && (
                                        <div className="submenu-level4 absolute left-full top-0 min-w-[14rem] w-fit hidden z-50">
                                          <div className="py-2 bg-[rgba(210,60,60,0.9)] text-white rounded-md shadow-lg ml-2">
                                            {subsubitem.submenu.map(
                                              (level4Item, level4Index) => (
                                                <Link
                                                  key={level4Index}
                                                  href={level4Item.path}
                                                  className={`flex py-2 hover:cursor-pointer ${
                                                    scrolled
                                                      ? "text-blue-500 hover:text-blue-700"
                                                      : "text-blue-400 hover:text-white"
                                                  }`}
                                                  onClick={() =>
                                                    setIsMenuOpen(false)
                                                  }
                                                >
                                                  {level4Item.title}
                                                </Link>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      )}
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}
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
            <div className="flex justify-between items-center mb-6 pb-4 ">
              <Link href="/" onClick={() => setIsMenuOpen(false)}>
                <Image
                  src="/images/logos/image.png"
                  alt="MASTECO Logo"
                  width={150}
                  height={40}
                  className="h-8 w-auto"
                />
              </Link>
              <button
                className={`focus:outline-none ${
                  scrolled ? "text-blue-900" : "text-white"
                }`}
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
                            className={`flex py-2 justify-between items-center hover:cursor-pointer ${
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

                          {subitem.submenu && subitem.submenu.length > 0 && (
                            <div className="pl-4 space-y-2 mt-2">
                              {subitem.submenu.map(
                                (subsubitem, subsubindex) => (
                                  <div key={subsubindex}>
                                    <Link
                                      href={subsubitem.path}
                                      className={`flex py-2 justify-between items-center hover:cursor-pointer ${
                                        scrolled
                                          ? "text-blue-600 hover:text-blue-800"
                                          : "text-blue-300 hover:text-white"
                                      }`}
                                      onClick={() =>
                                        !subsubitem.submenu &&
                                        setIsMenuOpen(false)
                                      }
                                    >
                                      -- {subsubitem.title}
                                      {subsubitem.submenu &&
                                        subsubitem.submenu.length > 0 && (
                                          <FaChevronDown className="text-xs" />
                                        )}
                                    </Link>

                                    {subsubitem.submenu &&
                                      subsubitem.submenu.length > 0 && (
                                        <div className="pl-4 space-y-2 mt-2">
                                          {subsubitem.submenu.map(
                                            (level4Item, level4Index) => (
                                              <Link
                                                key={level4Index}
                                                href={level4Item.path}
                                                className={`flex py-2 hover:cursor-pointer ${
                                                  scrolled
                                                    ? "text-blue-500 hover:text-blue-700"
                                                    : "text-blue-400 hover:text-white"
                                                }`}
                                                onClick={() =>
                                                  setIsMenuOpen(false)
                                                }
                                              >
                                                --- {level4Item.title}
                                              </Link>
                                            )
                                          )}
                                        </div>
                                      )}
                                  </div>
                                )
                              )}
                            </div>
                          )}
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
