import { useCallback } from "react";
import PropTypes from "prop-types";

const Sidebar = ({ className = "" }) => {
    const onDashboardContainerClick = useCallback(() => {
        // Please sync "Main" to the project
    }, []);

    const onCarContainerClick = useCallback(() => {
        // Please sync "Car" to the project
    }, []);

    const onIncomeContainerClick = useCallback(() => {
        // Please sync "Income" to the project
    }, []);

    const onPakagesContainerClick = useCallback(() => {
        // Please sync "Pakages" to the project
    }, []);

    const onHelpContainerClick = useCallback(() => {
        // Please sync "Billing" to the project
    }, []);

    return (
        <div
            className={`w-[308px] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-tl-none rounded-tr-20xl rounded-b-20xl bg-darkslateblue flex flex-col items-end justify-start pt-[36.4px] pb-7 pr-[30px] pl-7 box-border gap-[22.6px] text-left text-sm text-whitesmoke-400 font-poppins mq975:hidden mq975:pt-6 mq975:pb-5 mq975:box-border mq450:pt-5 mq450:box-border ${className}`}
        >
            <div className="w-[308px] h-[909px] relative shadow-[4px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-tl-none rounded-tr-20xl rounded-b-20xl bg-darkslateblue hidden" />
            <div className="self-stretch flex flex-row items-start justify-end pt-0 pb-[5.3px] pr-2 pl-[11px]">
                <div
                    className="flex-1 flex flex-row items-start justify-start gap-[14px] cursor-pointer z-[1]"
                    onClick={onDashboardContainerClick}
                >
                    <img
                        className="h-[21.3px] w-6 relative overflow-hidden shrink-0 min-h-[21px]"
                        loading="lazy"
                        alt=""
                        src="/icon--24--outline--keysquare.svg"
                    />
                    <div className="flex-1 flex flex-col items-start justify-start py-0 pr-5 pl-0">
                        <a className="[text-decoration:none] relative tracking-[-0.01em] leading-[18.6px] font-medium text-[inherit] inline-block min-w-[78px]">
                            Dashboard
                        </a>
                    </div>
                    <div className="flex flex-col items-start justify-start pt-[3.6px] px-0 pb-0">
                        <img
                            className="w-4 h-[14.2px] relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                            src="/chevronright-2.svg"
                        />
                    </div>
                </div>
            </div>
            <div className="self-stretch rounded-lg bg-blueviolet-200 flex flex-row items-start justify-between pt-[9.4px] pb-[10.1px] pr-[9px] pl-2.5 gap-[20px] z-[1]">
                <div className="h-[40.8px] w-[250px] relative rounded-lg bg-blueviolet-200 hidden" />
                <div className="w-[117px] flex flex-row items-start justify-start gap-[15px]">
                    <div className="h-[21.3px] w-6 relative">
                        <img
                            className="absolute top-[0px] left-[0px] w-full h-full overflow-hidden z-[2]"
                            alt=""
                            src="/usersquare-1.svg"
                        />
                        <img
                            className="absolute top-[2px] left-[2px] w-5 h-[17.4px] z-[3]"
                            loading="lazy"
                            alt=""
                            src="/vector.svg"
                        />
                    </div>
                    <div className="flex-1 relative tracking-[-0.01em] font-medium z-[2]">
                        Drivers
                    </div>
                </div>
                <div className="flex flex-col items-start justify-start pt-0.5 px-0 pb-0">
                    <img
                        className="w-4 h-[14.2px] relative overflow-hidden shrink-0 z-[2]"
                        loading="lazy"
                        alt=""
                        src="/chevronright-2-1.svg"
                    />
                </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-end pt-0 pb-[15.3px] pr-[9px] pl-3">
                <div
                    className="flex-1 flex flex-row items-start justify-between gap-[20px] cursor-pointer z-[1]"
                    onClick={onCarContainerClick}
                >
                    <div className="w-[84px] flex flex-row items-start justify-start gap-[16px]">
                        <img
                            className="h-5 w-5 relative overflow-hidden shrink-0 min-h-[20px]"
                            loading="lazy"
                            alt=""
                            src="/car02.svg"
                        />
                        <div className="flex-1 relative tracking-[-0.01em] font-medium">
                            Cars
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-start pt-[2.6px] px-0 pb-0">
                        <img
                            className="w-4 h-[14.2px] relative overflow-hidden shrink-0"
                            loading="lazy"
                            alt=""
                            src="/chevronright-2-2.svg"
                        />
                    </div>
                </div>
            </div>
            <div className="self-stretch flex flex-row items-start justify-end pt-0 pb-[479.3px] pr-2 pl-[11px] mq725:pb-[312px] mq725:box-border">
                <div className="flex-1 flex flex-col items-start justify-start gap-[35.5px]">
                    <div
                        className="self-stretch flex flex-row items-start justify-between gap-[20px] cursor-pointer z-[1]"
                        onClick={onIncomeContainerClick}
                    >
                        <div className="flex flex-row items-start justify-start gap-[14px]">
                            <img
                                className="h-[21.3px] w-6 relative overflow-hidden shrink-0 min-h-[21px]"
                                loading="lazy"
                                alt=""
                                src="/walletmoney-2.svg"
                            />
                            <div className="flex flex-col items-start justify-start pt-[1.7px] px-0 pb-0">
                                <a className="[text-decoration:none] relative tracking-[-0.01em] leading-[18.6px] font-medium text-[inherit] inline-block min-w-[53px]">
                                    Income
                                </a>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[3.5px] px-0 pb-0">
                            <img
                                className="w-4 h-[14.2px] relative overflow-hidden shrink-0"
                                loading="lazy"
                                alt=""
                                src="/chevronright-2-3.svg"
                            />
                        </div>
                    </div>
                    <div
                        className="self-stretch flex flex-row items-start justify-between gap-[20px] cursor-pointer z-[1]"
                        onClick={onPakagesContainerClick}
                    >
                        <div className="flex flex-row items-start justify-start gap-[14px]">
                            <img
                                className="h-[21.3px] w-6 relative overflow-hidden shrink-0 min-h-[21px]"
                                loading="lazy"
                                alt=""
                                src="/discountshape-1.svg"
                            />
                            <div className="flex flex-col items-start justify-start pt-[1.3px] px-0 pb-0">
                                <div className="relative tracking-[-0.01em] font-medium inline-block min-w-[61px]">
                                    Pakages
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[3.5px] px-0 pb-0">
                            <img
                                className="w-4 h-[14.2px] relative overflow-hidden shrink-0"
                                loading="lazy"
                                alt=""
                                src="/chevronright-2-4.svg"
                            />
                        </div>
                    </div>
                    <div
                        className="self-stretch flex flex-row items-start justify-between gap-[20px] cursor-pointer z-[1]"
                        onClick={onHelpContainerClick}
                    >
                        <div className="w-[99px] flex flex-row items-start justify-start gap-[14px]">
                            <img
                                className="h-[21.3px] w-6 relative overflow-hidden shrink-0 min-h-[21px]"
                                loading="lazy"
                                alt=""
                                src="/messagequestion-1.svg"
                            />
                            <div className="flex-1 flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0">
                                <div className="self-stretch relative tracking-[-0.01em] font-medium">
                                    Invoice
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-start justify-start pt-[3.5px] px-0 pb-0">
                            <img
                                className="w-4 h-[14.2px] relative overflow-hidden shrink-0"
                                loading="lazy"
                                alt=""
                                src="/chevronright-2-5.svg"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row items-start justify-end py-0 px-3.5">
                <div className="flex flex-row items-start justify-start gap-[12px]">
                    <div className="h-[37.3px] w-[42px] relative rounded-[50%] bg-gainsboro z-[1]" />
                    <div className="flex flex-col items-start justify-start pt-[1.3px] pb-0 pr-6 pl-0">
                        <div className="flex flex-col items-start justify-start">
                            <div className="h-[18.2px] flex flex-row items-start justify-start pt-0 px-0 pb-0 box-border">
                                <div className="mb-[-0.8px] relative tracking-[0.01em] font-medium inline-block min-w-[48px] shrink-0 z-[1]">
                                    Admin
                                </div>
                            </div>
                            <div className="relative text-xs tracking-[0.01em] inline-block min-w-[101px] shrink-0 z-[1]">
                                Project Manager
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-start justify-start pt-[14.3px] px-0 pb-0">
                        <img
                            className="w-3 h-[5.3px] relative z-[1]"
                            alt=""
                            src="/arrow.svg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    className: PropTypes.string,
};

export default Sidebar;
