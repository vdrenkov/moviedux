import catalog from "./movies.json";

export const movies = catalog.map((movie) => ({
  ...movie,
  rating: Number(movie.rating),
}));

export type Movie = (typeof movies)[number];

export interface MovieListProps {
  movies: Movie[];
  watchlist: number[];
  toggleWatchlist: (movieId: number) => void;
}
