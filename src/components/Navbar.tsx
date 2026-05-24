'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ShoppingBag, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Our Menu', href: '/#our-menu' },
  { label: 'About Us', href: '/about' },
  { label: 'Contact Us', href: '/contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-xl shadow-[0_2px_30px_rgba(0,0,0,0.08)]'
            : 'bg-white border-b border-[#EDE8DD]'
        }`}
      >
        <div className="max-w-[1240px] mx-auto px-8 h-[70px] flex items-center justify-between gap-8">

          {/* ── Logo ── */}
          <motion.a
            href="#home"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
          >
            {/* Animated logo mark */}
            <div className="w-9 h-9 rounded-xl bg-[#E8341A] flex items-center justify-center shadow-md group-hover:shadow-[#E8341A]/40 transition-shadow duration-300">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M8 3C8 3 6 10 10 14C12 16 12 18 12 18V22" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18 3V10C18 13 16 14 14 14L12 18" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-[17px] tracking-[2.5px] text-[#1A1A1A] uppercase">
                KUSHAVO
              </span>
              <span className="text-[9px] tracking-[1.5px] text-[#E8341A] font-semibold uppercase">
                Fine Dining
              </span>
            </div>
          </motion.a>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setActiveLink(link.label)}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.3 }}
                className={`relative px-4 py-2 text-[13px] font-medium rounded-full transition-colors duration-200 group ${
                  activeLink === link.label
                    ? 'text-[#E8341A] bg-[#E8341A]/8'
                    : 'text-[#444] hover:text-[#E8341A] hover:bg-[#E8341A]/5'
                }`}
              >
                {link.label}
                {activeLink === link.label && (
                  <motion.span
                    layoutId="navUnderline"
                    className="absolute bottom-0 left-4 right-4 h-[2px] bg-[#E8341A] rounded-full"
                    transition={{ type: 'spring', bounce: 0.3, duration: 0.5 }}
                  />
                )}
              </motion.a>
            ))}
          </nav>

          {/* ── Right Actions ── */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Search pill */}
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.div
                  key="searchInput"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 180, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                  className="overflow-hidden"
                >
                  <input
                    autoFocus
                    type="text"
                    placeholder="Search menu..."
                    className="w-full bg-[#F5F0E8] rounded-full px-4 py-2 text-[13px] text-[#333] outline-none border border-[#E8341A]/30 focus:border-[#E8341A]"
                    onBlur={() => setSearchOpen(false)}
                  />
                </motion.div>
              ) : (
                <motion.button
                  key="searchBtn"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchOpen(true)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#555] hover:text-[#E8341A] hover:bg-[#E8341A]/8 transition-all duration-200"
                >
                  <Search size={17} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Cart with badge */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#555] hover:text-[#E8341A] hover:bg-[#E8341A]/8 transition-all duration-200"
            >
              <ShoppingBag size={17} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E8341A] rounded-full text-white text-[9px] font-bold flex items-center justify-center">
                3
              </span>
            </motion.button>

            {/* Divider */}
            <div className="w-px h-5 bg-[#DDD8D0] mx-1" />

            {/* CTA Button */}
            <motion.button
              whileHover={{ scale: 1.04, backgroundColor: '#C42B14' }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#E8341A] text-white text-[12px] font-semibold px-5 py-2.5 rounded-full shadow-md shadow-[#E8341A]/25 hover:shadow-[#E8341A]/40 transition-all duration-200"
            >
              Reserve Table
            </motion.button>
          </div>

          {/* ── Mobile Hamburger ── */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="lg:hidden w-9 h-9 rounded-full border border-[#E5E0D8] flex items-center justify-center text-[#333]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <AnimatePresence mode="wait">
              {mobileOpen ? (
                <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <X size={18} />
                </motion.span>
              ) : (
                <motion.span key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
                  <Menu size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.header>

      {/* ── Mobile Menu Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-[70px] left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#EDE8DD] shadow-xl"
          >
            <div className="max-w-[1240px] mx-auto px-8 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => { setActiveLink(link.label); setMobileOpen(false); }}
                  className={`px-4 py-3 rounded-xl text-[14px] font-medium transition-all ${
                    activeLink === link.label
                      ? 'text-[#E8341A] bg-[#E8341A]/8'
                      : 'text-[#444] hover:text-[#E8341A] hover:bg-[#F5F0E8]'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[#EDE8DD] mt-2">
                <button className="w-full bg-[#E8341A] text-white text-[13px] font-semibold py-3 rounded-xl">
                  Reserve a Table
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
