import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts';
import axios from 'axios';

const LineChart = () => {
    const [monthlyData, setMonthlyData] = useState([]);

    useEffect(() => {
        // Fetch data from the backend API
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/incomes/monthly-summary'); // Update the path if needed
                console.log("API Response Data:", response.data);
                setMonthlyData(response.data);
            } catch (error) {
                console.error("Error fetching monthly data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (monthlyData.length === 0) {
            console.log("No data available to render the chart.");
            return;
        }

        console.log("Monthly Data for Chart:", monthlyData);

        const chartDom = document.getElementById('main');
        const myChart = echarts.init(chartDom, 'dark');

        const months = monthlyData.map(item => `${item._id.month}-${item._id.year}`);
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
                data: months
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
    }, [monthlyData]);

    return <div id="main" className='w-full h-[400px] max-w-full mq750:h-[300px] mq675:h-[250px] mq450:h-[200px]'></div>;
};

export default LineChart;
