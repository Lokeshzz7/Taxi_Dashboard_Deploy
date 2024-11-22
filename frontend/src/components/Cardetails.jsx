import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from './Button'; // Ensure this path is correct based on your file structure

const CarDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [car, setCar] = useState(null);

    useEffect(() => {
        const fetchCarDetails = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:5000/api/cars/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        }
                    }
                );
                setCar(response.data);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        };

        fetchCarDetails();
    }, [id]);

    const handleBack = () => {
        navigate(-1); // Navigates back to the previous page
    };

    if (!car) {
        return (
            <div className="h-screen w-full bg-gray-100 overflow-hidden flex flex-row items-center justify-center pt-[187px] px-5 pb-[186px] box-border leading-[normal] tracking-[normal] text-left text-[36px] text-white font-dm-sans">
                <div className="w-[500px] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.25)] bg-darkslateblue flex flex-col items-start justify-start pt-[21px] px-10 pb-28 box-border gap-[70px] max-w-full">
                    <div className="flex flex-col items-start justify-start gap-[8px]">
                        <a className="[text-decoration:none] relative tracking-[-0.02em] leading-[56px] font-bold text-[inherit] inline-block min-w-[111px] z-[1]">
                            Car Details
                        </a>
                        <div className="flex flex-row items-start justify-start py-0 pr-0 pl-px text-[16px] text-secondary-grey-600">
                            <div className="relative tracking-[-0.02em] leading-[100%] z-[1]">
                                Error Fetching information about the car.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-screen w-full bg-gray-100 overflow-hidden flex flex-row items-center justify-center pt-[187px] px-5 pb-[186px] box-border leading-[normal] tracking-[normal] text-left text-[36px] text-white font-dm-sans">
            <div className="w-[500px] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.25)] bg-darkslateblue flex flex-col items-start justify-start pt-[21px] px-10 pb-28 box-border gap-[70px] max-w-full">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                    <a className="[text-decoration:none] relative tracking-[-0.02em] leading-[56px] font-bold text-[inherit] inline-block min-w-[111px] z-[1]">
                        Car Details
                    </a>
                    <div className="flex flex-row items-start justify-start py-0 pr-0 pl-px text-[16px] text-secondary-grey-600">
                        <div className="relative tracking-[-0.02em] leading-[100%] z-[1]">
                            Displaying detailed information about the car.
                        </div>
                    </div>
                </div>

                <div className="m-0 w-[410px] flex flex-col items-start justify-start gap-[24px] max-w-full">
                    {/* Car Details */}
                    <div className="self-stretch flex flex-col items-start justify-start gap-[13px] max-w-full">
                        {/* Make */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">Make:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600">
                                {car.make}
                            </p>
                        </div>

                        {/* registrationNumber */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">Registration Number:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600">
                                {car.registrationNumber}
                            </p>
                        </div>

                        {/* status */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">status:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600">
                                {car.status}
                            </p>
                        </div>

                        {/* numberOfTrips */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">Number Of Trips:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600">
                                {car.numberOfTrips}
                            </p>
                        </div>

                        {/* income */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">income:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600">
                                {car.income}
                            </p>
                        </div>

                        {/* expenses */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">expenses:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600">
                                {car.expenses}
                            </p>
                        </div>

                        {/* Other car details */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarDetails;
