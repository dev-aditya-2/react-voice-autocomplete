# react-voice-autocomplete

React autocomplete components with both voice and manual (typed) search support, including Algolia, Fuse.js, API, and mock data options.

## Features
- 🔎 Manual (typed) search autocomplete
- 🎤 Voice search autocomplete (speech-to-text)
- ⚡ Plug-and-play components for Algolia, Fuse.js, API, and mock data
- 🟢 Written in TypeScript
- 🧩 Easy to integrate into any React project

## Installation

```bash
npm install react-voice-autocomplete
# or
yarn add react-voice-autocomplete
```

## Usage

```tsx
import {
  SearchWithAlgoliaAutocomplete,
  SearchWithApiAutocomplete,
  SearchWithFuseSearchAutocomplete,
  SearchWithFusePlusVoiceSearchAutocomplete,
  SearchWithMockAutocomplete,
  VoiceSearchInput
} from 'react-voice-autocomplete';

function App() {
  return (
    <div>
      <h1>Algolia Autocomplete</h1>
      <SearchWithAlgoliaAutocomplete />

      <h1>API Autocomplete</h1>
      <SearchWithApiAutocomplete />

      <h1>Fuse.js Autocomplete</h1>
      <SearchWithFuseSearchAutocomplete />

      <h1>Fuse.js + Voice Autocomplete</h1>
      <SearchWithFusePlusVoiceSearchAutocomplete />

      <h1>Mock Autocomplete</h1>
      <SearchWithMockAutocomplete />
    </div>
  );
}
```

## Environment Variables (for Algolia)
If you use the Algolia component, add the following to your `.env`:
```
NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_algolia_search_key
```

## License
MIT
