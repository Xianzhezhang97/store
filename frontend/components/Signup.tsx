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

export default function Signup() {
  const d = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const [isRequestDisabled, setIsRequestDisabled] = useState(false);
  // const [phoneNumber, setPhoneNumber] = useState<string>('434344292');
  // const [password, setPassword] = useState<string>('1011');
  // const [lastName, setLastName] = useState<string>('Zhang');
  // const [name, setName] = useState<string>('Xianzhe');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [sms, setSms] = useState<string>('');
  const [countdown, setCountdown] = useState(60);
  const fetchData = useFetch();

  useEffect(() => {
    const lastRequestTime = localStorage.getItem('lastRequestTime');
    if (lastRequestTime) {
      const elapsedTime = Math.floor(
        (Date.now() - Number(lastRequestTime)) / 1000,
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
          check: true,
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
                timeout: 5000,
              }),
            );
            break;
          case 404:
            d(
              addNotification({
                id: uuidv4(),
                isOpen: true,
                Message: t('Account has signed up, please log in directly.'),
                Type: 'error',
                timeout: 5000,
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
                timeout: 5000,
              }),
            );
            break;
        }
      } catch (error) {
        console.error('Failed to send SMS code:', error);
        d(
          addNotification({
            id: uuidv4(),
            isOpen: true,
            Message: t('An unexpected error occurred. Please try again later.'),
            Type: 'error',
            timeout: 5000,
          }),
        );
      }
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const requestBody = JSON.stringify({
        name: `${name} `,
        phone: `+61${phoneNumber}`,
        password: password,
        otp: sms,
        consumer: true,
      });

      const response = await fetchData('/signup/phone/', 'POST', requestBody);
      switch ((response as { code: number }).code) {
        case 200:
          d(
            addNotification({
              id: uuidv4(),
              isOpen: true,
              Message: t('Sign successful.'),
              Type: 'success',
            }),
          );
          router.push('/');
          break;
        case 400:
          d(
            addNotification({
              id: uuidv4(),
              isOpen: true,
              Message: t('Invalid phone number format.'),
              Type: 'error',
            }),
          );
          break;
        case 401:
          d(
            addNotification({
              id: uuidv4(),
              isOpen: true,
              Message: t('SMS invalid.'),
              Type: 'error',
            }),
          );
          break;

        case 409:
          d(
            addNotification({
              id: uuidv4(),
              isOpen: true,
              Message: t('Account is already registered. Please login.'),
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
    } catch (error) {}
  };

  return (
    <div className='flex flex-col h-full w-full max-w-3xl center'>
      <form
        className='flex flex-col h-full w-full items-center'
        onSubmit={handleSignup}
      >
        <div className='flex flex-col h-auto left w-full overflow-auto'>
          <div className='grid gap-4 '>
            <InputField
              label='Name'
              id='first-name'
              type='text'
              placeholder='Your name'
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setName(e.target.value)
              }
              iconInput={true}
              icon={<i className='flex h-5 text-xl w-5 fi fi-rr-user'></i>}
            />
          </div>
          <InputField
            label='Password'
            id='password'
            type='password'
            placeholder='*********'
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            iconInput={true}
            icon={<i className='flex h-5 text-xl w-5 fi fi-rr-lock'></i>}
          />
          <InputField
            label='Phone number'
            id='phoneNumber'
            type='number'
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
        </div>

        <div className='flex-row-reverse mt-[8vh]  mb-[5vh] w-full max-w-3xl gap-8 justify-center lg:flex lg:max-w-3xl'>
          <button type='submit' className='flex-1 prbutton'>
            Create a new account
          </button>
          <div className='flex h-10 my-4 gap-4 items-center justify-center lg:hidden'>
            <div className='border-b border-secondary flex mx-2 w-full -translate-y-1/2'></div>
            <div className='flex text-primary opacity-50'>or</div>
            <div className='border-b border-secondary flex mx-2 w-full -translate-y-1/2'></div>
          </div>
          <Link href='/login/opt' className='flex-1 flbutton'>
            Login by SMS
          </Link>
        </div>
      </form>
      <div className='flex text-muted center'>
        Have an account?
        <Link href='/login' className='flex mx-2 text-primary hover:underline'>
          Sign in
        </Link>
      </div>
    </div>
  );
}
