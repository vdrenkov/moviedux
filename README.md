# Moviedux

Interactive movie explorer built with React. Search, filter, and browse movies, then curate a personal watchlist that syncs across the app.

## Features

- Search bar with live filtering across the loaded catalog.
- Genre and rating filters to quickly narrow the list.
- Watchlist management with clear empty-state messaging.
- Responsive card grid with graceful image fallbacks.

## Getting Started

```bash
npm install
npm start
```

The development server runs at <http://localhost:3000>. The watchlist relies on local component state; no backend is required.

## Available Scripts

| Command          | Description                                             |
| ---------------- | ------------------------------------------------------- |
| `npm start`      | Launches the development server.                        |
| `npm run build`  | Produces an optimized production build in `build/`.     |
| `npm test`       | Runs the CRA test runner.                               |
| `npm run lint`\* | Suggested custom script: `eslint src --max-warnings=0`. |

> \*Add to `package.json` if you want a dedicated lint script.

## Quality Checks

- ESLint is configured with `react-app` defaults and JSX-aware parser settings (`.eslintrc`).
- Production build is verified with `npm run build`.

## Project Structure

```
public/          # Static assets (HTML, images, manifest)
src/
  components/    # UI building blocks such as MovieCard, MoviesGrid, Watchlist
  styles.css     # Shared component styling
  App.js         # Router + page composition
  index.js       # Entry point
```

## License

This project exists solely for personal use, portfolio presentation, and skill showcasing. Original course materials and inspiration come from the Udemy course **“React 18/19 Course 2025 - Learn JS the Fast Way” by Jannick Leismann** — credit to the instructor and platform for the foundational content.
