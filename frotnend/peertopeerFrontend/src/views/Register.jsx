import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiInstance from '../utils/axios'; // keep this if using axios instance
import { register } from '../utils/auth';
import { useAuth } from '../utils/useAuth';

function Register() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [category, setCategory] = useState(""); // for dropdown menu
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate= useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // add role if supported in backend
    // console.log('form',fullname, email, category, password, password2)
    
     const {error}=await register(fullname, email, category, password, password2);
     setIsLoading(false);
    if (error){alert(error);}
    else{
      //const { isAuthenticated, currentUser, loading: authLoading } = useAuth();
      
      navigate("/")
    }
  };

  //   if (response.error) {
  //     setError(JSON.stringify(response.error, null, 2));
  //   }
  // };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          Registration Page
        </h1>

        <div className="space-y-6">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium text-gray-700 mb-2">
              First name
            </label>
            <input
              type="text"
              id="full_name"
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="First name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Email address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="password2" className="block text-sm font-medium text-gray-700 mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="password2"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              placeholder="Confirm password"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 placeholder-gray-400"
              required
            />
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
              Select Role
            </label>
            <select
              id="role"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              required
            >
              <option value="" disabled>Select a role</option>
              <option value="Tutor">Tutor</option>
              <option value="Tutee">Tutee</option>
              {/* <option value="President">President</option> */}
            </select>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
          >
            {isLoading ? 'Signing Up...' : 'Sign Up'}
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Already registered?{' '}
          <Link
            to="/login"
            className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
          >
            sign in?
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
