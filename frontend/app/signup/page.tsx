'use client';
import React, { useEffect } from 'react';
import components from '@/components';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
const logo = '/graph/logo.svg';
import { useDispatch } from 'react-redux';
import {
  uniqueStyle,
  generalStyle,
  setGlobal,
} from '@/redux/slices/globalSlice';

export default function Payment() {
  const { Signup, Logo } = components;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(uniqueStyle());
    dispatch(
      setGlobal({
        Footer: false,
      }),
    );

    return () => {
      dispatch(generalStyle());
    };
  }, [dispatch]);

  return (
    <div className='bg-gradient-to-bl from-secondary to-white flex  flex-col h-full min-h-screen p-xl relative  items-center justify-between '>
      {/* <h1 className='h1'> Payment</h1> */}
      <motion.div
        layoutId='LoginContainer'
        transition={{ duration: 1 }}
        className='flex h-[80px] mt-[70px] w-full max-w-3xl gap-2 items-center'
      >
        <Logo
          className={'max-w-[50px] mb-2  h-[50px] fill-primary pr-4 flex'}
        />
        <h2 className='flex font-bold   mt-4 text-primary mb-6 tracking-wider text-[2em]  gap-4 items-baseline justify-center '>
          Sign Up
        </h2>
      </motion.div>
      <div className='top-xl left-xl opacity-90 -z-10 absolute'>
        <Image
          src={logo}
          alt='Logo'
          className='h-auto fill-primary'
          width={50}
          height={50}
          priority
        />
      </div>
      {/* <Signup /> */}
      <Signup />
    </div>
  );
}
