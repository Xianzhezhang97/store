import React from 'react';

const InputField: React.FC<{
  label: string;
  id: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconInput?: boolean;
  icon?: React.ReactNode;
}> = ({ label, id, type, placeholder, value, onChange, icon, iconInput }) => (
  <div className='flex flex-col mb-5 w-full'>
    <label htmlFor={id} className='h4'>
      {label}
    </label>
    <div className='flex gap-4 relative'>
      {icon && (
        <div className='flex text-muted inset-y-0 absolute items-center pointer-events-none start-0 ps-4'>
          {icon}
        </div>
      )}
      <input
        type={type}
        id={id}
        className={
          icon ? (iconInput ? 'iconInput' : 'iconAndTextInput') : 'input'
        }
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  </div>
);

export default InputField;
