import React from "react";
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
export declare const SearchWithApiAutocomplete: React.FC<SearchWithApiAutocompleteProps>;
export {};
