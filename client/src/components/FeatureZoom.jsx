import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import heroShoe from '../assets/hero_shoe.png';

const FeatureZoom = () => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const shoeScale = useTransform(scrollYProgress, [0, 1], [0.85, 1.05]);
  const shoeRotation = useTransform(scrollYProgress, [0, 1], [-3, 3]);

  const hotspots = [
    {
      id: 1,
      title: 'Waxed Cotton Lacing',
      desc: 'Double-waxed organic Egyptian cotton cords running through reinforced brass-finished eyelets.',
      top: '28%',
      left: '42%',
      tooltipPos: 'top-left'
    },
    {
      id: 2,
      title: 'Generational Stitching',
      desc: 'Norwegian Storm Welt stitch technique. Over 18 hours of single-needle hand stitching ensures watertight durability.',
      top: '52%',
      left: '32%',
      tooltipPos: 'bottom-left'
    },
    {
      id: 3,
      title: 'Natural Cork Midsole',
      desc: 'Anatomically sculpted cork and felt interior lining that molds to the unique profile of your footbed.',
      top: '68%',
      left: '60%',
      tooltipPos: 'bottom-right'
    },
    {
      id: 4,
      title: 'Nappa Calfskin Upper',
      desc: 'Ultra-soft full-grain nappa leather, hand-finished with natural oils in Florence, Italy.',
      top: '40%',
      left: '80%',
      tooltipPos: 'top-right'
    }
  ];

  const revealVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 1, ease: "easeOut" } 
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section
      id="craftsmanship"
      ref={containerRef}
      className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-brand-beige-light overflow-hidden select-none border-t border-brand-camel/20"
    >
      {/* Absolute Decorative Texts */}
      <div className="absolute top-10 left-10 text-[10vw] font-serif font-black text-[#EFEAE2]/30 select-none pointer-events-none uppercase">
        DETAIL
      </div>
      <div className="absolute bottom-10 right-10 text-[10vw] font-serif font-black text-[#EFEAE2]/30 select-none pointer-events-none uppercase">
        CRAFT
      </div>

      <div className="max-w-7xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          className="text-center max-w-2xl flex flex-col items-center gap-4 mb-20"
        >
          <motion.span variants={revealVariants} className="text-xs md:text-sm tracking-[0.3em] text-brand-camel uppercase font-bold">
            03 / DETAILED SPECIFICATION
          </motion.span>
          <motion.h2 variants={revealVariants} className="font-serif text-4xl md:text-5xl font-light text-brand-brown-dark">
            Anatomy of the Sole
          </motion.h2>
          <motion.div variants={revealVariants} className="h-px w-12 bg-brand-camel my-2" />
          <motion.p variants={revealVariants} className="text-sm text-brand-brown-light opacity-80 leading-relaxed">
            Click on the pulsing coordinates below to examine the bespoke tailoring and structural blueprints of our classic signature shoe.
          </motion.p>
        </motion.div>

        {/* Interactive Shoe Frame */}
        <div className="relative w-full max-w-[850px] aspect-16/10 flex items-center justify-center bg-brand-offwhite/50 border border-brand-camel/15 p-4 md:p-8 rounded shadow-sm">
          
          {/* Subtle Grid overlay inside frame */}
          <div className="absolute inset-0 bg-[radial-gradient(var(--color-brand-camel)_1px,transparent_1px)] bg-size-[20px_20px] opacity-10" />

          {/* Central Shoe Image */}
          <div className="relative w-[80%] max-w-[550px] aspect-4/3 flex items-center justify-center z-10 pointer-events-none">
            <motion.img
              src={heroShoe}
              alt="Soleil Shoe Dissection"
              style={{ scale: shoeScale, rotate: shoeRotation }}
              className="w-full h-auto object-contain drop-shadow-[0_30px_60px_rgba(35,18,11,0.12)]"
            />
          </div>

          {/* Hotspots Overlay */}
          {hotspots.map((spot) => {
            const isActive = activeHotspot === spot.id;
            return (
              <div
                key={spot.id}
                className="absolute z-20"
                style={{ top: spot.top, left: spot.left }}
              >
                {/* Glowing coordinate button */}
                <button
                  onClick={() => setActiveHotspot(isActive ? null : spot.id)}
                  className={`w-6 h-6 rounded-full flex items-center justify-center relative transition-all duration-300 ${
                    isActive 
                      ? 'bg-brand-brown-dark text-brand-offwhite scale-110 shadow-lg' 
                      : 'bg-brand-camel text-brand-brown-dark hover:bg-brand-brown-dark hover:text-brand-offwhite'
                  }`}
                  aria-label={`Inspect ${spot.title}`}
                >
                  {/* Outer pulse wave */}
                  <span className="absolute inset-0 rounded-full bg-current animate-ping opacity-35 pointer-events-none" />
                  
                  {/* Inner small point */}
                  <span className="w-2 h-2 rounded-full bg-current" />
                </button>

                {/* Floating Tooltip Card */}
                {isActive && (
                  <div
                    className={`absolute w-60 bg-brand-brown-dark text-brand-offwhite p-5 shadow-2xl border border-brand-camel/20 z-30 transition-all duration-300 ${
                      spot.tooltipPos === 'top-left' ? 'bottom-8 right-8' :
                      spot.tooltipPos === 'bottom-left' ? 'top-8 right-8' :
                      spot.tooltipPos === 'top-right' ? 'bottom-8 left-8' :
                      'top-8 left-8' // bottom-right
                    }`}
                  >
                    {/* Visual Connection Pin Indicator */}
                    <div className={`absolute w-3 h-3 bg-brand-brown-dark rotate-45 border-r border-b border-brand-camel/20 ${
                      spot.tooltipPos === 'top-left' ? '-bottom-1.5 -right-1.5' :
                      spot.tooltipPos === 'bottom-left' ? '-top-1.5 -right-1.5' :
                      spot.tooltipPos === 'top-right' ? '-bottom-1.5 -left-1.5' :
                      '-top-1.5 -left-1.5' // bottom-right
                    }`} />
                    
                    <h4 className="font-serif text-sm font-semibold text-brand-camel mb-2">
                      {spot.title}
                    </h4>
                    <p className="text-[10px] text-brand-beige leading-relaxed opacity-90">
                      {spot.desc}
                    </p>
                  </div>
                )}
              </div>
            );
          })}

        </div>

        {/* Quick interactive call to clear choices */}
        {activeHotspot && (
          <button
            onClick={() => setActiveHotspot(null)}
            className="mt-6 text-xs uppercase tracking-widest text-brand-brown-dark/40 hover:text-brand-brown-dark font-semibold border-b border-brand-brown-dark/10 hover:border-brand-brown-dark pb-1 transition-all"
          >
            Reset coordinate selections
          </button>
        )}

      </div>
    </section>
  );
};

export default FeatureZoom;
