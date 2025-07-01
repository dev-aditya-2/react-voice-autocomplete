"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { SearchBar } from "../../molecules/SearchBar";
import { LoadingIndicator } from "../../atoms/LoadingIndicator";
import { EmptyStateMessage } from "../../atoms/EmptyStateMessage";
/**
 * Headless SearchWithApiAutocomplete: No default styles, only logic and structure.
 * - containerClassName: for the search bar wrapper
 * - searchBarClassName: for the search bar
 * - resultsListClassName: for the results list
 * - selectedTextClassName: for the selected text
 */
export const SearchWithApiAutocomplete = ({ apiUrl = "/api/suggestions", fetchSuggestions: customFetchSuggestions, containerClassName = "", searchBarClassName = "", inputClassName = "", resultsListClassName = "", selectedTextClassName = "", micButtonClassName = "", voiceWrapperClassName = "", resultItemClassName = "", loadingIndicatorClassName = "", loadingIndicator, }) => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [selected, setSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const justSelectedRef = useRef(false);
    const fetchSuggestions = async (query) => {
        if (customFetchSuggestions)
            return customFetchSuggestions(query);
        const res = await fetch(`${apiUrl}?q=${query}`);
        return res.json();
    };
    const handleSelect = (item) => {
        justSelectedRef.current = true;
        setSelected(item);
        setQuery(item.label);
        setResults([]);
        setActiveIndex(-1);
    };
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
        const delayDebounce = setTimeout(() => {
            fetchSuggestions(query)
                .then(setResults)
                .finally(() => setIsLoading(false));
        }, 300);
        return () => clearTimeout(delayDebounce);
    }, [query]);
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
    const listboxId = "api-autocomplete-options";
    return (_jsxs("div", { role: "combobox", "aria-haspopup": "listbox", "aria-owns": listboxId, "aria-expanded": results.length > 0, children: [_jsx("div", { className: containerClassName, children: _jsx(SearchBar, { value: query, onChange: (e) => {
                        setQuery(e.target.value);
                        setSelected(null);
                    }, onKeyDown: handleKeyDown, placeholder: "Search from API...", "aria-autocomplete": "list", "aria-controls": listboxId, "aria-activedescendant": activeIndex >= 0 ? `option-${results[activeIndex].id}` : undefined, className: searchBarClassName, inputClassName: inputClassName }) }), isLoading && (loadingIndicator ? (_jsx("div", { className: loadingIndicatorClassName, children: loadingIndicator })) : (_jsx(LoadingIndicator, { message: "Searching...", className: loadingIndicatorClassName }))), !isLoading && query && !selected && results.length === 0 && (_jsx(EmptyStateMessage, { message: "No results found for your search." })), !isLoading && query && results.length > 0 && (_jsx("ul", { id: listboxId, role: "listbox", className: clsx(resultsListClassName, "border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100 mt-2"), children: results.map((item, index) => (_jsx("li", { role: "option", "aria-selected": index === activeIndex, className: clsx(resultItemClassName, "px-4 py-2 cursor-pointer hover:bg-blue-50 focus:bg-blue-100 transition"), onMouseDown: () => handleSelect(item), children: item.label }, item.id))) })), selected && (_jsxs("p", { className: selectedTextClassName, children: ["You selected: ", _jsx("strong", { children: selected.label })] }))] }));
};
