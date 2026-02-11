'use client';

import { api } from '@/utils/axios';
import type { Todo } from '@/types/todo';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TodoDetailPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const todoId = params.id;

  const [todo, setTodo] = useState<Todo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signup');
      return;
    }

    if (status !== 'authenticated') return;

    const fetchTodo = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/api/todos/${todoId}`);

        if (data.status === 'success' && data.data?.todo) {
          setTodo(data.data.todo);
          setError(null);
        } else {
          setTodo(null);
          setError(data.message ?? 'Failed to fetch todo');
        }
      } catch (err: any) {
        const message =
          err?.response?.data?.message || err?.message || 'Failed to fetch todo';
        setError(message);
        setTodo(null);
      } finally {
        setLoading(false);
      }
    };

    if (todoId) {
      fetchTodo();
    } else {
      setError('Todo ID is missing');
      setLoading(false);
    }
  }, [status, router, todoId]);

  if (status === 'unauthenticated' || status === 'loading') {
    return null;
  }

  if (loading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-gray-500">Loading todo...</p>
      </main>
    );
  }

  if (error || !todo) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="rounded-md bg-white p-6 shadow-[0_0_20px_rgba(0,0,0,0.15)]">
          <h1 className="text-lg font-semibold mb-2">Todo not found</h1>
          <p className="text-sm text-gray-600">
            {error ?? 'The requested todo could not be found.'}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="flex items-center justify-center min-h-screen">
      <section className="w-full max-w-xl rounded-md bg-white p-6 shadow-[0_0_20px_rgba(0,0,0,0.15)] space-y-4">
        <span className="block h-[2px] w-1/2 bg-blue-500" />
        <div>
          <h1 className="text-2xl font-semibold mb-2">{todo.title}</h1>
          <p className="text-sm text-gray-500 mb-4">
            Status:{' '}
            <span className="font-medium capitalize">
              {todo.status === 'inProgress' ? 'In Progress' : todo.status}
            </span>
          </p>
          <p className="text-base leading-relaxed">{todo.description}</p>
        </div>
      </section>
    </main>
  );
}
