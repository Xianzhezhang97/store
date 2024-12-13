'use client';
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function acountPannel() {
  return (
    <AnimatePresence>
      <motion.div
        layoutId='topBg'
        className='bg-secondary flex flex-col h-[200px]  text-primary w-full relative  justify-between '
      >
        {/* Logo Background */}
        <div className='opacity-100  top-[30%] right-10 z-10 absolute'>
          <motion.svg
            layoutId='Logo'
            transition={{ duration: 3 }}
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            viewBox='0 0 84 86'
            width='80'
            height='80'
            className='fill-[#ffffff]/30 z-10'
          >
            <path d='M 14.98 43.01 Q 23.39 49.97 29.28 54.44 Q 31.28 55.96 34.19 54.19 Q 34.34 54.10 40.70 49.67 A 4.49 4.47 -47.4 0 1 45.50 49.46 L 53.98 54.36 A 5.11 5.11 0.0 0 0 59.33 54.21 Q 68.25 48.37 68.62 48.13 C 73.11 45.26 76.66 43.92 81.65 44.05 A 1.88 1.88 0.0 0 1 83.39 45.33 Q 83.81 46.59 82.84 47.57 Q 80.40 50.03 47.63 80.63 Q 45.66 82.47 42.15 81.76 Q 40.42 81.41 38.41 79.39 Q 38.35 79.32 5.85 48.47 Q 2.14 44.94 3.45 41.40 Q 4.14 39.54 7.11 36.52 Q 14.66 28.86 37.80 5.61 Q 40.27 3.13 42.16 2.58 Q 45.46 1.63 48.34 4.48 Q 64.50 20.48 82.93 38.55 Q 83.41 39.02 83.49 40.04 A 1.83 1.83 0.0 0 1 81.66 42.01 L 15.35 42.01 Q 13.77 42.01 14.98 43.01 Z M 46.3139 18.5023 A 3.71 3.71 0.0 0 0 41.0674 18.4565 L 36.7023 22.7461 A 3.71 3.71 0.0 0 0 36.6565 27.9926 L 40.9461 32.3577 A 3.71 3.71 0.0 0 0 46.1926 32.4035 L 50.5577 28.1139 A 3.71 3.71 0.0 0 0 50.6035 22.8674 L 46.3139 18.5023 Z' />
          </motion.svg>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
