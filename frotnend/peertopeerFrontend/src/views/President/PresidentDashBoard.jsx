import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";
import { useAuth } from '../../utils/useAuth';
import PresidentNavBar from "./PresidentNavBar";
import { GetMostRecentPendings } from "../../utils/non_auth_axioscalls";

export default function PresidentDashBoard() {
    const { isAuthenticated, currentUser, loading: authLoading } = useAuth();
    const [pendingData, setPendingData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [retryCount, setRetryCount] = useState(0);
    
    // Use ref to track if component is mounted
    // const isMountedRef = useRef(true);
    
    // Debug: Log current user data
    useEffect(() => {
        console.log("Current user in dashboard:", currentUser);
        console.log("Auth loading:", authLoading);
        console.log("Is authenticated:", isAuthenticated);
    }, [currentUser,  isAuthenticated]);
    
    // Main data fetching effect - similar to TuteeDashBoard pattern
    useEffect(() => {
        const fetchPendingData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                console.log("Attempting to fetch pending data...");
                console.log("Current user category:", currentUser?.category);
                
                // Validate user before making API call
                if (!currentUser || currentUser.category !== "President") {
                    throw new Error("Unauthorized access - User is not a President");
                }
                
                console.log("Making API call to GetMostRecentPendings...");
                const data = await GetMostRecentPendings();
                console.log("API response:", data);
                
                // Only update state if component is still mounted
                // if (isMountedRef.current) {
                //     setPendingData(data || []);
                //     setRetryCount(0);
                // }

                setPendingData(data || []);
                setRetryCount(0);
            } catch (err) {
                // console.error("Error fetching pending data:", err);
                // if (isMountedRef.current) {
                //     setError(err.message || "Failed to load pending data");
                // }
                setError(err.message || "Failed to load pending data");
            } finally {
                // if (isMountedRef.current) {
                //     setLoading(false);
                // }
                setLoading(false);
            }
        };

        // Only fetch if we have a current user with President category
        if (currentUser?.category === "President") {
            fetchPendingData();
        } else if (currentUser && currentUser.category !== "President") {
            // Clear data if user exists but is not a president
            setPendingData([]);
            setLoading(false);
            setError(null);
        }
    }, [currentUser?.category, authLoading]); // Simple dependencies like TuteeDashBoard

    // Retry function
    const handleRetry = useCallback(() => {
        setRetryCount(prev => prev + 1);
        setError(null);
        
        // Trigger re-fetch by temporarily clearing and setting user category
        if (currentUser?.category === "President") {
            const fetchPendingData = async () => {
                try {
                    setLoading(true);
                    
                    console.log("Retrying API call to GetMostRecentPendings...");
                    const data = await GetMostRecentPendings();
                    console.log("Retry API response:", data);
                    
                    // if (isMountedRef.current) {
                    //     setPendingData(data || []);
                    // }
                    setPendingData(data || []);
                } catch (err) {
                    console.error("Retry error:", err);
                    // if (isMountedRef.current) {
                    //     setError(err.message || "Failed to load pending data");
                    // }
                    setError(err.message || "Failed to load pending data");
                } finally {
                    // if (isMountedRef.current) {
                    //     setLoading(false);
                    // }
                    setLoading(false);
                }
            };
            
            fetchPendingData();
        }
    }, [currentUser?.email]);

    // Cleanup on unmount
    // useEffect(() => {
    //     return () => {
    //         isMountedRef.current = false;
    //     };
    // }, []);

    // Show loading if auth is still loading
    if (authLoading) {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4">
                    <div className="relative mb-6">
                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
                    </div>
                    <p className="text-gray-600 font-medium">Authenticating...</p>
                </div>
            </div>
        );
    }

    // Check if user is president
    if (!currentUser || currentUser.category !== "President") {
        return (
            <div className="w-full min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 flex items-center justify-center">
                <div className="text-center bg-white p-8 rounded-2xl shadow-lg max-w-md mx-4">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-red-600 text-2xl">🚫</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Access Denied</h2>
                    <p className="text-gray-600 mb-6">
                        {!currentUser 
                            ? "Please log in to access this page" 
                            : "You don't have permission to access the president dashboard"
                        }
                    </p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors duration-200">
                        Go Back
                    </button>
                </div>
            </div>
        );
    }

    // Main dashboard render
    return (
        <>
            <PresidentNavBar />
            
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
                                        President Dashboard
                                    </h1>
                                    <p className="text-lg text-blue-100 max-w-2xl">
                                        Welcome back, {currentUser.username || currentUser.email}! This is the admin page.
                                    </p>
                                </div>
                                <div className="hidden md:block">
                                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <span className="text-3xl">👨‍💼</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pending Applications Section */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    Recent Pending Applications
                                </h2>
                                <button 
                                    onClick={handleRetry}
                                    disabled={loading}
                                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Loading...' : 'Refresh'}
                                </button>
                            </div>
                        </div>

                        <div className="p-6">
                            {/* Loading State */}
                            {loading && (
                                <div className="flex flex-col items-center justify-center py-16">
                                    <div className="relative">
                                        <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                                    </div>
                                    <p className="mt-6 text-lg text-gray-600 font-medium">Loading pending applications...</p>
                                </div>
                            )}

                            {/* Error State */}
                            {error && (
                                <div className="bg-red-50 border-l-4 border-red-400 p-6 rounded-r-lg shadow-sm mb-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <span className="text-red-400 text-xl">⚠️</span>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-red-700 font-medium">{error}</p>
                                            </div>
                                        </div>
                                        <button 
                                            onClick={handleRetry}
                                            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 ml-4"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                    {retryCount > 0 && (
                                        <p className="mt-2 text-sm text-red-600">
                                            Retry attempt: {retryCount}
                                        </p>
                                    )}
                                </div>
                            )}

                            {/* No Applications State */}
                            {!loading && !error && (!pendingData || pendingData.length === 0) && (
                                <div className="text-center py-16">
                                    <div className="max-w-md mx-auto">
                                        <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                            <span className="text-6xl">📋</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-800 mb-3">No pending applications</h3>
                                        <p className="text-gray-600 text-lg mb-6">All applications have been processed.</p>
                                    </div>
                                </div>
                            )}

                            {/* Applications List */}
                            {!loading && !error && pendingData && pendingData.length > 0 && (
                                <div className="space-y-4">
                                    <div className="mb-6">
                                        <p className="text-sm text-gray-600">
                                            Showing {pendingData.length} pending application{pendingData.length !== 1 ? 's' : ''}
                                        </p>
                                    </div>
                                    
                                    {pendingData.map((item, index) => (
                                        <div key={`${item.id || item.email}-${index}`} className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-6 transition-all duration-200 border border-gray-200 hover:border-blue-300 hover:shadow-md">
                                            <div className="flex items-center gap-4">
                                                {/* Avatar Circle */}
                                                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                                    {item.email ? item.email.charAt(0).toUpperCase() : '?'}
                                                </div>

                                                {/* Application Details */}
                                                <div className="flex-1">
                                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-500 mb-1">Email</p>
                                                            <p className="text-gray-900 font-semibold">
                                                                {item.email || 'N/A'}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-500 mb-1">Course Code</p>
                                                            <p className="text-gray-900 font-semibold">
                                                                {item.coursecode || 'N/A'}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-500 mb-1">Date</p>
                                                            <p className="text-gray-900 font-semibold">
                                                                {item.theDate ? new Date(item.theDate).toLocaleDateString() : 'N/A'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Action Button */}
                                                <div className="flex-shrink-0">
                                                    <button className="bg-white hover:bg-blue-50 text-blue-600 font-semibold py-2 px-4 rounded-lg border border-blue-200 hover:border-blue-300 transition-all duration-200 shadow-sm hover:shadow-md">
                                                        View Details
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}