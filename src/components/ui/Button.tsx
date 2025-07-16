import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Exclude conflicting animation props from React's ButtonHTMLAttributes
interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 
  'onAnimationStart' | 'onAnimationEnd' | 'onAnimationIteration'> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
}

// Motion-specific props that are safe to use with Framer Motion
interface MotionButtonProps extends ButtonProps {
  whileHover?: MotionProps['whileHover'];
  whileTap?: MotionProps['whileTap'];
}

const Button = React.forwardRef<HTMLButtonElement, MotionButtonProps>(
  ({
    className = '',
    variant = 'primary',
    size = 'md',
    loading = false,
    disabled,
    children,
    icon,
    iconPosition = 'left',
    whileHover,
    whileTap,
    ...props
  }, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
    
    const variantClasses = {
      primary: 'bg-purple-600 text-white hover:bg-purple-700 focus:ring-purple-500',
      secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20 focus:ring-white/50',
      ghost: 'text-white/80 hover:text-white hover:bg-white/10 focus:ring-white/50',
      outline: 'border border-purple-500 text-purple-500 hover:bg-purple-500 hover:text-white focus:ring-purple-500'
    };
    
    const sizeClasses = {
      sm: 'px-3 py-2 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg'
    };
    
    const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
    
    // Default motion props with proper typing
    const defaultMotionProps = {
      whileHover: whileHover || (disabled || loading ? undefined : { scale: 1.02 }),
      whileTap: whileTap || (disabled || loading ? undefined : { scale: 0.98 })
    };
    
    return (
      <motion.button
        ref={ref}
        className={classes}
        disabled={disabled || loading}
        {...defaultMotionProps}
        {...props}
      >
        {loading && (
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
        )}
        {!loading && icon && iconPosition === 'left' && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {!loading && icon && iconPosition === 'right' && (
          <span className="ml-2">{icon}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export default Button;