'use client';
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { userType } from '@/types/userType';
import components from '@/components';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';

const defaultTransition = { duration: 0.9, ease: [0.22, 0.9, 0.1, 1] };

const avater = '/graph/avater.png';

interface AccountPanelProps {
  userprop: userType; // 使用 UserState 类型来定义 userprop 的类型
}

export default function AccountPanel() {
  const { Money, Logo, Avatar } = components;
  const user = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();

  // 使用 useMemo 缓存会员等级和进度的计算
  const membershipGrowth = useMemo(() => {
    const level = Math.floor(user.growth / 1000);
    const progress = user.growth % 1000;
    const progressPercentage = (progress / 1000) * 100;
    return { level, progress, progressPercentage };
  }, [user.growth]);

  return (
    <AnimatePresence>
      <motion.div layoutId='acountPannel' className=' h-full w-full z-0'>
        {/* User Avatar and Name */}

        <div className='gap-4 start items-center'>
          {' '}
          <Link href='/account/profile' className='gap-4 start items-center'>
            <Avatar />
          </Link>
          {!user.isLoggedIn && (
            <Link href='/login'>
              <p className='flex font-semibold text-sm text-muted items-center'>
                {t('Log in / Sign Up')}
                <i className='flex fi fi-rr-angle-small-right'></i>
              </p>
            </Link>
          )}
        </div>

        {/* Balance and Points */}
        <div className='mt-3 grid-gap grid grid-cols-12 items-center'>
          {/* Order Section */}
          <Link
            href={'/shop'}
            className=' flex flex-col h-full w-full grid-gap col-span-6 items-start card-rounded lg:col-span-6'
          >
            <motion.div
              layoutId='topBg'
              transition={defaultTransition}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className={`bg-secondary  items-end flex flex-col justify-center w-full h-full min-h-[200px] relative col-span-6  card-padding card-rounded lg:col-span-3 `}
            >
              <h2 className='flex font-semibold h-full text-primary text-xl  w-full tracking-[8px] z-10 items-end justify-center'>
                ORDER
              </h2>

              <Logo className='flex h-[7em] fill-white opacity-45 top-2 right-2 left-2 w-[7em] z-0 absolute' />
            </motion.div>
          </Link>
          {/* Credit and Balance Section */}
          <div className=' flex flex-col h-full w-full grid-gap col-span-6 items-start card-rounded lg:col-span-6'>
            <InfoCard
              label='CREDIT'
              value={user.credit}
              index={2}
              color={'neutral'}
            />
            <InfoCard
              label='BALANCE'
              index={3}
              value={<Money amount={user.balance} size={[2, 5]} />}
              color={'neutral'}
            />
          </div>
          {/* Membership Growth */}
          <motion.div className='bg-white flex flex-col  w-full p-1 col-span-12 items-start card-rounded lg:col-span-6'>
            <div className='flex w-full justify-between'>
              <p className='font-semibold text-xs text-[#000000]/40'>
                MEMBERSHIP GROWTH
              </p>
              <div className='border border-secondary rounded-full px-2  center '>
                <Image
                  src={'/graph/vipType.png'}
                  alt='Logo'
                  className=' flex -ml-1 center'
                  width={30}
                  height={30}
                  priority
                />
                <p className='font-semibold text-sm -ml-1 animate-pulse text-yellow-900 items-baseline'>
                  {membershipGrowth.level}
                </p>
              </div>
            </div>

            <div className='flex font-semibold mt-4 text-lg text-secondary -mb-4 w-full justify-start'>
              <p className='flex'>{membershipGrowth.progress} / 1000</p>
            </div>

            {/* Progress Bar */}
            <motion.div className='rounded-full flex bg-gray-200 h-3 my-6 w-full items-center darrk:bg-gray-700'>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{
                  width: `${membershipGrowth.progressPercentage}%`,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: 1,
                  duration: 2,
                  type: 'spring',
                }}
                className='bg-secondary rounded-full h-3'
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// 通用的 InfoCard 组件
const InfoCard = ({
  label,
  color,
  value,
  index,
}: {
  label: string;
  color: string;
  value: React.ReactNode;
  index: number;
}) => (
  <Link
    href={`/account/${label.toLocaleLowerCase()}`}
    className='h-full  w-full col-span-6 lg:col-span-3'
  >
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ delay: index * 0.15, ease: 'easeInOut' }}
      className={`bg-${color} flex flex-col justify-between h-full flex-1  relative w-full items-start card-padding card-rounded  `}
    >
      <p className='flex font-semibold text-xs text-[#000000]/40'>{label}</p>
      <h2 className='flex font-semibold h-full flex-1 text-xl text-primary'>
        {value}
      </h2>
    </motion.div>
  </Link>
);
