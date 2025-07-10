import React, { useEffect, useState } from 'react';
import TuteeNavBar from './TuteeNavBar';
import { useAuth } from '../../utils/useAuth';
import apiInstance from '../../utils/axios';
import { PairingsForTutees } from "../../utils/non_auth_axioscalls";

function TuteeDashBoard() {
 
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
   const { isAuthenticated, currentUser, loading: authLoading } = useAuth();

  useEffect(() => {
    const getTuteeDashBoardInfo = async (paramemail) => {
      try {
        setLoading(true);
        const response = await apiInstance.get('pairing/forTutee', {
          params: { tuteeEmail: paramemail },
        });
        
        // Debug: Log the response to see the actual structure
        console.log('API Response:', response.data);
        
        setCourses(response.data);
        setError(null);
      } catch (error) {
        console.error('Error fetching dashboard info:', error);
        setError('Failed to load courses. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser?.email) {
      getTuteeDashBoardInfo(currentUser?.email);
    }
  },[currentUser?.email, authLoading]);

  // Function to safely get course code
  const getCourseCode = (course) => {
    if (course.courseCode) {
      // If courseCode is an object (nested serialization)
      if (typeof course.courseCode === 'object') {
        return course.courseCode.coursecode || "N/A";
      }
      // If courseCode is just an ID
      return course.courseCode;
    }
    return "N/A";
  };

  // Function to safely get course name
  const getCourseName = (course) => {
    if (course.courseCode) {
      // If courseCode is an object (nested serialization)
      if (typeof course.courseCode === 'object') {
        return course.courseCode.coursename || "No Name";
      }
    }
    return "No Name";
  };

  if (currentUser.category === "Tutee") {
    return (
      <>
        <TuteeNavBar />
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-3xl p-8 mb-8 shadow-xl">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white opacity-10 rounded-full blur-xl"></div>
              <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-white opacity-10 rounded-full blur-xl"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
                      My Courses
                    </h1>
                    <p className="text-lg text-blue-100 max-w-2xl">
                      Welcome back, {currentUser?.username}! Continue your learning journey with your enrolled courses.
                    </p>
                  </div>
                  <div className="hidden md:block">
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <span className="text-3xl">📚</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-r-blue-400 rounded-full animate-spin animation-delay-150"></div>
                </div>
                <p className="mt-6 text-lg text-gray-600 font-medium">Loading your courses...</p>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg shadow-sm mb-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <span className="text-red-400 text-xl">⚠️</span>
                  </div>
                  <div className="ml-3">
                    <p className="text-red-700 font-medium">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* No Courses State */}
            {!loading && !error && courses.length === 0 && (
              <div className="text-center py-16">
                <div className="max-w-md mx-auto">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="text-6xl">📚</span>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">No courses found</h3>
                  <p className="text-gray-600 text-lg mb-6">You haven't been paired with any tutors yet.</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                    Browse Available Courses
                  </button>
                </div>
              </div>
            )}

            {/* Courses Grid */}
            {!loading && !error && courses.length > 0 && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Your Courses ({courses.length})
                  </h2>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <span className="sr-only">Grid view</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                      </svg>
                    </button>
                    <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors duration-200">
                      <span className="sr-only">List view</span>
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {courses.map((course, index) => (
                    <div
                      key={index}
                      className="group relative bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:scale-105 transition-all duration-300"
                    >
                      {/* Course Header */}
                      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white relative">
                        <div className="absolute top-0 right-0 w-20 h-20 bg-white opacity-10 rounded-full -mt-10 -mr-10"></div>
                        <div className="relative z-10">
                          <div className="flex items-center justify-between mb-4">
                            <span className="bg-white bg-opacity-20 text-white text-sm font-semibold px-3 py-1 rounded-full">
                              {getCourseCode(course)}
                            </span>
                            <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                              <span className="text-sm">📖</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold leading-tight">
                            {getCourseName(course)}
                          </h3>
                        </div>
                      </div>

                      {/* Course Content */}
                      <div className="p-6 space-y-4">
                        {/* Course Code Info */}
                        <div className="bg-gray-50 rounded-lg p-4 mb-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-sm text-gray-500 font-medium">Course Code</p>
                              <p className="text-gray-900 font-semibold text-lg">
                                {getCourseCode(course)}
                              </p>
                            </div>
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-blue-600 text-sm">📚</span>
                            </div>
                          </div>
                        </div>

                        {/* Instructor Info */}
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-yellow-400 rounded-full flex items-center justify-center text-lg font-bold text-white mr-4 shadow-md">
                            {course.tutorEmail ? course.tutorEmail.charAt(0).toUpperCase() : "?"}
                          </div>
                          <div>
                            <p className="text-sm text-gray-500 font-medium">Instructor</p>
                            <p className="text-gray-900 font-semibold">
                              {course.tutorEmail || "No tutor assigned"}
                            </p>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-2 pt-4">
                          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200">
                            Continue Learning
                          </button>
                          <button className="px-4 py-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-200">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                            </svg>
                          </button>
                        </div>

                        {/* Debug info - Remove this after fixing */}
                        <details className="mt-4 text-xs">
                          <summary className="cursor-pointer text-gray-400 hover:text-gray-600 transition-colors duration-200">
                            Debug Info
                          </summary>
                          <pre className="mt-2 p-3 bg-gray-50 rounded-lg text-xs overflow-auto border">
                            {JSON.stringify(course, null, 2)}
                          </pre>
                        </details>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  }
  
  else if (currentUser.category === "Tutee"){
navigate('/tutordashboard')

}
  
  else {
    return (
      <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-red-600 text-2xl">🚫</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
          <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
            Go Back
          </button>
        </div>
      </div>
    );
  }
}

export default TuteeDashBoard;