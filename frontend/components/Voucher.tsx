'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QRCode from 'qrcode.react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setGlobal } from '@/redux/slices/globalSlice';

// 统一的 transition 配置
const defaultTransition = { duration: 0.9, ease: [0.22, 0.9, 0.1, 1] };

interface BaseVoucher {
  id: string;
  name: string;
  type: 'fixed' | 'percentage' | 'exchange' | 'bundle';
  total: number;
  used: number;
  daily: number | null;
  FixedVoucher: string | null;
  description: string;
  expired: string;
  expiredAt: string;
  redeemedAt?: string;
  usedAt?: string;
  available: boolean;
}

interface FixedVoucher extends BaseVoucher {
  type: 'fixed';
  minimumSpend: number;
}

interface PercentageVoucher extends BaseVoucher {
  type: 'percentage';
  minimumSpend: number;
  maxDeducer: number;
}

interface ExchangeVoucher extends BaseVoucher {
  type: 'exchange';
  exchangeItem: string;
}

interface BundleVoucher extends BaseVoucher {
  type: 'bundle';
  bundleItems: string[];
}

type Voucher =
  | FixedVoucher
  | PercentageVoucher
  | ExchangeVoucher
  | BundleVoucher;

const VoucherList: React.FC<VoucherListProps> = ({ vouchers }) => {
  const [selectedVoucher, setSelectedVoucher] = useState<Voucher | null>(null);

  const dispatch = useDispatch();
  const global = useSelector((state: RootState) => state.global);

  const getIcon = (type: Voucher['type']) => {
    switch (type) {
      case 'fixed':
        return <i className='flex fi fi-rr-dollar'></i>;
      case 'percentage':
        return <i className='flex fi fi-rr-tax-alt'></i>;
      case 'exchange':
        return <i className='flex fi fi-rr-ticket'></i>;
      case 'bundle':
        return <i className='flex fi fi-rr-playing-cards'></i>;
      default:
        return <i className='flex fi fi-rr-box'></i>; // 通用图标
    }
  };

  return (
    <motion.div layoutId='voucherList' className='flex flex-col w-full gap-y-4'>
      <AnimatePresence>
        {vouchers.map((voucher, index) => (
          <motion.div
            key={voucher.id + '-' + index + voucher.name}
            className={`border card-rounded card-padding flex gap-x-4 w-full p-4 bg-thrid`}
            layoutId={voucher.id}
            transition={defaultTransition}
            onClick={() => {
              setSelectedVoucher(voucher);
              dispatch(
                setGlobal({
                  Scroll: false,
                  TabBar: false,
                }),
              );
            }}
          >
            {/* Icon */}
            <motion.div
              layoutId={voucher.id + 'Icon'}
              transition={defaultTransition}
              className='bg-secondary rounded-full flex flex-shrink-0 mr-1/2 text-xl center items-center justify-center'
              style={{ width: '50px', height: '50px' }}
            >
              {getIcon(voucher.type)}
            </motion.div>
            {/* Content */}
            <motion.div
              transition={defaultTransition}
              className='flex-col flex w-full'
            >
              <motion.h2
                layoutId={voucher.id + 'header'}
                className='font-semibold left line-clamp-1 h3'
              >
                {voucher.name}
              </motion.h2>
              <motion.p
                layoutId={voucher.id + 'Voucher Details'}
                transition={defaultTransition}
                className='text-xs line-clamp-1'
              >
                Expel: {voucher.expiredAt}
              </motion.p>
            </motion.div>
            {/* Redeem Button */}
            <motion.div
              layoutId={voucher.id + 'Redeem Button'}
              transition={defaultTransition}
            >
              {voucher.available === true ? (
                <button className='mt-4 sbutton'>Redeem</button>
              ) : (
                <button className='mt-4 sbutton' disabled>
                  Expery
                </button>
              )}
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
      {/* "id": "52098e6a-cd95-4e77-a774-79d29b7783bf", "name": "Beer", "zh_name":
      "啤酒", "description": "285ml Beer", "zh_description": "285毫升啤酒",
      "total": 120, "used": 0, "daily": 1, "prohibit": true, "usedDaily": 0,
      "created_at": "2024-09-10T14:56:50.512645", "type": "fixed" */}
      <AnimatePresence>
        {selectedVoucher && (
          <motion.div
            className='bg-black flex bg-opacity-50 -inset-0 z-50   fixed items-center justify-center'
            onClick={() => {
              setSelectedVoucher(null);
              dispatch(
                setGlobal({
                  Scroll: true,
                  TabBar: true,
                }),
              );
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className='bg-white rounded-lg m-md max-w-lg shadow-lg w-full p-6  relative'
              layoutId={selectedVoucher.id}
              transition={defaultTransition}
              onClick={(e) => e.stopPropagation()} // Prevents the modal from closing when clicking inside
            >
              {/* Icon */}
              <motion.div
                layoutId={selectedVoucher.id + 'Icon'}
                transition={defaultTransition}
                className='bg-secondary rounded-full flex flex-shrink-0 mr-1/2 text-xl mb-4 center items-center justify-center'
                style={{ width: '50px', height: '50px' }}
              >
                {getIcon(selectedVoucher.type)}
              </motion.div>

              {/* Voucher Details */}
              <motion.div className='text-muted '>
                <motion.h2
                  layoutId={selectedVoucher.id + 'header'}
                  transition={defaultTransition}
                  className=' text-black h2'
                >
                  {selectedVoucher.name}
                </motion.h2>
                <motion.div>
                  {selectedVoucher.description && (
                    <p>{selectedVoucher.description}</p>
                  )}

                  {selectedVoucher.type === 'exchange' && (
                    <p>兑换物品: {selectedVoucher.exchangeItem}</p>
                  )}
                  {selectedVoucher.type === 'bundle' && (
                    <p>捆绑优惠: {selectedVoucher.bundleItems?.join(' + ')}</p>
                  )}
                  <motion.p
                    layoutId={selectedVoucher.id + 'Voucher Details'}
                    transition={defaultTransition}
                    className='mt-4 text-xs'
                  >
                    Expel: {selectedVoucher.expiredAt}
                  </motion.p>
                  <p className='mt-4 text-xs'>所有解释权归 Gobell™ 所有</p>
                </motion.div>
              </motion.div>
              {/* barcode */}
              <div className='top-7 right-7   absolute'>
                <QRCode value={selectedVoucher.id} size={72} />
              </div>

              {/* Redeem Button */}
              <motion.div
                layoutId={selectedVoucher.id + 'Redeem Button'}
                transition={defaultTransition}
                className='mt-4'
              >
                {selectedVoucher.available === true ? (
                  <button className='flbutton'>Redeem</button>
                ) : (
                  <button className='flbutton' disabled>
                    Expery
                  </button>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface VoucherListProps {
  vouchers: Voucher[];
}

const VoucherPage: React.FC<VoucherListProps> = ({ vouchers }) => {
  return <VoucherList vouchers={vouchers} />;
};

export default VoucherPage;
