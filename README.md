# Moviedux

Responsive movie explorer built with React, TypeScript and React Router.

[Open Moviedux](https://moviedux-vdrenkov.netlify.app/)

## Features

- Search a curated collection and combine genre and rating filters.
- Save movies to a watchlist that persists across reloads and updates across tabs.
- Use labelled controls, keyboard navigation and responsive layouts.

## Setup

Use Node 26.13.1 and npm 12.2.2.

```bash
npm ci
npm run dev
```

Vite serves the application at <http://localhost:5173>. No API keys or backend are required.

To preview a production build:

```bash
npm run build
npm run preview
```

## Verification

```bash
npm run check
npm audit --audit-level=low
```

The check runs formatting, a strict TypeScript build and Vitest unit/component tests.
CI runs the same checks and audit on pushes and pull requests. Use `npm run format` to format files.

## Limitations

The catalog contains 20 fictional movies and illustrative ratings. Watchlists stay in this browser,
without accounts or cloud sync. Clearing site data removes saved movies. If storage is blocked or
full, the application displays a notice and keeps changes only for the current visit.

## Acknowledgments

Based on Jannick Leismann’s Udemy course “React 18/19 Course 2025 - Learn JS the Fast Way”,
including its supplied movie artwork and branding. This is a personal portfolio project and is not
for redistribution.
