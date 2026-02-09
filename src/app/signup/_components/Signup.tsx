'use client';
import { useSignup } from '@/features/signUp/hooks/useSignup';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { signupSchema, type SignupFormData } from './schema';

function SignupPage() {
  const router = useRouter();
  const { status } = useSession();
  const { mutate: signup, isPending } = useSignup();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (status === 'authenticated') router.replace('/');
  }, [status, router]);

  const onSubmit = (data: SignupFormData) => {
    signup(data, {
      onSuccess: response => {
        if (response.status === 'success') {
          toast.success(response.message || 'Your account was successfully created.');
          router.push('/signin');
        } else {
          toast.error(response.message || 'Error connecting to database');
        }
      },
      onError: error => {
        toast.error(error.message || 'An unexpected error occurred. Please try again.');
      },
    });
  };

  return (
    <div className="bg-white shadow-2xl flex flex-col items-center justify-center gap-10 rounded-2xl p-16 w-fit mt-20">
      <h3 className="text-xl font-bold">Registration Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-10 w-full">
        <div className="flex flex-col gap-1">
          <input
            type="email"
            placeholder="Email"
            className="p-3 w-60 rounded-sm shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] placeholder:text-gray-400 focus:outline-none"
            {...register('email')}
          />
          <p className="min-h-[20px] text-sm text-red-500">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <input
            type="password"
            placeholder="Password"
            className="p-3 w-60 rounded-sm shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] placeholder:text-gray-400 focus:outline-none"
            {...register('password')}
          />
          <p className="min-h-[20px] text-sm text-red-500">{errors.password?.message}</p>
        </div>
        <button
          type="submit"
          className="flex items-center justify-center bg-neutral-300 hover:border hover:border-neutral-400 transition-colors duration-200 p-1 rounded-lg text-base font-medium text-gray-800 cursor-pointer w-20 h-8 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isPending}
        >
          {isPending ? (
            <Icon
              icon="eos-icons:three-dots-loading"
              width={60}
              height={40}
              className="text-gray-600"
            />
          ) : (
            'Sign Up'
          )}
        </button>
      </form>
      <p className="text-gray-600 font-bold text-base">
        have an account?
        <Link href="/signin" className="text-blue-700 hover:text-neutral-500">
          Login
        </Link>
      </p>
    </div>
  );
}

export default SignupPage;
