'use client';
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { updateOrderStatus } from '@/redux/slices/orderSlice';
import components from '@/components/index';
const defaultTransition = { duration: 0.9, ease: [0.22, 0.9, 0.1, 1] };

export default function OrderPanel({ orderprop }) {
  const dispatch = useDispatch();
  const { Money, OrderItem } = components;

  const [currentTab, setCurrentTab] = useState('All');

  const tabs = [
    { name: 'All', label: 'All' },
    { name: 'Review', label: 'Review' },
    { name: 'Support', label: 'Support' },
  ];

  const filteredOrders = orderprop.orders.filter((order) => {
    return currentTab === 'All' || order.status === currentTab;
  });

  const handleUpdateOrderStatus = useCallback(
    (orderId, newStatus) => {
      dispatch(updateOrderStatus({ orderId, newStatus }));
    },
    [dispatch],
  );

  return (
    <AnimatePresence>
      <motion.div className='w-full'>
        <div className=' grid grid-gap grid-cols-12 items-center'>
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id + index}
              layoutId={'order' + order.id}
              transition={defaultTransition}
              className='bg-body col-span-12 card-padding card-rounded'
            >
              <Link
                href={`/order/${order.id}`}
                key={'order' + order.id}
                className='flex flex-col gap-4 '
              >
                <div className='flex w-full justify-between'>
                  <div className='flex flex-col'>
                    {/* Store Name */}
                    <p className='font-semibold text-sm line-clamp-1'>
                      {order.store} - <i className=' mr-1 fi fi-sr-marker'></i>
                      {order.location.split(',')[0]}
                    </p>
                    {/* Order Time */}
                    <p className='-mt-1/2 text-left text-xs text-gray-500'>
                      {order.time}
                    </p>
                  </div>
                  {/* Order Status */}
                  <p className='flex font-semibold text-muted text-sm '>
                    {order.status}
                  </p>
                </div>

                {order.items.map((item, index) => (
                  <div key={index + item.id}>
                    <OrderItem item={item} id={index} type={'previews'} />
                  </div>
                ))}

                <div className='flex mt-8 text-primary w-full opacity-75 gap-2 items-baseline justify-end '>
                  {/* <div className='flex gap-2 items-baseline'>
                  <p className='text-xs'>Subtotal</p>
                  <Money amount={order.subtotal} size={[2, 3]} />
                </div> */}
                  {order.subtotal - order.total !== 0 && (
                    <div className='flex text-hover gap-2 items-baseline'>
                      <p className='text-xs'>Save</p>
                      <Money
                        amount={order.subtotal - order.total}
                        size={[1, 3]}
                      />
                    </div>
                  )}
                  <div className='flex text-black gap-2 items-baseline'>
                    <p className='text-xs'>Total</p>
                    <Money amount={order.total} size={[2, 5]} />{' '}
                  </div>
                </div>
              </Link>

              <div className='flex mt-4  gap-2 justify-end'>
                <button
                  className='cbutton'
                  onClick={() => handleUpdateOrderStatus(order.id, 'Confirmed')}
                >
                  Confirm
                </button>
                <button
                  className='cbutton'
                  onClick={() => handleUpdateOrderStatus(order.id, 'Reviewed')}
                >
                  Review
                </button>
                <button
                  className='cbutton'
                  onClick={() => handleUpdateOrderStatus(order.id, 'Reviewed')}
                >
                  Reorder
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
