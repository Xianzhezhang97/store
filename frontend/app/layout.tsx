'use client';
import { Inter } from 'next/font/google';
import { Provider, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { store, RootState } from '@/redux/store';
import './global.css';
import components from '@/components';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });
interface TabItem {
  name: string;
  icon: string;
  href: string;
  showTabBar: boolean;
  padding: boolean;
  visible: boolean;
}

function Content({ children }: { children: React.ReactNode }) {
  const { HomeTabBar, Footer, staticData, GlobalNotification } = components;
  const global = useSelector((state: RootState) => state.global);

  return (
    <html
      lang='en'
      className={`${
        !global.Scroll && 'overflow-hidden'
      } w-screen h-screen relative  ${
        global.Background ? 'bg-white' : 'bg-gray-200/40'
      }  darrk:bg-gray-900 overflow-x-hidden scroll-smooth`}
    >
      <link
        rel='icon'
        href='https://3o.hk/images/2024/01/14/avatar.th.jpg'
        type='image/x-icon'
      />
      <body className={inter.className}>
        <GlobalNotification />
        <motion.div
          className={`
            ${
              global.GobalPadding && 'page-padding'
            } transition-all easeOut duration-1000`}
        >
          {children}
        </motion.div>
        <HomeTabBar tabs={staticData.tabs as TabItem[]} />
        <Footer />
      </body>
    </html>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Content>{children}</Content>
    </Provider>
  );
}
