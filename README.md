# Next.js Search Autocomplete

This is a [Next.js](https://nextjs.org) project featuring multiple search/autocomplete implementations, including Algolia, API, Fuse.js, and Mock data, with optional Voice Search integration.

## Getting Started

1. **Install dependencies:**

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

2. **Set up environment variables:**

Create a `.env` file in the root directory. If you want to share your setup, copy `.env.example` and fill in your real values.

```
cp .env.example .env
```

3. **Run the development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Environment Variables

For Algolia search to work, you need the following variables in your `.env` file:

```
NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
NEXT_PUBLIC_ALGOLIA_SEARCH_KEY=your_algolia_search_key
```

> **Note:** Never commit your real `.env` file. Use `.env.example` for sharing variable names only.

## Available Search Components

- **Algolia Search:** `SearchWithAlgoliaAutocomplete`
- **API-based Search:** `SearchWithApiAutocomplete`
- **Fuse.js Search:** `SearchWithFusesearchAutocomplete`, `SearchWithFusePlusVoiceSearchAutocomplete`
- **Mock Search:** `SearchWithMockAutocomplete`
- **Voice Search:** Integrated in some components for speech-to-text input

You can find these components in `src/components/organisms/` and use them in your pages as needed.

## Scripts

- `npm run dev` – Start development server
- `npm run build` – Build for production
- `npm run start` – Start production server
- `npm run lint` – Lint code

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).
