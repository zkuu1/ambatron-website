'use client'

import React, { useState } from "react";
import Navbar from "@/components/main/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { auth } from "@/db/firebase" 

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth, email, password)
      router.push('/dashboard')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      router.push('/dashboard')
    } catch (err) {
      alert(err instanceof Error ? err.message : 'An unknown error occurred')
    }
  }

  return (
    <div className="min-h-screen w-full bg-[url('/bg-login.jpg')] bg-cover bg-center flex flex-col items-center">
      <Navbar />

      <div className="flex-grow flex justify-center items-center px-4">
        <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full text-white border border-white/20 z-[20]">
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
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
                onChange={e => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-purple-700 hover:bg-purple-500 text-white font-semibold py-2 rounded-lg transition"
            >
              Login
            </Button>
          </form>

          <Button
            onClick={handleGoogle}
            className="w-full bg-red-600 hover:bg-red-500 mt-4 text-white font-semibold py-2 rounded-lg transition"
          >
            Login with Google
          </Button>

          <p className="text-center text-sm text-gray-300 mt-4">
            Don't have an account? <a href="/register" className="text-purple-400 underline">Register</a>
          </p>
        </div>
      </div>
    </div>
  );
}
