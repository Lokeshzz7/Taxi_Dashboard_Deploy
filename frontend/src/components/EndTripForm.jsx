import React, {useEffect,useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Button from "./Button.jsx";

import { useNavigate } from "react-router-dom";

const EndTripForm = ({ className = "", tripId}) => {
    const [formData, setFormData] = useState({
        endKm: 0,
        discount:0,
        tripExpense: 0,
    });

    const [tripDetails, setTripDetails] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/trips/${localStorage.getItem("userRole")}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setTripDetails(response.data);
            } catch (error) {
                console.error("Error fetching trip details:", error);
            }
        };

        fetchTripDetails();
    }, [tripId]);

    const handleBack = () => {
        navigate(-1); // Navigates to the previous page
    };

    // Handle change in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: parseFloat(value) || 0
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        const tripToEnd = tripDetails.find((trip) => trip._id === tripId);
        e.preventDefault(); 
        const endDate = new Date();

        if (!tripDetails) {
            alert("Trip details are not available.");
            return;
        }

        const farePrice = tripToEnd.fare; 
        const advanceAmount = tripToEnd.advance;
        let balance = 0;

        if (tripToEnd.fareType === "day") {
            const daysDifference = Math.ceil(
                (endDate - new Date(tripToEnd.startDate)) / (1000 * 60 * 60 * 24)
            );
            balance = farePrice * daysDifference - advanceAmount - formData.discount;
        } else if (tripToEnd.fareType === "km") {
            balance = farePrice * (formData.endKm - tripToEnd.startKm) - advanceAmount - formData.discount;
        }

        try {
            const response = await axios.post(
                `http://localhost:5000/api/trips/${localStorage.getItem("userRole")}/${tripToEnd._id}/end`,
                {
                    ...formData,
                    endDate,
                    balance,
                },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );

            if (response.status === 200) {
                navigate("/trips");
            }
        } catch (error) {
            console.error("Error ending the trip:", error);
        }
    };

    return (
        <div className={`w-full px-4 py-4 h-lvh text-left text-sm text-white ${className}`}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                    <div className="relative flex items-center justify-center h-full w-full max-w-2xl mx-auto mt-16">
                        <div className="absolute shadow-md rounded-2xl bg-darkslateblue w-full h-full p-8"></div>

                        <div className="relative flex flex-col gap-6 z-50 w-full">
                            <div className="flex flex-row gap-2">
                                <div className="pb-6 font-semibold text-[25px] text-center">End Trip</div>
                                <div className="absolute right-0 top-0">
                                    <Button handleClick={handleBack} />
                                </div>
                            </div>

                            {/* End Km */}
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">End Km</label>
                                <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                                    <input
                                        name="endKm"
                                        value={formData.endKm}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                        placeholder="Enter Car Maintenance"
                                        type="number"
                                    />
                                </div>
                            </div>

                            {/* Trip Expense */}
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Trip Expense</label>
                                <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                                    <input
                                        name="tripExpense"
                                        value={formData.tripExpense}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                        placeholder="Enter Driver Expense"
                                        type="number"
                                    />
                                </div>
                            </div>

                            {/* Discount */}
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Discount</label>
                                <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                                    <input
                                        name="discount"
                                        value={formData.discount}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                        placeholder="Enter Extra Expenses"
                                        type="number"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <div className="flex flex-col items-center mt-4">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer md:w-[400px] rounded-2xl bg-primary-purple-blue-400 text-white py-3 px-4 font-medium text-lg "
                                >
                                    End Trip
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

EndTripForm.propTypes = {
    className: PropTypes.string,
    tripId: PropTypes.string.isRequired
};

export default EndTripForm;
