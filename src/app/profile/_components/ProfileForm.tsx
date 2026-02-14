import { useCreateProfile } from '@/features/profile/hooks/useCreateProfile';
import { useUpdateProfile } from '@/features/profile/hooks/useUpdateProfile';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ProfileFormData, profileSchema } from './schema';
import Image from 'next/image';

interface ProfileFormProps {
  defaultValues?: {
    name?: string;
    lastName?: string;
    avatar?: string;
  };
  editMode?: boolean;
  onCancel?: () => void;
}

function ProfileForm({ defaultValues, editMode = false, onCancel }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: defaultValues?.name ?? '',
      lastName: defaultValues?.lastName ?? '',
      password: '',
      avatar: (defaultValues as any)?.avatar ?? '',
    },
  });

  const [localAvatar, setLocalAvatar] = useState<string | null>(
    (defaultValues as any)?.avatar ?? null,
  );

  const avatarValue = watch('avatar');

  const { mutate: createProfile, isPending: isCreating } = useCreateProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const onSubmit = (data: ProfileFormData) => {
    if (editMode) {
      updateProfile(
        { name: data.name, lastName: data.lastName, avatar: data.avatar },
        {
          onSuccess: result => {
            if (result.status === 'success') {
              toast.success(result.message || 'Profile updated successfully');
              onCancel?.();
            } else {
              toast.error(result.message || 'Failed to update profile');
            }
          },
          onError: error => {
            toast.error(error.message || 'Communication was not established');
          },
        },
      );
    } else {
      if (!data.password || data.password.trim().length < 5) {
        toast.error('Password must be at least 5 characters');
        return;
      }

      createProfile(
        { name: data.name, lastName: data.lastName, password: data.password, avatar: data.avatar },
        {
          onSuccess: result => {
            if (result.status === 'success') {
              toast.success(result.message || 'Profile created successfully');
            } else {
              toast.error(result.message || 'Failed to create profile');
            }
          },
          onError: error => {
            toast.error(error.message || 'Communication was not established');
          },
        },
      );
    }
  };

  const loading = isCreating || isUpdating;

  return (
    <form className="flex flex-col gap-4 w-[45%]" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-1">
        <label htmlFor="avatar" className="text-gray-500 text-base font-semibold">
          Avatar
        </label>
        <input
        className='hidden'
          type="file"
          id="avatar"
          accept="image/*"
          onChange={e => {
            const file = e.target.files?.[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = () => {
              const result = reader.result as string;
              setValue('avatar', result);
              setLocalAvatar(result);
            };
            reader.readAsDataURL(file);
          }}
        />
        {localAvatar && (
          <Image  
            src={localAvatar}
            alt="avatar"
            width={100}
            height={100}
            className="w-28 h-28 rounded-full mt-2 object-cover"
          />
        )}
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-gray-500 text-base font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] p-2 h-16 text-2xl rounded-[6px] focus:outline-none text-gray-700 font-bold"
            {...register('name')}
          />
          <p className="min-h-[18px] text-sm text-red-500">{errors.name?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastName" className="text-gray-500 text-base font-semibold">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] p-2 h-16 text-2xl rounded-[6px] focus:outline-none text-gray-700 font-bold"
            {...register('lastName')}
          />
          <p className="min-h-[18px] text-sm text-red-500">{errors.lastName?.message}</p>
        </div>
        {!editMode && (
          <div className="flex flex-col gap-1">
            <label htmlFor="password" className="text-gray-500 text-base font-semibold">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] p-2 h-16 text-2xl  rounded-[6px] focus:outline-none text-gray-700 font-bold"
              {...register('password')}
            />
            <p className="min-h-[18px] text-sm text-red-500">{errors.password?.message}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-400 cursor-pointer p-2 rounded-[6px] w-20 text-2xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <Icon
              icon="eos-icons:three-dots-loading"
              width={40}
              height={27}
              className="text-white"
            />
          ) : editMode ? (
            'save'
          ) : (
            'submit'
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 cursor-pointer p-2 rounded-[6px] px-3 text-2xl font-semibold text-neutral-700 hover:bg-gray-300"
          >
            cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default ProfileForm;
