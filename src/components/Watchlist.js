import { useMemo } from "react";

import MovieCard from "./MovieCard";

import "../styles.css";

export default function Watchlist({ movies, watchlist, toggleWatchlist }) {
  const watchlistedMovies = useMemo(
    () =>
      watchlist
        .map((id) => movies.find((movie) => movie.id === id))
        .filter(Boolean),
    [movies, watchlist]
  );

  return (
    <div>
      <h1 className="title">Your Watchlist</h1>
      <div className="watchlist">
        {watchlistedMovies.length === 0 ? (
          <p className="watchlist-empty">You have no saved movies yet.</p>
        ) : (
          watchlistedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              toggleWatchlist={toggleWatchlist}
              isWatchlisted
            />
          ))
        )}
      </div>
    </div>
  );
}
