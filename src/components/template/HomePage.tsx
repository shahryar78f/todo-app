'use client';
import { SortedTodos } from '@/types/todo';
import { useEffect, useState } from 'react';
import Tasks from '../modules/Tasks';

const initialTodos: SortedTodos = {
  todo: [],
  inProgress: [],
  review: [],
  done: [],
};

function HomePage() {
  const [todos, setTodos] = useState<SortedTodos>(initialTodos);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    const res = await fetch('/api/todos');
    const data = await res.json();
    if (data.status === 'success') {
      setTodos({ ...initialTodos, ...data.data.todos });
    }
  };

  return (
    <div className="flex justify-around w-full ">
      <div className="bg-white  shadow-2xl rounded-[7px] w-[22%]">
        <div className="bg-amber-500 p-2 rounded-t-[7px] text-center ">
          <p className="text-white font-semibold">todo</p>
        </div>
        {todos.todo && (
          <Tasks data={todos.todo ?? []} accentColor="bg-amber-500" fetchTodos={fetchTodos} next='inProgress' />
        )}
      </div>
      <div className="bg-white rounded-[7px]  shadow-2xl w-[22%] ">
        <div className="bg-green-400 p-2 rounded-t-[7px] text-center ">
          <p className="text-white font-semibold">In Progress</p>
        </div>
        {todos.inProgress && (
          <Tasks data={todos.inProgress ?? []} accentColor="bg-green-400" fetchTodos={fetchTodos} next='review' back='todo' />
        )}
      </div>
      <div className="bg-white rounded-[7px] shadow-2xl w-[22%]">
        <div className="bg-blue-600  p-2 rounded-t-[7px]  text-center ">
          <p className="text-white font-semibold">Review</p>
        </div>
        {todos.review && (
          <Tasks data={todos.review ?? []} accentColor="bg-blue-600" fetchTodos={fetchTodos} next='done' back='inProgress' />
        )}
      </div>
      <div className="bg-white rounded-[7px] shadow-2xl w-[22%]">
        <div className="bg-cyan-400 p-2 rounded-t-[7px]  text-center ">
          <p className="text-white font-semibold">Done</p>
        </div>
        {todos.done && (
          <Tasks data={todos.done ?? []} accentColor="bg-cyan-400" fetchTodos={fetchTodos} back='review' />
        )}
      </div>
    </div>
  );
}

export default HomePage;
