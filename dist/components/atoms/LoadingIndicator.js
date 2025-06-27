import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const LoadingIndicator = ({ message = "Loading..." }) => {
    return (_jsxs("div", { className: "flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md shadow-sm animate-pulse text-sm", children: [_jsx("span", { className: "w-3 h-3 rounded-full bg-blue-500 animate-bounce" }), _jsx("span", { children: message })] }));
};
