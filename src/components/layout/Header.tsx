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

    // 초기 로드시 스크롤 위치 확인
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // 드롭다운 메뉴 데이터
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
            },
            {
              title: "엘보형 드라이펜던트 (KFI)",
              path: "/products/sprinkler/elbow-dry-pendant",
            },
            {
              title: "플러쉬형 스프링클러(KFI)",
              path: "/products/sprinkler/flush",
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
            },
            {
              title: "알람밸브 플랜지 타입 (KFI)",
              path: "/products/valve/alarm-flange",
            },
            {
              title: "알람밸브 그루브 타입 (KFI)",
              path: "/products/valve/alarm-groove",
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
            },
            {
              title: "MG-541 시스템(IG-541)",
              path: "/products/gaseous/mg-541-ig541",
            },
            {
              title: "MG-5112 시스템(IG-5.1.12)",
              path: "/products/gaseous/mg-5112",
            },
            {
              title: "MG-227 시스템(HFC-227ea)",
              path: "/products/gaseous/mg-227",
            },
            {
              title: "MG-125시스템(HFC-125)",
              path: "/products/gaseous/mg-125",
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

        {/* Desktop Navigation */}
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
                  {/* Invisible gap-filler to maintain hover state when moving to dropdown */}
                  <div className="absolute h-5 -top-5 left-0 right-0"></div>
                  <div className="py-2 bg-[rgba(210,60,60,0.9)] text-white rounded-md shadow-lg">
                    {item.submenu.map((subitem, subindex) => (
                      <div key={subindex} className="relative group/sub">
                        <Link
                          href={subitem.path}
                          className="px-4 py-2 hover:bg-[rgba(255,100,100,0.95)] transition-colors flex items-center justify-between whitespace-nowrap"
                        >
                          {subitem.title}
                          {subitem.submenu && subitem.submenu.length > 0 && (
                            <FaChevronDown className="ml-2 text-xs transform -rotate-90 flex-shrink-0" />
                          )}
                        </Link>

                        {subitem.submenu && subitem.submenu.length > 0 && (
                          <div className="absolute left-full top-0 min-w-[14rem] w-fit hidden group-hover/sub:block">
                            <div className="py-2 bg-[rgba(210,60,60,0.9)] text-white rounded-md shadow-lg ml-2">
                              {subitem.submenu.map(
                                (subsubitem, subsubindex) => (
                                  <Link
                                    key={subsubindex}
                                    href={subsubitem.path}
                                    className="block px-4 py-2 hover:bg-[rgba(255,100,100,0.95)] transition-colors whitespace-nowrap"
                                  >
                                    {subsubitem.title}
                                  </Link>
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

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden focus:outline-none ${
            scrolled ? "text-blue-900" : "text-white"
          }`}
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
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
                            className={`block py-2 flex justify-between items-center ${
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
                                  <Link
                                    key={subsubindex}
                                    href={subsubitem.path}
                                    className={`block py-2 ${
                                      scrolled
                                        ? "text-blue-600 hover:text-blue-800"
                                        : "text-blue-300 hover:text-white"
                                    }`}
                                    onClick={() => setIsMenuOpen(false)}
                                  >
                                    -- {subsubitem.title}
                                  </Link>
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
