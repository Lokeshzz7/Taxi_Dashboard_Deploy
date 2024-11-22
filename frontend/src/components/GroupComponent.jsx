import { useMemo } from "react";
import PropTypes from "prop-types";

const GroupComponent = ({
    className = "",
    toyotoEtios,
    star1,
    prop,
    reviews,
    vuesaxlinearuser,
    passagers,
    frame,
    frame1,
    localGasStation,
    frame2,
    diesel,
    vuesaxlineararrowRight,
    propLeft,
}) => {
    const groupDivStyle = useMemo(() => {
        return {
            left: propLeft,
        };
    }, [propLeft]);

    return (
        <div
            className={`absolute top-[1px] left-[304px] shadow-[0px_12px_24px_rgba(16,_76,_139,_0.16)] w-64 h-[405px] text-left text-base text-whitesmoke font-poppins ${className}`}
            style={groupDivStyle}
        >
            <div className="absolute top-[0px] left-[0px] shadow-[4px_4px_4px_rgba(0,_0,_0,_0.25)] rounded-2xl bg-white w-64 h-[405px]">
                <div className="absolute top-[0px] left-[0px] rounded-t-2xl rounded-b-none bg-darkslateblue w-64 h-[155px]" />
                <div className="absolute top-[155px] left-[0px] bg-darkslateblue w-64 h-[250px]">
                    <div className="absolute top-[0px] left-[24px] w-52 h-[103px]">
                        <div className="absolute top-[0px] left-[0px] w-[132px] h-[39px]">
                            <div className="absolute top-[0px] left-[0px] leading-[17px] font-medium">
                                {toyotoEtios}
                            </div>
                            <div className="absolute top-[23px] left-[0px] flex flex-row items-center justify-start gap-[6px] text-xs">
                                <img
                                    className="w-4 relative rounded-12xs-5 h-4"
                                    alt=""
                                    src={star1}
                                />
                                <div className="relative leading-[17px]">
                                    <span className="font-medium">{prop}</span>
                                    <span>{reviews}</span>
                                </div>
                            </div>
                        </div>
                        <div className="absolute top-[55px] left-[0px] w-52 flex flex-col items-start justify-start gap-[8px] text-xs text-gainsboro-300">
                            <div className="self-stretch flex flex-row items-center justify-start gap-[41px]">
                                <div className="flex flex-row items-center justify-start gap-[4px]">
                                    <img
                                        className="w-5 relative h-5"
                                        alt=""
                                        src={vuesaxlinearuser}
                                    />
                                    <div className="relative leading-[17px]">{passagers}</div>
                                </div>
                                <div className="flex flex-row items-center justify-start gap-[5px]">
                                    <img
                                        className="w-5 relative h-5 overflow-hidden shrink-0"
                                        alt=""
                                        src={frame}
                                    />
                                    <div className="relative leading-[17px]">Auto</div>
                                </div>
                            </div>
                            <div className="self-stretch flex flex-row items-start justify-start gap-[19px]">
                                <div className="flex flex-row items-center justify-start gap-[4px]">
                                    <img
                                        className="w-5 relative h-5 overflow-hidden shrink-0"
                                        alt=""
                                        src={frame1}
                                    />
                                    <div className="relative leading-[17px]">
                                        Air Conditioning
                                    </div>
                                </div>
                                <div className="flex flex-row items-center justify-start gap-[3px]">
                                    <img
                                        className="w-6 relative h-5"
                                        alt=""
                                        src={localGasStation}
                                    />
                                    <img
                                        className="w-5 relative h-5 overflow-hidden shrink-0 hidden"
                                        alt=""
                                        src={frame2}
                                    />
                                    <div className="relative leading-[17px]">{diesel}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute top-[127px] left-[24px] flex flex-col items-start justify-start gap-[24px] text-sm text-gainsboro-300">
                        <div className="w-[209px] relative box-border h-px border-t-[1px] border-solid border-gainsboro-100" />
                        <div className="w-52 flex flex-row items-center justify-between">
                            <div className="relative leading-[17px]">Price</div>
                            <div className="relative leading-[17px] text-whitesmoke text-base">
                                <span>
                                    <span className="font-semibold">$2,100</span>
                                    <span className="text-sm">{` `}</span>
                                </span>
                                <span className="text-sm">
                                    <span>/day</span>
                                </span>
                            </div>
                        </div>
                        <div className="w-52 rounded-lg bg-primary h-10 flex flex-row items-center justify-center p-2 box-border gap-[8px] text-white">
                            <div className="relative leading-[17px] font-medium">
                                Book Now
                            </div>
                            <img
                                className="w-5 relative h-5"
                                alt=""
                                src={vuesaxlineararrowRight}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

GroupComponent.propTypes = {
    className: PropTypes.string,
    toyotoEtios: PropTypes.string,
    star1: PropTypes.string,
    prop: PropTypes.string,
    reviews: PropTypes.string,
    vuesaxlinearuser: PropTypes.string,
    passagers: PropTypes.string,
    frame: PropTypes.string,
    frame1: PropTypes.string,
    localGasStation: PropTypes.string,
    frame2: PropTypes.string,
    diesel: PropTypes.string,
    vuesaxlineararrowRight: PropTypes.string,

    /** Style props */
    propLeft: PropTypes.any,
};

export default GroupComponent;
