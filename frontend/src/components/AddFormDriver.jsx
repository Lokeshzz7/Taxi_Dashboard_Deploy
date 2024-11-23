import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "./Button.jsx";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config.js";

const AddFormDriver = ({ className = "" }) => {

    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1); // Navigates to the previous page
    };
    
    const [formData, setFormData] = useState({
        name: "",
        licenseNumber: "",
        contactNumber: "",
        email: "",
        address: "",
        dateOfBirth: "",
        licenseExpiryDate: "",
        status: "available",
        notes: "",
        password: ""
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

        if (!formData.password) {
            alert("Password is required.");
            return;
        }

        let formattedDob = null;
        let formattedLicenseExpiry = null;

        if (formData.dateOfBirth) {
            const dob = new Date(formData.dateOfBirth);
            if (!isNaN(dob.getTime())) {
                formattedDob = dob.toISOString();
            } else {
                alert("Invalid Date of Birth.");
                return;
            }
        }

        if (formData.licenseExpiryDate) {
            const licenseExpiry = new Date(formData.licenseExpiryDate);
            if (!isNaN(licenseExpiry.getTime())) {
                formattedLicenseExpiry = licenseExpiry.toISOString();
            } else {
                alert("Invalid License Expiry Date.");
                return;
            }
        }

        try {
            const response = await fetch(`${BASE_URL}/api/drivers/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
                body: JSON.stringify({
                    name: formData.name,
                    licenseNumber: formData.licenseNumber,
                    contactNumber: formData.contactNumber,
                    email: formData.email,
                    address: formData.address,
                    dateOfBirth: formattedDob,
                    licenseExpiryDate: formattedLicenseExpiry,
                    status: formData.status,
                    notes: formData.notes,
                    password: formData.password
                }),
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Failed to submit form');
            }

            const result = await response.json();
            console.log('Form submitted successfully:', result);
            window.alert('Driver was added successfully');
            window.location.href = '/driver';
        } catch (error) {
            console.error('Error submitting form:', error);
            window.alert('Failed to submit form');
        }
    };

    return (
        <div className={`w-full right-0 bottom-0 left-0 px-4 py-4 md:px-16 lg:px-32 h-lvh text-left text-sm text-white z-0 ${className}`}>
            <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center">
                    <div className="relative flex items-center justify-center h-full w-full max-w-2xl mx-auto mt-16 mq750:ml-6">
                        <div className="absolute shadow-md rounded-2xl bg-darkslateblue w-full h-full p-8 overflow-y-auto"></div>

                        <div className="relative flex flex-col gap-6 z-50 w-full">
                            <div className="flex flex-row gap-2">
                                <div className="pb-6 font-semibold text-[25px] text-center">Add Driver</div>
                                <div className="absolute right-0 top-0">
                                    <Button handleClick={handleBack} />
                                </div>
                            </div>
                            {/* Name & DOB */}
                            <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">Name</label>
                                    <div className="rounded-2xl flex items-center boz-[1] border-[1px] border-solid border-gray-200 p-4">
                                        <input
                                            name="name"
                                            className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                            placeholder="Enter the Name"
                                            type="text"
                                            value={formData.name}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">DOB</label>
                                    <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4">
                                        <input
                                            name="dateOfBirth"
                                            className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                            placeholder=""
                                            type="date"
                                            value={formData.dateOfBirth}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Email & License No */}
                            <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">Email</label>
                                    <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4">
                                        <input
                                            name="email"
                                            className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                            placeholder="Enter the Email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">License No</label>
                                    <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4">
                                        <input
                                            name="licenseNumber"
                                            className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                            placeholder="Enter the Number"
                                            type="text"
                                            value={formData.licenseNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Contact Number & Password */}
                            <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">Contact Number</label>
                                    <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4">
                                        <input
                                            name="contactNumber"
                                            className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                            placeholder="Enter the Number"
                                            type="text"
                                            value={formData.contactNumber}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">Password</label>
                                    <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4">
                                        <input
                                            name="password"
                                            className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                            placeholder="Enter the Password"
                                            type="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Address & License Expiry Date */}
                            <div className="flex flex-col md:flex-row justify-between gap-4 text-lg font-bold">
                                <div className="flex flex-col gap-2 flex-1">
                                    <label className="font-medium text-sm">Address</label>
                                    <div className="rounded-2xl flex items-center z-[1] border-[1px] border-solid border-gray-200 p-4">
                                        <input
                                            name="address"
                                            className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                            placeholder="Enter Address"
                                            type="text"
                                            value={formData.address}
                                            onChange={handleChange}
                                        />
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
                                    Add Driver
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

AddFormDriver.propTypes = {
    className: PropTypes.string
};

export default AddFormDriver;
