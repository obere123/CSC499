import React from "react";
import TutornavBar from "./TutorNavBar";
import { useState, useEffect } from "react";
import { useAuth } from "../../utils/useAuth";
import { AddtoLogBook } from "../../utils/non_auth_axioscalls";

export default function LogBook() {
  const { isAuthenticated, currentUser, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    tuteeName: '',
    courseCode: '',
    log: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const { tuteeName, courseCode, log } = formData
AddtoLogBook(currentUser.email,tuteeName,courseCode,log)
    console.log('Form submitted:', formData);
    // Add your submission logic here
  };

  const handleClear = () => {
    setFormData({
      tuteeName: '',
      courseCode: '',
      log: ''
    });
  };

  if (currentUser.category === "Tutor") {
    return (
      <>
        <TutornavBar />
        
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 mb-8 text-white">
              <h1 className="text-4xl font-bold mb-2">Tutoring Log</h1>
              <p className="text-blue-100 text-lg">
                Record your tutoring sessions and track student progress.
              </p>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tutee Name Field */}
                  <div>
                    <label htmlFor="tuteeName" className="block text-sm font-medium text-gray-700 mb-2">
                      Tutee Name
                    </label>
                    <input
                      type="text"
                      id="tuteeName"
                      name="tuteeName"
                      value={formData.tuteeName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter tutee's name"
                      required
                    />
                  </div>

                  {/* Course Code Field */}
                  <div>
                    <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700 mb-2">
                      Course Code
                    </label>
                    <input
                      type="text"
                      id="courseCode"
                      name="courseCode"
                      value={formData.courseCode}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="e.g., CS101, MATH200"
                      required
                    />
                  </div>
                </div>

                {/* Log Field */}
                <div>
                  <label htmlFor="log" className="block text-sm font-medium text-gray-700 mb-2">
                    Session Log
                  </label>
                  <textarea
                    id="log"
                    name="log"
                    value={formData.log}
                    onChange={handleInputChange}
                    rows="8"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-vertical"
                    placeholder="Enter detailed session notes, topics covered, student progress, areas for improvement, next steps, etc."
                    required
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Include topics covered, student progress, challenges faced, and recommendations for future sessions.
                  </p>
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Save Log Entry
                  </button>
                  <button
                    type="button"
                    onClick={handleClear}
                    className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            </div>

            {/* Additional Info Section */}
            <div className="bg-blue-50 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Tips for Effective Logging</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• Record the date, time, and duration of each session</li>
                <li>• Note specific topics covered and learning objectives achieved</li>
                <li>• Document student's strengths and areas needing improvement</li>
                <li>• Include any homework assigned or resources recommended</li>
                <li>• Plan next steps and goals for upcoming sessions</li>
              </ul>
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}