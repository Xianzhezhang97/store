import { useRouter } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const BackButton = () => {
  const router = useRouter();
  const [canGoBack, setCanGoBack] = useState(false);

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const touchStartWithinLimit = useRef(false); // 判断是否在屏幕左侧 5% 区域

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCanGoBack(window.history.length > 1);

      // 监听触摸事件
      const handleTouchStart = (e) => {
        const screenWidth = window.innerWidth; // 获取屏幕宽度
        touchStartX.current = e.touches[0].clientX; // 记录触摸开始时的 X 位置
        touchStartWithinLimit.current =
          touchStartX.current < screenWidth * 0.05; // 判断是否在左侧 5% 区域内
      };

      const handleTouchMove = (e) => {
        if (!touchStartWithinLimit.current) return; // 如果不在左侧 5% 区域内，忽略滑动
        touchEndX.current = e.touches[0].clientX; // 记录滑动过程中触摸的 X 位置
      };

      const handleTouchEnd = () => {
        if (!touchStartWithinLimit.current) return; // 如果不在左侧 5% 区域内，忽略滑动
        // 如果滑动的距离超过了 100px 并且是向右滑动
        if (touchEndX.current - touchStartX.current > 100) {
          handleBack();
        }
      };

      // 添加事件监听器
      window.addEventListener('touchstart', handleTouchStart);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleTouchEnd);

      // 清除事件监听器
      return () => {
        window.removeEventListener('touchstart', handleTouchStart);
        window.removeEventListener('touchmove', handleTouchMove);
        window.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [canGoBack]);

  const handleBack = () => {
    if (canGoBack) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8, x: 10 }}
      animate={{ opacity: 1, scale: 1, x: 0 }}
      exit={{ opacity: 0, scale: 0.8, x: 10 }}
      transition={{ duration: 0.7, ease: 'easeInOut' }}
      layoutId='returnButton'
      className=' flex text-primary gap-2 absolute items-center justify-start'
      onClick={handleBack}
    >
      <div className='bg-neutral rounded-full flex h-[30px] w-[30px] center'>
        <i className='flex fi fi-sr-angle-left center'></i>
      </div>
    </motion.button>
  );
};

export default BackButton;
