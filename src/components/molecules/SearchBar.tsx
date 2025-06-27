// import React from "react";
// import { Input } from "@/components/atoms/Input";
// import { Search } from "lucide-react";

// type SearchBarProps = {
//   value: string;
//   onChange: React.ChangeEventHandler<HTMLInputElement>;
//   onUserTyping?: () => void;
//   placeholder?: string;
//   onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
// } & React.InputHTMLAttributes<HTMLInputElement>;

// export const SearchBar: React.FC<SearchBarProps> = ({
//   value,
//   onChange,
//   onUserTyping,
//   placeholder = "Search...",
//   onKeyDown,
//   ...rest
// }) => {
//   return (
//     <div className="flex items-center border border-gray-300 rounded-md px-3 py-2 w-full max-w-md bg-white shadow-sm">
//       <Search className="w-4 h-4 text-gray-500 mr-2" />
//       <Input
//         value={value}
//         onChange={(e) => {
//           onChange(e);
//           onUserTyping?.();
//         }}
//         onKeyDown={onKeyDown}
//         placeholder={placeholder}
//         className="flex-1 border-none shadow-none focus:ring-0 focus:outline-none"
//         {...rest}
//       />
//     </div>
//   );
// };

import React from "react";
import { Input } from "@/components/atoms/Input";
import { Search } from "lucide-react";

type SearchBarProps = {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onUserTyping?: () => void;
  placeholder?: string;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  onUserTyping,
  placeholder = "Search...",
  onKeyDown,
  ...rest
}) => {
  return (
    <div className="flex items-center gap-2 border border-gray-300 rounded-md px-3 py-2 w-full max-w-md bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 transition">
      <Search className="w-4 h-4 text-gray-500" aria-hidden="true" />
      <Input
        value={value}
        onChange={(e) => {
          onChange(e);
          onUserTyping?.();
        }}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="flex-1 border-none shadow-none text-sm placeholder-gray-400 focus:outline-none"
        {...rest}
      />
    </div>
  );
};
