import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const VoiceStatusIndicator = ({ isListening, transcript, status, }) => {
    if (!isListening)
        return null;
    const color = isListening ? "text-green-600" : "text-gray-500";
    return (_jsxs("div", { className: "text-sm mt-1 ml-1 space-y-1", children: [_jsx("p", { className: `${color} font-medium`, children: isListening ? "Listening..." : status }), transcript && (_jsxs("p", { className: "text-gray-600 italic truncate", children: ["You said: ", _jsx("span", { className: "font-semibold", children: transcript })] }))] }));
};
