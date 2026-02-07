import { Todo } from '@/types/todo';

const sortTodos = (todos: Todo[]): Record<string, Todo[]> => {
  const sortedData: Record<string, Todo[]> = {};
  todos.forEach((todo) => {
    if (!sortedData[todo.status]) sortedData[todo.status] = [];
    sortedData[todo.status].push(todo);
  });
  return sortedData;
};

export { sortTodos };
