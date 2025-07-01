import React from "react";
type MicButtonProps = {
    onClick: () => void;
    isListening: boolean;
    className?: string;
    tooltipClassName?: string;
    customIcon?: React.ReactNode;
    showTooltip?: boolean;
};
export declare const MicButton: React.FC<MicButtonProps>;
export {};
