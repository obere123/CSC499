import React from "react";
import { useState, useEffect } from "react";
//import apiInstance from "../../utils/axios";
import PresidentNavBar from "./PresidentNavBar";
import { GetPairings } from "../../utils/non_auth_axioscalls";
import { useAuth } from "../../utils/useAuth";

export default function PairingView() {
    const [pairings, setPairings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { isAuthenticated, currentUser, loading: authLoading } = useAuth();

    if(currentUser.category==="President"){

    useEffect(() => {
        const fetchPairings = async () => {
            try {
                setLoading(true);
                const response = await GetPairings();
                setPairings(response.data);
                setError(null);
            } catch (err) {
                setError('Failed to fetch pairings');
                console.error('Error fetching pairings:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchPairings();
    }, []);

    if (loading) {
        return (
            <>
                <PresidentNavBar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">Loading pairings...</div>
                </div>
            </>
        );
    }

    if (error) {
        return (
            <>
                <PresidentNavBar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center text-red-600">{error}</div>
                </div>
            </>
        );
    }

    return (
        <>
            <PresidentNavBar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold mb-6">Tutor-Tutee Pairings</h1>
                
                {pairings.length === 0 ? (
                    <div className="text-center text-gray-500">
                        No pairings found.
                    </div>
                ) : (
                    <div className="overflow-x-auto shadow-lg rounded-lg">
                        <table className="min-w-full bg-white border border-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Tutor Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Tutee Email
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-b">
                                        Course Code
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {pairings.map((pairing, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {pairing.tutorEmail}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {pairing.tuteeEmail}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            {typeof pairing.courseCode === 'object' 
                                                ? pairing.courseCode?.coursecode || 'N/A'
                                                : pairing.courseCode || 'N/A'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </>
    ); }else{<div>No entry to pairing view</div>} 
}