"use client";

import React, { useEffect, useRef, useState } from "react";
import { Flame, Star } from "lucide-react";
import { VoiceSearchInput } from "../VoiceSearchInput";
import { EmptyStateMessage } from "../../atoms/EmptyStateMessage";
import clsx from "clsx";
import { VoiceErrorBanner } from "../../atoms/VoiceErrorBanner";
import { LoadingIndicator } from "../../atoms/LoadingIndicator";
import { SearchBar } from "../../molecules/SearchBar";
import { algoliasearch } from "algoliasearch";

type Suggestion = {
  objectID: string;
  title: string;
  release_date: string;
  overview: string;
  poster_path: string;
  genres: string[];
  cast: { name: string; character: string }[];
  popularity: number;
  vote_average: number;
};

const index = "algolia_movie_sample_dataset";

type SearchWithAlgoliaAutocompleteProps = {
  appId: string;
  searchKey: string;
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
  selectedItemClassName?: string;
};

/**
 * Headless SearchWithAlgoliaAutocomplete: No default styles, only logic and structure.
 * - containerClassName: for the search bar wrapper
 * - searchBarClassName: for the search bar
 * - resultsListClassName: for the results list
 * - selectedTextClassName: for the selected result details
 */
export const SearchWithAlgoliaAutocomplete: React.FC<
  SearchWithAlgoliaAutocompleteProps
> = ({
  appId,
  searchKey,
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
  selectedItemClassName = "",
}) => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [inputMode, setInputMode] = useState<"manual" | "voice">("manual");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef<number | null>(null);
  const suppressSearchRef = useRef(false);
  const justSelectedRef = useRef(false);
  const client = algoliasearch(appId, searchKey);

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    setIsLoading(true);
    const results = await client.search<Suggestion>([
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
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      if (inputValue.trim()) {
        search(inputValue);
      } else {
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

  const handleSelect = (item: Suggestion) => {
    suppressSearchRef.current = true;
    justSelectedRef.current = true;
    setSelected(item);
    setInputValue(item.title);
    setInputMode("manual");
    setResults([]);
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
  const showEmptyState =
    !isLoading &&
    !selected &&
    inputValue.trim().length > 0 &&
    results.length === 0 &&
    inputMode === "manual";
  const listboxId = "autocomplete-options";
  return (
    <div
      role="combobox"
      aria-haspopup="listbox"
      aria-owns={listboxId}
      aria-expanded={results.length > 0}
    >
      <div className={containerClassName}>
        <SearchBar
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            setInputMode("manual");
            setSelected(null);
          }}
          onUserTyping={() => {
            setInputMode("manual");
            setSelected(null);
          }}
          onKeyDown={handleKeyDown}
          placeholder="Search with algolia search..."
          aria-autocomplete="list"
          aria-controls={listboxId}
          aria-activedescendant={
            activeIndex >= 0 ? `suggestion-${activeIndex}` : undefined
          }
          className={searchBarClassName}
          inputClassName={inputClassName}
        />
        <VoiceSearchInput
          onResult={(text) => {
            setInputValue(text);
            setSelected(null);
            setInputMode("voice");
          }}
          onError={(err) => setVoiceError(err)}
          micButtonClassName={micButtonClassName}
          wrapperClassName={voiceWrapperClassName}
        />
      </div>

      {voiceError && <VoiceErrorBanner message={voiceError} />}
      {isLoading &&
        (loadingIndicator ? (
          <div className={loadingIndicatorClassName}>{loadingIndicator}</div>
        ) : (
          <LoadingIndicator
            message="Searching..."
            className={loadingIndicatorClassName}
          />
        ))}
      {!isLoading && showEmptyState && (
        <EmptyStateMessage message="No results found for your search." />
      )}
      {voiceError && <VoiceErrorBanner message={voiceError} />}

      {!isLoading && results.length > 0 && (
        <ul
          className={clsx(
            resultsListClassName,
            "border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100 mt-2"
          )}
        >
          {results.map((result, index) => (
            <li
              key={result.objectID}
              className={clsx(
                resultItemClassName,
                "flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-blue-50 focus:bg-blue-100 transition"
              )}
              onClick={() => handleSelect(result)}
            >
              <img
                src={result.poster_path}
                alt={result.title}
                className="w-12 h-16 object-cover rounded flex-shrink-0"
              />
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate">
                  {result.title}
                </div>
                <div className="text-xs text-gray-500">
                  {result.release_date}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div
          className={clsx(
            selectedItemClassName,
            "flex items-start gap-4 mt-4 p-4 border rounded bg-gray-50 shadow-sm max-w-xl"
          )}
        >
          <img
            src={selected.poster_path}
            alt={selected.title}
            className="w-28 h-16 object-cover rounded flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <h2 className="text-xl font-semibold mb-1">{selected.title}</h2>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Release Date:</span>{" "}
              {selected.release_date}
            </p>
            <p className="text-sm text-gray-700">{selected.overview}</p>
            <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-400" />{" "}
                {selected.vote_average}{" "}
              </span>
              <span className="flex items-center gap-1">
                <Flame className="w-4 h-4 text-red-500" />{" "}
                {Math.round(selected.popularity)}
              </span>
              {selected.genres.map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-0.5 bg-gray-200 text-gray-800 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
            <div className="mt-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Cast</h3>
              <ul className="text-sm text-gray-600 space-y-0.5">
                {selected.cast.map((member, index) => (
                  <li key={index}>
                    <span className="font-medium">{member.name}</span> as{" "}
                    {member.character}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
