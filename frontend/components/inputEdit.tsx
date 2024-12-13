import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InputField from './login/InputField';
import AvatarUploader from './AvatarUploader';

// Define types for the modal input fields
interface ModalField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'password' | 'avatar';
  value: string | number | Blob;
  options?: string[];
}

interface ModalProps {
  id: string;
  title: string;
  fields: ModalField[];
  onClose: () => void;
  onSubmit: (updatedField: ModalField) => void;
}

// Modal Component: Handles rendering and managing a dynamic form
const Modal: React.FC<ModalProps> = ({
  id,
  title,
  fields,
  onClose,
  onSubmit,
}) => {
  const [localFields, setLocalFields] = useState(fields);
  const [isRequestDisabled, setIsRequestDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const lastOPTRequestTime = localStorage.getItem('lastOPTRequestTime');
    if (lastOPTRequestTime) {
      const elapsedTime = Math.floor(
        (Date.now() - Number(lastOPTRequestTime)) / 1000,
      );
      if (elapsedTime < 60) {
        setIsRequestDisabled(true);
        setCountdown(60 - elapsedTime);
      }
    }
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRequestDisabled) {
      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(timer);
            setIsRequestDisabled(false);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRequestDisabled]);

  const handleRequestClick = () => {
    if (!isRequestDisabled) {
      setIsRequestDisabled(true);
      localStorage.setItem('lastOPTRequestTime', Date.now().toString());
    }
  };

  const handleChange = (index: number, value: string | number | Blob) => {
    const updatedFields = [...localFields];
    updatedFields[index].value = value;
    setLocalFields(updatedFields);
  };

  const handleSubmit = () => {
    onSubmit(localFields[0]); // Submit only the first field since we are editing one at a time
    onClose();
  };

  return (
    <div
      onClick={onClose}
      className='bg-black flex bg-opacity-50 inset-0 z-50 fixed items-center justify-center'
    >
      <motion.div
        layoutId={id}
        onClick={(e) => e.stopPropagation()}
        className='bg-white rounded-lg max-w-lg m-2 w-full p-6 lg:max-w-3xl'
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className='font-semibold text-lg mb-4'>Edit {title}</h3>
        {localFields.map((field, index) => (
          <div key={field.id} className='mb-4 relative'>
            {field.type === 'text' ||
            field.type === 'number' ||
            field.type === 'date' ||
            field.type === 'password' ? (
              <div className='flex flex-col'>
                {field.type === 'password' && (
                  <div className=' grid gap-x-4 grid-cols-12 items-center'>
                    <p className='col-span-12'>
                      For your safety, we need to validate your SMS code right
                      now.
                    </p>

                    <div className='flex gap-4 col-span-12 items-center'>
                      <InputField
                        label='SMS Code'
                        id='smsCode'
                        type='tel'
                        placeholder='SMS code'
                        value={''}
                        onChange={(e) => {}}
                        iconInput={true}
                        icon={
                          <i className='flex h-5 text-xl w-5 fi fi-rr-vote-yea'></i>
                        }
                      />
                      <button
                        type='button'
                        className='mt-5 mbutton'
                        onClick={handleRequestClick}
                        disabled={isRequestDisabled}
                      >
                        {isRequestDisabled ? `${countdown}s` : 'Send'}
                      </button>
                    </div>

                    <h3 className='font-semibold text-sm mb-4 w-full col-span-12'>
                      New {title}
                    </h3>
                  </div>
                )}
                <input
                  type={field.type}
                  className='w-full input'
                  value={
                    typeof field.value === 'string' ||
                    typeof field.value === 'number'
                      ? field.value
                      : '' // 如果是 Blob 类型，将其转换为空字符串或其他占位符
                  }
                  onChange={(e) =>
                    handleChange(
                      index,
                      field.type === 'number'
                        ? Number(e.target.value)
                        : e.target.value,
                    )
                  }
                />
              </div>
            ) : field.type === 'select' && field.options ? (
              <select
                className='input'
                value={typeof field.value === 'string' ? field.value : ''} // 确保 value 是字符串
                onChange={(e) => handleChange(index, e.target.value)}
              >
                {field.options.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : null}
            {field.type === 'avatar' && (
              <AvatarUploader
                onSave={(croppedImage) => handleChange(index, croppedImage)}
              />
            )}
          </div>
        ))}
        <div className='flex flex-col mt-16 w-full gap-4 justify-between lg:flex-row-reverse'>
          <button className='flex-1 py-2 sbutton' onClick={handleSubmit}>
            Submit
          </button>
          <button className='flex-1 py-2 cbutton' onClick={onClose}>
            Cancel
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
