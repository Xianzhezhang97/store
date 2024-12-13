'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import components from '@/components';
import { uniqueStyle, generalStyle } from '@/redux/slices/globalSlice';

export default function OrderDetail() {
  const { TopBg, OrderDetail } = components;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(uniqueStyle());
    return () => {
      dispatch(generalStyle());
    };
  }, [dispatch]);

  return (
    <main className='flex flex-col h-full w-full'>
      <TopBg heading={'Order Detail'} />
      <div className='flex flex-col mt-[100px] w-full  z-20 page-padding '>
        <OrderDetail />
      </div>
    </main>
  );
}
