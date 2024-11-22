import { useMemo } from "react";
import PropTypes from "prop-types";

const MetricItem = ({
  className = "",
  heading,
  arrowDown,
  change,
  number,
  propBorder,
}) => {
  const metricItemStyle = useMemo(() => {
    return {
      border: propBorder,
    };
  }, [propBorder]);

  return (
    <div
      className={`flex-1 rounded-xl bg-gray-100 box-border flex flex-col items-start justify-start py-3.5 px-[15px] gap-[16px] min-w-[192px] text-left text-base text-whitesmoke font-inter-heading-h5-24-semi-bold border-[1px] border-solid border-gray-100 ${className}`}
      style={metricItemStyle}
    >
      <div className="self-stretch flex flex-row items-center justify-start gap-[16px]">
        <div className="flex-1 relative leading-[24px] font-semibold text-white">
          {heading}
        </div>
        <div className="flex flex-row items-center justify-center gap-[2px] text-center text-sm text-danger-main">
          {/* <img
            className="h-5 w-5 relative overflow-hidden shrink-0 min-h-[20px] text-white"
            alt=""
            src={arrowDown}
          />
          <div className="relative leading-[20px] font-medium inline-block min-w-[21px] text-white">
            {change}
          </div> */}
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start gap-[16px] text-5xl">
        <div className="self-stretch relative leading-[32px] font-semibold mq450:text-lgi mq450:leading-[26px] text-white">
          {number}
        </div>
        
      </div>
    </div>
  );
};

MetricItem.propTypes = {
  className: PropTypes.string,
  heading: PropTypes.string,
  arrowDown: PropTypes.string,
  change: PropTypes.string,
  number: PropTypes.string,
  chartMini: PropTypes.string,

  /** Style props */
  propBorder: PropTypes.any,
};

export default MetricItem;
