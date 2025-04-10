import type { Metadata } from "next";
import { Noto_Sans_KR, Lexend } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import localFont from "next/font/local";

const nanumSquare = localFont({
  src: [
    {
      path: "../../public/fonts/NanumSquareOTF.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/NanumSquareOTF_acR.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-nanum-square",
  display: "swap",
});

const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-noto-sans-kr",
});

const lexend = Lexend({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-lexend",
});

export const metadata: Metadata = {
  title: "MASTECO - Fire Protection Solutions",
  description:
    "MASTECO has been operating since 1982, offering the best fire protection solutions to protect lives and valuable properties from the danger of fire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${nanumSquare.variable} ${notoSansKR.variable} ${lexend.variable}`}
    >
      <body className="antialiased">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
