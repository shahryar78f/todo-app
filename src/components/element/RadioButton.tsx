import { ReactNode } from 'react';

interface RadioButtonProps {
  status: string;
  setStatus: (value: string) => void;
  value: string;
  title: string;
  children?: ReactNode;
}

function RadioButton({ status, setStatus, value, title, children }: RadioButtonProps) {
  return (
    <div className='flex gap-2 w-fit p-1.5 text-white  bg-amber-500 text-base font-medium rounded-[8px]'>
      <label htmlFor={value} className='flex items-center gap-2'>
        {children}
        {title}
      </label>
      <input
        type="radio"
        id={value}
        value={value}
        onChange={e => setStatus(e.target.value)}
        checked={status === 'todo'}
      />
    </div>
  );
}

export default RadioButton;
