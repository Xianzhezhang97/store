import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ReturnBtn from './returnBtn';

export default function topBg({ heading }) {
  return (
    <AnimatePresence>
      <motion.div
        layoutId='topBg'
        transition={{ duration: 0.9, ease: [0.22, 0.9, 0.1, 1] }}
        className='bg-white border-b flex h-[70px] w-full px-2 top-0 z-50 fixed items-center justify-between'
      >
        <ReturnBtn />
        <motion.h2
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          transition={{ duration: 1 }}
          className='flex w-full center h4'
        >
          {heading}
        </motion.h2>
      </motion.div>
    </AnimatePresence>
  );
}
