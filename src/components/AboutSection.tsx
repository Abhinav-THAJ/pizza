'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Left images slide in
      gsap.from('.about-img-top', {
        scrollTrigger: { trigger: '.about-images', start: 'top 80%' },
        x: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.about-img-bottom', {
        scrollTrigger: { trigger: '.about-images', start: 'top 80%' },
        x: -50,
        opacity: 0,
        duration: 0.8,
        delay: 0.2,
        ease: 'power3.out',
      });
      // Right text slide in
      gsap.from('.about-text-content > *', {
        scrollTrigger: { trigger: '.about-text-content', start: 'top 80%' },
        x: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#EDE8DD] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left – Images */}
          <div className="about-images flex gap-4">
            {/* Tall left image */}
            <div className="about-img-top flex-1">
              <img
                src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&q=85&fit=crop"
                alt="Restaurant interior"
                className="w-full h-[380px] object-cover rounded-2xl shadow-lg"
              />
            </div>
            {/* Right column – two smaller images */}
            <div className="about-img-bottom flex flex-col gap-4 flex-1">
              <img
                src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=85&fit=crop"
                alt="Organic food"
                className="w-full h-[178px] object-cover rounded-2xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=400&q=85&fit=crop"
                alt="Chef cooking"
                className="w-full h-[178px] object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>

          {/* Right – Text */}
          <div className="about-text-content">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-4">
              ★ About Us
            </p>
            <h2 className="text-[38px] font-bold leading-[1.2] text-[#1A1A1A] mb-6">
              We crafted{' '}
              <span className="italic font-normal" style={{ fontFamily: 'Playfair Display, serif' }}>
                delectable
              </span>{' '}
              and flavorful food using{' '}
              <span className="italic font-normal" style={{ fontFamily: 'Playfair Display, serif' }}>
                organic
              </span>{' '}
              ingredients.
            </h2>
            <p className="text-[14px] text-[#666] leading-relaxed mb-4">
              Discover amet arcu lacus amet aliquam enim nibh lorem nibh. Aliquet lorem tortor dui leo massa. Fames ultricies in bibendum dolor praesent suspendisse.
            </p>
            <p className="text-[14px] text-[#666] leading-relaxed mb-8">
              Nunc integer varius leo, imperdiet turpis ornare. Proin vel diam dictum posuere nisi ullamcorper. Malesuada turpis arcu consequat imperdiet aliquet.
            </p>
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: '#C42B14' }}
              whileTap={{ scale: 0.97 }}
              onClick={() => { document.getElementById('our-menu')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="bg-[#E8341A] text-white text-[13px] font-semibold px-8 py-3 rounded-full transition-colors duration-200"
            >
              Order Now
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
}
