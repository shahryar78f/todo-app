'use client';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { ProfileData as ProfileDataType } from '@/types/profile';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import ProfileData from './ProfileData';
import ProfileForm from './ProfileForm';

function ProfilePage() {
  const [data, setData] = useState<ProfileDataType | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { data: profileResponse } = useProfile();

  useEffect(() => {
    if (profileResponse?.status === 'success' && profileResponse.data) {
      setData(profileResponse.data);
    }
  }, [profileResponse]);

  const handleEdit = () => {
    if (data) {
      setIsEditing(true);
    }
  };

  return (
    <div className="w-full p-4">
      <h2 className="flex items-center text-[18px] font-bold gap-2 pb-3.5">
        <CgProfile />
        profile
      </h2>
      {data && !isEditing ? (
        <ProfileData data={data} onEdit={handleEdit} />
      ) : (
        <ProfileForm
          editMode={!!data && isEditing}
          defaultValues={
            data
              ? {
                  name: data.name,
                  lastName: data.lastName,
                }
              : undefined
          }
          onCancel={data ? () => setIsEditing(false) : undefined}
        />
      )}
    </div>
  );
}

export default ProfilePage;
