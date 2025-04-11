"use client";

import { Socials } from "@/constants";
import Image from "next/image";
import React, { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
          <a href="#about-me" className="cursor-pointer">
            Home
          </a>
          <a href="#skills" className="cursor-pointer">
            Skills
          </a>
          <a href="#plane" className="cursor-pointer">
            Gallery
          </a>
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

        {/* Socials - Desktop Only */}
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
          <a href="#about-me" onClick={toggleMenu}>
            Home
          </a>
          <a href="#skills" onClick={toggleMenu}>
            Skills
          </a>
          <a href="#plane" onClick={toggleMenu}>
            Gallery
          </a>

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
