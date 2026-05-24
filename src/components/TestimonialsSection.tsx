'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    text: '"Absolutely love this fashion website! Trendy styles, fantastic quality, and a breeze to shop. I\'ve never looked better! Highly recommend!"',
    name: 'ARJUN DHANI',
    role: 'Happy Customer',
  },
  {
    text: '"Absolutely love this fashion website! Trendy styles, fantastic quality, and a breeze to shop. I\'ve never looked better! Highly recommend!"',
    name: 'PRIYA SHARMA',
    role: 'Regular Customer',
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.testimonial-title', {
        scrollTrigger: { trigger: '.testimonial-title', start: 'top 85%' },
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power2.out',
      });
      gsap.from('.testimonial-card', {
        scrollTrigger: { trigger: '.testimonials-grid', start: 'top 80%' },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F5F0E8] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="testimonial-title text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-3">
            ★ Testimonials
          </p>
          <h2 className="testimonial-title text-[36px] font-bold text-[#1A1A1A]">
            Testimonials from Individuals
          </h2>
        </div>

        {/* Cards */}
        <div className="testimonials-grid grid grid-cols-2 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              className="testimonial-card bg-white rounded-2xl p-8"
              whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.08)' }}
              transition={{ duration: 0.3 }}
            >
              {/* Quote mark */}
              <div className="text-[64px] leading-none font-bold text-[#E8341A] mb-2" style={{ lineHeight: 1 }}>
                "
              </div>
              <p className="text-[14px] text-[#555] leading-relaxed mb-6 italic">
                {t.text}
              </p>
              {/* Divider */}
              <div className="w-12 h-[2px] bg-[#E8341A] mb-4" />
              <div>
                <p className="text-[13px] font-bold text-[#1A1A1A] tracking-wider">{t.name}</p>
                <p className="text-[12px] text-[#888] mt-0.5">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
