"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  imageUrl?: string;
  link?: string;
}

const FeatureCard = ({
  title,
  description,
  icon,
  imageUrl,
  link,
}: FeatureCardProps) => {
  const cardContent = (
    <div
      className={`overflow-hidden bg-white rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl h-full 
                 ${
                   link
                     ? "hover:-translate-y-2 hover:border-blue-500 cursor-pointer"
                     : ""
                 }`}
    >
      {imageUrl && (
        <div
          className="h-56 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${imageUrl})` }}
        />
      )}
      <div className="p-8">
        {icon && <div className="mb-5 text-blue-600">{icon}</div>}
        <h3 className="text-xl font-bold mb-3 text-blue-900">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );

  if (link) {
    return <Link href={link}>{cardContent}</Link>;
  }

  return cardContent;
};

export default FeatureCard;
