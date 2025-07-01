"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { VoiceSearchInput } from "../VoiceSearchInput";
import { EmptyStateMessage } from "../../atoms/EmptyStateMessage";
import clsx from "clsx";
import { VoiceErrorBanner } from "../../atoms/VoiceErrorBanner";
import { LoadingIndicator } from "../../atoms/LoadingIndicator";
import { SearchBar } from "../../molecules/SearchBar";
import { MeiliSearch } from 'meilisearch';
/**
 * Headless SearchWithMeilisearchAutocomplete: No default styles, only logic and structure.
 * - containerClassName: for the search bar wrapper
 * - searchBarClassName: for the search bar
 * - resultsListClassName: for the results list
 * - selectedTextClassName: for the selected result details
 */
export const SearchWithMeilisearchAutocomplete = ({ host, apiKey, containerClassName = "", searchBarClassName = "", inputClassName = "", resultsListClassName = "", selectedTextClassName = "", micButtonClassName = "", voiceWrapperClassName = "", resultItemClassName = "", loadingIndicatorClassName = "", loadingIndicator, selectedItemClassName = "" }) => {
    const [inputValue, setInputValue] = useState("");
    const [results, setResults] = useState([]);
    const [selected, setSelected] = useState(null);
    const [inputMode, setInputMode] = useState("manual");
    const [isLoading, setIsLoading] = useState(false);
    const [voiceError, setVoiceError] = useState(null);
    const [activeIndex, setActiveIndex] = useState(-1);
    const debounceRef = useRef(null);
    const suppressSearchRef = useRef(false);
    const justSelectedRef = useRef(false);
    const client = new MeiliSearch({ host, apiKey });
    const search = async (query) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        setIsLoading(true);
        try {
            const index = client.index("movies");
            const searchResult = await index.search(query, { limit: 5 });
            console.log(searchResult);
            setResults(searchResult.hits.map((hit) => ({
                objectID: hit.id,
                title: hit.title,
                release_date: hit.release_date,
                overview: hit.overview,
                poster_path: hit.poster,
                genres: hit.genres || [],
            })));
        }
        catch (err) {
            setResults([]);
        }
        setIsLoading(false);
    };
    useEffect(() => {
        if (suppressSearchRef.current) {
            suppressSearchRef.current = false;
            return;
        }
        if (debounceRef.current)
            clearTimeout(debounceRef.current);
        debounceRef.current = window.setTimeout(() => {
            if (inputValue.trim()) {
                search(inputValue);
            }
            else {
                setResults([]);
            }
        }, 300);
    }, [inputValue]);
    useEffect(() => {
        if (justSelectedRef.current) {
            const timer = setTimeout(() => {
                justSelectedRef.current = false;
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [selected]);
    const handleSelect = (item) => {
        suppressSearchRef.current = true;
        justSelectedRef.current = true;
        setSelected(item);
        setInputValue(item.title);
        setInputMode("manual");
        setResults([]);
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
    const showEmptyState = !isLoading &&
        !selected &&
        inputValue.trim().length > 0 &&
        results.length === 0 &&
        inputMode === "manual";
    const listboxId = "autocomplete-options";
    return (_jsxs("div", { role: "combobox", "aria-haspopup": "listbox", "aria-owns": listboxId, "aria-expanded": results.length > 0, children: [_jsxs("div", { className: containerClassName, children: [_jsx(SearchBar, { value: inputValue, onChange: (e) => {
                            setInputValue(e.target.value);
                            setInputMode("manual");
                            setSelected(null);
                        }, onUserTyping: () => {
                            setInputMode("manual");
                            setSelected(null);
                        }, onKeyDown: handleKeyDown, placeholder: "Search with Meilisearch...", "aria-autocomplete": "list", "aria-controls": listboxId, "aria-activedescendant": activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined, className: searchBarClassName, inputClassName: inputClassName }), _jsx(VoiceSearchInput, { onResult: (text) => {
                            setInputValue(text);
                            setSelected(null);
                            setInputMode("voice");
                        }, onError: (err) => setVoiceError(err), micButtonClassName: micButtonClassName, wrapperClassName: voiceWrapperClassName })] }), voiceError && _jsx(VoiceErrorBanner, { message: voiceError }), isLoading && (loadingIndicator ? (_jsx("div", { className: loadingIndicatorClassName, children: loadingIndicator })) : (_jsx(LoadingIndicator, { message: "Searching...", className: loadingIndicatorClassName }))), !isLoading && showEmptyState && (_jsx(EmptyStateMessage, { message: "No results found for your search." })), voiceError && _jsx(VoiceErrorBanner, { message: voiceError }), !isLoading && results.length > 0 && (_jsx("ul", { className: clsx(resultsListClassName, "border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100 mt-2"), children: results.map((result, index) => (_jsxs("li", { className: clsx(resultItemClassName, "flex items-center gap-4 px-4 py-2 cursor-pointer hover:bg-blue-50 focus:bg-blue-100 transition"), onClick: () => handleSelect(result), children: [_jsx("img", { src: result.poster_path, alt: result.title, className: "w-12 h-16 object-cover rounded flex-shrink-0" }), _jsxs("div", { className: "min-w-0", children: [_jsx("div", { className: "font-semibold text-sm truncate", children: result.title }), _jsx("div", { className: "text-xs text-gray-500", children: result.release_date })] })] }, result.objectID))) })), selected && (_jsxs("div", { className: clsx(selectedItemClassName, "flex items-start gap-4 mt-4 p-4 border rounded bg-gray-50 shadow-sm max-w-xl"), children: [_jsx("img", { src: selected.poster_path, alt: selected.title, className: "w-12 h-16 object-cover rounded flex-shrink-0" }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("div", { className: "font-bold text-base mb-1 text-gray-900", children: selected.title }), _jsx("div", { className: "text-xs text-gray-500 mb-2", children: selected.release_date }), _jsx("div", { className: "text-sm text-gray-700 mb-1", children: selected.overview })] })] }))] }));
};
