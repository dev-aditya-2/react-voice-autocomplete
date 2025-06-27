import { Mic } from "lucide-react";
import { Button } from "../atoms/Button";

export const VoiceSearchButton: React.FC<{ onResult: (text: string) => void }> = ({ onResult }) => {
  const handleClick = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Voice recognition not supported");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onResult(transcript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
    };

    recognition.start();
  };

  return (
    <Button onClick={handleClick} aria-label="Start voice search" className="p-2">
      <Mic className="w-5 h-5" />
    </Button>
  );
};
