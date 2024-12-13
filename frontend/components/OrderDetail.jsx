'use client';

import React, { useMemo, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import JsBarcode from 'jsbarcode'; // Ensure JsBarcode is installed and imported
import components from '@/components/index';
import { setGlobal } from '@/redux/slices/globalSlice';

const defaultTransition = { duration: 0.9, ease: [0.22, 0.9, 0.1, 1] };

export default function OrderDetail() {
  const pathname = usePathname();
  const { Money, OrderItem } = components;
  const orderId = pathname?.split('/').pop();
  const dispatch = useDispatch();
  const barcodeRef = useRef(null);

  const orders = useSelector((state) => state.order.orders);

  const orderDetail = useMemo(
    () => orders.find((o) => o.id === orderId),
    [orders, orderId],
  );

  useEffect(() => {
    dispatch(setGlobal({ GobalPadding: false, TabBar: false }));
    return () => dispatch(setGlobal({ GobalPadding: true, TabBar: true }));
  }, [dispatch]);

  useEffect(() => {
    if (barcodeRef.current && orderDetail) {
      JsBarcode(barcodeRef.current, orderDetail.id, {
        format: 'CODE128',
        displayValue: false,
        width: 3,
        height: 70,
        font: 'Arial',
        fontSize: 24,
        lineHeight: 1.4,
        margin: 10,
        textAlign: 'left',
        background: 'transparent',
        textPosition: 'bottom',
      });
    }
  }, [orderDetail]);

  if (!orderDetail) return <p>Order not found</p>;

  const Divider = () => (
    <div className='flex h-1 my-2 w-full items-center justify-between relative'>
      <div className='border-dashed border-neutral border-t-2 w-full'></div>
      <div className='bg-neutral rounded-full h-4 left-0 w-4 -translate-x-2 absolute'></div>
      <div className='bg-neutral rounded-full h-4 right-0 w-4 translate-x-2 absolute'></div>
    </div>
  );

  const OrderHeader = ({ orderDetail }) => (
    <div className='flex flex-col gap-4 card-padding'>
      <div className='flex mb-4 w-full justify-between'>
        <div className='flex flex-col'>
          <p className='font-semibold text-base '>{orderDetail.store}</p>
          <p className='font-semibold text-xs line-clamp-1'>
            <i className='mr-1 fi fi-sr-marker'></i>
            {orderDetail.location}
          </p>
        </div>
        <p className='flex font-semibold text-muted text-sm'>
          {orderDetail.status}
        </p>
      </div>
      {orderDetail.items.map((item, index) => (
        <OrderItem item={item} id={index} type={'detail'} key={index} />
      ))}
    </div>
  );

  const CostSummary = ({ orderDetail }) => {
    const { Money } = components;

    return (
      <div className='flex flex-col card-padding'>
        <h4 className='text-center mb-4 h4'>Cost Summary</h4>
        <div className='flex flex-col text-primary mb-8 w-full opacity-75 gap-2 items-baseline justify-end'>
          <CostLine label='Subtotal' amount={orderDetail.subtotal} />
          {orderDetail.vocher !== 0 && (
            <CostLine
              label='Voucher'
              amount={orderDetail.vocher}
              textClass='text-success'
            />
          )}
          {orderDetail.discount !== 0 && (
            <CostLine
              label='Promotion'
              amount={orderDetail.discount}
              textClass='text-success'
            />
          )}
          {orderDetail.delivery !== 0 && (
            <CostLine label='Delivery' amount={orderDetail.delivery} />
          )}
          <CostLine label='GST' amount={orderDetail.total / 11} />
        </div>
        {orderDetail.subtotal - orderDetail.total !== 0 && (
          <CostLine
            label='Save'
            amount={orderDetail.subtotal - orderDetail.total}
            textClass='text-hover'
          />
        )}
        <DividerLine />
        <TotalLine amount={orderDetail.total} />
      </div>
    );
  };

  const CostLine = ({ label, amount, textClass = 'text-primary' }) => (
    <div
      className={`flex ${textClass} w-full gap-2 justify-between items-baseline`}
    >
      <p className='text-md'>{label}</p>
      <components.Money amount={amount} size={[2, 4]} />
    </div>
  );

  const DividerLine = () => (
    <div className='border-dashed border-t-2 my-4 w-full'></div>
  );

  const TotalLine = ({ amount }) => (
    <div className='flex w-full gap-4 justify-between items-baseline'>
      <div className='flex gap-2 items-baseline'>
        <p className='font-semibold text-lg'>Total</p>
        <p className='font-semibold text-xs text-muted'>(GST included)</p>
      </div>
      <components.Money amount={amount} size={[4, 6]} />
    </div>
  );

  const OrderDetails = ({ orderDetail, barcodeRef }) => (
    <div className='flex flex-col mb-12 gap-4 card-padding'>
      <h4 className='text-center mb-4 h4'>Order Information</h4>
      <div className='border-y flex flex-col py-8 justify-center items-center'>
        <svg className='flex w-full' ref={barcodeRef}></svg>

        <p className='flex text-sm'>Order Number: {orderDetail.id}</p>
      </div>
      {[
        'Payment Method',
        'Credit',
        'Growth',
        'Delivery Status',
        'Pickup Number',
        'Order Time',
        'Payment Time',
        'Order Comment',
      ].map((label, index) => (
        <>
          <DetailLine
            key={index}
            label={label}
            value={orderDetail[convertToCamelCase(label)]}
          />
        </>
      ))}
    </div>
  );

  const DetailLine = ({ label, value }) => (
    <div className='flex text-primary w-full gap-2 justify-between items-baseline'>
      <p className='text-sm'>{label}</p>
      <p className='text-sm'>{value}</p>
    </div>
  );

  const ActionButtons = ({ orderId }) => (
    <div className='flex mt-4 gap-2 justify-end'>
      {['Confirm', 'Review', 'Reorder'].map((action, index) => (
        <button
          key={index}
          className='cbutton'
          onClick={() => handleUpdateOrderStatus(orderId, action)}
        >
          {action}
        </button>
      ))}
    </div>
  );

  function convertToCamelCase(str) {
    return str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9]+(.)/g, (match, chr) => chr.toUpperCase())
      .replace(/^(.)/, (chr) => chr.toLowerCase());
  }

  return (
    <motion.div
      layoutId={'order' + orderDetail.id}
      transition={defaultTransition}
      className='flex flex-col w-full'
    >
      <motion.div
        layout
        transition={{ duration: 1 }}
        className='bg-body flex flex-col gap-2 col-span-12 card-rounded'
      >
        <OrderHeader orderDetail={orderDetail} />
        <Divider />
        <CostSummary orderDetail={orderDetail} />
        <Divider />
        <OrderDetails orderDetail={orderDetail} barcodeRef={barcodeRef} />
      </motion.div>

      <ActionButtons orderId={orderDetail.id} />
    </motion.div>
  );
}
