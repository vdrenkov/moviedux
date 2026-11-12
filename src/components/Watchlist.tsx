import MovieCard from "./MovieCard";
import type { MovieListProps } from "../movies";

export default function Watchlist({
  movies,
  watchlist,
  toggleWatchlist,
}: MovieListProps) {
  const watchlistedMovies = movies.filter((movie) =>
    watchlist.includes(movie.id),
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
