"use client";

import { ReactNode } from "react";

interface ContentSectionProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  background?: "white" | "light" | "dark";
  centered?: boolean;
}

const ContentSection = ({
  title,
  subtitle,
  children,
  background = "white",
  centered = false,
}: ContentSectionProps) => {
  const bgClasses = {
    white: "bg-white",
    light: "bg-gray-100",
    dark: "bg-blue-900 text-white",
  };

  return (
    <section className={`py-20 ${bgClasses[background]}`}>
      <div className="container mx-auto px-4">
        <div className={`mb-14 ${centered ? "text-center" : ""}`}>
          <h2
            className={`text-3xl md:text-4xl font-bold mb-5 ${
              background === "dark" ? "text-white" : "text-blue-900"
            }`}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className={`text-lg md:text-xl ${
                background === "dark" ? "text-blue-200" : "text-gray-600"
              }`}
            >
              {subtitle}
            </p>
          )}
        </div>
        <div>{children}</div>
      </div>
    </section>
  );
};

export default ContentSection;
