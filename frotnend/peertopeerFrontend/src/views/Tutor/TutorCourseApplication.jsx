import React, { useState, useEffect } from "react";
import TutornavBar from "./TutorNavBar";
import apiInstance from "../../utils/axios";
import { CourseList } from "../../utils/non_auth_axioscalls";
import { CourseApplication } from "../../utils/non_auth_axioscalls";
import { useAuthstore } from "../../store/auth";
import { useAuth } from "../../utils/useAuth";

export default function TutorCourseApplication() {
    const { user } = useAuthstore();
    const [courseCode, setCourseCode] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, currentUser, loading: authLoading } = useAuth();

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
            
            console.log("Tutor application submitted successfully");
            alert("Course application submitted successfully! You can now teach this course.");
            
            // Reset form
            setCourseCode("");
            
        } catch (error) {
            console.error("Error submitting tutor application:", error);
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

    // Wait for authentication to complete
    if (authLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }
    
    if (currentUser?.category === "Tutor") {
        return (
            <>
                <TutornavBar />
                <div className="min-h-screen bg-gray-50">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
                        <div className="max-w-4xl mx-auto px-6">
                            <h1 className="text-4xl font-bold mb-4">Apply to Teach Course</h1>
                            <p className="text-xl text-blue-100">
                                Submit your application to become a tutor for one of our available courses.
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
                                        Select Course to Teach *
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
                                                {courses.length === 0 ? "No courses available" : "Choose a course to teach..."}
                                            </option>
                                            {courses.map((course) => (
                                                <option key={course.coursecode} value={course.coursecode}>
                                                    {course.coursecode} - {course.coursename || "Course"}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>

                                {/* Selected Course Info */}
                                {courseCode && (
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h3 className="text-sm font-medium text-blue-900 mb-2">Selected Course:</h3>
                                        <p className="text-sm text-blue-700">
                                            <strong>{courseCode}</strong>
                                            {courses.find(c => c.coursecode === courseCode)?.coursename && 
                                                ` - ${courses.find(c => c.coursecode === courseCode).coursename}`
                                            }
                                        </p>
                                    </div>
                                )}

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
                                            "Submit Teaching Application"
                                        )}
                                    </button>
                                </div>

                                {/* Required Fields Note */}
                                <p className="text-sm text-gray-500 text-center">
                                    Simply select a course you would like to teach and submit your application
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        ); 
    }
    else {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-lg text-red-600">
                    Access denied. This page is for tutors only.
                    <br />
                    Your current role: {currentUser?.category || "Unknown"}
                </div>
            </div>
        );
    }
}