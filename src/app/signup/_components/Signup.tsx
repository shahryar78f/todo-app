'use client';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
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
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const email = watch('email');
  const password = watch('password');
  const isFormValid = Boolean(email?.trim()) && (password?.length ?? 0) >= 5;

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
    <div className="bg-white shadow-2xl flex flex-col items-center justify-center gap-4 xl:gap-10 rounded-2xl p-16 w-[90%] xl:w-fit mt-12  xl:mt-20">
      <h3 className="text-xl font-bold">Registration Form</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center gap-10 w-full">
        <div className="flex flex-col gap-1">
          <Input
            label="Email"
            type="email"
            placeholder="Email"
            className="w-60"
            {...register('email')}
          />
          <p className="min-h-[20px] text-sm text-red-500">{errors.email?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <Input
            label="Password"
            type="password"
            placeholder="Password"
            className="w-60"
            {...register('password')}
          />
          <p className="min-h-[20px] text-sm text-red-500">{errors.password?.message}</p>
        </div>
        <Button
          type="submit"
          variant={isFormValid ? 'primary' : 'secondary'}
          size="md"
          className="w-20 h-8 p-1 text-base"
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
        </Button>
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
