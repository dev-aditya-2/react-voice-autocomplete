import React, { useEffect, useRef, useState } from "react";
import { SearchBar } from "@/components/molecules/SearchBar";

type Suggestion = {
  id: string;
  label: string;
};

const mockFetch = async (query: string): Promise<Suggestion[]> => {
  const mockData = [
    { id: "1", label: "Apple" },
    { id: "2", label: "Banana" },
    { id: "3", label: "Cherry" },
    { id: "4", label: "Date" },
    { id: "5", label: "Elderberry" },
  ];
  return mockData.filter((item) =>
    item.label.toLowerCase().includes(query.toLowerCase())
  );
};

type SearchWithMockAutocompleteProps = {
  fetchSuggestions?: (query: string) => Promise<Suggestion[]>;
};

export const SearchWithMockAutocomplete: React.FC<
  SearchWithMockAutocompleteProps
> = ({ fetchSuggestions = mockFetch }) => {
  const justSelectedRef = useRef(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState<Suggestion | null>(null);

  // useEffect(() => {
  //   if (!query) return setResults([]);

  //   const delayDebounce = setTimeout(() => {
  //     fetchSuggestions(query).then(setResults);
  //   }, 300);

  //   return () => clearTimeout(delayDebounce);
  // }, [query]);

useEffect(() => {
  if (!query || justSelectedRef.current) {
    justSelectedRef.current = false;
    return;
  }

  const delayDebounce = setTimeout(() => {
    fetchSuggestions(query).then(setResults);
  }, 300);

  return () => clearTimeout(delayDebounce);
}, [query]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      setSelected(results[activeIndex]);
    }
  };

  const handleSelect = (item: Suggestion) => {
    justSelectedRef.current = true;
    setSelected(item);
    setQuery(item.label);
    setResults([]);
    setActiveIndex(-1); 
  };

return (
  <div className="w-full max-w-md space-y-4">
    <div className="relative">
      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder="Search for fruits..."
        onKeyDown={handleKeyDown}
      />
      {results.length > 0 && (
        <ul className="absolute left-0 right-0 z-10 mt-1 border border-gray-300 bg-white rounded-md shadow-md max-h-60 overflow-y-auto">
          {results.map((result, index) => (
            <li
              key={result.id}
              className={`px-4 py-2 cursor-pointer ${
                index === activeIndex ? "bg-blue-100" : ""
              }`}
              onMouseDown={() => handleSelect(result)}
            >
              {result.label}
            </li>
          ))}
        </ul>
      )}
    </div>

    {selected && (
      <p className="text-gray-700">
        You selected: <strong>{selected.label}</strong>
      </p>
    )}
  </div>
);

};
