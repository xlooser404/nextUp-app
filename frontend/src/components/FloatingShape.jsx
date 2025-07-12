import React from 'react';
import { motion } from 'framer-motion';

const FloatingShape = ({ color, size, top, left, delay }) => {
  return (
    <motion.div
      // Corrected: Use template literal and remove top/left from class
      className={`absolute rounded-full ${color} ${size} opacity-20 blur-xl`} 
      // Corrected: Apply top and left as inline styles
      style={{ top, left }} 
      animate={{
        y: ['0%', '50%', '0%', '-50%', '0%'], // A more varied path
        x: ['0%', '-50%', '0%', '50%', '0%'],
        rotate: [0, 180, 360, 180, 0],
      }}
      transition={{
        duration: 25, // Slightly longer duration for a calmer feel
        ease: 'linear',
        repeat: Infinity,
        delay: delay,
      }}
      aria-hidden="true"
    />
  );
};

export default FloatingShape;