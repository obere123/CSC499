import React, { useState } from "react";
import { Link } from "react-router-dom"; // ✅ React Router Link
import logo from "../../assets/p2pLogo.jpeg";
import { useAuthstore } from "../../store/auth";

export default function PresidentNavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {user} = useAuthstore()
  return (
    <nav className="bg-[#20508e] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <img className="h-10 w-auto" src={logo} alt="P2P Tutorials Logo" />
          </div>

          {/* Desktop Menu */}
          <div className="max-sm:hidden">
            <div className="flex space-x-6">
              <Link to="/presidentdashboard" className="hover:text-gray-300">
                Dashboard
              </Link>
              <Link to="/pairingview" className="hover:text-gray-300">
                Pairings
              </Link>
              <Link to="/addCourse" className="hover:text-gray-300">
                Add Course
              </Link>
              <Link to="/deletecourse" className="hover:text-gray-300">
                Delete Course
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
          <Link to="/dashboard" className="block py-2 hover:text-gray-300">
            Dashboard
          </Link>
          <Link to="/pairingview" className="block py-2 hover:text-gray-300">
            Pairings
          </Link>
          <Link to="/addCourse" className="block py-2 hover:text-gray-300">
            Add Course
          </Link>
          <Link to="/deletecourse" className="block py-2 hover:text-gray-300">
            Delete Course
          </Link>
        </div>
      )}
    </nav>
  );
}
