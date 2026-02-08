import { Dispatch, SetStateAction } from 'react';

interface Profile {
  name: string;
  lastName: string;
  password: string;
  setName: Dispatch<SetStateAction<string>>;
  setLastName: Dispatch<SetStateAction<string>>;
  setPassword: Dispatch<SetStateAction<string>>;
  submitHandler: () => void;
  loading?: boolean;
  error?: string;
  editMode?: boolean;
  onCancel?: () => void;
}
function ProfileForm({
  lastName,
  name,
  password,
  setLastName,
  setName,
  setPassword,
  submitHandler,
  loading = false,
  error = '',
  editMode = false,
  onCancel,
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
        {!editMode && (
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
        )}
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={submitHandler}
          disabled={loading}
          className="bg-neutral-300 cursor-pointer p-1 rounded-[6px] w-20 text-[18px] font-semibold text-neutral-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? '...' : editMode ? 'save' : 'submit'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 cursor-pointer p-1 rounded-[6px] px-3 text-[18px] font-semibold text-neutral-700 hover:bg-gray-300"
          >
            cancel
          </button>
        )}
      </div>
    </>
  );
}

export default ProfileForm;
