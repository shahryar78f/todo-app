'use client';
import AddTodoPage from '@/app/add-todo/_components/AddTodo';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function AddTodo() {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signup');
    }
  }, [status, router]);

  if (status === 'unauthenticated' || status === 'loading') {
    return null;
  }

  return <AddTodoPage />;
}

export default AddTodo;
