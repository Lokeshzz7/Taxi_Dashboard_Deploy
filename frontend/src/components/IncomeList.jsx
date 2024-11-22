import React, { useEffect, useState } from "react";
import RideCard from './RideCard.jsx';
import axios from "axios";

const IncomeList = () => {
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/trips/${localStorage.getItem("userRole")}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in headers
                    },
                });
                setTrips(response.data);
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        };

        fetchTrips();
    }, []);

    return (
        <main className="flex overflow-hidden flex-col justify-between font-medium mq750:mt-5">
            <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-darkslateblue flex flex-row items-start justify-evenly pt-[31px] pb-[33px] pr-[52px] pl-[52px] box-border max-w-full gap-[20px] rounded-3xl min-w-min h-full mq750:pl-[40px] mq750:gap[3px] mq750:box-border mq750:px-0 mq750:pr-10">
                <div className="w-auto overflow-auto" style={{ maxHeight: '700px', scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    {/* Hide scrollbar for Webkit browsers */}
                    <style>{`
                        ::-webkit-scrollbar {
                            display: none;
                        }
                    `}</style>
                    <div className='flex flex-col gap-4'>
                        {trips
                            .filter(trip => trip.status === 'completed')
                            .reverse()
                            .map((trip) => {
                                // Calculate total income as the sum of advance and balance
                                const totalIncome = trip.advance + trip.balance;
                                return (
                                    <RideCard
                                        key={trip._id}
                                        customerName={trip.customerName}
                                        driverName={trip.driver ? trip.driver.name : 'Unknown'}
                                        income={totalIncome} // Use total income here
                                        carName={trip.car ? trip.car.make : 'Unknown'}
                                        tripId={trip._id}
                                    />
                                );
                            })}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default IncomeList;
