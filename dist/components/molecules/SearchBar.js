import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search } from "lucide-react";
import { Input } from "../atoms/Input";
export const SearchBar = ({ value, onChange, onUserTyping, placeholder = "Search...", onKeyDown, ...rest }) => {
    return (_jsxs("div", { className: "flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-full max-w-md bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition", children: [_jsx(Search, { className: "w-4 h-4 text-gray-500", "aria-hidden": "true" }), _jsx(Input, { value: value, onChange: (e) => {
                    onChange(e);
                    onUserTyping === null || onUserTyping === void 0 ? void 0 : onUserTyping();
                }, onKeyDown: onKeyDown, placeholder: placeholder, className: "flex-1 border-none shadow-none text-sm placeholder-gray-400 focus:outline-none", ...rest })] }));
};
