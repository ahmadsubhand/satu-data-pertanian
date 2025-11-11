import React, { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';
import useReducedMotion from '@/hooks/useReducedMotion';

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const AnimatedSection: React.FC<AnimatedSectionProps> = ({ 
  children, 
  className = '', 
  delay = 0 
}) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      controls.start('visible');
    } else if (prefersReducedMotion) {
      // If user prefers reduced motion, immediately show the content
      controls.start('visible');
    }
  }, [controls, isInView, prefersReducedMotion]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: prefersReducedMotion ? 
        { duration: 0 } : // No animation if reduced motion is preferred
        {
          duration: 0.6,
          delay: delay,
          ease: [0.25, 0.46, 0.45, 0.94] as const
        }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedSection;