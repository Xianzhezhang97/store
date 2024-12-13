import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  isOpen: boolean; // 控制 Modal 是否打开
  onClose: () => void; // 关闭 Modal 的回调函数
  children: React.ReactNode; // Modal 内部的内容
}

const defaultTransition = { duration: 0.5, ease: 'easeInOut' };

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className='bg-black flex bg-opacity-50 inset-0 z-50 fixed items-center justify-center'
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className='bg-white rounded-lg m-md max-w-lg shadow-lg w-full p-6 relative'
            transition={defaultTransition}
            onClick={(e) => e.stopPropagation()} // 阻止事件冒泡，防止点击内部内容时关闭
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Modal;
