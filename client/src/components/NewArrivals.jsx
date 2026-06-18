import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Heart, Shield, RotateCcw, Truck } from 'lucide-react';
import newarrival1 from '../assets/newarrival_1.png';
import newarrival2 from '../assets/newarrival_2.png';
import newarrival3 from '../assets/newarrival_3.png';
import newarrival4 from '../assets/newarrival_4.png';
import newarrival5 from '../assets/newarrival_5.png';
import newarrival6 from '../assets/newarrival_6.png';

const ArrivalCard = ({ product, idx, onSelect, onAddToBag }) => {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: (idx % 3) * 0.2 }}
      className={`flex flex-col gap-6 group relative cursor-pointer ${
        idx % 3 === 1 ? 'md:translate-y-12' : '' // Asymmetric column offset for parallax feeling
      }`}
      onClick={() => onSelect(product)}
      data-cursor-text="VIEW"
    >
      {/* Image Outer Wrapper */}
      <div className="arrival-image-container w-full aspect-4/5 overflow-hidden bg-brand-beige-light border border-brand-camel/15 relative">
        
        {/* Product Badge */}
        <span className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-brand-brown-dark text-brand-offwhite text-[9px] font-bold tracking-widest uppercase">
          {product.tag}
        </span>

        {/* Shoe Image */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-105"
        />

        {/* Bottom Subtle Tint */}
        <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

        {/* Hover quick add overlay */}
        <div className="absolute bottom-6 left-6 right-6 z-20 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToBag(product);
            }}
            className="w-full py-3 bg-brand-offwhite hover:bg-brand-brown-dark text-brand-brown-dark hover:text-brand-offwhite font-semibold text-xs tracking-widest uppercase shadow transition-all duration-300"
          >
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Metadata */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items-center text-xs tracking-widest text-brand-camel uppercase font-bold">
          <span>{product.category}</span>
          <span>{product.color}</span>
        </div>
        <div className="flex justify-between items-end">
          <h3 className="font-serif text-xl md:text-2xl font-light text-brand-brown-dark group-hover:text-brand-camel transition-colors">
            {product.name}
          </h3>
          <span className="font-serif text-lg font-light text-brand-brown-dark">{product.price}</span>
        </div>
      </div>
    </motion.div>
  );
};

const NewArrivals = ({ onAddToBag }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeTab, setActiveTab] = useState('specs');
  const [wishlisted, setWishlisted] = useState(false);

  const products = [
    {
      id: 'arr-1',
      name: 'SN Enterprises Oxford Linen',
      category: 'SS / 26 Collection',
      price: '₹200',
      numericPrice: 200,
      image: newarrival1,
      tag: 'New Edition',
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
      name: 'SN Enterprises Desert Boot',
      category: 'SS / 26 Collection',
      price: '₹120',
      numericPrice: 120,
      image: newarrival2,
      tag: 'Artisanal',
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
      name: 'SN Enterprises Monolith Sneaker',
      category: 'SS / 26 Collection',
      price: '₹200',
      numericPrice: 200,
      image: newarrival3,
      tag: 'Limited Release',
      color: 'Off-White Cream',
      sizes: [39, 40, 41, 42, 43, 44, 45],
      details: {
        specs: 'Minimalist statement sneaker. Sculpted with a micro-perforated upper, natural cork insoles, and robust vulcanized organic rubber outsole.',
        sizing: 'Fits exactly true to size. Select your standard athletic shoe size.',
        care: 'Wipe down with a clean, soft cloth. Protect from excessive exposure to rain and mud.'
      }
    },
    {
      id: 'arr-4',
      name: 'SN Enterprises Aurora Loafer',
      category: 'SS / 26 Collection',
      price: '₹120',
      numericPrice: 120,
      image: newarrival4,
      tag: 'New Edition',
      color: 'Warm Beige',
      sizes: [40, 41, 42, 43, 44],
      details: {
        specs: 'Minimalist leather loafer handcrafted in Italy. Features a sleek design with premium stitching and a comfortable leather sole.',
        sizing: 'Fits true to size.',
        care: 'Use a soft brush and premium leather conditioner.'
      }
    },
    {
      id: 'arr-5',
      name: 'SN Enterprises Suede Chelsea',
      category: 'SS / 26 Collection',
      price: '₹300',
      numericPrice: 300,
      image: newarrival5,
      tag: 'Artisanal',
      color: 'Taupe',
      sizes: [41, 42, 43, 44, 45],
      details: {
        specs: 'High-end designer Chelsea boot in premium suede. Features elastic side panels and a durable stacked heel.',
        sizing: 'Runs slightly narrow. We recommend sizing up if you have wide feet.',
        care: 'Use a suede eraser and brush to remove dirt. Protect with suede spray.'
      }
    },
    {
      id: 'arr-6',
      name: 'SN Enterprises Chunky Sneaker',
      category: 'SS / 26 Collection',
      price: '₹150',
      numericPrice: 150,
      image: newarrival6,
      tag: 'Statement',
      color: 'Off-White',
      sizes: [39, 40, 41, 42, 43, 44],
      details: {
        specs: 'Modern luxury chunky sneaker made from premium materials. Off-white colorway with high fashion aesthetic and chunky outsole.',
        sizing: 'Fits exactly true to size.',
        care: 'Wipe down with a clean, damp cloth. Avoid harsh chemicals.'
      }
    },
  ];

  const headerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1, 
      y: 0, 
      transition: { duration: 1.2, ease: "easeOut", staggerChildren: 0.15 }
    }
  };

  return (
    <section
      id="collection"
      className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-brand-offwhite overflow-hidden select-none border-t border-brand-camel/20"
    >
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-brand-camel)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-brand-camel)_1px,transparent_1px)] bg-size-[15vw_15vw] opacity-10 pointer-events-none" />

      {/* Header */}
      <motion.div 
        variants={headerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.8 }}
        className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20 relative z-10"
      >
        <div className="flex flex-col gap-4">
          <motion.span variants={headerVariants} className="text-xs md:text-sm tracking-[0.3em] text-brand-camel uppercase font-bold">
            02 / THE ARCHIVE
          </motion.span>
          <motion.h2 variants={headerVariants} className="font-serif text-4xl md:text-6xl font-light text-brand-brown-dark">
            All Collections
          </motion.h2>
        </div>
        <motion.p variants={headerVariants} className="text-xs text-brand-brown-light font-semibold tracking-widest uppercase pb-2 border-b border-brand-brown-dark/10 max-w-xs leading-relaxed">
          The complete compendium of SN Enterprises craftsmanship.
        </motion.p>
      </motion.div>

      {/* Grid Container */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-y-16 md:gap-y-32 gap-x-10 relative z-10">
        {products.map((product, idx) => (
          <ArrivalCard 
            key={product.id} 
            product={product} 
            idx={idx} 
            onSelect={setSelectedProduct} 
            onAddToBag={onAddToBag} 
          />
        ))}
      </div>

      {/* Spacing correction below offset card */}
      <div className="h-16 md:h-24 pointer-events-none" />

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
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

            {/* Left Column: Image display */}
            <div className="bg-brand-beige-light flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-brand-camel/20 relative">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full max-w-[320px] h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.15)]"
              />
              <span className="absolute bottom-4 left-4 text-[10px] font-mono text-brand-brown-dark/40 uppercase tracking-widest">
                SN ENTERPRISES MAISON D'ART / SS-26
              </span>
            </div>

            {/* Right Column: Copy & Actions */}
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
                    {selectedProduct.name}
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

                {/* Tab content panel */}
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
                    onAddToBag(selectedProduct);
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
                  <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
                </button>
              </div>

              {/* Quick Shipping Pitch */}
              <div className="grid grid-cols-3 gap-2 border-t border-brand-brown-dark/10 pt-4 mt-6 text-center text-[9px] text-brand-brown-light/70 font-semibold tracking-wider uppercase">
                <div className="flex flex-col items-center gap-1">
                  <Truck size={14} className="text-brand-camel" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                  <RotateCcw size={14} className="text-brand-camel" />
                  <span>30-Day returns</span>
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
    </section>
  );
};

export default NewArrivals;
