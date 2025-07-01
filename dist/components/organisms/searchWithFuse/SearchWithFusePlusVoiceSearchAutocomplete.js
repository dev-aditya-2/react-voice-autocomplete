"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { fruits } from "./data";
import { VoiceSearchInput } from "../VoiceSearchInput";
import clsx from "clsx";
import { SearchBar } from "../../molecules/SearchBar";
import { LoadingIndicator } from "../../atoms/LoadingIndicator";
import { EmptyStateMessage } from "../../atoms/EmptyStateMessage";
import { VoiceErrorBanner } from "../../atoms/VoiceErrorBanner";
const fuse = new Fuse(fruits, {
    keys: ["name"],
    threshold: 0.3,
});
export const SearchWithFusePlusVoiceSearchAutocomplete = ({ containerClassName = "", searchBarClassName = "", inputClassName = "", resultsListClassName = "", selectedTextClassName = "", micButtonClassName = "", voiceWrapperClassName = "", resultItemClassName = "", loadingIndicatorClassName = "", loadingIndicator, }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [selected, setSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isManuallyEditing, setIsManuallyEditing] = useState(false);
    const [voiceError, setVoiceError] = useState(null);
    const justSelectedRef = useRef(false);
    useEffect(() => {
        if (!query) {
            setResults([]);
            setIsLoading(false);
            return;
        }
        if (justSelectedRef.current) {
            justSelectedRef.current = false;
            return;
        }
        setIsLoading(true);
        const delay = setTimeout(() => {
            const matches = fuse.search(query).map((r) => r.item);
            setResults(matches);
            setIsLoading(false);
        }, 300);
        return () => clearTimeout(delay);
    }, [query]);
    const handleSelect = (item) => {
        justSelectedRef.current = true;
        setSelected(item);
        setQuery(item.name);
        setResults([]);
        setActiveIndex(-1);
    };
    const handleKeyDown = (e) => {
        if (e.key === "ArrowDown") {
            setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
        }
        else if (e.key === "ArrowUp") {
            setActiveIndex((prev) => Math.max(prev - 1, 0));
        }
        else if (e.key === "Enter" && results[activeIndex]) {
            handleSelect(results[activeIndex]);
        }
    };
    const listboxId = "autocomplete-options";
    return (_jsxs("div", { role: "combobox", "aria-haspopup": "listbox", "aria-owns": listboxId, "aria-expanded": results.length > 0, children: [_jsxs("div", { className: containerClassName, children: [_jsx(SearchBar, { value: query, onChange: (e) => {
                            setQuery(e.target.value);
                            setSelected(null);
                        }, onUserTyping: () => setIsManuallyEditing(true), onKeyDown: handleKeyDown, placeholder: "Search with fuse search...", "aria-autocomplete": "list", "aria-controls": listboxId, "aria-activedescendant": activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined, className: searchBarClassName, inputClassName: inputClassName }), _jsx(VoiceSearchInput, { onResult: (text) => {
                            if (!isManuallyEditing) {
                                setQuery(text);
                            }
                        }, onError: (err) => setVoiceError(err), micButtonClassName: micButtonClassName, wrapperClassName: voiceWrapperClassName })] }), isLoading && (loadingIndicator ? (_jsx("div", { className: loadingIndicatorClassName, children: loadingIndicator })) : (_jsx(LoadingIndicator, { message: "Searching...", className: loadingIndicatorClassName }))), !isLoading && query && !selected && results.length === 0 && (_jsx(EmptyStateMessage, { message: "No results found for your search." })), voiceError && _jsx(VoiceErrorBanner, { message: voiceError }), !isLoading && query && results.length > 0 && (_jsx("ul", { id: listboxId, role: "listbox", className: resultsListClassName, children: results.map((fruit, index) => (_jsx("li", { role: "option", "aria-selected": index === activeIndex, onMouseDown: () => handleSelect(fruit), className: clsx(resultItemClassName, "flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-blue-50 focus:bg-blue-100 transition"), children: fruit.name }, fruit.id))) })), selected && (_jsxs("p", { className: selectedTextClassName, children: ["You selected: ", _jsx("strong", { children: selected.name })] }))] }));
};
