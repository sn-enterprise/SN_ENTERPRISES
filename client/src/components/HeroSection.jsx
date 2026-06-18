import React, { useRef } from 'react';
import { ArrowDownRight, Compass } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import heroShoe from '../assets/hero_shoe.png';

const HeroSection = ({ onShopNowClick }) => {
  const containerRef = useRef(null);

  // Parallax motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for parallax
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transforms for Shoe
  const shoeX = useTransform(smoothX, [-500, 500], [-20, 20]);
  const shoeY = useTransform(smoothY, [-500, 500], [-20, 20]);
  const shoeRotateY = useTransform(smoothX, [-500, 500], [-40, 40]);
  const shoeRotateX = useTransform(smoothY, [-500, 500], [40, -40]);

  // Transforms for Background Text
  const bgTextX = useTransform(smoothX, [-500, 500], [7.5, -7.5]);
  const bgTextY = useTransform(smoothY, [-500, 500], [7.5, -7.5]);

  // Transforms for Badge
  const badgeX = useTransform(smoothX, [-500, 500], [-30, 30]);
  const badgeY = useTransform(smoothY, [-500, 500], [-30, 30]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  };

  // Variants for staggering text reveal
  const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const revealVariant = {
    hidden: { y: 70, opacity: 0 },
    show: { 
      y: 0, 
      opacity: 1, 
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  // Spec items stagger
  const specContainer = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 1.2
      }
    }
  };

  const specVariant = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 0.7, x: 0, transition: { duration: 0.8 } }
  };

  return (
    <section
      id="home"
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen w-full flex flex-col justify-between pt-28 pb-12 px-6 md:px-12 bg-brand-offwhite overflow-hidden select-none"
    >
      {/* Background Grid Pattern (Luxury Accent) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-brand-camel)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-brand-camel)_1px,transparent_1px)] bg-size-[10vw_10vw] opacity-15 pointer-events-none" />

      {/* Behind-shoe Giant Brand Typography */}
      <motion.div
        style={{ x: bgTextX, y: bgTextY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-serif text-[28vw] md:text-[22vw] leading-none font-bold text-[#EFEAE2] select-none pointer-events-none z-0 tracking-tighter"
      >
        ELEGANCE
      </motion.div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center my-auto z-10 relative">
        
        {/* Left Side Column: Slogan, Headline & CTA */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="lg:col-span-5 flex flex-col justify-center items-start text-left gap-4 md:gap-6"
        >
          <div className="overflow-hidden">
            <motion.span variants={revealVariant} className="inline-block text-xs md:text-sm tracking-[0.3em] text-brand-camel uppercase font-bold">
              HANDCRAFTED COLLECTION 2026
            </motion.span>
          </div>

          <div className="overflow-hidden">
            <motion.h1 variants={revealVariant} className="font-serif text-5xl md:text-7xl xl:text-8xl font-light text-brand-brown-dark leading-[0.95]">
              Redefining <br />
              <span className="italic text-brand-camel">The Walk.</span>
            </motion.h1>
          </div>

          <div className="overflow-hidden max-w-md">
            <motion.p variants={revealVariant} className="text-brand-brown-light text-sm md:text-base leading-relaxed opacity-80 mt-2">
              Every detail is refined to achieve modern sophistication. Experience premium Italian leather crafted for absolute stride perfection.
            </motion.p>
          </div>

          <motion.div variants={revealVariant} className="flex items-center gap-4 mt-4 overflow-hidden">
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
          </motion.div>
        </motion.div>

        {/* Center/Right: Absolute Parallax Floating Shoe Image Container */}
        <div className="lg:col-span-7 relative h-[40vh] md:h-[55vh] lg:h-[65vh] w-full flex items-center justify-center perspective-[1000px]">
          
          {/* Inner frame containing shadow */}
          <div className="relative w-[90%] max-w-[550px] aspect-4/3 flex items-center justify-center transform-style-3d">
            {/* Soft Shadow behind shoe */}
            <div className="absolute w-[80%] h-[15%] bottom-5 left-1/2 -translate-x-1/2 bg-black/10 blur-2xl rounded-full scale-y-50 z-0 pointer-events-none" />

            {/* The Shoe Image */}
            <motion.img
              src={heroShoe}
              alt="Premium SN Enterprises Sneaker"
              initial={{ scale: 0.7, rotate: -15, y: 100, opacity: 0 }}
              animate={{ scale: 1, rotate: -5, y: 0, opacity: 1 }}
              transition={{ duration: 1.8, delay: 0.5, type: 'spring', bounce: 0.4 }}
              style={{ x: shoeX, y: shoeY, rotateY: shoeRotateY, rotateX: shoeRotateX, transformPerspective: 1000 }}
              className="w-full h-auto object-contain z-10 drop-shadow-[0_20px_50px_rgba(35,18,11,0.15)] origin-center relative select-none pointer-events-none"
            />
          </div>

          {/* Floating interactive badge */}
          <motion.div 
            style={{ x: badgeX, y: badgeY }}
            className="absolute top-10 right-4 lg:-right-4 bg-white/40 glass-panel border border-brand-camel/30 rounded-full w-24 h-24 flex items-center justify-center select-none shadow-lg z-20 pointer-events-none"
          >
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Rotating circular text */}
              <svg className="rotating-badge absolute inset-0 w-full h-full p-2" viewBox="0 0 100 100">
                <defs>
                  <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                </defs>
                <text fill="#23120B" className="text-[7.5px] uppercase font-bold tracking-[0.15em] font-sans">
                  <textPath xlinkHref="#circlePath">
                    SN ENTERPRISES ARTISANAL • LUXURY LEATHER • 
                  </textPath>
                </text>
              </svg>
              {/* Inner core */}
              <div className="bg-brand-brown-dark rounded-full w-10 h-10 flex items-center justify-center shadow">
                <span className="text-brand-camel text-[10px] font-serif font-bold">100%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Row: Quick Specifications */}
      <div className="border-t border-brand-brown-dark/10 pt-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 z-10 relative">
        <motion.div 
          variants={specContainer}
          initial="hidden"
          animate="show"
          className="flex gap-8 md:gap-12 flex-wrap"
        >
          <motion.div variants={specVariant} className="hero-spec-item">
            <span className="block text-[10px] tracking-widest text-brand-camel font-bold uppercase mb-1">SOLE MATERIAL</span>
            <span className="text-xs text-brand-brown-dark font-semibold font-serif">Ergonomic Rubber Grip</span>
          </motion.div>
          <motion.div variants={specVariant} className="hero-spec-item">
            <span className="block text-[10px] tracking-widest text-brand-camel font-bold uppercase mb-1">UPPER TEXTURE</span>
            <span className="text-xs text-brand-brown-dark font-semibold font-serif">Calfskin Nappa Leather</span>
          </motion.div>
          <motion.div variants={specVariant} className="hero-spec-item">
            <span className="block text-[10px] tracking-widest text-brand-camel font-bold uppercase mb-1">ORIGIN</span>
            <span className="text-xs text-brand-brown-dark font-semibold font-serif">Florence, Italy</span>
          </motion.div>
        </motion.div>

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
