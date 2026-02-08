import { Todo } from '@/types/todo';
import { BiLeftArrow, BiRightArrow } from 'react-icons/bi';
import { RiMastodonLine } from 'react-icons/ri';

interface TasksProps {
  data: Todo[];
  accentColor?: string;
  fetchTodos: () => Promise<void>;
  back?: string;
  next?: string;
}

function Tasks({ data, accentColor, fetchTodos, back, next }: TasksProps) {
  const chengStatus = async (id: string, status: string) => {
    const res = await fetch('/api/todos', {
      method: 'PATCH',
      body: JSON.stringify({ id, status }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
    if (data.status === 'success') fetchTodos();
  };
  return (
    <div className="flex flex-col gap-6 justify-between p-2 pt-4">
      {data.map(item => (
        <div
          key={item._id}
          className="flex flex-col gap-6  p-3 rounded-md bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)]"
        >
          <span className={`w-[50%] h-[2px] ${accentColor} block`} />
          <div>
            <RiMastodonLine />
            <h4 className="text-base font-semibold">{item.title}</h4>
            <p>{item.description}</p>
            <div className={`flex justify-between ${!back && 'justify-end'}`}>
              {back && (
                <button
                  className="flex items-center p-0.5 cursor-pointer rounded-sm text-yellow-700 font-semibold bg-amber-200"
                  onClick={() => chengStatus(item._id, back)}
                >
                  <BiLeftArrow />
                  Back
                </button>
              )}
              {next && (
                <button
                  className="flex items-center p-0.5 cursor-pointer rounded-sm font-semibold text-green-800 bg-green-300 "
                  onClick={() => chengStatus(item._id, next)}
                >
                  Next
                  <BiRightArrow />
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
