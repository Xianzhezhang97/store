'use client';
import React, { useState, useEffect, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setBackground } from '@/redux/slices/globalSlice';
import { Voucher as UserVoucher, FixedVoucher } from '@/types/userVoucher';

import components from '@/components';

export default function Card() {
  const { UserCard, VoucherList, Placeholder } = components;
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setBackground(true));
    return () => {
      dispatch(setBackground(false));
    };
  }, [dispatch]);
  return (
    <main className='flex flex-col items-center justify-between '>
      {/* User Card Module */}
      <motion.h1
        className='h1'
        initial={{
          opacity: 0,
          x: 10,
        }}
        animate={{
          opacity: 1,
          x: 0,
        }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ duration: 1 }}
      >
        Gobell Card
      </motion.h1>
      <AnimatePresence>
        <Suspense fallback={<div>loading</div>}>
          <UserCard user={user} />
        </Suspense>
      </AnimatePresence>

      {/* Voucher Module */}
      <motion.h2 layout className='h2'>
        You have {user.voucher ? user.voucher.length : 0} vouchers
      </motion.h2>
      <AnimatePresence>
        <Suspense fallback={<div>loading</div>}>
          <VoucherList vouchers={user.voucher as any} />
        </Suspense>
      </AnimatePresence>
    </main>
  );
}
