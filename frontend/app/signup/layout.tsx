'use client';
import { Inter } from 'next/font/google';
import { Provider, useSelector } from 'react-redux';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { store, RootState } from '@/redux/store';
import ReturnBtn from '@/components/returnBtn';

function Content({ children }: { children: React.ReactNode }) {
  return <motion.div>{children}</motion.div>;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Content>
        {children}
        <div className='h-0 opacity-0 top-0 right-0 bottom-0 left-0 w-0 absolute'>
          <ReturnBtn />
        </div>
        <Link
          href={'/'}
          className='bg-backdrop-lg rounded-full bg-black/20 h-[50px] top-4 right-4 w-[50px] center fixed'
        >
          <i className='flex fi fi-rr-cross '> </i>
        </Link>
      </Content>
    </Provider>
  );
}
