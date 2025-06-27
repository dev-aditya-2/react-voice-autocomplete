type Suggestion = {
    id: string;
    label: string;
};
type SearchWithMockAutocompleteProps = {
    fetchSuggestions?: (query: string) => Promise<Suggestion[]>;
};
export declare const SearchWithMockAutocomplete: React.FC<SearchWithMockAutocompleteProps>;
export {};
