import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({ className = "", ...props }: InputProps) => {
  return (
    <input
      className={`w-full px-3 py-2 text-sm text-gray-800 bg-white border border-gray-300 rounded-md focus:outline-none placeholder-gray-400 transition duration-150 ${className}`}
      {...props}
    />
  );
};
