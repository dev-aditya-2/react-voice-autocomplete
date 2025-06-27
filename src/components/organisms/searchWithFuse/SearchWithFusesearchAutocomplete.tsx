"use client";

import React, { useEffect, useRef, useState } from "react";
import { EmptyStateMessage } from "@/components/atoms/EmptyStateMessage";
import { LoadingIndicator } from "@/components/atoms/LoadingIndicator";
import { SearchBar } from "@/components/molecules/SearchBar";
import clsx from "clsx";

type Suggestion = {
  id: string;
  label: string;
};

export const SearchWithFuseSearchAutocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const justSelectedRef = useRef(false);
  const fetchSuggestions = async (query: string): Promise<Suggestion[]> => {
    const res = await fetch(`/api/fuse-search?q=${query}`);
    return res.json();
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

  const handleSelect = (item: Suggestion) => {
    setSelected(item);
    setQuery(item.label);
    setResults([]);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && results[activeIndex]) {
      handleSelect(results[activeIndex]);
    }
  };

  const listboxId = "autocomplete-options";
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
          onUserTyping={() => {}}
          placeholder="Search for fruits..."
          onKeyDown={handleKeyDown}
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
            {results.map((fruit, index) => (
              <li
                key={fruit.id}
                role="option"
                aria-selected={index === activeIndex}
                className={clsx(
                  "px-4 py-2 text-sm text-gray-700 cursor-pointer transition-colors",
                  index === activeIndex
                    ? "bg-blue-100 font-medium"
                    : "hover:bg-gray-100"
                )}
                onMouseDown={() => handleSelect(fruit)}
              >
                {fruit.label}
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
