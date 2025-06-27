import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef } from "react";
import { VoiceStatusIndicator } from "../atoms/VoiceStatusIndicator";
import { useVoiceRecognition } from "../../hooks/useVoiceRecognition";
import { MicButton } from "../atoms/MicButton";
export const VoiceSearchInput = ({ onResult, onError, }) => {
    const { transcript, isListening, toggleListening, status, voiceError } = useVoiceRecognition();
    const wasListeningRef = useRef(false);
    const handleToggleListening = () => {
        wasListeningRef.current = true;
        toggleListening();
    };
    useEffect(() => {
        if (transcript && status === "Done listening" && wasListeningRef.current) {
            onResult(transcript);
            wasListeningRef.current = false; // Reset after using
        }
    }, [transcript, status, onResult]);
    useEffect(() => {
        if (voiceError && onError) {
            onError(voiceError);
        }
    }, [voiceError, onError]);
    return (_jsxs("div", { className: "flex flex-col items-center space-y-1", children: [_jsx(MicButton, { onClick: handleToggleListening, isListening: isListening }), _jsx(VoiceStatusIndicator, { isListening: isListening, transcript: transcript, status: status })] }));
};
