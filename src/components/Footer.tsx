'use client';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const footerLinks = {
  'Quick Links': [
    { label: 'Home', href: '/' },
    { label: 'Our Menu', href: '/#our-menu' },
    { label: 'About Us', href: '/about' },
    { label: 'Contact Us', href: '/contact' },
    { label: 'Reservations', href: '/contact' },
  ],
  'Categories': ['Salads', 'Soups', 'Pasta', 'Pizza', 'Desserts'],
  'Visit Us': [],
};

const SocialSVGs = {
  Instagram: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="20" rx="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none"/>
    </svg>
  ),
  Facebook: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  XTwitter: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  LinkedIn: () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/>
      <rect x="2" y="9" width="4" height="12"/>
      <circle cx="4" cy="4" r="2"/>
    </svg>
  ),
};

const socials = [
  { Icon: SocialSVGs.Instagram, href: '#', label: 'Instagram' },
  { Icon: SocialSVGs.Facebook, href: '#', label: 'Facebook' },
  { Icon: SocialSVGs.XTwitter, href: '#', label: 'Twitter' },
  { Icon: SocialSVGs.LinkedIn, href: '#', label: 'LinkedIn' },
];

export function Footer() {
  return (
    <footer className="bg-[#111111] text-white relative overflow-hidden">
      {/* Top gradient accent */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#E8341A] to-transparent" />

      {/* Background decoration */}
      <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] rounded-full bg-[#E8341A]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-80px] left-[-80px] w-[300px] h-[300px] rounded-full bg-[#E8341A]/4 blur-3xl pointer-events-none" />

      {/* ── Newsletter Banner ── */}
      <div className="border-b border-white/8">
        <div className="max-w-[1240px] mx-auto px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-[22px] font-bold mb-1">
              Get{' '}
              <span className="text-[#E8341A]">10% off</span>{' '}
              your first order!
            </h3>
            <p className="text-[13px] text-white/50">
              Subscribe to our newsletter for exclusive deals & seasonal menus.
            </p>
          </div>
          <div className="flex items-center gap-0 w-full md:w-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="bg-white/8 border border-white/15 rounded-l-full px-5 py-3 text-[13px] text-white placeholder:text-white/35 outline-none focus:border-[#E8341A]/60 w-full md:w-[260px] transition-colors"
            />
            <motion.button
              whileHover={{ scale: 1.03, backgroundColor: '#C42B14' }}
              whileTap={{ scale: 0.97 }}
              className="bg-[#E8341A] text-white text-[12px] font-bold px-6 py-3 rounded-r-full flex items-center gap-2 whitespace-nowrap transition-colors"
            >
              Subscribe <ArrowRight size={14} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* ── Main Footer Grid ── */}
      <div className="max-w-[1240px] mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

        {/* Brand Column */}
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-9 h-9 rounded-xl bg-[#E8341A] flex items-center justify-center shadow-lg shadow-[#E8341A]/30">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 3V21" />
                <path d="M7 12C7 6 11 3 18 3C18 10 14 12 7 12Z" fill="white" fillOpacity="0.2" />
                <path d="M7 12C14 12 18 14 18 21C11 21 7 18 7 12Z" fill="white" fillOpacity="0.2" />
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-black text-[16px] tracking-[2px] text-white uppercase">KUSHAVO</span>
              <span className="text-[9px] tracking-[1.5px] text-[#E8341A] font-semibold uppercase">Fine Dining</span>
            </div>
          </div>
          <p className="text-[13px] text-white/50 leading-relaxed mb-6 max-w-[220px]">
            Crafting unforgettable culinary experiences with the finest organic ingredients since 2010.
          </p>
          {/* Social Icons */}
          <div className="flex items-center gap-2">
            {socials.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                aria-label={label}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.93 }}
                className="w-9 h-9 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-white/50 hover:text-[#E8341A] hover:bg-[#E8341A]/10 hover:border-[#E8341A]/30 transition-all duration-200"
              >
                <Icon />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-[12px] font-bold tracking-[2px] text-white/40 uppercase mb-5">Quick Links</h4>
          <ul className="space-y-3">
            {footerLinks['Quick Links'].map((link) => (
              <li key={link.label}>
                <motion.a
                  href={link.href}
                  whileHover={{ x: 4 }}
                  className="text-[13px] text-white/60 hover:text-[#E8341A] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#E8341A]/50 group-hover:bg-[#E8341A] transition-colors" />
                  {link.label}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Categories */}
        <div>
          <h4 className="text-[12px] font-bold tracking-[2px] text-white/40 uppercase mb-5">Our Menu</h4>
          <ul className="space-y-3">
            {footerLinks['Categories'].map((item) => (
              <li key={item}>
                <motion.a
                  href="#"
                  whileHover={{ x: 4 }}
                  className="text-[13px] text-white/60 hover:text-[#E8341A] transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-[#E8341A]/50 group-hover:bg-[#E8341A] transition-colors" />
                  {item}
                </motion.a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-[12px] font-bold tracking-[2px] text-white/40 uppercase mb-5">Contact</h4>
          <ul className="space-y-4">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8341A]/15 flex items-center justify-center shrink-0 mt-0.5">
                <MapPin size={13} className="text-[#E8341A]" />
              </div>
              <span className="text-[13px] text-white/60 leading-relaxed">
                123 Culinary Street,<br />New York, NY 10001
              </span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8341A]/15 flex items-center justify-center shrink-0">
                <Phone size={13} className="text-[#E8341A]" />
              </div>
              <span className="text-[13px] text-white/60">+1 (555) 234-5678</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-[#E8341A]/15 flex items-center justify-center shrink-0">
                <Mail size={13} className="text-[#E8341A]" />
              </div>
              <span className="text-[13px] text-white/60">hello@kushavo.com</span>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className="border-t border-white/8">
        <div className="max-w-[1240px] mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/30">
            © 2024 Kushavo Fine Dining. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((item) => (
              <a
                key={item}
                href="#"
                className="text-[12px] text-white/30 hover:text-[#E8341A] transition-colors duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
