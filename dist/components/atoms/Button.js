import { jsx as _jsx } from "react/jsx-runtime";
export const Button = ({ className = "", ...props }) => (_jsx("button", { className: `px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${className}`, ...props }));
