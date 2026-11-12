# Moviedux

Responsive movie explorer built with React, TypeScript and React Router.

[Open Moviedux](https://moviedux-vdrenkov.netlify.app/)

## Features

- Search a curated collection and combine genre and rating filters.
- Save movies to a watchlist that persists across reloads and updates across tabs.
- Recover from unreadable or unavailable browser storage.
- Use labelled controls, keyboard navigation and responsive layouts.

## Setup

Use Node 26.13.1 and npm 12.2.2.

```bash
npm ci
npm run dev
```

Vite serves the application at <http://localhost:5173>. No API keys or backend are required.

## Verification

```bash
npm run check
npm audit --audit-level=low
```

The check runs formatting, a strict TypeScript build and Vitest unit/component tests.
Use `npm run format` to format files and `npm run preview` to preview the production build.
CI runs the same checks on pushes and pull requests.

## Limitations

The bundled catalog contains 20 fictional movies and illustrative ratings; it is not a live movie
database or streaming service. Watchlists stay in this browser and are not linked to an account.
Clearing site data removes saved movies. If storage is blocked or full, changes remain available
only for the current visit and the application displays a notice.

## Deployment

In Netlify, use production branch `master`, an empty base directory, build command `npm run build`,
publish directory `dist` and `NPM_VERSION=12.2.2`. Node is pinned in `.nvmrc`. No application
environment variables are required. The included redirect serves client routes such as `/watchlist`;
the headers file sets security headers and caches hashed build assets.

## Acknowledgments

Based on Jannick Leismann’s Udemy course “React 18/19 Course 2025 - Learn JS the Fast Way”,
including its supplied movie artwork and branding. This is a personal portfolio project and is not
for redistribution.
