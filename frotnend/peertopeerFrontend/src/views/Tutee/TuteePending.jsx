import React from "react";
import { useState, useEffect } from "react";
//import TutornavBar from "./TutorNavBar";
import { useAuthstore } from "../../store/auth";
import apiInstance from '../../utils/axios';
import { useAuth } from "../../utils/useAuth";
import TuteeNavBar from "./TuteeNavBar";
import { GetCourseName, GetPendings } from "../../utils/non_auth_axioscalls";

export default function TuteePending(){
    const [pendingRequests, setPendingRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, currentUser, loading: authLoading } = useAuth();

    // Function to fetch pending requests
    const fetchPendingRequests = async () => {
        try {
            setLoading(true);
            console.log('Fetching pending requests for:', currentUser.email, 'Category: Tutee');
            
            // Fetch pending requests for current user and category
            const response = await GetPendings(currentUser.email, 'Tutee');
            
            console.log('Raw response:', response);
            console.log('Response data:', response.data);
            
            // Data is already filtered by backend
            const userPendingRequests = response.data.results;
            
            // Get unique course codes to avoid duplicate API calls
            const uniqueCourseCodes = [...new Set(userPendingRequests.map(request => request.coursecode))];
            
            // Fetch course names for unique course codes only with timeout handling
            const courseNameMap = new Map();
            
            // First, set default course names using course codes
            userPendingRequests.forEach(request => {
                if (!courseNameMap.has(request.coursecode)) {
                    courseNameMap.set(request.coursecode, request.coursecode); // Use course code as fallback
                }
            });
            
            // Try to fetch actual course names with timeout protection
            const courseNamePromises = uniqueCourseCodes.map(async (coursecode) => {
                try {
                    // Add timeout wrapper
                    const timeoutPromise = new Promise((_, reject) => 
                        setTimeout(() => reject(new Error('Timeout')), 3000)
                    );
                    
                    const courseResponse = await Promise.race([
                        GetCourseName(coursecode),
                        timeoutPromise
                    ]);
                    
                    const coursename = courseResponse.data.coursename || coursecode;
                    courseNameMap.set(coursecode, coursename);
                    console.log(`Successfully fetched course name for ${coursecode}:`, coursename);
                } catch (err) {
                    console.warn(`Could not fetch course name for ${coursecode}, using course code as fallback:`, err.message);
                    // Keep the course code as fallback (already set above)
                }
            });
            
            // Wait for all course name requests to complete or timeout
            await Promise.allSettled(courseNamePromises);
            
            // Map course names to requests
            const requestsWithCourseNames = userPendingRequests.map(request => ({
                ...request,
                coursename: courseNameMap.get(request.coursecode) || request.coursecode
            }));
            
            setPendingRequests(requestsWithCourseNames);
            setError(null);
        } catch (err) {
            setError('Failed to fetch pending requests');
            console.error('Error fetching pending requests:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (currentUser && currentUser.category === "Tutee") {
            fetchPendingRequests();
        }
    }, []);

    if (authLoading || loading) {
        return (
            <>
                <TuteeNavBar/>
                <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex items-center justify-center">
                    <div className="text-white text-xl">Loading pending requests...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <TuteeNavBar/>
                <div className="min-h-screen bg-gradient-to-br from-blue-500 via-blue-600 to-purple-700 flex items-center justify-center">
                    <div className="text-white text-xl">{error}</div>
                </div>
            </>
        );
    }

    if(currentUser.category === "Tutee"){
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
                                <h2 className="text-xl font-semibold text-gray-800">
                                    Your Pending Requests ({pendingRequests.length})
                                </h2>
                            </div>

                            {/* Table */}
                            <div className="overflow-x-auto">
                                {pendingRequests.length === 0 ? (
                                    <div className="px-6 py-12 text-center">
                                        <div className="text-gray-500 text-lg">
                                            No pending requests found.
                                        </div>
                                        <div className="text-gray-400 text-sm mt-2">
                                            Your course requests will appear here once submitted.
                                        </div>
                                    </div>
                                ) : (
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
                                                    Date Requested
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {pendingRequests.map((request, index) => (
                                                <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mr-4">
                                                                <span className="text-white font-bold text-sm">
                                                                    {request.coursename.charAt(0)}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <div className="text-lg font-semibold text-gray-900">
                                                                    {request.coursename}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-lg font-semibold text-gray-900">
                                                            {request.coursecode}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-lg font-medium text-gray-900">
                                                            {new Date(request.theDate).toLocaleDateString('en-US', {
                                                                weekday: 'long',
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric'
                                                            })}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {new Date(request.theDate).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric'
                                                            })}
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                                <p className="text-sm text-gray-600">
                                    Showing {pendingRequests.length} pending requests
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
            <div>No entry</div>
        )
    }
}