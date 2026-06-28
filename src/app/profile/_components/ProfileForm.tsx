import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { useCreateProfile } from '@/features/profile/hooks/useCreateProfile';
import { useUpdateProfile } from '@/features/profile/hooks/useUpdateProfile';
import { zodResolver } from '@hookform/resolvers/zod';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { ProfileFormData, profileSchema } from './schema';

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

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: createProfile, isPending: isCreating } = useCreateProfile();
  const { mutate: updateProfile, isPending: isUpdating } = useUpdateProfile();

  const removeAvatar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setValue('avatar', undefined);
    setLocalAvatar(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    const avatar = data.avatar?.trim() ? data.avatar : undefined;

    if (editMode) {
      updateProfile(
        {
          name: data.name,
          lastName: data.lastName,
          ...(avatar ? { avatar } : {}),
        },
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
        {
          name: data.name,
          lastName: data.lastName,
          password: data.password,
          ...(avatar ? { avatar } : {}),
        },
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
        <label
          htmlFor="avatar"
          className="relative text-gray-500 text-base font-semibold cursor-pointer w-fit h-25 flex flex-col items-center justify-center gap-2 border border-dashed border-gray-300 rounded-2xl p-2 hover:bg-gray-100 hover:border-gray-400 transition-all overflow-hidden"
        >
          {localAvatar ? (
            <Image
              src={localAvatar}
              alt="avatar"
              width={112}
              height={112}
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <>
              <Icon icon="material-symbols-light:add-a-photo-outline-rounded" width={20} height={20} />
              set photo
            </>
          )}
          {localAvatar && (
            <button
              type="button"
              onClick={removeAvatar}
              className="absolute top-1 right-1 flex items-center justify-center w-7 h-7 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
              aria-label="Remove photo"
            >
              <Icon icon="material-symbols:delete" width={22} height={22} />
            </button>
          )}
        </label>
        <input
          ref={fileInputRef}
          className="hidden"
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
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-1">
          <Input label="Name" type="text" placeholder="Name" {...register('name')} />
          <p className="min-h-[18px] text-sm text-red-500">{errors.name?.message}</p>
        </div>
        <div className="flex flex-col gap-1">
          <Input label="Last Name" type="text" placeholder="Last Name" {...register('lastName')} />
          <p className="min-h-[18px] text-sm text-red-500">{errors.lastName?.message}</p>
        </div>
        {!editMode && (
          <div className="flex flex-col gap-1">
            <Input
              label="Password"
              type="password"
              placeholder="Password"
              {...register('password')}
            />
            <p className="min-h-[18px] text-sm text-red-500">{errors.password?.message}</p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mt-2">
        <Button
          type="submit"
          variant="secondary"
          disabled={loading}
          className="bg-blue-400 cursor-pointer p-2 rounded-md w-20 text-2xl font-semibold text-white disabled:opacity-50 disabled:cursor-not-allowed"
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
        </Button>
        {onCancel && (
          <Button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 cursor-pointer p-2 rounded-[6px] px-3 text-2xl font-semibold text-neutral-700 hover:bg-gray-300"
          >
            cancel
          </Button>
        )}
      </div>
    </form>
  );
}

export default ProfileForm;
