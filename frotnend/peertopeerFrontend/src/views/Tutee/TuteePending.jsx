import React from "react";
import { useState} from "react";
//import TutornavBar from "./TutorNavBar";
import { useAuthstore } from "../../store/auth";
import apiInstance from '../../utils/axios';
import { useAuth } from "../../utils/useAuth";
import TuteeNavBar from "./TuteeNavBar";


export default function TuteePending(){


    //begin of test data
    const courses = [
    { course: 'Mathematics', date: '2024-07-08', courseCode: 'MATH101' },
    { course: 'Physics', date: '2024-07-10', courseCode: 'PHYS201' },
    { course: 'Chemistry', date: '2024-07-12', courseCode: 'CHEM151' },
    { course: 'Biology', date: '2024-07-15', courseCode: 'BIOL110' },
    { course: 'Computer Science', date: '2024-07-17', courseCode: 'CS102' },
    { course: 'English Literature', date: '2024-07-19', courseCode: 'ENG220' },
    { course: 'History', date: '2024-07-22', courseCode: 'HIST130' },
    { course: 'Economics', date: '2024-07-24', courseCode: 'ECON100' },
  ];




    //end of test data
    const { isAuthenticated, currentUser, loading: authLoading } = useAuth();




    if(currentUser.category==="Tutee"){

        return(
            <>
            <TuteeNavBar/>
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700">
      {/* Header */}
      <div className="px-8 py-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Pending Requests</h1>
        </div>
      </div>

      {/* Table Container */}
      <div className="px-8 pb-8">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Your Courses ({courses.length})</h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Course Code
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {courses.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                          <span className="text-white font-bold text-sm">
                            {item.course.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <div className="text-lg font-semibold text-gray-900">{item.course}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-semibold text-gray-900">{item.courseCode}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-lg font-medium text-gray-900">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </div>
                      <div className="text-sm text-gray-500">
                        {new Date(item.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric'
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              Showing {courses.length} courses
            </p>
          </div>
        </div>
      </div>
    </div>        
            
            
            
            </>
        )
    }
    
    
    else{
        return(
        
        <div>No entry</div> )
    
    }

}