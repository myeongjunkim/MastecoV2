"use client";

import Link from "next/link";
import { useState } from "react";
import { FaBars, FaTimes, FaSearch } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-blue-900 text-white z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-bold text-white">MASTECO</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/about"
            className="text-white hover:text-blue-200 font-medium"
          >
            회사소개
          </Link>
          <Link
            href="/products"
            className="text-white hover:text-blue-200 font-medium"
          >
            제품정보
          </Link>
          <Link
            href="/industry"
            className="text-white hover:text-blue-200 font-medium"
          >
            산업분야
          </Link>
          <Link
            href="/news"
            className="text-white hover:text-blue-200 font-medium"
          >
            공지사항
          </Link>
          <Link
            href="/careers"
            className="text-white hover:text-blue-200 font-medium"
          >
            채용정보
          </Link>
          <Link
            href="/contact"
            className="text-white hover:text-blue-200 font-medium"
          >
            문의하기
          </Link>
          <button className="text-white hover:text-blue-200 ml-2">
            <FaSearch size={18} />
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-blue-800 shadow-lg">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/about"
                className="text-white hover:text-blue-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                회사소개
              </Link>
              <Link
                href="/products"
                className="text-white hover:text-blue-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                제품정보
              </Link>
              <Link
                href="/industry"
                className="text-white hover:text-blue-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                산업분야
              </Link>
              <Link
                href="/news"
                className="text-white hover:text-blue-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                공지사항
              </Link>
              <Link
                href="/careers"
                className="text-white hover:text-blue-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                채용정보
              </Link>
              <Link
                href="/contact"
                className="text-white hover:text-blue-200 font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                문의하기
              </Link>
              <div className="py-2">
                <FaSearch size={18} className="text-white" />
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
