import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { SearchBar } from "../../molecules/SearchBar";
import { LoadingIndicator } from "../../atoms/LoadingIndicator";
import { EmptyStateMessage } from "../../atoms/EmptyStateMessage";
const mockFetch = async (query) => {
    const mockData = [
        { id: "1", label: "Apple" },
        { id: "2", label: "Banana" },
        { id: "3", label: "Cherry" },
        { id: "4", label: "Date" },
        { id: "5", label: "Elderberry" },
    ];
    return mockData.filter((item) => item.label.toLowerCase().includes(query.toLowerCase()));
};
export const SearchWithMockAutocomplete = ({ fetchSuggestions = mockFetch, placeholder = "Search for fruits..." }) => {
    const justSelectedRef = useRef(false);
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [activeIndex, setActiveIndex] = useState(-1);
    const [selected, setSelected] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
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
    const handleSelect = (item) => {
        justSelectedRef.current = true;
        setSelected(item);
        setQuery(item.label);
        setResults([]);
        setActiveIndex(-1);
    };
    const listboxId = "autocomplete-options";
    return (_jsxs("div", { className: "w-full max-w-md space-y-4", role: "combobox", "aria-haspopup": "listbox", "aria-owns": listboxId, "aria-expanded": results.length > 0, children: [_jsxs("div", { className: "relative", children: [_jsx(SearchBar, { value: query, onChange: (e) => {
                            setQuery(e.target.value);
                            setSelected(null);
                        }, placeholder: placeholder, onKeyDown: handleKeyDown, "aria-autocomplete": "list", "aria-controls": listboxId, "aria-activedescendant": activeIndex >= 0 ? `option-${results[activeIndex].id}` : undefined }), isLoading && _jsx(LoadingIndicator, { message: "Searching..." }), !isLoading && query && !selected && results.length === 0 && (_jsx(EmptyStateMessage, { message: "No results found for your search." })), !isLoading && query && results.length > 0 && (_jsx("ul", { id: listboxId, role: "listbox", className: "border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100", children: results.map((fruit, index) => (_jsx("li", { role: "option", "aria-selected": index === activeIndex, className: clsx("px-4 py-2 text-sm text-gray-700 cursor-pointer transition-colors", index === activeIndex
                                ? "bg-blue-100 font-medium"
                                : "hover:bg-gray-100"), onMouseDown: () => handleSelect(fruit), children: fruit.label }, fruit.id))) }))] }), selected && (_jsxs("p", { className: "text-gray-700", children: ["You selected: ", _jsx("strong", { children: selected.label })] }))] }));
};
