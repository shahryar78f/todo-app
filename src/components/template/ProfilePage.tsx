'use client';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import ProfileForm from '../modules/ProfileForm';
import ProfileData from '../modules/ProfileData';

function ProfilePage() {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [data, setData] = useState(null);

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
    const res = await fetch('/api/profile', {
      method: 'POST',
      body: JSON.stringify({ name, lastName, password }),
      headers: { 'Content-Type': 'application/json' },
    });
    const data = await res.json();
  };

  return (
    <div className="w-full p-4">
      <h2 className="flex items-center text-[18px] font-bold gap-2 pb-3.5">
        <CgProfile />
        profile
      </h2>
      {data ? (
        <ProfileData data={data}/>
      ) : (
        <ProfileForm
          name={name}
          setName={setName}
          lastName={lastName}
          setLastName={setLastName}
          password={password}
          setPassword={setPassword}
          submitHandler={submitHandler}
        />
      )}
    </div>
  );
}

export default ProfilePage;
