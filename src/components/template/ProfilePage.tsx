'use client';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { CgProfile } from 'react-icons/cg';
import ProfileForm from '../modules/ProfileForm';
import ProfileData from '../modules/ProfileData';
import { ProfileData as ProfileDataType } from '@/types/profile';

function ProfilePage() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState<ProfileDataType | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchProfile();
  }, []);
  const fetchProfile = async () => {
    const res = await fetch('/api/profile');
    const data = await res.json();
    if (data.status === 'success' && data.data.name && data.data.lastName) {
      setData(data.data);
    }
  };

  const submitHandler = async () => {
    setLoading(true);
    setError('');
    try {
      if (isEditing) {
        const res = await fetch('/api/profile', {
          method: 'PUT',
          body: JSON.stringify({ name, lastName }),
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await res.json();
        if (result.status === 'success') {
          toast.success(result.message);
          setData(prev => (prev ? { ...prev, name, lastName } as ProfileDataType : null));
          setIsEditing(false);
        } else {
          setError(result.message);
        }
      } else {
        const res = await fetch('/api/profile', {
          method: 'POST',
          body: JSON.stringify({ name, lastName, password }),
          headers: { 'Content-Type': 'application/json' },
        });
        const result = await res.json();
        if (result.status === 'success') {
          toast.success(result.message);
          await fetchProfile();
        } else {
          setError(result.message);
        }
      }
    } catch {
      setError('Communication was not established');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (data) {
      setName(data.name);
      setLastName(data.lastName);
      setPassword('');
      setError('');
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
          name={name}
          setName={setName}
          lastName={lastName}
          setLastName={setLastName}
          password={password}
          setPassword={setPassword}
          submitHandler={submitHandler}
          loading={loading}
          error={error}
          editMode={isEditing}
          onCancel={isEditing ? () => setIsEditing(false) : undefined}
        />
      )}
    </div>
  );
}

export default ProfilePage;
