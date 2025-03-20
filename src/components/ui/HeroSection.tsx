"use client";

import Link from "next/link";

interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage: string;
}

const HeroSection = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
}: HeroSectionProps) => {
  return (
    <div className="relative h-[700px] w-full overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center items-center container mx-auto px-4 z-10 text-center">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 max-w-4xl leading-tight tracking-tight">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-blue-200 mb-10 max-w-3xl font-light">
            {subtitle}
          </p>
        )}
        {ctaText && ctaLink && (
          <Link
            href={ctaLink}
            className="bg-blue-600 hover:bg-blue-700 text-white py-4 px-10 rounded-md transition duration-300 text-lg font-medium"
          >
            {ctaText}
          </Link>
        )}
      </div>
    </div>
  );
};

export default HeroSection;
