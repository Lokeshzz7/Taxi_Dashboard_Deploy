import React from 'react';
import RideCard from './components/RideCard.jsx';
import IncomeList from './components/IncomeList.jsx'
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";



const rideData = [
    { customerName: 'name', driverName: 'name', amount: 'name', carName: 'name' },
    { customerName: 'name', driverName: 'name', amount: 'name', carName: 'name' },
    { customerName: 'name', driverName: 'name', amount: 'name', carName: 'name' },
    { customerName: 'name', driverName: 'name', amount: 'name', carName: 'name' }
];

function invoice() {
    return (
        <div className="w-full relative bg-gray-100 overflow-hidden flex flex-col items-end justify-start pt-[22px] pb-7 pr-[47px] pl-0 box-border gap-[6px] leading-[normal] tracking-[normal] mq725:pr-[23px] mq725:box-border text-white mq750:pr-2">
            <Header />
            <main className="self-stretch flex flex-row items-start justify-start gap-[63px] max-w-full mq975:pl-5 mq975:pr-5 mq975:box-border mq450:gap-[16px] mq725:gap-[31px]">
                <Sidebar />
                <IncomeList />
            </main>
        </div>
    );
}

export default invoice;