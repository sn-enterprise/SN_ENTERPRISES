import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';

// Component imports
import Preloader from './components/Preloader';

import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Philosophy from './components/Philosophy';
import ProductCarousel from './components/ProductCarousel';
import NewArrivals from './components/NewArrivals';
import FeatureZoom from './components/FeatureZoom';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Initialize Lenis Smooth Scroll
  useEffect(() => {
    if (isLoading) return; // Wait until loading completes

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // Handle Animation Frame
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Keep Lenis reference globally to allow other components to use it
    window.lenis = lenis;

    return () => {
      lenis.destroy();
      window.lenis = null;
    };
  }, [isLoading]);

  // Cart operations
  const handleAddToBag = (product) => {
    setCart((prevCart) => {
      const exists = prevCart.find((item) => item.id === product.id);
      if (exists) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      // Parse numeric price
      const priceVal = parseFloat(product.price.replace('$', ''));
      return [...prevCart, { ...product, numericPrice: priceVal, qty: 1 }];
    });
    // Open cart drawer to give direct feedback
    setIsCartOpen(true);
  };

  const handleRemoveFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.numericPrice * item.qty, 0);

  // Quick action search terms
  const searchSuggestions = ['Linen', 'Derby', 'Luxe Runner', 'Desert Boot', 'Oxford'];

  return (
    <>
      {/* 1. Loader screen overlay */}
      {isLoading ? (
        <Preloader onComplete={() => setIsLoading(false)} />
      ) : (
        <div className="relative min-h-screen bg-brand-offwhite text-brand-brown-dark">
          
          {/* Removed Custom Cursor Follower */}

          {/* 3. Sticky Top Navbar */}
          <Navbar
            cartCount={cartCount}
            onCartClick={() => setIsCartOpen(true)}
            onSearchClick={() => setIsSearchOpen(true)}
          />

          {/* 4. Landing Sections */}
          <main>
            <HeroSection onShopNowClick={() => {
              const target = document.getElementById('collection');
              if (target && window.lenis) {
                window.lenis.scrollTo(target);
              } else if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
              }
            }} />
            <Philosophy />
            <ProductCarousel onSelectProduct={handleAddToBag} />
            <NewArrivals onAddToBag={handleAddToBag} />
            <FeatureZoom />
          </main>

          {/* 5. Footer */}
          <Footer />

          {/* 6. Shopping Bag Slide-out Drawer */}
          {isCartOpen && (
            <div className="fixed inset-0 z-100 flex justify-end">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-brand-brown-dark/50 backdrop-blur-sm"
                onClick={() => setIsCartOpen(false)}
              />

              {/* Drawer Box */}
              <div className="w-full max-w-md bg-brand-offwhite h-full relative z-10 flex flex-col justify-between p-6 shadow-2xl border-l border-brand-camel/20">
                
                {/* Header */}
                <div className="flex justify-between items-center border-b border-brand-brown-dark/10 pb-4">
                  <div className="flex items-center gap-2">
                    <ShoppingBag size={18} />
                    <span className="font-serif text-lg font-semibold uppercase tracking-wider">
                      Shopping Bag ({cartCount})
                    </span>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 hover:text-brand-camel transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Cart list panel */}
                <div className="flex-1 overflow-y-auto py-6 flex flex-col gap-4">
                  {cart.length === 0 ? (
                    <div className="my-auto text-center flex flex-col items-center gap-4 px-4">
                      <span className="font-serif text-brand-camel italic text-2xl">Your bag is empty</span>
                      <p className="text-xs text-brand-brown-light opacity-70">
                        Explore our new collections and add handcrafted footwear to your list.
                      </p>
                      <button
                        onClick={() => {
                          setIsCartOpen(false);
                          const target = document.getElementById('collection');
                          if (target && window.lenis) window.lenis.scrollTo(target);
                        }}
                        className="mt-2 px-6 py-3 bg-brand-brown-dark text-brand-offwhite font-semibold text-xs tracking-widest uppercase hover:bg-brand-camel"
                      >
                        Browse Store
                      </button>
                    </div>
                  ) : (
                    cart.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-4 p-3 border border-brand-camel/15 bg-brand-beige-light relative group"
                      >
                        {/* Thumbnail */}
                        <div className="w-20 h-20 bg-brand-offwhite flex items-center justify-center p-1 border border-brand-camel/10">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-contain"
                          />
                        </div>

                        {/* Metadata */}
                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="block text-[8px] tracking-widest text-brand-camel font-bold uppercase">
                              {item.category}
                            </span>
                            <h4 className="font-serif text-sm font-semibold text-brand-brown-dark">
                              {item.name}
                            </h4>
                            <span className="text-[10px] text-brand-brown-light/70 font-semibold uppercase">
                              QTY: {item.qty}
                            </span>
                          </div>
                          <span className="font-serif text-xs text-brand-camel font-semibold">
                            ${item.numericPrice * item.qty}
                          </span>
                        </div>

                        {/* Remove item trigger */}
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="absolute top-2 right-2 p-1.5 text-brand-brown-dark/40 hover:text-red-500 transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Subtotal & Checkout */}
                {cart.length > 0 && (
                  <div className="border-t border-brand-brown-dark/10 pt-6 flex flex-col gap-4">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-semibold tracking-widest uppercase text-brand-brown-light">
                        SUBTOTAL
                      </span>
                      <span className="font-serif text-2xl text-brand-brown-dark font-light">
                        ${cartSubtotal}
                      </span>
                    </div>
                    <p className="text-[10px] text-brand-brown-light/60 uppercase tracking-widest leading-relaxed">
                      Shipping costs and tax calculated at checkout.
                    </p>
                    <button
                      onClick={() => alert("Checkout initiated! Thank you for purchasing SN Enterprises.")}
                      className="w-full py-4 bg-brand-brown-dark text-brand-offwhite font-semibold text-xs tracking-widest uppercase hover:bg-brand-camel hover:text-brand-brown-dark transition-colors text-center flex items-center justify-center gap-2"
                    >
                      PROCEED TO CHECKOUT <ArrowRight size={14} />
                    </button>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* 7. Search Overlay Modal */}
          {isSearchOpen && (
            <div className="fixed inset-0 z-100 flex items-start justify-center p-4">
              {/* Backdrop */}
              <div
                className="absolute inset-0 bg-brand-brown-dark/90 backdrop-blur-md"
                onClick={() => setIsSearchOpen(false)}
              />

              {/* Input container */}
              <div className="w-full max-w-2xl bg-brand-offwhite border border-brand-camel/20 p-6 md:p-8 mt-16 md:mt-24 relative z-10 shadow-2xl flex flex-col gap-6">
                
                {/* Header Row */}
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-widest text-brand-camel font-bold uppercase">
                    SEARCH CATALOGUE
                  </span>
                  <button
                    onClick={() => setIsSearchOpen(false)}
                    className="p-1 hover:text-brand-camel transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Input Text Form */}
                <div className="border-b border-brand-brown-dark/10 py-2">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="WHAT SHAPE ARE YOU LOOKING FOR?"
                    className="w-full bg-transparent border-none outline-none font-serif text-lg md:text-xl uppercase tracking-widest text-brand-brown-dark placeholder-brand-brown-dark/20"
                    autoFocus
                  />
                </div>

                {/* Quick suggestions list */}
                <div className="flex flex-col gap-3">
                  <span className="text-[9px] tracking-widest text-brand-camel font-bold uppercase">
                    QUICK DISCOVERY SUGGESTIONS
                  </span>
                  <div className="flex gap-2 flex-wrap">
                    {searchSuggestions.map((item) => (
                      <button
                        key={item}
                        onClick={() => {
                          setSearchQuery(item);
                        }}
                        className="px-3 py-1.5 bg-brand-beige-light hover:bg-brand-brown-dark border border-brand-camel/20 text-brand-brown-dark hover:text-brand-offwhite text-[10px] font-semibold tracking-wider uppercase transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulating query hits */}
                {searchQuery && (
                  <div className="border-t border-brand-brown-dark/10 pt-4 text-xs text-brand-brown-light">
                    Showing simulated matching details for "<span className="font-semibold">{searchQuery}</span>". 
                    Our artisanal collection fits exact shapes. Click suggestion tags to filter.
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      )}
    </>
  );
}

export default App;