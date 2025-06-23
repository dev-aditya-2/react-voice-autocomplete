"use client";

import { Heading } from "@/components/atoms/Heading";
import { SearchWithApiAutocomplete } from "@/components/organisms/searchWithApi/SearchWithApiAutocomplete";
import { SearchWithMockAutocomplete } from "@/components/organisms/searchWithMock/SearchWithMockAutocomplete";

export default function Home() {
  return (
    <main className="p-8">
      {/* Centered Main Heading */}
      <div className="text-center mb-12">
        <Heading level={1}>Next.js Search/Autocomplete Plugin</Heading>
      </div>

      {/* Columns layout for features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {/* Feature 1 */}
        <div className="space-y-4">
          <Heading level={3}>Feature 1: Autocomplete search with mock data</Heading>
          <SearchWithMockAutocomplete />
        </div>

        {/* Future Features — Placeholder */}
        
        <div className="space-y-4">
          <Heading level={3}>Feature 2: Autocomplete search using internal API</Heading>
          <SearchWithApiAutocomplete />
        </div>
       
      </div>
    </main>
  );
}
