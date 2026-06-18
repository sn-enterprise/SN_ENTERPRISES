import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import carousal1 from '../assets/carousal_1.png';
import carousal2 from '../assets/carousal_2.png';
import carousal3 from '../assets/carousal_3.png';

gsap.registerPlugin(ScrollTrigger);

const ProductCarousel = ({ onSelectProduct }) => {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useGSAP(() => {
    // GSAP ScrollTrigger to translate the slider horizontally while pinning the page
    const pin = gsap.fromTo(
      sectionRef.current,
      { x: '0vw' },
      {
        x: '-200vw', // 3 panels total, so we need to translate by -200vw
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: 'top top',
          end: () => `+=${triggerRef.current.offsetWidth * 2}`,
          invalidateOnRefresh: true,
        },
      }
    );

    // Parallax effect on image movement inside each slide container
    const images = document.querySelectorAll('.carousel-image');
    images.forEach((img) => {
      gsap.fromTo(
        img,
        { xPercent: -10 },
        {
          xPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.carousel-slide'),
            start: 'left right',
            end: 'right left',
            containerAnimation: pin.scrollTrigger,
            scrub: true,
          },
        }
      );
    });
  }, { scope: triggerRef });

  const slides = [
    {
      id: 'slide-1',
      title: 'Soleil Signature Derby',
      subtitle: 'The Classic Reinvented',
      image: carousal1,
      number: '01',
      desc: 'Formally sculpted, handwelted and refined. Our hallmark silhouette featuring vegetable-tanned lining.',
      price: '$480',
    },
    {
      id: 'slide-2',
      title: 'Soleil Sport Chic',
      subtitle: 'Effortless Mobility',
      image: carousal2,
      number: '02',
      desc: 'Merging ergonomic athletic cushioning with bespoke full-grain calfskin exterior panels.',
      price: '$520',
    },
    {
      id: 'slide-3',
      title: 'Soleil Luxe Runner',
      subtitle: 'Sculpted Silhouette',
      image: carousal3,
      number: '03',
      desc: 'Inspired by retro running design. Built with premium camel suede and high-density sole support.',
      price: '$460',
    },
  ];

  return (
    <div ref={triggerRef} id="lookbook" className="relative bg-brand-brown-dark overflow-hidden">
      {/* Horizontal Scroll Wrapper */}
      <div ref={sectionRef} className="flex w-[300vw] h-screen relative">
        
        {slides.map((slide) => (
          <section
            key={slide.id}
            className="carousel-slide w-screen h-screen flex items-center justify-center relative p-6 md:p-12"
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
                    {slide.subtitle}
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
                <div className="w-full h-full max-w-[600px] aspect-4/5 overflow-hidden relative border border-brand-camel/10 bg-[#2E1C0C]">
                  {/* Floating geometric overlay */}
                  <div className="absolute top-6 left-6 text-xs text-brand-camel/40 font-mono tracking-widest uppercase z-20">
                    SOLEIL MAISON D'ART / LOOKBOOK 26
                  </div>

                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="carousel-image absolute top-0 left-[-10%] w-[120%] h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  
                  {/* Inner overlay gradient */}
                  <div className="absolute inset-0 bg-linear-to-t from-brand-brown-dark/80 via-transparent to-transparent z-10" />
                </div>
              </div>

            </div>
          </section>
        ))}

      </div>
    </div>
  );
};

export default ProductCarousel;
