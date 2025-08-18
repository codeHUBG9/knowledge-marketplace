import React, { useEffect, useRef, useState } from 'react';

const AnimatedSection = ({ 
  children, 
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, delay);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [delay, threshold]);

  const animationClasses = {
    fadeInUp: 'translate-y-8 opacity-0',
    fadeInDown: '-translate-y-8 opacity-0',
    fadeInLeft: 'translate-x-8 opacity-0',
    fadeInRight: '-translate-x-8 opacity-0',
    fadeIn: 'opacity-0',
    scaleIn: 'scale-95 opacity-0'
  };

  const visibleClasses = {
    fadeInUp: 'translate-y-0 opacity-100',
    fadeInDown: 'translate-y-0 opacity-100',
    fadeInLeft: 'translate-x-0 opacity-100',
    fadeInRight: 'translate-x-0 opacity-100',
    fadeIn: 'opacity-100',
    scaleIn: 'scale-100 opacity-100'
  };

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? visibleClasses[animation] : animationClasses[animation]
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
