'use client';
import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    Icon: MapPin,
    title: 'Visit Us',
    lines: ['123 Culinary Street', 'New York, NY 10001'],
  },
  {
    Icon: Phone,
    title: 'Call Us',
    lines: ['+1 (555) 234-5678', '+1 (555) 234-5679'],
  },
  {
    Icon: Mail,
    title: 'Email Us',
    lines: ['hello@kushavo.com', 'reservations@kushavo.com'],
  },
  {
    Icon: Clock,
    title: 'Opening Hours',
    lines: ['Mon – Fri: 11am – 11pm', 'Sat – Sun: 10am – 12am'],
  },
];

export default function ContactPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    guests: '2',
    date: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info-card', {
        scrollTrigger: { trigger: '.contact-info-grid', start: 'top 80%' },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power3.out',
      });
      gsap.from('.contact-form-wrap', {
        scrollTrigger: { trigger: '.contact-form-wrap', start: 'top 80%' },
        x: 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
      gsap.from('.contact-map', {
        scrollTrigger: { trigger: '.contact-map', start: 'top 85%' },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: 'power2.out',
      });
    });
    return () => ctx.revert();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400)); // simulate API call
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]" style={{ fontFamily: 'var(--font-poppins), Poppins, sans-serif' }}>
      <Navbar />

      {/* ── Hero Banner ── */}
      <section className="relative pt-[70px] h-[380px] overflow-hidden bg-[#1A1A1A]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1400&q=85&fit=crop)' }}
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/65" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-3"
          >
            ★ Get In Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-[52px] font-bold text-white leading-tight mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="text-[15px] text-white/70 max-w-[420px]"
          >
            We'd love to hear from you. Reserve a table or drop us a message.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="py-16 bg-[#F5F0E8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="contact-info-grid grid grid-cols-4 gap-5">
            {contactInfo.map(({ Icon, title, lines }, i) => (
              <motion.div
                key={i}
                className="contact-info-card bg-white rounded-2xl p-6 text-center"
                whileHover={{ y: -6, boxShadow: '0 20px 50px rgba(0,0,0,0.1)' }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-12 h-12 rounded-xl bg-[#E8341A]/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={20} className="text-[#E8341A]" />
                </div>
                <h3 className="text-[14px] font-bold text-[#1A1A1A] mb-2">{title}</h3>
                {lines.map((line, j) => (
                  <p key={j} className="text-[13px] text-[#666]">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content: Form + Side Info ── */}
      <section className="pb-20 bg-[#F5F0E8]">
        <div className="max-w-[1200px] mx-auto px-8 grid grid-cols-[1fr_420px] gap-10">

          {/* ── Reservation / Contact Form ── */}
          <div className="contact-form-wrap bg-white rounded-3xl p-10 shadow-sm">
            <p className="text-[11px] font-semibold tracking-[3px] uppercase text-[#E8341A] mb-2">★ Reservations</p>
            <h2 className="text-[30px] font-bold text-[#1A1A1A] mb-2">Book a Table or Send a Message</h2>
            <p className="text-[13px] text-[#888] mb-8">Fill in the form and we'll get back to you within 24 hours.</p>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2, type: 'spring', bounce: 0.5 }}
                >
                  <CheckCircle size={60} className="text-[#E8341A] mb-5" />
                </motion.div>
                <h3 className="text-[24px] font-bold text-[#1A1A1A] mb-2">Message Sent!</h3>
                <p className="text-[14px] text-[#666] max-w-[300px]">
                  Thank you for reaching out. We'll confirm your reservation shortly.
                </p>
                <motion.button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', guests: '2', date: '', message: '' }); }}
                  whileHover={{ scale: 1.04 }}
                  className="mt-6 bg-[#E8341A] text-white text-[13px] font-semibold px-6 py-2.5 rounded-full"
                >
                  Send Another
                </motion.button>
              </motion.div>
            ) : (
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Row 1 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#555] mb-1.5 tracking-wide">Full Name *</label>
                    <input
                      required name="name" value={form.name} onChange={handleChange}
                      placeholder="John Doe"
                      className="w-full bg-[#F8F5F0] border border-[#E5E0D8] rounded-xl px-4 py-3 text-[13px] text-[#333] placeholder:text-[#BBB] outline-none focus:border-[#E8341A] focus:ring-2 focus:ring-[#E8341A]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#555] mb-1.5 tracking-wide">Email Address *</label>
                    <input
                      required type="email" name="email" value={form.email} onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full bg-[#F8F5F0] border border-[#E5E0D8] rounded-xl px-4 py-3 text-[13px] text-[#333] placeholder:text-[#BBB] outline-none focus:border-[#E8341A] focus:ring-2 focus:ring-[#E8341A]/10 transition-all"
                    />
                  </div>
                </div>
                {/* Row 2 */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[12px] font-semibold text-[#555] mb-1.5 tracking-wide">Phone Number</label>
                    <input
                      type="tel" name="phone" value={form.phone} onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-[#F8F5F0] border border-[#E5E0D8] rounded-xl px-4 py-3 text-[13px] text-[#333] placeholder:text-[#BBB] outline-none focus:border-[#E8341A] focus:ring-2 focus:ring-[#E8341A]/10 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-[12px] font-semibold text-[#555] mb-1.5 tracking-wide">Number of Guests</label>
                    <select
                      name="guests" value={form.guests} onChange={handleChange}
                      className="w-full bg-[#F8F5F0] border border-[#E5E0D8] rounded-xl px-4 py-3 text-[13px] text-[#333] outline-none focus:border-[#E8341A] focus:ring-2 focus:ring-[#E8341A]/10 transition-all"
                    >
                      {[1,2,3,4,5,6,7,8,10,12].map(n => (
                        <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>
                      ))}
                      <option value="12+">12+ Guests (Private Event)</option>
                    </select>
                  </div>
                </div>
                {/* Row 3 */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#555] mb-1.5 tracking-wide">Preferred Date & Time</label>
                  <input
                    type="datetime-local" name="date" value={form.date} onChange={handleChange}
                    className="w-full bg-[#F8F5F0] border border-[#E5E0D8] rounded-xl px-4 py-3 text-[13px] text-[#333] outline-none focus:border-[#E8341A] focus:ring-2 focus:ring-[#E8341A]/10 transition-all"
                  />
                </div>
                {/* Message */}
                <div>
                  <label className="block text-[12px] font-semibold text-[#555] mb-1.5 tracking-wide">Special Requests / Message</label>
                  <textarea
                    name="message" value={form.message} onChange={handleChange}
                    rows={4}
                    placeholder="Dietary requirements, special occasions, seating preferences..."
                    className="w-full bg-[#F8F5F0] border border-[#E5E0D8] rounded-xl px-4 py-3 text-[13px] text-[#333] placeholder:text-[#BBB] outline-none focus:border-[#E8341A] focus:ring-2 focus:ring-[#E8341A]/10 transition-all resize-none"
                  />
                </div>
                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={loading}
                  whileHover={{ scale: loading ? 1 : 1.03, backgroundColor: '#C42B14' }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full bg-[#E8341A] text-white text-[14px] font-bold py-4 rounded-xl flex items-center justify-center gap-3 shadow-md shadow-[#E8341A]/25 transition-colors duration-200 disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message & Reserve Table
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </div>

          {/* ── Right Side Info ── */}
          <div className="flex flex-col gap-6">
            {/* Quick Reserve note */}
            <div className="bg-[#E8341A] rounded-2xl p-7 text-white">
              <h3 className="text-[20px] font-bold mb-2">Prefer to Call?</h3>
              <p className="text-[13px] text-white/80 mb-4 leading-relaxed">
                Our team is available every day to take your reservation over the phone.
              </p>
              <a href="tel:+15552345678" className="text-[22px] font-black tracking-wide block mb-1">
                +1 (555) 234-5678
              </a>
              <p className="text-[12px] text-white/70">Mon–Sun: 10am – 11pm</p>
            </div>

            {/* Hours */}
            <div className="bg-white rounded-2xl p-7 shadow-sm">
              <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-5 flex items-center gap-2">
                <Clock size={16} className="text-[#E8341A]" />
                Opening Hours
              </h3>
              {[
                { day: 'Monday – Thursday', hours: '11:00 am – 10:00 pm' },
                { day: 'Friday – Saturday', hours: '11:00 am – 11:00 pm' },
                { day: 'Sunday', hours: '10:00 am – 9:00 pm' },
              ].map((item, i) => (
                <div key={i} className={`flex justify-between py-3 ${i < 2 ? 'border-b border-[#F0EBE3]' : ''}`}>
                  <span className="text-[13px] text-[#444] font-medium">{item.day}</span>
                  <span className="text-[13px] text-[#E8341A] font-semibold">{item.hours}</span>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="bg-white rounded-2xl p-7 shadow-sm">
              <h3 className="text-[16px] font-bold text-[#1A1A1A] mb-4">Follow Us</h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Instagram', handle: '@kushavo_eats', color: '#E1306C' },
                  { label: 'Facebook', handle: '/kushavo', color: '#1877F2' },
                  { label: 'Twitter / X', handle: '@kushavo', color: '#000' },
                  { label: 'TripAdvisor', handle: 'Kushavo NYC', color: '#00AF87' },
                ].map((s, i) => (
                  <motion.a
                    key={i}
                    href="#"
                    whileHover={{ y: -3 }}
                    className="flex flex-col p-3 rounded-xl bg-[#F8F5F0] hover:bg-[#F0EBE3] transition-colors"
                  >
                    <span className="text-[11px] font-bold text-[#888] uppercase tracking-wider mb-0.5">{s.label}</span>
                    <span className="text-[12px] font-semibold text-[#333]">{s.handle}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map ── */}
      <section className="pb-20 bg-[#F5F0E8]">
        <div className="max-w-[1200px] mx-auto px-8">
          <div className="contact-map rounded-3xl overflow-hidden h-[380px] shadow-lg relative bg-[#E0D8CC]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.698763!2d-73.9857!3d40.7484!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzU0LjIiTiA3M8KwNTknMDguNSJX!5e0!3m2!1sen!2sus!4v1234567890"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'sepia(20%) saturate(80%)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Kushavo Restaurant Location"
            />
            {/* Map overlay card */}
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-4 shadow-xl">
              <p className="text-[13px] font-bold text-[#1A1A1A]">Kushavo Fine Dining</p>
              <p className="text-[12px] text-[#888]">123 Culinary Street, New York</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
