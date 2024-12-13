import React from 'react';
import Money from './Money';

const paymentMethods = [
  // {
  //   light:
  //     'https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg',
  //   darrk: 'https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg',
  // },
  {
    light: '/graph/Apple_Pay_logo.svg',
    darrk: '/graph/Apple_Pay_logo.svg',
  },
  {
    light:
      'https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal.svg',
    darrk:
      'https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/paypal-dark.svg',
  },
  {
    light:
      'https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa.svg',
    darrk:
      'https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/visa-dark.svg',
  },
  {
    light:
      'https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard.svg',
    darrk:
      'https://flowbite.s3.amazonaws.com/blocks/e-commerce/brand-logos/mastercard-dark.svg',
  },
];
export default function PaymentSummary() {
  return (
    <div className=' flex flex-col mt-6  dark darrk:invert sm:mt-8 lg:mt-0'>
      <div className='flex flex-wrap mx-2 pt-8 gap-8 items-center justify-center'>
        {paymentMethods.map((method, index) => (
          <React.Fragment key={index}>
            <img
              className='flex h-8 w-auto darrk:hidden'
              src={method.light}
              alt=''
            />
            {/* <img
              className='h-8 fill-white w-auto hidden darrk:flex'
              src={method.dark}
              alt=''
            /> */}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
