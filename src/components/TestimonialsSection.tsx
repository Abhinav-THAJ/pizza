'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Infinite marquee ticker
const tickerItems = ['🍕 Margherita', '🥗 Caesar Salad', '🍝 Carbonara', '🍜 Quinoa Bowl', '🥘 Ratatouille', '🍲 Minestrone', '🥩 Grilled Salmon', '🍰 Tiramisu', '🍕 Pepperoni', '🥗 Greek Bowl'];

function InfiniteMarquee({ reverse = false }: { reverse?: boolean }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const totalWidth = track.scrollWidth / 2;
    gsap.to(track, {
      x: reverse ? totalWidth : -totalWidth,
      duration: 25,
      ease: 'none',
      repeat: -1,
    });
  }, [reverse]);

  const doubled = [...tickerItems, ...tickerItems];

  return (
    <div className="overflow-hidden">
      <div ref={trackRef} className="flex items-center gap-0 whitespace-nowrap" style={{ width: 'max-content' }}>
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-6 py-0 text-[13px] font-semibold text-[#1A1A1A]/60 uppercase tracking-wider shrink-0">
            {item}
            <span className="text-[#E8341A] text-[8px]">●</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const testimonials = [
  {
    text: '"Absolutely love this restaurant! The flavors are bold, the presentation is stunning, and the service is impeccable. I\'ve never tasted better food in the city — highly recommend to anyone who loves fine dining!"',
    name: 'ARJUN DHANI',
    role: 'Food Critic, Culinary Times',
    rating: 5,
  },
  {
    text: '"Kushavo has redefined what fine dining means to me. Every single dish was a masterpiece. The organic ingredients really shine through — you can taste the quality in every bite. An unforgettable experience!"',
    name: 'PRIYA SHARMA',
    role: 'Regular Customer, NYC',
    rating: 5,
  },
  {
    text: '"From the moment we walked in, the atmosphere was electric. The pasta carbonara was the best I\'ve ever had outside of Italy. Will definitely be coming back with my whole family next time!"',
    name: 'MICHAEL CHEN',
    role: 'Travel Blogger',
    rating: 5,
  },
  {
    text: '"A truly world-class dining experience. The chef clearly pours heart and soul into every plate. The desserts alone are worth the visit — the tiramisu was divine. A must-visit in New York!"',
    name: 'SARAH WILSON',
    role: 'Restaurant Reviewer',
    rating: 5,
  },
];

export function TestimonialsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from('.test-title-line', {
        scrollTrigger: { trigger: '.test-title-line', start: 'top 85%' },
        y: 40,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power3.out',
      });
      gsap.from('.test-card', {
        scrollTrigger: { trigger: '.test-cards-grid', start: 'top 78%' },
        y: 60,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#F5F0E8]">
      {/* Ticker strip */}
      <div className="bg-white border-y border-[#EDE8DD] py-4 overflow-hidden">
        <InfiniteMarquee />
      </div>

      <div className="py-20">
        <div className="max-w-[1200px] mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-14">
            <p className="test-title-line text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-3">
              ★ Testimonials
            </p>
            <h2 className="test-title-line text-[38px] font-bold text-[#1A1A1A] mb-3">
              Testimonials from Individuals
            </h2>
            <p className="test-title-line text-[14px] text-[#888] max-w-[420px] mx-auto">
              Real words from real guests who experienced the Kushavo difference.
            </p>
          </div>

          {/* Cards grid */}
          <div className="test-cards-grid grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                className="test-card bg-white rounded-2xl p-8 relative overflow-hidden"
                whileHover={{
                  y: -8,
                  boxShadow: '0 24px 60px rgba(0,0,0,0.1)',
                }}
                transition={{ duration: 0.3 }}
              >
                {/* Background quote mark decoration */}
                <div className="absolute top-4 right-6 text-[120px] leading-none font-black text-[#F5F0E8] select-none pointer-events-none">
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-4 relative z-10">
                  {[...Array(t.rating)].map((_, si) => (
                    <motion.span
                      key={si}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.05 * si + 0.3, type: 'spring', bounce: 0.5 }}
                      className="text-[#E8341A] text-[14px]"
                    >
                      ★
                    </motion.span>
                  ))}
                </div>

                {/* Red quote mark */}
                <div className="text-[52px] leading-[0.8] font-black text-[#E8341A] mb-3 relative z-10">"</div>

                <p className="text-[14px] text-[#555] leading-relaxed mb-6 italic relative z-10">
                  {t.text}
                </p>

                {/* Divider */}
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="h-[2px] bg-[#E8341A] mb-4"
                />

                <div className="flex items-center gap-3 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-[#E8341A]/10 flex items-center justify-center">
                    <span className="text-[14px] font-bold text-[#E8341A]">{t.name[0]}</span>
                  </div>
                  <div>
                    <p className="text-[13px] font-bold text-[#1A1A1A] tracking-wider">{t.name}</p>
                    <p className="text-[12px] text-[#888]">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom ticker (reverse) */}
      <div className="bg-[#1A1A1A] py-4 overflow-hidden">
        <div className="flex items-center">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <motion.span
              key={i}
              className="inline-flex items-center gap-3 px-6 text-[13px] font-semibold text-white/40 uppercase tracking-wider shrink-0"
            >
              {item}
              <span className="text-[#E8341A] text-[8px]">●</span>
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
