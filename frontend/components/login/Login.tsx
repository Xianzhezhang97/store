'use client';
import React, { useState, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import InputField from '@/components/login/InputField';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '@/redux/slices/globalSlice';
import { useTranslation } from 'next-i18next';
import { login } from '@/redux/slices/userSlice';
import { RootState } from '@/redux/store';
import { fetchProfile } from '@/api/Methods/fetchProfile';
import { sleep } from '@/utils/delay';
import { v4 as uuidv4 } from 'uuid';

const PasswordLogin: React.FC = () => {
  // const [phoneNumber, setPhoneNumber] = useState<string>('1');
  // const [password, setPassword] = useState<string>('Phoenix000218@@@');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [remember, setRemember] = useState<boolean>(false);
  const d = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const { t } = useTranslation();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://api.gobell.au/login/phone', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: `+61${phoneNumber}`,
          password: password,
          consumer: true,
          remember: remember,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        if (data.code === 200) {
          d(
            addNotification({
              id: uuidv4(),
              isOpen: true,
              Message: t('Login successful.'),
              Type: 'success',
              timeout: 1500,
            }),
          );
          router.push('/');
          await sleep(1000);
          fetchProfile(d, t);
          d(login(user));
          localStorage.setItem('tokenValid', 'true');
        } else if (data.code === 401) {
          d(
            addNotification({
              id: uuidv4(),
              isOpen: true,
              Message: t('Invalid phone number or password.'),
              Type: 'error',
            }),
          );
        }
      }
    } catch (error) {
      d(
        addNotification({
          id: uuidv4(),
          isOpen: true,
          Message: t('Internet Error.'),
          Type: 'error',
        }),
      );
    }
  };

  return (
    <div className='flex flex-col h-full w-full max-w-3xl center'>
      <form
        className='flex flex-col h-full w-full items-center'
        onSubmit={handleSubmit}
      >
        <div className='flex flex-col h-auto left w-full overflow-auto'>
          <InputField
            label='Phone number'
            id='phoneNumber'
            type='tel'
            placeholder='888 888 888'
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
            icon={
              <>
                <i className='flex h-5 text-xl w-5 fi fi-rr-mobile-notch'></i>
                +61
              </>
            }
          />
          <InputField
            label='Password'
            id='password'
            type='password'
            placeholder='*********'
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            } // 指定类型
          />

          <div className='flex mb-5 items-start'>
            <input
              id='remember'
              type='checkbox'
              className='border rounded bg-gray-50 border-gray-300 h-4 w-4 darrk:bg-gray-700 darrk:border-gray-600 darrk:ring-offset-gray-800 focus:ring-3 focus:ring-blue-300 darrk:focus:ring-blue-600 darrk:focus:ring-offset-gray-800'
              checked={remember}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRemember(e.target.checked)
              } // 指定类型
            />
            <label
              htmlFor='remember'
              className='font-medium text-sm text-gray-900 ms-2 darrk:text-gray-300'
            >
              Remember me
            </label>
          </div>
        </div>

        <div className='flex-row-reverse mt-[8vh] mb-[5vh] w-full max-w-3xl gap-8 justify-center lg:flex lg:max-w-3xl '>
          <button type='submit' className='flex-1 prbutton'>
            Login
          </button>
          <div className='flex h-10 my-4 gap-4 items-center justify-center lg:hidden'>
            <div className='border-b border-secondary flex mx-2 w-full -translate-y-1/2'></div>
            <div className='flex'>or</div>
            <div className='border-b border-secondary flex mx-2 w-full -translate-y-1/2'></div>
          </div>
          <Link href='/login/opt' className='flex-1 flbutton'>
            Login by SMS
          </Link>
        </div>
      </form>

      <div className='flex text-muted center'>
        {` Don't have an account?`}
        <Link href='/signup' className='flex mx-2 text-primary hover:underline'>
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default PasswordLogin;
