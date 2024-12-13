import React from 'react';
import { motion } from 'framer-motion';
import { Provider, useSelector } from 'react-redux';
import { store, RootState } from '@/redux/store';

export default function Footer() {
  const global = useSelector((state: RootState) => state.global);
  return (
    global.Footer && (
      <motion.div
        layoutId='FooterLayout'
        className='flex flex-col w-full pb-[20vh]  justify-center items-center'
      >
        <div className='flex text-muted text-xs w-full pt-4 justify-center'>
          All rights reserved by Scott Cheung
        </div>
        <div className='flex text-muted text-xs w-full pt-4 justify-center'>
          Copyright © 2023-2024
        </div>
      </motion.div>
    )
  );
}
