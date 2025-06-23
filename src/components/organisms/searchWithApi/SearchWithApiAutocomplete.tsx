"use client";
import React, { useEffect, useRef, useState } from "react";

type Suggestion = {
  id: string;
  label: string;
};

export const SearchWithApiAutocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const justSelectedRef = useRef(false);

  const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
    const res = await fetch(`/api/suggestions?q=${query}`);
    return res.json();
  };

  const handleSelect = (item: Suggestion) => {
    justSelectedRef.current = true;
    setSelected(item);
    setQuery(item.label);
    setResults([]);
    setActiveIndex(-1);
  };

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
      handleSelect(results[activeIndex]);
    }
  };

  return (
    <div className="w-full max-w-md space-y-4">
      <div className="relative">
        <input
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search fruits from API..."
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
