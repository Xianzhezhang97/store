'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setGlobal } from '@/redux/slices/globalSlice';
import components from '@/components';

export default function OrderList() {
  const { StickyTab, TopBg, OrderPannel } = components;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const order = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(
      setGlobal({
        GobalPadding: false,
      }),
    );
    return () => {
      dispatch(
        setGlobal({
          GobalPadding: true,
        }),
      );
    };
  }, [dispatch]);

  return (
    <main className='flex flex-col h-full w-full relative'>
      <TopBg heading={'Order history'} />
      <div className='mt-[100px] w-full   top-0 z-50 sticky'>
        <StickyTab bgColor='bg-neutral' />
      </div>

      <div className='   w-full top-[100px] z-20  page-padding  sticky '>
        <AnimatePresence>
          {user.isLoggedIn ? (
            <div className='flex flex-col'>
              <OrderPannel orderprop={order} />
            </div>
          ) : (
            <div className='flex flex-col gap-4 items-start'>Please Log in</div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
