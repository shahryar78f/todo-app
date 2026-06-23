'use client';

import { TextareaHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

type Language = 'en' | 'fa';

interface TextareaProps extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'placeholder'> {
  placeholder: string;
  language?: Language;
  label: string;
  name: string;
  className?: string;
  labelClassName?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ placeholder, language = 'en', label, name, className, labelClassName, ...props }, ref) => {
    const isPersian = language === 'fa';


    const textareaTextAlign = isPersian ? 'text-right' : 'text-left';

    const placeholderAlign = isPersian ? 'placeholder:text-right' : 'placeholder:text-left';

    const labelAlign = isPersian ? 'text-right' : 'text-left';

    const textareaClasses = twMerge(
      'w-full px-4  py-2 bg-[#F4F5FA]  shadow-[inset_4px_4px_4px_0px_#ECEEF6] text-[#495CC5] placeholder-[#96ACD5] placeholder:font-normal placeholder:text-[14px]  rounded-[10px] focus:outline-none  focus:border-transparent transition-all resize-none',
      textareaTextAlign,
      placeholderAlign,
      isPersian && 'dir-rtl',
      className,
    );

    const labelClasses = twMerge(
      'block mb-2 text-[14px] font-semibold pb-2 text-[#2F3973]',
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
        <textarea
          ref={ref}
          id={name}
          name={name}
          placeholder={placeholder}
          className={textareaClasses}
          dir={isPersian ? 'rtl' : 'ltr'}
          {...props}
        />
      </div>
    );
  },
);

Textarea.displayName = 'Textarea';

export default Textarea;
