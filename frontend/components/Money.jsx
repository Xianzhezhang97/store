import React from 'react';

export default function Money({ amount = 0, size = [1, 2] }) {
  const minus = amount < 0;
  amount = Math.abs(amount);
  amount = Math.ceil(amount * 100) / 100;
  const formattedAmount = amount.toFixed(2);
  const [dollars, cents] = formattedAmount.split('.');

  // Define sizes based on the provided size prop
  const sizes = {
    1: 'text-xs',
    2: 'text-sm',
    3: 'text-md',
    4: 'text-lg',
    5: 'text-xl',
    6: 'text-2xl',
    7: 'text-3xl',
    8: 'text-4xl',
    9: 'text-5xl',
  };

  return (
    <div className='flex font-semibold justify-center items-baseline '>
      {minus && <span className={`${sizes[size[0]]} align-top`}>-</span>}
      <span className={`${sizes[size[0]]} align-top mr-1`}>$</span>
      <span className={sizes[size[1]]}>{dollars}</span>
      <span className={`${sizes[size[0]]} flex  align-bottom`}>.{cents}</span>
    </div>
  );
}
