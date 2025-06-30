import React from "react";
type Suggestion = {
    id: string;
    label: string;
};
type SearchWithFuseSearchAutocompleteProps = {
    fetchSuggestions?: (query: string) => Promise<Suggestion[]>;
    placeholder?: string;
};
export declare const SearchWithFuseSearchAutocomplete: React.FC<SearchWithFuseSearchAutocompleteProps>;
export {};
