import React, { useRef } from 'react';
import { ArrowDownRight, Compass } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import heroShoe from '../assets/hero_shoe.png';

const HeroSection = ({ onShopNowClick }) => {
  const containerRef = useRef(null);
  const imageWrapperRef = useRef(null);
  const shoeRef = useRef(null);
  const bgTextRef = useRef(null);
  const headlineRef = useRef(null);

  useGSAP(() => {
    // Reveal text elements on load
    const tl = gsap.timeline({ delay: 0.3 });

    tl.fromTo('.hero-reveal', 
      { y: 70, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power4.out' }
    )
    .fromTo(shoeRef.current, {
      scale: 0.7,
      rotation: -15,
      y: 100,
      opacity: 0
    }, {
      scale: 1,
      rotation: -5,
      y: 0,
      opacity: 1,
      duration: 1.8,
      ease: 'elastic.out(1, 0.75)'
    }, '-=0.8')
    .fromTo('.hero-spec-item', {
      opacity: 0,
      x: -20
    }, {
      opacity: 0.7,
      x: 0,
      duration: 0.8,
      stagger: 0.1
    }, '-=1');

    // 3D Parallax effect based on Mouse Move
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const mouseX = e.clientX - rect.left - rect.width / 2;
      const mouseY = e.clientY - rect.top - rect.height / 2;

      // Move shoe image in 3D space
      gsap.to(shoeRef.current, {
        x: mouseX * 0.04,
        y: mouseY * 0.04,
        rotationY: mouseX * 0.08,
        rotationX: -mouseY * 0.08,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Move background giant text slightly in opposite direction
      gsap.to(bgTextRef.current, {
        x: -mouseX * 0.015,
        y: -mouseY * 0.015,
        duration: 0.8,
        ease: 'power2.out'
      });

      // Move floating badge
      gsap.to('.hero-badge', {
        x: mouseX * 0.06,
        y: mouseY * 0.06,
        duration: 0.9,
        ease: 'power2.out'
      });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove);

    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
    };
  }, { scope: containerRef });

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 bg-brand-offwhite overflow-hidden select-none"
    >
      {/* Background Grid Pattern (Luxury Accent) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-brand-camel)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-brand-camel)_1px,transparent_1px)] bg-size-[10vw_10vw] opacity-15 pointer-events-none" />

      {/* Behind-shoe Giant Brand Typography */}
      <div
        ref={bgTextRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[28vw] md:text-[22vw] leading-none font-bold text-[#EFEAE2] select-none pointer-events-none z-0 tracking-tighter"
      >
        ELEGANCE
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto z-10 relative">
        
        {/* Left Side Column: Slogan, Headline & CTA */}
        <div ref={headlineRef} className="lg:col-span-5 flex flex-col justify-center items-start text-left gap-4 md:gap-6">
          <div className="overflow-hidden">
            <span className="hero-reveal inline-block text-xs md:text-sm tracking-[0.3em] text-brand-camel uppercase font-bold">
              HANDCRAFTED COLLECTION 2026
            </span>
          </div>

          <div className="overflow-hidden">
            <h1 className="hero-reveal font-serif text-5xl md:text-7xl xl:text-8xl font-light text-brand-brown-dark leading-[0.95]">
              Redefining <br />
              <span className="italic text-brand-camel">The Walk.</span>
            </h1>
          </div>

          <div className="overflow-hidden max-w-md">
            <p className="hero-reveal text-brand-brown-light text-sm md:text-base leading-relaxed opacity-80 mt-2">
              Every detail is refined to achieve modern sophistication. Experience premium Italian leather crafted for absolute stride perfection.
            </p>
          </div>

          <div className="hero-reveal flex items-center gap-4 mt-4 overflow-hidden">
            <button
              onClick={onShopNowClick}
              className="px-6 py-4 bg-brand-brown-dark text-brand-offwhite font-semibold text-xs tracking-widest uppercase hover:bg-brand-camel hover:text-brand-brown-dark transition-all duration-300 flex items-center gap-3 group border border-transparent hover:border-brand-brown-dark"
              data-cursor-text="SHOP"
            >
              Shop Collection 
              <ArrowDownRight size={16} className="group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
            </button>
            
            <a
              href="#philosophy"
              className="px-6 py-4 bg-transparent border border-brand-brown-dark/10 hover:border-brand-brown-dark text-brand-brown-dark font-semibold text-xs tracking-widest uppercase transition-all duration-300 flex items-center gap-2"
            >
              <Compass size={14} /> Our Story
            </a>
          </div>
        </div>

        {/* Center/Right: Absolute Parallax Floating Shoe Image Container */}
        <div className="lg:col-span-7 relative h-[40vh] md:h-[55vh] lg:h-[65vh] w-full flex items-center justify-center">
          
          {/* Inner frame containing shadow */}
          <div ref={imageWrapperRef} className="relative w-[90%] max-w-[550px] aspect-4/3 flex items-center justify-center">
            {/* Soft Shadow behind shoe */}
            <div className="absolute w-[80%] h-[15%] bottom-5 left-1/2 -translate-x-1/2 bg-black/10 blur-2xl rounded-full scale-y-50 z-0 pointer-events-none" />

            {/* The Shoe Image */}
            <img
              ref={shoeRef}
              src={heroShoe}
              alt="Premium Soleil Sneaker"
              className="w-full h-auto object-contain z-10 drop-shadow-[0_20px_50px_rgba(35,18,11,0.15)] origin-center relative select-none pointer-events-none transition-transform duration-300"
            />
          </div>

          {/* Floating interactive badge */}
          <div className="hero-badge absolute top-10 right-4 lg:-right-4 bg-white/40 glass-panel border border-brand-camel/30 rounded-full w-24 h-24 flex items-center justify-center select-none shadow-lg z-20 pointer-events-none">
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Rotating circular text */}
              <svg className="rotating-badge absolute inset-0 w-full h-full p-2" viewBox="0 0 100 100">
                <defs>
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text fill="#23120B" className="text-[7.5px] uppercase font-bold tracking-[0.15em] font-sans">
                  <textPath xlinkHref="#circlePath">
                    SOLEIL ARTISANAL • LUXURY LEATHER • 
                  </textPath>
                </text>
              </svg>
              {/* Inner core */}
              <div className="bg-brand-brown-dark rounded-full w-10 h-10 flex items-center justify-center shadow">
                <span className="text-brand-camel text-[10px] font-serif font-bold">100%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row: Quick Specifications */}
      <div className="border-t border-brand-brown-dark/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10 relative">
        <div className="flex gap-8 md:gap-12 flex-wrap">
          <div className="hero-spec-item">
            <span className="block text-[10px] tracking-widest text-brand-camel font-bold uppercase mb-1">SOLE MATERIAL</span>
            <span className="text-xs text-brand-brown-dark font-semibold font-serif">Ergonomic Rubber Grip</span>
          </div>
          <div className="hero-spec-item">
            <span className="block text-[10px] tracking-widest text-brand-camel font-bold uppercase mb-1">UPPER TEXTURE</span>
            <span className="text-xs text-brand-brown-dark font-semibold font-serif">Calfskin Nappa Leather</span>
          </div>
          <div className="hero-spec-item">
            <span className="block text-[10px] tracking-widest text-brand-camel font-bold uppercase mb-1">ORIGIN</span>
            <span className="text-xs text-brand-brown-dark font-semibold font-serif">Florence, Italy</span>
          </div>
        </div>

        <a 
          href="#philosophy" 
          className="text-xs tracking-widest text-brand-brown-dark hover:text-brand-camel font-bold uppercase flex items-center gap-2 group transition-colors"
        >
          SCROLL TO EXPLORE
          <span className="w-6 h-px bg-brand-brown-dark group-hover:bg-brand-camel transition-colors" />
        </a>
      </div>
    </section>
  );
};

export default HeroSection;
