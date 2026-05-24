'use client';
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { num: '14+', label: 'Years of Excellence' },
  { num: '6', label: 'International Awards' },
  { num: '20K+', label: 'Happy Customers' },
  { num: '120+', label: 'Menu Items' },
];

const values = [
  {
    icon: '🌿',
    title: 'Organic Sourcing',
    desc: 'Every ingredient is hand-selected from certified organic farms, ensuring maximum freshness and flavor in every dish.',
  },
  {
    icon: '👨‍🍳',
    title: 'Master Craftsmanship',
    desc: 'Our team of award-winning chefs bring decades of combined expertise, blending classical techniques with modern innovation.',
  },
  {
    icon: '❤️',
    title: 'Passion for Food',
    desc: 'We believe food is love. Every recipe is crafted with care, creativity, and an unwavering commitment to taste.',
  },
  {
    icon: '🌍',
    title: 'Sustainable Dining',
    desc: 'From zero-waste kitchens to eco-friendly packaging, sustainability is at the core of everything we do.',
  },
];

const team = [
  {
    name: 'Dianne Russell',
    role: 'Head Chef & Co-founder',
    bio: 'Trained at Le Cordon Bleu Paris, Dianne brings 20 years of fine dining mastery to every plate.',
    img: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=500&q=85&fit=crop&crop=face',
  },
  {
    name: 'Guy Hawkins',
    role: 'Executive Pastry Chef',
    bio: 'A culinary virtuoso specializing in French patisserie, Guy has won 3 international dessert competitions.',
    img: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=500&q=85&fit=crop&crop=face',
  },
  {
    name: 'Ronald Richards',
    role: 'Sous Chef',
    bio: 'Ronald's expertise in Mediterranean cuisine adds a distinctive depth and warmth to our seasonal menus.',
    img: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=500&q=85&fit=crop&crop=face',
  },
];

export default function AboutPage() {
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax hero image
      gsap.to('.about-hero-img', {
        scrollTrigger: { trigger: '.about-hero-img', start: 'top top', end: 'bottom top', scrub: true },
        y: 80,
        ease: 'none',
      });

      // Stats count-up animation
      gsap.from('.stat-num', {
        scrollTrigger: { trigger: '.stats-row', start: 'top 80%' },
        textContent: 0,
        duration: 2,
        ease: 'power2.out',
        stagger: 0.15,
        snap: { textContent: 1 },
      });

      // Value cards
      gsap.from('.value-card', {
        scrollTrigger: { trigger: '.values-grid', start: 'top 78%' },
        y: 50,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
      });

      // Team cards
      gsap.from('.team-card', {
        scrollTrigger: { trigger: '.team-grid', start: 'top 80%' },
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-[#F5F0E8]" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
      <Navbar />

      {/* ── Hero Banner ── */}
      <section ref={heroRef} className="relative pt-[70px] h-[420px] overflow-hidden bg-[#1A1A1A]">
        <div
          className="about-hero-img absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=85&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/65" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-3"
          >
            ★ Our Story
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="text-[52px] font-bold text-white leading-tight mb-4"
          >
            About Kushavo
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-[15px] text-white/70 max-w-[480px] leading-relaxed"
          >
            Where every meal is a memory, and every flavour tells a story.
          </motion.p>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=700&q=85&fit=crop"
              alt="Restaurant story"
              className="w-full h-[460px] object-cover rounded-3xl shadow-xl"
            />
            {/* Floating badge */}
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5, type: 'spring', bounce: 0.4 }}
              className="absolute -bottom-6 -right-6 bg-[#E8341A] text-white rounded-2xl px-6 py-4 shadow-xl shadow-[#E8341A]/30"
            >
              <div className="text-[32px] font-black leading-none">14+</div>
              <div className="text-[12px] font-medium opacity-90">Years of Excellence</div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-4">
              ★ Who We Are
            </p>
            <h2 className="text-[40px] font-bold text-[#1A1A1A] leading-[1.2] mb-6">
              Born from a passion for{' '}
              <span className="italic font-normal" style={{ fontFamily: 'Playfair Display, serif' }}>
                authentic
              </span>{' '}
              flavors
            </h2>
            <p className="text-[14px] text-[#666] leading-[1.8] mb-5">
              Founded in 2010, Kushavo began as a small family kitchen with one simple belief: that great food has the power to bring people together. What started as a neighbourhood favourite quickly grew into an award-winning culinary destination.
            </p>
            <p className="text-[14px] text-[#666] leading-[1.8] mb-8">
              Today, we serve thousands of guests every month across our locations, each dish crafted from scratch using the finest organic ingredients sourced directly from local farms and artisanal producers.
            </p>
            <div className="flex items-center gap-4">
              <motion.a
                href="/#our-menu"
                whileHover={{ scale: 1.04, backgroundColor: '#C42B14' }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#E8341A] text-white text-[13px] font-semibold px-7 py-3 rounded-full inline-block transition-colors duration-200"
              >
                Explore Our Menu
              </motion.a>
              <motion.a
                href="/contact"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="border-2 border-[#E8341A] text-[#E8341A] text-[13px] font-semibold px-7 py-3 rounded-full inline-block transition-colors duration-200 hover:bg-[#E8341A] hover:text-white"
              >
                Reserve a Table
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="bg-[#1A1A1A] py-16">
        <div className="stats-row max-w-[1200px] mx-auto px-8 grid grid-cols-4 gap-8">
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.12 }}
              className="text-center border-r border-white/10 last:border-0"
            >
              <div className="stat-num text-[48px] font-black text-[#E8341A] leading-none mb-2">
                {s.num}
              </div>
              <div className="text-[13px] text-white/60 font-medium">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Our Values ── */}
      <section className="py-20 bg-[#EDE8DD]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-3">★ What We Stand For</p>
            <h2 className="text-[38px] font-bold text-[#1A1A1A]">Our Core Values</h2>
          </div>
          <div className="values-grid grid grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={i}
                className="value-card bg-white rounded-2xl p-7"
                whileHover={{ y: -8, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="text-[36px] mb-4">{v.icon}</div>
                <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-3">{v.title}</h3>
                <p className="text-[13px] text-[#666] leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Meet the Team ── */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="text-center mb-14">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-3">★ Our Chefs</p>
            <h2 className="text-[38px] font-bold text-[#1A1A1A]">The Faces Behind the Flavors</h2>
          </div>
          <div className="team-grid grid grid-cols-3 gap-8">
            {team.map((member, i) => (
              <motion.div
                key={i}
                className="team-card group"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-2xl mb-5">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-[340px] object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <h3 className="text-[18px] font-bold text-[#1A1A1A] mb-1">{member.name}</h3>
                <p className="text-[12px] font-semibold text-[#E8341A] uppercase tracking-wider mb-3">{member.role}</p>
                <p className="text-[13px] text-[#666] leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
