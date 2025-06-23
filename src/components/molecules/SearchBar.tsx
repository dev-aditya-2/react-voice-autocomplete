import React from "react";
import { Input } from "@/components/atoms/Input";
import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
};

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  onKeyDown,
}) => {
  return (
    <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full max-w-md bg-white shadow-sm">
      <Search className="w-4 h-4 text-gray-500 mr-2" />
      <Input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="flex-1 border-none shadow-none focus:ring-0 focus:outline-none"
      />
    </div>
  );
};
