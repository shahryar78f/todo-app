'use client'
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

function SigninPage() {
    const [email, setEmail] = useState('');
    const [password, SetPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const router = useRouter()

    const{status} = useSession()
    useEffect(()=>{if(status === 'authenticated') router.replace('/') },[status])

    const signinHandler = async () => {
        setError(null);
        const res = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (res?.error) {
          setError(res.error);
          return;
        }

        if (res?.ok) {
          router.push('/');
        }
      };

  return (
    <div className="bg-white shadow-2xl flex flex-col items-center justify-center gap-10 rounded-2xl p-16 w-fit mt-20">
    <h3 className="text-xl font-bold">login Form</h3>
    <input
      type="text"
      placeholder="Email"
      className="p-3 w-60 rounded-sm shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] placeholder:text-gray-400 focus:outline-none "
      value={email}
      onChange={e => setEmail(e.target.value)}
    />
    <input
      type="password"
      placeholder="Password"
      className="p-3 w-60 rounded-sm shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] placeholder:text-gray-400 focus:outline-none"
      value={password}
      onChange={e => SetPassword(e.target.value)}
    />
    {error && (
      <p className="text-red-600 text-sm mb-2">
        {error}
      </p>
    )}
    <button
      className="bg-neutral-400 p-1 rounded-lg text-base font-medium text-gray-800 cursor-pointer hover:text-gray-700"
      onClick={signinHandler}
    >
      Login
    </button>
    <p className="text-gray-600 font-bold text-base">
      Create an account?{' '}
      <Link href="/signup" className="text-blue-700 hover:text-neutral-500">
        Login
      </Link>
    </p>
  </div>
  )
}

export default SigninPage