import useReducedMotion from "@/hooks/useReducedMotion";
import { motion, useAnimation, useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

const AnimatedCard: React.FC<AnimatedCardProps> = ({ children, className = "", delay = 0, index = 0 }) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (isInView && !prefersReducedMotion) {
      controls.start("visible");
    } else if (prefersReducedMotion) {
      // If user prefers reduced motion, immediately show the content
      controls.start("visible");
    }
  }, [controls, isInView, prefersReducedMotion]);

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: prefersReducedMotion
        ? { duration: 0 } // No animation if reduced motion is preferred
        : {
            duration: 0.5,
            delay: delay + index * 0.1,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          },
    },
    hover: prefersReducedMotion
      ? {}
      : {
          // No hover animation if reduced motion is preferred
          y: -5,
          scale: 1.02,
          transition: {
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94] as const,
          },
        },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={!prefersReducedMotion ? "hover" : undefined}
      viewport={{ once: true }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatedCard;
