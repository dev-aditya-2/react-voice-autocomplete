import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Search } from "lucide-react";
import { Input } from "../atoms/Input";
/**
 * Headless SearchBar: No default styles, only logic and structure.
 * - className: for the wrapper
 * - inputClassName: for the input
 */
export const SearchBar = ({ value, onChange, onUserTyping, placeholder = "Search...", onKeyDown, className = "", inputClassName = "", ...rest }) => {
    return (_jsxs("div", { className: `flex items-center flex-1 ${className}`, children: [_jsx(Search, {}), _jsx(Input, { value: value, onChange: (e) => {
                    onChange(e);
                    onUserTyping === null || onUserTyping === void 0 ? void 0 : onUserTyping();
                }, onKeyDown: onKeyDown, placeholder: placeholder, className: inputClassName, ...rest })] }));
};
