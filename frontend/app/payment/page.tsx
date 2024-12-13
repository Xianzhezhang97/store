'use client';
import React from 'react';
import components from '@/components';
import Link from 'next/link';
export default function payment() {
  const { UserPaymentSummary, PaymentMethod } = components;
  const summary = {
    originalPrice: 6592,
    savings: 299,
    storePickup: 99,
    tax: 799,
    total: 7191,
  };
  return (
    <div className='flex flex-col  items-center justify-between'>
      {/* <h1 className='h1'> Payment</h1> */}

      <h2 className='h1'>Payment</h2>

      <div className=' mt-6 w-full sm:mt-8 lg:flex lg:gap-8 '>
        <form
          action='#'
          className='bg-body border flex flex-col p-4   card-rounded sm:p-6 lg:p-8 darrk:bg-gray-800 darrk:border-gray-700 '
        >
          <div className='mb-6 grid gap-4 grid-cols-2'>
            <div className='col-span-2 sm:col-span-1'>
              <label
                form='full_name'
                className='font-medium text-sm mb-2 text-gray-900 block darrk:text-white'
              >
                {' '}
                Full name*{' '}
              </label>
              <input
                type='text'
                id='full_name'
                className='border rounded-md bg-gray-50 border-gray-300 text-sm w-full p-2.5 text-gray-900 block darrk:bg-gray-700 darrk:border-gray-600 darrk:text-white darrk:placeholder:text-gray-400 focus:border-primary focus:ring-secondary darrk:focus:border-secondary darrk:focus:ring-secondary'
                placeholder='Scott Cheung'
                required
              />
            </div>

            <div className='col-span-2 sm:col-span-1'>
              <label
                form='card-number-input'
                className='font-medium text-sm mb-2 text-gray-900 block darrk:text-white'
              >
                {' '}
                Card number*{' '}
              </label>
              <input
                type='text'
                id='card-number-input'
                className='border rounded-md bg-gray-50 border-gray-300 text-sm w-full p-2.5 text-gray-900 block pe-10 darrk:bg-gray-700 darrk:border-gray-600  darrk:text-white darrk:placeholder:text-gray-400 focus:border-secondary focus:ring-secondary darrk:focus:border-secondary darrk:focus:ring-secondary'
                placeholder='xxxx-xxxx-xxxx-xxxx'
                pattern='^4[0-9]{12}(?:[0-9]{3})?$'
                required
              />
            </div>

            <div>
              <label
                form='card-expiration-input'
                className='font-medium text-sm mb-2 text-gray-900 block darrk:text-white'
              >
                Card expiration*{' '}
              </label>
              <div className='relative'>
                <div className='flex inset-y-0 pointer-events-none absolute items-center start-0 ps-3.5'>
                  <svg
                    className='h-4 text-gray-500 w-4 darrk:text-gray-400'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    width='24'
                    height='24'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M5 5a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1h1a1 1 0 0 0 1-1 1 1 0 1 1 2 0 1 1 0 0 0 1 1 2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7a2 2 0 0 1 2-2ZM3 19v-7a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Zm6.01-6a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm-10 4a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm6 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0Zm2 0a1 1 0 1 1 2 0 1 1 0 0 1-2 0Z'
                      clip-rule='evenodd'
                    />
                  </svg>
                </div>
                <input
                  // datepicker
                  // datepicker-format='mm/yy'
                  id='card-expiration-input'
                  type='data'
                  className='border rounded-md bg-gray-50 border-gray-300 text-sm w-full p-2.5 text-gray-900 block ps-9 darrk:bg-gray-700 darrk:border-gray-600 darrk:text-white darrk:placeholder:text-gray-400 focus:border-secondary focus:ring-secondary darrk:focus:border-secondary darrk:focus:ring-secondary'
                  placeholder='11/10 (M/Y)'
                  required
                />
              </div>
            </div>
            <div>
              <label
                form='cvv-input'
                className='flex font-medium text-sm mb-2 text-gray-900 gap-1 items-center darrk:text-white'
              >
                CVV*
                <button
                  data-tooltip-target='cvv-desc'
                  data-tooltip-trigger='hover'
                  className='text-gray-400 darrk:text-gray-500 hover:text-gray-900 darrk:hover:text-white'
                >
                  <svg
                    className='h-4 w-4'
                    aria-hidden='true'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      fill-rule='evenodd'
                      d='M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.408-5.5a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM10 10a1 1 0 1 0 0 2h1v3h-1a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2h-1v-4a1 1 0 0 0-1-1h-2Z'
                      clip-rule='evenodd'
                    />
                  </svg>
                </button>
                <div
                  id='cvv-desc'
                  role='tooltip'
                  className='rounded-md font-medium bg-gray-900 shadow-sm text-sm text-white opacity-0 py-2 px-3 transition-opacity z-10 duration-300 tooltip invisible absolute inline-block darrk:bg-gray-700'
                >
                  The last 3 digits on back of card
                  <div className='tooltip-arrow' data-popper-arrow></div>
                </div>
              </label>
              <input
                type='number'
                id='cvv-input'
                aria-describedby='helper-text-explanation'
                className='border rounded-md bg-gray-50 border-gray-300 text-sm w-full p-2.5 text-gray-900 block darrk:bg-gray-700 darrk:border-gray-600 darrk:text-white darrk:placeholder:text-gray-400 focus:border-secondary focus:ring-secondary darrk:focus:border-secondary darrk:focus:ring-secondary'
                placeholder='•••'
                required
              />
            </div>
          </div>

          <Link href='/payment/result' className='mb-4 flbutton'>
            Pay now
          </Link>
          <button type='submit' className='flbutton'>
            Pay now
          </button>
        </form>
        <div className='flex flex-col min-w-[350px]'>
          <UserPaymentSummary summary={summary} />
          <PaymentMethod />
        </div>
      </div>
    </div>
  );
}
