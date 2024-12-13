'use client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { setLanguage } from '@/redux/slices/languageSlice';

export default function LanguageSwitcher() {
  const language = useSelector((state: RootState) => state.language.language);
  const dispatch = useDispatch();

  const handleLanguageChange = (newLanguage: string) => {
    dispatch(setLanguage(newLanguage));
  };

  return (
    <div>
      <p>Current Language: {language}</p>
      <div className='flex mt-4 gap-4'>
        {' '}
        <button className='sbutton' onClick={() => handleLanguageChange('en')}>
          English
        </button>
        <button className='sbutton' onClick={() => handleLanguageChange('es')}>
          Spanish
        </button>
        <button className='sbutton' onClick={() => handleLanguageChange('cn')}>
          中文
        </button>
      </div>
    </div>
  );
}
