'use client';
import { useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: 6, suffix: '', label: 'Achieved International\nCulinary Awards' },
  { num: 10, suffix: '', label: 'Worldwide Franchise\nDelivered' },
  { num: 20, suffix: 'K+', label: 'Achieved Worldwide\nCulinary Recognition' },
];

// Animated counter hook
function AnimatedNumber({ target, suffix }: { target: number; suffix: string }) {
  const count = useMotionValue(0);
  const rounded = useMotionValue('0');
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const trigger = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      onEnter: () => {
        if (started.current) return;
        started.current = true;
        const ctrl = animate(count, target, {
          duration: 2,
          ease: 'easeOut',
          onUpdate: (v) => {
            rounded.set(Math.round(v).toString());
          },
        });
        return () => ctrl.stop();
      },
    });
    return () => trigger.kill();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      <motion.span>{rounded}</motion.span>{suffix}
    </span>
  );
}

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const pizzaRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Floating pizza
      gsap.to(pizzaRef.current, {
        y: -24,
        rotation: -5,
        duration: 3.2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Parallax pizza on scroll
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          gsap.set(pizzaRef.current, { y: self.progress * 120 - 24 });
        },
      });

      // Word-by-word headline reveal
      if (headlineRef.current) {
        const words = headlineRef.current.querySelectorAll('.word');
        gsap.from(words, {
          y: 60,
          opacity: 0,
          rotateX: -40,
          duration: 0.7,
          stagger: 0.08,
          ease: 'power3.out',
          delay: 0.3,
        });
      }

      // Stagger entrance for stat items
      gsap.from('.hero-stat', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.9,
        ease: 'power2.out',
      });

      // Buttons magnetic entrance
      gsap.from('.hero-btn', {
        scale: 0.8,
        opacity: 0,
        duration: 0.5,
        stagger: 0.12,
        delay: 0.75,
        ease: 'back.out(1.5)',
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Magnetic button effect
  const handleMagnet = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' });
  };
  const handleMagnetLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.4)' });
  };

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative min-h-screen bg-[#F5F0E8] pt-[70px] overflow-hidden"
    >
      {/* Animated background blobs */}
      <motion.div
        animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-[-60px] top-[40px] w-[640px] h-[640px] rounded-full bg-[#EDE8DD]"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute right-[100px] top-[200px] w-[300px] h-[300px] rounded-full bg-[#E8341A]/8"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 flex flex-col lg:flex-row items-center min-h-[calc(100vh-70px)] pb-20 lg:pb-0">
        {/* Left Content */}
        <div className="w-full lg:flex-1 lg:pr-8 pt-24 lg:pt-0 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Headline – word split */}
          <h1
            ref={headlineRef}
            className="text-[44px] md:text-[54px] font-bold leading-[1.1] text-[#1A1A1A] mb-6 overflow-hidden"
            style={{ perspective: '800px' }}
          >
            {['Flavors', 'that'].map((w, i) => (
              <span key={i} className="word inline-block mr-[0.25em]">{w}</span>
            ))}
            <br />
            {['speak', 'louder'].map((w, i) => (
              <span key={i} className="word inline-block mr-[0.25em]">{w}</span>
            ))}
            <br />
            {['than', 'words!'].map((w, i) => (
              <span key={i} className="word inline-block mr-[0.25em]">{w}</span>
            ))}
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-[14px] text-[#666] leading-[1.8] max-w-[380px] mb-8"
          >
            The flavors at this eatery are so rich, vibrant and memorable that they leave a lasting impression. Our culinary experience transcends the need for verbal expression.
          </motion.p>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-14">
            <button
              onMouseMove={handleMagnet}
              onMouseLeave={handleMagnetLeave}
              onClick={() => { document.getElementById('our-menu')?.scrollIntoView({ behavior: 'smooth' }); }}
              className="hero-btn bg-[#E8341A] text-white text-[13px] font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-[#E8341A]/25 hover:shadow-[#E8341A]/40 hover:bg-[#C42B14] transition-colors duration-200"
            >
              Order Now
            </button>
            <button
              onMouseMove={handleMagnet}
              onMouseLeave={handleMagnetLeave}
              onClick={() => window.location.href = '/contact'}
              className="hero-btn bg-[#1A1A1A] text-white text-[13px] font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-black/20 hover:bg-[#333] transition-colors duration-200"
            >
              Book a Table
            </button>
          </div>

          {/* Stats with animated numbers */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-0">
            {stats.map((stat, i) => (
              <div key={i} className="hero-stat flex items-center sm:items-start text-center sm:text-left flex-col sm:flex-row">
                {i > 0 && <div className="hidden sm:block w-px h-12 bg-[#D5CFC7] mx-8 mt-1" />}
                <div>
                  <div className="text-[34px] font-black text-[#1A1A1A] leading-none mb-1">
                    <AnimatedNumber target={stat.num} suffix={stat.suffix} />
                  </div>
                  <div className="text-[11px] text-[#888] leading-snug whitespace-pre-line max-w-[110px]">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right – Pizza */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7, x: 80 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="w-full lg:flex-1 mt-16 lg:mt-0 flex justify-center items-center relative"
        >
          <div ref={pizzaRef} className="relative" style={{ transform: 'rotate(-8deg)' }}>
            {/* Glow effect */}
            <motion.div
              animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-[-30px] rounded-full bg-[#E8341A]/15 blur-2xl"
            />
            <img
              src="https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=600&q=85&fit=crop"
              alt="Featured Pizza"
              className="w-[300px] h-[300px] md:w-[460px] md:h-[460px] object-cover rounded-full shadow-2xl relative z-10"
              style={{ boxShadow: '0 40px 100px rgba(0,0,0,0.2)' }}
            />
            {/* Spinning ring 1 */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-[-16px] rounded-full border border-dashed border-[#E8341A]/25"
            />
            {/* Pulse ring 2 */}
            <motion.div
              animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.15, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-[-32px] rounded-full border-2 border-[#E8341A]/30"
            />

            {/* Floating badges */}
            <motion.div
              animate={{ y: [-6, 6, -6], rotate: [-3, 3, -3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-white rounded-2xl px-4 py-2.5 shadow-xl z-20"
            >
              <p className="text-[10px] font-bold text-[#E8341A] uppercase tracking-wider">Today's Special</p>
              <p className="text-[13px] font-black text-[#1A1A1A]">Margherita 🍕</p>
            </motion.div>

            <motion.div
              animate={{ y: [6, -6, 6], rotate: [3, -3, 3] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-2 -left-6 bg-[#E8341A] rounded-2xl px-4 py-2.5 shadow-xl z-20"
            >
              <p className="text-[10px] font-bold text-white/80 uppercase tracking-wider">Rating</p>
              <p className="text-[13px] font-black text-white">⭐ 4.9 / 5.0</p>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <p className="text-[10px] tracking-[3px] uppercase text-[#AAA]">Scroll</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-5 h-8 border-2 border-[#CCC] rounded-full flex items-start justify-center pt-1"
        >
          <div className="w-1 h-1.5 bg-[#E8341A] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
