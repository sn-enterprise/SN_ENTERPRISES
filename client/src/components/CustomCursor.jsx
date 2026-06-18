import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfigDot = { damping: 25, stiffness: 400, mass: 0.5 };
  const dotX = useSpring(cursorX, springConfigDot);
  const dotY = useSpring(cursorY, springConfigDot);

  const springConfigRing = { damping: 30, stiffness: 200, mass: 0.8 };
  const ringX = useSpring(cursorX, springConfigRing);
  const ringY = useSpring(cursorY, springConfigRing);

  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      if (!isVisible) setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    const onMouseEnterLink = (e) => {
      const text = e.currentTarget.getAttribute('data-cursor-text');
      setIsHovering(true);
      if (text) {
        setCursorText(text);
      }
    };

    const onMouseLeaveLink = () => {
      setIsHovering(false);
      setCursorText('');
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

    attachHoverEvents();

    const observer = new MutationObserver(attachHoverEvents);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      observer.disconnect();
      document.body.classList.remove('custom-cursor-active');
    };
  }, [isVisible, cursorX, cursorY]);

  const ringVariants = {
    default: {
      width: 40,
      height: 40,
      backgroundColor: 'transparent',
      borderColor: '#C5A880',
      mixBlendMode: 'normal',
      opacity: isVisible ? 1 : 0,
      x: "-50%",
      y: "-50%"
    },
    textHover: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(35, 18, 11, 0.9)',
      borderColor: 'transparent',
      mixBlendMode: 'normal',
      opacity: isVisible ? 1 : 0,
      x: "-50%",
      y: "-50%"
    },
    hover: {
      width: 60,
      height: 60,
      backgroundColor: '#C5A880',
      borderColor: '#FAF9F6',
      mixBlendMode: 'difference',
      opacity: isVisible ? 0.9 : 0,
      x: "-50%",
      y: "-50%"
    }
  };

  const dotVariants = {
    default: {
      scale: 1,
      backgroundColor: '#23120B',
      opacity: isVisible ? 1 : 0,
      x: "-50%",
      y: "-50%"
    },
    textHover: {
      scale: 0,
      opacity: 0,
      x: "-50%",
      y: "-50%"
    },
    hover: {
      scale: 0.5,
      backgroundColor: '#FAF9F6',
      opacity: isVisible ? 1 : 0,
      x: "-50%",
      y: "-50%"
    }
  };

  let currentVariant = 'default';
  if (cursorText) {
    currentVariant = 'textHover';
  } else if (isHovering) {
    currentVariant = 'hover';
  }

  return (
    <>
      <motion.div
        className="custom-cursor hidden lg:block fixed top-0 left-0 pointer-events-none z-9999"
        style={{ left: dotX, top: dotY }}
        variants={dotVariants}
        animate={currentVariant}
        transition={{ type: "tween", duration: 0.2 }}
      />
      <motion.div
        className="custom-cursor-ring hidden lg:flex fixed top-0 left-0 items-center justify-center text-center overflow-hidden pointer-events-none z-9999"
        style={{ left: ringX, top: ringY }}
        variants={ringVariants}
        animate={currentVariant}
        transition={{ type: "tween", duration: 0.3 }}
      >
        {cursorText && (
          <span className="text-brand-offwhite text-[10px] uppercase font-semibold font-sans tracking-widest scale-90">
            {cursorText}
          </span>
        )}
      </motion.div>
    </>
  );
};

export default CustomCursor;
