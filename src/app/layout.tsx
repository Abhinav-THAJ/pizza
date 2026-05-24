import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { Navbar } from "@/components/Navbar";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "L'Élégance | A Culinary Experience Beyond Taste",
  description: "Where luxury dining meets timeless elegance. Experience our award-winning cinematic fine-dining.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-matte-black text-soft-ivory flex flex-col selection:bg-warm-gold selection:text-matte-black">
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
