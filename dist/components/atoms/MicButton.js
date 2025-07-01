import { jsx as _jsx } from "react/jsx-runtime";
import { Mic, MicOff } from "lucide-react";
import clsx from "clsx";
export const MicButton = ({ onClick, isListening, className = "", tooltipClassName = "", customIcon, showTooltip = true, }) => {
    return (_jsx("button", { onClick: onClick, className: clsx("relative group", className), "aria-label": "Search by voice", type: "button", children: customIcon ? customIcon : isListening ? _jsx(MicOff, {}) : _jsx(Mic, {}) }));
};
