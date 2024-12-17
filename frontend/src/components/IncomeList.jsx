import React, { useEffect, useState } from "react";
import RideCard from './RideCard.jsx';
import axios from "axios";
import { BASE_URL } from "../Config.js";

const IncomeList = () => {
    const [trips, setTrips] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // State for search query
    const [isLoading, setIsLoading] = useState(true); // Loading state

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                setIsLoading(true);
                const response = await axios.get(`${BASE_URL}/api/trips/${localStorage.getItem("userRole")}/`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setTrips(response.data);
            } catch (error) {
                console.error("Error fetching trips:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTrips();
    }, []);

    // Filter trips based on the search query
    const filteredTrips = trips.filter((trip) => {
        const email = trip.customer?.email || "";
        const contactNumber = String(trip.customer?.contactNumber || "");
        return (
            email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            contactNumber.includes(searchQuery)
        );
    });

    return (
        <main className="flex flex-col justify-between font-medium mq750:mt-5">
            {/* Search Input */}
            <div className="mb-4 px-4">
                <input
                    type="text"
                    placeholder="Search by customer email or contact number"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring focus:ring-darkslateblue"
                />
            </div>

            <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-darkslateblue flex flex-row items-start justify-evenly pt-8 pb-8 px-10 box-border max-w-full gap-5 rounded-3xl h-full">
                <div className="w-auto overflow-auto" style={{ maxHeight: '700px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {/* Hide scrollbar for Webkit browsers */}
                    <style>{`
                        ::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    <div className='flex flex-col gap-4'>
                        {isLoading ? (
                            <p>Loading trips...</p>
                        ) : filteredTrips.length > 0 ? (
                            filteredTrips
                                .filter(trip => trip.status === 'completed')
                                .reverse()
                                .map((trip) => {
                                    // Calculate total income as the sum of advance and balance
                                    const totalIncome = trip.advance + trip.balance;
                                    console.log(trip.customer);
                                    return (
                                        <RideCard
                                            key={trip._id}
                                            customerName={trip.customer?.name || "Unknown"}
                                            driverName={trip.driver?.name || 'Unknown'}
                                            income={totalIncome} // Use total income here
                                            carName={trip.car?.make || 'Unknown'}
                                            tripId={trip._id}
                                        />
                                    );
                                })
                        ) : (
                            <p>No trips match your search query.</p>
                        )}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default IncomeList;
