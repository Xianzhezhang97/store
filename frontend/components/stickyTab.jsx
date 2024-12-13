'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentTab } from '@/redux/slices/orderSlice';
import { debounce } from 'lodash';

export default function OrderPanel({ bgColor = 'bg-white' }) {
  const dispatch = useDispatch();
  const [isSticky, setIsSticky] = useState(false);
  const ref = useRef(null);
  const order = useSelector((state) => state.order);

  // Handle scroll with debounce
  const handleScroll = debounce(() => {
    if (ref.current) {
      const sticky = ref.current.getBoundingClientRect().top <= 0;
      setIsSticky(sticky);
    }
  }, 300);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const tabs = [
    { name: 'All', label: 'All Order' },
    { name: 'Review', label: 'Review' },
    { name: 'Support', label: 'Support' },
  ];

  return (
    <AnimatePresence>
      <div className='top-0 z-40 col-span-12 sticky lg:col-span-12'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.45, ease: 'easeInOut' }}
        >
          <div
            ref={ref}
            className={`flex flex-col card-padding top-2 z-50 transition-all duration-1000 sticky items-start  ${
              isSticky
                ? ' wipe-in-down bg-gradient-to-b from-neutral via-[70%] via-neutral to-transparent  pb-8'
                : `${bgColor} card-rounded `
            }`}
          >
            <p className='font-semibold text-xs text-gray-400'>My Order</p>
            <div className='flex space-x-6 mt-2 w-full items-baseline'>
              {tabs.map((tab) => (
                <div key={tab.name} className='flex-col center'>
                  <button
                    className={`transition-all ${
                      order.currentTab === tab.name
                        ? 'font-bold text-primary'
                        : 'text-gray-500'
                    }`}
                    onClick={() => dispatch(setCurrentTab(tab.name))}
                  >
                    {tab.label}
                  </button>
                  {order.currentTab === tab.name && (
                    <motion.div
                      className='bg-hover rounded-full h-1 mt-2 w-[30px] z-50 solid'
                      layoutId='activeTabIndicator'
                      transition={{ type: 'spring', stiffness: 70 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
