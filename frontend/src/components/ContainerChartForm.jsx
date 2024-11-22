import PropTypes from "prop-types";

const ContainerChartForm = ({ className = "" }) => {
    return (
        <div
            className={`w-[776px] relative rounded-xl bg-darkslateblue-200 h-[345px] overflow-hidden shrink-0 text-left text-xs text-white font-dm-sans ${className}`}
        >
            <img
                className="absolute w-[65.55%] right-[6.81%] bottom-[136px] left-[27.64%] max-w-full overflow-hidden h-[69px]"
                alt=""
                src="/vector-13.svg"
            />
            <img
                className="absolute w-[65.55%] right-[6.81%] bottom-[88px] left-[27.64%] max-w-full overflow-hidden h-[59px]"
                alt=""
                src="/vector-14.svg"
            />
            <div className="absolute w-[7.6%] right-[39.62%] bottom-[185px] left-[52.78%] h-[50px] text-center text-2xs">
                <div className="absolute w-[23.73%] right-[39.41%] bottom-[0px] left-[36.86%] rounded-[50%] bg-blueviolet-100 h-4" />
                <div className="absolute w-[14.75%] right-[43.94%] bottom-[3px] left-[41.31%] rounded-[50%] bg-white h-2.5" />
                <div className="absolute w-full right-[0%] bottom-[21px] left-[0%] h-[29px]">
                    <div className="absolute h-[117.24%] w-full top-[-17.24%] right-[0%] bottom-[0%] left-[0%]">
                        <img
                            className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] max-w-full overflow-hidden max-h-full"
                            alt=""
                            src="/rectangle-19.svg"
                        />
                        <b className="absolute top-[calc(50%_-_8.79px)] left-[calc(50%_-_20.5px)] tracking-[-0.02em] leading-[100%] inline-block w-[42px] h-[12.9px]">
                            $108.00
                        </b>
                    </div>
                </div>
            </div>
            <div className="absolute w-[88.2%] right-[-13.33%] bottom-[27px] left-[25.14%] h-[22px] text-center text-lightsteelblue">
                <div className="absolute h-full w-[7.88%] top-[0%] left-[0%] tracking-[-0.02em] leading-[20px] font-medium inline-block">
                    SEP
                </div>
                <div className="absolute h-full w-[7.88%] top-[0%] left-[14.33%] tracking-[-0.02em] leading-[20px] font-medium inline-block">
                    OCT
                </div>
                <div className="absolute h-full w-[7.88%] top-[0%] left-[28.66%] tracking-[-0.02em] leading-[20px] font-medium inline-block">
                    NOV
                </div>
                <div className="absolute h-full w-[7.88%] top-[0%] left-[42.99%] tracking-[-0.02em] leading-[20px] font-medium inline-block">
                    DEC
                </div>
                <div className="absolute h-full w-[7.88%] top-[0%] left-[57.32%] tracking-[-0.02em] leading-[20px] font-medium inline-block">
                    JAN
                </div>
                <div className="absolute h-full w-[7.88%] top-[0%] left-[71.65%] tracking-[-0.02em] leading-[20px] font-medium inline-block">
                    FEB
                </div>
            </div>
            <img
                className="absolute top-[28px] right-[32px] rounded-3xs w-[33px] h-[33px] overflow-hidden"
                alt=""
                src="/button.svg"
            />
            <div className="absolute top-[127.89px] left-[31.3px] text-sm tracking-[-0.02em] leading-[24px] font-medium text-lightsteelblue inline-block w-[127.5px] h-[21.9px]">
                Total Spent
            </div>
            <b className="absolute top-[91px] left-[31.3px] text-15xl tracking-[-0.02em] leading-[42px] flex items-center w-[149.8px] h-[39.9px]">
                $37.5K
            </b>
            <div className="absolute top-[130.88px] left-[114px] w-[67.1px] h-[19.9px] text-center text-mediumseagreen">
                <b className="absolute top-[0px] left-[20.12px] tracking-[-0.02em] leading-[20px] inline-block w-[47px] h-[19.9px]">
                    +2.45%
                </b>
                <img
                    className="absolute top-[1px] left-[0px] w-[20.1px] h-[17.9px] overflow-hidden"
                    alt=""
                    src="/arrow-drop-up.svg"
                />
            </div>
            <div className="absolute top-[174.76px] left-[31.3px] w-[100.6px] h-4 text-base text-mediumseagreen">
                <b className="absolute top-[1px] left-[22.36px] tracking-[-0.02em] leading-[28px] flex items-center w-[78.3px] h-3.5">
                    On track
                </b>
                <img
                    className="absolute top-[0px] left-[0px] rounded-27xl w-4 h-4 overflow-hidden"
                    alt=""
                    src="/frame-5.svg"
                />
            </div>
            <div className="absolute top-[213.76px] left-[31.3px] w-[100.6px] h-4 text-base text-red-100">
                <b className="absolute top-[1px] left-[22.36px] tracking-[-0.02em] leading-[28px] flex items-center w-[78.3px] h-3.5">
                    Off track
                </b>
                <img
                    className="absolute top-[0px] left-[0px] rounded-27xl w-4 h-4 overflow-hidden"
                    alt=""
                    src="/frame-51.svg"
                />
            </div>
            <div className="absolute top-[26px] left-[31px] rounded-6xs bg-darkslateblue-100 w-[123px] h-[37px] overflow-hidden text-sm">
                <img
                    className="absolute top-[10px] left-[8px] w-[18px] h-[18px] overflow-hidden"
                    alt=""
                    src="/calendar-today.svg"
                />
                <div className="absolute top-[12px] left-[32px] tracking-[-0.02em] leading-[24px] font-medium flex items-center w-[74px] h-3.5">
                    This month
                </div>
                <img
                    className="absolute top-[12.72px] left-[105.93px] w-[14.1px] h-4 overflow-hidden object-contain"
                    alt=""
                    src="/chevronright-2@2x.png"
                />
            </div>
            <div className="absolute top-[270px] left-[29px] rounded-[50%] bg-gainsboro w-[5px] h-[5px]" />
        </div>
    );
};

ContainerChartForm.propTypes = {
    className: PropTypes.string,
};

export default ContainerChartForm;
