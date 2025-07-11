import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ Import Link from react-router-dom
import logo from "../../assets/p2pLogo.jpeg";

export default function TuteeNavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#20508e] text-white w-screen">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-10 w-auto" src={logo} alt="P2P Tutorials Logo" />
          </div>

          {/* Desktop Menu */}
          <div className="max-sm:hidden">
            <div className="flex space-x-6">
              <Link to="/tuteedashboard" className="text-gray-300 hover:text-white">
                Dashboard
              </Link>
              <Link to="/tuteecourseapplication" className="text-gray-300 hover:text-white">
                Apply for Course
              </Link>
              <Link to="/tuteepending" className="text-gray-300 hover:text-white">
                Pending
              </Link>
             
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden px-4 pb-4">
          <Link to="/tuteedashboard" className="block py-2 hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/tuteecourseapplication" className="block py-2 hover:text-gray-300">
            Course Application
          </Link>
          <Link to="/tuteepending" className="block py-2 hover:text-gray-300">
            Pending 
          </Link>
          <Link to="/calendar" className="block py-2 hover:text-gray-300">
            Calendar
          </Link>
        </div>
      )}
    </nav>
  );
}
