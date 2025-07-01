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
  containerClassName?: string;
  searchBarClassName?: string;
  inputClassName?: string;
  resultsListClassName?: string;
  selectedTextClassName?: string;
  micButtonClassName?: string;
  voiceWrapperClassName?: string;
  resultItemClassName?: string;
  loadingIndicatorClassName?: string;
  loadingIndicator?: React.ReactNode;
};

/**
 * Headless SearchWithApiAutocomplete: No default styles, only logic and structure.
 * - containerClassName: for the search bar wrapper
 * - searchBarClassName: for the search bar
 * - resultsListClassName: for the results list
 * - selectedTextClassName: for the selected text
 */
export const SearchWithApiAutocomplete: React.FC<SearchWithApiAutocompleteProps> = ({
  apiUrl = "/api/suggestions",
  fetchSuggestions: customFetchSuggestions,
  containerClassName = "",
  searchBarClassName = "",
  inputClassName = "",
  resultsListClassName = "",
  selectedTextClassName = "",
  micButtonClassName = "",
  voiceWrapperClassName = "",
  resultItemClassName = "",
  loadingIndicatorClassName = "",
  loadingIndicator,
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
      role="combobox"
      aria-haspopup="listbox"
      aria-owns={listboxId}
      aria-expanded={results.length > 0}
    >
      <div className={containerClassName}>
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
          className={searchBarClassName}
          inputClassName={inputClassName}
        />
      </div>
      {isLoading && (
        loadingIndicator ? (
          <div className={loadingIndicatorClassName}>{loadingIndicator}</div>
        ) : (
          <LoadingIndicator message="Searching..." className={loadingIndicatorClassName} />
        )
      )}
      {!isLoading && query && !selected && results.length === 0 && (
        <EmptyStateMessage message="No results found for your search." />
      )}
      {!isLoading && query && results.length > 0 && (
        <ul
          id={listboxId}
          role="listbox"
          className={clsx(
            resultsListClassName,
            "border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100 mt-2"
          )}
        >
          {results.map((item, index) => (
            <li
              key={item.id}
              role="option"
              aria-selected={index === activeIndex}
              className={clsx(
                resultItemClassName,
                "px-4 py-2 cursor-pointer hover:bg-blue-50 focus:bg-blue-100 transition"
              )}
              onMouseDown={() => handleSelect(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      )}
      {selected && (
        <p className={selectedTextClassName}>
          You selected: <strong>{selected.label}</strong>
        </p>
      )}
    </div>
  );
};
