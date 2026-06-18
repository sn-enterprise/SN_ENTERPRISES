import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { Eye, ShieldCheck, Heart, ChevronLeft, ChevronRight } from 'lucide-react';

import carousal1 from '../assets/carousal_1.png';
import carousal2 from '../assets/carousal_2.png';
import carousal3 from '../assets/carousal_3.png';

const Philosophy = () => {
  const containerRef = useRef(null);
  const carouselRef = useRef(null);
  const [carouselWidth, setCarouselWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setCarouselWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
  }, []);

  // Parallax on decorative boxes
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const box1Y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const box2Y = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);

  const rawText = "We believe in the luxury of patience. Every pair of SN Enterprises footwear is built using generational techniques by artisans in Kolkata, West Bengal. We select only the highest grade full-grain leathers, naturally tanned over months. By merging anatomical comfort with avant-garde editorial design, we create a silhouette that stands independent of fleeting trends. It is not just footwear; it is a permanent piece of wearable architecture.";
  const wordsArray = rawText.split(' ');

  // Word reveal animation variants
  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
      }
    }
  };

  const wordVariants = {
    hidden: { opacity: 0.1, y: 5 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const cardContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      }
    }
  };

  const cardVariants = {
    hidden: { y: 60, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  const lookbookImages = [carousal1, carousal2, carousal3];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % lookbookImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + lookbookImages.length) % lookbookImages.length);
  };

  return (
    <section
      id="philosophy"
      ref={containerRef}
      className="relative w-full py-24 md:py-32 bg-brand-beige-light overflow-hidden select-none border-t border-brand-camel/20"
    >
      {/* Decorative Parallax geometric outline box */}
      <motion.div style={{ y: box1Y }} className="absolute right-10 top-1/4 w-[30vw] h-[30vw] border border-brand-camel/15 pointer-events-none rounded-full" />
      <motion.div style={{ y: box2Y }} className="absolute left-20 bottom-10 w-[20vw] h-[20vw] bg-[#EFEAE2]/40 pointer-events-none rounded-2xl rotate-45" />

      {/* Main Philosophy Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 relative z-10">
        
        {/* Left column: Sticky label */}
        <div className="lg:col-span-4 flex flex-col justify-start items-start gap-4 sticky top-24 self-start">
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
          <motion.p
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.4 }}
            className="font-serif text-2xl md:text-3.5xl lg:text-4xl text-brand-brown-dark font-light leading-relaxed tracking-wide flex flex-wrap gap-x-2.5 gap-y-1.5"
          >
            {wordsArray.map((word, idx) => (
              <motion.span
                key={idx}
                variants={wordVariants}
                className="inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>
        </div>
      </div>

      {/* Philosophy Cards Showcase */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 mt-24 md:mt-32 relative z-10">
        <motion.div 
          variants={cardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          
          {/* Card 1 */}
          <motion.div variants={cardVariants} className="bg-brand-offwhite border border-brand-camel/10 p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-camel transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div className="bg-brand-offwhite border border-brand-camel/20 rounded-full w-12 h-12 flex items-center justify-center text-brand-camel group-hover:bg-brand-camel group-hover:text-brand-offwhite transition-colors">
              <Eye size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-brand-brown-dark">Aesthetic Vision</h3>
            <p className="text-xs text-brand-brown-light leading-relaxed opacity-85">
              We design with minimalist silhouettes, blending structural geometries with natural curves. A statement piece that pairs effortlessly with modern tailoring.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={cardVariants} className="bg-brand-offwhite border border-brand-camel/10 p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-camel transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div className="bg-brand-offwhite border border-brand-camel/20 rounded-full w-12 h-12 flex items-center justify-center text-brand-camel group-hover:bg-brand-camel group-hover:text-brand-offwhite transition-colors">
              <ShieldCheck size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-brand-brown-dark">Generational Leather</h3>
            <p className="text-xs text-brand-brown-light leading-relaxed opacity-85">
              Hand-picked from certified Italian tanneries. Treated only with organic plant extract materials for a rich patina that grows more unique as it ages.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={cardVariants} className="bg-brand-offwhite border border-brand-camel/10 p-8 flex flex-col gap-6 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="absolute top-0 left-0 w-full h-[3px] bg-brand-camel transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
            <div className="bg-brand-offwhite border border-brand-camel/20 rounded-full w-12 h-12 flex items-center justify-center text-brand-camel group-hover:bg-brand-camel group-hover:text-brand-offwhite transition-colors">
              <Heart size={20} />
            </div>
            <h3 className="font-serif text-xl font-semibold text-brand-brown-dark">Orthotic Ergonomics</h3>
            <p className="text-xs text-brand-brown-light leading-relaxed opacity-85">
              Anatomically sculpted footbeds that adapt to your unique stride. Providing all-day cushioning, so luxury never compromises your physical well-being.
            </p>
          </motion.div>

        </motion.div>
      </div>

      {/* Signature Lookbook Carousel - Pedestal Layout */}
      <div className="mt-32 max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col items-center">
        {/* Header */}
        <h3 className="font-serif text-3xl md:text-5xl font-light text-brand-brown-dark text-center uppercase tracking-wide mb-12 md:mb-20">
          Signature Comfort<br />Collection
        </h3>

        {/* The Pedestal Stage */}
        <div className="w-full relative bg-[#d6d6d6] border border-brand-camel/10 shadow-inner min-h-[50vh] md:min-h-[60vh] overflow-hidden">
          
          {/* subtle noise/texture overlay for the concrete look */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

          {/* Shoes Container */}
          <div className="absolute inset-0 w-full h-full z-0">
            <motion.div 
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="w-full h-full relative group cursor-pointer"
              onClick={nextImage}
            >
              <img 
                src={lookbookImages[currentImageIndex]} 
                alt={`Signature Collection ${currentImageIndex + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </motion.div>
          </div>



          {/* Sparkle Icon */}
          <div className="absolute bottom-6 right-6 md:bottom-10 md:right-10 text-brand-offwhite opacity-80 z-20 pointer-events-none">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C12 6.627 17.373 12 24 12C17.373 12 12 17.373 6.627 12 0 12C6.627 12 12 6.627 12 0Z" />
            </svg>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="mt-8 flex flex-col items-center justify-center gap-4 text-brand-brown-dark/40">
          <div className="text-xs font-mono tracking-widest text-brand-brown-dark">
            0{currentImageIndex + 1} / 0{lookbookImages.length}
          </div>
          <div className="flex items-center gap-6">
            <button onClick={prevImage} className="hover:text-brand-brown-dark transition-colors">
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-3">
              {lookbookImages.map((_, idx) => (
                <span 
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx === currentImageIndex ? 'w-8 bg-brand-brown-dark' : 'w-2 bg-brand-brown-dark/20 cursor-pointer hover:bg-brand-brown-dark/40'
                  }`}
                  onClick={() => setCurrentImageIndex(idx)}
                />
              ))}
            </div>

            <button onClick={nextImage} className="hover:text-brand-brown-dark transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
      
    </section>
  );
};

export default Philosophy;
