'use client';

import React from 'react';
import { motion, AnimatePresence, TargetAndTransition } from 'framer-motion';
import { hoverVariants, getAnimationProps } from '../../lib/utils/animations';
import { useReducedMotion } from '../../lib/utils/accessibility';

interface GradientCardProps {
  children: React.ReactNode;
  variant?: 'standard' | 'gradient-border' | 'interactive';
  className?: string;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  animateOnHover?: boolean;
}

export const GradientCard: React.FC<GradientCardProps> = ({
  children,
  variant = 'standard',
  className = '',
  header,
  footer,
  onClick,
  disabled = false,
  animateOnHover = true,
}) => {
  // Check for reduced motion preference
  const reducedMotion = useReducedMotion();

  // Determine card styles based on variant
  const getCardStyles = () => {
    const baseClasses = [
      'rounded-xl border border-slate-200 shadow-sm overflow-hidden',
    ];

    let variantClasses = '';
    switch (variant) {
      case 'standard':
        variantClasses = 'bg-white';
        break;
      case 'gradient-border':
        variantClasses = 'bg-white border-0 bg-gradient-to-br from-indigo-50 to-violet-50 [border-image:linear-gradient(to_right,rgb(99,102,241),rgb(139,92,246))_1]';
        break;
      case 'interactive':
        variantClasses = 'bg-white cursor-pointer transition-all duration-300 hover:shadow-md';
        break;
    }

    return `${baseClasses.join(' ')} ${variantClasses} ${className}`;
  };

  // Animation variants
  const animationVariants: TargetAndTransition = reducedMotion
    ? {}
    : (getAnimationProps(
        variant === 'interactive' && animateOnHover
          ? hoverVariants.elevated
          : { 
              scale: 1, 
              transition: { duration: 0.2, ease: [0.42, 0, 0.58, 1] } 
            }
      ) as TargetAndTransition);
      const tapAnimation = (variant === 'interactive' && !disabled && !reducedMotion)
    ? (hoverVariants.pressed as TargetAndTransition)
    : {};
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  return (
    <motion.div
      className={getCardStyles()}
      onClick={handleClick}
      whileHover={
        variant === 'interactive' && animateOnHover && !disabled && !reducedMotion
          ? animationVariants
          : {}
      }
      whileTap={tapAnimation}
      aria-disabled={disabled}
    >
      {header && (
        <div className="px-6 py-4 border-b border-slate-100">
          {header}
        </div>
      )}
      <div className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key="card-content"
            initial={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            animate={reducedMotion ? { opacity: 1 } : { opacity: 1 }}
            exit={reducedMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={reducedMotion ? {} : { duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </div>
      {footer && (
        <div className="px-6 py-4 border-t border-slate-100">
          {footer}
        </div>
      )}
    </motion.div>
  );
};