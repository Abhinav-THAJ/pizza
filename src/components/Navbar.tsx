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
        className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 max-w-[1200px] w-[calc(100%-2rem)] ${
          scrolled
            ? 'top-4 bg-white/70 backdrop-blur-md border border-white/40 shadow-[0_8px_32px_rgba(0,0,0,0.06)] rounded-full'
            : 'top-6 bg-transparent border border-transparent rounded-full'
        }`}
      >
        <div className={`mx-auto px-6 md:px-8 flex items-center justify-between gap-8 transition-all duration-500 ${
          scrolled ? 'h-[64px]' : 'h-[76px] bg-white/80 md:bg-white/40 backdrop-blur-sm border border-black/5 rounded-full'
        }`}>

          {/* ── Logo ── */}
          <motion.a
            href="/"
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2.5 shrink-0 cursor-pointer group"
          >
            {/* Animated logo mark */}
            <div className="w-9 h-9 rounded-xl bg-[#E8341A] flex items-center justify-center shadow-md group-hover:shadow-[#E8341A]/40 transition-shadow duration-300">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21L21 6C21 6 17.5 3 12 3C6.5 3 3 6 3 6L12 21Z" fill="white" fillOpacity="0.15" />
                <path d="M3 6C6.5 3 17.5 3 21 6" strokeWidth="2"/>
                <path d="M12 21L21 6" strokeOpacity="0.6"/>
                <path d="M12 21L3 6" strokeOpacity="0.6"/>
                <circle cx="12" cy="10" r="1.5" fill="white" stroke="none"/>
                <circle cx="9" cy="14" r="1.2" fill="white" stroke="none"/>
                <circle cx="15" cy="14" r="1.2" fill="white" stroke="none"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-[16px] tracking-[2px] text-[#1A1A1A] uppercase">
                KUSHAVO
              </span>
              <span className="text-[8px] tracking-[1.2px] text-[#E8341A] font-semibold uppercase">
                Artisan Pizza
              </span>
            </div>
          </motion.a>

          {/* ── Desktop Nav Links ── */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#F5F0E8]/40 border border-black/5 rounded-full p-1">
            {navLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                onClick={() => setActiveLink(link.label)}
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i + 0.3 }}
                className={`relative px-5 py-2 text-[12px] font-semibold tracking-wide rounded-full transition-colors duration-200 group ${
                  activeLink === link.label
                    ? 'text-white'
                    : 'text-[#444] hover:text-[#E8341A]'
                }`}
              >
                <span className="relative z-10">{link.label}</span>
                {activeLink === link.label && (
                  <motion.span
                    layoutId="navPillBackground"
                    className="absolute inset-0 bg-[#E8341A] rounded-full shadow-md shadow-[#E8341A]/20"
                    transition={{ type: 'spring', bounce: 0.22, duration: 0.6 }}
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
                    className="w-full bg-[#F5F0E8]/60 backdrop-blur-sm rounded-full px-4 py-2 text-[12px] text-[#333] outline-none border border-black/5 focus:border-[#E8341A]"
                    onBlur={() => setSearchOpen(false)}
                  />
                </motion.div>
              ) : (
                <motion.button
                  key="searchBtn"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchOpen(true)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-[#555] hover:text-[#E8341A] hover:bg-black/5 transition-all duration-200"
                >
                  <Search size={16} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Cart with badge */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="relative w-9 h-9 rounded-full flex items-center justify-center text-[#555] hover:text-[#E8341A] hover:bg-black/5 transition-all duration-200"
            >
              <ShoppingBag size={16} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#E8341A] rounded-full text-white text-[9px] font-bold flex items-center justify-center shadow-sm">
                3
              </span>
            </motion.button>

            {/* Divider */}
            <div className="w-px h-5 bg-[#DDD8D0] mx-1" />

            {/* CTA Button */}
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.04, backgroundColor: '#C42B14' }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#E8341A] text-white text-[11px] font-bold tracking-wide uppercase px-6 py-3 rounded-full shadow-md shadow-[#E8341A]/20 hover:shadow-[#E8341A]/35 transition-all duration-200"
            >
              Reserve Table
            </motion.a>
          </div>

          {/* ── Mobile Hamburger ── */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            className="lg:hidden w-9 h-9 rounded-full border border-black/5 bg-white/40 flex items-center justify-center text-[#333]"
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
            className="fixed top-[90px] left-4 right-4 z-40 bg-white/95 backdrop-blur-xl border border-black/5 rounded-3xl shadow-xl overflow-hidden"
          >
            <div className="px-6 py-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => { setActiveLink(link.label); setMobileOpen(false); }}
                  className={`px-4 py-3 rounded-xl text-[13px] font-semibold transition-all ${
                    activeLink === link.label
                      ? 'text-[#E8341A] bg-[#E8341A]/8'
                      : 'text-[#444] hover:text-[#E8341A] hover:bg-[#F5F0E8]/50'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-3 border-t border-[#EDE8DD] mt-2">
                <a href="/contact" className="block text-center w-full bg-[#E8341A] text-white text-[12px] font-bold py-3 rounded-xl uppercase tracking-wider">
                  Reserve a Table
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
