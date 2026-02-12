'use client';
import { Icon } from '@iconify/react';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

function Layout({ children }: any) {
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
          <p className="text-2xl font-bold pb-4">welcome 👋</p>
          <ul className="flex flex-col gap-5 text-gray-700 text-base font-medium">
            <li className="flex items-center gap-3">
              <Icon icon="codicon:list-selection" />
              <Link href="/">todos</Link>
            </li>
            <li className="flex items-center gap-3">
              <Icon icon="solar:add-folder-outline" />
              <Link href="/add-todo">add todo</Link>
            </li>
            <li className="flex items-center gap-3">
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
