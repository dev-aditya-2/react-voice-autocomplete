import { useEffect, useRef, useState } from "react";
export const useVoiceRecognition = () => {
    const [transcript, setTranscript] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [status, setStatus] = useState("");
    const [voiceError, setVoiceError] = useState("");
    const recognitionRef = useRef(null);
    const onEndRef = useRef(null);
    useEffect(() => {
        const SpeechRecognition = typeof window !== "undefined"
            ? window.SpeechRecognition ||
                window.webkitSpeechRecognition ||
                null
            : null;
        if (!SpeechRecognition) {
            setVoiceError("Voice recognition not supported");
            return;
        }
        const recognition = new SpeechRecognition();
        recognition.lang = "en-US";
        recognition.interimResults = true;
        recognition.continuous = false;
        recognition.onstart = () => {
            setStatus("Listening...");
            setVoiceError("");
        };
        recognition.onend = () => {
            setIsListening(false);
            setStatus("Done listening");
            if (onEndRef.current)
                onEndRef.current();
        };
        recognition.onerror = (e) => {
            console.error("Speech recognition error:", e);
            if (e.error === "not-allowed") {
                setVoiceError("Microphone access denied. Please allow it in browser settings.");
            }
            else {
                setVoiceError("Voice error: " + e.error);
            }
            setIsListening(false);
        };
        recognition.onresult = (e) => {
            const result = Array.from(e.results)
                .map((res) => res[0].transcript)
                .join("");
            setTranscript(result);
        };
        recognitionRef.current = recognition;
        const handleClickOutside = () => {
            if (isListening && recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [isListening]);
    const toggleListening = () => {
        if (!recognitionRef.current)
            return;
        if (isListening) {
            recognitionRef.current.stop();
        }
        else {
            setTranscript("");
            try {
                recognitionRef.current.start();
                setIsListening(true);
            }
            catch (error) {
                console.error("Voice start error:", error);
                setVoiceError("Microphone permission denied or unavailable.");
                setIsListening(false);
            }
        }
    };
    return {
        transcript,
        isListening,
        toggleListening,
        status,
        voiceError,
    };
};
