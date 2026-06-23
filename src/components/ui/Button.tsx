'use client';

import { Icon } from '@iconify/react';
import Link from 'next/link';
import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'transparent' | 'danger';
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode;
  href?: string;
  icon?: string;
  iconColor?: string;
  iconSize?: number;
  variant?: Variant;
  size?: Size;
  className?: string;
}

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors duration-300 cursor-pointer hover:shadow-lg disabled:opacity-50 disabled:pointer-events-none';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-[#495CC5] text-white  hover:shadow-lg',
  secondary:
    'bg-neutral-300 text-gray-800  hover:text-gray-700',
  tertiary: 'bg-gray-100 text-gray-800 hover:bg-gray-200',
  transparent: 'bg-transparent text-gray-700',
  danger: 'bg-red-500 text-white hover:bg-red-600',
};

const sizeClasses: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2 text-sm',
  lg: 'px-5 py-2.5 text-base',
};

const iconSizeMap: Record<Size, number> = {
  sm: 16,
  md: 18,
  lg: 20,
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      href,
      icon,
      iconColor,
      iconSize,
      variant = 'primary',
      size = 'md',
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const classes = twMerge(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      disabled && 'opacity-50 pointer-events-none',
      className,
    );

    const content = (
      <>
        {icon && (
          <Icon
            icon={icon}
            width={iconSize ?? iconSizeMap[size]}
            height={iconSize ?? iconSizeMap[size]}
            color={iconColor}
          />
        )}
        {children}
      </>
    );

    if (href) {
      return (
        <Link href={href} className={classes}>
          {content}
        </Link>
      );
    }

    return (
      <button ref={ref} className={classes} disabled={disabled} {...props}>
        {content}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
