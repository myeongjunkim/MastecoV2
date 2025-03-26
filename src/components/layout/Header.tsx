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
        { title: "introduction", path: "/about/introduction" },
        { title: "history", path: "/about/history" },
        { title: "service", path: "/about/service" },
      ],
    },
    {
      title: "제품정보",
      path: "/products",
      submenu: [
        {
          title: "스프링클러",
          path: "/products/sprinkler",
          submenu: [
            {
              title: "친환경 녹색제품 스프링클러 (KFI)",
              path: "/products/sprinkler/eco-green",
              submenu: [
                {
                  title: "저압용 모델",
                  path: "/products/sprinkler/eco-green/low-pressure",
                },
                {
                  title: "고압용 모델",
                  path: "/products/sprinkler/eco-green/high-pressure",
                },
                {
                  title: "산업용 모델",
                  path: "/products/sprinkler/eco-green/industrial",
                },
                {
                  title: "특수환경용 모델",
                  path: "/products/sprinkler/eco-green/special",
                },
              ],
            },
            {
              title: "엘보형 드라이펜던트 (KFI)",
              path: "/products/sprinkler/elbow-dry-pendant",
              submenu: [
                {
                  title: "콘실드 타입",
                  path: "/products/sprinkler/elbow-dry-pendant/concealed",
                },
                {
                  title: "익스포즈드 타입",
                  path: "/products/sprinkler/elbow-dry-pendant/exposed",
                },
                {
                  title: "확장형 타입",
                  path: "/products/sprinkler/elbow-dry-pendant/extended",
                },
                {
                  title: "백콘 타입",
                  path: "/products/sprinkler/elbow-dry-pendant/back-cone",
                },
              ],
            },
            {
              title: "플러쉬형 스프링클러(KFI)",
              path: "/products/sprinkler/flush",
              submenu: [
                {
                  title: "표준 반응형",
                  path: "/products/sprinkler/flush/standard",
                },
                {
                  title: "조기 반응형",
                  path: "/products/sprinkler/flush/quick",
                },
                {
                  title: "내부식성 모델",
                  path: "/products/sprinkler/flush/corrosion-resistant",
                },
                {
                  title: "장식용 모델",
                  path: "/products/sprinkler/flush/decorative",
                },
              ],
            },
            {
              title: "플러쉬형 드라이펜던트(KFI)",
              path: "/products/sprinkler/flush-dry-pendant",
            },
            {
              title: "유리벌브형 스프링클러(KFI)",
              path: "/products/sprinkler/glass-bulb",
            },
            {
              title: "플러쉬형 스프링클러(UL)",
              path: "/products/sprinkler/flush-ul",
            },
            {
              title: "유리벌브형 상향식(UL)",
              path: "/products/sprinkler/glass-bulb-up-ul",
            },
            {
              title: "유리벌브형 하향식(UL)",
              path: "/products/sprinkler/glass-bulb-down-ul",
            },
            {
              title: "유리벌브형 드라이펜던트(KFI)",
              path: "/products/sprinkler/glass-bulb-dry-pendant",
            },
          ],
        },
        {
          title: "소방밸브",
          path: "/products/valve",
          submenu: [
            {
              title: "알람체크밸브 (UL/FM)",
              path: "/products/valve/alarm-check",
              submenu: [
                {
                  title: "습식 알람밸브",
                  path: "/products/valve/alarm-check/wet",
                },
                {
                  title: "건식 알람밸브",
                  path: "/products/valve/alarm-check/dry",
                },
                {
                  title: "프리액션 알람밸브",
                  path: "/products/valve/alarm-check/preaction",
                },
                {
                  title: "조정형 알람밸브",
                  path: "/products/valve/alarm-check/adjustable",
                },
              ],
            },
            {
              title: "알람밸브 플랜지 타입 (KFI)",
              path: "/products/valve/alarm-flange",
              submenu: [
                {
                  title: "4인치 플랜지 타입",
                  path: "/products/valve/alarm-flange/4inch",
                },
                {
                  title: "6인치 플랜지 타입",
                  path: "/products/valve/alarm-flange/6inch",
                },
                {
                  title: "8인치 플랜지 타입",
                  path: "/products/valve/alarm-flange/8inch",
                },
                {
                  title: "특수 플랜지 타입",
                  path: "/products/valve/alarm-flange/special",
                },
              ],
            },
            {
              title: "알람밸브 그루브 타입 (KFI)",
              path: "/products/valve/alarm-groove",
              submenu: [
                {
                  title: "4인치 그루브 타입",
                  path: "/products/valve/alarm-groove/4inch",
                },
                {
                  title: "6인치 그루브 타입",
                  path: "/products/valve/alarm-groove/6inch",
                },
                {
                  title: "8인치 그루브 타입",
                  path: "/products/valve/alarm-groove/8inch",
                },
                {
                  title: "특수 그루브 타입",
                  path: "/products/valve/alarm-groove/special",
                },
              ],
            },
            {
              title: "준비작동식 밸브 (KFI)",
              path: "/products/valve/preaction",
            },
            { title: "체크밸브(UL/FM)", path: "/products/valve/check" },
            { title: "델루지밸브", path: "/products/valve/deluge" },
          ],
        },
        {
          title: "가스계 소화설비",
          path: "/products/gaseous",
          submenu: [
            {
              title: "MG-541 시스템(IG-100)",
              path: "/products/gaseous/mg-541-ig100",
              submenu: [
                {
                  title: "MG-541 실린더 어셈블리",
                  path: "/products/gaseous/mg-541-ig100/cylinder",
                },
                {
                  title: "MG-541 솔레노이드 밸브",
                  path: "/products/gaseous/mg-541-ig100/solenoid",
                },
                {
                  title: "MG-541 방출 노즐",
                  path: "/products/gaseous/mg-541-ig100/nozzle",
                },
                {
                  title: "MG-541 압력 스위치",
                  path: "/products/gaseous/mg-541-ig100/pressure-switch",
                },
              ],
            },
            {
              title: "MG-541 시스템(IG-541)",
              path: "/products/gaseous/mg-541-ig541",
              submenu: [
                {
                  title: "MG-541 실린더 어셈블리(IG-541)",
                  path: "/products/gaseous/mg-541-ig541/cylinder",
                },
                {
                  title: "MG-541 압력 레귤레이터",
                  path: "/products/gaseous/mg-541-ig541/regulator",
                },
                {
                  title: "MG-541 방출 노즐(IG-541)",
                  path: "/products/gaseous/mg-541-ig541/nozzle",
                },
                {
                  title: "MG-541 체크 밸브",
                  path: "/products/gaseous/mg-541-ig541/check-valve",
                },
              ],
            },
            {
              title: "MG-5112 시스템(IG-5.1.12)",
              path: "/products/gaseous/mg-5112",
              submenu: [
                {
                  title: "MG-5112 실린더(200bar)",
                  path: "/products/gaseous/mg-5112/cylinder-200bar",
                },
                {
                  title: "MG-5112 실린더(300bar)",
                  path: "/products/gaseous/mg-5112/cylinder-300bar",
                },
                {
                  title: "MG-5112 방출 헤드 밸브",
                  path: "/products/gaseous/mg-5112/discharge-head",
                },
                {
                  title: "MG-5112 컬렉터",
                  path: "/products/gaseous/mg-5112/collector",
                },
              ],
            },
            {
              title: "MG-227 시스템(HFC-227ea)",
              path: "/products/gaseous/mg-227",
              submenu: [
                {
                  title: "MG-227 실린더 어셈블리",
                  path: "/products/gaseous/mg-227/cylinder",
                },
                {
                  title: "MG-227 방출 밸브",
                  path: "/products/gaseous/mg-227/discharge-valve",
                },
                {
                  title: "MG-227 압력 게이지",
                  path: "/products/gaseous/mg-227/pressure-gauge",
                },
                {
                  title: "MG-227 호스 어셈블리",
                  path: "/products/gaseous/mg-227/hose-assembly",
                },
              ],
            },
            {
              title: "MG-125시스템(HFC-125)",
              path: "/products/gaseous/mg-125",
              submenu: [
                {
                  title: "MG-125 실린더(42L)",
                  path: "/products/gaseous/mg-125/cylinder-42l",
                },
                {
                  title: "MG-125 실린더(67L)",
                  path: "/products/gaseous/mg-125/cylinder-67l",
                },
                {
                  title: "MG-125 방출 밸브",
                  path: "/products/gaseous/mg-125/valve",
                },
                {
                  title: "MG-125 압력 스위치",
                  path: "/products/gaseous/mg-125/pressure-switch",
                },
              ],
            },
          ],
        },
        {
          title: "맞춤형 소방 솔루션",
          path: "/products/custom",
          submenu: [],
        },
        {
          title: "설계 및 컨설팅",
          path: "/products/consulting",
          submenu: [],
        },
      ],
    },
    {
      title: "산업분야",
      path: "/industry",
      submenu: [
        { title: "제조업", path: "/industry/manufacturing" },
        { title: "상업시설", path: "/industry/commercial" },
        { title: "데이터센터", path: "/industry/datacenter" },
        { title: "의료시설", path: "/industry/medical" },
      ],
    },
    { title: "공지사항", path: "/news", submenu: [] },
    { title: "채용정보", path: "/careers", submenu: [] },
    { title: "문의하기", path: "/contact", submenu: [] },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white text-blue-900 shadow-md py-3"
          : "bg-transparent text-white py-5"
      }`}
    >
      <style jsx global>{`
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
        .submenu-level4 a {
          background-color: transparent !important;
        }

        /* 4단계 메뉴 항목은 호버 시에만 배경색 변경 */
        .submenu-level4 a:hover {
          background-color: rgba(255, 100, 100, 0.95) !important;
        }

        /* 그룹 자체의 배경색은 유지 */
        .group\/subsub {
          background-color: transparent !important;
        }

        /* 모든 메뉴 항목의 hover 상태 확인 */
        .menu-debug-box {
          position: fixed;
          bottom: 0;
          right: 0;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          padding: 8px;
          font-size: 12px;
          z-index: 9999;
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
                className={`font-medium flex items-center ${
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
                          className="block px-4 py-2 hover:bg-[rgba(255,100,100,0.95)] transition-colors flex items-center justify-between whitespace-nowrap"
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
                                      className="block px-4 py-2 hover:bg-[rgba(255,100,100,0.95)] transition-colors whitespace-nowrap flex items-center justify-between"
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
                                                  className="block px-4 py-2 hover:bg-[rgba(255,100,100,0.95)] transition-colors whitespace-nowrap"
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
          style={{ top: scrolled ? "64px" : "80px" }}
          className={`md:hidden fixed left-0 right-0 w-full h-[calc(100vh-80px)] z-40 ${
            scrolled
              ? "bg-white bg-opacity-95 text-blue-900"
              : "bg-blue-900 bg-opacity-90 text-white"
          } shadow-lg overflow-y-auto`}
        >
          <div className="container mx-auto px-4 py-6">
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
                            className={`flex py-2 justify-between items-center ${
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
                                      className={`flex py-2 justify-between items-center ${
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
                                                className={`flex py-2 ${
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

      {/* 개발용 디버깅 도구 - 프로덕션에서는 제거 */}
      {process.env.NODE_ENV === "development" && (
        <div id="hover-debug" className="menu-debug-box"></div>
      )}

      <script
        dangerouslySetInnerHTML={{
          __html: `
          // 개발 모드에서만 실행
          if (process.env.NODE_ENV === 'development') {
            document.addEventListener('DOMContentLoaded', () => {
              const debug = document.getElementById('hover-debug');
              
              // 3단계 메뉴 요소에 마우스 진입/이탈 감지
              document.querySelectorAll('.group\\/subsub').forEach(el => {
                el.addEventListener('mouseenter', () => {
                  if (debug) debug.textContent = '3단계 메뉴 hover: ' + el.textContent?.trim();
                  
                  // 하단 드롭다운이 아닌 경우에만 호버로 메뉴 표시 강제
                  if (el.dataset.dropDirection !== 'bottom') {
                    el.classList.add('group-hover-subsub');
                  }
                });
                
                el.addEventListener('mouseleave', () => {
                  if (debug) debug.textContent = '3단계 메뉴 hover 해제';
                  
                  // 하단 드롭다운이 아닌 경우에만 호버로 메뉴 숨김 강제
                  if (el.dataset.dropDirection !== 'bottom') {
                    el.classList.remove('group-hover-subsub');
                  }
                });
              });
            });
          }
        `,
        }}
      />
    </header>
  );
};

export default Header;
