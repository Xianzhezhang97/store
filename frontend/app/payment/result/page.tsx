'use client';
import React from 'react';
import components from '@/components';
export default function payment() {
  const { UserPaymentSummary, PaymentMethod, SucessSVG } = components;
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
      <SucessSVG />
    </div>
  );
}
