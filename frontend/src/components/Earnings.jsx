import { useMemo } from "react";
import PropTypes from "prop-types";

const Earnings = ({ className = "", label, cash, icon, propTop }) => {
    const earningsStyle = useMemo(() => {
        return {
            top: propTop,
        };
    }, [propTop]);

    return (
        <div
            className={`absolute top-[241px] left-[1052px] rounded-xl bg-darkslateblue-200 w-[354px] h-[97px] overflow-hidden text-left text-sm text-lightsteelblue font-dm-sans ${className}`}
            style={earningsStyle}
        >
            <div className="absolute top-[20px] left-[91.21px] w-36 h-[54px]">
                <div className="absolute top-[0px] left-[0px] tracking-[-0.02em] leading-[24px] font-medium inline-block w-[117px] h-[22.6px]">
                    {label}
                </div>
                <b className="absolute top-[23px] left-[0px] text-5xl tracking-[-0.02em] leading-[32px] inline-block text-white w-36 h-[31px]">
                    {cash}
                </b>
            </div>
            <img
                className="absolute top-[20px] left-[17px] w-14 h-14"
                alt=""
                src={icon}
            />
        </div>
    );
};

Earnings.propTypes = {
    className: PropTypes.string,
    label: PropTypes.string,
    cash: PropTypes.string,
    icon: PropTypes.string,

    /** Style props */
    propTop: PropTypes.any,
};

export default Earnings;
