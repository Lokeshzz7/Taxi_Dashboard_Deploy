import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Button from "./Button.jsx";

const ReviewList = () => {
    const navigate = useNavigate();
    const [trips, setTrips] = useState([]);

    const [userRole, setUserRole] = useState(localStorage.getItem("userRole"));

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                // Adjusted API endpoint URL
                const response = await axios.get(`http://localhost:5000/api/trips/${userRole}/pending`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`, // Include token in headers
                    },
                });
                setTrips(response.data.trips); // Access trips from the API response
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        };

        fetchTrips();
    }, []);

    const onCompleteTripClick = (tripId) => {
        navigate(`/finalizetrip/${tripId}`);
    };

    const handleBack = () => {
      navigate(-1); // Navigates to the previous page
    };

    return (
        <section className="flex-1 flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border max-w-[calc(100%_-_371px)] text-left text-xs text-whitesmoke-400 font-poppins mq1224:h-[100vh]">
            <div className="self-stretch flex flex-col items-end justify-start gap-[30px] max-w-full">
                <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-darkslateblue flex flex-row items-start justify-evenly pt-[31px] pb-[33px] pr-[65px] pl-[52px] box-border max-w-full gap-[20px] rounded-3xl min-w-min h-[560px] mq750:pl-[10px] mq750:gap[3px] mq750:box-border mq750:px-10 mq750:mt-10">
                    <form className="m-0 self-stretch h-[615.3px] flex flex-col items-start justify-start pt-0 px-0 gap-[9.5px] max-w-full mq450:box-border">
                        <div className="flex justify-between min-w-full mq750:gap-[20px]">
                            <div className="left-div font-semibold text-[35px] ml-[30px] md:ml-6 mq750:text-[20px]">
                                Review Trips
                            </div>
                            <div className="right-div">
                              <Button handleClick={handleBack} />
                            </div>
                        </div>

                        <div className="container mx-auto px-4 py-4 mq750:px-2">
                            <div
                                className="overflow-auto"
                                style={{
                                    maxHeight: "400px",
                                    scrollbarWidth: "none", // Firefox
                                    msOverflowStyle: "none", // IE 10+
                                }}
                            >
                                <style>{`
                                    ::-webkit-scrollbar {
                                        display: none;
                                    }
                                `}</style>
                                <table className="min-w-full border-b-4 border-black">
                                    <thead>
                                        <tr>
                                            <th className="px-4 py-2 border-b text-[25px] font-normal mq750:text-[20px] mq750:px-2">
                                                Driver
                                            </th>
                                            <th className="px-4 py-2 border-b text-[25px] font-normal mq1224:hidden">
                                                Start Date
                                            </th>
                                            <th className="px-4 py-2 border-b text-[25px] font-normal mq1224:hidden">
                                                Starting KM
                                            </th>
                                            <th className="px-4 py-2 border-b text-[25px] font-normal mq750:text-[20px] mq750:px-2">
                                                Status
                                            </th>
                                            <th className="px-4 py-2 border-b text-[25px] font-normal mq750:text-[20px] mq750:px-2">
                                                Complete Trip
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {trips.slice().reverse().map((trip) => (
                                            <tr key={trip._id}>
                                                <td className="px-4 py-2 border-b font-light text-[15px] mq750:text-[15px] mq750:px-2">
                                                    {trip.driver.name}
                                                </td>
                                                <td className="px-4 py-2 border-b font-light text-[15px] mq1224:hidden">
                                                    {new Date(trip.startDate).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-2 border-b font-light text-[15px] mq1224:hidden">
                                                    {trip.startKm}
                                                </td>
                                                <td className="px-4 py-2 border-b">
                                                    <div
                                                        className={`px-2 py-1 rounded w-max font-light text-[15px] text-center mq750:text-[15px] mq750:px-2  ${trip.status === "pending" ? "bg-red-700" 
                                                        : trip.status === "completed" ? "bg-green-700" 
                                                        : trip.status === "review" ? "bg-gray-500" 
                                                        : "bg-gray-300"} text-white`}
                                                    >
                                                        {trip.status}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-2 border-b">
                                                    {trip.status !== "completed" && (
                                                        <button
                                                            className="bg-red-700 text-white font-light text-[15px] px-4 py-2 rounded mq750:text-[15px] mq750:px-2 cursor-pointer"
                                                            onClick={() => onCompleteTripClick(trip._id)}
                                                        >
                                                            Complete Trip
                                                        </button>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ReviewList;
