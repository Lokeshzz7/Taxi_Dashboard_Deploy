import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";


const AddFormCar = ({ className = "" }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigates to the previous page
    };
    
    const [formData, setFormData] = useState({
        carName: "",
        transmission: "",
        vehicleNumber: "",
        pricePerDay: "",
        numberOfSeats: "",
        typeOfVehicle: "",
        typeOfFuel: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${BASE_URL}/api/cars/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to submit form');
            }

            const result = await response.json();
            console.log('Form submitted successfully:', result);
            window.alert('Car was added successfully');
            window.location.href = '/car';
        } catch (error) {
            console.error('Error submitting form:', error);
        }
    };

    return (
        <div className={`w-full right-0 bottom-0 left-0 px-4 py-4 md:px-16 lg:px-32 h-lvh text-left text-sm text-white z-0  ${className}`}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                    <div className="relative flex items-center justify-center h-full w-full max-w-2xl mx-auto mt-16 mq750:ml-6">
                        <div className="absolute shadow-md rounded-2xl bg-darkslateblue w-full h-full p-8 overflow-y-auto"></div>

                        <div className="relative flex flex-col gap-6 z-50 w-full">
                        <div className="flex flex-row gap-2">
                                <div className="pb-6 font-semibold text-[25px] text-center">Add Car</div>
                                <div className="absolute right-0 top-0">
                                    <Button handleClick={handleBack} />
                                </div>
                            </div>

                            {/* Car Name & Transmission */}
                            <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold ">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">Car Name</label>
                                    <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4 ">
                                        <input
                                            name="carName"
                                            className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                            placeholder="Enter the Name"
                                            type="text"
                                            value={formData.carName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">Transmission</label>
                                    <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4">
                                        <select
                                            name="transmission"
                                            value={formData.transmission}
                                            onChange={handleChange}
                                            className="w-full bg-[#111c44] border-none outline-none text-white opacity-50"
                                        >
                                            <option value="" disabled>Select a Type</option>
                                            <option value="Manual">Manual</option>
                                            <option value="Automatic">Automatic</option>
                                            <option value="Hybrid">Hybrid</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Vehicle No & Price */}
                            <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">Vehicle No</label>
                                    <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4">
                                        <input
                                            name="vehicleNumber"
                                            className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                            placeholder="Enter the Vehicle No"
                                            type="text"
                                            value={formData.vehicleNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">Price / Day</label>
                                    <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4">
                                        <input
                                            name="pricePerDay"
                                            className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                            placeholder="Enter the Price"
                                            type="number"
                                            value={formData.pricePerDay}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Number of Seats */}
                            <div className="flex flex-col gap-4 text-lg font-bold birder-4 border-black ">
                                <label className="font-medium text-sm">Number of Seats</label>
                                <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4">
                                    <input
                                        name="numberOfSeats"
                                        className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                        placeholder="Enter the Number of Seats"
                                        type="number"
                                        value={formData.numberOfSeats}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            {/* Type of Vehicle & Fuel */}
                            <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">Type of Vehicle</label>
                                    <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4">
                                        <select
                                            name="typeOfVehicle"
                                            value={formData.typeOfVehicle}
                                            onChange={handleChange}
                                            className="w-full bg-[#111c44] border-none outline-none text-white opacity-50"
                                        >
                                            <option value="" disabled>Select a Type</option>
                                            <option value="SUV">SUV</option>
                                            <option value="Sedan">Sedan</option>
                                            <option value="Hatchback">Hatchback</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">Type of Fuel</label>
                                    <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4">
                                        <select
                                            name="typeOfFuel"
                                            value={formData.typeOfFuel}
                                            onChange={handleChange}
                                            className="w-full bg-[#111c44] border-none outline-none text-white opacity-50"
                                        >
                                            <option value="" disabled>Select a Fuel Type</option>
                                            <option value="Petrol">Petrol</option>
                                            <option value="Diesel">Diesel</option>
                                            <option value="Electric">Electric</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Submit */}
                            <div className="flex flex-col items-center mt-4">
                                <button
                                    type="submit"
                                    onClick={handleSubmit}
                                    className="w-full md:w-[400px] rounded-2xl bg-primary-purple-blue-400 text-white py-3 px-4 font-medium text-lg"
                                >
                                    Add Car
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

AddFormCar.propTypes = {
    className: PropTypes.string
};

export default AddFormCar;
