import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";

const ReviewTripForm = ({ className = "", tripId }) => {
    const [formData, setFormData] = useState({
        discount: 0,
        tripExpense: 0,
    });

    const [tripDetails, setTripDetails] = useState(null);
    const [userRole, setUserRole] = useState(localStorage.getItem("userRole")); // Retrieve user role from localStorage

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/trips/${userRole}/pending`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setTripDetails(response.data.trips);
            } catch (error) {
                console.error("Error fetching trip details:", error);
            }
        };

        fetchTripDetails();
    }, [tripId, userRole]);

    const handleBack = () => {
        navigate(-1); // Navigates to the previous page
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: parseFloat(value) || 0,
        });
    };

    const calculateBalance = () => {
        if (!tripDetails) return 0;

        const tripToEnd = tripDetails.find((trip) => trip._id === tripId);
        if (!tripToEnd) return 0;

        const farePrice = tripToEnd.fare;
        const advanceAmount = tripToEnd.advance;
        const endKm = tripToEnd.endKm;
        let balance = 0;

        if (tripToEnd.fareType === "day") {
            const daysDifference = Math.ceil(
                (new Date() - new Date(tripToEnd.startDate)) / (1000 * 60 * 60 * 24)
            );
            balance = farePrice * daysDifference - advanceAmount - formData.discount;
        } else if (tripToEnd.fareType === "km") {
            balance = farePrice * (endKm - tripToEnd.startKm) - advanceAmount - formData.discount;
        }

        return balance;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const tripToEnd = tripDetails.find((trip) => trip._id === tripId);
        if (!tripToEnd) {
            alert("Trip details are not available.");
            return;
        }

        const balance = calculateBalance();

        try {
            const response = await axios.post(
                `http://localhost:5000/api/trips/${userRole}/${tripToEnd._id}/finalize-trip`,
                {
                    ...formData,
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

    const totalExpense = parseFloat(formData.tripExpense || 0) + calculateBalance();

    return (
        <div className={`w-full px-4 py-4 h-lvh text-left text-sm text-white ${className}`}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                    <div className="relative flex items-center justify-center h-full w-full max-w-2xl mx-auto mt-16">
                        <div className="absolute shadow-md rounded-2xl bg-darkslateblue w-full h-full p-8"></div>

                        <div className="relative flex flex-col gap-6 z-50 w-full">
                            <div className="flex flex-row gap-2">
                                <div className="pb-6 font-semibold text-[25px] text-center">Complete Trip</div>
                                <div className="absolute right-0 top-0">
                                    <Button handleClick={handleBack} />
                                </div>
                            </div>
                            {userRole !== "driver" && (
                                <>
                                    <div className="flex flex-col gap-2">
                                        <label className="font-medium text-sm">Trip Expense</label>
                                        <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                                            <input
                                                name="tripExpense"
                                                value={formData.tripExpense}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                                placeholder="Enter Trip Expense"
                                                type="number"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <label className="font-medium text-sm">Discount</label>
                                        <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                                            <input
                                                name="discount"
                                                value={formData.discount}
                                                onChange={handleChange}
                                                className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                                placeholder="Enter Discount"
                                                type="number"
                                            />
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="flex flex-col items-center mt-4">
                                <button
                                    type="submit"
                                    className="w-full cursor-pointer md:w-[400px] rounded-2xl bg-primary-purple-blue-400 text-white py-3 px-4 font-medium text-lg "
                                >
                                    Complete Trip
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Summary Section */}
                    <div className="mt-16 w-full max-w-2xl mx-auto bg-darkslateblue p-6 rounded-2xl text-white shadow-md">
                        <h3 className="text-lg font-semibold mb-4">Trip Summary</h3>
                        <div className="flex justify-between mb-2">
                            <span>Total Expense:</span>
                            <span>{totalExpense.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Balance:</span>
                            <span>{calculateBalance().toFixed(2)}</span>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

ReviewTripForm.propTypes = {
    className: PropTypes.string,
    tripId: PropTypes.string.isRequired,
};

export default ReviewTripForm;
