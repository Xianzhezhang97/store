import React, { useCallback, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeNotification } from '@/redux/slices/globalSlice';
import { motion, AnimatePresence } from 'framer-motion';
import SuccessCheckmark from './sucessSVG';
import CountdownTimer from './CountDownTimer';
import { v4 as uuidv4 } from 'uuid';

const defaultTransition = { duration: 0.9, ease: [0.22, 0.9, 0.1, 1] };

const GlobalNotification: React.FC = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (state: RootState) => state.global.notifications,
  );

  const handleClose = useCallback(
    (id: string) => {
      dispatch(removeNotification(id));
    },
    [dispatch],
  );

  // 动画效果
  const notificationVariants = useMemo(
    () => ({
      hidden: { opacity: 0, x: 50 },
      visible: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 50 },
    }),
    [],
  );

  // 根据类型选择样式
  const getNotificationStyles = useCallback((type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'error':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  }, []);

  return notifications.length > 0 ? ( // 使用条件渲染
    <div className='flex flex-col mb-4 w-full grid-gap col top-24 right-0 left-0 z-50 page-padding fixed justify-center'>
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            variants={notificationVariants}
            initial='hidden'
            animate='visible'
            exit='exit'
            transition={defaultTransition}
            drag
            className='flex justify-center'
            dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
            onDragEnd={(event, info) => {
              if (
                Math.abs(info.offset.x) > 100 ||
                Math.abs(info.offset.y) > 100
              ) {
                handleClose(notification.id);
              }
            }}
          >
            <motion.div
              layoutId={`notification-container-${notification.id}`}
              transition={defaultTransition}
              className={`flex card-rounded w-full card-padding shadow-lg border ${getNotificationStyles(
                notification.Type,
              )}`}
            >
              <div
                className={`${
                  notification.closeButton ? 'items-start' : 'items-center'
                } flex gap-4 justify-start `}
              >
                <motion.div
                  layoutId={`notification-content-${notification.id}`}
                  transition={defaultTransition}
                  className='flex gap-2 justify-center items-center'
                >
                  <NotificationIcon
                    type={notification.Type}
                    id={notification.id}
                  />
                  {!notification.closeButton && (
                    <CountdownTimer
                      duration={notification.timeout || 2000}
                      onFinish={() => handleClose(notification.id)}
                    />
                  )}
                </motion.div>

                <motion.span
                  className='flex col gap-2 items-start'
                  layoutId={`notification-message-${notification.id}`}
                  transition={defaultTransition}
                >
                  {notification.Message}
                  {notification.closeButton && (
                    <motion.button
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className='bg-transparent rounded-lg flex ml-auto p-1.5 row text-gray-400 gap-2 items-center justify-center hover:text-gray-900 focus:ring-2 focus:ring-gray-300 '
                      onClick={() => handleClose(notification.id)}
                      layoutId={`notification-close-button-${notification.id}`}
                      transition={defaultTransition}
                    >
                      <i className='flex text-gray-800 fi fi-rr-cross'></i>
                      <CountdownTimer
                        duration={notification.timeout || 3000}
                        onFinish={() => handleClose(notification.id)}
                      />
                    </motion.button>
                  )}
                </motion.span>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  ) : null; // 没有通知时，不渲染组件
};

// 通知图标组件
const NotificationIcon: React.FC<{ type: string; id: string }> = ({
  type,
  id,
}) => {
  const iconStyles = 'text-3xl';
  const iconWrapperStyles =
    'rounded-lg flex-shrink-0 inline-flex items-center justify-center';

  const icons = useMemo(
    () => ({
      success: (
        <div className='flex h-8 w-8'>
          <SuccessCheckmark
            key='success-checkmark'
            withMessage={false}
            className='h-8 w-8'
          />
        </div>
      ),
      error: (
        <div className={iconStyles}>
          <i className='flex text-red-800 fi fi-sr-exclamation '></i>
        </div>
      ),
      warning: (
        <div className={iconStyles}>
          <i className='flex text-yellow-800 fi fi-rr-triangle-warning '></i>
        </div>
      ),
      info: (
        <div className={iconStyles}>
          <i className='flex text-sky-800 fi fi-rr-bell '></i>
        </div>
      ),
    }),
    [iconStyles],
  );

  return (
    <motion.div
      className={`${iconWrapperStyles} `}
      layoutId={`notification-icon-${type} ${id}`}
    >
      {icons[type as keyof typeof icons]}
    </motion.div>
  );
};

export default GlobalNotification;
