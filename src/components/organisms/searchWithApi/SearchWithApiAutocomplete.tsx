"use client";

import React, { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { SearchBar } from "../../molecules/SearchBar";
import { LoadingIndicator } from "../../atoms/LoadingIndicator";
import { EmptyStateMessage } from "../../atoms/EmptyStateMessage";

type Suggestion = {
  id: string;
  label: string;
};

type SearchWithApiAutocompleteProps = {
  apiUrl?: string;
  fetchSuggestions?: (query: string) => Promise<Suggestion[]>;
};

export const SearchWithApiAutocomplete: React.FC<SearchWithApiAutocompleteProps> = ({
  apiUrl = "/api/suggestions",
  fetchSuggestions: customFetchSuggestions,
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const justSelectedRef = useRef(false);

  const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
    if (customFetchSuggestions) return customFetchSuggestions(query);
    const res = await fetch(`${apiUrl}?q=${query}`);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      handleSelect(results[activeIndex]);
    }
  };

  const listboxId = "api-autocomplete-options";

  return (
    <div
      className="w-full max-w-md space-y-4"
      role="combobox"
      aria-haspopup="listbox"
      aria-owns={listboxId}
      aria-expanded={results.length > 0}
    >
      <div className="relative">
        <SearchBar
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search from API..."
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? `option-${results[activeIndex].id}` : undefined
          }
        />
        {isLoading && <LoadingIndicator message="Searching..." />}
        {!isLoading && query && !selected && results.length === 0 && (
          <EmptyStateMessage message="No results found for your search." />
        )}

        {!isLoading && query && results.length > 0 && (
          <ul
            id={listboxId}
            role="listbox"
            className="border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100"
          >
            {results.map((item, index) => (
              <li
                key={item.id}
                role="option"
                aria-selected={index === activeIndex}
                className={clsx(
                  "px-4 py-2 text-sm text-gray-700 cursor-pointer transition-colors",
                  index === activeIndex
                    ? "bg-blue-100 font-medium"
                    : "hover:bg-gray-100"
                )}
                onMouseDown={() => handleSelect(item)}
              >
                {item.label}
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
