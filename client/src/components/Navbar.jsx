import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ShoppingBag, Search, ChevronRight, Heart } from 'lucide-react';
import gsap from 'gsap';

const Navbar = ({ cartCount = 0, onCartClick, onSearchClick }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const menuRef = useRef(null);
  const menuBgRef = useRef(null);
  const menuLinksRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if (isMenuOpen) {
      // Disable scrolling when menu is open
      document.body.style.overflow = 'hidden';

      // Slide in menu bg and links
      gsap.to(menuBgRef.current, {
        yPercent: 0,
        duration: 0.8,
        ease: 'power4.inOut',
      });

      gsap.to(menuRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.1,
      });

      gsap.fromTo(
        menuLinksRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          delay: 0.3,
        }
      );

      gsap.fromTo(
        '.menu-footer-item',
        { opacity: 0 },
        { opacity: 0.6, duration: 0.5, delay: 0.7 }
      );
    } else {
      document.body.style.overflow = '';
      
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(menuRef.current, { visibility: 'hidden' });
        }
      });

      tl.to(menuLinksRef.current, {
        y: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: 'power3.in',
      })
      .to(menuBgRef.current, {
        yPercent: -100,
        duration: 0.6,
        ease: 'power4.inOut',
      }, '-=0.2')
      .to(menuRef.current, {
        opacity: 0,
        duration: 0.3,
      }, '-=0.4');
    }
  }, [isMenuOpen]);

  // Magnetic button helper for cursor hover
  const handleMagneticMove = (e) => {
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(target, {
      x: x * 0.4,
      y: y * 0.4,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMagneticLeave = (e) => {
    gsap.to(e.currentTarget, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Philosophy', href: '#philosophy' },
    { name: 'Lookbook', href: '#lookbook' },
    { name: 'Collection', href: '#collection' },
    { name: 'Craftsmanship', href: '#craftsmanship' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 py-6 px-6 md:px-12 flex justify-between items-center ${
          isScrolled
            ? 'glass-panel shadow-sm border-b border-brand-camel/10 py-4!'
            : 'bg-transparent'
        }`}
      >
        {/* Left Side: Brand Logo */}
        <a
          href="#home"
          className="font-serif text-2xl md:text-3xl font-semibold tracking-[0.2em] text-brand-brown-dark transition-colors hover:text-brand-camel"
          data-cursor-hover
        >
          SOLEIL
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
          {/* Search Button */}
          <button
            onClick={onSearchClick}
            className="p-2 text-brand-brown-dark hover:text-brand-camel transition-colors rounded-full"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            aria-label="Search Collection"
          >
            <Search size={18} />
          </button>

          {/* Cart Trigger */}
          <button
            onClick={onCartClick}
            className="p-2 text-brand-brown-dark hover:text-brand-camel transition-colors relative rounded-full"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            aria-label="View Shopping Bag"
          >
            <ShoppingBag size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-brown-dark text-brand-offwhite border border-brand-offwhite text-[8px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>

          {/* Fullscreen Overlay Menu Toggle */}
          <button
            onClick={toggleMenu}
            className="p-2 text-brand-brown-dark hover:text-brand-camel transition-colors relative z-50 rounded-full"
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            aria-label="Toggle Navigation Menu"
          >
            {isMenuOpen ? <X size={20} className="text-brand-offwhite" /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Fullscreen Menu Overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-49 visibility-hidden opacity-0 overflow-hidden"
      >
        {/* Sliding background layer */}
        <div
          ref={menuBgRef}
          className="absolute inset-0 bg-brand-brown-dark -translate-y-full flex flex-col justify-between p-8 md:p-20"
        >
          {/* Top of overlay */}
          <div className="flex justify-between items-center text-brand-offwhite/50 text-xs tracking-widest uppercase">
            <span>Soleil Maison d'Art</span>
            <span>Menu Catalog 2026</span>
          </div>

          {/* Menu contents */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center my-auto">
            {/* Nav list */}
            <div className="flex flex-col gap-4 md:gap-8">
              {navLinks.map((link, idx) => (
                <div key={idx} className="overflow-hidden">
                  <a
                    ref={(el) => (menuLinksRef.current[idx] = el)}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="font-serif text-4xl md:text-6xl lg:text-7xl text-brand-offwhite hover:text-brand-camel hover:italic inline-block transition-all duration-300 font-light hover:translate-x-4"
                  >
                    {link.name}
                  </a>
                </div>
              ))}
            </div>

            {/* Side teaser image / specs */}
            <div className="hidden md:flex flex-col gap-6 max-w-sm border-l border-brand-offwhite/10 pl-8">
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
            </div>
          </div>

          {/* Bottom menu footer */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs text-brand-offwhite border-t border-brand-offwhite/10 pt-8">
            <div className="menu-footer-item flex gap-6">
              <a href="#instagram" className="hover:text-brand-camel transition-colors">INSTAGRAM</a>
              <a href="#pinterest" className="hover:text-brand-camel transition-colors">PINTEREST</a>
              <a href="#journal" className="hover:text-brand-camel transition-colors">JOURNAL</a>
            </div>
            <span className="menu-footer-item opacity-40">
              ©2026 SOLEIL IND. ALL RIGHTS RESERVED
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
