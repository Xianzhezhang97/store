'use client';
import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import components from '@/components';

export default function Card() {
  const [showOutline, setShowOutline] = React.useState(true);
  useEffect(() => {
    // 在动画结束后隐藏描边
    const timer = setTimeout(() => {
      setShowOutline(false);
    }, 900);

    return () => clearTimeout(timer); // 清理计时器
  }, []);

  return (
    <motion.div
      style={{ backgroundColor: 'rgba(219, 203, 177, 1)' }}
      className=' flex-col h-screen bg-opacity-100 text-primary w-full top-0 right-0 bottom-0 left-0 z-50 fixed  justify-between'
    >
      {/* Logo Background */}
      <div className='flex flex-col h-full w-full  transition-all z-50 center'>
        <AnimatePresence>
          <motion.svg
            xmlns='http://www.w3.org/2000/svg'
            version='1.1'
            viewBox='0 0 84 86'
            width='100'
            height='100'
            strokeWidth='2'
            className=' z-10'
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{
              duration: 0.7,

              ease: 'easeInOut',
            }}
          >
            <AnimatePresence>
              {showOutline && (
                <motion.path
                  d='M 14.98 43.01 Q 23.39 49.97 29.28 54.44 Q 31.28 55.96 34.19 54.19 Q 34.34 54.10 40.70 49.67 A 4.49 4.47 -47.4 0 1 45.50 49.46 L 53.98 54.36 A 5.11 5.11 0.0 0 0 59.33 54.21 Q 68.25 48.37 68.62 48.13 C 73.11 45.26 76.66 43.92 81.65 44.05 A 1.88 1.88 0.0 0 1 83.39 45.33 Q 83.81 46.59 82.84 47.57 Q 80.40 50.03 47.63 80.63 Q 45.66 82.47 42.15 81.76 Q 40.42 81.41 38.41 79.39 Q 38.35 79.32 5.85 48.47 Q 2.14 44.94 3.45 41.40 Q 4.14 39.54 7.11 36.52 Q 14.66 28.86 37.80 5.61 Q 40.27 3.13 42.16 2.58 Q 45.46 1.63 48.34 4.48 Q 64.50 20.48 82.93 38.55 Q 83.41 39.02 83.49 40.04 A 1.83 1.83 0.0 0 1 81.66 42.01 L 15.35 42.01 Q 13.77 42.01 14.98 43.01 Z M 46.3139 18.5023 A 3.71 3.71 0.0 0 0 41.0674 18.4565 L 36.7023 22.7461 A 3.71 3.71 0.0 0 0 36.6565 27.9926 L 40.9461 32.3577 A 3.71 3.71 0.0 0 0 46.1926 32.4035 L 50.5577 28.1139 A 3.71 3.71 0.0 0 0 50.6035 22.8674 L 46.3139 18.5023 Z'
                  fill='none'
                  className={'stroke-primary'}
                  strokeWidth='4'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  initial={{ pathLength: 0, fill: 'rgba(255, 255, 255, 0.1)' }}
                  animate={{ pathLength: 1, fill: 'rgba(255, 255, 255, 1)' }}
                  exit={{ pathLength: 0, fill: 'rgba(219, 203, 177, 1)' }}
                  transition={{
                    duration: 1,

                    ease: 'easeInOut',
                  }}
                />
              )}
            </AnimatePresence>

            <motion.path
              d='M 14.98 43.01 Q 23.39 49.97 29.28 54.44 Q 31.28 55.96 34.19 54.19 Q 34.34 54.10 40.70 49.67 A 4.49 4.47 -47.4 0 1 45.50 49.46 L 53.98 54.36 A 5.11 5.11 0.0 0 0 59.33 54.21 Q 68.25 48.37 68.62 48.13 C 73.11 45.26 76.66 43.92 81.65 44.05 A 1.88 1.88 0.0 0 1 83.39 45.33 Q 83.81 46.59 82.84 47.57 Q 80.40 50.03 47.63 80.63 Q 45.66 82.47 42.15 81.76 Q 40.42 81.41 38.41 79.39 Q 38.35 79.32 5.85 48.47 Q 2.14 44.94 3.45 41.40 Q 4.14 39.54 7.11 36.52 Q 14.66 28.86 37.80 5.61 Q 40.27 3.13 42.16 2.58 Q 45.46 1.63 48.34 4.48 Q 64.50 20.48 82.93 38.55 Q 83.41 39.02 83.49 40.04 A 1.83 1.83 0.0 0 1 81.66 42.01 L 15.35 42.01 Q 13.77 42.01 14.98 43.01 Z M 46.3139 18.5023 A 3.71 3.71 0.0 0 0 41.0674 18.4565 L 36.7023 22.7461 A 3.71 3.71 0.0 0 0 36.6565 27.9926 L 40.9461 32.3577 A 3.71 3.71 0.0 0 0 46.1926 32.4035 L 50.5577 28.1139 A 3.71 3.71 0.0 0 0 50.6035 22.8674 L 46.3139 18.5023 Z'
              className={'fill-white'}
              stroke='none'
              strokeLinecap='round'
              strokeLinejoin='round'
              initial={{ pathLength: 0, fill: 'rgba(255, 255, 255, 0.1)' }}
              animate={{ pathLength: 1, fill: 'rgba(255, 255, 255, 1)' }}
              exit={{ pathLength: 0, fill: 'rgba(219, 203, 177, 1)' }}
              transition={{
                duration: 1,
                // delay: 0.7,

                ease: 'easeInOut',
              }}
            />
          </motion.svg>
        </AnimatePresence>

        <motion.h1
          layout
          className='font-bold mt-12 text-primary tracking-widest text-[1.6em] center'
          initial={{ opacity: 0.2, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0.2, y: 10 }}
        >
          GOBELL GROUP
        </motion.h1>
        <div className='flex mt-[20vh]'>
          <motion.div
            layout
            className='text-primary center '
            initial={{ opacity: 0.5, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0.5, y: 10 }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              repeatType: 'reverse',
              ease: 'easeInOut',
            }}
          >
            <div className=' gap-4 center'>
              <svg
                aria-hidden='true'
                role='status'
                className='h-7  text-third animate-spin w-7 inline darrk:text-third'
                viewBox='0 0 100 101'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  className='fill-third'
                  d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                />
                <path
                  className='fill-primary'
                  d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                />
              </svg>
              <p className='flex text-xl text-primary'>Loading...</p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
