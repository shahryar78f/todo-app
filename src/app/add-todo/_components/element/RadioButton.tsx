import { ReactNode } from 'react';
import type { TodoStatus } from '@/types/todo';

interface RadioButtonProps {
  status: TodoStatus;
  setStatus: (value: TodoStatus) => void;
  value: TodoStatus;
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
        onChange={e => setStatus(e.target.value as TodoStatus)}
        checked={status === value}
      />
    </div>
  );
}

export default RadioButton;
