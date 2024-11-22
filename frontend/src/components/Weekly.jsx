const Weekly = () => {
    return (
        <div className="w-full relative rounded-[20px] bg-darkslateblue overflow-hidden flex flex-col items-start justify-start pt-[22px] px-[9px] pb-[17px] box-border gap-[11px] leading-[normal] tracking-[normal] text-left text-[24px] text-white font-dm-sans">
            <div className="self-stretch flex flex-row items-start justify-start py-0 pr-4 pl-[22px] box-border max-w-full">
                <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] mq293:flex-wrap">
                    <div className="flex flex-col items-start justify-start pt-[7px] px-0 pb-0">
                        <b className="relative tracking-[-0.02em] leading-[100%] shrink-0 mq450:text-[19px] mq450:leading-[19px]">
                            Weekly Revenue
                        </b>
                    </div>
                    <img
                        className="h-[33px] w-[31.4px] relative rounded-[10px] overflow-hidden shrink-0 min-h-[33px]"
                        loading="lazy"
                        alt=""
                        src="/button.svg"
                    />
                </div>
            </div>
            <img
                className="w-[758px] relative max-h-full object-cover max-w-[114%] shrink-0"
                alt=""
                src="/chart@2x.png"
            />
        </div>
    );
};

export default Weekly;
