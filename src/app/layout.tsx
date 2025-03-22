import type { Metadata } from "next";
import { Nanum_Gothic } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";

const nanumGothic = Nanum_Gothic({
  subsets: ["latin"],
  weight: ["400", "700", "800"],
  display: "swap",
  variable: "--font-nanum-gothic",
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
    <html lang="en" className={nanumGothic.variable}>
      <body className="antialiased">
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
