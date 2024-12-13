import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

interface SuccessCheckmarkProps {
  className?: string;
  message?: string;
  withMessage?: boolean;
  color?: string;
  withSounds?: boolean;
}

const SuccessCheckmark: React.FC<SuccessCheckmarkProps> = ({
  className = '',
  message = 'Payment Success',
  withMessage = true,
  color = 'stroke-green-600',
  withSounds = false,
}) => {
  useEffect(() => {
    let audio: HTMLAudioElement | null = null;

    const timer = setTimeout(() => {
      if (withSounds) {
        audio = new Audio('/sound/success.mp3');
        audio
          .play()
          .catch((error) => console.error('Failed to play audio:', error));
      }
    }, 500);

    return () => {
      clearTimeout(timer);
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    };
  }, [withSounds]); // 添加依赖项，确保仅在 withSounds 改变时触发

  return (
    <div
      className={`${className} flex flex-col items-center justify-center relative`}
    >
      {/* SVG 图形 */}
      <motion.svg
        key='checkmark'
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        className={color}
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 400 400'
      >
        {/* 圆圈动画 */}
        <motion.circle
          fill='none'
          strokeWidth='20'
          cx='200'
          cy='200'
          r='190'
          strokeLinecap='round'
          transform='rotate(-90 200 200)'
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5 }}
        />
        {/* 勾动画 */}
        <motion.polyline
          fill='none'
          strokeWidth='24'
          points='88,214 173,284 304,138'
          strokeLinecap='round'
          strokeLinejoin='round'
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        />
      </motion.svg>

      {/* 成功提示文本 */}
      {withMessage && (
        <motion.h2
          className='font-semibold mt-10 text-3xl text-gray-800 darrk:text-white'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          {message}
        </motion.h2>
      )}
    </div>
  );
};

export default SuccessCheckmark;
