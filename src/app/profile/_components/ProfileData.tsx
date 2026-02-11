import { ProfileData as ProfileDataType } from '@/types/profile';
import { FiEdit } from 'react-icons/fi';

interface ProfileDataProps {
  data: ProfileDataType;
  onEdit?: () => void;
}

function ProfileData({ data, onEdit }: ProfileDataProps) {
  return (
    <div className="bg-white rounded-xl shadow-[0_0_25px_rgba(0,0,0,0.12)] p-6 w-full max-w-md">
      <h3 className="text-gray-600 text-sm font-semibold uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
        Profile Information
      </h3>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-sm font-medium">Name</span>
            <p className="text-gray-800 font-semibold text-lg">{data.name}</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-sm font-medium">Last Name</span>
            <p className="text-gray-800 font-semibold text-lg">{data.lastName }</p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-gray-500 text-sm font-medium">Email</span>
            <p className="text-gray-800 font-semibold text-lg break-all">{data.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="flex items-center gap-2 text-base font-bold text-gray-500 cursor-pointer hover:text-gray-700 mt-1"
        >
          Edit
          <FiEdit />
        </button>
      </div>
    </div>
  );
}

export default ProfileData;
