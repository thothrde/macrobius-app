import React from 'react';
import { motion, MotionProps } from 'framer-motion';

// Apply comprehensive Omit pattern to resolve React/Framer Motion type conflicts
// This excludes event handlers that have incompatible types between React and Framer Motion
interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 
  // Animation-related props that conflict with Framer Motion
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration' |
  // Drag-related props that conflict with Framer Motion
  'onDragStart' | 'onDragEnd' | 'onDrag' | 'onDragEnter' | 'onDragExit' | 'onDragLeave' | 'onDragOver' | 'onDrop' |
  // Transition-related props that conflict with Framer Motion
  'onTransitionStart' | 'onTransitionEnd' | 'onTransitionRun' | 'onTransitionCancel' |
  // Pointer-related props that conflict with Framer Motion
  'onPointerDown' | 'onPointerMove' | 'onPointerUp' | 'onPointerCancel' | 'onPointerEnter' | 'onPointerLeave' | 'onPointerOver' | 'onPointerOut'
> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// Create Motion-specific props interface that combines clean InputProps with selected MotionProps
interface MotionInputProps extends InputProps {
  whileFocus?: MotionProps['whileFocus'];
  whileHover?: MotionProps['whileHover'];
  initial?: MotionProps['initial'];
  animate?: MotionProps['animate'];
  exit?: MotionProps['exit'];
  transition?: MotionProps['transition'];
}

const Input = React.forwardRef<HTMLInputElement, MotionInputProps>(
  ({
    className = '',
    label,
    error,
    icon,
    iconPosition = 'left',
    whileFocus,
    whileHover,
    initial,
    animate,
    exit,
    transition,
    ...props
  }, ref) => {
    const baseClasses = 'w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200';
    const errorClasses = error ? 'border-red-400 focus:ring-red-400' : '';
    
    const inputClasses = `${baseClasses} ${errorClasses} ${className}`;
    const iconClasses = icon ? (iconPosition === 'left' ? 'pl-12' : 'pr-12') : '';
    
    // Extract Motion props separately
    const motionProps = {
      whileFocus: whileFocus || { scale: 1.01 },
      whileHover,
      initial,
      animate,
      exit,
      transition
    };
    
    // Filter out undefined motion props
    const filteredMotionProps = Object.fromEntries(
      Object.entries(motionProps).filter(([_, value]) => value !== undefined)
    );
    
    return (
      <div className="space-y-2">
        {label && (
          <label className="block text-sm font-medium text-white/90">
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className={`absolute inset-y-0 ${iconPosition === 'left' ? 'left-0 pl-3' : 'right-0 pr-3'} flex items-center pointer-events-none`}>
              <span className="text-white/60">{icon}</span>
            </div>
          )}
          
          <motion.input
            ref={ref}
            className={`${inputClasses} ${iconClasses}`}
            {...filteredMotionProps}
            {...props}
          />
        </div>
        
        {error && (
          <motion.p
            className="text-red-400 text-sm"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            {error}
          </motion.p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;