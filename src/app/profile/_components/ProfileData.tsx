import { ProfileData as ProfileDataType } from '@/types/profile';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { CgProfile } from 'react-icons/cg';

interface ProfileDataProps {
  data: ProfileDataType;
  onEdit?: () => void;
}

function ProfileData({ data, onEdit }: ProfileDataProps) {
  return (
    <div className="bg-white rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.12)] p-6 w-full max-w-fit">
      <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
        Profile Information
      </h3>
      <div className="flex items-center gap-20">
        <div>
          {data?.avatar ? (
            <Image
              src={data.avatar}
              alt="avatar"
              width={100}
              height={100}
              className="w-25 h-25 rounded-full object-cover"
            />
          ) : (
            <CgProfile className="text-3xl text-gray-400" />
          )}
        </div>
        <div>
          <p className="text-gray-800 text-sm font-semibold uppercase tracking-wider mb-2">
            full Name:
          </p>
          <p className="text-gray-600 text-xl uppercase font-bold tracking-wider mb-2">
            {data?.name} {data?.lastName}
          </p>
        </div>
        <div>
          <p className="text-gray-800 text-sm font-semibold uppercase tracking-wider mb-2">
            Email:
          </p>
          <p className="text-gray-600 text-xl uppercase font-bold tracking-wider mb-2">
            {data?.email}
          </p>
        </div>

        <div>
          <button
            onClick={onEdit}
            className="flex items-center gap-2 bg-blue-400 text-white py-2 px-4 rounded"
          >
            Edit <Icon icon="line-md:edit-filled" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProfileData;
