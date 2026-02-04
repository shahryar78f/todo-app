'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useState } from 'react';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, SetPassword] = useState('');
  const router = useRouter()

  const signUpHandler = async () => {
    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    const data = await res.json();
    console.log('data:', data);
    if(data.status === 'success') router.push('/signin')
  };

  return (
    <div className="bg-white shadow-2xl flex flex-col items-center justify-center gap-10 rounded-2xl p-16 w-fit mt-20">
      <h3 className="text-xl font-bold">Registration Form</h3>
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
      <button
        className="bg-neutral-400 p-1 rounded-lg text-base font-medium text-gray-800 cursor-pointer hover:text-gray-700"
        onClick={signUpHandler}
      >
        Register
      </button>
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
