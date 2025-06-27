import { jsx as _jsx } from "react/jsx-runtime";
export const EmptyStateMessage = ({ message = "No results found." }) => {
    return (_jsx("div", { className: "flex items-center justify-center p-4 bg-gray-50 border border-dashed border-gray-300 rounded-md text-gray-500 text-sm italic", children: message }));
};
