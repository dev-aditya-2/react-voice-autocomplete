import React from "react";

export const Button = ({ className = "", ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button className={`px-3 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 ${className}`} {...props} />
  );
  