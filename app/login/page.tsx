'use client'

import React, { useState } from "react";
import Navbar from "@/components/main/Navbar";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from "@/db/firebase";
import Swal from "sweetalert2";
import { EyeIcon, EyeOffIcon } from 'lucide-react'; // Pastikan kamu sudah install lucide-react

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    if (!email || !password) {
      Swal.fire({
        icon: 'warning',
        title: 'Lengkapi Data',
        text: 'Email dan kata sandi wajib diisi.',
      });
      return;
    }
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        const error = err as any;
        switch (error.code) {
          case 'auth/user-not-found':
            Swal.fire({
              icon: 'error',
              title: 'Email Tidak Ditemukan',
              text: 'Email belum terdaftar. Silakan daftar terlebih dahulu.',
            });
            break;
          case 'auth/wrong-password':
            Swal.fire({
              icon: 'error',
              title: 'Kata Sandi Salah',
              text: 'Coba periksa kembali kata sandimu.',
            });
            break;
          case 'auth/invalid-email':
            Swal.fire({
              icon: 'error',
              title: 'Format Email Salah',
              text: 'Coba cek kembali format email kamu.',
            });
            break;
          default:
            Swal.fire({
              icon: 'error',
              title: 'Password atau Email Anda Salah',
              text: 'Mohon coba lagi nanti.',
            });
        }
      }
    }
  };
  

  const handleGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      Swal.fire({
        icon: 'success',
        title: 'Login Google berhasil',
        showConfirmButton: false,
        timer: 1500
      });
      router.push('/dashboard');
    } catch (err) {
      if (err instanceof Error) {
        const error = err as any;
        let message = 'Login gagal.';

        if (error.code === 'auth/popup-closed-by-user' || error.code === 'auth/cancelled-popup-request') {
          message = 'Popup ditutup sebelum login selesai.';
        } else {
          message = error.message;
        }

        Swal.fire({
          icon: 'error',
          title: 'Login Google gagal',
          text: message,
        });
      }
    }
  };

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
                placeholder="Masukkan email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Masukkan password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500 pr-10"
                />
                <div
                  onClick={() => setShowPassword(prev => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-white cursor-pointer"
                >
                  {showPassword ? <EyeOffIcon size={18} /> : <EyeIcon size={18} />}
                </div>
              </div>
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
            Login dengan Google
          </Button>

          <p className="text-center text-sm text-gray-300 mt-4">
            Belum punya akun? <a href="/register" className="text-purple-400 underline">Daftar di sini</a>
          </p>
        </div>
      </div>
    </div>
  );
}
