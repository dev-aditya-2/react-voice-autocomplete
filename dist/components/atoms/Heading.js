import { jsx as _jsx } from "react/jsx-runtime";
export const Heading = ({ children, level = 1, className = "" }) => {
    const Tag = `h${level}`;
    return _jsx(Tag, { className: `font-bold text-xl ${className}`, children: children });
};
