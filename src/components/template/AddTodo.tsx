'use client'
import { useState } from 'react';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { BsAlignStart } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { GrAddCircle } from 'react-icons/gr';
import { MdDoneAll } from 'react-icons/md';
import { toast } from 'react-toastify';
import RadioButton from '../element/RadioButton';

function AddTodoPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('todo');
  const [loading, setLoading] = useState(false);

  const addHandler = async () => {
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedDescription) {
      toast.error('Title and Description are required!');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({ title: trimmedTitle, description: trimmedDescription, status }),
        headers: { 'Content-Type': 'application/json' },
      });
      const data = await res.json();

      if (data.status === 'success') {
        setTitle('');
        setDescription('');
        setStatus('todo');
        toast.success('Todo added!');
      } else {
        toast.error(data.message || 'Failed to add todo');
      }
    } catch {
      toast.error('Network error. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex  flex-col gap-12 w-full p-4">
      <h2 className="flex gap-2 items-center text-xl font-bold ">
        <GrAddCircle />
        Add New Todo
      </h2>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col">
          <label htmlFor="title" className="text-gray-500 text-[18px] font-bold">
            Title:
          </label>
          <input
            id="title"
            type="text"
            value={title}
            placeholder="title..."
            onChange={e => {
              setTitle(e.target.value);
            }}
            className="shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] p-1 rounded-[8px] h-10 w-80 placeholder:text-gray-400 focus:outline-none"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="description" className="text-gray-500 text-[18px] font-bold">
            Description:
          </label>
          <textarea
            id="description"
            value={description}
            placeholder='description...'
            onChange={e => {
              setDescription(e.target.value);
            }}
            className="shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] p-1 placeholder:text-gray-400 rounded-[8px] h-10 w-80 focus:outline-none min-h-32"
          />
        </div>
        <div className="flex flex-col gap-3">
          <RadioButton
            setStatus={setStatus}
            status={status}
            title="todo"
            value="todo"
            className=" bg-amber-500"
          >
            <BsAlignStart />
          </RadioButton>
          <RadioButton
            setStatus={setStatus}
            status={status}
            title="In Progress"
            value="inProgress"
            className="bg-green-400"
          >
            <FiSettings />
          </RadioButton>
          <RadioButton
            setStatus={setStatus}
            status={status}
            title="Review"
            value="review"
            className="bg-blue-600"
          >
            <AiOutlineFileSearch />
          </RadioButton>
          <RadioButton
            setStatus={setStatus}
            status={status}
            title="Done"
            value="done"
            className="bg-cyan-400"
          >
            <MdDoneAll />
          </RadioButton>
          <button
            className="bg-gray-400 w-fit border cursor-pointer border-gray-600 p-1 text-white text-base  rounded-[6px] disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={addHandler}
            disabled={loading}
          >
            {loading ? 'Adding...' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddTodoPage;
