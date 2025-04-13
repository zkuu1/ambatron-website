'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/db/firebase";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<null | User>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-white">
      <h1 className="text-4xl font-bold mb-4">Welcome, {user.displayName || user.email}!</h1>
      <p className="text-lg">You are logged in to the dashboard 🎉</p>
    </div>
  );
}
