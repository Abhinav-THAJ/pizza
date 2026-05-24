"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Menu", href: "#menu" },
    { name: "Experience", href: "#experience" },
    { name: "Gallery", href: "#gallery" },
  ];

  return (
    <motion.header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-matte-black/80 backdrop-blur-md py-4 border-b border-white/5"
          : "bg-transparent py-6"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 1, ease: [0.33, 1, 0.68, 1] }}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="text-2xl font-serif text-warm-gold tracking-widest uppercase">
          L&apos;Élégance
        </Link>
        
        <nav className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm tracking-wider text-soft-ivory/80 hover:text-warm-gold transition-colors duration-300 uppercase"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <Link
            href="#reservation"
            className="hidden md:inline-block px-6 py-2.5 border border-warm-gold text-warm-gold text-sm tracking-widest uppercase hover:bg-warm-gold hover:text-matte-black transition-all duration-300"
          >
            Reserve a Table
          </Link>
          
          <button className="md:hidden flex flex-col space-y-1.5 p-2">
            <span className="w-6 h-0.5 bg-soft-ivory block"></span>
            <span className="w-6 h-0.5 bg-soft-ivory block"></span>
            <span className="w-4 h-0.5 bg-soft-ivory block"></span>
          </button>
        </div>
      </div>
    </motion.header>
  );
}
