import { Dispatch, SetStateAction } from 'react';

interface Profile {
  name: string;
  lastName: string;
  password: string;
  setName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  submitHandler: () => void;
}
function ProfileForm({
  lastName,
  name,
  password,
  setLastName,
  setName,
  setPassword,
  submitHandler,
}: Profile) {
  return (
    <>
      <div className="flex flex-col gap-3 w-[45%]">
        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-gray-500 text-base font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={e => setName(e.target.value)}
            className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] p-1 rounded-[6px] focus:outline-none text-gray-700 font-bold"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="lastName" className="text-gray-500 text-base font-semibold">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={e => setLastName(e.target.value)}
            className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] p-1 rounded-[6px] focus:outline-none text-gray-700 font-bold"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="password" className="text-gray-500 text-base font-semibold">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="bg-white shadow-[0_0_20px_rgba(0,0,0,0.15)] p-1 rounded-[6px] focus:outline-none text-gray-700 font-bold"
          />
        </div>
      </div>
      <button onClick={submitHandler} className='bg-neutral-300 cursor-pointer p-1 rounded-[6px] w-20 mt-4 text-[18px] font-semibold text-neutral-700'>submit</button>
    </>
  );
}

export default ProfileForm;
