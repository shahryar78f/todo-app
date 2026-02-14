'use client'
import { useUpdateTodoStatus } from '@/features/todos/hooks/useUpdateTodoStatus';
import { Todo, TodoStatus } from '@/types/todo';
import { formatDate, truncateWords } from '@/utils';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface TasksProps {
  data: Todo[];
  accentColor?: string;
  fetchTodos: () => Promise<void>;
  back?: string;
  next?: string;
  deleteTodo: (id: string) => void;
}

function Tasks({ data, accentColor, fetchTodos, back, next, deleteTodo }: TasksProps) {
  const router = useRouter();
  const { mutate: chengStatus, isPending } = useUpdateTodoStatus();

  const handleStatusChange = (id: string, status: string) => {
    chengStatus(
      { id, status: status as TodoStatus },
      {
        onSuccess: (response) => {
          if (response.status === 'success') {
            fetchTodos();
          }
        },
        onError: (error) => {
          console.error('Failed to change todo status', error);
        },
      }
    );
  };

  if (!data.length) {
    return (
      <div className="flex flex-col items-center p-5 rounded-b-lg gap-2">
        <Icon
          icon="material-symbols-light:info-outline-rounded"
          width={40}
          height={40}
          className="text-red-500"
        />
        <p className="text-red-500 text-xl font-medium">There are no todos</p>
        <button
          className="flex items-center gap-1 justify-center bg-blue-800 w-16 p-1 text-white text-base rounded-[6px]"
          onClick={() => router.push('/add-todo')}
        >
          add <Icon icon="gridicons:add-outline" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 justify-between p-2 pt-4 ">
      {data.map(item => (
        <div
          className="flex flex-col gap-6  p-3 rounded-md self-auto bg-gray-50 transition-all duration-300 ease-out hover:scale-[1.03] hover:-translate-y-1 hover:shadow-xl shadow-[0_0_20px_rgba(0,0,0,0.15)]"
          key={item._id}
        >
          <div className="flex items-center justify-between">
            <span className={`w-[50%] h-[2px] ${accentColor} block`} />
            <span className="flex items-center text-neutral-500 font-bold gap-2">
              <Icon icon="ri:time-line" width={20} height={20} />{' '}
              {formatDate(item.createdAt || '')}{' '}
            </span>
          </div>
          <div className="w-full">
            <Link href={`/todos/${item._id}`} className="">
              <div className="flex justify-between w-full px-1">
                <Icon icon="wpf:todo-list" />
                <Icon icon="ant-design:info-circle-outlined" width={20} height={20} />
              </div>
              <h4 className="text-base font-semibold shadow-md bg-white p-2 rounded-lg mt-2">
                {item.title}
              </h4>
              <p className="text-base font-semibold shadow-md bg-white p-3 rounded-lg mt-2 mb-3">
                {truncateWords(item.description, 7)}
              </p>
            </Link>
            <div className={`flex justify-between ${!back && 'justify-end'}`}>
              {back && (
                <button
                  className="flex items-center p-0.5 cursor-pointer rounded-sm text-yellow-700 font-semibold bg-amber-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleStatusChange(item._id, back)}
                  disabled={isPending}
                >
                  <Icon icon="bx:left-arrow" />
                  {isPending ? (
                    <Icon
                      icon="eos-icons:three-dots-loading"
                      width={32}
                      height={25}
                      className="text-gray-600"
                    />
                  ) : (
                    'Back'
                  )}
                </button>
              )}
              {next && (
                <button
                  className="flex items-center p-0.5 cursor-pointer rounded-sm font-semibold text-green-800 bg-green-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={() => handleStatusChange(item._id, next)}
                  disabled={isPending}
                >
                  {isPending ? (
                    <Icon
                      icon="eos-icons:three-dots-loading"
                      width={32}
                      height={22}
                      className="text-green-900"
                    />
                  ) : (
                    'Next'
                  )}
                  <Icon icon="bx:right-arrow" />
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Tasks;
