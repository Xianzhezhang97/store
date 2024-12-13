import React from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Money from './Money.jsx';
import Logo from './Logo.jsx';

export default function orderItem({ item, id, type }) {
  return (
    <AnimatePresence>
      <motion.div
        key={id + item.name}
        layoutId={id + item.name}
        className='w-full'
      >
        <div className='flex grid-gap items-stretch'>
          <div
            className={`${
              type === 'previews'
                ? 'w-20 h-20 card-rounded'
                : 'w-12 h-12 rounded-sm'
            } bg-third flex flex-shrink-0  text-xs   overflow-hidden relative`}
          >
            {item.image && (
              <Image
                className='h-full object-cover w-full z-20'
                src={item.image}
                alt={item.name}
                width={64}
                height={64}
              />
            )}
            <Logo className=' fill-white p-2  animate-pulse z-0 absolute' />
          </div>
          <div className='flex flex-col text-sm w-full text-gray-700'>
            <div className='flex w-full justify-between items-start'>
              <span className='flex flex-col flex-1 text-primary'>
                <p
                  className={`${
                    type === 'previews'
                      ? 'text-lg line-clamp-1 mr-3'
                      : 'text-md '
                  }  font-semibold `}
                >
                  {item.name}
                </p>
                <div
                  className={`${
                    type === 'previews' ? 'text-md line-clamp-2' : 'text-sm'
                  } text-muted  flex `}
                >
                  {item.customizations.map((option, index) => (
                    <div key={option.choice + index} className='flex'>
                      {option.choice}
                      {index !== item.customizations.length - 1 && (
                        <p className='flex mr-1'>,</p>
                      )}
                    </div>
                  ))}
                </div>
              </span>

              <div className='flex flex-col text-primary justify-end'>
                <Money amount={item.price} size={[1, 4]} />
                {item.originalPrice !== item.price && (
                  <div className='flex -mt-1 text-muted opacity-70 justify-end line-through'>
                    <Money amount={item.originalPrice} size={[1, 2]} />
                  </div>
                )}

                <span className='flex text-xs w-full justify-end'>
                  x{item.quantity}
                </span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
