import React from "react";
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
export declare const SearchWithAlgoliaAutocomplete: React.FC<SearchWithAlgoliaAutocompleteProps>;
export {};
