'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setGlobal } from '@/redux/slices/globalSlice';
import components from '@/components';
import useFetch from '@/api/useFetch';
import { addNotification } from '@/redux/slices/globalSlice';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { setMerchantsData } from '@/redux/slices/merchantSlice';

export default function OrderList() {
  const d = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const fetchData = useFetch();
  const { TopBg, CardApply } = components;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const order = useSelector((state: RootState) => state.order);

  useEffect(() => {
    dispatch(
      setGlobal({
        GobalPadding: false,
        Footer: false,
      }),
    );

    return () => {
      dispatch(
        setGlobal({
          GobalPadding: true,
          Footer: true,
        }),
      );
    };
  }, [dispatch]);

  return (
    <main className='flex flex-col h-full w-full relative'>
      <TopBg heading={'Find a Shop'} />

      <div className='   flex h-screen mt-[70px] w-full  z-20   page-padding '>
        <Suspense fallback={<div>Loading Shop Selector...</div>}>
          <CardApply />
        </Suspense>
      </div>
    </main>
  );
}
