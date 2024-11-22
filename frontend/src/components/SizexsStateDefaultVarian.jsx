import { useMemo } from "react";
import PropTypes from "prop-types";

const SizexsStateDefaultVarian = ({
    className = "",
    button,
    sizexsStateDefaultVarianBorderRadius,
    sizexsStateDefaultVarianBackgroundColor,
    sizexsStateDefaultVarianHeight,
    sizexsStateDefaultVarianPosition,
    sizexsStateDefaultVarianWidth,
    sizexsStateDefaultVarianRight,
    sizexsStateDefaultVarianBottom,
    sizexsStateDefaultVarianLeft,
    sizexsStateDefaultVarianOverflow,
    sizexsStateDefaultVarianPadding,
    sizexsStateDefaultVarianFontWeight,
    sizexsStateDefaultVarianFontSize,
    sizexsStateDefaultVarianColor,
}) => {
    const sizexsStateDefaultVarianStyle = useMemo(() => {
        return {
            borderRadius: sizexsStateDefaultVarianBorderRadius,
            backgroundColor: sizexsStateDefaultVarianBackgroundColor,
            height: sizexsStateDefaultVarianHeight,
            position: sizexsStateDefaultVarianPosition,
            width: sizexsStateDefaultVarianWidth,
            right: sizexsStateDefaultVarianRight,
            bottom: sizexsStateDefaultVarianBottom,
            left: sizexsStateDefaultVarianLeft,
            overflow: sizexsStateDefaultVarianOverflow,
            padding: sizexsStateDefaultVarianPadding,
            fontWeight: sizexsStateDefaultVarianFontWeight,
            fontSize: sizexsStateDefaultVarianFontSize,
            color: sizexsStateDefaultVarianColor,
        };
    }, [
        sizexsStateDefaultVarianBorderRadius,
        sizexsStateDefaultVarianBackgroundColor,
        sizexsStateDefaultVarianHeight,
        sizexsStateDefaultVarianPosition,
        sizexsStateDefaultVarianWidth,
        sizexsStateDefaultVarianRight,
        sizexsStateDefaultVarianBottom,
        sizexsStateDefaultVarianLeft,
        sizexsStateDefaultVarianOverflow,
        sizexsStateDefaultVarianPadding,
        sizexsStateDefaultVarianFontWeight,
        sizexsStateDefaultVarianFontSize,
        sizexsStateDefaultVarianColor,
    ]);

    return (
        <div
            className={`rounded-lg bg-blue h-6 flex flex-row items-center justify-center py-2.5 px-2 box-border text-left text-xs text-white ${className}`}
            style={sizexsStateDefaultVarianStyle}
        >
            <div className="relative leading-[16px] font-medium">{button}</div>
        </div>
    );
};

SizexsStateDefaultVarian.propTypes = {
    className: PropTypes.string,
    button: PropTypes.string,

    /** Style props */
    sizexsStateDefaultVarianBorderRadius: PropTypes.any,
    sizexsStateDefaultVarianBackgroundColor: PropTypes.any,
    sizexsStateDefaultVarianHeight: PropTypes.any,
    sizexsStateDefaultVarianPosition: PropTypes.any,
    sizexsStateDefaultVarianWidth: PropTypes.any,
    sizexsStateDefaultVarianRight: PropTypes.any,
    sizexsStateDefaultVarianBottom: PropTypes.any,
    sizexsStateDefaultVarianLeft: PropTypes.any,
    sizexsStateDefaultVarianOverflow: PropTypes.any,
    sizexsStateDefaultVarianPadding: PropTypes.any,
    sizexsStateDefaultVarianFontWeight: PropTypes.any,
    sizexsStateDefaultVarianFontSize: PropTypes.any,
    sizexsStateDefaultVarianColor: PropTypes.any,
};

export default SizexsStateDefaultVarian;
