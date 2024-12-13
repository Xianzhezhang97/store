'use client';
import React, { useEffect, useRef, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import JsBarcode from 'jsbarcode';
import components from '@/components';
import Logo from '../Logo';
import { useSelector, useDispatch } from 'react-redux';
import { addNotification } from '@/redux/slices/globalSlice';
import { useTranslation } from 'next-i18next';
import { v4 as uuidv4 } from 'uuid';

const defaultTransition = { duration: 0.9, ease: [0.22, 0.9, 0.1, 1] };

interface CardProps {
  user: {
    name: string;
    balance: number;
    credit: number;
    type: string;
    member_id: number;
    isLoggedIn: boolean;
  };
}

export default function Card({ user }: CardProps) {
  const barcodeRef = useRef(null);
  const { Money } = components;
  const d = useDispatch();
  const { t } = useTranslation();

  const [isTokenValid, setIsTokenValid] = useState<boolean | undefined>(
    undefined,
  );

  // 使用 useMemo 生成条形码，只有在 member_id 变化时重新计算
  const paddedMemberId = useMemo(
    () => String(user.member_id).padStart(9, '0'),
    [user.member_id],
  );

  useEffect(() => {
    // 仅在客户端获取 tokenValid 的值
    const tokenValid = localStorage.getItem('tokenValid') === 'true';
    setIsTokenValid(tokenValid);
  }, []);

  useEffect(() => {
    // Generate the barcode
    if (barcodeRef.current) {
      JsBarcode(barcodeRef.current, paddedMemberId, {
        format: 'CODE128',
        displayValue: false,
        width: 3,
        height: 50,
        margin: 20,
        background: 'transparent',
        textPosition: 'bottom',
      });
    }
  }, [paddedMemberId]);

  const handleRedeem = () => {
    d(
      addNotification({
        id: uuidv4(),
        isOpen: true,
        Message: t(
          'Redeem function is testing inside, looking forward to seeing you all not soon.',
        ),
        Type: 'info',
        closeButton: true,
        timeout: 8000,
      }),
    );
  };

  const handleTopUp = () => {
    d(
      addNotification({
        id: uuidv4(),
        isOpen: true,
        Message: t('TopUp card is unavailable.'),
        Type: 'warning',
      }),
    );
  };

  return (
    <AnimatePresence>
      <motion.div
        layoutId='topBg'
        transition={defaultTransition}
        className='bg-secondary rounded-lg flex flex-col h-auto shadow-l my-8 text-primary w-full relative overflow-hidden justify-between '
      >
        {/* Logo policy button */}
        <Link
          href='/card/card-policy'
          className='top-md right-md z-40 absolute'
        >
          <div className='bg-white rounded-full flex h-10 p-2 w-10 items-center justify-center'>
            <Logo className={'w-full h-full fill-primary'} />
          </div>
        </Link>
        {/* Logo Background */}
        <div className='opacity-20 top-[5%] right-5 z-0 absolute'>
          <motion.svg
            layoutId='Logo'
            transition={{ duration: 3 }}
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            viewBox='0 0 84 86'
            width='260'
            height='260'
            className='fill-[#796546]'
          >
            <path d='M 14.98 43.01 Q 23.39 49.97 29.28 54.44 Q 31.28 55.96 34.19 54.19 Q 34.34 54.10 40.70 49.67 A 4.49 4.47 -47.4 0 1 45.50 49.46 L 53.98 54.36 A 5.11 5.11 0.0 0 0 59.33 54.21 Q 68.25 48.37 68.62 48.13 C 73.11 45.26 76.66 43.92 81.65 44.05 A 1.88 1.88 0.0 0 1 83.39 45.33 Q 83.81 46.59 82.84 47.57 Q 80.40 50.03 47.63 80.63 Q 45.66 82.47 42.15 81.76 Q 40.42 81.41 38.41 79.39 Q 38.35 79.32 5.85 48.47 Q 2.14 44.94 3.45 41.40 Q 4.14 39.54 7.11 36.52 Q 14.66 28.86 37.80 5.61 Q 40.27 3.13 42.16 2.58 Q 45.46 1.63 48.34 4.48 Q 64.50 20.48 82.93 38.55 Q 83.41 39.02 83.49 40.04 A 1.83 1.83 0.0 0 1 81.66 42.01 L 15.35 42.01 Q 13.77 42.01 14.98 43.01 Z M 46.3139 18.5023 A 3.71 3.71 0.0 0 0 41.0674 18.4565 L 36.7023 22.7461 A 3.71 3.71 0.0 0 0 36.6565 27.9926 L 40.9461 32.3577 A 3.71 3.71 0.0 0 0 46.1926 32.4035 L 50.5577 28.1139 A 3.71 3.71 0.0 0 0 50.6035 22.8674 L 46.3139 18.5023 Z' />
          </motion.svg>
        </div>
        <div className='p-[28px] z-20'>
          {/* Member Info */}
          <div>
            <p className='font-semibold h-3 text-xs text-[#000000]/40'>
              MEMBER
            </p>
            {user.isLoggedIn && (
              <h2 className='font-semibold text-wrap text-2xl'>{user.name}</h2>
            )}

            {user.isLoggedIn === false && isTokenValid === false && (
              <h2 className='font-semibold text-wrap text-2xl'>
                Please Log in
              </h2>
            )}
            <p className='text-xs'>{paddedMemberId}</p>
          </div>

          {/* Balance and Points */}
          <div className='flex mt-6 items-center'>
            <div className='flex flex-col w-1/2 items-start'>
              <p className='font-semibold text-xs text-[#000000]/40'>CREDIT</p>
              <h2 className='font-semibold text-xl'>{user.credit}</h2>
            </div>
            <div className='flex flex-col w-1/2 items-start'>
              <p className='font-semibold text-xs text-[#000000]/40'>BALANCE</p>
              {/* 第一个参数是多少钱，第二参数控制整数，小数部分大小 */}
              <Money amount={user.balance} size={[2, 5]} />
            </div>
          </div>
        </div>

        {/* Barcode */}
        <div className='border-y flex justify-center items-center'>
          <svg className='flex w-full' ref={barcodeRef}></svg>
        </div>

        {/* Actions */}
        <div className='divide-x flex text-sm items-center justify-between'>
          <button
            onClick={handleTopUp}
            className='font-semibold flex-1 text-black text-center py-6 px-2 center'
          >
            Top up balance
          </button>
          <button
            onClick={handleRedeem}
            className='font-semibold flex-1 text-black text-center py-6 px-2 center'
          >
            Redeem gift card
          </button>
        </div>
        <AnimatePresence>
          {!user.isLoggedIn && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1, duration: 2, ease: [0.22, 0.9, 0.1, 1] }}
              className='rounded-lg  h-full bg-black/20 w-full p-16 z-30 center absolute backdrop-blur-sm'
            >
              <Link href='/login' className='bg-white/50 w-full sbutton'>
                Go to Login
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
}
