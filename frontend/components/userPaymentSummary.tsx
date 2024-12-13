import React from 'react';
import Money from './Money';

interface Summary {
  originalPrice: number;
  savings: number;
  storePickup: number;
  tax: number;
  total: number;
}

interface PaymentSummaryProps {
  summary: Summary;
}

export default function PaymentSummary({ summary }: PaymentSummaryProps) {
  return (
    <div className='flex flex-col mt-6 w-full  sm:mt-8 lg:mt-0'>
      <div className='bg-body border space-y-4  card-padding card-rounded darrk:bg-gray-800 darrk:border-gray-700'>
        <div className='space-y-2'>
          <dl className='flex gap-4 items-center justify-between'>
            <dt className='font-normal text-base text-gray-500 darrk:text-gray-400'>
              Original price
            </dt>
            <dd className='font-medium text-base text-gray-900 darrk:text-white'>
              <Money amount={summary.originalPrice} size={[2, 4]} />
            </dd>
          </dl>

          <dl className='flex gap-4 items-center justify-between'>
            <dt className='font-normal text-base text-gray-500 darrk:text-gray-400'>
              Savings
            </dt>
            <dd className='font-medium text-base text-green-600'>
              <Money amount={-summary.savings} size={[2, 4]} />
            </dd>
          </dl>

          <dl className='flex gap-4 items-center justify-between'>
            <dt className='font-normal text-base text-gray-500 darrk:text-gray-400'>
              Store Pickup
            </dt>
            <dd className='font-medium text-base text-gray-500 darrk:text-white'>
              <Money amount={summary.storePickup} size={[2, 4]} />
            </dd>
          </dl>

          <dl className='flex gap-4 items-center justify-between'>
            <dt className='font-normal text-base text-gray-500 darrk:text-gray-400'>
              Tax
            </dt>
            <dd className='font-medium text-base text-gray-500 darrk:text-white'>
              <Money amount={summary.tax} size={[2, 4]} />
            </dd>
          </dl>
        </div>

        <dl className='border-t flex border-gray-200 pt-2 gap-4 items-center justify-between darrk:border-gray-700'>
          <dt className='font-bold text-base text-gray-900 darrk:text-white'>
            Total
          </dt>
          <dd className='font-bold text-base text-gray-900 darrk:text-white'>
            <Money amount={summary.total} size={[3, 6]} />
          </dd>
        </dl>
      </div>

      {/* <div className='flex mx-2 pt-8 gap-8 items-center justify-center'>
        {summary.paymentMethods.map((method, index) => (
          <React.Fragment key={index}>
            <img className='h-8 w-auto darrk:hidden' src={method.light} alt='' />
            <img
              className='h-8 w-auto hidden darrk:flex'
              src={method.dark}
              alt=''
            />
          </React.Fragment>
        ))}
      </div> */}
    </div>
  );
}
