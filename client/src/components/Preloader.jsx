import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Preloader = ({ onComplete }) => {
  const [count, setCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Disable scrolling during load
    document.body.style.overflow = 'hidden';

    // Simulate count up animation
    let startTimestamp = null;
    const duration = 2200; // 2.2 seconds

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      
      // Easing function: power3.out equivalent
      const easeOutCubic = (t) => (--t) * t * t + 1;
      const currentCount = Math.floor(easeOutCubic(progress) * 100);
      
      setCount(currentCount);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        // Complete count
        setTimeout(() => setIsLoaded(true), 100); // Small delay before animating out
      }
    };

    window.requestAnimationFrame(step);

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleExitComplete = () => {
    document.body.style.overflow = '';
    if (onComplete) {
      onComplete();
    }
  };

  const wordVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <AnimatePresence onExitComplete={handleExitComplete}>
      {!isLoaded && (
        <motion.div
          key="preloader"
          initial={{ y: "0%" }}
          exit={{ y: "-100%", transition: { duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.6 } }}
          className="fixed inset-0 bg-brand-brown-dark text-brand-offwhite z-99999 flex flex-col justify-between p-8 md:p-16 select-none"
        >
          {/* Top branding */}
          <div className="flex justify-between items-center w-full font-serif text-xl tracking-wider opacity-60">
            <span>SOLEIL</span>
            <span>COLLECTION ©2026</span>
          </div>

          {/* Center counter & text */}
          <div className="my-auto flex flex-col items-start gap-4">
            <motion.h1 
              initial="hidden"
              animate="visible"
              exit={{ y: -50, opacity: 0, transition: { duration: 0.5, ease: "easeIn" } }}
              className="font-serif text-5xl md:text-8xl lg:text-9xl font-light overflow-hidden leading-none flex flex-wrap gap-x-6"
            >
              <motion.span variants={wordVariants} className="inline-block">CRAFTING</motion.span>
              <motion.span variants={wordVariants} transition={{ delay: 0.1 }} className="inline-block italic text-brand-camel">MOTION</motion.span>
            </motion.h1>
            
            <motion.div 
              exit={{ scaleX: 0, transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 } }}
              className="h-px w-full max-w-xl bg-brand-camel/30 relative mt-4 origin-left scale-x-100"
            >
              <div 
                className="absolute top-0 left-0 h-full bg-brand-camel transition-all duration-75"
                style={{ width: `${count}%` }}
              />
            </motion.div>
            
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
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
