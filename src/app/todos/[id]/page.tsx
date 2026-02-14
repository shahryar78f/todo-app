'use client';

import Loading from '@/app/loading';
import { useDeleteTodo } from '@/features/todos/hooks/useDeleteTodo';
import { useGetTodo } from '@/features/todos/hooks/useGetTodo';
import { useUpdateTodo } from '@/features/todos/hooks/useUpdateTodo';
import { formatDate, formatTime } from '@/utils';
import { Icon } from '@iconify/react';
import { useSession } from 'next-auth/react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface TodoFormValues {
  title: string;
  description: string;
}

export default function TodoDetailPage() {
  const [isEditing, setIsEditing] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const todoId = params.id;

  const toggleEditing = () => {
    setIsEditing(prev => !prev);
  };
  

  const { mutate: deleteTodo, isPending: isDeleting } = useDeleteTodo();


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
    formState: { isSubmitting, isDirty },
  } = useForm<TodoFormValues>({
    defaultValues: {
      title: '',
      description: '',
    },
  });

  const { mutate: updateTodo, isPending: isUpdating, error: updateError } = useUpdateTodo();

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

  const handleDelete = () => {
    if (!todoId) return;

    deleteTodo(todoId, {
      onSuccess: () => {
        toast.success('Todo deleted successfully ✅');
        router.push('/');
      },
      onError: () => {
        toast.error('Delete failed ❌');
      },
    });
  };

  const onSubmit = handleSubmit(values => {
    if (!todoId) return;
    const trimmedTitle = values.title.trim();
    const trimmedDescription = values.description.trim();
    if (!trimmedTitle || !trimmedDescription) return;

    updateTodo(
      {
        id: todoId,
        title: trimmedTitle,
        description: trimmedDescription,
      },
      {
        onSuccess: () => {
          toast.success('Todo updated successfully ✅');
          setIsEditing(false);
        },
        onError: () => {
          toast.error('Update failed ❌');
        },
      },
    );
  });
  

  if (status === 'unauthenticated' || status === 'loading') {
    return null;
  }

  if (isTodoLoading) {
    return <Loading />;
  }

  if (todoError || !todo || data?.status === 'failed') {
    return (
      <main className="flex items-center justify-center ">
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
    <main className="flex items-center justify-center w-full h-full">
      {isEditing ? (
        <section className="w-full max-w-xl rounded-md bg-white p-6 shadow-[0_0_20px_rgba(0,0,0,0.15)] space-y-4">
          <span className="block h-[2px] w-1/2 bg-blue-500" />

          <div>
            <h1 className="text-2xl font-semibold mb-2">Edit Todo</h1>

            <p className="text-sm text-gray-500 mb-4">
              Status:
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
                  className="shadow-[inset_0_4px_10px_rgba(0,0,0,0.08)] p-3 rounded-md w-full placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter todo title"
                  {...register('title')}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="description" className="text-gray-700 text-sm font-medium mb-1">
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
                  className="px-4 py-2 rounded-md border border-gray-300 text-sm font-medium text-gray-700 bg-gray-300 hover:bg-gray-400"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || isUpdating || !isDirty}
                  className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700"
                >
                  {isUpdating ? (
                    <Icon
                      icon="eos-icons:three-dots-loading"
                      width={60}
                      height={20}
                      className="text-white"
                    />
                  ) : (
                    <>Update</>
                  )}
                </button>
              </div>
            </form>
          </div>
        </section>
      ) : (
        <div className="w-full max-w-xl rounded-md bg-gray-100 p-6 shadow-[0_0_20px_rgba(0,0,0,0.15)] space-y-4">
          <div className="flex justify-between items-center">
            <span className="block h-[2px] w-1/2 bg-blue-500" />
            <span className="text-sm font-medium flex items-center gap-1 text-gray-700 ">
              <Icon icon="icon-park-solid:time" /> {formatDate(todo.createdAt || '')} {''}
              {formatTime(todo.createdAt || '')}
            </span>
            <button
              onClick={() => router.push('/')}
              className="flex items-center gap-0.5 font-medium bg-emerald-200 rounded-[5px] p-0.5 cursor-pointer transition-all duration-300 ease-out hover:scale-[1] hover:-translate-y-1 "
            >
              See all todos <Icon icon="basil:arrow-right-solid" />
            </button>
          </div>
          <div>
            <h1 className="text-2xl font-semibold mb-2">
              <Icon
                icon="material-symbols-light:folder-eye-rounded"
                width={30}
                height={30}
                className="text-blue-950"
              />
            </h1>
            <div className="flex items-center justify-between px-3 pb-3 mb-1">
              <p className="text-base text-gray-600 font-medium mb-4">
                Status:
                <span className="font-medium capitalize">
                  {todo.status === 'inProgress' ? 'In Progress' : todo.status}
                </span>
              </p>
              <div className="flex gap-12">
                <button type="button" className="cursor-pointer" onClick={toggleEditing}>
                  <Icon icon="line-md:edit" width={22} height={22} className="text-gray-500" />
                </button>
                <button
                  type="button"
                  className="cursor-pointer"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <Icon
                      icon="eos-icons:three-dots-loading"
                      width={60}
                      height={40}
                      className="text-red-600"
                    />
                  ) : (
                    <Icon
                      icon="material-symbols:delete"
                      width={22}
                      height={22}
                      className="text-red-500"
                    />
                  )}
                </button>
              </div>
            </div>
            <div onSubmit={onSubmit} className="space-y-4 flex flex-col gap-6">
              <h3 className="p-3 bg-white rounded-xl shadow-2xl text-xl font-semibold">
                {todo.title}
              </h3>
              <p className="p-3 bg-gray-50 shadow-2xl text-xl font-medium rounded-xl ">
                {todo.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
