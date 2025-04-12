"use client";

import React from "react";
import Navbar from "@/components/main/Navbar";
import { Button } from "@/components/ui/button";

const RegisterPage = () => {
  return (
    <div className="min-h-screen w-full bg-[url('/bg-login.jpg')] bg-cover bg-center flex flex-col items-center">
      <Navbar />
      
      <div className="flex-grow flex justify-center items-center px-4">
      <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-lg max-w-md w-full text-white border border-white/20 z-[20]">
          <h2 className="text-2xl font-bold mb-6 text-center">Pre Regist</h2>
          
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block mb-1">Name</label>
              <input
                id="name"
                type="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block mb-1">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block mb-1">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
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

        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
