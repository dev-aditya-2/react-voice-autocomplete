"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import { Flame, Star } from "lucide-react";
import { VoiceSearchInput } from "../VoiceSearchInput";
import { EmptyStateMessage } from "../../atoms/EmptyStateMessage";
import clsx from "clsx";
import { VoiceErrorBanner } from "../../atoms/VoiceErrorBanner";
import { LoadingIndicator } from "../../atoms/LoadingIndicator";
import { SearchBar } from "../../molecules/SearchBar";
import { algoliasearch } from "algoliasearch";
const index = "algolia_movie_sample_dataset";
/**
 * Headless SearchWithAlgoliaAutocomplete: No default styles, only logic and structure.
 * - containerClassName: for the search bar wrapper
 * - searchBarClassName: for the search bar
 * - resultsListClassName: for the results list
 * - selectedTextClassName: for the selected result details
 */
export const SearchWithAlgoliaAutocomplete = ({ appId, searchKey, containerClassName = "", searchBarClassName = "", inputClassName = "", resultsListClassName = "", selectedTextClassName = "", micButtonClassName = "", voiceWrapperClassName = "", resultItemClassName = "", loadingIndicatorClassName = "", loadingIndicator, selectedItemClassName = "", }) => {
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
    const client = algoliasearch(appId, searchKey);
    const search = async (query) => {
        if (!query.trim()) {
            setResults([]);
            return;
        }
        setIsLoading(true);
        const results = await client.search([
            {
                indexName: index,
                params: {
                    query: query,
                    hitsPerPage: 5,
                },
            },
        ]);
        const searchResult = results.results[0];
        if ("hits" in searchResult) {
            setResults(searchResult.hits);
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
                        }, onKeyDown: handleKeyDown, placeholder: "Search with algolia search...", "aria-autocomplete": "list", "aria-controls": listboxId, "aria-activedescendant": activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined, className: searchBarClassName, inputClassName: inputClassName }), _jsx(VoiceSearchInput, { onResult: (text) => {
                            setInputValue(text);
                            setSelected(null);
                            setInputMode("voice");
                        }, onError: (err) => setVoiceError(err), micButtonClassName: micButtonClassName, wrapperClassName: voiceWrapperClassName })] }), voiceError && _jsx(VoiceErrorBanner, { message: voiceError }), isLoading &&
                (loadingIndicator ? (_jsx("div", { className: loadingIndicatorClassName, children: loadingIndicator })) : (_jsx(LoadingIndicator, { message: "Searching...", className: loadingIndicatorClassName }))), !isLoading && showEmptyState && (_jsx(EmptyStateMessage, { message: "No results found for your search." })), voiceError && _jsx(VoiceErrorBanner, { message: voiceError }), !isLoading && results.length > 0 && (_jsx("ul", { className: clsx(resultsListClassName, "border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100 mt-2"), children: results.map((result, index) => (_jsxs("li", { className: clsx(resultItemClassName, "flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-50 focus:bg-blue-100 transition"), onClick: () => handleSelect(result), children: [_jsx("img", { src: result.poster_path, alt: result.title, className: "w-12 h-16 object-cover rounded flex-shrink-0" }), _jsxs("div", { className: "min-w-0", children: [_jsx("div", { className: "font-semibold text-sm truncate", children: result.title }), _jsx("div", { className: "text-xs text-gray-500", children: result.release_date })] })] }, result.objectID))) })), selected && (_jsxs("div", { className: clsx(selectedItemClassName, "flex items-start gap-4 mt-4 p-4 border rounded bg-gray-50 shadow-sm max-w-xl"), children: [_jsx("img", { src: selected.poster_path, alt: selected.title, className: "w-28 h-16 object-cover rounded flex-shrink-0" }), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsx("h2", { className: "text-xl font-semibold mb-1", children: selected.title }), _jsxs("p", { className: "text-sm text-gray-600 mb-2", children: [_jsx("span", { className: "font-medium", children: "Release Date:" }), " ", selected.release_date] }), _jsx("p", { className: "text-sm text-gray-700", children: selected.overview }), _jsxs("div", { className: "mt-2 flex flex-wrap gap-2 text-xs text-gray-500", children: [_jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Star, { className: "w-4 h-4 text-yellow-400" }), " ", selected.vote_average, " "] }), _jsxs("span", { className: "flex items-center gap-1", children: [_jsx(Flame, { className: "w-4 h-4 text-red-500" }), " ", Math.round(selected.popularity)] }), selected.genres.map((genre) => (_jsx("span", { className: "px-2 py-0.5 bg-gray-200 text-gray-800 rounded-full", children: genre }, genre)))] }), _jsxs("div", { className: "mt-4", children: [_jsx("h3", { className: "text-sm font-semibold text-gray-700 mb-1", children: "Cast" }), _jsx("ul", { className: "text-sm text-gray-600 space-y-0.5", children: selected.cast.map((member, index) => (_jsxs("li", { children: [_jsx("span", { className: "font-medium", children: member.name }), " as", " ", member.character] }, index))) })] })] })] }))] }));
};
