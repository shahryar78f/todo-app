'use client';
import { useDeleteTodo } from '@/features/todos/hooks/useDeleteTodo';
import { useGetAllTodos } from '@/features/todos/hooks/useGetAllTodos';
import { SortedTodos } from '@/types/todo';
import { Icon } from '@iconify/react';
import Tasks from '../modules/Tasks';

const initialTodos: SortedTodos = {
  todo: [],
  inProgress: [],
  review: [],
  done: [],
};

function HomePage() {
  const { data, isPending, error, refetch } = useGetAllTodos();
  const { mutate: deleteTodo } = useDeleteTodo();

  const todos: SortedTodos =
    data?.status === 'success'
      ? { ...initialTodos, ...(data.data.todos as SortedTodos) }
      : initialTodos;

  const fetchTodos = async () => {
    await refetch();
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Icon
          icon="eos-icons:three-dots-loading"
          width={100}
          height={100}
          className="text-gray-900"
        />
      </div>
    );
  }

  if (error || data?.status === 'failed') {
    return <div>Failed to load todos.</div>;
  }

  return (
    <div className="flex justify-around w-full ">
      <div className="self-start  bg-white shadow-2xl rounded-[7px] w-[22%]">
        <div className="bg-amber-500 p-2 rounded-t-[7px] text-center ">
          <p className="text-white font-semibold">todo</p>
        </div>
        {todos.todo && (
          <Tasks deleteTodo={deleteTodo} data={todos.todo ?? []} accentColor="bg-amber-500" fetchTodos={fetchTodos} next='inProgress' />
        )}
      </div>
      <div className="self-start rounded-[7px]  shadow-2xl w-[22%] ">
        <div className="bg-green-400 p-2 rounded-t-[7px] text-center ">
          <p className="text-white font-semibold">In Progress</p>
        </div>
        {todos.inProgress && (
          <Tasks deleteTodo={deleteTodo} data={todos.inProgress ?? []} accentColor="bg-green-400" fetchTodos={fetchTodos} next='review' back='todo' />
        )}
      </div>
      <div className="self-start bg-white rounded-[7px] shadow-2xl w-[22%]">
        <div className="bg-blue-600  p-2 rounded-t-[7px]  text-center ">
          <p className="text-white font-semibold">Review</p>
        </div>
        {todos.review && (
          <Tasks deleteTodo={deleteTodo} data={todos.review ?? []} accentColor="bg-blue-600" fetchTodos={fetchTodos} next='done' back='inProgress' />
        )}
      </div>
      <div className="self-start bg-white rounded-[7px] shadow-2xl w-[22%]">
        <div className="bg-cyan-400 p-2 rounded-t-[7px]  text-center ">
          <p className="text-white font-semibold">Done</p>
        </div>
        {todos.done && (
          <Tasks deleteTodo={deleteTodo} data={todos.done ?? []} accentColor="bg-cyan-400" fetchTodos={fetchTodos} back='review' />
        )}
      </div>
    </div>
  );
}

export default HomePage;
