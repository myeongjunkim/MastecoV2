import type { Metadata } from "next";
import { Noto_Sans } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-noto-sans",
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
    <html lang="en" className={notoSans.variable}>
      <body className="antialiased">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
