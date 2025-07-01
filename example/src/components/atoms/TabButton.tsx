import React from "react";
import clsx from "clsx";

interface TabButtonProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
  label,
  isActive,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "px-3 py-1 rounded border text-sm font-medium transition",
        isActive
          ? "bg-blue-600 text-white"
          : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
      )}
    >
      {label}
    </button>
  );
};
