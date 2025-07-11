import React from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className = '',
    label,
    error,
    icon,
    iconPosition = 'left',
    ...props
  }, ref) => {
    const baseClasses = 'w-full px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-200';
    const errorClasses = error ? 'border-red-400 focus:ring-red-400' : '';
    
    const inputClasses = `${baseClasses} ${errorClasses} ${className}`;
    const iconClasses = icon ? (iconPosition === 'left' ? 'pl-12' : 'pr-12') : '';
    
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
            whileFocus={{ scale: 1.01 }}
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