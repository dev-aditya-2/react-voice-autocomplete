import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Mic, MicOff } from "lucide-react";
import clsx from "clsx";
export const MicButton = ({ onClick, isListening }) => {
    return (_jsxs("button", { onClick: onClick, className: clsx("relative group p-2 rounded-full border transition-colors", isListening
            ? "bg-red-100 border-red-400 text-red-600 hover:bg-red-200"
            : "bg-blue-100 border-blue-400 text-blue-600 hover:bg-blue-200"), "aria-label": "Search by voice", children: [isListening ? (_jsx(MicOff, { className: "w-5 h-5" })) : (_jsx(Mic, { className: "w-5 h-5" })), _jsx("span", { className: "absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs bg-black text-white px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10", children: "Search by voice" })] }));
};
