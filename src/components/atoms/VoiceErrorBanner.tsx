type VoiceErrorBannerProps = {
    message: string;
  };
  
  export const VoiceErrorBanner: React.FC<VoiceErrorBannerProps> = ({ message }) => (
    <div className="w-full text-sm text-red-700 bg-red-100 border border-red-300 rounded-md px-3 py-2 mt-1 animate-fadeIn">
      {message}
    </div>
  );
  