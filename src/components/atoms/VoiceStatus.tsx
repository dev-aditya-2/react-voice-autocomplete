type VoiceStatusProps = {
    status: string;
  };
  
  export const VoiceStatus: React.FC<VoiceStatusProps> = ({ status }) => (
    <div className="text-sm text-gray-600 mt-1">{status}</div>
  );
  