
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../config";

function RideCard({ customerName, driverName, income, carName, tripId }) {
    const navigate = useNavigate();

    const [totalExpense, setTotalExpense] = useState(0); // State to hold the total expense
    const [canAddExpense, setCanAddExpense] = useState(true); // State to manage button visibility

    // Function to fetch the total expense based on the income ID
    const fetchTotalExpense = async (incomeId) => {
        try {
            const response = await axios.get(`${BASE_URL}/api/incomes/admin/total-expense/${incomeId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            if (response.status === 200) {
                const { totalExpense } = response.data;
                setTotalExpense(totalExpense); // Update the totalExpense state
                setCanAddExpense(totalExpense === 0); // Allow adding expense if total is 0
            } else {
                console.error('Failed to fetch total expense');
            }
        } catch (error) {
            console.error('Error fetching total expense:', error);
        }
    };

    const onAddExpenseClick = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/api/trips/admin/${tripId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // Check if the response is successful
            if (response.status === 200) { // Use response.status instead of response.ok
                const trip = response.data; // Get the trip data from the response
                const incomeId = trip.income;
                console.log(incomeId);
                navigate(`/addexpense?incomeId=${incomeId}`); // Redirect with incomeId
            } else {
                console.error('Failed to fetch the trip');
            }
        } catch (error) {
            console.error('Error fetching trip details:', error);
        }
    };

    const handleDownloadInvoice = async () => {
        try {
            // Call the backend to get the invoice
            const response = await fetch(`${BASE_URL}/api/incomes/admin/${tripId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    // Add authorization headers if needed
                },
            });

            if (response.ok) {
                // Create a Blob from the response (the PDF file)
                const blob = await response.blob();

                // Create a link element to download the PDF
                const url = window.URL.createObjectURL(new Blob([blob]));
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', `invoice_${tripId}.pdf`);

                // Append the link to the body
                document.body.appendChild(link);

                // Trigger the download
                link.click();

                // Clean up and remove the link
                link.parentNode.removeChild(link);
            } else if (response.status === 404) {
                // Handle the case when the invoice is not found
                alert('Invoice not found.');
            } else {
                console.error('Failed to fetch the invoice');
            }
        } catch (error) {
            console.error('Error downloading invoice:', error);
        }
    };

    useEffect(() => {
        const fetchTripDetails = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/trips/admin/${tripId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem("token")}`,
                    },
                });

                if (response.status === 200) {
                    const trip = response.data; // Get the trip data from the response
                    const incomeId = trip.income; // Assuming trip.income holds the income ID
                    fetchTotalExpense(incomeId); // Fetch total expense using the income ID
                }
            } catch (error) {
                console.error('Error fetching trip details:', error);
            }
        };

        fetchTripDetails(); // Call the function to fetch trip details
    }, [tripId]);


    return (
        <article className="flex flex-row overflow-hidden flex-wrap gap-10 justify-between px-9 py-6  rounded-3xl  bg-slate-900 max-md:px-5 max-md:max-w-full">
            <div className="flex flex-wrap  text-2xl tracking-tight text-white gap-11">
                <div className="flex flex-col grow shrink-0 basis-0 text-white font-bold text-[20px] md:text-[20px] ">
                    <p>Customer name: {customerName}</p>
                    <p className="self-start mt-6">Driver name: {driverName}</p>
                </div>
                <div className="flex flex-col self-start text-white font-bold text-[20px] md:text-[20px]">
                    <p className="self-end">Income: {income}</p>
                    <p className="mt-6">Car name: {carName}</p>
                </div>
            </div>
            <div className="flex flex-col my-auto  tracking-normal text-gray-200 gap-4">
                {canAddExpense ? (
                    <button
                        className="bg-[#5932EA] text-white font-bold text-[20px] md:text-[20px] px-2 py-1 rounded-lg w-full md:w-[190px] h-[40px] mix-blend-normal mq750:text-[15px] cursor-pointer"
                        onClick={onAddExpenseClick}
                    >
                        Add Expense
                    </button>
                ) : (
                    <p className="text-white font-bold text-[20px] md:text-[20px]">Expense: {totalExpense}</p> // Show total expense if greater than 0
                )}
                <button
                    className="bg-[#5932EA] text-white font-bold text-[20px] md:text-[20px] px-2 py-1 rounded-lg w-full md:w-[190px] h-[40px] mix-blend-normal  mq750:text-[15px] cursor-pointer"
                    onClick={handleDownloadInvoice} // Download Invoice on click
                >
                    Download Invoice
                </button>
            </div>
        </article>
    );
}

export default RideCard;
