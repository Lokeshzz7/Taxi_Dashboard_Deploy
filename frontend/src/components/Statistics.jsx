import MetricItem from "./MetricItem.jsx";
import PropTypes from "prop-types";
import axios from "axios";
import React, { useState, useEffect } from 'react';
import trip from '../data/trip.json';
import LineChart from "../charts/LineChart.jsx";
import { BASE_URL } from "../config";

const Statistics = () => {
    const [tableData, setTableData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpenses, setTotalExpenses] = useState(0);
    const [trips, setTrips] = useState([]);

    useEffect(() => {
        const fetchIncomeExpenses = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/incomes/admin/total-income-expenses`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token in headers
                    },
                }); // Adjust the URL if needed
                const data = response.data;
                setTotalIncome(data.totalIncome);
                setTotalExpenses(data.totalExpenses);
            } catch (error) {
                console.error("Error fetching income and expenses:", error);
            }
        };

        fetchIncomeExpenses();
    }, []);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/trips/${localStorage.getItem("userRole")}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                setTrips(response.data);
            } catch (error) {
                console.error("Error fetching trips:", error);
            }
        };

        fetchTrips();
    }, []);

    // Count the total number of trips
    const totalTrips = trips.length; // Total trips created
    const completedTrips = (trips.filter(trip => trip.status === 'completed')).length;


    useEffect(() => {
        // Set the table data from JSON file
        setTableData(trip);
    }, []);
    return (


        <section className="flex-1 flex flex-col items-start justify-start pt-[29px] px-0 pb-0 box-border max-w-[calc(100%_-_340px)] text-left text-5xl text-whitesmoke font-inter-heading-h5-24-semi-bold mq1224:max-w-full">
            <div className="w-full flex flex-col items-start justify-start gap-[43px] max-w-full mq750:gap-[18px] lg:gap-[36px]">


                {/* Statics */}
                <div className="flex-1 shadow-[0px_4px_3px_rgba(0,_0,_0,_0.25)] rounded-lg bg-darkslateblue flex flex-col items-start justify-start p-6 box-border max-w-full mq750:pl-5 mq750:pt-5 mq750:pb-5 mq750:ml-10 mq750:box-border gap-[60px]">
                    {/* Header && Filter */}
                    <div className="self-stretch flex flex-row flex-wrap items-center justify-start gap-[12px]">

                        <h2 className="m-0 flex-1 relative text-white leading-[32px] font-semibold text-[35px] inline-block min-w-[86px] mq450:text-lgi mq450:leading-[26px]">
                            Statistics
                        </h2>


                        <div className="rounded-md flex flex-row items-center justify-start py-2.5 px-[15px] gap-[8px] text-sm border-[1px] border-solid border-neutral-50 mq1224:hidden">
                            <img
                                className="h-6 w-6 relative overflow-hidden shrink-0 hidden min-h-[24px]"
                                alt=""
                                src="/calendar.svg"
                            />
                            <div className="relative leading-[20px] font-normal text-[20px] inline-block min-w-[74px] text-white">
                                Pass 7 Day
                            </div>
                            <img
                                className="h-6 w-6 relative overflow-hidden shrink-0"
                                alt=""
                                src="/chevrondown.svg"
                            />
                        </div>
                    </div>

                    {/* Box */}
                    <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[30px] h-auto">
                        <MetricItem heading="Customers" number={totalTrips} />
                        <MetricItem heading="Completed Trips" number={completedTrips} propBorder="1px solid #111c44" />
                        <MetricItem
                            heading="Income"
                            number={`₹ ${totalIncome}`} // Dynamic total income
                            propBorder="1px solid #0c1436"
                        />

                        <MetricItem
                            heading="Expenses"
                            number={`₹ ${totalExpenses}`} // Dynamic total expenses
                            propBorder="1px solid #0c1436"
                        />
                    </div>
                </div>



                {/* Table */}
                <LineChart />
            </div>
        </section>
    );
};
export default Statistics;