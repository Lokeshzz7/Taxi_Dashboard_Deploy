import { useCallback } from "react";
import ContainerChartForm from "./components/ContainerChartForm.jsx";
import PieChart from "./components/PieChart.jsx";
import Earnings from "./components/Earnings.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Weekly from "./components/Weekly.jsx";
import TripsList from "./components/TripsList.jsx";

const Trip = () => {

    return (
        <div className="w-full relative bg-gray-100 overflow-hidden flex flex-col items-end justify-start pt-[22px] pb-7 pr-[47px] pl-0 box-border gap-[6px] leading-[normal] tracking-[normal] mq750:pr-[23px] mq750:box-border text-white">
            <Header />
            <main className="self-stretch flex flex-row items-start justify-start gap-[63px] max-w-full mq975:pl-5 mq975:pr-5 mq975:box-border mq450:gap-[16px] mq750:gap-[31px]">
                <Sidebar />
                <TripsList />
            </main>
        </div>
    );
};

export default Trip;
