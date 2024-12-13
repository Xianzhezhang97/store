'use client';

import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import Image from 'next/image';
import { setGlobal } from '@/redux/slices/globalSlice';
// import { addOrder } from '@/redux/slices/orderSlice'; // 假设有一个管理订单的切片
import components from '@/components';

export default function RewardStore() {
  const { Logo, TopBg } = components;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(setGlobal({ GobalPadding: false }));
    return () => {
      dispatch(setGlobal({ GobalPadding: true }));
    };
  }, [dispatch]);

  const rewardItems = useMemo(
    () => [
      {
        id: 1,
        name: 'Gift Card',
        image: '/images/gift-card.jpg',
        points: 500,
        description: 'A $10 Gift Card',
      },
      {
        id: 2,
        name: 'Coffee Mug',
        image: '/images/gift-card.jpg',
        points: 200,
        description: 'A stylish coffee mug.',
      },
      {
        id: 3,
        name: 'Bluetooth Speaker',
        image: '/images/gift-card.jpg',
        points: 1000,
        description: 'A portable Bluetooth speaker.',
      },
      {
        id: 3,
        name: 'Bluetooth Speaker',
        image: '/images/gift-card.jpg',
        points: 3000,
        description: 'A portable Bluetooth speaker.',
      },
      {
        id: 3,
        name: 'Bluetooth Speaker',
        image: '/images/gift-card.jpg',
        points: 5000,
        description: 'A portable Bluetooth speaker.',
      },
      {
        id: 3,
        name: 'Bluetooth Speaker',
        image: '/images/gift-card.jpg',
        points: 1000,
        description: 'A portable Bluetooth speaker.',
      },
      {
        id: 3,
        name: 'Bluetooth Speaker',
        image: '/images/gift-card.jpg',
        points: 1000,
        description: 'A portable Bluetooth speaker.',
      },
    ],
    [],
  );

  // 处理兑换商品的逻辑
  const handleRedeem = (itemId: number, itemPoints: number) => {
    if (user.credit >= itemPoints) {
      // 假设 addOrder 是一个用于添加订单的 Redux action
      // dispatch(addOrder({ userId: user.id, itemId, points: itemPoints }));
      alert(`Successfully redeemed ${itemPoints} points for item #${itemId}!`);
    } else {
      alert('Insufficient points for this item.');
    }
  };

  return (
    <main className='flex flex-col h-full w-full relative'>
      <TopBg heading={'Reward Store'} />
      <div className='mt-[100px] w-full top-0 z-10 sticky'>
        <div className='w-full grid grid-gap grid-cols-12  card-padding'>
          {rewardItems.map((item) => (
            <div
              key={item.id}
              className='bg-white flex  flex-col h-full col-span-6 justify-between card-rounded  overflow-hidden sm:col-span-6  md:col-span-4 lg:col-span-2'
            >
              <div className='bg-third  flex flex-shrink-0 h-[140px] text-xs w-full overflow-hidden relative'>
                <Logo className=' fill-white p-7  animate-pulse z-0 absolute' />
              </div>
              <div className='flex   flex-col h-full  justify-between card-padding '>
                <h3 className='font-bold text-primary mb-2 line-clamp-1'>
                  {item.name}
                </h3>
                <p className='text-sm mb-4 text-gray-600'>{item.description}</p>
                <p className='font-semibold text-xs mb-1 text-yellow-500'>
                  Points Required: {item.points}
                </p>
                <p className='font-semibold text-xs text-primary mb-2'>
                  ( {user.credit} available )
                </p>
                <button
                  onClick={() => handleRedeem(item.id, item.points)}
                  className='flex w-full sbutton !rounded-md'
                  disabled={user.credit < item.points}
                >
                  {user.credit >= item.points ? 'Redeem' : 'Insufficient'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
