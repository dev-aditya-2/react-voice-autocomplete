
import React from "react";
import { Mic, MicOff } from "lucide-react";
import clsx from "clsx";

type MicButtonProps = {
  onClick: () => void;
  isListening: boolean;
  className?: string;
  tooltipClassName?: string;
  customIcon?: React.ReactNode;
  showTooltip?: boolean;
};

export const MicButton: React.FC<MicButtonProps> = ({
  onClick,
  isListening,
  className = "",
  tooltipClassName = "",
  customIcon,
  showTooltip = true,
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx("relative group", className)}
      aria-label="Search by voice"
      type="button"
    >
      {customIcon ? customIcon : isListening ? <MicOff /> : <Mic />}

    </button>
  );
};
