"use client";

import Link from "next/link";
import {
  FaPhone,
  FaFax,
  FaMapMarkerAlt,
  FaEnvelope,
  FaYoutube,
  FaLinkedin,
  FaGlobe,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">MASTECO</h3>
            <p className="mb-6">
              1982년부터 마스테코는 화재로부터 고객의 생명과 소중한 재산을
              보호하는 최고의 솔루션을 제공하는 원칙을 바탕으로 운영되고
              있습니다.
            </p>
            <div className="flex items-center mb-2">
              <FaMapMarkerAlt className="mr-2" />
              <span>인천광역시 남동구 앵고개로 490번길 173</span>
            </div>
            <div className="flex items-center mb-2">
              <FaPhone className="mr-2" />
              <span>1644-0690</span>
            </div>
            <div className="flex items-center mb-2">
              <FaFax className="mr-2" />
              <span>+82-2-785-1313</span>
            </div>
            <div className="flex items-center">
              <FaEnvelope className="mr-2" />
              <span>info@masteco.co.kr</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">바로가기</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-blue-300">
                  회사 소개
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-blue-300">
                  제품 정보
                </Link>
              </li>
              <li>
                <Link href="/industry" className="hover:text-blue-300">
                  산업 분야
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-blue-300">
                  공지사항
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-blue-300">
                  채용정보
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-300">
                  문의하기
                </Link>
              </li>
            </ul>
          </div>

          {/* Social & Contact */}
          <div>
            <h3 className="text-xl font-bold mb-4">소식 받기</h3>
            <p className="mb-4">
              마스테코의 최신 제품 및 서비스 업데이트 소식을 받아보세요.
            </p>
            <form className="flex flex-col space-y-4">
              <input
                type="email"
                placeholder="이메일 주소"
                className="px-4 py-2 text-gray-800 rounded-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-700 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition duration-300"
              >
                구독하기
              </button>
            </form>
            <div className="flex mt-6 space-x-4">
              <a href="#" className="text-white hover:text-blue-300">
                <FaYoutube size={24} />
              </a>
              <a href="#" className="text-white hover:text-blue-300">
                <FaLinkedin size={24} />
              </a>
              <a href="#" className="text-white hover:text-blue-300">
                <FaGlobe size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p>
            &copy; {new Date().getFullYear()} 마스테코 산업주식회사. 모든 권리
            보유.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
