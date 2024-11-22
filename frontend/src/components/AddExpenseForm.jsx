import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios"; // Import axios for making API requests
import Button from "./Button.jsx";

import { useNavigate } from "react-router-dom";

const AddExpenseForm = ({ className = "", incomeId }) => {
    // State for form inputs
    const [formData, setFormData] = useState({
        carMaintenance: 0,
        driverExpense: 0,
        extraExpense: 0
    });

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1); // Navigates to the previous page
    };

    // Handle change in input fields
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: parseFloat(value) || 0 // Ensure it's a number or fallback to 0
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send data to the backend (replace /api/admin with your actual route)
            const response = await axios.put(`http://localhost:5000/api/incomes/admin/${incomeId}`, formData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
            });
            alert("Expense added successfully!");
            navigate("/invoice");

        } catch (error) {
            console.error("Error adding expense", error);
            alert("Failed to add expense. Please try again.");
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
                                <div className="pb-6 font-semibold text-[25px] text-center">Add Expense</div>
                                <div className="absolute right-0 top-0">
                                    <Button handleClick={handleBack} />
                                </div>
                            </div>

                            {/* Car Maintenance */}
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Car Maintenance</label>
                                <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                                    <input
                                        name="carMaintenance"
                                        value={formData.carMaintenance}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                        placeholder="Enter Car Maintenance"
                                        type="number"
                                    />
                                </div>
                            </div>

                            {/* Driver Expense */}
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Driver Expense</label>
                                <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                                    <input
                                        name="driverExpense"
                                        value={formData.driverExpense}
                                        onChange={handleChange}
                                        className="w-full bg-transparent border-none outline-none text-secondary-grey-600 text-left"
                                        placeholder="Enter Driver Expense"
                                        type="number"
                                    />
                                </div>
                            </div>

                            {/* Extra Expenses */}
                            <div className="flex flex-col gap-2">
                                <label className="font-medium text-sm">Extra Expenses</label>
                                <div className="rounded-2xl flex items-center border-[1px] border-solid border-gray-200 p-4">
                                    <input
                                        name="extraExpense"
                                        value={formData.extraExpense}
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
                                    Add Expense
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

AddExpenseForm.propTypes = {
    className: PropTypes.string,
    incomeId: PropTypes.string.isRequired // Pass the income ID to update
};

export default AddExpenseForm;
