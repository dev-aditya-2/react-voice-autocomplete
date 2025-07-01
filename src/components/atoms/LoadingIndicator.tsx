import React from "react";

type LoadingIndicatorProps = {
  message?: string;
  className?: string;
};

export const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ message = "Loading...", className = "" }) => {
  return (
    <div className={`flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 text-blue-700 rounded-md shadow-sm animate-pulse text-sm ${className}`}>
      <span className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" />
      <span>{message}</span>
    </div>
  );
};
