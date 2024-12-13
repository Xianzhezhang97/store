import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addNotification } from '@/redux/slices/globalSlice';

class Temp extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'Temp';
  }
}

const useFetch = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return async (url: string, method: string, body?: string): Promise<any> => {
    try {
      const response = await fetch(`${`https://api.gobell.au`}${url}`, {
        method,
        body,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'include',
      });

      if (response.ok) {
        return await response.json();
      } else if (response.status === 401) {
        router.push('/login');
        dispatch(
          addNotification({
            id: uuidv4(),
            isOpen: true,
            Message: t('tokenExpired'),
            Type: 'error',
          }),
        );
        throw new Temp('Unauthorized');
      } else {
        dispatch(
          addNotification({
            id: uuidv4(),
            isOpen: true,
            Message: t('unknownError'),
            Type: 'error',
          }),
        );
        throw new Temp('Unknown Error');
      }
    } catch (error) {
      if (!(error instanceof Temp)) {
        dispatch(
          addNotification({
            id: uuidv4(),
            isOpen: true,
            Message: t('networkError'),
            Type: 'error',
          }),
        );
      }
      throw error;
    }
  };
};

export default useFetch;

function uuidv4(): string {
  throw new Error('Function not implemented.');
}
