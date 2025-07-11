import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

function Card({ children, className = '', hover = false, onClick }: CardProps) {
  const baseClasses = 'bg-white/10 backdrop-blur-md rounded-xl border border-white/20 p-6';
  const hoverClasses = hover ? 'hover:bg-white/15 transition-all duration-200 cursor-pointer' : '';
  const classes = `${baseClasses} ${hoverClasses} ${className}`;
  
  return (
    <motion.div
      className={classes}
      onClick={onClick}
      whileHover={hover ? { scale: 1.02, y: -2 } : undefined}
      whileTap={onClick ? { scale: 0.98 } : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  );
}

export default Card;