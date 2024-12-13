'use client';

import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/redux/store';
import { setGlobal } from '@/redux/slices/globalSlice';
import components from '@/components';
import { performLogout } from '@/api/Methods/logout';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/navigation';
import useFetch from '@/api/useFetch';

const { Avatar } = components;

const defaultTransition = { duration: 0.9, ease: [0.22, 0.9, 0.1, 1] };

// Define InfoItem component props type
interface InfoItemProps {
  id: string;
  label: string;
  content: any;
  link?: string;
  onClick?: () => void;
}

interface ModalField {
  id: string;
  label: string;
  type: 'text' | 'number' | 'date' | 'select' | 'password' | 'avatar';
  value: string | number | Blob;
  options?: string[];
}

// InfoItem Component: Optimized for performance to avoid unnecessary re-renders
const InfoItem = memo(
  ({ id, label, content, link, onClick }: InfoItemProps) => (
    <motion.div
      layoutId={id}
      className='cursor-pointer flex w-full items-center relative justify-between'
      transition={defaultTransition}
      onClick={onClick}
    >
      <motion.h3 className='flex text-sm text-muted  py-2'>{label}</motion.h3>
      <motion.div className='flex font-[600] text-sm text-muted gap-2'>
        {label !== 'Avatar' && (
          <p className='flex flex-1 text-nowrap  line-clamp-1'>{content}</p>
        )}
        {label === 'Avatar' && <Avatar />}
        <i className='flex fi fi-sr-angle-small-right center'></i>
      </motion.div>
      {link && <Link href={link} className='inset-0 absolute'></Link>}
    </motion.div>
  ),
);
InfoItem.displayName = 'InfoItem';
const Section = memo(
  ({ title, children }: { title: string; children: React.ReactNode }) => (
    <motion.div
      className='bg-body flex flex-col w-full card-rounded !pb-0'
      transition={defaultTransition}
    >
      <div className='bg-neutral flex  w-full pt-4 top-[70px] z-10 sticky darrk:bg-gray-900'>
        <h4 className='bg-body  font-semibold text-sm w-full card-padding card-t-rounded'>
          {title}
        </h4>
      </div>
      <div className='flex flex-col gap-y-4 card-padding '>{children}</div>
    </motion.div>
  ),
);

Section.displayName = 'Section';

export default function Card() {
  const { InputEdit, TopBg } = components;
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalFields, setModalFields] = useState<ModalField | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const fetch = useFetch();

  const openModal = (field: ModalField) => {
    setModalFields(field);
    setModalOpen(true);
  };

  const handleModalSubmit = async (updatedField: ModalField) => {
    console.log('Updated Field:', updatedField);
    // Update user data logic goes here, possibly dispatching a Redux action
    // try {
    //   const response = await fetch('https://api.gobell.au/login/phone', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify({
    //       phone: `+61${phoneNumber}`,
    //       password: password,
    //       consumer: true,
    //       remember: remember,
    //     }),
    //     credentials: 'include',
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     if (data.code === 200) {
    //       d(
    //         addNotification({
    //           id: uuidv4(),
    //           isOpen: true,
    //           Message: t('Login successful.'),
    //           Type: 'success',
    //           timeout: 1500,
    //         }),
    //       );
    //       router.push('/');
    //       await sleep(1000);
    //       fetchProfile(d, t);
    //       d(login(user));
    //       localStorage.setItem('tokenValid', 'true');
    //     } else if (data.code === 401) {
    //       d(
    //         addNotification({
    //           id: uuidv4(),
    //           isOpen: true,
    //           Message: t('Invalid phone number or password.'),
    //           Type: 'error',
    //         }),
    //       );
    //     }
    //   }
    // } catch (error) {
    //   d(
    //     addNotification({
    //       id: uuidv4(),
    //       isOpen: true,
    //       Message: t('Internet Error.'),
    //       Type: 'error',
    //     }),
    //   );
    // }
    setModalOpen(false);
  };

  const logoutHandler = () => {
    performLogout(dispatch, t, router);
  };

  useEffect(() => {
    dispatch(setGlobal({ GobalPadding: false, TabBar: false }));
    return () => {
      dispatch(setGlobal({ GobalPadding: true }));
    };
  }, [dispatch]);

  const defaultAddress =
    user?.location?.find((addr) => addr.isDefault)?.location?.split(',')[0] ||
    '';

  const userItems: ModalField[] = [
    {
      id: 'avatar',
      label: 'Avatar',
      value: user.avatar || '',
      type: 'avatar',
    },
    {
      id: 'name',
      label: 'Username',
      value: user.name || '',
      type: 'text',
    },
    {
      id: 'gender',
      label: 'Gender',
      value: user.gender || '',
      type: 'select',
      options: ['Male', 'Female', 'Other', 'Secret'],
    },
    {
      id: 'pronoun',
      label: 'Pronoun',
      value: user.pronoun || '',
      type: 'select',
      options: ['He', 'Her', 'They', 'Other', 'Secret'],
    },
    {
      id: 'birthday',
      label: 'Birthday',
      value: user.birthday || '',
      type: 'date',
    },
    {
      id: 'phone',
      label: 'Phone ( +61 )',
      value: user.phone || '',
      type: 'password',
    },
    {
      id: 'password',
      label: 'Password',
      value: '',
      type: 'password',
    },
  ];

  return (
    <main className='flex flex-col w-full'>
      {/* Modal */}
      {isModalOpen && modalFields && (
        <InputEdit
          id='edit-info-modal'
          title={`${modalFields.label}`}
          fields={[modalFields]} // Adjusted to pass an array
          onClose={() => setModalOpen(false)}
          onSubmit={handleModalSubmit}
        />
      )}
      <TopBg heading={'Profile'} />
      <AnimatePresence>
        {/* Main Content */}
        <motion.div
          layout
          className='flex flex-col mt-[90px] w-full z-20 gap-y-2 wipe-in-down page-padding'
        >
          {/* PERSONAL PROFILE */}
          <Section title='PERSONAL PROFILE'>
            {/* User Info Items */}
            {userItems.map((item) => (
              <InfoItem
                key={item.id}
                id={item.id}
                label={item.label}
                content={item.value}
                onClick={() => item.type && openModal(item)}
              />
            ))}
          </Section>
          {/* More Setting */}
          <Section title='More Setting'>
            <InfoItem
              link='/account/profile/address'
              id='address'
              label='Address Manegement'
              content={''}
            />
            <InfoItem
              link='/setting'
              id='General Settings'
              label='General Settings'
              content={''}
            />
            <InfoItem
              link='/account/agreements'
              id='Agreements'
              label='Agreements'
              content={''}
            />
            <InfoItem
              link='/card/card-policy'
              id='card-policy'
              label='Card Policy'
              content={''}
            />
          </Section>

          {user.isLoggedIn ? (
            <button
              onClick={logoutHandler}
              className='mt-8 transition-all sbutton'
            >
              Log out
            </button>
          ) : (
            <Link href='/login' className='mt-8 transition-all sbutton'>
              Log in
            </Link>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
