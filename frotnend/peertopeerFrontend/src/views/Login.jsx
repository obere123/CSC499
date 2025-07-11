import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../utils/auth'; 
import { useAuthstore } from '../store/auth';
import { useAuth } from '../utils/useAuth';
import jwtDecode from 'jwt-decode';
//const { isAuthenticated, currentUser, loading: authLoading } = useAuth();


function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { isAuthenticated, currentUser, loading: authLoading } = useAuth();
  const navigate=useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const response = await login(email, password);
    //const response = await login(email, password);
    setIsLoading(false);

    if (response.error) {
      // setError(JSON.stringify(response.error, null, 2));
      alert(response.error);
    }else{
//const { isAuthenticated, currentUser, loading: authLoading } = useAuth();
//timeout
 
// const userData = response.data.user;
// useAuthstore.getState().setUser(userData);


//  const userData = data?.user;
//  console.log("the category is", userData?.category)
// if(userData?.category === "Tutee"){
//    navigate("/tuteedashboard")  }
   
//    else if(userData?.category === "Tutor"){
//     navigate("/tutordashboard")
//    }
try {
    useAuthstore.getState().setUser(null); //start with this

      const token = response.data.access;
      const decodedToken = jwtDecode(token);
      console.log("Decoded token:", decodedToken);
      
      const userCategory = decodedToken.category;
        useAuthstore.getState().setUser(decodedToken);
      
      if (userCategory === "Tutee") {
        navigate("/tuteedashboard");
      } else if (userCategory === "Tutor") {
        navigate("/tutordashboard");
      }else if(userCategory==="President"){

       navigate("/presidentdashboard") 
      }


//  navigate("/tuteedashboard")
    } catch(error){
      alert(error);
    }
  
  }
 };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8">
          Login Page
        </h1>

        <div className="space-y-6">
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

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 outline-none"
          >
            {isLoading ? 'Logging in...' : 'Log In'}
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
