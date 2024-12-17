import { useNavigate } from "react-router-dom";
import StatHeaders from "./StatHeaders";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import { BASE_URL } from "../Config";

const Driverslist = () => {
    const navigate = useNavigate();

    const onAdddriverClick = () => {
        navigate('/adddriver')
    }

    //  stats of drivers
    const [stats, setStats] = useState({
        totalDrivers: 0,
        availableDrivers: 0,
        inTripDrivers: 0,
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/drivers/stats`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in headers
                    },
                });
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching driver statistics', error);
            }
        };

        fetchStats();
    }, []);

    // Drivers list
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const fetchDrivers = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/drivers`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in headers
                    },
                });
                console.log('Drivers data fetched:', response.data);
                setDrivers(response.data);
            } catch (error) {
                console.error('Error fetching drivers:', error);
            }
        };

        fetchDrivers();
    }, []);

    // Delete driver
    const deleteDriver = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this driver?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`${BASE_URL}/api/drivers/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in headers
                },
            });
            setDrivers(drivers.filter(driver => driver._id !== id));
            const response = await axios.get(`${BASE_URL}/api/drivers/stats`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in headers
                },
            });
            setStats(response.data);
        } catch (error) {
            console.error('Error deleting driver:', error);
        }
    };

    // Navigate to driver details
    const viewDriverDetails = (id) => {
        navigate(`/driverdetails/${id}`);
    };


    return (


        <section className="flex-1 flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border max-w-[calc(100%_-_371px)] text-left text-xs text-whitesmoke-400 font-poppins mq1224:h-[100vh]">
            <div className="self-stretch flex flex-col items-end justify-start gap-[30px] max-w-full">


                {/*Top 3 piece */}
                <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-darkslateblue flex flex-row items-start justify-evenly pt-[31px] pb-[33px] pr-[65px] pl-[52px] box-border max-w-full gap-[20px] rounded-3xl w-[1400px] mq1224:hidden ">
                    <StatHeaders
                        Condition="Drivers"
                        statNumbers={stats.totalDrivers.toLocaleString() || "Loading..."}
                        circleColor="bg-orange-700"
                    />
                    <div className="h-[88px] w-px relative bg-darkslateblue box-border z-[2] border-r-[1px] border-solid border-whitesmoke-200 mq975:w-full mq975:h-px" />
                    <StatHeaders
                        Condition="Available"
                        statNumbers={stats.availableDrivers.toLocaleString() || "Loading..."}
                        circleColor="bg-green-700"
                    />
                    <div className="h-[88px] w-px relative bg-darkslateblue box-border z-[2] border-r-[1px] border-solid border-whitesmoke-200 mq975:w-full mq975:h-px" />
                    <StatHeaders
                        Condition="In-Trip"
                        statNumbers={stats.inTripDrivers.toLocaleString() || "Loading..."}
                        circleColor="bg-red-700"
                    />
                </div>



                {/*Bottom card */}
                <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)]  bg-darkslateblue flex flex-row  items-start justify-evenly pt-[31px] pb-[33px] pr-[65px] pl-[52px] box-border max-w-full gap-[20px] rounded-3xl min-w-min h-[560px] mq750:gap[3px] mq750:justify-center mq750:box-border mq750:px-15 mq750:mt-10">


                    {/*from */}
                    <form className="m-0 self-stretch h-[615.3px] flex flex-col items-start justify-start pt-0 px-0 gap-[9.5px] max-w-full  mq450:box-border  ">

                        {/*All & ADD Drivers */}
                        <div className="flex  justify-between min-w-full mq750:gap-[20px]">
                            <div className="left-div font-semibold text-[35px] md:text-[30px] ml-4 md:ml-6 mq750:text-[20px]">
                                All Drivers
                            </div>

                            <div className="right-div">
                                <button className="bg-[#5932EA] text-white font-bold text-[20px] md:text-[20px] px-2 py-1 rounded-lg w-full md:w-[190px] h-[40px] mix-blend-normal mq750:text-[15px]cursor-pointer "
                                    onClick={onAdddriverClick}
                                >
                                    Add Drivers
                                </button>
                            </div>
                        </div>

                        {/*Table */}
                        <div className="container mx-auto px-4 py-4 mq750:px-2">
                            <table className="min-w-full border-b-4 border-black">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b text-[25px] font-normal mq750:text-[20px]  mq750:px-2">Name</th>
                                        <th className="px-4 py-2 border-b text-[25px] font-normal  mq1224:hidden  ">Email</th>
                                        <th className="px-4 py-2 border-b text-[25px] font-normal  mq1224:hidden ">Phone Number</th>
                                        <th className="px-4 py-2 border-b text-[25px] font-normal  mq1224:hidden ">License No</th>
                                        <th className="px-4 py-2 border-b text-[25px] font-normal mq750:text-[20px]  mq750:px-2 ">Status</th>
                                        <th className="px-4 py-2 border-b text-[25px] font-normal mq750:text-[20px]  mq750:px-2">Remove</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[15px] font-dm-sans">
                                    {drivers.map((driver, index) => (
                                        <tr key={index}>
                                            <td
                                                className="px-4 py-2 border-b border-white cursor-pointer text-white hover:text-[#7551ff] no-underline mq750:text-[15px]  mq750:px-2 "
                                                onClick={() => viewDriverDetails(driver._id)} >{driver.name}</td>
                                            <td className="px-4 py-2 border-b font-light text-[15px]  mq1224:hidden ">{driver.email}</td>
                                            <td className="px-4 py-2 border-b font-light text-[15px]  mq1224:hidden ">{driver.contactNumber}</td>
                                            <td className="px-4 py-2 border-b font-light text-[15px]  mq1224:hidden  ">{driver.licenseNumber}</td>
                                            <td className="px-4 py-2 border-b font-light text-[15px]  ">
                                            <div
                                                    className={`px-2 py-1 font-light text-[15px] rounded w-max text-center ${driver.status === 'in-trip' ? 'bg-red-700' :
                                                        driver.status === 'available' ? 'bg-green-700' :
                                                            driver.status === 'unavailable' ? 'bg-orange-700' :
                                                                'bg-gray-500'
                                                        } text-white`}
                                                >
                                                    {driver.status}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 border-b">
                                                <button
                                                    type="button" // Ensure button does not submit a form
                                                    onClick={() => deleteDriver(driver._id)}
                                                    className="bg-red-700 font-light text-[15px] text-white  px-2 py-1 rounded w-[80px]  mq750:px-2 cursor-pointer"
                                                >
                                                    Remove
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>


                    </form>

                </div>
            </div>
        </section>
    );
};

export default Driverslist;