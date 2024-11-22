import { useCallback } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar.jsx";
import AddExpenseForm from "./components/AddExpenseForm.jsx";
import Header from "./components/Header.jsx";

const AddExpense = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const incomeId = queryParams.get("incomeId");


    return (
        <div className="w-full bg-gray-100 overflow-hidden flex flex-col items-end justify-start pt-[22px] pb-8 pr-[46px] pl-0 box-border gap-[6px] leading-[normal] tracking-[normal] mq725:pr-[23px] mq725:box-border">
            <Header />
            <main className="w-full flex flex-row items-start justify-start gap-[32px]  mq1000:pl-5 mq1000:pr-5 mq1000:box-border mq725:gap-[16px]">
                <Sidebar />
                <AddExpenseForm incomeId={incomeId} />
            </main>
        </div>
    );
};

export default AddExpense;
