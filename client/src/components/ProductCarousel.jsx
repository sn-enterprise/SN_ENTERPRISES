import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { X, Heart, Shield, RotateCcw, Truck } from 'lucide-react';
import newarrival4 from '../assets/newarrival_4.png';
import newarrival5 from '../assets/newarrival_5.png';
import newarrival6 from '../assets/newarrival_6.png';

const ProductCarousel = ({ onAddToBag }) => {
  const containerRef = useRef(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('specs');
  const [wishlisted, setWishlisted] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
  });

  // 3 panels total, so we need to translate by -200vw
  const x = useTransform(scrollYProgress, [0, 1], ['0vw', '-200vw']);

  const slides = [
    {
      id: 'arr-1',
      title: 'SN Enterprises Oxford Linen',
      name: 'SN Enterprises Oxford Linen',
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
      name: 'SN Enterprises Desert Boot',
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
      name: 'SN Enterprises Monolith Sneaker',
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

  const openModal = (slide) => {
    setSelectedProduct(slide);
    setActiveTab('specs');
    setWishlisted(false);
  };

  return (
    <>
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
                          onClick={() => openModal(slide)}
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
                          SN ENTERPRISES / NEW ARRIVAL
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

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-200 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-brand-brown-dark/80 backdrop-blur-md"
            onClick={() => setSelectedProduct(null)}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-brand-offwhite border border-brand-camel/20 max-w-4xl w-full max-h-[90vh] md:max-h-[80vh] overflow-y-auto grid grid-cols-1 md:grid-cols-2 relative z-10 shadow-2xl"
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-brand-brown-dark hover:text-brand-camel transition-colors z-20 bg-white/60 rounded-full"
            >
              <X size={18} />
            </button>

            {/* Left Column: Image */}
            <div className="bg-brand-beige-light flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-brand-camel/20 relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full max-w-[320px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
              />
              <span className="absolute bottom-4 left-4 text-[10px] font-mono text-brand-brown-dark/40 uppercase tracking-widest">
                SN ENTERPRISES / SS-26
              </span>
            </div>

            {/* Right Column: Details & Actions */}
            <div className="p-8 flex flex-col justify-between">
              <div className="flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[10px] tracking-widest text-brand-camel font-bold uppercase">
                      {selectedProduct.category}
                    </span>
                    <div className="h-px w-4 bg-brand-camel" />
                    <span className="text-[10px] tracking-widest text-brand-camel font-bold uppercase">
                      {selectedProduct.color}
                    </span>
                  </div>
                  <h3 className="font-serif text-3xl font-light text-brand-brown-dark leading-none mb-3">
                    {selectedProduct.title}
                  </h3>
                  <span className="font-serif text-2xl text-brand-camel font-light">
                    {selectedProduct.price}
                  </span>
                </div>

                {/* Tab selector */}
                <div className="flex border-b border-brand-brown-dark/10">
                  {['specs', 'sizing', 'care'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`pb-2 pr-6 text-xs uppercase tracking-wider font-semibold transition-all relative ${
                        activeTab === tab ? 'text-brand-brown-dark' : 'text-brand-brown-dark/40 hover:text-brand-brown-dark'
                      }`}
                    >
                      {tab}
                      {activeTab === tab && (
                        <span className="absolute bottom-0 left-0 w-[50%] h-[2px] bg-brand-camel" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Tab content */}
                <div className="min-h-[80px]">
                  <p className="text-xs text-brand-brown-light leading-relaxed opacity-90">
                    {selectedProduct.details[activeTab]}
                  </p>
                </div>

                {/* Size Selector */}
                <div>
                  <span className="block text-[10px] tracking-widest text-brand-camel font-bold uppercase mb-3">
                    SELECT SIZE (EU)
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {selectedProduct.sizes.map((size) => (
                      <button
                        key={size}
                        className="w-10 h-10 border border-brand-brown-dark/10 hover:border-brand-brown-dark text-xs font-semibold flex items-center justify-center transition-colors hover:bg-brand-brown-dark hover:text-brand-offwhite"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 mt-8">
                <button
                  onClick={() => {
                    onAddToBag && onAddToBag(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 py-4 bg-brand-brown-dark text-brand-offwhite font-semibold text-xs tracking-widest uppercase hover:bg-brand-camel hover:text-brand-brown-dark transition-colors text-center"
                >
                  ADD TO BAG
                </button>
                <button
                  onClick={() => setWishlisted(!wishlisted)}
                  className={`p-4 border border-brand-brown-dark/10 transition-colors rounded-none ${
                    wishlisted ? 'bg-red-50/50 text-red-500 border-red-200' : 'text-brand-brown-dark hover:border-brand-brown-dark'
                  }`}
                  aria-label="Add to Wishlist"
                >
                  <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Shipping info */}
              <div className="grid grid-cols-3 gap-2 border-t border-brand-brown-dark/10 pt-4 mt-6 text-center text-[9px] text-brand-brown-light/70 font-semibold tracking-wider uppercase">
                <div className="flex flex-col items-center gap-1">
                  <Truck size={14} className="text-brand-camel" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw size={14} className="text-brand-camel" />
                  <span>30-Day Returns</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <Shield size={14} className="text-brand-camel" />
                  <span>Secure Checkout</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default ProductCarousel;
