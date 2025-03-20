"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";

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

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white text-blue-900 shadow-md py-3"
          : "bg-transparent text-white py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          {scrolled ? (
            <Image
              src="/images/logos/masteco-logo-invert.png"
              alt="MASTECO Logo"
              width={150}
              height={40}
              className="h-6 w-auto"
            />
          ) : (
            <Image
              src="/images/logos/masteco-logo.png"
              alt="MASTECO Logo"
              width={150}
              height={40}
              className="h-6 w-auto"
            />
          )}
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/about"
            className={`font-medium ${
              scrolled
                ? "text-blue-900 hover:text-blue-700"
                : "text-white hover:text-blue-300"
            }`}
          >
            회사소개
          </Link>
          <Link
            href="/products"
            className={`font-medium ${
              scrolled
                ? "text-blue-900 hover:text-blue-700"
                : "text-white hover:text-blue-300"
            }`}
          >
            제품정보
          </Link>
          <Link
            href="/industry"
            className={`font-medium ${
              scrolled
                ? "text-blue-900 hover:text-blue-700"
                : "text-white hover:text-blue-300"
            }`}
          >
            산업분야
          </Link>
          <Link
            href="/news"
            className={`font-medium ${
              scrolled
                ? "text-blue-900 hover:text-blue-700"
                : "text-white hover:text-blue-300"
            }`}
          >
            공지사항
          </Link>
          <Link
            href="/careers"
            className={`font-medium ${
              scrolled
                ? "text-blue-900 hover:text-blue-700"
                : "text-white hover:text-blue-300"
            }`}
          >
            채용정보
          </Link>
          <Link
            href="/contact"
            className={`font-medium ${
              scrolled
                ? "text-blue-900 hover:text-blue-700"
                : "text-white hover:text-blue-300"
            }`}
          >
            문의하기
          </Link>
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
          className={`md:hidden ${
            scrolled
              ? "bg-gray-100 text-blue-900"
              : "bg-black bg-opacity-80 text-white"
          } shadow-lg`}
        >
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/about"
                className={`font-medium py-2 ${
                  scrolled
                    ? "text-blue-900 hover:text-blue-700"
                    : "text-white hover:text-blue-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                회사소개
              </Link>
              <Link
                href="/products"
                className={`font-medium py-2 ${
                  scrolled
                    ? "text-blue-900 hover:text-blue-700"
                    : "text-white hover:text-blue-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                제품정보
              </Link>
              <Link
                href="/industry"
                className={`font-medium py-2 ${
                  scrolled
                    ? "text-blue-900 hover:text-blue-700"
                    : "text-white hover:text-blue-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                산업분야
              </Link>
              <Link
                href="/news"
                className={`font-medium py-2 ${
                  scrolled
                    ? "text-blue-900 hover:text-blue-700"
                    : "text-white hover:text-blue-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                공지사항
              </Link>
              <Link
                href="/careers"
                className={`font-medium py-2 ${
                  scrolled
                    ? "text-blue-900 hover:text-blue-700"
                    : "text-white hover:text-blue-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                채용정보
              </Link>
              <Link
                href="/contact"
                className={`font-medium py-2 ${
                  scrolled
                    ? "text-blue-900 hover:text-blue-700"
                    : "text-white hover:text-blue-300"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                문의하기
              </Link>
              <div className="py-2">
                <FaSearch
                  size={18}
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
