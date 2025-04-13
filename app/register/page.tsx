'use client';

import React, { useState } from "react";
import Navbar from "@/components/main/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "@/db/firebase"; // pastikan path ini sesuai dengan file firebase.js kamu

const RegisterPage = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      // Update display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unknown error occurred.');
      }
    }
  };

  return (
    <div className="min-h-screen w-full bg-[url('/bg-login.jpg')] bg-cover bg-center flex flex-col items-center">
      <Navbar />

      <div className="flex-grow flex justify-center items-center px-4">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full text-white border border-white/20 z-[20]">
          <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

          <form className="space-y-4" onSubmit={handleRegister}>
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-500 text-white font-semibold py-2 rounded-lg transition"
            >
              Register
            </Button>
          </form>

          <p className="text-center text-sm text-gray-300 mt-4">
            Already have an account? <a href="/login" className="text-purple-400 underline">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
