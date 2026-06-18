import React, { useState } from 'react';
import { ArrowRight, Instagram, Youtube, Twitter, Compass } from 'lucide-react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MagneticButton = ({ children, onClick, className, type, "aria-label": ariaLabel }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = e.currentTarget.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    x.set(middleX * 0.4);
    y.set(middleY * 0.4);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      style={{ x: smoothX, y: smoothY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      type={type}
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
};

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitted(true);
    setEmail('');
  };

  return (
    <footer id="contact" className="relative w-full bg-brand-brown-dark text-brand-offwhite pt-24 pb-12 px-6 md:px-12 overflow-hidden border-t border-brand-camel/10 select-none">
      
      {/* Decorative Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-brand-camel)_1px,transparent_1px)] bg-size-[12vw] opacity-[0.03] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 relative z-10">
        
        {/* Left Side: Brand Statement & Newsletter */}
        <div className="lg:col-span-6 flex flex-col gap-8">
          <div className="flex items-center gap-3">
            <span className="text-brand-camel text-xl font-serif italic font-light">SN Enterprises</span>
            <div className="h-px w-8 bg-brand-camel" />
            <span className="text-[10px] tracking-widest text-brand-camel font-bold uppercase">
              MAISON D'ART
            </span>
          </div>

          <h3 className="font-serif text-3xl md:text-4xl font-light text-brand-offwhite leading-snug">
            Receive exclusive updates on new collections and private studio sales.
          </h3>

          {/* Interactive Newsletter Form */}
          <div className="max-w-md w-full relative">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                <div className="flex items-center border-b border-brand-offwhite/20 hover:border-brand-camel focus-within:border-brand-camel transition-colors py-3 relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ENTER YOUR EMAIL ADDRESS"
                    className="w-full bg-transparent border-none outline-none text-xs font-semibold tracking-widest text-brand-offwhite placeholder-brand-beige/40 focus:ring-0"
                    required
                  />
                  <MagneticButton
                    type="submit"
                    className="p-2 text-brand-camel hover:text-brand-offwhite transition-colors rounded-full"
                    aria-label="Subscribe"
                  >
                    <ArrowRight size={18} />
                  </MagneticButton>
                </div>
                <p className="text-[10px] text-brand-beige/40 uppercase tracking-widest mt-1">
                  By subscribing, you agree to our Privacy Policy.
                </p>
              </form>
            ) : (
              <div className="py-4 border border-brand-camel/30 bg-[#2E1C0C]/50 px-6 rounded text-left">
                <span className="block font-serif text-brand-camel text-lg italic mb-1">Grazie Mille.</span>
                <p className="text-xs text-brand-offwhite opacity-90 tracking-wide">
                  Welcome to SN Enterprises. A confirmation email has been dispatched to your inbox.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Columns of links */}
        <div className="lg:col-span-6 grid grid-cols-2 md:grid-cols-3 gap-10">
          
          {/* Navigation Links */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] tracking-widest text-brand-camel font-bold uppercase">
              STUDIO
            </span>
            <div className="flex flex-col gap-3 text-xs text-brand-beige font-medium tracking-wider">
              <a href="#home" className="hover:text-brand-offwhite transition-colors">HOME</a>
              <a href="#philosophy" className="hover:text-brand-offwhite transition-colors">PHILOSOPHY</a>
              <a href="#lookbook" className="hover:text-brand-offwhite transition-colors">LOOKBOOK</a>
              <a href="#collection" className="hover:text-brand-offwhite transition-colors">COLLECTION</a>
              <a href="#craftsmanship" className="hover:text-brand-offwhite transition-colors">CRAFT</a>
            </div>
          </div>

          {/* Customer Service */}
          <div className="flex flex-col gap-6">
            <span className="text-[10px] tracking-widest text-brand-camel font-bold uppercase">
              SERVICES
            </span>
            <div className="flex flex-col gap-3 text-xs text-brand-beige font-medium tracking-wider">
              <a href="#shipping" className="hover:text-brand-offwhite transition-colors">SHIPPING</a>
              <a href="#returns" className="hover:text-brand-offwhite transition-colors">RETURNS</a>
              <a href="#sizing" className="hover:text-brand-offwhite transition-colors">SIZING GUIDE</a>
              <a href="#contact" className="hover:text-brand-offwhite transition-colors">CONTACT</a>
              <a href="#privacy" className="hover:text-brand-offwhite transition-colors">PRIVACY POLICY</a>
            </div>
          </div>

          {/* Studio Locations */}
          <div className="flex flex-col gap-6 col-span-2 md:col-span-1">
            <span className="text-[10px] tracking-widest text-brand-camel font-bold uppercase">
              LOCATIONS
            </span>
            <div className="flex flex-col gap-4 text-xs text-brand-beige leading-relaxed">
              <div>
                <span className="block text-brand-offwhite font-semibold mb-1">Maison Naples</span>
                <span className="opacity-80">Via dei Mille, 12<br />80121 Napoli, Italy</span>
              </div>
              <div>
                <span className="block text-brand-offwhite font-semibold mb-1">Atelier Florence</span>
                <span className="opacity-80">Via de' Tornabuoni, 8r<br />50123 Firenze, Italy</span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Large Brand Backdrop Serif Logo */}
      <div className="w-full border-t border-brand-offwhite/10 pt-16 mt-16 flex flex-col items-center">
        <h2 className="font-serif text-[18vw] leading-none font-bold text-[#2E1C0C] tracking-[0.2em] translate-y-3 pointer-events-none select-none text-center">
          SN ENTERPRISES
        </h2>
      </div>

      {/* Footer Bottom Row */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 mt-8 relative z-10 border-t border-brand-offwhite/10 pt-8 text-xs text-brand-beige/60">
        <span>©2026 SN ENTERPRISES IND. ALL RIGHTS RESERVED.</span>
        
        {/* Social Icons */}
        <div className="flex gap-6 text-brand-offwhite/80">
          <a href="#instagram" aria-label="Instagram" className="hover:text-brand-camel transition-colors">
            <Instagram size={16} />
          </a>
          <a href="#youtube" aria-label="YouTube" className="hover:text-brand-camel transition-colors">
            <Youtube size={16} />
          </a>
          <a href="#twitter" aria-label="Twitter" className="hover:text-brand-camel transition-colors">
            <Twitter size={16} />
          </a>
          <a href="#journal" aria-label="Journal" className="hover:text-brand-camel transition-colors">
            <Compass size={16} />
          </a>
        </div>

        <span>DESIGN & DEV BY ANTIGRAVITY</span>
      </div>

    </footer>
  );
};

export default Footer;
