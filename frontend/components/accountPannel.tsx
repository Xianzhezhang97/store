'use client';
import React, { useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { userType } from '@/types/userType';
import components from '@/components';

interface AccountPanelProps {
  userprop: userType; // 使用 UserState 类型来定义 userprop 的类型
}

export default function AccountPanel({ userprop }: AccountPanelProps) {
  const { Money, Avatar } = components;

  // 使用 useMemo 缓存会员等级和进度的计算
  const membershipGrowth = useMemo(() => {
    const level = Math.floor(userprop.growth / 1000);
    const progress = userprop.growth % 1000;
    const progressPercentage = (progress / 1000) * 100;
    return { level, progress, progressPercentage };
  }, [userprop.growth]);

  return (
    <AnimatePresence>
      <motion.div layoutId='acountPannel' className='h-full w-full z-0'>
        {/* User Avatar and Name */}
        <Link href='/account/profile' className='gap-4 start items-center'>
          <Avatar />
          <p className='flex font-semibold text-md text-white items-center'>
            {userprop.name}
            <i className='flex fi fi-rr-angle-small-right'></i>
          </p>
        </Link>

        {/* Balance and Points */}
        <div className='mt-3 grid-gap grid grid-cols-12 items-center'>
          {/* Membership Growth */}
          <div className='bg-white flex flex-col w-full col-span-12 items-start card-padding card-rounded lg:col-span-6'>
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
                  duration: 2,
                  type: 'spring',
                }}
                className='bg-secondary rounded-full h-3'
              />
            </motion.div>
          </div>

          {/* Credit and Balance Section */}
          <InfoCard label='CREDIT' value={userprop.credit} index={1} />
          <InfoCard
            label='BALANCE'
            index={2}
            value={<Money amount={userprop.balance} size={[2, 5]} />}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// 通用的 InfoCard 组件
const InfoCard = ({
  label,
  value,
  index,
}: {
  label: string;
  value: React.ReactNode;
  index: number;
}) => (
  <Link
    href={`/account/${label.toLocaleLowerCase()}`}
    className='h-full  col-span-6 lg:col-span-3'
  >
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className='bg-white flex flex-col h-full flex-1 w-full items-start card-padding card-rounded'
      transition={{ delay: index * 0.15, ease: 'easeInOut' }}
    >
      <p className='font-semibold text-xs text-[#000000]/40'>{label}</p>
      <h2 className='font-semibold text-xl text-primary'>{value}</h2>
    </motion.div>
  </Link>
);
