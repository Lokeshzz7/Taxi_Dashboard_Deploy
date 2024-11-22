import { useCallback } from "react";
import ContainerChartForm from "./components/ContainerChartForm.jsx";
import PieChart from "./components/PieChart.jsx";
import Earnings from "./components/Earnings.jsx";
import Sidebar from "./components/Sidebar.jsx";
import Header from "./components/Header.jsx";
import Weekly from "./components/Weekly.jsx";
import AddTripForm from "./components/AddFormTrip.jsx";

const AddTrip = () => {

    return (
        <div className="w-full bg-gray-100 overflow-hidden flex flex-col items-end justify-start pt-[22px] pb-8 pr-[46px] pl-0 box-border gap-[6px] leading-[normal] tracking-[normal] mq725:pr-[23px] mq725:box-border">
            <Header />
            <main className="w-full flex flex-row items-start justify-start gap-[32px]  mq1000:pl-5 mq1000:pr-5 mq1000:box-border mq725:gap-[16px] mq750:mb-10">
                <Sidebar />
                <AddTripForm />
            </main>
        </div>
    );
};

export default AddTrip;
