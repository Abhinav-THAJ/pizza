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
    specialty: 'French Cuisine',
    exp: '20 yrs',
  },
  {
    name: 'Guy Hawkins',
    title: 'Pastry Chef',
    img: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&q=80&fit=crop&crop=face',
    social: { facebook: '#', twitter: '#' },
    specialty: 'Pastry & Desserts',
    exp: '15 yrs',
  },
  {
    name: 'Ronald Richards',
    title: 'Sous Chef',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80&fit=crop&crop=face',
    social: { facebook: '#', twitter: '#' },
    specialty: 'Mediterranean',
    exp: '12 yrs',
  },
];

export function ChefsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      // Header slide up
      gsap.from('.chefs-label > *', {
        scrollTrigger: { trigger: '.chefs-label', start: 'top 85%' },
        y: 35,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
      });

      // Cards fan in from bottom with stagger
      gsap.from('.chef-card', {
        scrollTrigger: { trigger: '.chefs-grid', start: 'top 78%' },
        y: 80,
        opacity: 0,
        rotation: 3,
        duration: 0.9,
        stagger: 0.18,
        ease: 'power4.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#EDE8DD] py-20">
      <div className="max-w-[1200px] mx-auto px-6">
        {/* Header */}
        <div className="chefs-label mb-14">
          <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-3">★ Our Chefs</p>
          <div className="flex items-end justify-between">
            <p className="text-[14px] text-[#666] leading-relaxed max-w-[500px]">
              The emphasis on "speaking louder than words" implies that the culinary experience is so powerful it transcends verbal expression. Meet the masters behind our kitchen.
            </p>
          </div>
        </div>

        {/* Chefs Grid */}
        <div className="chefs-grid grid grid-cols-3 gap-8">
          {chefs.map((chef, i) => (
            <motion.div
              key={i}
              className="chef-card group relative"
            >
              {/* Card */}
              <div className="relative overflow-hidden rounded-2xl mb-5 bg-[#F5F0E8]">
                <motion.img
                  src={chef.img}
                  alt={chef.name}
                  className="w-full h-[340px] object-cover object-top"
                  whileHover={{ scale: 1.06 }}
                  transition={{ duration: 0.5 }}
                />

                {/* Overlay on hover */}
                <motion.div
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-[#1A1A1A]/20 to-transparent flex flex-col justify-end p-6"
                >
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    whileHover={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.05 }}
                  >
                    <p className="text-[11px] font-bold text-[#E8341A] uppercase tracking-wider mb-1">
                      {chef.specialty}
                    </p>
                    <p className="text-[13px] text-white/80">{chef.exp} Experience</p>
                  </motion.div>
                </motion.div>

                {/* Experience badge */}
                <div className="absolute top-4 right-4 bg-[#E8341A] text-white text-[11px] font-bold px-3 py-1.5 rounded-full shadow-md">
                  {chef.exp}
                </div>
              </div>

              {/* Info */}
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-[17px] font-bold text-[#1A1A1A] mb-0.5 group-hover:text-[#E8341A] transition-colors duration-200">
                    {chef.name}
                  </h3>
                  <p className="text-[12px] text-[#888]">{chef.title}</p>
                </div>
                {/* Social Icons */}
                <div className="flex items-center gap-2">
                  {[
                    <svg key="fb" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>,
                    <svg key="tw" width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>,
                  ].map((icon, si) => (
                    <motion.a
                      key={si}
                      href="#"
                      whileHover={{ scale: 1.2, y: -2, color: '#E8341A' }}
                      whileTap={{ scale: 0.9 }}
                      className="w-8 h-8 rounded-full border border-[#DDD8D0] flex items-center justify-center text-[#777] hover:text-[#E8341A] hover:border-[#E8341A] transition-colors duration-200"
                    >
                      {icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
