'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/db/firebase";
import Image from "next/image";

interface Skin {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
}

interface LeaderboardData {
  rank: number;
  points: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<null | User>(null);
  const [skins, setSkins] = useState<Skin[]>([]);
  const [score, setScore] = useState<number>(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
       
        setScore(44872);
        setLeaderboard({ rank: 1, points: 44872 });
        setSkins([ 
          { 
            id: "blue_cosmos", 
            name: "Blue Cosmos", 
            description: "Skin default luar angkasa", 
            imageUrl: "/plane/classic_plane.png" 
          }, 
          { 
            id: "retro_sky", 
            name: "Retro Sky", 
            description: "Gaya retro tahun 90an", 
            imageUrl: "/plane/space_defender.png" 
          },
          { 
            id: "core X6", 
            name: "Core X6", 
            description: "Mesin Core Tenaga Generasi Ke 6", 
            imageUrl: "/plane/core_x6.png" 
          },
          { 
            id: "nusei", 
            name: "Nusei", 
            description: "Gagah Seperti Phoenix", 
            imageUrl: "/plane/nusei_15.png" 
          } 
        ]);
      } else {
        router.push('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white flex items-center justify-center py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome Back  {user.displayName || user.email}!</h1>
          <p className="text-sm text-gray-400">Here’s your game summary.</p>
        </div>

        {/* Score & Leaderboard */}
        <div className="bg-[#1c1c1c] p-6 rounded-2xl shadow-md grid grid-cols-2 md:grid-cols-3 gap-4 text-center">
          <div>
            <h2 className="text-2xl font-bold">{score}</h2>
            <p className="text-sm text-gray-400">Total Points</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">{skins.length}</h2>
            <p className="text-sm text-gray-400">Total Skins</p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">#{leaderboard?.rank}</h2>
            <p className="text-sm text-gray-400">Leaderboard Rank</p>
          </div>
        </div>

        {/* Skins */}
        <div className="bg-[#1c1c1c] p-6 rounded-2xl shadow-md">
          <h3 className="text-xl font-semibold mb-4">Owned Skins</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {skins.map((skin) => (
              <div key={skin.id} className="flex items-center gap-4 bg-[#2a2a2a] p-4 rounded-xl">
                <Image
                  src={skin.imageUrl}
                  alt={skin.name}
                  width={48}
                  height={48}
                  className="rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold">{skin.name}</h4>
                  <p className="text-sm text-gray-400">{skin.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
