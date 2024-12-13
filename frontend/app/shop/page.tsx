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

export default function OrderList() {
  const [merchantsData, setMerchantsData] = useState([]);
  const d = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const fetchData = useFetch();
  const { StickyTab, TopBg, ShopSelector } = components;
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
    fetchData('/merchant/list/', 'GET')
      .then((response) => {
        switch (response.code) {
          case 200:
            // console.log( response.data );
            setMerchantsData(response.data);

            break;
          default:
            d(
              addNotification({
                id: uuidv4(),
                isOpen: true,
                Message: t(
                  'An unexpected error occurred. Please try again later.',
                ),
                Type: 'error',
              }),
            );
            break;
        }
      })
      .catch((error) => {
        // d(
        //   addNotification({
        //     id: uuidv4(),
        //     isOpen: true,
        //     Message: t('Internet Error.'),
        //     Type: 'error',
        //   }),
        // );
      });

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

      <div className='   flex h-screen w-full top-[70px] z-20  fixed  '>
        <Suspense fallback={<div>Loading Shop Selector...</div>}>
          <ShopSelector />
        </Suspense>
      </div>
    </main>
  );
}
