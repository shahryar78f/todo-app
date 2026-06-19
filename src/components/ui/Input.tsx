'use client';

import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Language = 'en' | 'fa';

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'placeholder'> {
  placeholder: string;
  language?: Language;
  label: string;
  className?: string;
  labelClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, language = 'en', label, name, className, labelClassName, ...props }, ref) => {
    const isPersian = language === 'fa';

    const inputTextAlign = isPersian ? 'text-right' : 'text-left';

    const placeholderAlign = isPersian ? 'placeholder:text-right' : 'placeholder:text-left';

    const labelAlign = isPersian ? 'text-right' : 'text-left';

    const inputClasses = twMerge(
      'w-full px-4 py-2 bg-[#F4F5FA]  shadow-[inset_4px_4px_4px_0px_#ECEEF6] text-[#495CC5] placeholder-[#96ACD5] placeholder:font-normal placeholder:text-[16px]  rounded-[10px] focus:outline-none  focus:border-transparent transition-all',
      inputTextAlign,
      placeholderAlign,
      isPersian && 'dir-rtl',
      className,
    );

    const labelClasses = twMerge(
      'block mb-2 text-[14px] pr-2 pb-1 font-semibold text-[#2F3973]',
      labelAlign,
      labelClassName,
    );

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={name} className={labelClasses}>
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          className={inputClasses}
          dir={isPersian ? 'rtl' : 'ltr'}
          {...props}
        />
      </div>
    );
  },
);

Input.displayName = 'Input';

export default Input;
