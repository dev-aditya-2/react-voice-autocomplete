import React from "react";

type EmptyStateMessageProps = {
  message?: string;
};

export const EmptyStateMessage: React.FC<EmptyStateMessageProps> = ({ message = "No results found." }) => {
  return (
    <div className="flex items-center justify-center p-4 bg-gray-50 border border-dashed border-gray-300 rounded-md text-gray-500 text-sm italic">
      {message}
    </div>
  );
};
