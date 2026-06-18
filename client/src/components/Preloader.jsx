import React, { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const barRef = useRef(null);

  useGSAP(() => {
    // Disable scrolling during load
    document.body.style.overflow = 'hidden';

    // Count up animation
    const counter = { value: 0 };
    gsap.to(counter, {
      value: 100,
      duration: 2.2,
      ease: 'power3.out',
      onUpdate: () => {
        setCount(Math.floor(counter.value));
      },
      onComplete: () => {
        // Slide up loader overlay
        const tl = gsap.timeline({
          onComplete: () => {
            document.body.style.overflow = '';
            if (onComplete) onComplete();
          }
        });

        tl.to(textRef.current, {
          y: -50,
          opacity: 0,
          duration: 0.5,
          ease: 'power3.in'
        })
        .to(barRef.current, {
          scaleX: 0,
          duration: 0.5,
          ease: 'power3.inOut'
        }, '-=0.3')
        .to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: 'power4.inOut'
        });
      }
    });

    // Animate words sliding in
    gsap.fromTo('.preloader-word', 
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out', delay: 0.2 }
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, { scope: containerRef, dependencies: [onComplete] });

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 bg-brand-brown-dark text-brand-offwhite z-99999 flex flex-col justify-between p-8 md:p-16 select-none"
    >
      {/* Top branding */}
      <div className="flex justify-between items-center w-full font-serif text-xl tracking-wider opacity-60">
        <span>SOLEIL</span>
        <span>COLLECTION ©2026</span>
      </div>

      {/* Center counter & text */}
      <div className="my-auto flex flex-col items-start gap-4">
        <h1 ref={textRef} className="font-serif text-5xl md:text-8xl lg:text-9xl font-light overflow-hidden leading-none flex flex-wrap gap-x-6">
          <span className="preloader-word inline-block">CRAFTING</span>
          <span className="preloader-word inline-block italic text-brand-camel">MOTION</span>
        </h1>
        <div ref={barRef} className="h-px w-full max-w-xl bg-brand-camel/30 relative mt-4 origin-left scale-x-100">
          <div 
            className="absolute top-0 left-0 h-full bg-brand-camel transition-all duration-75"
            style={{ width: `${count}%` }}
          />
        </div>
        <p className="font-sans text-sm tracking-widest text-brand-beige opacity-80 uppercase mt-2">
          Assembling your custom luxury experience...
        </p>
      </div>

      {/* Bottom Counter */}
      <div className="flex justify-between items-end w-full">
        <div className="text-left max-w-xs text-xs tracking-widest text-brand-beige opacity-50 uppercase leading-relaxed">
          Stitched with precision.<br />
          Built for the modern traveler.
        </div>
        <div className="font-serif text-[12vw] md:text-[8vw] leading-none font-bold text-brand-camel opacity-90 select-none">
          {count.toString().padStart(3, '0')}%
        </div>
      </div>
    </div>
  );
};

export default Preloader;
