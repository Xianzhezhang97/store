// fetchTransaction.ts
import { addNotification } from '@/redux/slices/globalSlice';
import { login, setTransaction } from '@/redux/slices/userSlice'; // Ensure setTransaction is correctly imported
import { AppDispatch } from '@/redux/store';
import { useTranslation } from 'next-i18next';
import { v4 as uuidv4 } from 'uuid';

interface FetchProfileResponse {
  code: number;
  data?: any;
}

export const fetchTranscation = async (
  dispatch: AppDispatch,
  t: (key: string) => string,
): Promise<void> => {
  try {
    const response = await fetch(
      'https://api.gobell.au/consumer/transaction/',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      },
    );

    if (response.ok) {
      const res: FetchProfileResponse = await response.json();
      if (res.code === 200 && res.data) {
        // console.log(res.data);
        dispatch(setTransaction(res.data));

        // dispatch(
        //   addNotification({
        //     id: uuidv4(),
        //     isOpen: true,
        //     Message: t('Get transaction successful.'),
        //     Type: 'success',
        //   }),
        // );
      } else if (res.code === 401) {
        // dispatch(
        //   addNotification({
        //     id: uuidv4(),
        //     isOpen: true,
        //     Message: t('Login unsuccessful.'),
        //     Type: 'error',
        //   }),
        // );
      }
    } else {
      // dispatch(
      //   addNotification({
      //     id: uuidv4(),
      //     isOpen: true,
      //     Message: t('Failed to fetch profile.'),
      //     Type: 'error',
      //   }),
      // );
    }
  } catch (error) {
    // dispatch(
    //   addNotification({
    //     id: uuidv4(),
    //     isOpen: true,
    //     Message: t('Internet Error.'),
    //     Type: 'error',
    //   }),
    // );
  }
};
