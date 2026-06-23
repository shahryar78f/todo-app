'use client';
import { useAddTodo } from '@/features/todos/hooks/useAddTodo';
import type { TodoStatus } from '@/types/todo';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { Controller, useForm } from 'react-hook-form';
import { AiOutlineFileSearch } from 'react-icons/ai';
import { BsAlignStart } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { GrAddCircle } from 'react-icons/gr';
import { MdDoneAll } from 'react-icons/md';
import { toast } from 'react-toastify';
import RadioButton from './element/RadioButton';
import { addTodoSchema, type AddTodoFormData } from './schema';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';

function AddTodoPage() {
  const { mutate: addTodo, isPending } = useAddTodo();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<AddTodoFormData>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: { status: 'todo' },
  });

  const onSubmit = (data: AddTodoFormData) => {
    const trimmedTitle = data.title.trim();
    const trimmedDescription = data.description.trim();

    addTodo(
      { title: trimmedTitle, description: trimmedDescription, status: data.status },
      {
        onSuccess: response => {
          if (response.status === 'success') {
            reset({ status: 'todo', title: '', description: '' });
            toast.success('Todo added!');
          } else {
            toast.error(response.message || 'Failed to add todo');
          }
        },
        onError: (error: any) => {
          const message =
            error?.response?.data?.message || error?.message || 'Network error. Try again.';
          toast.error(message);
        },
      },
    );
  };

  return (
    <div className="flex  flex-col gap-12 w-full p-4">
      <h2 className="flex gap-2 items-center text-xl font-bold ">
        <GrAddCircle />
        Add New Todo
      </h2>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <Input
            label="Title"
            type="text"
            placeholder="title..."
            className="w-80"
            {...register('title')}
          />
          <p className="min-h-[20px] text-sm text-red-500">{errors.title?.message}</p>
        </div>
        <div className="flex flex-col">
          <Textarea
            label="Description"
            placeholder="description..."
            className="shadow-[inset_0_4px_10px_rgba(0,0,0,0.15)]  placeholder:text-gray-400 rounded-[8px] h-10 w-80 focus:outline-none min-h-32"
            {...register('description')}
          />
          <p className="min-h-[20px] text-sm text-red-500">{errors.description?.message}</p>
        </div>
        <div className="flex flex-col gap-3">
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <>
                <RadioButton
                  setStatus={value => field.onChange(value)}
                  status={field.value as TodoStatus}
                  title="todo"
                  value="todo"
                  className=" bg-amber-500"
                >
                  <BsAlignStart />
                </RadioButton>
                <RadioButton
                  setStatus={value => field.onChange(value)}
                  status={field.value as TodoStatus}
                  title="In Progress"
                  value="inProgress"
                  className="bg-green-400"
                >
                  <FiSettings />
                </RadioButton>
                <RadioButton
                  setStatus={value => field.onChange(value)}
                  status={field.value as TodoStatus}
                  title="Review"
                  value="review"
                  className="bg-blue-600"
                >
                  <AiOutlineFileSearch />
                </RadioButton>
                <RadioButton
                  setStatus={value => field.onChange(value)}
                  status={field.value as TodoStatus}
                  title="Done"
                  value="done"
                  className="bg-cyan-400"
                >
                  <MdDoneAll />
                </RadioButton>
              </>
            )}
          />
          <Button
            type="submit"
            className="w-fit h-8 px-2 text-base"
            variant='secondary'
            size='sm'
            disabled={isPending}
          >
            {isPending ? (
              <Icon
                icon="eos-icons:three-dots-loading"
                width={30}
                height={20}
                className="text-gray-600"
              />
            ) : (
              'Add'
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default AddTodoPage;
