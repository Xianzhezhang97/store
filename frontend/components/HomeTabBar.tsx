'use client';
import React, { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setTabBar } from '@/redux/slices/globalSlice';
import { fetchProfile } from '@/api/Methods/fetchProfile';
import { fetchTranscation } from '@/api/Methods/fetchTranscation';
import { useTranslation } from 'next-i18next';

interface TabItem {
  name: string;
  icon: string;
  href: string;
  showTabBar: boolean;
  padding: boolean;
  visible: boolean;
}

interface HomeTabBarProps {
  tabs: TabItem[];
}

export default function HomeTabBar({ tabs }: HomeTabBarProps) {
  const [selectedTab, setSelectedTab] = React.useState<string | null>(null);
  const [showTabBar, setShowTabBar] = React.useState<boolean>(true);
  const global = useSelector((state: RootState) => state.global);
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { t } = useTranslation();

  useEffect(() => {
    setSelectedTab(pathname);
    user.isLoggedIn === false &&
      localStorage.getItem('tokenValid') === 'true' &&
      fetchProfile(dispatch, t);

    const currentTab = tabs.find(
      (tab) => tab.href.toLowerCase() === pathname.toLowerCase(),
    );

    if (currentTab) {
      setShowTabBar(currentTab.visible);
      dispatch(setTabBar(currentTab.visible));
    }
  }, [pathname, tabs, dispatch]);

  return (
    <motion.section
      initial={{ bottom: '-100px' }}
      animate={{ bottom: global.TabBar ? '0' : '-100px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`bg-white border-t flex h-[70px] w-full py-4 z-40 fixed justify-around items-center`}
    >
      {tabs.map((tab, index) => (
        <Link
          key={index}
          href={tab.href}
          onClick={() => {
            dispatch(setTabBar(tab.visible));
          }}
          className={`flex flex-col transition-all duration-300 items-center justify-center gap-1 ${
            tab.href.toLowerCase() === selectedTab?.toLowerCase()
              ? 'text-link scale-105'
              : 'text-gray-500'
          }`}
          style={{ width: `${100 / tabs.length}%` }}
        >
          <i className={`flex transition-all text-2xl ${tab.icon}`}></i>
          <span className='flex text-xs transition-all duration-500'>
            {tab.name}
          </span>
          {tab.padding && <div className='bg-primary  h-[3px] w-[100%]'></div>}
        </Link>
      ))}
    </motion.section>
  );
}
