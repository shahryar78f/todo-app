'use client'
import { useState } from 'react';
import { BsAlignStart } from 'react-icons/bs';
import { GrAddCircle } from 'react-icons/gr';
import RadioButton from '../element/RadioButton';

function AddTodoPage() {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('todo');
  return (
    <div className='flex  flex-col gap-12'>
      <h2 className='flex gap-2 items-center text-xl font-bold '>
        <GrAddCircle />
        Add New Todo
      </h2>
      <div className='flex flex-col gap-8'>
        <div className='flex flex-col'>
          <label htmlFor="title" className='text-gray-500 text-[18px] font-bold'>Title:</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
            }}
            className='shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)] p-1 rounded-[8px] h-10 w-80 focus:outline-none'
          />
        </div>
        <div>
          <div>
            <RadioButton setStatus={setStatus} status={status} title="todo" value="todo">
              <BsAlignStart />
            </RadioButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodoPage;
