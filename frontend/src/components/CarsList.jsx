import { useNavigate } from "react-router-dom";
import StatHeaders from "./StatHeaders";
import React, { useEffect, useState } from 'react';
import axios from "axios";

const Carslist = () => {
    const navigate = useNavigate();

    const onAddCarClick = () => {
        navigate('/addcar');
    };

    // Stats of cars
    const [stats, setStats] = useState({
        inTripCars: 0,
        availableCars: 0,
        inServiceCars: 0, 
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cars/stats' , {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in headers
                    },
                });
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching car statistics', error);
            }
        };

        fetchStats();
    }, []);

    // Cars list
    const [cars, setCars] = useState([]);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/cars', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in headers
                    },
                });
                setCars(response.data);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);

    // Delete car
    const deleteCar = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this car?');
        if (!confirmDelete) return;

        try {
            await axios.delete(`http://localhost:5000/api/cars/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setCars(cars.filter(car => car._id !== id));
            const response = await axios.get('http://localhost:5000/api/cars/stats', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setStats(response.data);
        } catch (error) {
            console.error('Error deleting car:', error);
        }
    };

    const viewCarDetails = (id) => {
        navigate(`/cardetails/${id}`);
    };

    return (
        <section className="flex-1 flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border max-w-[calc(100%_-_371px)] text-left text-xs text-whitesmoke-400 font-poppins mq1224:h-[100vh]">
            <div className="self-stretch flex flex-col items-end justify-start gap-[30px] max-w-full">

                {/* Top 3 piece */}
                <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-darkslateblue flex flex-row items-start justify-evenly pt-[31px] pb-[33px] pr-[65px] pl-[52px] box-border max-w-full gap-[20px] rounded-3xl w-[1400px] mq1224:hidden">
                    <StatHeaders
                        Condition="In Trip"
                        statNumbers={stats.inTripCars?.toLocaleString() || "Loading..."}
                        circleColor="bg-red-700"
                    />
                    <div className="h-[88px] w-px relative bg-darkslateblue box-border z-[2] border-r-[1px] border-solid border-whitesmoke-200" />
                    <StatHeaders
                        Condition="Available"
                        statNumbers={stats.availableCars.toLocaleString() || "Loading..."}
                        circleColor="bg-green-700"
                    />
                    <div className="h-[88px] w-px relative bg-darkslateblue box-border z-[2] border-r-[1px] border-solid border-whitesmoke-200" />
                    <StatHeaders
                        Condition="Service"
                        statNumbers={stats.inServiceCars?.toLocaleString() || "Loading..."}
                        circleColor="bg-orange-700"
                    />
                </div>

                {/* Bottom card */}
                <div className="self-stretch shadow-[0px_4px_4px_rgba(0,_0,_0,_0.25)] bg-darkslateblue flex flex-row items-start justify-evenly pt-[31px] pb-[33px] pr-[65px] pl-[52px] box-border max-w-full gap-[20px] rounded-3xl min-w-min h-[560px] mq750:justify-center mq750:gap[3px] mq750:box-border mq750:px-15 mq750:mt-10">

                    <form className="m-0 self-stretch h-[615.3px] flex flex-col items-start justify-start pt-0 px-0 gap-[9.5px] max-w-full mq450:pb-[106px] mq450:box-border">

                        {/* All & ADD Cars */}
                        <div className="flex justify-between min-w-full mq750:gap-[20px]">
                            <div className="left-div font-semibold text-[35px] md:text-[30px] ml-4 md:ml-6 mq750:text-[20px]">
                                All Cars
                            </div>
                            <div className="right-div">
                                <button
                                    className="bg-[#5932EA] text-white font-bold text-[20px] md:text-[20px] px-2 py-1 rounded-lg w-full md:w-[190px] h-[40px] mix-blend-normal mq750:text-[15px] cursor-pointer"
                                    onClick={onAddCarClick}
                                >
                                    Add Car
                                </button>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="container mx-auto px-4 py-4 mq750:px-2">
                            <table className="min-w-full border-b-4 border-black">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-2 border-b text-[25px] font-normal mq750:text-[20px]">Car</th>
                                        <th className="px-4 py-2 border-b text-[25px] font-normal mq750:hidden">Car No</th>
                                        {/* <th className="px-4 py-2 border-b text-[25px] font-normal mq750:hidden">Fuel</th>
                                        <th className="px-4 py-2 border-b text-[25px] font-normal mq750:hidden">Price/Day</th> */}
                                        {/* <th className="px-4 py-2 border-b text-[25px] font-normal mq750:hidden">Transmission</th> */}
                                        <th className="px-4 py-2 border-b text-[25px] font-normal mq750:text-[20px]">Status</th>
                                        <th className="px-4 py-2 border-b text-[25px] font-normal mq750:text-[20px]">Remove</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {cars.map(car => (
                                        <tr key={car._id}>
                                            <td className="px-4 py-2 border-b text-white cursor-pointer hover:text-[#7551ff] no-underline mq750:px-2 mq750:py-2 mq750:text-[15px]  " onClick={() => viewCarDetails(car._id)}>{car.make}</td>
                                            <td className="px-4 py-2 border-b font-light text-[15px] mq750:hidden ">{car.registrationNumber}</td>
                                            {/* <td className="px-4 py-2 border-b font-light text-[15px] mq750:hidden">{car.fuelType}</td>
                                            <td className="px-4 py-2 border-b font-light text-[15px] mq750:hidden">{car.pricePerDay}</td> */}
                                            {/* <td className="px-4 py-2 border-b font-light text-[15px] mq750:hidden">{car.model}</td> */}
                                            <td className="px-4 py-2 border-b font-light text-[15px] mq750:px-2 mq750:py-2 mq750:text-[15px]  ">
                                                <div
                                                    className={`px-2 py-1 font-light text-[15px] rounded w-max text-center ${car.status === 'in-trip' ? 'bg-red-700' :
                                                        car.status === 'available' ? 'bg-green-700' :
                                                            car.status === 'unavailable' ? 'bg-orange-700' :
                                                                'bg-gray-500'
                                                        } text-white`}
                                                >
                                                    {car.status}
                                                </div>
                                            </td>
                                            <td className="px-4 py-2 border-b">
                                                <button
                                                    type="button"
                                                    onClick={() => deleteCar(car._id)}
                                                    className="bg-red-700 text-white px-4 py-2 rounded font-light text-[15px] mq750:px-2 mq750:py-2 mq750:text-[15px] cursor-pointer "
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

export default Carslist;
