'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setBackground } from '@/redux/slices/globalSlice';
import components from '@/components';
import { useTranslation } from 'next-i18next';

export default function HomePage() {
  const { HomePannel } = components;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const order = useSelector((state: RootState) => state.order);
  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setBackground(true));

    return () => {
      dispatch(setBackground(false));
    };
  }, []);

  return (
    <main className='flex flex-col h-full w-full'>
      <motion.h1 layout className='h1'>
        Good day, {user.name !== 'Login' ? user.name : 'my friend'}!
      </motion.h1>
      <div className='mt-[30px] w-full z-20'>
        <HomePannel />
      </div>
    </main>
  );
}
