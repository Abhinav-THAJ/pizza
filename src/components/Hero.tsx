'use client';
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

const stats = [
  { num: '06', label: 'Achieved International\nCulinary Awards' },
  { num: '10', label: 'Worldwide Franchise\nDelivered' },
  { num: '20', label: 'Achieved Worldwide\nCulinary Recognition' },
];

export function Hero() {
  const pizzaRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating pizza animation
    if (pizzaRef.current) {
      gsap.to(pizzaRef.current, {
        y: -22,
        rotation: -5,
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    }

    // Parallax on scroll
    const onScroll = () => {
      if (pizzaRef.current) {
        const scrollY = window.scrollY;
        gsap.to(pizzaRef.current, {
          y: -22 + scrollY * 0.15,
          duration: 0.5,
          ease: 'none',
        });
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen bg-[#F5F0E8] pt-[68px] overflow-hidden"
    >
      {/* Background decorative circle */}
      <div className="absolute right-[-80px] top-[50px] w-[600px] h-[600px] rounded-full bg-[#EDE8DD] opacity-60 -z-0" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex items-center min-h-[calc(100vh-68px)]">
        {/* Left Content */}
        <div className="flex-1 pr-8 pt-8">
          {/* Small label */}
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-4"
          >
            ★ World Best Restaurant
          </motion.p>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="text-[52px] md:text-[62px] font-bold leading-[1.1] text-[#1A1A1A] mb-6"
            style={{ fontFamily: 'Poppins, sans-serif' }}
          >
            Flavors that<br />
            speak louder<br />
            than words!
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-[14px] text-[#666] leading-relaxed max-w-[380px] mb-8"
          >
            The flavors at this eatery are so rich, vibrant and memorable that they leave a lasting impression on the diner. The emphasis on "speaking louder than words" implies that the culinary experience is so powerful that it transcends the need for verbal expression.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="flex items-center gap-4 mb-12"
          >
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: '#C42B14' }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#E8341A] text-white text-[13px] font-semibold px-7 py-3 rounded-full transition-colors duration-200"
            >
              Order Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: '#E8341A', color: '#fff' }}
              whileTap={{ scale: 0.97 }}
              className="border-2 border-[#E8341A] text-[#E8341A] text-[13px] font-semibold px-7 py-3 rounded-full transition-all duration-200"
            >
              Book a Table
            </motion.button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="flex items-start gap-10"
          >
            {stats.map((stat, i) => (
              <div key={i} className="flex items-start gap-3">
                {i > 0 && <div className="w-px h-10 bg-[#D5CFC7] mt-1" />}
                <div className={i > 0 ? 'pl-0' : ''}>
                  <div className="text-[32px] font-bold text-[#1A1A1A] leading-none mb-1">
                    {stat.num}
                  </div>
                  <div className="text-[11px] text-[#888] leading-snug whitespace-pre-line">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right – Pizza Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, x: 60 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
          className="flex-1 flex justify-center items-center relative"
        >
          <div ref={pizzaRef} className="relative" style={{ transform: 'rotate(-8deg)' }}>
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85&fit=crop"
              alt="Featured Pizza"
              className="w-[480px] h-[480px] object-cover rounded-full shadow-2xl"
              style={{ boxShadow: '0 30px 80px rgba(0,0,0,0.18)' }}
            />
            {/* Decorative ring */}
            <motion.div
              animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.2, 0.4] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-[-20px] rounded-full border-2 border-[#E8341A] opacity-30"
            />
          </div>
        </motion.div>
      </div>

      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path d="M0 40L1440 40L1440 20C1200 0 900 40 720 20C540 0 240 40 0 20V40Z" fill="#FFFFFF" opacity="0.5"/>
        </svg>
      </div>
    </section>
  );
}
