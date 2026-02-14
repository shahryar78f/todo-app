'use client';
import { useProfile } from '@/features/profile/hooks/useProfile';
import { Icon } from '@iconify/react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { CgProfile } from 'react-icons/cg';

function Layout({ children }: any) {
  const { data: profile } = useProfile();

  const { status } = useSession();
  const logoutHandler = () => {
    signOut();
  };
  return (
    <div>
      <header className="flex justify-between bg-blue-600 w-full p-2 pl-10 h-32">
        <p className="text-white text-3xl font-bold">TODO APP</p>
        {status === 'authenticated' && (
          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 border font-bold cursor-pointer text-white px-4 h-fit mt-10 py-2 rounded transition-colors duration-200 ease-in-out hover:text-red-400"
          >
            logout
            <Icon icon="icon-park-outline:logout" />
          </button>
        )}
      </header>
      <div className="flex absolute w-full">
        <aside className=" pl-10 w-[20%] bg-white p-6 h-full relative left-0 -top-20 rounded-tr-3xl min-h-[calc(100vh-128px)] ">
          <p className="text-2xl font-bold pb-16">welcome 👋</p>
          <div className="flex flex-col gap-4">
            {profile?.data?.avatar ? (
              <Image
                src={profile?.data?.avatar}
                alt="avatar"
                width={20}
                height={20}
                className="object-cover w-20 h-20 rounded-full"
              />
            ) : (
              <CgProfile className="text-3xl text-gray-400" />
            )}
            <h4 className="text-base font-medium text-zinc-500 border-b w-fit mb-3">
              {profile?.data?.name ? `${profile?.data?.name} ${profile?.data?.lastName}` : ''}
            </h4>
          </div>

          <ul className="flex flex-col divide-y divide-gray-400 text-gray-700 text-2xl font-medium">
            <li className="flex items-center gap-3 py-4">
              <Icon icon="codicon:list-selection" />
              <Link href="/">todos</Link>
            </li>
            <li className="flex items-center gap-3 py-4">
              <Icon icon="solar:add-folder-outline" />
              <Link href="/add-todo">add todo</Link>
            </li>
            <li className="flex items-center gap-3 py-4">
              <Icon icon="lineicons:dashboard-square-1" />
              <Link href="/profile">profile</Link>
            </li>
          </ul>
        </aside>
        <section className="p-3 bg-gray-50 w-full flex flex-col items-center">{children}</section>
      </div>
    </div>
  );
}

export default Layout;
