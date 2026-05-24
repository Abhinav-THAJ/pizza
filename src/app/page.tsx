'use client';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { MenuSection } from '@/components/MenuSection';
import { ChefsSection } from '@/components/ChefsSection';
import { AboutSection } from '@/components/AboutSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F5F0E8]" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
      <Navbar />
      <Hero />
      <MenuSection />
      <ChefsSection />
      <AboutSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
}
