import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';

export default function Avatar() {
  const user = useSelector((state: RootState) => state.user);
  return (
    <motion.div
      transition={{ duration: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className='bg-neutral rounded-full flex-shrink-0 h-[50px] w-[50px] center overflow-hidden'
    >
      {user.avatar ? (
        <Image
          src={user.avatar}
          alt='Logo'
          className='bg-secondary rounded-full flex fill-[#ffffff] center'
          width={50}
          height={50}
          priority
        />
      ) : (
        <div className='bg-neutral rounded-full h-[50px] p-3 w-[50px] center'>
          <i className='mt-5 text-gray-300 text-5xl fi fi-sr-user'></i>
        </div>
      )}
    </motion.div>
  );
}
