import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import newarrival4 from '../assets/newarrival_4.png';
import newarrival5 from '../assets/newarrival_5.png';
import newarrival6 from '../assets/newarrival_6.png';

const ProductCarousel = ({ onSelectProduct }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // 3 panels total, so we need to translate by -200vw
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-200vw']);

  const slides = [
    {
      id: 'arr-1',
      title: 'SN Enterprises Oxford Linen',
      subtitle: 'New Edition',
      image: newarrival4,
      number: '01',
      desc: 'Handcrafted Oxford dress shoe featuring a premium blended linen upper, full-grain Italian calfskin heel panel, and double-stitched leather outsole.',
      price: '₹120',
      numericPrice: 120,
      category: 'SS / 26 Collection',
      color: 'Sand Beige',
      sizes: [40, 41, 42, 43, 44, 45],
      details: {
        specs: 'Handcrafted Oxford dress shoe featuring a premium blended linen upper, full-grain Italian calfskin heel panel, and double-stitched leather outsole.',
        sizing: 'Fits true to size. If you are between sizes, we recommend selecting the smaller size.',
        care: 'Spot clean linen with a damp cloth. Use premium leather conditioner on calfskin elements.'
      }
    },
    {
      id: 'arr-2',
      title: 'SN Enterprises Desert Boot',
      subtitle: 'Artisanal',
      image: newarrival5,
      number: '02',
      desc: 'High-profile luxury desert boot in premium split-suede leather. Features flexible Norwegian storm welt stitching and lightweight shock-absorbing crepe sole.',
      price: '₹300',
      numericPrice: 300,
      category: 'SS / 26 Collection',
      color: 'Camel Brown',
      sizes: [41, 42, 43, 44, 45],
      details: {
        specs: 'High-profile luxury desert boot in premium split-suede leather. Features flexible Norwegian storm welt stitching and lightweight shock-absorbing crepe sole.',
        sizing: 'Runs slightly large. We recommend ordering a half size down from your standard sneaker size.',
        care: 'Treat with water-repellent suede spray before first wear. Clean with a brass suede brush.'
      }
    },
    {
      id: 'arr-3',
      title: 'SN Enterprises Monolith Sneaker',
      subtitle: 'Limited Release',
      image: newarrival6,
      number: '03',
      desc: 'Minimalist statement sneaker. Sculpted with a micro-perforated upper, natural cork insoles, and robust vulcanized organic rubber outsole.',
      price: '₹150',
      numericPrice: 150,
      category: 'SS / 26 Collection',
      color: 'Off-White Cream',
      sizes: [39, 40, 41, 42, 43, 44, 45],
      details: {
        specs: 'Minimalist statement sneaker. Sculpted with a micro-perforated upper, natural cork insoles, and robust vulcanized organic rubber outsole.',
        sizing: 'Fits exactly true to size. Select your standard athletic shoe size.',
        care: 'Wipe down with a clean, soft cloth. Protect from excessive exposure to rain and mud.'
      }
    },
  ];

  return (
    <div ref={containerRef} id="lookbook" className="relative bg-brand-brown-dark w-full h-[300vh]">
      {/* Sticky container that stays in view while we scroll down 300vh */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex items-center">
        
        {/* Horizontal Scroll Wrapper */}
        <motion.div style={{ x }} className="flex w-[300vw] h-screen relative">
          
          {slides.map((slide, index) => {
            // Parallax image movement calculated based on index and scroll
            const imgX = useTransform(scrollYProgress, [index / 3, (index + 1) / 3], ['-10%', '10%']);

            return (
              <section
                key={slide.id}
                className="w-screen h-screen flex items-center justify-center relative p-6 md:p-12 shrink-0"
              >
                {/* Visual background divider */}
                <div className="absolute right-0 top-0 bottom-0 w-px bg-brand-offwhite/10 z-10" />

                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full">
                  
                  {/* Product Info Block */}
                  <div className="lg:col-span-5 text-brand-offwhite flex flex-col items-start gap-4 md:gap-6 z-10 order-2 lg:order-1">
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-brand-camel text-3xl font-light">{slide.number}</span>
                      <div className="h-px w-8 bg-brand-camel" />
                      <span className="text-[10px] tracking-[0.3em] text-brand-camel uppercase font-bold">
                        NEW ARRIVAL / {slide.subtitle}
                      </span>
                    </div>
                    <h2 className="font-serif text-4xl md:text-6xl font-light leading-tight">
                      {slide.title}
                    </h2>
                    <p className="text-brand-beige text-sm md:text-base leading-relaxed opacity-80 max-w-sm">
                      {slide.desc}
                    </p>
                    <div className="flex items-center gap-6 mt-4">
                      <span className="font-serif text-2xl text-brand-camel font-light">{slide.price}</span>
                      <button
                        onClick={() => onSelectProduct(slide)}
                        className="px-6 py-3 bg-brand-camel text-brand-brown-dark font-semibold text-xs tracking-widest uppercase hover:bg-brand-offwhite hover:text-brand-brown-dark transition-colors"
                        data-cursor-text="VIEW"
                      >
                        View Product
                      </button>
                    </div>
                  </div>

                  {/* Large Image Frame with Inner Parallax */}
                  <div className="lg:col-span-7 h-[45vh] lg:h-[70vh] w-full flex items-center justify-center order-1 lg:order-2 overflow-hidden relative group">
                    {/* Asymmetric layout container */}
                    <div className="w-full h-full max-w-[600px] aspect-4/5 overflow-hidden relative border border-brand-camel/10 bg-brand-beige-light">
                      {/* Floating geometric overlay */}
                      <div className="absolute top-6 left-6 text-xs text-brand-brown-dark/40 font-mono tracking-widest uppercase z-20">
                        SN ENTERPRISES MAISON D'ART / NEW ARRIVAL
                      </div>

                      <motion.img
                        src={slide.image}
                        alt={slide.title}
                        className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                      />
                      
                      {/* Inner overlay gradient */}
                      <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent z-10" />
                    </div>
                  </div>

                </div>
              </section>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default ProductCarousel;
