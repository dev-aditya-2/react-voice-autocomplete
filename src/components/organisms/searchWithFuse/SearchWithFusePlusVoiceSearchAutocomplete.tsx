"use client";

import React, { useEffect, useRef, useState } from "react";
import Fuse from "fuse.js";
import { fruits } from "./data";
import { SearchBar } from "@/components/molecules/SearchBar";
import { LoadingIndicator } from "@/components/atoms/LoadingIndicator";
import { VoiceSearchInput } from "../VoiceSearchInput";
import { EmptyStateMessage } from "@/components/atoms/EmptyStateMessage";
import clsx from "clsx";
import { VoiceErrorBanner } from "@/components/atoms/VoiceErrorBanner";

type Fruit = (typeof fruits)[number];

const fuse = new Fuse(fruits, {
  keys: ["name"],
  threshold: 0.3,
});

export const SearchWithFusePlusVoiceSearchAutocomplete: React.FC = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Fruit[]>([]);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [selected, setSelected] = useState<Fruit | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isManuallyEditing, setIsManuallyEditing] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);

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

  const handleSelect = (item: Fruit) => {
    justSelectedRef.current = true;
    setSelected(item);
    setQuery(item.name);
    setResults([]);
    setActiveIndex(-1);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      setActiveIndex((prev) => Math.min(prev + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      setActiveIndex((prev) => Math.max(prev - 1, 0));
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
      <div className="relative flex gap-2 items-center">
        <SearchBar
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setSelected(null);
          }}
          onUserTyping={() => setIsManuallyEditing(true)}
          onKeyDown={handleKeyDown}
          placeholder="Search with fuse search..."
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
          }
        />
        <VoiceSearchInput
          onResult={(text) => {
            if (!isManuallyEditing) {
              setQuery(text);
            }
          }}
          onError={(err) => setVoiceError(err)}
        />
      </div>
      {isLoading && <LoadingIndicator message="Searching..." />}
      {!isLoading && query && !selected && results.length === 0 && (
        <EmptyStateMessage message="No results found for your search." />
      )}

      {voiceError && <VoiceErrorBanner message={voiceError} />}
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
              {fruit.name}
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <p className="text-gray-700">
          You selected: <strong>{selected.name}</strong>
        </p>
      )}
    </div>
  );
};
