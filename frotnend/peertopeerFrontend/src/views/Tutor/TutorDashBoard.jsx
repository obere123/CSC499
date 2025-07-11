import React from "react";
import { useState,useEffect} from "react";
import TutornavBar from "./TutorNavBar";
import { useAuthstore } from "../../store/auth";
import apiInstance from '../../utils/axios';
import { useAuth } from '../../utils/useAuth';
import { Link, useNavigate } from 'react-router-dom';

export default function TutorDashBoard(){
  const { user } = useAuthstore();
  const [courses, setCourses] = useState([]);
  const { isAuthenticated, currentUser, loading: authLoading } = useAuth();

//start
 useEffect(() => {
    const getTutorDashBoardInfo = async (paramemail) => {
      try {
        const response = await apiInstance.get('getTutorPairings/', {
          params: { tutorEmail: paramemail },
        });
        // If response is an array:
        setCourses(response.data.results|| []);
        console.log(response.data)
      } catch (error) {
        console.error('Error fetching dashboard info:', error);
      }
    };

    if (currentUser?.email) {
      getTutorDashBoardInfo(currentUser.email);
    }
  }, [currentUser?.email]);

  if (currentUser.category === "Tutor") {
    return (
      <>
        <TutornavBar />
        <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen mt-2">
          {/* Header Section */}
          <div className="bg-[#20508e] rounded-2xl p-8 mb-8 text-white">
            <h1 className="text-4xl font-bold mb-2">Tutor Dashboard</h1>
            <p className="text-lg text-blue-100">
              Welcome Back! Here are your Tutees!
            </p>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {courses.length > 0 && courses.map((course, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Course Code Badge */}
                <div className="mb-4">
                  <span className="inline-block bg-[#20508e] text-white text-sm font-semibold px-4 py-2 rounded-full">
                    {course.courseCode__coursecode || "N/A"}
                  </span>
                </div>

                {/* Course Title */}
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  {course.courseCode__coursename || "No Name"}
                </h2>

                {/* Instructor Info */}
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 bg-[#ffeecb] rounded-full flex items-center justify-center text-sm font-semibold text-gray-700 mr-3">
                    {course.tutorEmail ? course.tutorEmail.charAt(0).toUpperCase() : "?"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{course.tuteeEmail}</p>
                  </div>
                </div>

                {/* View Details Button */}
                <button className="bg-gray-200 text-gray-600 px-6 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition-colors duration-200">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </>)
  
  
  
  
  
  
  
  
  
  
  
  
  //end

} 




else{
    return(
    <div>
        No entry
        </div>
        )
    }
}