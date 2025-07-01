import React from "react";
import { Search } from "lucide-react";
import { Input } from "../atoms/Input";

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
export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onUserTyping,
  placeholder = "Search...",
  onKeyDown,
  className = "",
  inputClassName = "",
  ...rest
}) => {
  return (
    <div className={`flex items-center flex-1 ${className}`}>
      <Search />
      <Input
        value={value}
        onChange={(e) => {
          onChange(e);
          onUserTyping?.();
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={inputClassName}
        {...rest}
      />
    </div>
  );
};
