'use client';

import { useGetTodo } from '@/features/todos/hooks/useGetTodo';
import { useUpdateTodo } from '@/features/todos/hooks/useUpdateTodo';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

interface TodoFormValues {
  title: string;
  description: string;
}

export default function TodoDetailPage() {
  const { status } = useSession();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const todoId = params.id;

  const {
    data,
    isPending: isTodoLoading,
    error: todoError,
  } = useGetTodo(todoId);

  const todo = data?.status === 'success' ? data.data?.todo : undefined;

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<TodoFormValues>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const {
    mutate: updateTodo,
    isPending: isUpdating,
    error: updateError,
  } = useUpdateTodo();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/signup');
    }
  }, [status, router]);

  useEffect(() => {
    if (todo) {
      reset({
        title: todo.title,
        description: todo.description,
      });
    }
  }, [todo, reset]);

  const onSubmit = handleSubmit(values => {
    if (!todoId) return;

    const trimmedTitle = values.title.trim();
    const trimmedDescription = values.description.trim();

    if (!trimmedTitle || !trimmedDescription) return;

    updateTodo({
      id: todoId,
      title: trimmedTitle,
      description: trimmedDescription,
    });
  });

  if (status === 'unauthenticated' || status === 'loading') {
    return null;
  }

  if (isTodoLoading) {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <p className="text-sm text-gray-500">Loading todo...</p>
      </main>
    );
  }

  if (todoError || !todo || data?.status === 'failed') {
    return (
      <main className="flex items-center justify-center min-h-screen">
        <div className="rounded-md bg-white p-6 shadow-[0_0_20px_rgba(0,0,0,0.15)]">
          <h1 className="text-lg font-semibold mb-2">Todo not found</h1>
          <p className="text-sm text-gray-600">
            {todoError?.message ?? 'The requested todo could not be found.'}
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
          <h1 className="text-2xl font-semibold mb-2">Edit Todo</h1>
          <p className="text-sm text-gray-500 mb-4">
            Status:{' '}
            <span className="font-medium capitalize">
              {todo.status === 'inProgress' ? 'In Progress' : todo.status}
            </span>
          </p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="title" className="text-gray-700 text-sm font-medium mb-1">
                Title
              </label>
              <input
                id="title"
                type="text"
                className="shadow-[inset_0_4px_10px_rgba(0,0,0,0.08)] p-2 rounded-md w-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter todo title"
                {...register('title')}
              />
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-gray-700 text-sm font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                className="shadow-[inset_0_4px_10px_rgba(0,0,0,0.08)] p-2 rounded-md w-full min-h-[120px] placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter todo description"
                {...register('description')}
              />
            </div>

            {updateError && (
              <p className="text-sm text-red-500">
                {updateError.message || 'Failed to update todo.'}
              </p>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                className="px-4 py-2 rounded-md border border-gray-300 text-sm text-gray-700 hover:bg-gray-50"
                onClick={() => router.back()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting || isUpdating}
                className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700"
              >
                {isUpdating ? 'Saving...' : 'Save changes'}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
