'use client';

import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setGlobal } from '@/redux/slices/globalSlice';
import components from '@/components';

export default function Card() {
  const { AccountBG, Placeholder, AccountPannel, OrderPannel } = components;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const order = useSelector((state: RootState) => state.order);

  useEffect(() => {
    // 页面加载时设置状态
    dispatch(
      setGlobal({
        GobalPadding: false,
      }),
    );

    // 清理函数，在页面卸载时恢复初始状态
    return () => {
      dispatch(
        setGlobal({
          GobalPadding: true,
        }),
      );
    };
  }, [dispatch]);

  return (
    <main className='flex flex-col h-full w-full'>
      <div className=' mt-[100px] w-full z-20 page-padding'>
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
