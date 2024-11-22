import { useMemo } from "react";
import PropTypes from "prop-types";

const StatHeaders = ({
    className = "",

    Condition,
    statNumbers,
    propWidth,
    circleColor = "bg-red-500",
}) => {
    const statHeadersStyle = useMemo(() => {
        return {
            width: propWidth,
        };
    }, [propWidth]);

    return (

        <div className="self-stretch flex flex-row items-start justify-start gap-[30.4px] text-white">

            <div class="flex items-center space-x-6">
                
                <div class={`w-[90px] h-[90px] rounded-full ${circleColor}`}></div>
                
                <div class="flex flex-col">
                    <div className="font-dm-sans font-bold text-[35px]">{Condition}</div>
                    <div className="font-dm-sans font-bold text-[35px]">{statNumbers}</div>
                </div>
            </div>
        </div>

    );
};

StatHeaders.propTypes = {
    className: PropTypes.string,
    group10: PropTypes.string,
    totalDrivers: PropTypes.string,
    statNumbers: PropTypes.string,

    /** Style props */
    propWidth: PropTypes.any,
};

export default StatHeaders;
