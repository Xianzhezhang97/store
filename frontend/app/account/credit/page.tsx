'use client';

import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { setGlobal } from '@/redux/slices/globalSlice';
import components from '@/components';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { fetchTranscation } from '@/api/Methods/fetchTranscation';

const { Avatar, Transaction } = components;

const defaultTransition = { duration: 0.9, ease: [0.22, 0.9, 0.1, 1] };

export default function Card() {
  const { InputEdit, TopBg } = components;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    dispatch(setGlobal({ GobalPadding: false, TabBar: false }));
    fetchTranscation(dispatch, t);

    return () => {
      dispatch(setGlobal({ GobalPadding: true }));
    };
  }, [dispatch]);

  return (
    <main className='flex flex-col w-full '>
      <TopBg heading={'Credit history'} />

      <motion.div className='second-page page-padding'>
        <Transaction defaultTab={'credit'} />
      </motion.div>
    </main>
  );
}
