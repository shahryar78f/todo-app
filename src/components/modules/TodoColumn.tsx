import { Todo } from '@/types/todo';
import Tasks from './Tasks';

interface TodoColumnProps {
  title: string;
  accentColor: string;
  data: Todo[];
  deleteTodo: (id: string) => void;
  fetchTodos: () => Promise<void>;
  next?: string;
  back?: string;
  className?: string;
}

function TodoColumn({
  title,
  accentColor,
  data,
  deleteTodo,
  fetchTodos,
  next,
  back,
  className = '',
}: TodoColumnProps) {
  return (
    <div className={`self-start bg-white shadow-2xl rounded-[7px] w-full xl:w-[22%] ${className}`}>
      <div className={`${accentColor} p-2 rounded-t-[7px] text-center`}>
        <p className="text-white font-semibold">{title}</p>
      </div>
      <Tasks
        deleteTodo={deleteTodo}
        data={data}
        accentColor={accentColor}
        fetchTodos={fetchTodos}
        next={next}
        back={back}
      />
    </div>
  );
}

export default TodoColumn;
