'use client';
import React, { useEffect, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setGlobal } from '@/redux/slices/globalSlice';

import components from '@/components';

export default function Card() {
  const dispatch = useDispatch();
  const { TopBg, CardPolicy } = components;
  const user = useSelector((state: RootState) => state.user);
  const order = useSelector((state: RootState) => state.order);

  useEffect(() => {
    // 页面加载时设置状态
    dispatch(
      setGlobal({
        GobalPadding: false,
        TabBar: false,
      }),
    );

    return () => {
      dispatch(
        setGlobal({
          GobalPadding: true,
          TabBar: true,
        }),
      );
    };
  }, [dispatch]);

  return (
    <main className='flex flex-col page-padding items-center justify-center'>
      <Suspense fallback={<div>loading</div>}>
        <CardPolicy />
      </Suspense>
    </main>
  );
}
