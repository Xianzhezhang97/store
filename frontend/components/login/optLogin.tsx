'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import InputField from '@/components/login/InputField';
import useFetch from '@/api/useFetch';
import { useDispatch } from 'react-redux';
import { addNotification } from '@/redux/slices/globalSlice';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import { fetchProfile } from '@/api/Methods/fetchProfile';
import { sleep } from '@/utils/delay';

export default function PasswordLogin() {
  const d = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const fetchData = useFetch();
  // const [ phoneNumber, setPhoneNumber ] = useState<string>( '434344292' );
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [sms, setSms] = useState<string>('');
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

  const handleRequestClick = async () => {
    if (!isRequestDisabled) {
      try {
        const requestBody = JSON.stringify({
          phone: `+61${phoneNumber}`,
          check: false,
        });

        const response = await fetchData('/otp/phone/', 'POST', requestBody);
        switch ((response as { code: number }).code) {
          case 200:
            d(
              addNotification({
                id: uuidv4(),
                isOpen: true,
                Message: t('SMS has sent.'),
                Type: 'success',
              }),
            );
            setIsRequestDisabled(true);

            break;
          case 400:
            d(
              addNotification({
                id: uuidv4(),
                isOpen: true,
                Message: t('Invalid phone number format or not request SMS.'),
                Type: 'error',
              }),
            );
            break;
          case 404:
            d(
              addNotification({
                id: uuidv4(),
                isOpen: true,
                Message: t('Account is not exist.'),
                Type: 'error',
              }),
            );
            break;
          default:
            d(
              addNotification({
                id: uuidv4(),
                isOpen: true,
                Message: t(
                  'An unexpected error occurred. Please try again later.',
                ),
                Type: 'error',
              }),
            );
            break;
        }
      } catch (error) {
        console.error('Failed to send SMS code:', error);
      }
    }
  };

  const handleOptLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const requestBody = JSON.stringify({
        phone: `+61${phoneNumber}`,
        otp: sms,
        consumer: true,
        remember: false,
      });

      const response = await fetchData('/login/otp/', 'POST', requestBody);
      switch ((response as { code: number }).code) {
        case 200:
          d(
            addNotification({
              id: uuidv4(),
              isOpen: true,
              Message: t('Login successful.'),
              Type: 'success',
            }),
          );
          router.push('/');
          await sleep(1000);
          fetchProfile(d, t);
          break;

        case 401:
          d(
            addNotification({
              id: uuidv4(),
              isOpen: true,
              Message: t('SMS is not correct.'),
              Type: 'error',
            }),
          );
          break;
        case 400:
          d(
            addNotification({
              id: uuidv4(),
              isOpen: true,
              Message: t('SMS is not Valid due to timeout.'),
              Type: 'error',
              timeout: 4000,
            }),
          );
          break;

        default:
          d(
            addNotification({
              id: uuidv4(),
              isOpen: true,
              Message: t(
                'An unexpected error occurred. Please try again later.',
              ),
              Type: 'error',
            }),
          );
          break;
      }
    } catch (error) {}
  };

  return (
    <div className='flex flex-col h-full w-full max-w-3xl center'>
      <form className='flex flex-col h-full w-full items-center'>
        <div className='flex flex-col h-auto left  w-full overflow-auto'>
          <InputField
            label='Phone number'
            id='phoneNumber'
            type='number'
            value={phoneNumber}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(e.target.value)
            }
            placeholder='888 888 888'
            icon={
              <>
                <i className='flex h-5 text-xl w-5 fi fi-rr-mobile-notch'></i>
                +61
              </>
            }
          />
          <div className='flex gap-4 items-center'>
            <InputField
              label='SMS Code'
              id='smsCode'
              type='number'
              placeholder='SMS code'
              value={sms}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setSms(e.target.value)
              }
              iconInput={true}
              icon={<i className='flex h-5 text-xl w-5 fi fi-rr-vote-yea'></i>}
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
          <div className='flex mb-5 items-start'>
            <input
              id='remember'
              type='checkbox'
              className='border rounded bg-gray-50 border-gray-300 h-4 w-4 darrk:bg-gray-700 darrk:border-gray-600 darrk:ring-offset-gray-800 focus:ring-3 focus:ring-blue-300 darrk:focus:ring-blue-600 darrk:focus:ring-offset-gray-800'
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
          <button
            type='submit'
            onClick={handleOptLogin}
            className='flex-1 prbutton'
          >
            Login
          </button>
          <div className='flex h-10 my-4 gap-4 items-center justify-center lg:hidden'>
            <div className='border-b border-secondary flex mx-2 w-full -translate-y-1/2'></div>
            <div className='flex'>or</div>
            <div className='border-b border-secondary flex mx-2 w-full -translate-y-1/2'></div>
          </div>
          <Link href='/login' className='flex-1 flbutton'>
            Login by Password
          </Link>
        </div>
      </form>
      <div className='flex text-muted center'>
        {`Don't have an account?`}
        <Link href='/signup' className='flex mx-2 text-primary hover:underline'>
          Sign up
        </Link>
      </div>
    </div>
  );
}
