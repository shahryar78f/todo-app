'use client';

import HomePage from '@/components/template/HomePage';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
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

  return <HomePage />;
}
