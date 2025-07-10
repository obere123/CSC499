import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../utils/useAuth";
import PresidentNavBar from "./PresidentNavBar";
import { DeleteCourseFunc } from "../../utils/non_auth_axioscalls";

export default function DeleteCourse() {
  const { isAuthenticated, currentUser, loading: authLoading } = useAuth();
  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    
    try{
    DeleteCourseFunc(courseName,courseCode);
      alert("Successfully Deleted");
  
  }catch(error){
      alert("The error in deleting is", error)
    }
    console.log("Course Name:", courseName);
    console.log("Course Code:", courseCode);
    // Add your delete course logic here
  };

  const handleReset = () => {
    setCourseName("");
    setCourseCode("");
  };

  if (currentUser.category === "President") {
    return (
      <>
        <PresidentNavBar />
        
        <div className="min-h-screen bg-gray-100 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg p-8 mb-8 text-white">
              <h1 className="text-3xl font-bold mb-2">Delete Course</h1>
              <p className="text-blue-100">
                Enter the course details below to remove it from the system.
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Course Name Field */}
                <div>
                  <label 
                    htmlFor="courseName" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Course Name
                  </label>
                  <input
                    type="text"
                    id="courseName"
                    value={courseName}
                    onChange={(e) => setCourseName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter course name"
                    required
                  />
                </div>

                {/* Course Code Field */}
                <div>
                  <label 
                    htmlFor="courseCode" 
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Course Code
                  </label>
                  <input
                    type="text"
                    id="courseCode"
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter course code"
                    required
                  />
                </div>

                {/* Button Group */}
                <div className="flex gap-4 pt-4">
                  <button
                    type="submit"
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    Delete Course
                  </button>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    Clear
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}