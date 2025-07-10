import React from "react";
import { useState, useEffect } from "react";
import PresidentNavBar from "./PresidentNavBar";
import { useAuth } from "../../utils/useAuth";
import { AddCourseFunc } from "../../utils/non_auth_axioscalls";

export default function AddCourse() {
  const { isAuthenticated, currentUser, loading: authLoading } = useAuth();
  
  // Form state
  const [formData, setFormData] = useState({
    coursename: '',
    coursecode: '',
    course_description: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };
  
  // Form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.coursename.trim()) {
      newErrors.coursename = 'Course name is required';
    } else if (formData.coursename.length > 60) {
      newErrors.coursename = 'Course name must be 60 characters or less';
    }
    
    if (!formData.coursecode.trim()) {
      newErrors.coursecode = 'Course code is required';
    } else if (formData.coursecode.length > 7) {
      newErrors.coursecode = 'Course code must be 7 characters or less';
    }
    
    if (!formData.course_description.trim()) {
      newErrors.course_description = 'Course description is required';
    } else if (formData.course_description.length > 1000) {
      newErrors.course_description = 'Course description must be 1000 characters or less';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Call the imported AddCourseFunc with form data
      await AddCourseFunc(
        formData.coursename,
        formData.coursecode,
        formData.course_description
      );
      
      // Reset form after successful submission
      setFormData({
        coursename: '',
        coursecode: '',
        course_description: ''
      });
      
      // Show success message
      alert('Course added successfully!');
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error adding course. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (currentUser.category === "President") {
    return (
      <>
        <PresidentNavBar />
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-2xl mx-auto px-4">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Add New Course</h2>
                <p className="text-gray-600">Fill in the details below to add a new course to the system.</p>
              </div>
              
              <div className="space-y-6">
                {/* Course Name Field */}
                <div>
                  <label htmlFor="coursename" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    id="coursename"
                    name="coursename"
                    value={formData.coursename}
                    onChange={handleInputChange}
                    maxLength={60}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.coursename ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter course name"
                  />
                  {errors.coursename && (
                    <p className="mt-1 text-sm text-red-600">{errors.coursename}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.coursename.length}/60 characters
                  </p>
                </div>

                {/* Course Code Field */}
                <div>
                  <label htmlFor="coursecode" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Code *
                  </label>
                  <input
                    type="text"
                    id="coursecode"
                    name="coursecode"
                    value={formData.coursecode}
                    onChange={handleInputChange}
                    maxLength={7}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.coursecode ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter course code (e.g., CS101)"
                  />
                  {errors.coursecode && (
                    <p className="mt-1 text-sm text-red-600">{errors.coursecode}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.coursecode.length}/7 characters
                  </p>
                </div>

                {/* Course Description Field (Long) */}
                <div>
                  <label htmlFor="course_description" className="block text-sm font-medium text-gray-700 mb-2">
                    Course Description *
                  </label>
                  <textarea
                    id="course_description"
                    name="course_description"
                    value={formData.course_description}
                    onChange={handleInputChange}
                    maxLength={1000}
                    rows={6}
                    className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-vertical ${
                      errors.course_description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="Enter detailed course description..."
                  />
                  {errors.course_description && (
                    <p className="mt-1 text-sm text-red-600">{errors.course_description}</p>
                  )}
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.course_description.length}/1000 characters
                  </p>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setFormData({ coursename: '', coursecode: '', course_description: '' })}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 border border-gray-300 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className={`px-6 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? 'Adding Course...' : 'Add Course'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div>
          <p className="text-center text-gray-600 mt-8">
            You don't have permission to access this page.
          </p>
        </div>
      </>
    );
  }
}