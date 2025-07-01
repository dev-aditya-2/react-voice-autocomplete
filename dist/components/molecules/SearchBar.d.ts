import React from "react";
type SearchBarProps = {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onUserTyping?: () => void;
    placeholder?: string;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    className?: string;
    inputClassName?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;
/**
 * Headless SearchBar: No default styles, only logic and structure.
 * - className: for the wrapper
 * - inputClassName: for the input
 */
export declare const SearchBar: React.FC<SearchBarProps>;
export {};
