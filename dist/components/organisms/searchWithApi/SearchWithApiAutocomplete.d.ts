import React from "react";
type Suggestion = {
    id: string;
    label: string;
};
type SearchWithApiAutocompleteProps = {
    apiUrl?: string;
    fetchSuggestions?: (query: string) => Promise<Suggestion[]>;
};
export declare const SearchWithApiAutocomplete: React.FC<SearchWithApiAutocompleteProps>;
export {};
