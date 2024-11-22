import PropTypes from "prop-types";

const PieChart = ({ className = "" }) => {
    return (
        <div
            className={`absolute top-[640px] left-[1052px] rounded-xl bg-darkslateblue-200 w-[357px] h-[345px] overflow-hidden text-left text-xs text-lightsteelblue font-dm-sans ${className}`}
        >
            <div className="absolute top-[27px] right-[24px] w-[66px] h-[21px]">
                <b className="absolute top-[0px] right-[3px] tracking-[-0.02em] leading-[20px] inline-block w-[63px] h-[21px]">
                    Weekly
                </b>
                <img
                    className="absolute top-[1px] right-[0px] w-[19px] h-[19px] overflow-hidden object-contain"
                    alt=""
                    src="/arrow-drop-up1@2x.png"
                />
            </div>
            <div className="absolute top-[23px] left-[28px] w-[121px] h-[22px] text-base text-white">
                <b className="absolute top-[0px] left-[0px] tracking-[-0.02em] leading-[28px] inline-block w-[121px] h-[22px]">
                    Your Pie Chart
                </b>
            </div>
            <img
                className="absolute top-[calc(50%_-_102.5px)] left-[calc(50%_-_71.5px)] w-[143px] h-[143px]"
                alt=""
                src="/chart.svg"
            />
            <div className="absolute w-[calc(100%_-_64px)] right-[32px] bottom-[36px] left-[32px] h-[75px]">
                <div className="absolute w-full right-[0px] bottom-[0px] left-[0px] rounded-mini bg-darkslateblue-100 h-[75px] overflow-hidden">
                    <div className="absolute bottom-[22px] left-[19px] w-16 h-[31px]">
                        <div className="absolute bottom-[21px] left-[13px] tracking-[-0.02em] leading-[20px] font-medium flex items-center w-[51px] h-2.5">
                            Earnings
                        </div>
                        <b className="absolute bottom-[0px] left-[13px] text-lg tracking-[-0.02em] leading-[30px] flex text-white items-center w-[41px] h-4">
                            63%
                        </b>
                        <div className="absolute bottom-[22px] left-[0px] rounded-[50%] bg-blueviolet-100 w-2 h-2" />
                    </div>
                    <div className="absolute top-[13.5px] left-[98.5px] box-border w-px h-12 border-r-[1px] border-solid border-gray-200" />
                    <div className="absolute top-[13.5px] left-[196.5px] box-border w-px h-12 border-r-[1px] border-solid border-gray-200" />
                    <div className="absolute bottom-[22px] left-[118px] w-16 h-[31px]">
                        <div className="absolute bottom-[21px] left-[13px] tracking-[-0.02em] leading-[20px] font-medium flex items-center w-[51px] h-2.5">
                            Income
                        </div>
                        <b className="absolute bottom-[0px] left-[13px] text-lg tracking-[-0.02em] leading-[30px] flex text-white items-center w-[41px] h-4">
                            25%
                        </b>
                        <div className="absolute bottom-[22px] left-[0px] rounded-[50%] bg-blueviolet-100 w-2 h-2" />
                    </div>
                    <div className="absolute right-[15px] bottom-[22px] w-16 h-[31px]">
                        <div className="absolute right-[0px] bottom-[21px] tracking-[-0.02em] leading-[20px] font-medium flex items-center w-[51px] h-2.5">
                            Spends
                        </div>
                        <b className="absolute right-[10px] bottom-[0px] text-lg tracking-[-0.02em] leading-[30px] flex text-white items-center w-[41px] h-4">
                            12%
                        </b>
                        <div className="absolute right-[56px] bottom-[22px] rounded-[50%] bg-deepskyblue w-2 h-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

PieChart.propTypes = {
    className: PropTypes.string,
};

export default PieChart;
