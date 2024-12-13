import { AppDispatch } from '@/redux/store';
import { addNotification } from '@/redux/slices/globalSlice';
import { logout } from '@/redux/slices/userSlice';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'next-i18next';
import { v4 as uuidv4 } from 'uuid';

export const performLogout = async (
  dispatch: AppDispatch,
  t: (key: string) => string,
  router: any,
): Promise<void> => {
  try {
    const response = await fetch('https://api.gobell.au/logout/', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      // 清除 Redux 中的用户状态
      dispatch(logout());

      dispatch(
        addNotification({
          id: uuidv4(),
          isOpen: true,
          Message: t('Logged out successfully.'),
          Type: 'success',
        }),
      );
      localStorage.setItem('tokenValid', 'false');
      router.push('/');
    } else {
      dispatch(
        addNotification({
          id: uuidv4(),
          isOpen: true,
          Message: t('Logout failed. Please try again.'),
          Type: 'error',
        }),
      );
    }
  } catch (error) {
    dispatch(
      addNotification({
        id: uuidv4(),
        isOpen: true,
        Message: t('Internet Error.'),
        Type: 'error',
      }),
    );
  }
};
