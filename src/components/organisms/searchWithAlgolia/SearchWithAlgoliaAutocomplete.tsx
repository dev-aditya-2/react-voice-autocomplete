"use client";

import React, { useEffect, useRef, useState } from "react";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import { Flame, Star } from "lucide-react";
import { VoiceSearchInput } from "../VoiceSearchInput";
import { EmptyStateMessage } from "../../atoms/EmptyStateMessage";
import clsx from "clsx";
import { VoiceErrorBanner } from "../../atoms/VoiceErrorBanner";
import { LoadingIndicator } from "../../atoms/LoadingIndicator";
import { SearchBar } from "../../molecules/SearchBar";

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

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
);

const index = "algolia_movie_sample_dataset";

export const SearchWithAlgoliaAutocomplete: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [results, setResults] = useState<Suggestion[]>([]);
  const [selected, setSelected] = useState<Suggestion | null>(null);
  const [inputMode, setInputMode] = useState<"manual" | "voice">("manual");
  const [isLoading, setIsLoading] = useState(false);
  const [voiceError, setVoiceError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const suppressSearchRef = useRef(false);
  const justSelectedRef = useRef(false);
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
    debounceRef.current = setTimeout(() => {
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
      className="w-full max-w-md space-y-4"
      role="combobox"
      aria-haspopup="listbox"
      aria-owns={listboxId}
      aria-expanded={results.length > 0}
    >
      <div className="relative flex gap-2 items-center">
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
        />
        <VoiceSearchInput
          onResult={(text) => {
            setInputValue(text);
            setSelected(null);
            setInputMode("voice");
          }}
          onError={(err) => setVoiceError(err)}
        />
      </div>

      {voiceError && <VoiceErrorBanner message={voiceError} />}
      {isLoading && <LoadingIndicator message="Searching..." />}
      {showEmptyState && (
        <EmptyStateMessage message="No results found for your search." />
      )}
      {voiceError && <VoiceErrorBanner message={voiceError} />}

      {!isLoading && results.length > 0 && (
        <ul className="left-0 right-0 z-10 mt-1 border border-gray-300 bg-white rounded-md shadow-md max-h-60 overflow-y-auto">
          {results.map((result, index) => (
            <li
              key={result.objectID}
              className={clsx(
                "px-4 py-2 text-sm text-gray-700 cursor-pointer transition-colors",
                index === activeIndex
                  ? "bg-blue-100 font-medium"
                  : "hover:bg-gray-100"
              )}
              onClick={() => handleSelect(result)}
            >
              <img
                src={result.poster_path}
                alt={result.title}
                className="w-16 h-24 object-cover rounded"
              />
              <div className="flex-1">
                <h3 className="text-md font-semibold">{result.title}</h3>
                <p className="text-sm text-gray-600">{result.release_date}</p>
                <p className="text-sm mt-1 text-gray-700 line-clamp-2">
                  {result.overview}
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400" />{" "}
                    {result.vote_average}
                  </span>
                  <span className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-red-500" />{" "}
                    {Math.round(result.popularity)}
                  </span>
                  {result.genres.map((genre) => (
                    <span
                      key={genre}
                      className="px-2 py-0.5 bg-gray-200 rounded"
                    >
                      {genre}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {selected && (
        <div className="mt-6 flex gap-4 items-start p-4 border border-gray-200 rounded-md bg-gray-50">
          <img
            src={selected.poster_path}
            alt={selected.title}
            className="w-28 h-auto rounded-md object-cover shadow"
          />
          <div>
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
