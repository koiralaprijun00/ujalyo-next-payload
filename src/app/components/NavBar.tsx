"use client";

import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between py-4 border-b border-gray-300">
      {/* Logo */}
      <div className="flex items-center">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WWF_logo.svg"
          alt="Logo"
          width={56}
          height={56}
          className="h-14 w-auto object-contain"
        />
      </div>
      {/* Menu */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-6">
          <button className="text-blue-900 font-semibold bg-none border-none cursor-pointer flex items-center gap-1 transition hover:underline">
            Our Impact
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button className="text-blue-900 font-semibold bg-none border-none cursor-pointer flex items-center gap-1 transition hover:underline">
            Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          <button className="text-blue-900 font-semibold bg-none border-none cursor-pointer flex items-center gap-1 transition hover:underline">
            About Us
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
        </div>
        <button className="bg-orange-600 hover:bg-orange-700 text-white font-semibold px-6 py-2 rounded transition border-none cursor-pointer">
          Donate Now
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
