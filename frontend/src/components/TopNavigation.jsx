import { useCallback } from "react";
import PropTypes from "prop-types";

const TopNavigation = ({ className = "" }) => {
  const onLogOutTextClick = useCallback(() => {
    // Please sync "SignUp" to the project
  }, []);

  return (
    <header
      className={`w-[1377px] flex flex-row items-start justify-end py-0 px-2.5 box-border max-w-full text-left text-7xl text-whitesmoke-400 font-poppins ${className}`}
    >
      <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px]">
        <div className="flex flex-row items-start justify-start gap-[156px] max-w-full mq725:gap-[78px]">
          <div className="flex flex-row items-start justify-start gap-[8px]">
            <img
              className="h-[32.8px] w-[37px] relative overflow-hidden shrink-0"
              loading="lazy"
              alt=""
              src="/setting-1.svg"
            />
            <a className="[text-decoration:none] h-[34.6px] relative tracking-[0.01em] font-semibold text-[inherit] inline-block whitespace-nowrap">
              Dashboard
            </a>
          </div>
          <div className="flex flex-col items-start justify-start pt-[19px] px-0 pb-0 text-5xl">
            <a className="[text-decoration:none] relative font-medium text-[inherit] whitespace-nowrap">{`Hello Admin `}</a>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0 text-5xl">
          <a
            className="[text-decoration:none] relative font-medium text-[inherit] inline-block min-w-[92px] whitespace-nowrap cursor-pointer"
            onClick={onLogOutTextClick}
          >
            Log Out
          </a>
        </div>
      </div>
    </header>
  );
};

TopNavigation.propTypes = {
  className: PropTypes.string,
};

export default TopNavigation;
