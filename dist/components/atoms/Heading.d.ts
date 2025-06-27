import React from "react";
type HeadingProps = {
    children: React.ReactNode;
    level?: 1 | 2 | 3 | 4 | 5 | 6;
    className?: string;
};
export declare const Heading: ({ children, level, className }: HeadingProps) => import("react/jsx-runtime").JSX.Element;
export {};
