import MovieCard from "./MovieCard";
import type { MovieListProps } from "../movies";

export default function Watchlist({
  movies,
  watchlist,
  toggleWatchlist,
}: MovieListProps) {
  const heading = useRef<HTMLHeadingElement>(null);
  const watchlistedMovies = movies.filter((movie) =>
    watchlist.includes(movie.id),
  );

  return (
    <div>
      <h1 ref={heading} tabIndex={-1} className="title">
        Your Watchlist
      </h1>
      <p className="page-intro">Saved for your next movie night.</p>
      <div className="watchlist">
        {watchlistedMovies.length === 0 ? (
          <p className="watchlist-empty">You have no saved movies yet.</p>
        ) : (
          watchlistedMovies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              toggleWatchlist={(movieId) => {
                toggleWatchlist(movieId);
                heading.current?.focus();
              }}
              isWatchlisted
            />
          ))
        )}
      </div>
    </div>
  );
}
import { useRef } from "react";
