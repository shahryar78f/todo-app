import { ReactNode } from 'react';

interface RadioButtonProps {
  status: string;
  setStatus: (value: string) => void;
  value: string;
  title: string;
  children?: ReactNode;
  className?: string;
}

function RadioButton({ status, setStatus, value, title, children, className }: RadioButtonProps) {
  return (
    <div className={`flex gap-2 w-36 justify-between p-1.5 text-white text-base font-medium rounded-[8px] ${className ?? ''}`.trim()}>
      <label htmlFor={value} className='flex items-center gap-2'>
        {children}
        {title}
      </label>
      <input
        type="radio"
        id={value}
        value={value}
        onChange={e => setStatus(e.target.value)}
        checked={status === value}
      />
    </div>
  );
}

export default RadioButton;
