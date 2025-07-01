import React from "react";
type Suggestion = {
    id: string;
    label: string;
};
type SearchWithFuseSearchAutocompleteProps = {
    fetchSuggestions?: (query: string) => Promise<Suggestion[]>;
    placeholder?: string;
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
 * Headless SearchWithFuseSearchAutocomplete: No default styles, only logic and structure.
 * - containerClassName: for the search bar wrapper
 * - searchBarClassName: for the search bar
 * - resultsListClassName: for the results list
 * - selectedTextClassName: for the selected text
 */
export declare const SearchWithFuseSearchAutocomplete: React.FC<SearchWithFuseSearchAutocompleteProps>;
export {};
