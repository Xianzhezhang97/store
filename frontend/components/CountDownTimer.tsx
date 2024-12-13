import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface CountdownTimerProps {
  duration: number;
  onFinish: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  duration,
  onFinish,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const requestRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const countdown = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const remaining = Math.max(duration - elapsed, 0);

      setTimeLeft(remaining);

      if (remaining > 0) {
        requestRef.current = requestAnimationFrame(countdown);
      } else {
        onFinish();
      }
    };

    requestRef.current = requestAnimationFrame(countdown);

    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      startTimeRef.current = null;
    };
  }, [duration, onFinish]);

  return (
    <motion.span className='flex text-sm text-muted min-w-5  justify-center'>
      {Math.ceil(timeLeft / 1000)}s
    </motion.span>
  );
};

export default CountdownTimer;
