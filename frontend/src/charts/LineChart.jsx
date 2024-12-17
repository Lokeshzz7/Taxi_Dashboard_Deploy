import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';
import { BASE_URL } from '../Config.js';


const LineChart = ({ period }) => {
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend API
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/incomes/${localStorage.getItem("userRole")}/${period}-summary`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                console.log(`${period} data fetched:`, response.data);
                setMonthlyData(response.data);
            } catch (error) {
                console.error(`Error fetching ${period} data:`, error);
            }
        };

        fetchData();
    }, [period]);

    useEffect(() => {
        if (monthlyData.length === 0) {
            console.log("No data available to render the chart.");
            return;
        }

        console.log("Monthly Data for Chart:", monthlyData);

        const labels = monthlyData.map(item => {
            if (period === 'weekly') {
                return `${item._id.day}-${item._id.month}-${item._id.year}`;
            } else {
                return `${item._id.month}-${item._id.year}`;
            }
        });

        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom, 'dark');

        const incomeData = monthlyData.map(item => item.totalIncome);
        const expenseData = monthlyData.map(item => item.totalExpense);
        const grossProfitData = monthlyData.map(item => item.grossProfit);
        const netProfitData = monthlyData.map(item => item.netProfit);

        const option = {
            legend: {
                data: ['Income', 'Expense', 'Gross Profit', 'Net Profit']
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                data: labels
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'Income',
                    type: 'line',
                    smooth: true,
                    data: incomeData
                },
                {
                    name: 'Expense',
                    type: 'line',
                    smooth: true,
                    data: expenseData
                },
                {
                    name: 'Gross Profit',
                    type: 'line',
                    smooth: true,
                    data: grossProfitData
                },
                {
                    name: 'Net Profit',
                    type: 'line',
                    smooth: true,
                    data: netProfitData
                }
            ]
        };

        // Set the chart option with data
        myChart.setOption(option);

        return () => {
            myChart.dispose();
        };
    }, [monthlyData,period]);

    return <div id="main" className='w-full h-[400px] max-w-full mq750:h-[300px] mq675:h-[250px] mq450:h-[200px]'></div>;
};

export default LineChart;
