import { addNotification } from '@/redux/slices/globalSlice';
import { login } from '@/redux/slices/userSlice'; // 导入 login action
import { AppDispatch } from '@/redux/store'; // 确保导入正确的 Dispatch 类型
import { useTranslation } from 'next-i18next';
import { v4 as uuidv4 } from 'uuid';

interface FetchProfileResponse {
  code: number;
  data?: any; // 可以根据实际数据结构定义
}

export const fetchProfile = async (
  dispatch: AppDispatch,
  t: (key: string) => string,
): Promise<void> => {
  try {
    const response = await fetch('https://api.gobell.au/account/profile/', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (response.ok) {
      const data: FetchProfileResponse = await response.json();
      if (data.code === 200 && data.data) {
        // 确保数据存在
        // 将用户数据存入 Redux
        dispatch(login(data.data)); // 假设 data.data 包含用户信息

        dispatch(
          addNotification({
            id: uuidv4(),
            isOpen: true,
            Message: t('Loading successful.'),
            Type: 'success',
          }),
        );
      } else if (data.code === 401) {
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
      dispatch(
        addNotification({
          id: uuidv4(),
          isOpen: true,
          Message: t('Failed to fetch profile.'),
          Type: 'error',
        }),
      );
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
