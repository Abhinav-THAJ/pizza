'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const chefs = [
  {
    name: 'Dianne Russell',
    title: 'Head Chef',
    img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80&fit=crop&crop=face',
    social: { facebook: '#', twitter: '#' },
  },
  {
    name: 'Guy Hawkins',
    title: 'Pastry Chef',
    img: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80&fit=crop&crop=face',
    social: { facebook: '#', twitter: '#' },
  },
  {
    name: 'Ronald Richards',
    title: 'Sous Chef',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80&fit=crop&crop=face',
    social: { facebook: '#', twitter: '#' },
  },
];

export function ChefsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.chef-card', {
        scrollTrigger: {
          trigger: '.chefs-grid',
          start: 'top 80%',
        },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.2,
        ease: 'power3.out',
      });
      gsap.from('.chefs-label', {
        scrollTrigger: { trigger: '.chefs-label', start: 'top 85%' },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F5F0E8] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="chefs-label mb-12">
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-3">
            ★ Our Chefs
          </p>
          <p className="text-[14px] text-[#666] leading-relaxed max-w-[540px]">
            The emphasis on "speaking louder than words" implies that the culinary experience is so powerful that it transcends the need for verbal expression.
          </p>
        </div>

        {/* Chefs Grid */}
        <div className="chefs-grid grid grid-cols-3 gap-8">
          {chefs.map((chef, i) => (
            <motion.div
              key={i}
              className="chef-card group"
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {/* Image */}
              <div className="relative overflow-hidden rounded-2xl mb-4 bg-[#EDE8DD]">
                <img
                  src={chef.img}
                  alt={chef.name}
                  className="w-full h-[320px] object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-[#E8341A]/10 transition-all duration-300"
                />
              </div>

              {/* Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-0.5">{chef.name}</h3>
                  <p className="text-[12px] text-[#888]">{chef.title}</p>
                </div>
                {/* Social Icons */}
                <div className="flex items-center gap-3">
                  {/* Facebook */}
                  <motion.a
                    href={chef.social.facebook}
                    whileHover={{ scale: 1.2, color: '#E8341A' }}
                    className="text-[#555] hover:text-[#E8341A] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  </motion.a>
                  {/* Twitter/X */}
                  <motion.a
                    href={chef.social.twitter}
                    whileHover={{ scale: 1.2, color: '#E8341A' }}
                    className="text-[#555] hover:text-[#E8341A] transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
