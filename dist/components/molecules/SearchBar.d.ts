import React from "react";
type SearchBarProps = {
    value: string;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    onUserTyping?: () => void;
    placeholder?: string;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;
export declare const SearchBar: React.FC<SearchBarProps>;
export {};
