import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Disable custom cursor on touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Enable class on body to remove default cursor
    document.body.classList.add('custom-cursor-active');

    const dot = dotRef.current;
    const ring = ringRef.current;

    // Set initial position out of view
    gsap.set(dot, { xPercent: -50, yPercent: -50, scale: 0 });
    gsap.set(ring, { xPercent: -50, yPercent: -50, scale: 0 });

    // GSAP quickTo for smooth lagging follow effect
    const xDotTo = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3' });
    const yDotTo = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3' });
    
    const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3' });
    const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3' });

    const handleMouseMove = (e) => {
      if (!isVisible) {
        setIsVisible(true);
        gsap.to([dot, ring], { scale: 1, opacity: 1, duration: 0.3 });
      }

      xDotTo(e.clientX);
      yDotTo(e.clientY);
      xRingTo(e.clientX);
      yRingTo(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      gsap.to([dot, ring], { scale: 0, opacity: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Event listener for hover effects
    const onMouseEnterLink = (e) => {
      const target = e.currentTarget;
      const text = target.getAttribute('data-cursor-text');
      
      if (text) {
        setCursorText(text);
        gsap.to(ring, {
          width: 80,
          height: 80,
          backgroundColor: 'rgba(35, 18, 11, 0.9)',
          borderColor: 'transparent',
          duration: 0.3,
          ease: 'power3.out'
        });
        gsap.to(dot, { scale: 0, duration: 0.2 });
      } else {
        gsap.to(ring, {
          scale: 1.5,
          borderColor: '#FAF9F6',
          backgroundColor: '#C5A880',
          opacity: 0.9,
          mixBlendMode: 'difference',
          duration: 0.3,
          ease: 'power3.out'
        });
        gsap.to(dot, {
          scale: 0.5,
          backgroundColor: '#FAF9F6',
          duration: 0.3
        });
      }
    };

    const onMouseLeaveLink = () => {
      setCursorText('');
      gsap.to(ring, {
        width: 40,
        height: 40,
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: '#C5A880',
        mixBlendMode: 'normal',
        opacity: 1,
        duration: 0.3,
        ease: 'power3.out'
      });
      gsap.to(dot, {
        scale: 1,
        backgroundColor: '#23120B',
        duration: 0.3
      });
    };

    const attachHoverEvents = () => {
      const hoverables = document.querySelectorAll('a, button, [data-cursor-text], [data-cursor-hover]');
      hoverables.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterLink);
        el.removeEventListener('mouseleave', onMouseLeaveLink);
        el.addEventListener('mouseenter', onMouseEnterLink);
        el.addEventListener('mouseleave', onMouseLeaveLink);
      });
    };

    // Attach initial events
    attachHoverEvents();

    // Use MutationObserver to watch for new DOM elements that can be hovered
    const observer = new MutationObserver(attachHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isVisible]);

  return (
    <>
      {/* Tiny solid dot */}
      <div
        ref={dotRef}
        className="custom-cursor hidden lg:block"
        style={{ opacity: 0 }}
      />
      {/* Outer tracking ring */}
      <div
        ref={ringRef}
        className="custom-cursor-ring hidden lg:flex items-center justify-center text-center overflow-hidden"
        style={{ opacity: 0 }}
      >
        {cursorText && (
          <span className="text-brand-offwhite text-[10px] uppercase font-semibold font-sans tracking-widest scale-90">
            {cursorText}
          </span>
        )}
      </div>
    </>
  );
};

export default CustomCursor;
