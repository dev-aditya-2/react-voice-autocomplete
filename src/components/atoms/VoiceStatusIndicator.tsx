import React from "react";

type VoiceStatusIndicatorProps = {
  isListening: boolean;
  transcript: string;
  status: string;
};

export const VoiceStatusIndicator: React.FC<VoiceStatusIndicatorProps> = ({
  isListening,
  transcript,
  status,
}) => {
  if (!isListening) return null;
  const color = isListening ? "text-green-600" : "text-gray-500";

  return (
    <div className="text-sm mt-1 ml-1 space-y-1">
      <p className={`${color} font-medium`}>
        {isListening ? "Listening..." : status}
      </p>
      {transcript && (
        <p className="text-gray-600 italic truncate">
          You said: <span className="font-semibold">{transcript}</span>
        </p>
      )}
    </div>
  );
};
