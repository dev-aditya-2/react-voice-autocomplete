import { useVoiceRecognition } from "@/hooks/useVoiceRecognition";
import { MicButton } from "@/components/atoms/MicButton";
import { useEffect, useRef } from "react";
import { VoiceStatusIndicator } from "../atoms/VoiceStatusIndicator";
type VoiceSearchInputProps = {
  onResult: (text: string) => void;
  onError?: (error: string) => void;
};

export const VoiceSearchInput: React.FC<VoiceSearchInputProps> = ({
  onResult,
  onError,
}) => {
  const { transcript, isListening, toggleListening, status, voiceError } =
    useVoiceRecognition();
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
  return (
    <div className="flex flex-col items-center space-y-1">
      <MicButton onClick={handleToggleListening} isListening={isListening} />
      <VoiceStatusIndicator
        isListening={isListening}
        transcript={transcript}
        status={status}
      />
    </div>
  );
};
