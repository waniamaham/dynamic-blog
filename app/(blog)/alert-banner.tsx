"use client"; // This makes this file a Client Component

import Link from "next/link";

import { useState } from "react"; // Import useState for state management

const emptySubscribe = () => () => {};

export default function Navbar() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false); // State to manage mobile menu visibility

  const toggleMenu = () => {
    setMobileMenuOpen((prev) => !prev); // Toggle mobile menu state
  };

  return (
    <div className="fixed top-0 left-0 z-50 w-full bg-gradient-to-r from-teal-500 to-blue-600 text-white backdrop-blur font-semibold shadow-md">
      <div className="max-w-screen-xl mx-auto px-5 py-3">
        <div className="flex items-center justify-between">
          {/* Logo or Blog Title */}
          <div className="text-lg font-bold text-white">
            <Link href="/">Life In Bloom</Link> 
          </div>

          {/* Navbar Links */}
          <div className="hidden md:flex space-x-6">
            < Link href="/" className="text-lg hover:text-teal-200 transition-colors">
              Home
            </Link>
            {/* Link to About page */}
            <Link href="/about" className="text-lg hover:text-teal-200 transition-colors">
              About
            </Link>
          </div>

          {/* Mobile Navbar Toggle Button */}
          <div className="md:hidden">
            <button
              className="text-white focus:outline-none"
              onClick={toggleMenu} // Toggle mobile menu visibility
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu (Visible only when isMobileMenuOpen is true) */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-2 space-y-4 px-5 pb-3">
          <Link href="/" className="block text-lg text-teal-200 hover:text-teal-100">
            Home
          </Link>
          {/* Mobile link to About page */}
          <Link href="/about" className="block text-lg text-teal-200 hover:text-teal-100">
            About
          </Link>
        </div>
      )}
    </div>
  );
}
