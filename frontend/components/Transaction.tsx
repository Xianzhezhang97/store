'use client';

import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import Money from './Money';
import QRCode from 'qrcode.react';

type TabType = 'all' | 'balance' | 'credit';

const TransactionList: React.FC<{ defaultTab?: string }> = ({
  defaultTab = 'all',
}) => {
  const [activeTab, setActiveTab] = useState<TabType>(defaultTab as TabType);
  const [showQRCode, setShowQRCode] = useState<{ [key: string]: boolean }>({});
  const user = useSelector((state: RootState) => state.user);

  // Memoized filtered transactions to avoid unnecessary calculations
  const filteredTransactions = useMemo(() => {
    return user.transaction.filter((transaction) => {
      if (activeTab === 'credit') {
        return transaction.withdraw !== null;
      }
      return true; // Both `all` and `balance` show all transactions
    });
  }, [user.transaction, activeTab]);

  // Memoized tab click handler to avoid unnecessary re-renders
  const handleTabClick = useCallback((tab: TabType) => {
    setActiveTab(tab);
  }, []);

  // Handle toggle QR code display
  const toggleQRCode = (tid: string) => {
    setShowQRCode((prev) => ({
      ...prev,
      [tid]: !prev[tid],
    }));
  };

  return (
    <div className='flex flex-col w-full grid-gap'>
      {/* 切换选项卡 */}
      <div className='flex grid-gap'>
        {(['all', 'balance', 'credit'] as TabType[]).map((tab) => (
          <button
            key={tab}
            className={`sbutton ${
              activeTab === tab && '!bg-hover !text-white '
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* 交易列表 */}
      <AnimatePresence initial={false}>
        {filteredTransactions.map((transaction) => {
          const isDeposit = transaction.deposit !== null;
          const isWithdraw = transaction.withdraw !== null;
          const show = showQRCode[transaction.tid] || false;

          return (
            <motion.div
              key={transaction.tid}
              layoutId={`transaction-${transaction.tid}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className='bg-white flex w-full col card-rounded card-padding justify-between items-center'
            >
              {/* 二维码显示 */}
              {show && (
                <motion.div
                  className='flex mb-6 w-full justify-start'
                  layoutId={`qrcode-${transaction.tid}`}
                >
                  <QRCode value={transaction.tid} size={80} />
                </motion.div>
              )}

              <div className='flex w-full justify-between'>
                {/* 交易信息 */}
                <div className='flex-1 w-full col items-start'>
                  {/* 时间显示 */}
                  <motion.p
                    className='text-xs text-gray-500'
                    layoutId={`time-${transaction.tid}`}
                  >
                    {new Date(transaction.created_at).toLocaleString()}
                  </motion.p>
                  <motion.p
                    className='text-sm text-gray-500'
                    layoutId={`type-${transaction.tid}`}
                  >
                    {isDeposit ? 'Deposit' : 'Withdraw'}
                  </motion.p>
                  {/* Show QR Code Button */}
                  <button
                    className='mt-2 text-sm text-blue-500 underline'
                    onClick={() => toggleQRCode(transaction.tid)}
                  >
                    {show ? 'Hide QR Code' : 'Show QR Code'}
                  </button>
                </div>

                {/* 金额显示 */}
                <div className='flex col items-end justify-start'>
                  {isDeposit && (
                    <motion.p
                      className='font-bold text-green-600'
                      layoutId={`amount-deposit-${transaction.tid}`}
                    >
                      <Money
                        amount={transaction.deposit?.amount}
                        size={[2, 5]}
                      />
                    </motion.p>
                  )}
                  {isWithdraw && (
                    <>
                      {/* 显示原价，并加上下划线 */}
                      {activeTab === 'all' && (
                        <motion.p
                          className='text-gray-400 line-through !font-normal'
                          layoutId={`original-${transaction.tid}`}
                        >
                          <Money
                            amount={transaction.withdraw?.original}
                            size={[1, 2]}
                          />
                        </motion.p>
                      )}

                      <motion.p
                        className={`flex font-semibold text-xl ${
                          activeTab === 'credit'
                            ? 'text-green-600'
                            : 'text-yellow-600'
                        }`}
                        layoutId={`credits-earned-${transaction.tid}`}
                      >
                        {activeTab === 'credit'
                          ? `+${transaction.withdraw?.credit}`
                          : ''}
                      </motion.p>
                      <motion.p
                        layoutId={`amount-withdraw-${transaction.tid}`}
                        className={`text-yellow-600`}
                      >
                        <Money
                          amount={transaction.withdraw?.amount}
                          size={activeTab === 'credit' ? [1, 2] : [2, 5]}
                        />
                      </motion.p>
                      {activeTab !== 'credit' && (
                        <motion.p
                          className='text-xs text-green-600'
                          layoutId={`credits-earned-text-${transaction.tid}`}
                        >
                          +{transaction.withdraw?.credit} Credits
                        </motion.p>
                      )}
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(TransactionList);
