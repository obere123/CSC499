import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/p2pLogo.jpeg";

export default function TutornavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-[#20508e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <img 
              className="h-8 w-auto sm:h-10" 
              src={logo} 
              alt="P2P Tutorials Logo" 
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden min-[400px]:block">
            <div className="flex items-center space-x-4 lg:space-x-6">
              <Link 
                to="/tutordashboard" 
                className="px-3 py-2 text-sm font-medium hover:text-gray-300 transition-colors duration-200"
              >
                Dashboard
              </Link>
              <Link 
                to="/tutorcourseapplication" 
                className="px-3 py-2 text-sm font-medium hover:text-gray-300 transition-colors duration-200"
              >
                Course Application
              </Link>
              <Link 
                to="/tutorpending" 
                className="px-3 py-2 text-sm font-medium hover:text-gray-300 transition-colors duration-200"
              >
                Pending
              </Link>
              <Link 
                to="/addLogbook" 
                className="px-3 py-2 text-sm font-medium hover:text-gray-300 transition-colors duration-200"
              >
                LogBook
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="min-[400px]:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-300 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-expanded="false"
              aria-label="Toggle navigation menu"
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
      <div className={`min-[400px]:hidden transition-all duration-300 ease-in-out ${
        mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-[#1a4478] border-t border-blue-600">
          <Link
            to="/tutordashboard"
            className="block px-3 py-2 text-base font-medium text-white hover:text-gray-300 hover:bg-blue-700 rounded-md transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/tutorcourseapplication"
            className="block px-3 py-2 text-base font-medium text-white hover:text-gray-300 hover:bg-blue-700 rounded-md transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Course Application
          </Link>
          <Link
            to="/tutorpending"
            className="block px-3 py-2 text-base font-medium text-white hover:text-gray-300 hover:bg-blue-700 rounded-md transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            Pending
          </Link>
          <Link
            to="/addLogbook"
            className="block px-3 py-2 text-base font-medium text-white hover:text-gray-300 hover:bg-blue-700 rounded-md transition-colors duration-200"
            onClick={() => setMobileMenuOpen(false)}
          >
            LogBook
          </Link>
        </div>
      </div>
    </nav>
  );
}