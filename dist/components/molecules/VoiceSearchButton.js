import { jsx as _jsx } from "react/jsx-runtime";
import { Mic } from "lucide-react";
import { Button } from "../atoms/Button";
export const VoiceSearchButton = ({ onResult }) => {
    const handleClick = () => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice recognition not supported");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            onResult(transcript);
        };
        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };
        recognition.start();
    };
    return (_jsx(Button, { onClick: handleClick, "aria-label": "Start voice search", className: "p-2", children: _jsx(Mic, { className: "w-5 h-5" }) }));
};
