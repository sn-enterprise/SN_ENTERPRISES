import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Eye, ShieldCheck, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Philosophy = () => {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const stickyRef = useRef(null);

  useGSAP(() => {
    // Scroll-triggered text opacity reveal (Apple style)
    const textElement = textRef.current;
    if (!textElement) return;

    const words = textElement.querySelectorAll('.philo-word');
    
    // Animation to light up words one-by-one as we scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: textElement,
        start: 'top 80%',
        end: 'bottom 40%',
        scrub: 0.8,
      }
    });

    tl.fromTo(words, 
      { opacity: 0.1, y: 5 },
      { opacity: 1, y: 0, stagger: 0.1, duration: 1.5, ease: 'power2.out' }
    );

    // Parallax on decorative boxes
    gsap.fromTo('.philo-bg-box',
      { yPercent: 20 },
      {
        yPercent: -20,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true
        }
      }
    );

    // Fade in spec cards
    gsap.fromTo('.philo-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.philo-cards-container',
          start: 'top 85%',
        }
      }
    );

  }, { scope: containerRef });

  const rawText = "We believe in the luxury of patience. Every pair of Soleil footwear is built using generational techniques by artisans in Naples, Italy. We select only the highest grade full-grain leathers, naturally tanned over months. By merging anatomical comfort with avant-garde editorial design, we create a silhouette that stands independent of fleeting trends. It is not just footwear; it is a permanent piece of wearable architecture.";

  // Split text into words to animate them individually
  const wordsArray = rawText.split(' ');

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-brand-beige-light overflow-hidden select-none border-t border-brand-camel/20"
    >
      {/* Decorative Parallax geometric outline box */}
      <div className="philo-bg-box absolute right-10 top-1/4 w-[30vw] h-[30vw] border border-brand-camel/15 pointer-events-none rounded-full" />
      <div className="philo-bg-box absolute left-20 bottom-10 w-[20vw] h-[20vw] bg-[#EFEAE2]/40 pointer-events-none rounded-2xl rotate-45" />

      {/* Main Philosophy Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        
        {/* Left column: Sticky label */}
        <div ref={stickyRef} className="lg:col-span-4 flex flex-col justify-start items-start gap-4">
          <span className="text-xs md:text-sm tracking-[0.3em] text-brand-camel uppercase font-bold">
            01 / BRAND ETHOS
          </span>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-brand-brown-dark leading-tight">
            Designed to endure.<br />
            Crafted to inspire.
          </h2>
          <div className="h-[2px] w-20 bg-brand-camel mt-4" />
        </div>

        {/* Right column: Large paragraph containing the scroll-reveal text */}
        <div className="lg:col-span-8 flex flex-col justify-center">
          <p
            ref={textRef}
            className="font-serif text-2xl md:text-3.5xl lg:text-4xl text-brand-brown-dark font-light leading-relaxed tracking-wide flex flex-wrap gap-x-2.5 gap-y-1.5"
          >
            {wordsArray.map((word, idx) => (
              <span
                key={idx}
                className="philo-word inline-block opacity-10"
              >
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Philosophy Cards Showcase */}
      <div className="max-w-7xl mx-auto mt-24 md:mt-32">
        <div className="philo-cards-container grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Card 1 */}
          <div className="philo-card bg-brand-offwhite border border-brand-camel/10 p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-camel transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div className="bg-brand-offwhite border border-brand-camel/20 rounded-full w-12 h-12 flex items-center justify-center text-brand-camel group-hover:bg-brand-camel group-hover:text-brand-offwhite transition-colors">
              <Eye size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-brand-brown-dark">Aesthetic Vision</h3>
            <p className="text-xs text-brand-brown-light leading-relaxed opacity-85">
              We design with minimalist silhouettes, blending structural geometries with natural curves. A statement piece that pairs effortlessly with modern tailoring.
            </p>
          </div>

          {/* Card 2 */}
          <div className="philo-card bg-brand-offwhite border border-brand-camel/10 p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-camel transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div className="bg-brand-offwhite border border-brand-camel/20 rounded-full w-12 h-12 flex items-center justify-center text-brand-camel group-hover:bg-brand-camel group-hover:text-brand-offwhite transition-colors">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-brand-brown-dark">Generational Leather</h3>
            <p className="text-xs text-brand-brown-light leading-relaxed opacity-85">
              Hand-picked from certified Italian tanneries. Treated only with organic plant extract materials for a rich patina that grows more unique as it ages.
            </p>
          </div>

          {/* Card 3 */}
          <div className="philo-card bg-brand-offwhite border border-brand-camel/10 p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-camel transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div className="bg-brand-offwhite border border-brand-camel/20 rounded-full w-12 h-12 flex items-center justify-center text-brand-camel group-hover:bg-brand-camel group-hover:text-brand-offwhite transition-colors">
              <Heart size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-brand-brown-dark">Orthotic Ergonomics</h3>
            <p className="text-xs text-brand-brown-light leading-relaxed opacity-85">
              Anatomically sculpted footbeds that adapt to your unique stride. Providing all-day cushioning, so luxury never compromises your physical well-being.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Philosophy;
