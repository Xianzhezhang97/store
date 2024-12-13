'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import InputField from '@/components/login/InputField';
import ShopList from '@/components/ShopList';
import useFetch from '@/api/useFetch';
import { useDispatch, useSelector } from 'react-redux';
import { addNotification } from '@/redux/slices/globalSlice';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import AvatarUploader from './AvatarUploader';
import Diamond from '@/components/card/Diamond';
import Golden from '@/components/card/Golden';
import Platinum from '@/components/card/Platinum';
import { RootState } from '@/redux/store';

export default function CardApply() {
  const d = useDispatch();
  const { t } = useTranslation();
  const router = useRouter();
  const [ShowCard, setShow] = useState<boolean>(false);
  const [avatar, setAvatar] = useState<string>('');
  const [merchant, setMerchant] = useState<any>(null);
  const [lastName, setLastName] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const fetchData = useFetch();
  const user = useSelector((state: RootState) => state.user);
  const handleApplyCard = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const requestBody = JSON.stringify({
        name: `${firstName} ${lastName}`,
        avatar: avatar,
        merchant: merchant.uid,
      });

      const response = await fetchData(
        '/consumer/create/card/',
        'POST',
        requestBody,
      );
      switch ((response as { code: number }).code) {
        case 200:
          d(
            addNotification({
              id: uuidv4(),
              isOpen: true,
              Message: t('Apply successful.'),
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
        onSubmit={handleApplyCard}
      >
        <div className='flex flex-col h-auto left w-full overflow-auto'>
          <p className='h4'>Your Photo</p>
          <AvatarUploader
            onSave={(croppedImage) => setAvatar(croppedImage as string)}
            outputFormat='base64'
            aspectRatio={0.75}
          />

          <div className='grid gap-4 grid-cols-2'>
            <InputField
              label='First name'
              id='first-name'
              type='text'
              placeholder='First name'
              value={firstName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFirstName(e.target.value)
              }
              iconInput={true}
              icon={<i className='flex h-5 text-xl w-5 fi fi-rr-user'></i>}
            />
            <InputField
              label='Last name'
              id='last-name'
              type='text'
              placeholder='Last name'
              value={lastName}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setLastName(e.target.value)
              }
              iconInput={true}
              icon={<i className='flex h-5 text-xl w-5 fi fi-rr-user'></i>}
            />
          </div>
          <div className='h-1/2'>
            <ShopList
              activeMerchant={merchant}
              handleMerchantClick={setMerchant}
            />
          </div>
        </div>

        {/* <p>{`${firstName} ${lastName}`}</p>
        <img src={avatar}></img>
        <p className='flex w-full'>{avatar}</p>
        <p>{merchant.uid}</p> */}
        <div className='flex-row-reverse mt-[8vh] mb-[5vh] w-full max-w-3xl gap-8 justify-center lg:flex lg:max-w-3xl'>
          {/* <button
            className='flex-1 mb-4 hidden flbutton'
            onClick={() => {
              setShow(!ShowCard);
            }}
          >
            {!ShowCard ? 'Review' : 'Cancel Review'}
          </button> */}
          {ShowCard && (
            <div className='flex w-full scale-[0.5] relative center'>
              {user.type === 'diamond' && (
                <Diamond
                  name='Xianzhe Zhang'
                  pic={avatar}
                  member_id={user.member_id}
                  year={2022}
                  month={12}
                />
              )}
              {user.type === 'gold' && (
                <Golden
                  name='Xianzhe Zhang'
                  member_id={user.member_id}
                  year={2022}
                  month={12}
                />
              )}
              {user.type === 'platinum' && (
                <Platinum
                  name='Xianzhe Zhang'
                  pic={avatar}
                  member_id={user.member_id}
                  year={2022}
                  month={12}
                />
              )}
            </div>
          )}
          <button type='submit' className='flex-1 prbutton'>
            Apply to make a card
          </button>
        </div>
      </form>
    </div>
  );
}
