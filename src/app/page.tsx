"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Fade up elements
      gsap.utils.toArray<HTMLElement>(".reveal-up").forEach((elem) => {
        gsap.fromTo(
          elem,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: elem,
              start: "top 85%",
            },
          }
        );
      });

      // Image reveals
      gsap.utils.toArray<HTMLElement>(".reveal-img-container").forEach((container) => {
        const img = container.querySelector("img");
        gsap.fromTo(
          img,
          { scale: 1.2 },
          {
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
            scrollTrigger: {
              trigger: container,
              start: "top 90%",
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="w-full bg-matte-black text-soft-ivory overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image
            src="/images/hero_cinematic.png"
            alt="Luxury fine dining experience"
            fill
            className="object-cover opacity-70"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/50 to-transparent"></div>
        </motion.div>

        <div className="relative z-10 text-center px-4 flex flex-col items-center">
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-warm-gold mb-6 uppercase tracking-widest max-w-5xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
          >
            A Culinary Experience Beyond Taste
          </motion.h1>
          <motion.p 
            className="text-lg md:text-xl tracking-widest uppercase text-champagne-beige/80 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: "easeOut" }}
          >
            Where luxury dining meets timeless elegance.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <a href="#reservation" className="px-10 py-4 bg-warm-gold text-matte-black uppercase tracking-widest font-semibold hover:bg-white transition-colors duration-300">
              Reserve a Table
            </a>
            <a href="#experience" className="px-10 py-4 border border-warm-gold text-warm-gold uppercase tracking-widest hover:bg-warm-gold hover:text-matte-black transition-colors duration-300">
              Explore the Experience
            </a>
          </motion.div>
        </div>
      </section>

      {/* 2. ABOUT THE RESTAURANT */}
      <section id="about" className="py-32 px-6 md:px-12 lg:px-24 container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 reveal-img-container overflow-hidden h-[600px] relative">
            <Image
              src="/images/luxury_interior.png"
              alt="Restaurant Interior"
              fill
              className="object-cover"
            />
          </div>
          <div className="order-1 lg:order-2 flex flex-col justify-center">
            <p className="text-warm-gold uppercase tracking-[0.3em] mb-4 text-sm reveal-up">Our Philosophy</p>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-tight reveal-up">
              Heritage & Craftsmanship in Every Bite
            </h2>
            <p className="text-soft-ivory/70 text-lg leading-relaxed mb-6 font-sans reveal-up">
              Step into a realm where culinary artistry is elevated to its highest form. 
              Our vision is to provide a sophisticated, immersive dining experience that transcends 
              traditional boundaries. Every dish tells a story of premium ingredients, meticulous 
              preparation, and a passion for perfection.
            </p>
            <a href="#menu" className="w-max border-b border-warm-gold text-warm-gold pb-1 tracking-widest uppercase text-sm hover:text-white hover:border-white transition-all duration-300 reveal-up mt-6">
              Discover Our Menu
            </a>
          </div>
        </div>
      </section>

      {/* 3. SIGNATURE MENU EXPERIENCE */}
      <section id="menu" className="py-32 bg-deep-charcoal w-full">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="text-center mb-20 reveal-up">
            <h2 className="text-5xl font-serif text-warm-gold mb-4">Signature Creations</h2>
            <p className="text-soft-ivory/60 tracking-widest uppercase text-sm">An orchestrated symphony of flavors</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-24">
            <div className="flex flex-col space-y-12 reveal-up">
              <div className="group cursor-pointer">
                <div className="flex justify-between items-baseline mb-2 border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-serif group-hover:text-warm-gold transition-colors duration-300">Truffle Infused Wagyu</h3>
                  <span className="text-warm-gold font-serif text-xl">$145</span>
                </div>
                <p className="text-soft-ivory/60 text-sm mt-3">A5 Japanese Wagyu, black truffle shavings, smoked bone marrow reduction.</p>
              </div>
              <div className="group cursor-pointer">
                <div className="flex justify-between items-baseline mb-2 border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-serif group-hover:text-warm-gold transition-colors duration-300">Ora King Salmon</h3>
                  <span className="text-warm-gold font-serif text-xl">$85</span>
                </div>
                <p className="text-soft-ivory/60 text-sm mt-3">Beetroot cured, yuzu kosho, imperial caviar, dill emulsion.</p>
              </div>
              <div className="group cursor-pointer">
                <div className="flex justify-between items-baseline mb-2 border-b border-white/10 pb-4">
                  <h3 className="text-2xl font-serif group-hover:text-warm-gold transition-colors duration-300">Wild Mushroom Risotto</h3>
                  <span className="text-warm-gold font-serif text-xl">$65</span>
                </div>
                <p className="text-soft-ivory/60 text-sm mt-3">Acquerello rice, chanterelles, 36-month parmigiano, gold leaf.</p>
              </div>
            </div>
            <div className="reveal-img-container overflow-hidden h-[500px] relative">
              <Image
                src="/images/signature_dish.png"
                alt="Signature Dish"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 4. CHEF'S SPOTLIGHT */}
      <section className="py-32 container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="flex flex-col justify-center order-2 lg:order-1">
            <p className="text-warm-gold uppercase tracking-[0.3em] mb-4 text-sm reveal-up">Executive Chef</p>
            <h2 className="text-5xl font-serif mb-8 reveal-up">Alexandre Dubois</h2>
            <p className="text-soft-ivory/70 text-lg leading-relaxed mb-6 reveal-up">
              With three Michelin stars under his belt, Chef Alexandre brings an avant-garde approach to modern European fine dining. His philosophy revolves around respecting the integrity of the finest seasonal produce and elevating it through innovative techniques.
            </p>
            <p className="text-soft-ivory/70 text-lg leading-relaxed reveal-up">
              &quot;Cooking is an art, but dining is an experience. We aim to create memories that linger long after the final course.&quot;
            </p>
          </div>
          <div className="reveal-img-container overflow-hidden h-[700px] relative order-1 lg:order-2">
            <Image
              src="/images/chef_portrait.png"
              alt="Executive Chef"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 5. RESERVATION CTA */}
      <section id="reservation" className="relative py-40 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/luxury_interior.png"
            alt="Dining Atmosphere"
            fill
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-matte-black/70 backdrop-blur-sm"></div>
        </div>
        
        <div className="relative z-10 text-center container mx-auto px-4 max-w-4xl">
          <h2 className="text-4xl md:text-6xl font-serif text-warm-gold mb-6 reveal-up">Reserve Your Table for an Unforgettable Evening</h2>
          <p className="text-lg md:text-xl text-soft-ivory/80 mb-12 uppercase tracking-widest reveal-up">
            Experience culinary artistry in its most luxurious form.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 reveal-up">
            <button className="px-12 py-5 bg-warm-gold text-matte-black uppercase tracking-widest font-semibold hover:bg-white transition-colors duration-300">
              Book Now
            </button>
            <button className="px-12 py-5 border border-warm-gold text-warm-gold uppercase tracking-widest hover:bg-warm-gold hover:text-matte-black transition-colors duration-300">
              Contact Concierge
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-deep-charcoal border-t border-white/5 pt-20 pb-10">
        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-1 md:col-span-2">
              <h3 className="text-3xl font-serif text-warm-gold mb-6 tracking-widest uppercase">L&apos;Élégance</h3>
              <p className="text-soft-ivory/60 max-w-sm leading-relaxed">
                A world-class premium culinary portfolio dedicated to cinematic fine dining and unforgettable experiences.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-[0.2em] uppercase mb-6 text-white">Location</h4>
              <p className="text-soft-ivory/60 mb-2">123 Luxury Avenue</p>
              <p className="text-soft-ivory/60 mb-2">Culinary District, NY 10001</p>
              <p className="text-soft-ivory/60">reservation@lelegance.com</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold tracking-[0.2em] uppercase mb-6 text-white">Hours</h4>
              <p className="text-soft-ivory/60 mb-2">Tue - Sun: 5PM - 11PM</p>
              <p className="text-soft-ivory/60 mb-2">Chef&apos;s Tasting: 7PM</p>
              <p className="text-soft-ivory/60">Monday: Closed</p>
            </div>
          </div>
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-soft-ivory/40 uppercase tracking-widest">
            <p>&copy; {new Date().getFullYear()} L&apos;Élégance. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-warm-gold transition-colors">Instagram</a>
              <a href="#" className="hover:text-warm-gold transition-colors">Facebook</a>
              <a href="#" className="hover:text-warm-gold transition-colors">Twitter</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
