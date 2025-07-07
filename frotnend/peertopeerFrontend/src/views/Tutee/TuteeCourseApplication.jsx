import React, { useState, useEffect } from "react";
import TuteeNavBar from "./TuteeNavBar";
import apiInstance from "../../utils/axios";
import { CourseList } from "../../utils/non_auth_axioscalls";
import { CourseApplication } from "../../utils/non_auth_axioscalls";
import { useAuthstore } from "../../store/auth";
import { useAuth } from "../../utils/useAuth";
export default function TuteeCourseApplication(){
    const { user } = useAuthstore();
    const [courseCode, setCourseCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, currentUser, loading: authLoading } = useAuth(); //new method to do your shit
    // Fetch courses from API
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                const response = await CourseList();
                const sortedCourses = (response.data || []).sort((a, b) => 
                    a.coursecode.localeCompare(b.coursecode)
                );
                setCourses(sortedCourses);
                setError(null);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Failed to load courses. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    const handleSubmit = async () => {
        if (!courseCode) {
            alert("Please select a course");
            return;
        }
        
        if (!currentUser?.email) {
            alert("User email not found. Please log in again.");
            return;
        }
        
        setIsSubmitting(true);
        
        try {
            // Call the CourseApplication function
            await CourseApplication(currentUser.email, currentUser.category, courseCode);
            
            console.log("Application submitted successfully");
            alert("Course application submitted successfully!");
            
            // Reset form
            setCourseCode("");
            
        } catch (error) {
            console.error("Error submitting application:", error);
            alert("Error submitting application. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleRetry = () => {
        const fetchCourses = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await CourseList();
                const sortedCourses = (response.data || []).sort((a, b) => 
                    a.coursecode.localeCompare(b.coursecode)
                );
                setCourses(sortedCourses);
            } catch (error) {
                console.error("Error fetching courses:", error);
                setError("Failed to load courses. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    };
    
    if (currentUser.category === "Tutee"){
        return (
            <>
            <TuteeNavBar/>
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                    <div className="max-w-4xl mx-auto px-6">
                        <h1 className="text-4xl font-bold mb-4">Apply for Course</h1>
                        <p className="text-xl text-blue-100">
                            Submit your application to join one of our available courses.
                        </p>
                    </div>
                </div>

                {/* Form Section */}
                <div className="max-w-4xl mx-auto px-6 py-12">
                    <div className="bg-white rounded-lg shadow-lg p-8">
                        <div className="space-y-6">
                            {/* Course Selection */}
                            <div>
                                <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700 mb-2">
                                    Select Course *
                                </label>
                                
                                {loading ? (
                                    <div className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 flex items-center">
                                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500 mr-2"></div>
                                        <span className="text-gray-500">Loading courses...</span>
                                    </div>
                                ) : error ? (
                                    <div className="space-y-3">
                                        <div className="w-full px-4 py-3 border border-red-300 rounded-lg bg-red-50 text-red-700">
                                            {error}
                                        </div>
                                        <button
                                            onClick={handleRetry}
                                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        >
                                            Retry Loading Courses
                                        </button>
                                    </div>
                                ) : (
                                    <select
                                        id="courseCode"
                                        value={courseCode}
                                        onChange={(e) => setCourseCode(e.target.value)}
                                        required
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900"
                                        disabled={courses.length === 0}
                                    >
                                        <option value="">
                                            {courses.length === 0 ? "No courses available" : "Choose a course..."}
                                        </option>
                                        {courses.map((course) => (
                                            <option key={course.coursecode} value={course.coursecode}>
                                                {course.coursecode}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Submit Button */}
                            <div className="pt-6">
                                <button
                                    type="button"
                                    onClick={handleSubmit}
                                    disabled={isSubmitting || loading || error || !courseCode}
                                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                    {isSubmitting ? (
                                        <div className="flex items-center justify-center">
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                                            Submitting Application...
                                        </div>
                                    ) : (
                                        "Submit Application"
                                    )}
                                </button>
                            </div>

                            {/* Required Fields Note */}
                            <p className="text-sm text-gray-500 text-center">
                                Simply select a course to apply
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            </>
        ); 
    }
    else{
        return<div>
            No entry
        </div>
    }
}