import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  loading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  loading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-bold rounded-full transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-offset-2 tracking-wide uppercase';
  
  const variants = {
    primary: 'gradient-primary text-white shadow-lg hover:shadow-primary-green/30 focus:ring-primary-green/50',
    secondary: 'gradient-dark text-white shadow-lg hover:shadow-primary-blue/30 focus:ring-primary-blue/50',
    outline: 'border-2 border-primary-green text-primary-green hover:bg-primary-green hover:text-white focus:ring-primary-green/50 backdrop-blur-sm',
    gold: 'gradient-gold text-white shadow-lg hover:shadow-accent-gold/40 focus:ring-accent-gold/50',
  };
  
  const sizes = {
    sm: 'px-6 py-2 text-xs',
    md: 'px-8 py-3 text-sm',
    lg: 'px-10 py-4 text-base',
  };
  
  return (
    <motion.button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className} ${props.lang === 'ur' ? '!tracking-normal !normal-case' : ''}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? (
        <>
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
          Loading...
        </>
      ) : (
        children
      )}
    </motion.button>
  );
};
