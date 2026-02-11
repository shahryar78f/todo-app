'use client'
import ProfilePage from '@/app/profile/_components/ProfilePage';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

function Profile() {

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/signup");
    }
  }, [status, router]);

  if (status === "unauthenticated" || status === "loading") {
    return null;
  }

  return <ProfilePage />;
}

export default Profile;
