'use client';
import { useSignin } from '@/features/signin/hooks/useSignin';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { SigninFormData, signinSchema } from './schema';

function SigninPage() {
  const router = useRouter();

  const { status } = useSession();
  const { mutate: signin, isPending } = useSignin();
  useEffect(() => {
    if (status === 'authenticated') router.replace('/');
  }, [status]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = (data: SigninFormData) => {
    signin(data, {
      onSuccess: response => {
        if (response.status === 'success') {
          toast.success('You have signed in successfully.');
          router.push('/');
        } else {
          toast.error(response.message || 'Sign in failed. Please check your credentials.');
        }
      },
      onError: error => {
        toast.error(error.message || 'An unexpected error occurred. Please try again.');
      },
    });
  };

  return (
    <div className="bg-white shadow-2xl flex flex-col items-center justify-center gap-10 rounded-2xl p-16 w-fit mt-20">
      <h3 className="text-xl font-bold">login Form</h3>
      <form className="flex flex-col items-center gap-10 w-full" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Email"
            className="p-3 w-60 rounded-sm shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] placeholder:text-gray-400 focus:outline-none "
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
          className="bg-neutral-300 hover:border hover:border-neutral-400 transition-colors duration-400  p-1 rounded-lg flex items-center justify-center text-base font-medium w-20 h-8 text-gray-800 cursor-pointer hover:text-gray-700"
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
            'Log In'
          )}
        </button>
      </form>
      <p className="text-gray-600 font-bold text-base">
        Create an account?
        <Link href="/signup" className="text-blue-700 hover:text-neutral-500">
          Signup
        </Link>
      </p>
    </div>
  );
}

export default SigninPage;
