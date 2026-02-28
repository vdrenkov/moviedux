# Moviedux

Interactive movie explorer built with React. Search, filter, and browse movies, then curate a personal watchlist that syncs across the app.

## Features

- Search bar with live filtering across the loaded catalog.
- Genre and rating filters to quickly narrow the list.
- Watchlist management with clear empty-state messaging.
- Responsive card grid with graceful image fallbacks.
- Route-safe public asset loading on nested routes.
- SEO and social metadata (canonical URL, Open Graph, Twitter cards, WebSite JSON-LD).
- Indexing support via `robots.txt` and `sitemap.xml`.
- PWA metadata via `manifest.webmanifest`.

## Getting Started

```bash
npm install
npm run dev
```

The development server runs at <http://localhost:5173> by default. The watchlist relies on local component state; no backend is required.

## Available Scripts

| Command         | Description                                  |
| --------------- | -------------------------------------------- |
| `npm run dev`   | Launches the Vite development server.        |
| `npm run build` | Produces an optimized production build in `dist/`. |
| `npm run preview` | Serves the production build locally.       |
| `npm run lint`  | Runs ESLint on the project.                  |
| `npm run test`  | Runs Vitest in watch mode.                   |
| `npm run test:run` | Runs Vitest once for CI/local verification. |

## Quality Checks

- ESLint 9 flat config (`eslint.config.js`) with React hooks and refresh rules.
- Vitest + React Testing Library tests in `src/test/unit`, covering both component behavior and app-level routing/watchlist flows (via `App.test.jsx`).
- Production build is verified with `npm run build`.

## Project Structure

```
public/          # Static assets (images, manifest, robots, sitemap)
src/
  components/    # UI building blocks such as MovieCard, MoviesGrid, Watchlist
  test/
    setup.js     # Test environment setup (@testing-library/jest-dom)
    unit/        # Centralized test suite (component + app-flow coverage)
  styles.css     # Shared component styling
  App.jsx        # App layout + routes
  main.jsx       # Vite entry point
index.html       # Root HTML template + SEO metadata
vite.config.js   # Vite configuration
vitest.config.js # Vitest configuration
```

For Netlify deployments, `public/_redirects` is included to ensure SPA routes (e.g. `/watchlist`) resolve to `index.html`.

## Tech Stack

- React 19
- React Router 7 (`react-router`)
- Vite 7
- ESLint 9 (flat config)
- Vitest 4 + React Testing Library

## License

This project exists solely for personal use, portfolio presentation, and skill showcasing. Original course materials and inspiration come from the Udemy course **“React 18/19 Course 2025 - Learn JS the Fast Way” by Jannick Leismann** — credit to the instructor and platform for the foundational content.
