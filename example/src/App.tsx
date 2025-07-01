import { useState } from "react";
import {
  SearchWithMockAutocomplete,
  SearchWithApiAutocomplete,
  SearchWithFuseSearchAutocomplete,
  SearchWithAlgoliaAutocomplete,
  SearchWithFusePlusVoiceSearchAutocomplete,
  SearchWithMeilisearchAutocomplete,
} from '../../dist';
import { TabButton } from "./components/atoms/TabButton";

// Mock data for demo
const todos = [
  { id: "1", label: "Buy groceries" },
  { id: "2", label: "Walk the dog" },
  { id: "3", label: "Read a book" },
  { id: "4", label: "Write code" },
];

// Custom fetch for mock
const fetchTodoSuggestions = async (query: string) =>
  todos.filter((todo) =>
    todo.label.toLowerCase().includes(query.toLowerCase())
  );

// Custom fetch for API (simulate async)
const fetchApiSuggestions = async (query: string): Promise<{ id: string; label: string }[]> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          todos.filter((todo) =>
            todo.label.toLowerCase().includes(query.toLowerCase())
          )
        ),
      300
    )
  );

// Custom fetch for Fuse (simulate async)
const fetchFuseSuggestions = async (query: string): Promise<{ id: string; label: string }[]> =>
  new Promise((resolve) =>
    setTimeout(
      () =>
        resolve(
          todos.filter((todo) =>
            todo.label.toLowerCase().includes(query.toLowerCase())
          )
        ),
      300
    )
  );

function App() {
  const [activeTab, setActiveTab] = useState("mock");

  const tabs = [
    { key: "mock", label: "Mock" },
    { key: "api", label: "API" },
    { key: "fuse", label: "Fuse.js" },
    { key: "algolia", label: "Algolia" },
    { key: "fuseVoice", label: "Fuse.js + Voice Search" },
    { key: "meili", label: "Meilisearch" },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl space-y-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Autocomplete Demo
        </h1>
        <div className="flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <TabButton
              key={tab.key}
              label={tab.label}
              isActive={activeTab === tab.key}
              onClick={() => setActiveTab(tab.key)}
            />
          ))}
        </div>

        <div className="p-6 bg-white rounded-xl shadow-md border space-y-4">
          {activeTab === "mock" && (
            <>
              <h2 className="text-xl font-semibold text-gray-700">
                Mock Search (Custom Data)
              </h2>
              <SearchWithMockAutocomplete
                fetchSuggestions={fetchTodoSuggestions}
                containerClassName="relative flex items-center gap-2 rounded-md px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-400"
                searchBarClassName="flex items-center"
                inputClassName="flex-1 h-12 px-3 py-2 text-sm text-gray-800 bg-white rounded-md focus:outline-none placeholder-gray-400 transition duration-150 border-none shadow-none"
                resultsListClassName="border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100 mt-2"
                selectedTextClassName="text-red-700 mt-2"
                micButtonClassName="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-blue-200"
                voiceWrapperClassName="flex items-center"                resultItemClassName="gap-4"
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
            </>
          )}

          {activeTab === "api" && (
            <>
              <h2 className="text-xl font-semibold text-gray-700">
                API Search (Simulated)
              </h2>
              <SearchWithApiAutocomplete
                fetchSuggestions={fetchApiSuggestions}
                containerClassName="relative flex items-center gap-2 rounded-md px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-400"
                searchBarClassName="flex items-center"
                inputClassName="flex-1 h-12 px-3 py-2 text-sm text-gray-800 bg-white rounded-md focus:outline-none placeholder-gray-400 transition duration-150 border-none shadow-none"
                resultsListClassName="border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100 mt-2"
                selectedTextClassName="text-green-700 mt-2"
                micButtonClassName="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-blue-200"
                voiceWrapperClassName="flex items-center"                resultItemClassName="gap-4"
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
            </>
          )}

          {activeTab === "fuse" && (
            <>
              <h2 className="text-xl font-semibold text-gray-700">
                Fuse.js Search (Simulated)
              </h2>
              <SearchWithFuseSearchAutocomplete
                fetchSuggestions={fetchFuseSuggestions}
                containerClassName="relative flex items-center gap-2 rounded-md px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-400"
                searchBarClassName="flex items-center"
                inputClassName="flex-1 h-12 px-3 py-2 text-sm text-gray-800 bg-white rounded-md focus:outline-none placeholder-gray-400 transition duration-150 border-none shadow-none"
                resultsListClassName="border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100 mt-2"
                selectedTextClassName="text-blue-700 mt-2"
                micButtonClassName="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-blue-200"
                voiceWrapperClassName="flex items-center"                resultItemClassName="gap-4"
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
            </>
          )}

          {activeTab === "fuseVoice" && (
            <>
              <h2 className="text-xl font-semibold text-gray-700">
                Fuse.js + Voice Search
              </h2>
              <SearchWithFusePlusVoiceSearchAutocomplete
                containerClassName="relative flex items-center gap-2 rounded-md px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-400"
                searchBarClassName="flex items-center"
                inputClassName="flex-1 h-12 px-3 py-2 text-sm text-gray-800 bg-white rounded-md focus:outline-none placeholder-gray-400 transition duration-150 border-none shadow-none"
                resultsListClassName="border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100 mt-2"
                selectedTextClassName="text-yellow-700 mt-2"
                micButtonClassName="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-blue-200"
                voiceWrapperClassName="flex items-center"
                resultItemClassName="gap-4"
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
            </>
          )}

          {activeTab === "algolia" && (
            <>
              <h2 className="text-xl font-semibold text-gray-700">
                Algolia Search
              </h2>
              <SearchWithAlgoliaAutocomplete
                appId={import.meta.env.VITE_ALGOLIA_APP_ID}
                searchKey={import.meta.env.VITE_ALGOLIA_SEARCH_KEY}
                containerClassName="relative flex items-center gap-2 rounded-md px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-400"
                searchBarClassName="flex items-center"
                inputClassName="flex-1 h-12 px-3 py-2 text-sm text-gray-800 bg-white rounded-md focus:outline-none placeholder-gray-400 transition duration-150 border-none shadow-none"
                resultsListClassName="border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100 mt-2"
                selectedTextClassName="text-purple-700 mt-2"
                micButtonClassName="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-blue-200"
                voiceWrapperClassName="flex items-center"
                resultItemClassName="gap-4"
                loadingIndicator={
                  <div className="flex items-center justify-center gap-2 py-4 text-blue-600">
                    <svg className="animate-spin h-5 w-5 text-blue-400" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    <span>Searching...</span>
                  </div>
                }
                selectedItemClassName="max-w-xl mx-auto bg-white"
              />
            </>
          )}

          {activeTab === "meili" && (
            <>
              <h2 className="text-xl font-semibold text-gray-700">
                Meilisearch Search
              </h2>
              <SearchWithMeilisearchAutocomplete
                host={import.meta.env.VITE_MEILISEARCH_HOST}
                apiKey={import.meta.env.VITE_MEILISEARCH_SEARCH_KEY}
                containerClassName="relative flex items-center gap-2 rounded-md px-3 py-2 w-full focus-within:ring-2 focus-within:ring-blue-400"
                searchBarClassName="flex items-center"
                inputClassName="flex-1 h-12 px-3 py-2 text-sm text-gray-800 bg-white rounded-md focus:outline-none placeholder-gray-400 transition duration-150 border-none shadow-none"
                resultsListClassName="border rounded-md shadow bg-white max-h-60 overflow-y-auto divide-y divide-gray-100 mt-2"
                selectedTextClassName="text-pink-700 mt-2"
                micButtonClassName="w-12 h-12 flex items-center justify-center rounded-full bg-gray-200 p-2 text-gray-700 hover:bg-blue-200"
                voiceWrapperClassName="flex items-center"
                resultItemClassName="gap-4"
                loadingIndicator={
                  <div className="flex items-center justify-center gap-2 py-4 text-blue-600">
                    <svg className="animate-spin h-5 w-5 text-blue-400" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"/>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                    </svg>
                    <span>Searching...</span>
                  </div>
                }
                selectedItemClassName="max-w-xl mx-auto bg-white"
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
