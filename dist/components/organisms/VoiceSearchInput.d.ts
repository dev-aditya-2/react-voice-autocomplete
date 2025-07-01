type VoiceSearchInputProps = {
    onResult: (text: string) => void;
    onError?: (error: string) => void;
    micButtonClassName?: string;
    wrapperClassName?: string;
};
export declare const VoiceSearchInput: React.FC<VoiceSearchInputProps>;
export {};
