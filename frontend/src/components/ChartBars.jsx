import { useMemo } from "react";
import PropTypes from "prop-types";

const ChartBars = ({ className = "", group10, onTrip, prop, propWidth }) => {
    const chartBarsStyle = useMemo(() => {
        return {
            width: propWidth,
        };
    }, [propWidth]);

    return (
        <div
            className={`w-[229.9px] flex flex-col items-start justify-start pt-px pb-0 pr-[19px] pl-0 box-border text-left text-sm text-whitesmoke-400 font-poppins ${className}`}
            style={chartBarsStyle}
        >
            <div className="self-stretch flex flex-row items-start justify-start gap-[30.4px] text-white">
                <img
                    className="h-[84px] w-[88.2px] relative shrink-0 z-[2]"
                    loading="lazy"
                    alt=""
                    src={group10}
                />
                <div className="flex-1 flex flex-col items-start justify-start pt-[11px] px-0 pb-0 text-white">
                    <div className="self-stretch flex flex-col items-start justify-start gap-[4px] shrink-0 text-white">
                        <div className="w-[89.2px] relative tracking-[-0.01em] inline-block z-[2]">
                            {onTrip}
                        </div>
                        <div className="relative text-13xl tracking-[-0.01em] leading-[100%] font-semibold inline-block min-w-[91.3px] z-[2] mq975:text-7xl mq975:leading-[26px] mq450:text-lgi mq450:leading-[19px] text-white">
                            {prop}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

ChartBars.propTypes = {
    className: PropTypes.string,
    group10: PropTypes.string,
    onTrip: PropTypes.string,
    prop: PropTypes.string,

    /** Style props */
    propWidth: PropTypes.any,
};

export default ChartBars;
