'use client';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // Dot follows instantly
      gsap.to(dot, { x: mouseX, y: mouseY, duration: 0.08, ease: 'none' });
      // Ring follows with lag
      gsap.to(ring, { x: mouseX, y: mouseY, duration: 0.35, ease: 'power2.out' });
    };

    // Hover effects on interactive elements
    const onEnterLink = () => {
      gsap.to(ring, { scale: 2.2, backgroundColor: 'rgba(232,52,26,0.12)', borderColor: '#E8341A', duration: 0.3 });
      gsap.to(dot, { scale: 0.4, backgroundColor: '#E8341A', duration: 0.3 });
    };
    const onLeaveLink = () => {
      gsap.to(ring, { scale: 1, backgroundColor: 'transparent', borderColor: 'rgba(232,52,26,0.6)', duration: 0.3 });
      gsap.to(dot, { scale: 1, backgroundColor: '#E8341A', duration: 0.3 });
    };
    const onEnterBtn = () => {
      gsap.to(ring, { scale: 3, borderColor: '#E8341A', backgroundColor: 'rgba(232,52,26,0.08)', duration: 0.3 });
    };

    window.addEventListener('mousemove', onMove);

    const links = document.querySelectorAll('a, button');
    links.forEach(el => {
      el.addEventListener('mouseenter', el.tagName === 'BUTTON' ? onEnterBtn : onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    // Observer to handle dynamic elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button').forEach(el => {
        el.removeEventListener('mouseenter', onEnterLink);
        el.removeEventListener('mouseleave', onLeaveLink);
        el.addEventListener('mouseenter', el.tagName === 'BUTTON' ? onEnterBtn : onEnterLink);
        el.addEventListener('mouseleave', onLeaveLink);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      {/* Small dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-[#E8341A] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ mixBlendMode: 'normal' }}
      />
      {/* Larger ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 border-2 border-[#E8341A]/60"
        style={{ mixBlendMode: 'normal' }}
      />
    </>
  );
}
