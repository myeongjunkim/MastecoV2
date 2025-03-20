import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* 1. 전체화면 히어로 섹션 (슬로건과 배경) */}
      <div className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/industry/masteco-building.jpg')`,
          }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div className="absolute inset-0 flex flex-col justify-center px-16 z-20">
          <div className="mb-2">
            <h1 className="text-white text-6xl md:text-8xl font-extrabold tracking-tight drop-shadow-lg">
              MASTECO
            </h1>
          </div>
          <h2 className="text-blue-400 text-4xl md:text-6xl font-bold tracking-tight drop-shadow-lg">
            FIRE PROTECTION
            <br />
            for SAFE WORLD
          </h2>
          <p className="text-blue-200 text-lg md:text-xl max-w-xl mt-4 drop-shadow-md">
            1982년부터 마스테코는 화재로부터 소중한 생명과 재산을 보호하는
            최고의 솔루션을 제공하고 있습니다.
          </p>
        </div>
        <div className="absolute top-5 right-10 z-20">
          <div className="text-white text-xl font-bold drop-shadow-md">
            MASTECO
          </div>
        </div>
      </div>

      {/* 2. 회사 설명 섹션 - 블루 박스 */}
      <div className="relative py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-gray-700 text-sm font-light uppercase tracking-wider mb-2">
              About us
            </h2>
            <h3 className="text-blue-900 text-3xl font-bold">회사소개</h3>
            <div className="w-20 h-1 bg-blue-900 mx-auto mt-4"></div>
          </div>

          <div className="flex flex-col md:flex-row items-start">
            <div className="md:w-1/3 pl-4 md:pl-16 pb-10">
              <h3 className="text-gray-700 text-2xl font-light mb-4">
                MASTECO 소개
              </h3>
            </div>
            <div className="md:w-2/3 px-4 md:px-16">
              <div className="bg-blue-900 p-10 rounded-none text-white w-full md:w-4/5 shadow-md">
                <h2 className="text-3xl font-bold mb-6 text-white">
                  MASTECO is
                </h2>
                <p className="text-lg mb-4 text-blue-50">
                  화재로부터 안전한 세상을 만들기 위해 사회적 책임감을 바탕으로
                  소방설비 산업에 기여하는 전문 기업입니다.
                </p>
                <p className="mb-6 text-blue-50">
                  1982년부터 마스테코는 엄격한 산업 표준에 따라 자체 시설에서
                  모든 제품을 설계, 생산, 테스트하며, 국내외 승인 기관의 인증을
                  획득한 안전한 소방 솔루션을 제공합니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 바둑판식 이미지와 솔루션 설명 섹션 */}
      <div className="relative py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="text-gray-700 text-sm font-light uppercase tracking-wider mb-2">
              Our Solutions
            </h2>
            <h3 className="text-blue-900 text-3xl font-bold">
              핵심 제품 솔루션
            </h3>
            <div className="w-20 h-1 bg-blue-900 mx-auto mt-4"></div>
          </div>

          {/* 3-1. 첫 번째 솔루션 섹션 */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <div className="h-[400px] relative overflow-hidden group">
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
              <div className="md:w-1/2 flex items-center bg-white">
                <div className="p-8 md:p-16">
                  <h2 className="text-blue-900 text-2xl font-bold mb-6">
                    수계 소화설비
                  </h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    스프링클러 헤드, 스테인리스 스틸 플렉시블 호스 및 피팅, 알람
                    체크 밸브, 프리액션 밸브, 델류지 밸브 등 다양한 수계
                    소화설비 솔루션을 제공합니다.
                  </p>
                  <Link
                    href="/products/water-based"
                    className="text-blue-700 font-semibold hover:text-blue-500"
                  >
                    자세히 보기 →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 3-2. 두 번째 솔루션 섹션 */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row-reverse">
              <div className="md:w-1/2">
                <div className="h-[400px] relative overflow-hidden group">
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
              <div className="md:w-1/2 flex items-center bg-white">
                <div className="p-8 md:p-16">
                  <h2 className="text-blue-900 text-2xl font-bold mb-6">
                    가스계 소화설비
                  </h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    FIRESAFE, 주방 자동 소화장치, 캐비닛형, 모듈형 자동
                    소화장치, FM-200 피스톤 플로우 시스템 등 첨단 가스계
                    소화설비를 제공합니다.
                  </p>
                  <Link
                    href="/products/gaseous"
                    className="text-blue-700 font-semibold hover:text-blue-500"
                  >
                    자세히 보기 →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 3-3. 세 번째 솔루션 섹션 */}
          <div className="mb-16">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <div className="h-[400px] relative overflow-hidden group">
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
              <div className="md:w-1/2 flex items-center bg-white">
                <div className="p-8 md:p-16">
                  <h2 className="text-blue-900 text-2xl font-bold mb-6">
                    맞춤형 소방 솔루션
                  </h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    고객의 산업 및 적용 분야별 특정 요구사항을 충족시키기 위해
                    설계된 맞춤형 소방 솔루션을 제공합니다.
                  </p>
                  <Link
                    href="/products/custom"
                    className="text-blue-700 font-semibold hover:text-blue-500"
                  >
                    자세히 보기 →
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* 3-4. 네 번째 솔루션 섹션 (추가) */}
          <div>
            <div className="flex flex-col md:flex-row-reverse">
              <div className="md:w-1/2">
                <div className="h-[400px] relative overflow-hidden group">
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
              <div className="md:w-1/2 flex items-center bg-white">
                <div className="p-8 md:p-16">
                  <h2 className="text-blue-900 text-2xl font-bold mb-6">
                    설계 및 컨설팅
                  </h2>
                  <p className="text-gray-700 mb-4 leading-relaxed">
                    마스테코는 소방 시스템 설계부터 설치, 유지보수까지
                    소방설비의 전체 수명 주기에 걸친 전문적인 컨설팅 서비스를
                    제공합니다.
                  </p>
                  <Link
                    href="/products/consulting"
                    className="text-blue-700 font-semibold hover:text-blue-500"
                  >
                    자세히 보기 →
                  </Link>
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
            <h3 className="text-blue-900 text-3xl font-bold">적용 산업 분야</h3>
            <div className="w-20 h-1 bg-blue-900 mx-auto mt-4"></div>
          </div>

          <div className="flex flex-col md:flex-row-reverse">
            <div className="md:w-1/2">
              <div className="h-[400px] relative overflow-hidden group">
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
                <h2 className="text-blue-900 text-2xl font-bold mb-6">
                  다양한 산업 분야
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  마스테코는 제조업, 상업시설, 데이터센터, 의료시설, 교육기관,
                  정부시설 등 다양한 분야에 최적화된 소방 솔루션을 제공합니다.
                </p>
                <Link
                  href="/industry"
                  className="text-blue-700 font-semibold hover:text-blue-500"
                >
                  자세히 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. 산업 분야 배너 섹션 */}
      <div className="relative bg-black">
        <div className="h-[300px] flex items-center justify-start">
          <div className="container px-4 md:px-16 relative z-10">
            <h2 className="text-blue-400 text-4xl font-bold mb-3 drop-shadow-md">
              MASTECO INDUSTRY
            </h2>
            <div className="w-20 h-1 bg-blue-400 mt-4"></div>
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
            <h3 className="text-blue-900 text-3xl font-bold">공지사항</h3>
            <div className="w-20 h-1 bg-blue-900 mx-auto mt-4"></div>
          </div>

          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/3 px-4 md:px-16 mb-10 md:mb-0">
              <h2 className="text-blue-900 text-2xl font-bold mb-6">
                마스테코 소식
              </h2>
              <p className="text-gray-700 mb-6 leading-relaxed">
                마스테코의 최신 소식과 공지사항을 확인하세요. 새로운 제품 출시,
                인증 획득, 기업 소식 및 채용 정보를 안내해 드립니다.
              </p>
            </div>
            <div className="md:w-2/3 px-4 md:px-16">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
                <div>
                  <div className="bg-black h-52 flex items-center justify-center">
                    <h3 className="text-blue-400 text-xl font-bold">
                      공지사항 이미지 1
                    </h3>
                  </div>
                </div>
                <div>
                  <div className="bg-black h-52 flex items-center justify-center">
                    <h3 className="text-blue-400 text-xl font-bold">
                      공지사항 이미지 2
                    </h3>
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
      <div className="relative bg-blue-900 py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-10">
            <h2 className="text-blue-200 text-sm font-light uppercase tracking-wider mb-2">
              Join Us
            </h2>
            <h3 className="text-white text-3xl font-bold">인재채용</h3>
            <div className="w-20 h-1 bg-white mx-auto mt-4"></div>
          </div>

          <p className="text-blue-50 text-lg mb-8 max-w-3xl mx-auto leading-relaxed">
            마스테코와 함께 성장하고 혁신할 인재를 찾고 있습니다. 화재로부터
            안전한 세상을 만들기 위한 여정에 동참하세요.
          </p>
          <Link
            href="/careers"
            className="inline-block bg-white text-blue-900 hover:bg-blue-50 py-3 px-8 rounded-md transition duration-300 font-bold shadow-md"
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
