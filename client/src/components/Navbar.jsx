import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Search, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

// Magnetic Button Component for Navbar
const MagneticButton = ({ children, onClick, className, "aria-label": ariaLabel }) => {
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
      className={className}
      aria-label={ariaLabel}
    >
      {children}
    </motion.button>
  );
};

const Navbar = ({ cartCount = 0, onCartClick, onSearchClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Lookbook', href: '#lookbook' },
    { name: 'Collection', href: '#collection' },
    { name: 'Craftsmanship', href: '#craftsmanship' },
  ];

  const menuVariants = {
    hidden: { y: "-100%", transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } },
    visible: { y: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
  };

  const linkContainerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 }
    }
  };

  const linkVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 px-6 md:px-12 flex justify-between items-center bg-brand-offwhite shadow-sm border-b border-brand-camel/10 ${
          isScrolled ? 'py-4' : 'py-6'
        } ${isMenuOpen ? 'opacity-0 pointer-events-none' : ''}`}
      >
        {/* Left Side: Brand Logo */}
        <a
          href="#home"
          className="font-serif text-2xl md:text-3xl font-semibold tracking-[0.2em] text-brand-brown-dark transition-colors hover:text-brand-camel"
          data-cursor-hover
        >
          SN ENTERPRISES
        </a>

        {/* Center: Elegant Links (Hidden on tablet/mobile) */}
        <nav className="hidden lg:flex items-center gap-8 xl:gap-12">
          {navLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              className="relative text-xs tracking-[0.2em] uppercase text-brand-brown-dark font-medium transition-colors hover:text-brand-camel group py-2"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-brand-camel transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Right Side: Icons & Menu button */}
        <div className="flex items-center gap-2 md:gap-4">
          <MagneticButton
            onClick={onSearchClick}
            className="p-2 text-brand-brown-dark hover:text-brand-camel transition-colors rounded-full"
            aria-label="Search Collection"
          >
            <Search size={18} />
          </MagneticButton>

          <MagneticButton
            onClick={onCartClick}
            className="p-2 text-brand-brown-dark hover:text-brand-camel transition-colors relative rounded-full"
            aria-label="View Shopping Bag"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-brown-dark text-brand-offwhite border border-brand-offwhite text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </MagneticButton>

          <MagneticButton
            onClick={toggleMenu}
            className="p-2 text-brand-brown-dark hover:text-brand-camel transition-colors relative z-50 rounded-full"
            aria-label="Toggle Navigation Menu"
          >
            <Menu size={20} />
          </MagneticButton>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { delay: 0.4 } }}
            className="fixed inset-0 z-50 overflow-hidden pointer-events-auto"
          >
            {/* Sliding background layer */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="hidden"
              className="absolute inset-0 bg-brand-brown-dark flex flex-col justify-between p-8 md:p-20"
            >
              {/* Top of overlay */}
              <div className="flex justify-between items-center text-brand-offwhite/50 text-xs tracking-widest uppercase">
                <span>SN Enterprises Maison d'Art</span>
                <div className="flex items-center gap-6">
                  <span className="hidden sm:inline">Menu Catalog 2026</span>
                  <MagneticButton
                    onClick={toggleMenu}
                    className="p-2 text-brand-offwhite hover:text-brand-camel transition-colors rounded-full"
                    aria-label="Close Menu"
                  >
                    <X size={24} />
                  </MagneticButton>
                </div>
              </div>

              {/* Menu contents */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-auto">
                {/* Nav list */}
                <motion.div 
                  variants={linkContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  className="flex flex-col gap-4 md:gap-8"
                >
                  {navLinks.map((link, idx) => (
                    <div key={idx} className="overflow-hidden">
                      <motion.a
                        variants={linkVariants}
                        href={link.href}
                        onClick={() => setIsMenuOpen(false)}
                        className="font-serif text-4xl md:text-6xl lg:text-7xl text-brand-offwhite hover:text-brand-camel inline-block transition-all duration-300 font-light hover:translate-x-6 opacity-80 hover:opacity-100"
                      >
                        {link.name}
                      </motion.a>
                    </div>
                  ))}
                </motion.div>

                {/* Side teaser image / specs */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1, transition: { delay: 0.6, duration: 0.5 } }}
                  className="hidden md:flex flex-col gap-6 max-w-sm border-l border-brand-offwhite/10 pl-8"
                >
                  <span className="text-brand-camel text-xs tracking-[0.2em] uppercase font-semibold">
                    Season Highlight
                  </span>
                  <p className="font-serif text-xl italic text-brand-beige font-light leading-relaxed">
                    "Fine Italian full-grain leather, handwelted in Naples. Made for the design purist."
                  </p>
                  <a
                    href="#collection"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-2 text-xs text-brand-offwhite hover:text-brand-camel tracking-widest uppercase font-semibold group mt-4"
                  >
                    Explore New Arrivals{' '}
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                </motion.div>
              </div>

              {/* Bottom menu footer */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6, transition: { delay: 0.7, duration: 0.5 } }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-brand-offwhite border-t border-brand-offwhite/10 pt-8"
              >
                <div className="menu-footer-item flex gap-6">
                  <a href="#instagram" className="hover:text-brand-camel transition-colors">INSTAGRAM</a>
                  <a href="#pinterest" className="hover:text-brand-camel transition-colors">PINTEREST</a>
                  <a href="#journal" className="hover:text-brand-camel transition-colors">JOURNAL</a>
                </div>
                <span className="menu-footer-item opacity-40">
                  ©2026 SN ENTERPRISES IND. ALL RIGHTS RESERVED
                </span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
