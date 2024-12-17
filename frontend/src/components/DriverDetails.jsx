import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../Config';

const DriverDetails = () => {
    const { id } = useParams();
    const [driver, setDriver] = useState(null);


    useEffect(() => {
        const fetchDriverDetails = async () => {
            try {
                const response = await axios.get(
                    `${BASE_URL}/api/drivers/${id}`,
                    {
                        headers: {
                            'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in headers
                        }
                    }
                );
                setDriver(response.data);
            } catch (error) {
                console.error('Error fetching driver details:', error);
            }
        };


        fetchDriverDetails();
    }, [id]);

    if (!driver) {
        return (<div className="h-screen w-full bg-gray-100 overflow-hidden flex flex-row items-center justify-center pt-[187px] px-5 pb-[186px] box-border leading-[normal] tracking-[normal] text-left text-[36px] text-white font-dm-sans">
            <div className="w-[500px] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.25)] bg-darkslateblue flex flex-col items-start justify-start pt-[21px] px-10 pb-28 box-border gap-[70px] max-w-full mq675:gap-[35px] mq675:pt-5 mq675:pb-[73px] mq675:box-border">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                    <a className="[text-decoration:none] relative tracking-[-0.02em] leading-[56px] font-bold text-[inherit] inline-block min-w-[111px] z-[1] mq450:text-[22px] mq450:leading-[34px] mq750:text-[29px] mq750:leading-[45px]">
                        Driver Details
                    </a>
                    <div className="flex flex-row items-start justify-start py-0 pr-0 pl-px text-[16px] text-secondary-grey-600">
                        <div className="relative tracking-[-0.02em] leading-[100%] z-[1]">
                            Error Fetching information about the driver.
                        </div>
                    </div>
                </div>
            </div>
        </div>);

    }

    return (
        <div className="h-screen w-full bg-gray-100 overflow-hidden flex flex-row items-center justify-center pt-[187px] px-5 pb-[186px] box-border leading-[normal] tracking-[normal] text-left text-[36px] text-white font-dm-sans">
            <div className="w-[500px] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.25)] bg-darkslateblue flex flex-col items-start justify-start pt-[21px] px-10 pb-28 box-border gap-[70px] max-w-full mq675:gap-[35px] mq675:pt-5 mq675:pb-[73px] mq675:box-border">
                <div className="flex flex-col items-start justify-start gap-[8px]">
                    <a className="[text-decoration:none] relative tracking-[-0.02em] leading-[56px] font-bold text-[inherit] inline-block min-w-[111px] z-[1] mq450:text-[22px] mq450:leading-[34px] mq750:text-[29px] mq750:leading-[45px]">
                        Driver Details
                    </a>
                    <div className="flex flex-row items-start justify-start py-0 pr-0 pl-px text-[16px] text-secondary-grey-600">
                        <div className="relative tracking-[-0.02em] leading-[100%] z-[1]">
                            Displaying detailed information about the driver.
                        </div>
                    </div>
                </div>

                <div className="m-0 w-[410px] flex flex-col items-start justify-start gap-[24px] max-w-full">
                    {/* Driver Details */}
                    <div className="self-stretch flex flex-col items-start justify-start gap-[13px] max-w-full">
                        {/* Name */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">Name:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600">
                                {driver.name}
                            </p>
                        </div>

                        {/* numberOfTrips */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">Number Of Trips:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600">
                                {driver.numberOfTrips}
                            </p>
                        </div>

                        {/* Email */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">Email:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600">
                                {driver.email}
                            </p>
                        </div>

                        {/* Phone Number */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">Phone Number:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600">
                                {driver.contactNumber}
                            </p>
                        </div>

                        {/* License Number */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">License Number:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600">
                                {driver.licenseNumber}
                            </p>
                        </div>

                        {/* Status */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">Status:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600">
                                {driver.status}
                            </p>
                        </div>

                        {/* Address */}
                        <div className="flex w-full items-center justify-start gap-4">
                            <div className="relative text-sm tracking-[-0.02em] leading-[100%] font-medium font-dm-sans text-left z-[1]">
                                <span className="text-white">Address:</span>
                            </div>
                            <p className="font-dm-sans text-sm text-secondary-grey-600 flex-wrap">
                                {driver.address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DriverDetails;
