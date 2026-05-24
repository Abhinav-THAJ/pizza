import type { Metadata } from "next";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kushavo | Flavors That Speak Louder Than Words",
  description:
    "Experience the finest flavors at Kushavo restaurant. Crafted with organic ingredients, our menu offers salads, soups, pasta, pizza and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-[#F5F0E8] flex flex-col font-[var(--font-poppins)]">
        <SmoothScroll>
          <main className="flex-grow">{children}</main>
        </SmoothScroll>
      </body>
    </html>
  );
}
