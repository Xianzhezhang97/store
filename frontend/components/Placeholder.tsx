'use client';
import React from 'react';
import { motion } from 'framer-motion';

const shimmerAnimation = {
  initial: {
    background:
      'linear-gradient(120deg, rgba(255, 255, 255, 0) 20%, rgba(255, 255, 255, 1) 30%, rgba(255, 255, 255, 0) 60%)',
    backgroundSize: '200% 100%',
    backgroundPosition: '100% 0',
  },
  animate: {
    backgroundPosition: ['500% 0', '0% 0'],
    transition: {
      duration: 1,
      ease: 'linear',
      repeat: Infinity,
    },
  },
};

const pulseAnimation = {
  initial: { opacity: 1 },
  animate: {
    opacity: [1, 0.5, 1],
    transition: {
      duration: 0.75,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

interface PlaceholderProps {
  width?: string;
  height?: string;
  shape?: 'square' | 'circle' | 'rectangle';
  animationType?: 'shimmer' | 'pulse' | 'none';
  className?: string;
  layoutId?: string;
}

const Placeholder: React.FC<PlaceholderProps> = ({
  width = '100%',
  height = '100%',
  shape = 'rectangle',
  animationType = 'shimmer',
  className = '',
  layoutId,
}) => {
  const shapeStyles =
    shape === 'circle'
      ? 'rounded-full'
      : shape === 'square'
      ? 'rounded-md'
      : 'rounded-lg';

  const animationVariants =
    animationType === 'shimmer'
      ? shimmerAnimation
      : animationType === 'pulse'
      ? pulseAnimation
      : {};

  return (
    <motion.div
      layoutId={layoutId}
      className={`bg-gray-300 w-full min-w-[${width}]  ${shapeStyles} ${className}`}
      style={{ height }}
      variants={animationVariants}
      initial='initial'
      animate='animate'
    ></motion.div>
  );
};

export default Placeholder;
