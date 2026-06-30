'use client';
import { useDeleteTodo } from '@/features/todos/hooks/useDeleteTodo';
import { useGetAllTodos } from '@/features/todos/hooks/useGetAllTodos';
import { SortedTodos } from '@/types/todo';
import { Icon } from '@iconify/react';
import TodoColumn from '../modules/TodoColumn';

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
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 w-full pt-4">
      <TodoColumn
        title="todo"
        accentColor="bg-amber-500"
        data={todos.todo ?? []}
        deleteTodo={deleteTodo}
        fetchTodos={fetchTodos}
        next="inProgress"
      />
      <TodoColumn
        title="In Progress"
        accentColor="bg-green-400"
        data={todos.inProgress ?? []}
        deleteTodo={deleteTodo}
        fetchTodos={fetchTodos}
        back="todo"
        next="review"
      />
      <TodoColumn
        title="Review"
        accentColor="bg-blue-600"
        data={todos.review ?? []}
        deleteTodo={deleteTodo}
        fetchTodos={fetchTodos}
        back="inProgress"
        next="done"
      />

      <TodoColumn
        title="Done"
        accentColor="bg-cyan-400"
        data={todos.done ?? []}
        deleteTodo={deleteTodo}
        fetchTodos={fetchTodos}
        back="review"
      />
    </div>
  );
}

export default HomePage;
