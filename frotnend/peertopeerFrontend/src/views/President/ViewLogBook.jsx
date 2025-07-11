import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../utils/useAuth";
import PresidentNavBar from "./PresidentNavBar";
import Swal from "sweetalert2";
import { DisplayLog } from "../../utils/non_auth_axioscalls";

export default function ViewLogBook() {
  const { isAuthenticated, currentUser, loading: authLoading } = useAuth();
  const [formData, setFormData] = useState({
    tutorEmail: '',
    tuteeEmail: '',
    courseCode: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }));
  };

  const formatTableData = (data) => {
    if (!data || data.length === 0) {
      return '<p style="text-align: center; color: #666;">No log book entries found for the specified criteria.</p>';
    }

    let tableHTML = `
      <div style="max-height: 400px; overflow-y: auto;">
        <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
          <thead>
            <tr style="background-color: #f8f9fa; position: sticky; top: 0;">
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold;">Tutor Email</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold;">Tutee Email</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold;">Course Code</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold;">Log</th>
              <th style="border: 1px solid #ddd; padding: 8px; text-align: left; font-weight: bold;">Date</th>
            </tr>
          </thead>
          <tbody>
    `;

    data.forEach((entry, index) => {
      const rowStyle = index % 2 === 0 ? 'background-color: #f9f9f9;' : 'background-color: white;';
      tableHTML += `
        <tr style="${rowStyle}">
          <td style="border: 1px solid #ddd; padding: 8px; word-wrap: break-word;">${entry.tutorEmail}</td>
          <td style="border: 1px solid #ddd; padding: 8px; word-wrap: break-word;">${entry.tuteeEmail}</td>
          <td style="border: 1px solid #ddd; padding: 8px; word-wrap: break-word;">${entry.courseCode}</td>
          <td style="border: 1px solid #ddd; padding: 8px; word-wrap: break-word; max-width: 200px;">${entry.log}</td>
          <td style="border: 1px solid #ddd; padding: 8px; word-wrap: break-word;">${new Date(entry.theDate).toLocaleDateString()}</td>
        </tr>
      `;
    });

    tableHTML += `
          </tbody>
        </table>
      </div>
    `;

    return tableHTML;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const { tutorEmail, tuteeEmail, courseCode } = formData;
      console.log("Form data is", formData)
      
      // Show loading state
      Swal.fire({
        title: 'Loading...',
        text: 'Retrieving log book entries',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      const logData = await DisplayLog(tutorEmail, tuteeEmail, courseCode);
      console.log("The email is",tutorEmail)

      console.log('array' + logData)
      
      // Show success message with table data
      Swal.fire({
        title: 'Log Book Entries',
        html: formatTableData(logData),
        icon: 'success',
        confirmButtonText: 'OK',
        confirmButtonColor: '#20508e',
        width: '80%',
        customClass: {
          popup: 'swal-wide'
        }
      });
      
    } catch (error) {
      console.error('Error retrieving log book entries:', error);
      
      // Show error message
      Swal.fire({
        title: 'Error!',
        text: 'Failed to retrieve log book entries. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK',
        confirmButtonColor: '#20508e'
      });
    }
  };

  const handleClear = () => {
    setFormData({
      tutorEmail: '',
      tuteeEmail: '',
      courseCode: ''
    });
  };

  if (currentUser.category === "President") {
    return (
      <>
        <PresidentNavBar />
        
        <div className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-4xl mx-auto px-4">
            {/* Header Section */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-8 mb-8 text-white">
              <h1 className="text-4xl font-bold mb-2">View Log Book</h1>
              <p className="text-blue-100 text-lg">
                Search and view tutoring session logs by tutor, tutee, and course.
              </p>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Tutor Email Field */}
                  <div>
                    <label htmlFor="tutorEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Tutor Email
                    </label>
                    <input
                      type="email"
                      id="tutorEmail"
                      name="tutorEmail"
                      value={formData.tutorEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter tutor's email address"
                      required
                    />
                  </div>

                  {/* Tutee Email Field */}
                  <div>
                    <label htmlFor="tuteeEmail" className="block text-sm font-medium text-gray-700 mb-2">
                      Tutee Email
                    </label>
                    <input
                      type="email"
                      id="tuteeEmail"
                      name="tuteeEmail"
                      value={formData.tuteeEmail}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      placeholder="Enter tutee's email address"
                      required
                    />
                  </div>
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
                    placeholder="e.g., CS101, MATH200, ENG105"
                    required
                  />
                </div>

                {/* Form Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                  >
                    Search Log Book
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

            {/* Search Tips Section */}
            <div className="bg-blue-50 rounded-lg p-6 mt-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Search Tips</h3>
              <ul className="text-blue-800 space-y-1 text-sm">
                <li>• All fields are required to perform a search</li>
                <li>• Use the exact email addresses registered in the system</li>
                <li>• Course codes should match the format used in enrollment</li>
                <li>• Search results will show all log entries for the specified combination</li>
                <li>• Contact system administrator if you encounter any issues</li>
              </ul>
            </div>

            {/* Results Section - Placeholder */}
            <div className="bg-white rounded-lg shadow-lg p-8 mt-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Log Book Entries</h3>
              <div className="text-center py-8 text-gray-500">
                <p>Enter search criteria above to view log book entries</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
        <p className="text-gray-600">You don't have permission to access this page.</p>
      </div>
    </div>
  );
}