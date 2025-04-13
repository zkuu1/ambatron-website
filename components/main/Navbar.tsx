'use client';

import { Socials } from "@/constants";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { auth } from "@/db/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  interface User {
    displayName?: string | null;
    email?: string | null;
  }

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      return setUser(u ? { displayName: u.displayName, email: u.email } : null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push('/login');
  };

  return (
    <div className="w-full h-[65px] fixed top-0 shadow-lg shadow-[#2A0E61]/50 bg-[#03001417] backdrop-blur-md z-50 px-5 md:px-10">
      <div className="w-full h-full flex items-center justify-between m-auto px-[10px]">
        {/* Logo */}
        <a href="#about-me" className="flex items-center">
          <Image
            src="/boss/boss1.png"
            alt="logo"
            width={50}
            height={50}
            className="cursor-pointer hover:animate-slowspin"
          />
          <span className="font-bold ml-2 hidden md:block text-gray-300">
            Sotgan Api Dev
          </span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-between border border-[#7042f861] bg-[#0300145e] px-5 py-2 rounded-full text-gray-200 space-x-5">
          <a href="/#about-me" className="cursor-pointer">Home</a>
          <a href="/#skills" className="cursor-pointer">Gallery</a>
          <a href="/#plane" className="cursor-pointer">Other</a>

          {user ? (
            <div className="relative group">
              <button className="bg-purple-900 hover:bg-purple-700 px-4 py-2 rounded-full">
                Profile
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-50">
                <div className="px-4 py-2 border-b border-gray-200">
                  <p className="font-semibold">{user.displayName || "No Name"}</p>
                </div>
                <button
                 onClick={() => router.push('/dashboard')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
                
              </div>
            </div>
          ) : (
            <Button className="bg-purple-900 hover:bg-purple-500 text-white px-4 py-2 rounded-full">
              <a href="/login">Login</a>
            </Button>
          )}
        </div>

        {/* Hamburger Icon - Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {menuOpen ? (
              <X size={30} className="text-white" />
            ) : (
              <Menu size={30} className="text-white" />
            )}
          </button>
        </div>

        {/* Socials - Desktop */}
        <div className="hidden md:flex flex-row gap-5">
          {Socials.map((social) => (
            <a
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              key={social.name}
            >
              <Image
                className="hover:opacity-50"
                src={social.src}
                alt={social.name}
                width={24}
                height={24}
              />
            </a>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#030014e6] backdrop-blur-md px-5 py-4 space-y-4 text-gray-200 flex flex-col items-start">
          <a href="/#about-me" onClick={toggleMenu}>Home</a>
          <a href="/#skills" onClick={toggleMenu}>Gallery</a>
          <a href="/#plane" onClick={toggleMenu}>Other</a>
         

          {user ? (
            <>
              <div className="border-t border-gray-600 pt-2">
              <button
                 onClick={() => router.push('/dashboard')}
                  className="mt-2 mb-4 cursor-pointer"
                >
                  Dashboard
                </button>
                <p className="text-sm font-semibold">{user.displayName || "No Name"}</p>
                
                
                <p className="text-xs text-gray-400 mb-2">{user.email}</p>
                <button
                  onClick={() => {
                    toggleMenu();
                    handleLogout();
                  }}
                  className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-full w-full"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <a
              href="/login"
              className="bg-purple-900 hover:bg-purple-500 text-white px-4 py-2 rounded-full text-center w-full block"
              onClick={toggleMenu}
            >
              Login
            </a>
          )}

          {/* Socials - Mobile */}
          <div className="flex gap-4 pt-2">
            {Socials.map((social) => (
              <a
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                key={social.name}
              >
                <Image
                  className="hover:opacity-50"
                  src={social.src}
                  alt={social.name}
                  width={24}
                  height={24}
                />
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
