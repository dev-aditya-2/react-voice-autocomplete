# react-voice-autocomplete

React autocomplete components with both voice and manual (typed) search support, including Algolia, Meilisearch, Fuse.js, API, and mock data options. Now fully headless and UI-configurable from your app!

---

## Features
- 🔎 Manual (typed) search autocomplete
- 🎤 Voice search autocomplete (speech-to-text)
- ⚡ Plug-and-play components for Algolia, Meilisearch, Fuse.js, API, and mock data
- 🟢 Written in TypeScript
- 🧩 **Headless & fully configurable UI**: All classes and UI elements are controlled from your app
- 🎨 Modern, accessible, and beautiful by default

---

## Installation

```bash
npm install react-voice-autocomplete
# or
yarn add react-voice-autocomplete
```

> **Note:** You must also install [lucide-react](https://www.npmjs.com/package/lucide-react) in your project, as it is a peer dependency:
> ```bash
> npm install lucide-react
> ```

---

## Usage Example

```tsx
import {
  SearchWithAlgoliaAutocomplete,
  SearchWithMeilisearchAutocomplete,
  SearchWithApiAutocomplete,
  SearchWithFuseSearchAutocomplete,
  SearchWithFusePlusVoiceSearchAutocomplete,
  SearchWithMockAutocomplete,
} from 'react-voice-autocomplete';

function App() {
  return (
    <div>
      <SearchWithAlgoliaAutocomplete
        appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}
        searchKey={process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY}
        containerClassName="..."
        searchBarClassName="..."
        inputClassName="..."
        resultsListClassName="..."
        resultItemClassName="..."
        selectedItemClassName="..."
        loadingIndicatorClassName="..."
        loadingIndicator={<div>Loading...</div>}
      />
      <SearchWithMeilisearchAutocomplete
        host={process.env.NEXT_PUBLIC_MEILISEARCH_HOST}
        apiKey={process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY}
        // ...same UI props as above
      />
      {/* Other autocomplete variants... */}
    </div>
  );
}
```

---

## Environment Variables

Create a `.env` or `.env.example` file with the following for Algolia and Meilisearch:

```env
# Algolia
NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_algolia_search_key

# Meilisearch
NEXT_PUBLIC_MEILISEARCH_HOST=https://your-meilisearch-instance.com
NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY=your_meilisearch_search_key
```

---

## Headless & Configurable UI Props
All autocomplete components accept the following props for full UI control:

- `containerClassName` – Wrapper for the search bar and mic button
- `searchBarClassName` – Wrapper for the input and search icon
- `inputClassName` – The input field
- `resultsListClassName` – The dropdown list
- `resultItemClassName` – Each dropdown item
- `selectedItemClassName` – The selected item card
- `micButtonClassName` – The mic button (if voice search is enabled)
- `voiceWrapperClassName` – Wrapper for the mic button
- `loadingIndicatorClassName` – Style the default loading indicator
- `loadingIndicator` – Pass a custom React node for the loading indicator

**Movie-specific (Algolia/Meilisearch):**
- Movie cards show poster, title, release date, genres, rating, and cast (Algolia)
- All card and dropdown item layouts are fully styleable from your app

---

## Example: Customizing the UI

```tsx
<SearchWithMeilisearchAutocomplete
  host={process.env.NEXT_PUBLIC_MEILISEARCH_HOST}
  apiKey={process.env.NEXT_PUBLIC_MEILISEARCH_SEARCH_KEY}
  containerClassName="rounded-lg shadow p-4 bg-white"
  inputClassName="border-none focus:ring-2 focus:ring-blue-500"
  resultsListClassName="rounded-lg shadow-lg mt-2"
  resultItemClassName="gap-4 hover:bg-blue-50"
  selectedItemClassName="max-w-xl mx-auto bg-white border shadow-lg"
  loadingIndicator={
    <div className="flex items-center justify-center gap-2 py-4 text-blue-600">
      <svg className="animate-spin h-5 w-5 text-blue-400" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
      </svg>
      <span>Searching...</span>
    </div>
  }
/>
```

---

## License
MIT
